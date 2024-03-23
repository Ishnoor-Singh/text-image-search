'use server'
import Image from "next/image";
import { getPhone } from "@/lib/phoneNumber";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { getSession } from "@auth0/nextjs-auth0"

export default async function ProfileContent() {
    const session = await getSession();
    if (!session) {
        return null
    }
    const phoneNum = await getPhone(session.user.email).then(pN => {
        return pN ? cleanInternationalizedPhoneNumber(pN) : null;
    });
    return (
        <>
            <Image priority alt="User Profile Image" height={60} width={60} src={session.user.picture} className="rounded-full border border-white border-2" />
            <a className={buttonVariants() + " m-3"} href="/api/auth/logout" >
                Logout
            </a>
            <h2 className="m-3">{session.user.email}</h2>
            <a
                href={phoneNum ? "/application/editphone?pN=" + phoneNum : "/application/editphone"}
                className={`${buttonVariants({variant: 'outline'})} m-3 flex flex-row items-center justify-center space-between`}
            >
                {phoneNum ? <>
                    <Pencil1Icon />  {`    ${phoneNum}`}
                </> : <><PlusIcon />  {"    Add Phone Number"}</>
                }
                
            </a>
        </>
    )
}


function cleanInternationalizedPhoneNumber(phoneNum: string) {
    // drops the +1 from the phone number
    return phoneNum.substring(2);
}


