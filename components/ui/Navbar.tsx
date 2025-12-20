'use client'

import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Layers } from "lucide-react";

const Navbar = () => {
    return (
        <div className="flex items-center p-4 gap-4 h-16 border-b border-gray-200">

            <a href='/' className="flex items-center gap-2"><Layers className="w-8 h-8 text-blue-600" />ServeStack</a>
            <div className='flex gap-10 ml-50'>
                <a href='/' className=''>Home</a>
                <a href='/service'>Explore Services</a>
                <a href='/service/my'>My Services</a>
                <a href='/service/new'>Add Services</a>
            </div>

            {/* Authentication Through Clerk */}
            <div className='ml-auto'>
                <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                        <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar