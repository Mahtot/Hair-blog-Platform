'use client';

import { useEffect, useState } from "react";
import blogsData from '../../data/blogs.json';

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
    <div>
      {blogs.length > 0 ? (
        blogs.map(blog => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Blogs;
