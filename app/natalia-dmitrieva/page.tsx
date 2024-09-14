'use client';
import Image from "next/image";
import Link from "next/link";
import img from "@/public/beautiful.jpeg";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import blogsData from '../../data/blogs.json';
import { useEffect, useState } from "react";
import Card from "@/components/Card";


// Type for blog data
interface Blog {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imgUrl: string;
    by: string;
}

const Page = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        setBlogs(blogsData.blogs);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center mt-20 px-4 md:w-[80vw] mx-auto">
                <div className="text-center">
                    <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Natalia Dmitrieva</h1>
                    <p className="text-sm sm:text-lg text-gray-500 mt-2">Hair Stylist</p>
                </div>

                <div className="mt-6">
                    <Image
                        src={img}
                        alt="Author"
                        className="w-28 h-28 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <Link href="https://facebook.com" target="_blank">
                        <FaFacebook size={30} className="text-blue-600 hover:text-blue-700 transition-colors duration-300" />
                    </Link>
                    <Link href="https://instagram.com" target="_blank">
                        <RiInstagramFill size={30} className="text-pink-500 hover:text-pink-600 transition-colors duration-300" />
                    </Link>
                </div>

                <div className="mt-6 max-w-2xl text-gray-600 text-center leading-relaxed px-4">
                    <p className="text-base sm:text-lg mb-4">
                        Natalia Dmitrieva has been doing hair for many years. She specializes in hair care and stylish haircuts that suit all types of hair.
                        With a deep understanding of hair health, Natalia ensures that every style also contributes to the overall well-being of her clients' hair.
                    </p>
                    <p className="text-base sm:text-lg mb-4">
                        Beyond styling, Natalia's passion lies in educating clients about maintaining healthy, beautiful hair. Her expertise shines through in both her work and her commitment to sharing knowledge.
                    </p>
                </div>
            </div>
            <div className="flex w-[100vw] md:w-[80vw] p-10 mx-auto mt-[100px] flex-col gap-3">
                <h1 className="font-bold text-3xl md:text-4xl text-[#1d1d1d] text-center">
                    Articles Written By   Natalia Dmitrieva

                </h1>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-7 font-montserrat">
                    {blogs.length > 0 ? (
                        blogs.slice(3, 9).map(blog => (
                            <Card key={blog.id} blog={blog} />
                        ))
                    ) : (
                        <div>
                            <p>Loading...</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Page;
