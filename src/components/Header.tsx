import Link from 'next/link'
import { PrimaryLink } from './PrimaryLink'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '~/components/Button'
import { useBuyCredits } from '~/hooks/useBuyCredits'
import { api } from '~/utils/api'
import Image from 'next/image'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'




export function Header() {

    const PFP = api.user.getPFP.useQuery()




    const session = useSession()
    const isLoggedIn = !!session.data

    const { buyCredits } = useBuyCredits()

    const credits = api.user.getCredits.useQuery()


    // const [currPFP, setPFP] = useState('/PFP')

    // useEffect(() => {
    //     async function fetchPFP(){
    //         try{
    //             const PFP = api.user.getPFP.useQuery()?.data
    //             setPFP(`${PFP}`)
    //         } catch(error){
    //             console.error(error)
    //         }
    // }
    // fetchPFP();
    // }, ['/PFP']);


    return (
    <header className='dark:bg-gray-900'> 

        <div className='container mx-auto flex px-4 h-16 items-center justify-between'>
            <PrimaryLink href='/'>Icon Generator</PrimaryLink>
            <ul className='flex gap-4'>
                <li><PrimaryLink href='/generate'>Generate</PrimaryLink></li>
                {/* <li><PrimaryLink href='/draw'>Draw</PrimaryLink></li> */}
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
                        <Menu as='div' className='relative inline-block text-left'>
                            <Menu.Button>
                                <Image 
                                    className='rounded-full'
                                    width='40'
                                    height='40'
                                    alt='PFP'
                                    src={PFP?.data ?? '/PFP'}
                                />
                            </Menu.Button>
                            <Menu.Items className='absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                <div className='px-1 py-1'>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <button 
                                            className={`${
                                                active ? 'bg-blue-400 text-white dark:bg-grey-700' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2`}
                                            onClick={():unknown => 
                                                signOut().catch(console.error)
                                            }
                                        >
                                            Logout
                                        </button>
                                    )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Menu>
                    </li>
                </>}
            </ul>
        </div>
    </header>
)
}