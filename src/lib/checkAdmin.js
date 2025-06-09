// src/lib/checkAdmin.js
import { getAuth } from 'firebase-admin/auth';

export async function verifyAdminToken(request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split('Bearer ')[1];

  if (!token) {
    throw new Error('No token provided');
  }

  const decodedToken = await getAuth().verifyIdToken(token);

  if (!decodedToken.admin) {
    throw new Error('User is not an admin');
  }

  return decodedToken; // يحتوي على uid و email و admin وغيرهم
}
