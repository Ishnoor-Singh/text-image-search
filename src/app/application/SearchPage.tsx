'use client'
import { Suspense } from "react";
import { useState } from "react";
import {Input} from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

export default function Home({children}) {
    const router = useRouter();
    const pathname = usePathname();
  
    function handleSearch(e) {
        e.preventDefault();
        router.push(`${pathname}?search=${e.target.value}`);
    }  
    
    return (
        <div>
        <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px]"
            onChange={handleSearch}/>
            <Suspense  fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </div>
    );
}

