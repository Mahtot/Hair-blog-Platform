'use client';

import { useEffect, useState, useContext } from "react";
import blogsData from '../../../data/blogs.json';
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import PopularBlogs from "@/components/PopularBlogs";
import LatestBlogs from "@/components/LatestBlogs";
import UserContext from "@/contexts/UserContext";
import img from "@/public/beautiful.jpeg";
import { comment } from "postcss";

// Type for blog data
interface Blog {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imgUrl: string;
  by: string;
}

interface User {
  username: string;
  email: string;
  password: string;
  img: string;
  about: string;
  blogs?: Blog;
  savedBlogs: number[];
}

interface Comment {
  id: number;
  name: string;
  email: string;
  comment: string;
}

const BlogDetails = ({ params }: { params: { blogId: string } }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [errMsg, setErrMsg] = useState<boolean>(false);
  const { user, setUser, addComments } = useContext(UserContext) || {}; // Get user from context
  const [blogSaved, setBlogSaved] = useState<boolean>(false);
  const [commentForm, setCommentForm] = useState<Comment>({
    id: 0,
    name: '',
    email: '',
    comment: ''
  })


  const handleChangeComment = (e: any) => {
    const { name, value } = e.target;
    setCommentForm(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmitComment = (e: any) => {
    e.preventDefault();
    addComments?.(commentForm);
    setCommentForm({ id: 0, email: '', name: '', comment: '' })
    console.log(comment)
  }

  useEffect(() => {
    const blogId = parseInt(params.blogId);
    const foundBlog = blogsData.blogs.find((blog) => blog.id === blogId);

    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      setErrMsg(true);
    }
  }, [params.blogId]);

  // check if a blog is already saved
  useEffect(() => {
    const isblogSaved = user?.savedBlogs.find((id) => id == blog?.id)

    setBlogSaved(isblogSaved ? true : false);
  }, [blog, user])

  const addSavedBlog = () => {
    if (user && blog) {
      const updatedUser = {
        ...user,
        savedBlogs: [...(user.savedBlogs || []), blog.id] // Save the blog ID
      };
      setUser ? setUser(updatedUser) : "";

      // get the list of registered users
      const storedUsers = localStorage.getItem("registeredUsers");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Find the index of the user to update
      const userIndex = users.findIndex((u: User) => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
      }

      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Update user in local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const removeSavedBlog = () => {
    if (user && blog) {
      const updatedUser = {
        ...user,
        savedBlogs: user.savedBlogs.filter(id => id !== blog.id) // Remove the blog ID
      };
      setUser ? setUser(updatedUser) : '';
      // get the list of registered users
      const storedUsers = localStorage.getItem("registeredUsers");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Find the index of the user to update
      const userIndex = users.findIndex((u: User) => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
      }

      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Update user in local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  if (!blog) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {errMsg ? (
        <div className="mt-10 w-full md:w-3/4 mx-auto text-center">
          <h1 className="text-2xl font-bold">Blog Not Found!</h1>
        </div>
      ) : (
        <div className="comments flex flex-col md:flex-row w-full md:w-3/4 mx-auto justify-center mt-10">
          <div className="w-full flex flex-col p-5 gap-5">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-600">Written by <span className="text-[#9C3A14]">{blog.by}</span></p>
            <p className="text-gray-500">Last Updated on Jul 23, 2024</p>
            {
              user ?
                <div className="flex">
                  {
                    blogSaved ? <button onClick={removeSavedBlog} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Remove from Saved Blogs</button>
                      : <button onClick={addSavedBlog} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Read Later</button>

                  }

                </div> : ''
            }
            <Image
              src={require(`../../../public/${blog.imgUrl}`).default}
              alt={blog.tags[0]}
              className="w-full rounded-lg"
              layout="responsive"
              width={300}
              height={200}
            />
            <p className="text-lg">{blog.content}</p>
            <div className="mt-4 flex flex-wrap">
              {blog.tags.map((tag, index) => (
                <span key={index} className="text-sm bg-gray-200 px-2 py-1 rounded-lg mr-2 mb-2">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="comments flex flex-col text-[#424141] gap-5">
              <h2 className="font-bold text-[#424141]  text-2xl md:text-4xl mb-5">Comments </h2>
              <div className="flex gap-3">
                <div className="flex items-center ">
                  <Image src={img} alt="commentator" className="w-[80px] sm:w-20 h-[60px] sm:h-16 rounded-[50%] " />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-bold">Rita</p>
                  <p>Finally I realized I am not alone on this! Nice Tips!</p>
                </div>
              </div>
              <div>
                <h2 className="flex  flex-col sm:flex-row gap-2 ">Was this article helpful?<button className="text-[#9C3A14] hover:text-[#da6d42] text-left hover:underline  transition-all duration-300">Leave a comment</button></h2>
                <form onSubmit={handleSubmitComment} className={` mt-3 flex flex-col   sm:w-[40vw] gap-3`}>
                  <input type="text" name="name" value={commentForm.name}
                    onChange={handleChangeComment} placeholder="Name" required className="p-2 pb-0 border border-t-0 border-l-0 border-r-0 outline-0 focus:outline-0 focus:border-[#8e5c49] focus:border-b-2 transition-all duration-300" />
                  <input type="email" name="email" value={commentForm.email}
                    onChange={handleChangeComment} placeholder="Email address" required className="p-2 pb-0 border border-t-0 border-l-0 border-r-0 outline-0 focus:outline-0 focus:border-[#8e5c49] focus:border-b-2 transition-all duration-300" />
                  <textarea name="comment" value={commentForm.comment}
                    onChange={handleChangeComment} placeholder="Name" className="p-2 pb-0 border border-t-0 border-l-0 border-r-0 outline-0 focus:outline-0 focus:border-[#8e5c49] focus:border-b-2 transition-all duration-300" />
                  <button type="submit" className="sm:w-[200px] bg-[#F6BFC5] text-[#9C3A14] p-2 rounded shadow-md hover:bg-[#9C3A14] hover:text-white transition duration-300">
                    Comment
                  </button>
                </form>
              </div>

            </div>
          </div>
          <div className="hidden md:flex flex-col md:w-1/3 p-5 ml-5">
            <PopularBlogs />
            <LatestBlogs />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BlogDetails;


