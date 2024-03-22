import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { getPhone } from "@/lib/phoneNumber";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"


export default withPageAuthRequired(ProfilePage, { returnTo: '/profile' });

async function ProfilePage() {
    const { user } = await getSession();
    const phoneNum = await getPhone(user.email).then(pN => {
        return pN ? cleanInternationalizedPhoneNumber(pN) : null;
    });
    return (<main className="flex min-h-screen flex-col items-center justify-between pt-3">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <div className="m-6 flex flex-col items-center">
                <Image priority alt="" height={60} width={60} src={user.picture} alt={user.name} className="rounded-full border border-white border-2" />
                <h2 className="m-3">{user.email}</h2>
                <Link href={phoneNum ? "/application/profile/editPhone?pN=" + phoneNum : "/application/profile/editPhone"} className={`${buttonVariants()} m-3 flex flex-row items-center justify-center`}>
                    {phoneNum ? <>
                         <Pencil1Icon />  {`    ${phoneNum}`}
                    </> : <><PlusIcon />  {"    Add Phone Number"}</>
                    }
                </Link>
            </div>
        </div>
    </main>
    )
}



function cleanInternationalizedPhoneNumber(phoneNum: string) {
    // drops the +1 from the phone number
    return phoneNum.substring(2);
}