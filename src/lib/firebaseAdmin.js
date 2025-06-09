// lib/firebase-admin.js
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let db;
let auth;

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY); 
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  db = getFirestore();
  auth = getAuth();

} catch (err) {
  console.error('🔥 Firebase Admin Init Error:', err);
  throw err;
}

export { db, auth };
