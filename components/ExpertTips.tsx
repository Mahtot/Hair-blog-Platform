'use client';

import { useEffect, useState } from "react";
import blogsData from '../data/blogs.json';
import Image from "next/image";
//  type for  blog data
interface Blog {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imgUrl: string;
}

const ExpertTips = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        setBlogs(blogsData.blogs);
    }, []);

    return (
        <div className="flex md:w-[80vw] mx-auto mt-20 flex-col">
            <h1 className="font-bold text-2xl md:text-3xl text-[#1d1d1d]">
                Expert Tips
            </h1>
            <div>
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <div key={blog.id}>
                            <h2>{blog.title}</h2>
                            <Image src={blog.imgUrl}
                                alt={blog.tags[0]}
                                className="w-[200px] h-auto"
                            />
                            <p>{blog.content}</p>
                        </div>
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
export default ExpertTips