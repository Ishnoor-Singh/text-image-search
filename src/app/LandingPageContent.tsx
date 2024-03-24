import { buttonVariants } from "@/components/ui/button"
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

export default function LandingPageContent() {
        // return (
        //     <div className="flex flex-col h-full items-center justify-center min-h-screen grow" style={{backgroundColor: 'red'}}>
        //         <h1 className="text-4xl mb-8">Take tons of screenshots? We can help</h1>
        //         <div className="w-full max-w-xs">
        //             <a className={`${buttonVariants()} block`} href={'/api/auth/login'}>Login</a>
        //         </div>
        //         <div className="w-full max-w-2xl mt-8 relative">
        //             <div className="absolute inset-0 w-full h-full">
        //                 <iframe className="w-full h-full" src="https://www.loom.com/embed/e3ef1c933c74488d9b48582cd13243df?sid=f21b8018-b0d0-4392-a52e-70a5b67b2998" frameBorder="0" allowFullScreen></iframe>
        //             </div>
        //             <div className="w-full pb-[56.25%]"></div>
        //         </div>
        //     </div>
        // );
    return <div className="p-12 flex flex-col w-full items-center justify-between grow" >
        <h1>Take tons of screenshots? We can help</h1>
        <div className="m3">        <a className={`${buttonVariants()} block`} href={'/api/auth/login'} >Login</a>
        </div>
        <div className="flex-1 relative flex m-3 relative" >
        <iframe className="max-h-[80vh] max-h-[720px]"  src="https://www.loom.com/embed/e3ef1c933c74488d9b48582cd13243df?sid=f21b8018-b0d0-4392-a52e-70a5b67b2998" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
    </div>
}