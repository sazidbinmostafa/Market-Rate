import { Spinner } from '@heroui/react'
import React from 'react'

function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <Spinner color="current" />
    </div>
  )
}

export default Loading