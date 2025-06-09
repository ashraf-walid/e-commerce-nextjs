import { getAuth } from 'firebase-admin/auth';
import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/checkAdmin';

export async function GET(req) {
  try {
    await verifyAdminToken(req);

    const auth = getAuth();
    const listUsersResult = await auth.listUsers();

    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      isAdmin: user.customClaims?.admin || false,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
