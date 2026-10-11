"use client"
import { Button } from '@heroui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const TodaysDate = dynamic(() => import('../Header/TodaysDate'), {
    ssr: false,
    loading: () => <p className='text-xs text-[#05893E]'>তারিখ লোড হচ্ছে...</p>
})

function Hero() {
    return (
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between bg-[#FAFCFA] p-3 rounded-xl text-center md:text-left'>
            <div className='space-y-3'>
                <div className="bg-[#E1F1E7] px-2 py-1 rounded-xl w-fit text-[#05893E] mx-auto md:mx-0">
                    <TodaysDate />
                </div>
                <div className='text-[#1D271F] space-y-3'>
                    <h1 className='text-3xl font-bold'>আজকের বাজারের দাম এক নজরে</h1>
                    <p className='text-wrap'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                </div>
                <div className='block md:hidden'>
                    <Image src="/images/bazar-hero.png" alt="Hero Image" width={400} height={400} />
                </div>
                <div className='my-8'>
                    <a href="#সব-পণ্য"><Button className="bg-[#05893E] rounded-lg transition-all duration-300 hover:scale-103 hover:shadow-lg hover:shadow-[#05893E]/30 active:scale-97">সব পণ্য দেখুন</Button></a>
                </div>
            </div>
            <div className='hidden md:block'>
                <Image src="/images/bazar-hero.png" alt="Hero Image" width={400} height={400} />
            </div>
        </div>
    )
}

export default Hero