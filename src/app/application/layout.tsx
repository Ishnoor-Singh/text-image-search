import Nav from '@/components/Nav';
import { hasPhoneRegistered } from '@/lib/phoneNumber';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default function ApplicationLayout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className="relative flex min-h-screen flex-col">
      <CheckPhone/>
      <Nav showPhone={true}/>
    <div className="flex-1">{children}</div>
  </div>
}

async function CheckPhone() {
  const session = await getSession();

  if (!session) {
    redirect('/');
    return null
  }
  const userHasPhoneRegistered = await hasPhoneRegistered(session?.user?.email);

  if (!userHasPhoneRegistered) {
    console.log('No phone registered');
    redirect('/addPhone');
  }
  return null;
}