export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://maullickkathuria01.github.io/vardhan-consolidation"); // allow frontend
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
  };

  res.status(200).json(config);
}
