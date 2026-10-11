import { Product } from '@/.next/types/Product'
import ProductCard from '../Shared/ProductCard'

async function TopPriceGainingProducts() {

    const getTopGainingProducts = async (): Promise<Product[]> => {
        try {
            const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
            const data = await res.json()

            const gainingProducts: Product[] = data.filter(
                (product: Product) => product.change && product.change.dir === "up"
            )
            gainingProducts.sort((a, b) => b.change.pct - a.change.pct)

            const topGainingProducts: Product[] = gainingProducts.slice(0, 6)

            return topGainingProducts;
        }
        catch (error) {
            console.error('Failed to fetch products:', error);
            return [];
        }
    }

    const topPriceGainingProducts = await getTopGainingProducts();

    return (
        <div className='container mx-auto'>
            <h3 className='text-2xl font-bold flex items-center gap-1 mx-auto w-fit md:mx-0 my-3'><span className='text-lg text-[#D03739]'>▲</span>আজ দাম বেড়েছে</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {topPriceGainingProducts.map(product=> <ProductCard key={product.id} product={product}/>)}
            </div>
        </div>
    )
}

export default TopPriceGainingProducts