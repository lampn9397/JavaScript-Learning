'use client' // Error components must be Client Components

import images from '@/assets'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const errorObj = React.useMemo(() => JSON.parse(error.message), [error.message])

    return (
        <div className='flex flex-col w-screen h-screen justify-center items-center gap-5'>
            <Image alt='' src={images.error} />
            <Button onClick={reset}>Try again</Button>
        </div>
    )
}