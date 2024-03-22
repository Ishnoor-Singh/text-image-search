import { getUserId } from '@/lib/phoneNumber';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

const GET = withApiAuthRequired(async () => {
  const session = await getSession();
  console.log(session);

  return NextResponse.json(getUserId(session.user.email));
});

export { GET };