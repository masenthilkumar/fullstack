'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GlobalApi from '@/app/_utilities/GlobalApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';

function CreateAccount() {
    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const router=useRouter();
    const [loader,setLoader]=useState();

    useEffect(()=>{ // Check jwt & if true then redirect to home page
          const jwt=sessionStorage.getItem('jwt');
          if(jwt)
          {
            router.push('/');
          }
        },[])

    const onCreateAccount=()=>{
      setLoader(true);
        GlobalApi.registerUSer(username,email,password).then(resp=>{
            console.log(resp.data.user)
            console.log(resp.data.jwt)
            sessionStorage.setItem('user',JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt',resp.data.jwt);
            toast("Account has been Created Successfully");
            router.push('/');
            setLoader(false);
        },(e)=>{
          toast(e?.response?.data?.error?.message);
          setLoader(false);
        })
    };
  return (
    <div className='flex items-baseline justify-center my-32'>
      <div className='flex flex-col items-center justify-center p-10 bg-yellow-100 border-yellow-300'>
        <Image src='/images/nesto-logo.png' width={200} height={100} alt='logo'></Image>
        <h2 className='font-bold text-3xl'>Create an Account</h2>
        <h2 className='text-gray-500'>Enter your Email and Password to Create an Account</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
            <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)} className='border-amber-500'/>
            <Input placeholder='name@example.com' onChange={(e)=>setEmail(e.target.value)} className='border-amber-500' />
            <Input type='Password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='border-amber-500' />
            <Button onClick={()=>onCreateAccount()} variant="outline" disabled={!(username||email||password)} className="bg-transparent border-amber-950 bg-yellow-300 border-solid font-bold text-amber-900">
                {loader?<LoaderIcon className='animate-spin'/>:'Create an Account'}
            </Button>
            <p>Already have an Account &nbsp;
                <Link href={'/sign-in'} className='text-blue-500'>
                Click here to Sign-In
                </Link>
            </p>

        </div>
      </div>
    </div>
  )
}

export default CreateAccount
