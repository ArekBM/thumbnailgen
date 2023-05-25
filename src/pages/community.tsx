import { type NextPage } from 'next'
import Head from 'next/head'
import { api } from '~/utils/api'
import Image from 'next/image'



const CommunityPage: NextPage = () => {

    const BUCKET_NAME = 'thumbnail-gen'

    const allIcons = api.icons.getCommunityIcons.useQuery()

    return (
        <>
        <Head>
            <title>Community Hub</title>
            <meta content='Community Hub' />
        </Head>
        <main className='container mx-auto mt-24 flex min-h-screen flex-col gap-4 px-8'>
            <h1 className='text-4xl'>Community Icons</h1>
            <ul className='grid grid-cols-6 gap-4'>
                {allIcons.data?.map((icon) => 
                <li key={icon.id}>
                    <Image 
                        className='w-full rounded-lg'
                        width='100'
                        height='100'
                        alt={icon.prompt ?? 'An image of your prompt'}
                        src={`https://${BUCKET_NAME}.s3.us-west-1.amazonaws.com/${icon.id}`}
                    />
                </li>
                )}
            </ul>

        </main>
        </>
    )
}

export default CommunityPage