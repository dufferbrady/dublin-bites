/**
 * Netlify event-triggered function: runs when a form submission is verified.
 * Optionally inserts the submission into Netlify DB (Postgres) if the database
 * is connected and the table founding_member_submissions exists.
 * @see https://docs.netlify.com/build/functions/trigger-on-events/
 */
exports.handler = async function (event) {
  const eventId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const debugOnly = process.env.SUBMISSION_DEBUG_ONLY === "true";

  console.log("submission-created", {
    eventId,
    step: "start",
    hasBody: !!event.body,
    bodyLength: typeof event.body === "string" ? event.body.length : null,
  });

  let payload;
  try {
    const body = JSON.parse(event.body || "{}");
    payload = body.payload;

    console.log("submission-created", {
      eventId,
      step: "parsed-body",
      hasPayload: !!payload,
      payloadType: typeof payload,
      payloadKeys: payload && typeof payload === "object" ? Object.keys(payload) : null,
    });
  } catch (err) {
    console.error("submission-created", {
      eventId,
      step: "parse-error",
      message: err && err.message,
      bodyType: typeof event.body,
      bodyLength: typeof event.body === "string" ? event.body.length : null,
      bodyPreview: typeof event.body === "string" ? event.body.slice(0, 200) : null,
    });
    return { statusCode: 200 };
  }

  if (!payload) {
    console.log("submission-created", {
      eventId,
      step: "no-payload",
    });
    return { statusCode: 200 };
  }

  const getEmailFromPayload = () => {
    if (!payload || typeof payload !== "object") {
      console.log("submission-created", {
        eventId,
        step: "payload-not-object",
        payloadType: typeof payload,
      });
      return { email: null, source: null };
    }

    const candidates = [
      ["payload.data.email", payload.data && payload.data.email],
      ["payload.email", payload.email],
      ["payload.data.Email", payload.data && payload.data.Email],
      ["payload.data.email_address", payload.data && payload.data.email_address],
    ];

    for (const [source, value] of candidates) {
      if (typeof value === "string" && value.trim()) {
        const normalized = value.trim().toLowerCase();
        console.log("submission-created", {
          eventId,
          step: "email-extracted",
          source,
          rawEmail: value,
          normalizedEmail: normalized,
        });
        return { email: normalized, source };
      }
    }

    console.log("submission-created", {
      eventId,
      step: "email-missing",
      inspectedPaths: candidates.map(([source]) => source),
    });

    return { email: null, source: null };
  };

  const { email, source: emailSource } = getEmailFromPayload();

  if (!email || typeof email !== "string") {
    console.log("submission-created", {
      eventId,
      step: "no-email",
      emailType: typeof email,
      emailSource: emailSource,
    });
    return { statusCode: 200 };
  }

  const emailPreview = `${email.slice(0, 3)}***`;

  console.log("submission-created", {
    eventId,
    step: "email-ready-for-insert",
    emailPreview,
    emailSource,
  });

  if (debugOnly) {
    console.log("submission-created", {
      eventId,
      step: "debug-only-skip-insert",
      email,
      emailPreview,
    });
    return { statusCode: 200 };
  }

  try {
    const { neon } = await import("@netlify/neon");
    const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

    console.log("submission-created", {
      eventId,
      step: "db-insert-attempt",
      emailPreview,
      hasConnectionString: !!connectionString,
    });

    const sql = connectionString ? neon(connectionString) : neon();
    await sql`INSERT INTO founding_member_submissions (email) VALUES (${email})`;

    console.log("submission-created", {
      eventId,
      step: "db-insert-success",
      emailPreview,
    });
  } catch (err) {
    console.error("submission-created", {
      eventId,
      step: "db-insert-failed",
      emailPreview,
      errorMessage: err && err.message,
      hasNetlifyDatabaseUrl: !!process.env.NETLIFY_DATABASE_URL,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
    });
  }

  return { statusCode: 200 };
};
