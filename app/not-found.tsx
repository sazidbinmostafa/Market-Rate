// app/not-found.tsx
"use client"
import Link from "next/link"

 function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#14171E] text-center">
            <h1 className="text-6xl font-extrabold text-[#05893E] mb-4">404</h1>
            <h2 className="text-2xl font-bold text-white mb-2">আপনি মনে হয় ভুল বাজারে চলে এসেছেন! 🧐</h2>
            <p className="text-[#8A92A0] mb-6">Page Not Found</p>
            <Link href="/" className="px-3 py-2 text-white bg-[#05893E] rounded-lg transition-all duration-300 hover:scale-103 hover:shadow-lg hover:shadow-[#05893E]/30 active:scale-97">হোম পেজে ফিরে চলুন</Link>
        </div>
    )
}

export default NotFound;