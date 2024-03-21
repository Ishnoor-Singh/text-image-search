'use server'

import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function redirectUser () {
    const session = await getSession();
    if (session?.user) {
        // redirect('/');
    }
    else if (!session?.user?.user_metadata?.phone_num) {
        // redirect('/application/addPhone')
    }
}