import React from 'react';
import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0';
import { ProfilePopover } from './Proflile';

export default async function Nav() {
    const session = await getSession();
    if (!(session?.user)) {
        return null;
    }

    return (
        <nav className="flex items-center justify-between p-6 text-white border-b">
            <div>
                <Link href="/application" legacyBehavior>
                    Home
                </Link>
            </div>
            <div>
                <ProfilePopover user={session.user} />
            </div>
        </nav>
    );
}
