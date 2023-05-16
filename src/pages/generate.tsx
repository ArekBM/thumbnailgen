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



const GeneratePage: NextPage = () => {

    const [form, setForm] = useState({prompt: ''})

    const [imageUrl, setImageUrl] = useState('')

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data){
            if(!data?.imageUrl) return;
            setImageUrl(data.imageUrl)
        }
    })

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
            prompt: form.prompt
        })
        setForm({ prompt: '' })
    }

    return (
        <>
        <Head>

        </Head>
        <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#35DFFF] to-[#3585FF]'>
            <form className='flex flex-col gap-5 items-center justify-center' onSubmit={handleFormSubmit}>
                <FormWrapper>
                    <label>Prompt</label>
                    <Input
                       value={form.prompt} onChange={updateForm('prompt')}
                    ></Input>
                    <Button>Submit</Button>
                </FormWrapper>
            </form>
            <Image 
                src={imageUrl} 
                alt='Image of your prompt'
                width='512'
                height='512'
            />
        </main>
        </>
    )
}

export default GeneratePage