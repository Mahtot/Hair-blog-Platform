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
import { FaUserCircle } from "react-icons/fa";
import AuthorProfile from "@/components/AuthorProfile";
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
  const [blogs, setBlogs] = useState<Blog[]>([]); //related articles 
  const [errMsg, setErrMsg] = useState<boolean>(false);
  const { user, setUser, addComments, comments } = useContext(UserContext) || {}; // Get user from context
  const [blogSaved, setBlogSaved] = useState<boolean>(false);
  const [showAuthor, setShoweAuthor] = useState<boolean>(false)
  const [commentForm, setCommentForm] = useState<Comment>({
    id: parseInt(params.blogId),
    name: '',
    email: '',
    comment: ''
  })

  useEffect(() => {
    setBlogs(blogsData.blogs);
  }, []);


  const handleChangeComment = (e: any) => {
    const { name, value } = e.target;
    setCommentForm(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmitComment = (e: any) => {
    e.preventDefault();
    addComments?.(commentForm);
    setCommentForm({ id: 0, email: '', name: '', comment: '' })
    console.log(comments)
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
            <h1 className="text-3xl font-bold mb-4 ">{blog.title}</h1>
            <div className="relative " onMouseEnter={() => setShoweAuthor(true)} onMouseLeave={() => setShoweAuthor(false)}>
              <p className="text-gray-600 relative ">Written by <span className={`text-[#9C3A14] `} >{blog.by}</span></p>
              {showAuthor && <div className="absolute z-50 top-7" ><AuthorProfile /></div>}
            </div>
            <p className="text-gray-500">Last Updated on Jul 23, 2024</p>
            {
              user ?
                <div className="flex">
                  {
                    blogSaved ? <button onClick={removeSavedBlog} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:opacity-80 transition-all duration-300">Remove from Saved Blogs</button>
                      : <button onClick={addSavedBlog} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80 transition-all duration-300">Read Later</button>

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
            <div className="comments flex flex-col text-[#424141] gap-5 mt-5 p-5 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="font-bold text-[#424141] text-2xl md:text-4xl mb-4">Comments</h2>

              {/* Comment Section */}
              <div className="flex flex-col p-4 gap-5">
                {/* Static Commentator */}
                <div className="flex gap-4 items-center rounded-sm bg-white shadow-sm p-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={img}
                      alt="commentator"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-gray-700">
                    <p className="font-bold text-lg sm:text-xl">Rita</p>
                    <p className="text-sm sm:text-base text-gray-600">
                      Finally I realized I am not alone on this! Nice Tips!
                    </p>
                  </div>
                </div>

                {/* Dynamic Comments */}
                {comments && comments.length > 0 && (
                  <div className="mt-2 flex flex-col gap-3">
                    {comments.filter(item => item.id === blog.id).map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 py-2 flex gap-3 items-start bg-white shadow-sm p-4 rounded-sm"
                      >
                        <FaUserCircle size={'3rem'} className="text-[#9C3A14] flex-shrink-0" />
                        <div className="flex flex-col justify-center text-gray-700">
                          <p className="font-bold text-base sm:text-lg">{item.name}</p>
                          <p className="text-gray-800 text-sm sm:text-base">{item.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>



              {/* Feedback Section */}
              <div className="mt-5 p-4">
                <h2 className="flex flex-col sm:flex-row gap-2 items-center">
                  <span>Was this article helpful?</span>
                  <p className="text-[#9C3A14]  text-left  transition-all duration-300">
                    Leave a comment
                  </p>
                </h2>

                {/* Comment Form */}
                <form onSubmit={handleSubmitComment} className="mt-3 flex flex-col sm:w-[40vw] gap-5 ">
                  <input
                    type="text"
                    name="name"
                    value={commentForm.name}
                    onChange={handleChangeComment}
                    placeholder="Name"
                    required
                    className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#8e5c49] transition duration-300"
                  />
                  <input
                    type="email"
                    name="email"
                    value={commentForm.email}
                    onChange={handleChangeComment}
                    placeholder="Email address"
                    required
                    className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#8e5c49] transition duration-300"
                  />
                  <textarea
                    name="comment"
                    value={commentForm.comment}
                    onChange={handleChangeComment}
                    placeholder="Your comment"
                    className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#8e5c49] transition duration-300"
                  />
                  <button type="submit" className="bg-[#F6BFC5] text-[#9C3A14] p-2 rounded shadow-md hover:bg-[#9C3A14] hover:text-white transition duration-300">
                    Comment
                  </button>
                </form>
              </div>
            </div>
            <div className="flex flex-col mt-10 items-center sm:items-start px-4 sm:px-0">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Author</h2>
              <AuthorProfile />
            </div>

          </div>
          <div className="hidden md:flex flex-col md:w-1/3 p-5 ml-5">
            <PopularBlogs />
            <LatestBlogs />
          </div>
        </div>
      )}
      <div className="flex w-[100vw] md:w-[80vw] p-10 mx-auto mt-[100px] flex-col gap-3">
        <h1 className="font-bold text-3xl md:text-4xl text-[#1d1d1d] text-center">
          RELATED ARTICLES

        </h1>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-7 font-montserrat">
          {blogs.length > 0 ? (
            blogs.slice(3, 6).map(blog => (
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

export default BlogDetails;


