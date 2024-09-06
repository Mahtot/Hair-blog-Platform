'use client';
import Card from "./Card";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import blogsData from '../data/blogs.json';


// Type for blog data
interface Blog {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imgUrl: string;
    by: string;
}

const HairStyles = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        setBlogs(blogsData.blogs);
    }, []);

    return (
        <div className="flex w-[100vw] md:w-[80vw] p-10 mx-auto mt-[100px] flex-col">
            <h1 className="font-bold text-2xl md:text-3xl text-[#1d1d1d] text-center">
                Hair Styles
            </h1>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10 font-montserrat">
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
    )
}
export default HairStyles