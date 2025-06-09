// app/api/check-admin/route.js
import { auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ admin: false, message: 'No token provided' }, { status: 401 });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const isAdmin = decodedToken.admin === true;

    return NextResponse.json({ admin: isAdmin });
  } catch (error) {
    console.error('🔥 check-admin error:', error);
    return NextResponse.json({ admin: false, message: error.message }, { status: 500 });
  }
}
