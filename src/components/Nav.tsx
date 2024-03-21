import Link from "next/link";
import { getPhone } from "@/lib/phoneNumber";
import { Pencil1Icon } from "@radix-ui/react-icons";
export default function Nav({showPhone}: {showPhone: boolean} = {showPhone: false}) {
    return (
        <nav className="flex items-center justify-between p-6 text-white border-b">
        <div>
            <Link href="/">
                Home
            </Link>
        </div>
        {showPhone && <PhoneLink/>}
        <div>
            <Link href="/api/auth/logout">
                Log Out
            </Link>
        </div>
        </nav>
    );
}

async function PhoneLink() {
    return (
        <Link className='flex items-center' href="/addPhone">
            <Pencil1Icon/>
            Phone Number
        </Link>
    )
}