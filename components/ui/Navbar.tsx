'use client' // 🧠 This tells Next.js that this is a client-side component

import React, { useEffect, useState } from 'react'

// 🔐 Clerk authentication components
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

import Link from 'next/link' // 🔗 For navigation
import { Button } from './button' // 🔘 Custom button component
import { ArrowRight, Menu } from 'lucide-react' // 🎨 Icons

const Navbar = () => {

    // 📌 State to check if user has scrolled
    const [scrolled, setScrolled] = useState(false)

    // 👂 Listen to scroll event
    useEffect(() => {
        const handleScroll = () => {
            // ⬇️ If scrolled more than 20px, set true
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)

        // 🧹 Cleanup event on component unmount
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        // 🧭 Navbar header (sticky at top)
        <header
            className={`sticky top-0 bg-black/80 backdrop-blur-md z-50 transition-all duration-300 ${scrolled ? "shadow-lg shadow-navy/20" : ""}`}
        >
            {/* 📦 Navbar container */}
            <nav className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">

                {/* 🏠 Logo & Brand Name */}
                <Link href='/'>
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-navy to-navy-dark rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">SS</span>
                        </div>
                        <span className="font-semibold text-white text-lg">ServiceStack</span>
                    </div>
                </Link>

                {/* 🧭 Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm text-slate-gray hover:text-white transition-all duration-200 hover:scale-105">
                        Home
                    </Link>

                    <Link href="/categories" className="text-sm text-slate-gray hover:text-white transition-all duration-200 hover:scale-105">
                        Categories
                    </Link>

                    <Link href="/service/my" className="text-sm text-slate-gray hover:text-white transition-all duration-200 hover:scale-105">
                        My Services
                    </Link>

                    <Link href="/service/new" className="text-sm text-slate-gray hover:text-white transition-all duration-200 hover:scale-105">
                        Add Service
                    </Link>
                </div>

                {/* 🚀 Action Buttons */}
                <div className="flex items-center gap-3">
                    <Link href='/service'>
                        {/* 🔍 Explore services button */}
                        <Button className="bg-navy hover:bg-navy-dark text-white transition-all duration-300 hover:shadow-lg hover:shadow-navy/50 hover:scale-105">
                            Explore Services
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>

                        {/* 📱 Mobile menu icon */}
                        <Button variant="ghost" size="icon" className="md:hidden text-white">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>

                {/* 🔐 Authentication section */}
                {/* 🔐 Authentication section */}
                <div className="flex items-center gap-3">

                    {/* 🚪 User not signed in */}
                    <SignedOut>

                        {/* 🔑 Sign In button */}
                        <SignInButton>
                            <button className="text-sm text-slate-gray hover:text-white transition-all duration-200 hover:scale-105">
                                Sign In
                            </button>
                        </SignInButton>

                        {/* ✨ Sign Up button (Primary theme button) */}
                        <SignUpButton>
                            <button className="bg-navy hover:bg-navy-dark text-white rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-navy/50 hover:scale-105">
                                Sign Up
                            </button>
                        </SignUpButton>

                    </SignedOut>

                    {/* 👤 User signed in */}
                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                </div>


            </nav>
        </header>
    )
}

export default Navbar // 📤 Export Navbar component
