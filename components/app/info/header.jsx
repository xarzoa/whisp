'use client'
import { usePathname } from "next/navigation"

export default function Header(){
  const pathname = usePathname()
  console.log(pathname)
  return(
    <header className="w-full top-0 fixed z-50">
      <div className="flex m-4 h-10 justify-between font-jbmono backdrop-blur-sm rounded-lg bg-black/5">
        
      </div>
    </header>
  )
}