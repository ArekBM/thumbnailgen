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

    const [form, setForm] = useState({prompt: '', color: ''})

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
            color: form.color
        })
        setForm((prev) => ({...prev, prompt: ''}))
    }

    return (
        <>
        <Head>
            <title>Generate Image</title>
        </Head>
        <main className='container mx-auto mt-24 flex min-h-screen flex-col gap-4'>
            <h1 className='text-6xl'>Generate your Image</h1>
            <form onSubmit={handleFormSubmit}>
                <FormWrapper>
                    <label>Prompt</label>
                    <Input value={form.prompt} onChange={updateForm('prompt')}></Input>
                </FormWrapper>
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
                <Button disabled={generateIcon.isLoading} isLoading={generateIcon.isLoading}>Submit</Button>
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
