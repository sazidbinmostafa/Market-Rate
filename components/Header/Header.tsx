import React, { Suspense } from 'react'
import Navbar from './Navbar'
import PriceTicker from './PriceTicker'
import { Spinner } from '@heroui/react'

function Header() {
  return (
    <>
      <Suspense fallback={<Spinner className='w-fit mx-auto' color="success" />}>
        <Navbar />
      </Suspense>
      <PriceTicker />
    </>
  )
}

export default Header