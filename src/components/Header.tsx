import Link from 'next/link'
import { PrimaryLink } from './PrimaryLink'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '~/components/Button'
import { useBuyCredits } from '~/hooks/useBuyCredits'

export function Header() {

    const session = useSession()
    const isLoggedIn = !!session.data

    const { buyCredits } = useBuyCredits()

    return <header className='container mx-auto flex px-4 h-16 items-center justify-between dark:bg-gray-800'> 


        <PrimaryLink href='/'>Icon Generator</PrimaryLink>
        <ul>
            <li><PrimaryLink href='/generate'>Generate</PrimaryLink></li>
        </ul>
        <ul className='flex gap-2'>
            {!isLoggedIn && <li>            
                <Button 
                    onClick={() => 
                        signIn().catch(console.error)
                    }
                >
                    Login
                </Button>
            </li>}
            {isLoggedIn &&
            <>
                <li>
                    <Button 
                        onClick={() => 
                            buyCredits().catch(console.error)
                        }
                    >
                        Buy Credits
                    </Button>
                </li>
                <li>
                    <Button 
                        variant='secondary'
                        onClick={() => 
                            signOut().catch(console.error)
                        }
                    >
                        Logout
                    </Button>
                </li>
            </>}
        </ul>
    </header>
}