import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Suspense } from "react";
import ProfileContent from "./ProfileContent";

// export default withPageAuthRequired(ProfilePage, { returnTo: '/application' });
export default ProfilePage;
function ProfilePage() {
    return (<main className="flex min-h-screen flex-col items-center justify-between pt-3">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <div className="m-6 flex flex-col items-center">
                <Suspense fallback={<div>Loading...</div>
                                }>
                    <ProfileContent />
                </Suspense>
            </div>
        </div>
    </main>
    )
}


