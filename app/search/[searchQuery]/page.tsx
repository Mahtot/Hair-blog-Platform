'use client';

import { useEffect, useState } from "react";
import blogsData from '../../../data/blogs.json';
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer";
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

const SearchResults = ({ params }: { params: { searchQuery: string } }) => {
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const query = params.searchQuery?.toLowerCase();
        const searchResults = blogsData.blogs.filter(blog =>
            blog.title.toLowerCase().includes(query) ||
            blog.content.toLowerCase().includes(query) ||
            blog.tags.some(tag => tag.toLowerCase().includes(query))
        );
        setFilteredBlogs(searchResults);
    }, [params.searchQuery]);

    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="flex flex-col items-center py-8 px-4">
                <h2 className="text-2xl font-bold text-[#3f2436] mb-4">
                    {filteredBlogs.length}  Search Results for "{params.searchQuery}"
                </h2>

                {filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredBlogs.map(blog => (
                            <Card key={blog.id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 mt-4">No blogs found matching your query.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
