import Link from 'next/link'
import { PrimaryLink } from './PrimaryLink'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '~/components/Button'
import { useBuyCredits } from '~/hooks/useBuyCredits'
import { api } from '~/utils/api'

export function Header() {

    const session = useSession()
    const isLoggedIn = !!session.data

    const { buyCredits } = useBuyCredits()

    const credits = api.user.getCredits.useQuery()

    return (
    <header className='dark:bg-gray-900'> 

        <div className='container mx-auto flex px-4 h-16 items-center justify-between'>
            <PrimaryLink href='/'>Icon Generator</PrimaryLink>
            <ul className='flex gap-4'>
                <li><PrimaryLink href='/generate'>Generate</PrimaryLink></li>
                <li><PrimaryLink href='/community'>Community</PrimaryLink></li>
            {isLoggedIn &&
                <li><PrimaryLink href='/collection'>Collection</PrimaryLink></li>
            }
            </ul>
            <ul className='flex gap-4'>
                {!isLoggedIn && <li>            
                    <Button 
                        onClick={():unknown => 
                            signIn().catch(console.error)
                        }
                    >
                        Login
                    </Button>
                </li>}
                {isLoggedIn &&
                <>
                    <div className='flex justify-center items-center'>
                        Credits: {credits?.data}
                    </div>
                    <li>
                        <Button 
                            onClick={():unknown => 
                                buyCredits().catch(console.error)
                            }
                        >
                            Buy Credits
                        </Button>
                    </li>
                    <li>
                        <Button 
                            variant='secondary'
                            onClick={():unknown => 
                                signOut().catch(console.error)
                            }
                        >
                            Logout
                        </Button>
                    </li>
                </>}
            </ul>
        </div>
    </header>
)
}