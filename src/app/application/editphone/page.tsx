import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Suspense } from "react";
import EditPhoneForm from "./EditPhoneForm";


// export default withPageAuthRequired(ProfilePage, {returnTo: '/application'});
export default EditPhone;
function EditPhone({searchParams}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPhoneForm searchParams={searchParams}/>
        </Suspense>
    )
}

function ProfilePage() {
    return (<main className="flex min-h-screen flex-col items-center justify-between pt-3">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <div className="m-6 flex flex-col items-center">
                <Suspense fallback={<div>Loading...</div>
                                }>
                    <h1>Edit Phone</h1>
                </Suspense>
            </div>
        </div>
    </main>
    )
}