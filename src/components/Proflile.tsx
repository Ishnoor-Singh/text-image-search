import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Link from 'next/link';
export function ProfilePopover({ user }) {
    return (<Popover>
        <PopoverTrigger>
            <ProfileClient user={user} />
        </PopoverTrigger>
        <PopoverContent className="">
            <ul>
                <li>
                    <a href="/api/auth/logout" >
                        <span className="block p-2">Logout</span>
                    </a>

                </li>
                <li>
                    <a href="/application/profile" >
                       Profile
                    </a>
                </li>
            </ul>
        </PopoverContent>
    </Popover>)
}

export function ProfileClient({ user }) {
    return (
        user ? (
            <div>
                <Image priority height={36} width={36} src={user.picture} alt={user.name} className="rounded-full border border-white border-2" />
            </div>
        ) : null
    );
}
