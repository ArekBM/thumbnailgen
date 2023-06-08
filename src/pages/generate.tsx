import { type NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { Input } from '~/components/Input'
import { api } from '~/utils/api'
import { FormWrapper } from '~/components/FormWrapper'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '~/components/Button'
import { b64Image } from '~/data/b64img'
import Image from 'next/image';
import clsx from 'clsx';



const GeneratePage: NextPage = () => {

    const [form, setForm] = useState({prompt: '', color: '', style: ''})

    const [imageUrl, setImageUrl] = useState('')

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data){
            if(!data?.imageUrl) return;
            setImageUrl(data.imageUrl)
        }
    })

    const colors = [
        'Blue',
        'Red',
        'Yellow',
        'Green',
        'White',
        'Black',
        'Pink',
        'Purple'
    ]

    const artStyles = [
        'Photography',
        'Drawing',
        'Impresionism',
        'Surrealism',
        'Expressionism',
        'Cubism',
        'Abstract',
        'Pop art',
        'Minimalism',
        'Modern art',
        'Digital art',
        'Conceptual art'
    ]

    const session = useSession()

    const isLoggedIn = !!session.data

    function updateForm(key: string){
        return function(e: React.ChangeEvent<HTMLInputElement>){
            setForm((prev) => ({
            ...prev,
            [key] : e.target.value
            }))
        }
    }

    function handleFormSubmit(e: React.FormEvent){
        e.preventDefault()
        generateIcon.mutate({
            prompt: form.prompt,
            color: form.color,
            style: form.style
        })
        setForm((prev) => ({...prev, prompt: ''}))
    }


    return (
        <>
        <Head>
            <title>Generate Image</title>
        </Head>
        <main className='container mx-auto mt-24 flex min-h-screen flex-col gap-4'>
            <h1 className='text-6xl text-center'>Generate your Image</h1>
            <p className='text-4xl text-center'>Fill out the form below to start generating with AI</p>
            <form className='flex flex-col gap-5' onSubmit={handleFormSubmit}>
                <h2 className='text-xl text-center'>
                    1. Describe the image 
                </h2>
                <FormWrapper>
                    <label>Prompt</label>
                    <Input value={form.prompt} onChange={updateForm('prompt')}></Input>
                </FormWrapper>
                <h2 className='text-xl text-center'>
                    2. Choose your color
                </h2>
                <FormWrapper className='mb-12 grid grid-cols-4'>
                    {colors.map((color) => (
                        <label className='text-2xl' key={color}>
                            <input type='radio' name='color' value={color}
                            checked={color === form.color}
                            onChange={() => setForm((prev) => ({ ...prev, color}))}
                            ></input>

                            {color}
                        </label>
                    ))}

                </FormWrapper>
                <h2 className='text-xl text-center'>
                    3. Choose art style
                </h2>
                <FormWrapper className='mb-12 grid grid-cols-4'>
                    {artStyles.map((style) => (
                        <label className='text-2xl' key={style}>
                            <input type='radio' name='color' value={style}
                            checked={style === form.style}
                            onChange={() => setForm((prev) => ({ ...prev, style}))}
                            ></input>

                            {style}
                        </label>
                    ))}

                </FormWrapper>
                {isLoggedIn && <Button disabled={generateIcon.isLoading} isLoading={generateIcon.isLoading}>Submit</Button>}
                {!isLoggedIn && <Button disabled>Must Be Logged In</Button>}
            </form>
            {imageUrl && (
                <>
                    <h1 className='text-xl'>Your Thumbnails</h1>
                    <section className='grid grid-cols-4 gap-4'>
                        <Image 
                            src={imageUrl} 
                            alt='Image of your prompt'
                            width='512'
                            height='512'
                        />
                    </section>
                </>
            )}
        </main>
        </>
    )
}

export default GeneratePage