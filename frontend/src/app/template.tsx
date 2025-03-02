"use client"

import { useEffect } from "react"
import { animatePageIn } from "../utils/animations"

export default function Template({children}:{children :React.ReactNode}){
 
    useEffect(() =>{
        animatePageIn()
    },[])
    return(
        <div>

<div id="banner-1" className="min-h-screen bg-[#ffff] fixed top-10 left-0 w-1/4" >
</div>

<div id="banner-2" className="min-h-screen bg-[#ffff] fixed top-10 left-1/4 w-1/4" >
</div>

<div id="banner-3" className="min-h-screen bg-[#ffff] fixed top-0 left-2/4 w-1/4" >
</div>

<div id="banner-4" className="min-h-screen bg-[#ffff] fixed top-0 left-3/4 w-1/4" >
</div>
{children}

        </div>
        
    )
}