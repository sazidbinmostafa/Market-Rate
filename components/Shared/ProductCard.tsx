import { Product } from '@/.next/types/Product';
import { toBanglaNumber, toBanglaUnit } from '@/lib/formatter';
import { Card } from '@heroui/react'
type ProductCardProps = {
    product: Product
}

function ProductCard({ product }: ProductCardProps) {

    const isUp = product.change?.dir === "up";

    return (
        <div>
            <Card className="w-full gap-2 mx-auto">
                <div className='flex items-center gap-3'>
                    <h1 className='text-xl bg-[#F0F5F0] p-1 '>{product.image}</h1>
                    <Card.Header className='text-[#1D271F]'>
                        <Card.Title className='font-semibold'>{product.nameBn}</Card.Title>
                        <Card.Description className='text-xs'>প্রতি {toBanglaUnit(product.unit)}</Card.Description>
                    </Card.Header>
                </div>
                <Card.Footer className="flex gap-2 justify-between items-end">
                    <div className='text-[#1D271F]'>
                        <p>আজকের দাম</p>
                        <h3 className='font-semibold'><span className='inter text-xl'>{toBanglaNumber(product.today)}</span> টাকা</h3>
                    </div>
                    <div>
                        <span
                            className={`font-semibold text-sm px-1.5 py-0.5 rounded-3xl inter bg-[#F0F5F0]
                                ${isUp
                                    ? "text-red-600"
                                    : "text-green-700"
                                }`}>
                            {isUp ? "▲" : "▼"} {toBanglaNumber(product.change?.pct)}%
                        </span>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default ProductCard