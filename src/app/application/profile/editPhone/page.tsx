import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateUserPhoneNumber, addUser } from "@/lib/phoneNumber";
import { redirect } from "next/navigation";
import { getSession } from '@auth0/nextjs-auth0';
export default async function EditPhone({searchParams}) {
    const session = await getSession();
    const curPhoneNum:string = searchParams?.pN ?? "";
    async function handleSubmit(formData:FormData) {
        'use server'
        const phone = formData.get('phone');
        if (curPhoneNum) {
            await updateUserPhoneNumber('+1' + phone, session.user.email);
        } else {
            await addUser('+1' + phone, session.user.email)
        }
        // nagivate to home
        redirect('/application');
    }
    return (
        <>
            <Card className="m-6">
                <CardHeader>{`${!curPhoneNum ? "Add" : "Edit"} Your Phone Number${curPhoneNum && `: ${curPhoneNum}`}`}</CardHeader>
                <form action={handleSubmit}>
                <CardContent><Input type='tel' name='phone' placeholder='Format: 0000000000' maxLength={10} minLength={10}  pattern="[0-9]{10}"/></CardContent>
                <CardFooter>
                    <Button type='submit'>Submit</Button>
                </CardFooter>
                </form>
            </Card>
        </>
    )
}