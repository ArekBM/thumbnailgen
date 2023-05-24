import { type NextPage } from 'next'
import { api } from '~/utils/api'
import Head from 'next/head'
import Image  from 'next/image'
import { type Icon } from '@prisma/client'

const CollectionPage: NextPage = () => {

    const BUCKET_NAME = 'thumbnail-gen'

    const icons = api.icons.getIcons.useQuery()

    return (
        <>
        <Head>
            <title>Your Collection</title>
            <meta content='Your Collection' />
        </Head>
        <main className='container mx-auto mt-24 flex min-h-screen flex-col gap-4 px-8'>
            <h1 className='text-4xl'>Your Images</h1>
            <ul className='grid grid-cols-6'>
            </ul>
        </main>
        </>
    )
}

export default CollectionPage