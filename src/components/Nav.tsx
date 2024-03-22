'use client';

import React from 'react';
import Link from 'next/link';
import { Pencil1Icon } from "@radix-ui/react-icons";
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Nav({ showPhone }: { showPhone: boolean } = { showPhone: false }) {
    const { user } = useUser();
    const pathname = usePathname();
    const pageName = pathname?.split('/').pop();

    return (
        <nav className="flex items-center justify-between p-6 text-white border-b">
            <div>
                <Link href="/application" legacyBehavior>
                    Home
                </Link>
            </div>
            <div>
                {user ? <a href="/api/auth/logout" >
                    Log Out
                </a> : <a href="/api/auth/login" >
                    Log In
                </a>}
            </div>
        </nav>
    );
}