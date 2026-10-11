"use client"
import Loading from '@/app/loading';
import { toBanglaNumber, toBanglaUnit } from '@/lib/formatter';
import { Product } from '@/types/Product';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';

function ProductDetails() {
    const params = useParams();
    const productId = params.id as string;

    const [product, setProduct] = useState<Product>({})
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getProducts = async () => {
            if (!productId) return;
            try {
                setLoading(true)
                const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productId}`)
                const data = await res.json()
                setProduct(data)
            }
            catch (error) {
                console.error("Failed to fetch product:", error);
            }
            finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [productId])

    if (loading) {
        return <Loading />
    }

    const markets = product.markets;
    const minPrices = markets.map(market=> market.min)
    const maxPrices = markets.map(market=> market.max)
    const lowestMarketPrice = Math.min(...minPrices)
    const highestMarketPrice = Math.max(...maxPrices)
    return (
        <div className='container mx-auto my-8 rounded-lg'>
            <div className="bg-[#FAFCFA] border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-2 border border-gray-100 shrink-0">
                        <h1 className='text-3xl'>{product.image}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#1D271F]">{product.nameBn}</h1>
                        <p className="text-sm text-gray-500 mt-0.5">প্রতি {toBanglaUnit(product.unit)} • {product.nameBn}</p>
                        <p className="text-sm text-[#1D271F] mt-2 inter">
                            গতকালের তুলনায় আজ দাম {product.change.dir === "up" ? <span className="font-semibold ">বেড়েছে</span> : <span className="font-semibold ">কমেছে</span>} · {toBanglaNumber(Math.abs(product.today - product.yesterday))} টাকা
                        </p>
                    </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 text-center min-w-35 ml-auto md:ml-0 ">
                    <span className="text-xs text-gray-500 block">আজকের দাম</span>
                    <span className="text-3xl font-bold text-[#1D271F] block my-0.5 inter">{toBanglaNumber(product.today)}</span>
                    <span className="text-xs text-gray-500 block">টাকা / {toBanglaUnit(product.unit)}</span>
                    <div className="flex items-center justify-center gap-1 mt-1 text-xs font-semibold inter">
                        {product.change.dir === "up" ? <div className='text-red-500'>
                            <span>▲</span>
                            <span>{toBanglaNumber(product.change.pct)}</span>
                        </div> :
                            <div className='text-green-500'>
                                <span>▼</span>
                                <span>{toBanglaNumber(product.change.pct)}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="w-full mx-auto my-5 space-y-6 font-sans">
                {/* Price Summary Cards Section */}
                <div className="bg-[#FAFCFA] border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[#1D271F] mb-4">দামের সারসংক্ষেপ</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Min Price Card */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white">
                            <span className="text-xs text-gray-500 block">সর্বনিম্ন দাম</span>
                            <span className="text-2xl font-bold text-[#05893E] my-1 block inter">{toBanglaNumber(lowestMarketPrice)} টাকা</span>
                            <span className="text-xs text-gray-500 block">সবচেয়ে কম দামের বাজার</span>
                        </div>

                        {/* Max Price Card */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white">
                            <span className="text-xs text-gray-500 block">সর্বাধিক দাম</span>
                            <span className="text-2xl font-bold text-red-600 my-1 block inter">{toBanglaNumber(highestMarketPrice)} টাকা</span>
                            <span className="text-xs text-gray-500 block">সবচেয়ে বেশি দামের বাজার</span>
                        </div>

                        {/* Average Price Card */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white">
                            <span className="text-xs text-gray-500 block">গড় দাম</span>
                            <span className="text-2xl font-bold text-[#05893E] my-1 block inter">{toBanglaNumber((highestMarketPrice + lowestMarketPrice)/2)} টাকা</span>
                            <span className="text-xs text-gray-500 block">প্রতি {toBanglaUnit(product.unit)}-এর হিসাবে</span>
                        </div>
                    </div>
                </div>

                {/* Market-wise Price Table Section */}
                <div className="bg-[#FAFCFA] border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden">
                    <h2 className="text-xl font-bold text-[#1D271F] mb-4">বাজারভিত্তিক আজকের দাম</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-justify">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-500 text-sm">
                                    <th className="py-3 px-4 text-justify font-semibold">বাজার</th>
                                    <th className="py-3 px-4 text-justify font-semibold">বিভাগ</th>
                                    <th className="py-3 px-4 text-justify font-semibold">সর্বনিম্ন</th>
                                    <th className="py-3 px-4 text-justify font-semibold">সর্বাধিক</th>
                                    <th className="py-3 px-4 text-justify font-semibold">গড়</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-[#1D271F]">
                                {product.markets.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100 transition-colors">
                                        <td className="py-3.5 px-4">{item.market}</td>
                                        <td className="py-3.5 px-4 text-gray-600">{item.division}</td>
                                        <td className="py-3.5 px-4 inter">{toBanglaNumber(item.min)}</td> 
                                        <td className="py-3.5 px-4 inter">{toBanglaNumber(item.max)}</td>
                                        <td className="py-3.5 px-4 font-semibold">{toBanglaNumber((item.max + item.min)/2)} টাকা</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails;