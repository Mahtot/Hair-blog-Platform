'use client';

import { useEffect, useState } from "react";
import blogsData from '../../data/blogs.json';
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer";
//  type for  blog data
interface Blog {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs(blogsData.blogs);
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div>

      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
