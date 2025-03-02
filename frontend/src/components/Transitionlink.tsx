"use client" 
import { usePathname , useRouter } from "next/navigation"
import { animatePageOut } from "../utils/animations"

interface Props {
    href :string 
    label : string
}

const TransitionLink = ({href , label }: Props ) =>{
   const router = useRouter()
   const pathname = usePathname()

   const handClick = () =>{
    if(pathname != href){
        animatePageOut(href,router)
    }
   }

   return (
    <button
        onClick={handClick}
        className="px-6 py-3 bg-[#009c98] hover:bg-blue-600 transition-all rounded-xl text-lg font-semibold shadow-lg animate-bounce mt-4"
      >
      {label}
      </button>
   )
}

export default TransitionLink