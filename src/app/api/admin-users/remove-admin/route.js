import { getAuth } from 'firebase-admin/auth';
import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/checkAdmin';

const OWNER_UID = "Xbsssp975nWxmZKuPzn4bxSTN7h2";

export async function POST(req) {
  const { uid } = await req.json();

  if (uid === OWNER_UID) {
    return NextResponse.json({ error: "Cannot remove owner." }, { status: 403 });
  }

  try {
    await verifyAdminToken(req);
    
    const auth = getAuth();
    await auth.setCustomUserClaims(uid, null); // remove all custom claims
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
