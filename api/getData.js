import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://maullickkathuria01.github.io/vardhan-consolidation"); // Replace with your GitHub Pages
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  // Parse the service account JSON from env
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  // Avoid re-initializing in hot reloads
  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const db = getFirestore();

  try {
    const snapshot = await db.collection('your-collection-name').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ data });
  } catch (err) {
    console.error('Firestore Error:', err);
    res.status(500).json({ error: 'Failed to fetch Firebase data' });
  }
}
