"use client"
import { useState } from "react";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils"
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";

interface NavbarItem {
  label: string;
  category: string
  href: string;
}

interface NavbarProps {
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  position?: "static" | "sticky" | "fixed";
}

const maxWidthClasses = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1280px]",
  "2xl": "max-w-[1536px]",
  full: "max-w-full",
};

const TodaysDate = dynamic(() => import('./TodaysDate'), {
  ssr: false,
  loading: () => <p className='text-xs text-[#1D271F]'>তারিখ লোড হচ্ছে...</p>
})



function Navbar({ className, maxWidth = "lg", position = "sticky", }: NavbarProps) {

  const params = useParams();
  const category = params.slug as string

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const brand = (
    <div className="flex items-center gap-3">
      <Link href="/" className="text-lg font-bold">
        <Image
          src="/images/Icon-Cart.png"
          alt="Logo"
          width={50}
          height={50}
          className="bg-[#05893ee3] p-2 rounded-lg"
        /></Link>
      <div>
        <h3 className="text-lg font-bold cursor-default">বাজার দর</h3>
        <span className="text-[#1D271F]"><TodaysDate /></span>
      </div>
    </div>
  )

  const items: NavbarItem[] = [
    { label: "🍚 চাল", category:"chal", href: "/categories/chal", },
    { label: "🫘 ডাল", category:"dal", href: "/categories/dal", },
    { label: "🛢️ তেল", category:"tel", href: "/categories/tel", },
    { label: "🥬 সবজি", category:"sobji", href: "/categories/sobji", },
    { label: "🐟 মাছ", category:"mach", href: "/categories/mach", },
    { label: "🍗 মাংস", category:"mangsho", href: "/categories/mangsho", },
    { label: "🥛 ডিম-দুধ", category:"dim-dui", href: "/categories/dim-dui", },
    { label: "🌶️ মসলা", category:"mosla", href: "/categories/mosla", },
  ];


  const rightContent = (
    <div className="flex items-center gap-3">
      <Link href="#login" className="hover:text-[#05893E] focus:text-[#05893E]">সাইন ইন</Link>
      <Link href="#signup"><Button className="bg-[#05893E] rounded-lg transition-all duration-300 hover:scale-103 hover:shadow-lg hover:shadow-[#05893E]/30 active:scale-97">সাইন আপ</Button></Link>
    </div>
  )

  return (
    <nav
      className={cn(
        "z-40 w-full border-b border-separator bg-[#FAFCFA] backdrop-blur-lg pt-2",
        position === "sticky" && "sticky top-0",
        position === "fixed" && "fixed top-0",
        className
      )}
    >
      <header
        className={cn(
          "flex h-16 items-center justify-between px-6 py-3 border-b border-separator",
          maxWidth !== "full" && maxWidthClasses[maxWidth],
          "mx-auto"
        )}
      >
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {brand}
        </div>
        {rightContent && <div className="hidden items-center gap-4 md:flex">{rightContent}</div>}
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {items.map((item) => (
              <li key={item.href}>

                <Link
                  href={item.href}
                  className={cn("bg-transparent font-medium block p-2 rounded-lg text-black focus:bg-[#05893E] hover:bg-[#05893E] w-full", item.category === category && "bg-[#05893E]")}>{item.label}</Link>
              </li>
            ))}
            {rightContent && (
              <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4 items-center">
                {rightContent}
              </li>
            )}
          </ul>
        </div>
      )}

      <div className={cn(
        "h-12 px-6 hidden md:flex items-center justify-between",
        maxWidth !== "full" && maxWidthClasses[maxWidth],
        "mx-auto"
      )}>
        <ul className="hidden items-center gap-4 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn("font-medium text-black bg-transparent hover:bg-[#05893E] rounded-lg px-2 py-1", item.category === category && "bg-[#05893E]")}
              >{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;