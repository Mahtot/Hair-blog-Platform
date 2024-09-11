'use client';
import logo from "@/public/logo.png";
import SocialLinks from "./SocialLinks";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Footer = () => {
    const menuItems = [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Blogs', to: '/blogs' },
        { name: 'Gallery', to: '/gallery' },
        { name: 'Contact', to: '/contact' },
        { name: 'User Account', to: '/user-account' },
    ];
    const [email, setEmail] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Thank you for subscribing!");
        setEmail('')
    }

    return (
        <div className="footer flex flex-col text-white mt-[150px] p-2 md:p-10 md:pb-3">
            <div className="flex mt-5 flex-col lg:flex-row justify-between items-start gap-10">
                <div className="flex flex-col gap-2">
                    {menuItems.map((item, index) => (
                        <Link
                            href={item.to}
                            key={index}
                            className="hover:text-[#eeb9a4] hover:font-bold transition-all duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col self-center">
                    <h1 className="text-lg font-bold">Subscribe</h1>
                    <p className="text-sm">Don not miss out on new hair tips for a healthier hair.</p>
                    <form onSubmit={(e) => handleSubmit(e)} className="flex mt-2 ">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            className="p-2 w-[60vw] outline-none sm:max-w-max rounded-l-md border-none text-black"
                            required
                        />
                        <button type="submit" className="max-w-max bg-[#eeb9a4] text-[#1d1d1d] p-2 rounded-r-md hover:bg-[#d99f8e] transition duration-300">
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex mr-auto mt-6">
                <SocialLinks />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-[#eeb9a4] mt-6 pt-4 text-[#9C3A14] gap-2">
                <p className="text-sm order-2 sm:order-1">© 2024 Mahtot</p>
                <div className="flex gap-4 order-1 sm:order-2">
                    <Link href="/" className="hover:underline text-sm">Terms of use</Link>
                    <Link href="/" className="hover:underline text-sm">Privacy policy</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;
