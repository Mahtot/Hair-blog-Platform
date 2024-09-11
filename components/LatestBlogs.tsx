'use client';
import { useEffect, useState } from "react";
import blogsData from '../data/blogs.json';
import SmallCard from "./SmallCard";

// Type for blog data
interface Blog {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imgUrl: string;
    by: string;
}


const LatestBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        setBlogs(blogsData.blogs);
    }, []);

    return (
        <div className="flex flex-col gap-5 w-[250px] mt-[50px] border border-t-0 border-l-0 pb-7 mr-2 border-r-0 border-b-red-300">
            <h1 className="font-bold">LATEST ARTICLES</h1>
            {
                blogs.slice(5, 9).map((blog) => (
                    <SmallCard key={blog.id} img={blog.imgUrl} title={blog.title} id={blog.id} tag={blog.tags[0]} />
                ))
            }
        </div>
    );
}
export default LatestBlogs