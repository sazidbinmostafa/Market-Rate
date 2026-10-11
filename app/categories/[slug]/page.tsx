"use client"
import Loading from '@/app/loading';
import ProductCard from '@/components/Shared/ProductCard';
import { SortingSelect } from '@/components/Shared/SortingSelect';
import { toBanglaNumber } from '@/lib/formatter';
import { Product } from '@/types/Product';
import { Metadata } from 'next';
import { useParams } from 'next/navigation';
import { title } from 'process';
import React, { useEffect, useState } from 'react'


function CategoryProducts() {

  const params = useParams();
  const category = params.slug as string;

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [state, setState] = useState<string | null>("default");

  const getCategoryInfo = () => {
    if (category === "chal") {
      return { name: "চাল", icon: "🍚" }
    }
    if (category === "dal") {
      return { name: "ডাল", icon: "🫘" }
    }
    if (category === "tel") {
      return { name: "তেল", icon: "🛢️" }
    }
    if (category === "sobji") {
      return { name: "সবজি", icon: "🥬" }
    }
    if (category === "mach") {
      return { name: "মাছ", icon: "🐟" }
    }
    if (category === "mangsho") {
      return { name: "মাংস", icon: "🍗" }
    }
    if (category === "dim-dui") {
      return { name: "ডিম-দুধ", icon: "🥛" }
    }
    if (category === "mosla") {
      return { name: "মসলা", icon: "🌶️" }
    }
    return null;
  }

  useEffect(() => {
    const getProducts = async () => {
      if (!category) return;
      try {
        setLoading(true)
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${category}`)
        const data = await res.json()
        setProducts(data)
      }
      catch (error) {
        console.error("Failed to fetch products:", error);
      }
      finally {
        setLoading(false)
      }
    }

    getProducts();
  }, [category])

  // Get Sorted Products \\
  const getSortedProducts = () => {
    if (!products) {
      return
    }
    if (state === "accending") {
      products.sort((a, b) => a.today - b.today);
    }
    if (state === "decending") {
      products.sort((a, b) => b.today - a.today)
    }
    if (state === "default") {
      products.sort((a, b) => a.id - b.id)
    }
  }

  getSortedProducts()

  const categoryInfo = getCategoryInfo();

  if (loading) {
    return <Loading />
  }

  return (
    <div className='bg-[#F0F5F0] text-[#1D271F] py-8'>
      <div className='container mx-auto'>

        <div className='flex items-center gap-3 bg-[#FAFCFA] p-3 rounded-xl mb-5'>
          <h1 className='text-2xl'>{categoryInfo?.icon}</h1>
          <div>
            <h3 className='text-lg font-bold'>{categoryInfo?.name}</h3>
            <p className='text-sm'>{toBanglaNumber(products?.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>

        <div className='flex justify-end bg-[#FAFCFA] p-3 mb-5 rounded-xl'>
          <div className='flex items-center gap-3'>
            <h5>সাজান</h5>
            <SortingSelect state={state} setState={setState} />
          </div>
        </div>

        <div>
          <p className='text-center md:text-start'>মোট ৪টি পণ্য দেখানো হচ্ছে</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5'>
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts