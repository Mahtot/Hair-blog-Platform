'use client';
import Image from "next/image";
import Search from "../Search";
import logo from "@/public/logo.png";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import SocialLinks from "../SocialLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

const Navbar = () => {
    const [searchIcon, setSearchIcon] = useState<boolean>(false);
    const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false);
    const asPath = usePathname(); // to get current path

    const menuItems = [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Blogs', to: '/blogs' },
        { name: 'Gallery', to: '/gallery' },
        { name: 'Contact', to: '/contact' },
        { name: 'User Account', to: '/user-account' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const searchElement = document.querySelector('.search');
            const menuElement = document.querySelector('.navMenu');
            const searchBtn = document.querySelector('.searchBtn');

            // Close search if clicking outside of the search element and the button
            if (searchIcon && searchElement && !searchElement.contains(event.target as Node) && !searchBtn?.contains(event.target as Node)) {
                setSearchIcon(false);
            }


            if (navMenuOpen && menuElement && !menuElement.contains(event.target as Node)) {
                setNavMenuOpen(false);
            }
        };

        // lock the body scroll and dim the background when menu is open
        if (navMenuOpen) {
            document.body.classList.add('fixed-body')
        }
        else {
            document.body.classList.remove('fixed-body')
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navMenuOpen, searchIcon]);

    return (
        <div className="flex flex-col w-[100vw] md:w-[80vw] mx-auto  gap-10  md:p-0 ">
            <div className={`flex h-auto p-5 md:p-2 w-full relative bg-white shadow-sm md:shadow-0 md:bg-white  items-center ${navMenuOpen ? 'z-[1000] md:z-auto' : ''}`}>
                <div className={`search hidden md:flex mx-auto w-[75vw] ${!searchIcon ? 'translate-y-0 z-[-1] hidden' : 'translate-y-full pt-4'} absolute bottom-0 transition-all duration-300`}>
                    <Search />
                </div>

                <button className="searchBtn hidden md:flex text-[#8e5c49] font-extrabold mr-auto" onClick={() => setSearchIcon(!searchIcon)}>
                    <FaSearch className="h-[100%]" size={'1.5rem'} />
                </button>

                <button className="flex md:hidden mr-auto items-center justify-center transition-all duration-300 z-[1000]" onClick={() => setNavMenuOpen(!navMenuOpen)}>
                    {navMenuOpen ? <GrClose size={'1.5rem'} className=" " /> : <GiHamburgerMenu size={'1.5rem'} className="relative " />}
                </button>

                <div className="w-[80px] z-[1000]">
                    <Image
                        src={logo}
                        alt="Hairy-haven logo"
                        className="max-w-[100%] rounded-full z-[1000]"
                    />
                </div>
                <div className="hidden md:flex gap-5 text-white ml-auto">
                    <SocialLinks />
                </div>
            </div >

            <div className={`navMenu ${navMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-[1] bg-white w-full shadow-2xl md:shadow-sm  sm:w-[50vw] md:w-auto md:items-center md:justify-center left-0 pt-20 overflow-y-auto md:overflow-hidden transition-all duration-300 top-0 bottom-0 md:top-auto md:bottom-auto h-[100dvh] flex-col md:translate-x-0 md:flex-row md:h-auto fixed md:relative flex ${!searchIcon ? 'md:mt-1 ' : 'md:mt-[40px]'} transition-all duration-300 border border-[#EB9877] border-l-0 border-r-0 gap-10 p-5 pl-10 md:pl-5 pt-5`}>
                <div className="flex md:hidden mt-32">
                    <Search />
                </div>

                {menuItems.map((item, index) => (
                    <Link
                        href={item.to}
                        key={index}
                        className={`hover:text-[#9C3A14] hover:font-bold transition-all duration-300 ${asPath === item.to ? 'text-[#9C3A14] font-bold' : ''}`}
                    >
                        {item.name}
                    </Link>

                ))}
                <div className="flex md:hidden self-start">
                    <SocialLinks />
                </div>
            </div>

        </div >
    );
};

export default Navbar;
