import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image'
import { api } from "~/utils/api";
import { PrimaryLink } from "~/components/PrimaryLink";

function HeroBanner(){
  return <section className='grid grid-cols-2 gap-12 px-8 mt-24'>
    <div className='flex flex-col gap-4'>
      <h1 className='text-4xl'>Generate Thumbnails with a Click of a Button</h1>
      <p className='text-2xl'>Use AI to generate thumbnails instead of paying a designer and waiting for them to create them for you</p>
    </div>
    <div>
      <Image
        width='500'
        height='800'
        alt='Hero'
        src='/bgaigen.png'
        />
    </div>
    <PrimaryLink href='/generate'>Generate Your Icons</PrimaryLink>
  </section>
}

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });


  return (
    <>
      <Head>
        <title>Thumbnail Generator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex flex-col items-center">
        <HeroBanner />
      </main>
    </>
  );
};

export default Home;


