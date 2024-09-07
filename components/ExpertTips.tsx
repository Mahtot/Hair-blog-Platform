'use client';

import { useEffect, useState } from "react";
import blogsData from '../data/blogs.json';
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Card from "./Card";




// Type for blog data
interface Blog {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imgUrl: string;
    by: string;
}

const ExpertTips = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        setBlogs(blogsData.blogs);
    }, []);

    return (
        <div className="flex w-[100vw] md:w-[80vw] p-10 mx-auto mt-[200px] flex-col">
            <h1 className="font-bold text-3xl md:text-4xl text-center text-[#1d1d1d]">
                Expert Tips
            </h1>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-7 font-montserrat">
                {blogs.length > 0 ? (
                    blogs.slice(0, 3).map(blog => (
                        <Card key={blog.id} blog={blog} />
                    ))
                ) : (
                    <div>
                        <p>Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpertTips;
