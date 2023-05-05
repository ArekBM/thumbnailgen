import { type NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { Input } from '~/components/Input'
import { api } from '~/utils/api'
import { FormWrapper } from '~/components/FormWrapper'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '~/components/Button'

const GeneratePage: NextPage = () => {

    const [form, setForm] = useState({prompt: ''})

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data){
            console.log('mutation finished', data)
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
    }

    return (
        <>
        <Head>

        </Head>
        <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#35DFFF] to-[#3585FF]'>
            {!isLoggedIn &&
            <Button 
                onClick={() => 
                    signIn().catch(console.error)
                }
            >
                Login
            </Button>
            }
            {isLoggedIn &&
            <Button 
                onClick={() => 
                    signOut().catch(console.error)
            }
            >
                Logout
            </Button>
            }
            <form className='flex flex-col gap-5 items-center justify-center' onSubmit={handleFormSubmit}>
                <FormWrapper>
                    <label>Prompt</label>
                    <Input
                       value={form.prompt} onChange={updateForm('prompt')}
                    ></Input>
                    <Button>Submit</Button>
                </FormWrapper>
            </form>
        </main>
        </>
    )
}

export default GeneratePage