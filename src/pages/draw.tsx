// import { type NextPage } from 'next'
// import { useState } from 'react'
// import Head from 'next/head'
// import { useRef } from 'react'
// import { Input } from '~/components/Input'
// import { api } from '~/utils/api'
// import { FormWrapper } from '~/components/FormWrapper'
// import { useSession } from 'next-auth/react'
// import { Button } from '~/components/Button'
// import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'
// import Image from 'next/image'

// const DrawPage : NextPage = () => {

//     const [form, setForm] = useState({prompt: ''})

//     const [imageUrl, setImageUrl] = useState('')

//     const [drawing, setDrawing] = useState('')

//     const drawImage = api.draw.drawPrompt.useMutation({
//         onSuccess(data){
//             if(!data?.drawing) return;
//             let img = data.drawing.split(',')
//             setImageUrl(`${img[1]}`)
//         }
//     })
//     const session = useSession()

//     const isLoggedIn = !!session.data

//     const canvasRef = useRef<ReactSketchCanvasRef>(null)

//     function updateForm(key: string){
//         return function(e: React.ChangeEvent<HTMLInputElement>){
//             setForm((prev) => ({
//             ...prev,
//             [key] : e.target.value
//             }))
//         }
//     }

//     function handleFormSubmit(e: React.FormEvent){
//         e.preventDefault()
//         drawImage.mutate({
//             prompt: form.prompt,
//             image: drawing
//         })
//         setForm((prev) => ({...prev, prompt: '', image: ''}))
//     }



//     return (
//         <>
//         <Head>
//             <title>Draw Image</title>
//         </Head>
//         <main className='container mx-auto mt-24 flex min-h-screen flex-col gap-4'>
//             <h1 className='text-6xl text-center'>Draw your Image</h1>
//             <p className='text-4xl text-center'>Fill out the form below to start generating with AI</p>
//             <ReactSketchCanvas
//                         ref={canvasRef}
//                         width='800'
//                         height='800'
//                         strokeWidth={4}
//                         strokeColor='black'
//             />
//             <Button onClick={async () => {
//                 if(!canvasRef.current) return
//                 const drawing = await canvasRef.current.exportImage('jpeg')
//                 setDrawing(drawing)
//             }}>Save</Button>
//             <form className='flex flex-col gap-5' onSubmit={handleFormSubmit}>
//                 <FormWrapper>
//                     <label>Prompt</label>
//                     <Input value={form.prompt} onChange={updateForm('prompt')}></Input>
//                 </FormWrapper>
//             <Button>Submit</Button>
//             </form>
//             {imageUrl && (
//                 <>
//                     <h1 className='text-xl'>Your Drawing</h1>
//                     <section>
//                         <Image 
//                             src={imageUrl} 
//                             alt='Image of your prompt'
//                             width='512'
//                             height='512'
//                         />
//                     </section>
//                 </>
//             )}
//         </main>
//         </>
//     )
// }

// export default DrawPage