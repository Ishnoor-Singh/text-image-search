import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation'
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import ProfileServer from '@/components/ProfileServer';

export default async function LandingPageContent() {
    const session = await getSession();
    if (session?.user) {
        redirect('/application')
    }
    return <>
        <h1>Take tons of screenshots? We can help</h1>
        <Link className={buttonVariants()} href={'/api/auth/login'}>Login</Link>
    </>
}