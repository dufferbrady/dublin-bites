/**
 * Returns the current count of founding member submissions from Netlify DB.
 * GET /.netlify/functions/founding-count → { "count": number }
 * On error (no DB, missing table) returns { "count": 0 } so the UI never breaks.
 */
exports.handler = async function () {
  try {
    const { neon } = await import("@netlify/neon");
    const sql = neon();
    const rows = await sql`SELECT COUNT(*) AS count FROM founding_member_submissions`;
    const count = rows && rows[0] && rows[0].count != null
      ? parseInt(rows[0].count, 10)
      : 0;
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: Number.isNaN(count) ? 0 : count }),
    };
  } catch (_) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: 0 }),
    };
  }
};
