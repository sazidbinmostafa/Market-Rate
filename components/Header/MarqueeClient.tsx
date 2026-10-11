"use client"
import { toBanglaNumber, toBanglaUnit } from '@/lib/formatter';
import Marquee from 'react-fast-marquee';

interface Product {
    id: number;
    nameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
}

function MarqueeClient({ products }: { products: Product[] }) {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div>
            <Marquee speed={200} gradient={false} pauseOnHover={true}>
                <div className="flex items-center gap-4 h-10 bg-[#FAFCFA]">
                    {products.map((product) => {
                        const isUp = product.change?.dir === "up";
                        return (
                            <div key={product.id} className="flex items-center gap-2 text-sm font-medium text-[#1D271F] mx-4 cursor-default">
                                <span className='font-semibold'>{product.categoryIcon} {product.nameBn}</span>
                                <span className='font-semibold'><span className='inter'>{toBanglaNumber(product.today)}</span> টাকা/{toBanglaUnit(product.unit)}</span>
                                <span
                                    className={`text-xs px-1.5 py-0.5 rounded font-bold inter 
                                    ${isUp
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-700"
                                        }`}>
                                    {isUp ? "▲" : "▼"} {toBanglaNumber(product.change?.pct)}%
                                </span>
                            </div>
                        )
                    })}
                </div>
            </Marquee>
        </div>
    )
}

export default MarqueeClient