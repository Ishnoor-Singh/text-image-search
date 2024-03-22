import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateUserPhoneNumber } from "@/lib/phoneNumber";
import { redirect } from "next/navigation";
export default function addPhone() {
    async function handleSubmit(formData:FormData) {
        'use server'
        const phone = formData.get('phone');
        await updateUserPhoneNumber('+1' + phone);
        // nagivate to home
        redirect('/application');
    }
    return (
        <>
            <Card>
                <CardHeader>Add Your Phone Number</CardHeader>
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