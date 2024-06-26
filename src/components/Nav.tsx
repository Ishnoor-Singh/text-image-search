import React from 'react';
import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0';
// import { ProfilePopover } from './Proflile';
import { ProfileClient } from './Proflile';
// import { useUser } from '@auth0/nextjs-auth0/client';

export default async function Nav() {
    const session = await getSession();
    if (!(session?.user)) {
        return null;
    }

    return (
        <nav className="flex items-center justify-between p-6 text-white border-b">
            <div>
                <a href="/application" >
                    Home
                </a>
            </div>
            <div>
                <a href="/application/profile" >
                    <ProfileClient user={session.user} />
                </a>
            </div>
        </nav>
    );
}
