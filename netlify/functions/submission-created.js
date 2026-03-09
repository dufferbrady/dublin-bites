/**
 * Netlify event-triggered function: runs when a form submission is verified.
 * Optionally inserts the submission into Netlify DB (Postgres) if the database
 * is connected and the table founding_member_submissions exists.
 * @see https://docs.netlify.com/build/functions/trigger-on-events/
 */
exports.handler = async function (event) {
  let payload;
  try {
    const body = JSON.parse(event.body || "{}");
    payload = body.payload;
  } catch (_) {
    return { statusCode: 200 };
  }
  if (!payload) return { statusCode: 200 };

  const email = (payload.data && payload.data.email) || payload.email;
  if (!email || typeof email !== "string") return { statusCode: 200 };

  try {
    const { neon } = await import("@netlify/neon");
    const sql = neon();
    await sql`INSERT INTO founding_member_submissions (email) VALUES (${email})`;
  } catch (err) {
    console.error("submission-created: DB insert failed", err);
  }
  return { statusCode: 200 };
};
