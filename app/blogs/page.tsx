'use client';

import { useEffect, useState } from "react";
import blogsData from '../../data/blogs.json';
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Paginations from "@/components/Pagination";

// Type for blog data
interface Blog {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imgUrl: string;
  by: string;
}

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image
        src={require(`../../public/${blog.imgUrl}`).default}
        alt={blog.title}
        className="w-full h-40 object-cover rounded-md"
        width={400}
        height={160}
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold text-[#1d1d1d]">{blog.title}</h3>
        <p className="text-gray-600 text-sm mt-2">{blog.content.substring(0, 100)}...</p>
        <Link href={`/blogs/${blog.id}`} className="text-[#9C3A14] hover:underline mt-2 block">
          Read more
        </Link>
      </div>
    </div>
  );
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeSession, setActiveSession] = useState<string>('All');
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const allBlogs = blogsData.blogs;
    setBlogs(allBlogs);
    setFilteredBlogs(allBlogs);
  }, []);

  useEffect(() => {
    switch (activeSession) {
      case 'All':
        setFilteredBlogs(blogs);
        break;
      case 'Curly Hair':
        setFilteredBlogs(blogs.filter(blog => blog.tags.includes('Curly Hair')));
        break;
      case 'Wavy Hair':
        setFilteredBlogs(blogs.filter(blog => blog.tags.includes('Wavy Hair')));
        break;
      case 'Straight Hair':
        setFilteredBlogs(blogs.filter(blog => blog.tags.includes('Straight Hair')));
        break;
      case 'Hair Products':
        setFilteredBlogs(blogs.filter(blog => blog.tags.includes('Hair Products')));
        break;
      case 'Hair Braids':
        setFilteredBlogs(blogs.filter(blog => blog.tags.includes('Hair Braids')));
        break;
      default:
        setFilteredBlogs(blogs);
    }
  }, [activeSession, blogs]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedBlogs = filteredBlogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex flex-col items-center mt-10">
        <h1 className="font-bold text-3xl md:text-4xl text-[#742b5b] text-center">
          {activeSession} Blogs
        </h1>
        {/* Category Section */}
        <div className="flex flex-col w-full justify-center p-4 ">
          <div className="flex gap-2 overflow-x-auto overflow-y-hidden justify-start md:justify-center">
            {['All', 'Curly Hair', 'Wavy Hair', 'Straight Hair', 'Hair Products', 'Hair Braids'].map(category => (
              <button
                key={category}
                onClick={() => setActiveSession(category)}
                className={`p-2 rounded-md w-[120px] font-bold text-center transition-transform transform hover:scale-105 shadow-md ${activeSession === category ? 'bg-[#F6BFC4] bg-gradient-to-t from-[#F1B5BD] via-[#F6BFC5] to-[#F2B9BF] text-white' : 'bg-gray-200 hover:bg-[#F6BFC5] text-gray-800'
                  } whitespace-nowrap`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="">
          {/* Blog Section */}
          <div className="flex flex-col w-full">
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {paginatedBlogs.length > 0 ? (
                paginatedBlogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <div className="text-center">
                  <p>Loading...</p>
                </div>
              )}
            </div>
            <div className="flex mx-auto mt-10">
              <Paginations
                count={Math.ceil(filteredBlogs.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
