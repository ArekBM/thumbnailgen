import { type NextPage } from 'next'
import { api } from '~/utils/api'
import Head from 'next/head'
import Image  from 'next/image'
import { type Icon } from '@prisma/client'

const CollectionPage: NextPage = () => {

    const BUCKET_NAME = 'thumbnail-gen'

    const images = api.images.getImages.useQuery()

    return (
        <>
        <Head>
            <title>Your Collection</title>
            <meta content='Your Collection' />
        </Head>
        <main className='container mx-auto mt-24 flex min-h-screen flex-col gap-4 px-8'>
            <h1 className='text-4xl'>Your Images</h1>
            <section className='grid grid-cols-6'>
                <ul>
                    {images.data?.map((image: Icon) => {
                        <li key={image.id}>
                            <Image 
                            width='100'
                            height='100'
                            alt={image.prompt ?? 'animage of an icon'}
                            src={`https://${BUCKET_NAME}.s3.us-west-1.amazonaws.com/${image.id}`}
                            />
                        </li>
                    })}
                </ul>
            </section>
        </main>
        </>
    )
}

export default CollectionPage