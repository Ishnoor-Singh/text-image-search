import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";

export default function LandingPageContent() {
    return <>
        <h1>Take tons of screenshots? We can help</h1>
        <a className={`${buttonVariants()}`} href={'/api/auth/login'} >Login</a>
    </>
}