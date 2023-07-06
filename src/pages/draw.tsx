import { type NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { useRef } from 'react'
import { Input } from '~/components/Input'
import { api } from '~/utils/api'
import { FormWrapper } from '~/components/FormWrapper'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '~/components/Button'
import { b64Image } from '~/data/b64img'
import Image from 'next/image';
import clsx from 'clsx';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'

const DrawPage : NextPage = () => {

    const [form, setForm] = useState({prompt: ''})

    const [imageUrl, setImageUrl] = useState('')

    const [drawing, setDrawing] = useState('')

    const drawImage = api.draw.drawPrompt.useMutation({
        onSuccess(data){
            if(!data?.drawing) return;
            setImageUrl(data.drawing)
        }
    })
    const session = useSession()

    const isLoggedIn = !!session.data

    const canvasRef = useRef<ReactSketchCanvasRef>(null)

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
        drawImage.mutate({
            prompt: form.prompt,
        })
        setForm((prev) => ({...prev, prompt: ''}))
    }



    return (
        <>
        <Head>
            <title>Draw Image</title>
        </Head>
        <main className='container mx-auto mt-24 flex min-h-screen flex-col gap-4'>
            <h1 className='text-6xl text-center'>Draw your Image</h1>
            <p className='text-4xl text-center'>Fill out the form below to start generating with AI</p>
            <form className='flex flex-col gap-5' onSubmit={handleFormSubmit}>
                <FormWrapper>
                    <ReactSketchCanvas
                        ref={canvasRef}
                        width='800'
                        height='800'
                        strokeWidth={4}
                        strokeColor='black'
                    />
                    <label>Prompt</label>
                    <Input value={form.prompt} onChange={updateForm('prompt')}></Input>
                </FormWrapper>
                <Button onClick={async () => {
                    if(!canvasRef.current) return
                    const drawing = await canvasRef.current.exportImage('jpeg')
                    setDrawing(drawing)
                }}>Submit</Button>
            </form>
            {imageUrl && (
                <>
                    <h1 className='text-xl'>Your Drawing</h1>
                    <section>
                        <p>{imageUrl}</p>
                        <p>{drawing}</p>
                    </section>
                </>
            )}
        </main>
        </>
    )
}

export default DrawPage