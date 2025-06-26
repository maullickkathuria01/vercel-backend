export default async function handler(req, res) {
  // CORS headers for GitHub Pages
  res.setHeader("Access-Control-Allow-Origin", "https://maullickkathuria01.github.io/vardhan-consolidation"); // Replace with your GitHub Pages URL
  res.setHeader("Access-Control-Allow-Methods", "GET");
  
  if (req.method === "OPTIONS") {
    res.status(200).end(); // Preflight response
    return;
  }

  // 🔐 Use the secret API key from environment variables
  const apiKey = process.env.MY_SECRET_API_KEY;

  // Use it to call a third-party API (example)
  try {
    const response = await fetch("https://api.example.com/secure-data", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    // ✅ Send only needed data to frontend
    res.status(200).json({ usefulData: data.somethingImportant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch secure data" });
  }
}
