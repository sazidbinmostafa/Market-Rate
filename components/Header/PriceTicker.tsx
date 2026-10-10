import React from 'react'
import MarqueeClient from './MarqueeClient';

async function PriceTicker() {

    let topProducts = [];

    try {
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
            next: { revalidate: 3600 * 24 }
        })
        const data = await res.json()
        const topProductsData = data.slice(0, 10)
        topProducts = topProductsData;
    }
    catch (error) {
        console.error("Failed to fetch marquee products:", error);
    }

    return (
        <MarqueeClient products={topProducts} />
    )
}

export default PriceTicker