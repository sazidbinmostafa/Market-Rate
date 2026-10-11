import ProductCard from '../Shared/ProductCard';
import { toBanglaNumber } from '@/lib/formatter';
import { Product } from '@/types/Product';

async function AllProducts() {

    const getAllProducts = async (): Promise<Product[]> => {
        try {
            const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
            const data = await res.json();
            return data;
        }
        catch (error) {
            console.error('Failed to fetch all products:', error);
            return [];
        }
    }

    const allProducts = await getAllProducts();

    return (
        <div id='সব-পণ্য' className='container mx-auto'>
            <div className='my-3 space-y-2 text-center md:text-start'>
                <h3 className='text-2xl font-bold'>সব পণ্য</h3>
                <p className='text-sm text-[#1D271F]'>মোট {toBanglaNumber(allProducts.length)}টি পণ্য দেখানো হচ্ছে</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {allProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </div>
    )
}

export default AllProducts