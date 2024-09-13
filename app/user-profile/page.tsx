'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar/Navbar";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useRouter } from 'next/navigation';
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import blogsData from '@/data/blogs.json';
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";


interface BlogFormData {
    title: string;
    content: string;
    img: string | null;
    tags: string;
    by: string;
}

interface User {
    username: string;
    email: string;
    password: string;
    img: string;
    about: string;
    blogs?: BlogFormData;
    savedBlogs: number[];
}


const Page = () => {
    const { user, setUser, logout, addBlog, removeBlog } = useContext(UserContext) || {};
    const [activeSection, setActiveSection] = useState('yourProfile');
    const [editProfile, setEditProfile] = useState<boolean>(false);
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        content: '',
        img: null,
        tags: '',
        by: user?.username || ''
    });
    const [profileData, setProfileData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: user?.password || '',
        bio: user?.about || ''
    });
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();


    useEffect(() => {
        if (!user) {
            router.push("/user-account");
        }
    }, [user, router]);

    // fetch user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser ? setUser(JSON.parse(storedUser)) : '';
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const menuElement = document.querySelector('.menu');
            if (menuOpen && menuElement && !menuElement.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    // Changes for new post blog
    const handleChange = (e: any) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData(prevData => ({
                ...prevData,
                img: URL.createObjectURL(files[0])
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleProfileChange = (e: any) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // handles submit of the new post
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (addBlog) {
            const blogPostData = {
                ...formData,
                img: formData.img ? formData.img : '',
                by: user?.username || ''
            };
            addBlog(blogPostData);
            setFormData({ title: '', content: '', img: null, tags: '', by: user?.username || '' });
            alert("Blog successfully created :)");
        }
    };

    const handleProfileSubmit = (e: any) => {
        e.preventDefault();

        const updatedUser = {
            ...user,
            username: profileData.username,
            email: profileData.email,
            about: profileData.bio,
            password: profileData.password,
            img: user?.img || '',
            savedBlogs: user?.savedBlogs || []

        };

        // Update the user context
        setUser ? setUser(updatedUser) : '';

        // get the list of registered users
        const storedUsers = localStorage.getItem("registeredUsers");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Find the index of the user to update
        const userIndex = users.findIndex((u: User) => u.email === profileData.email);


        if (userIndex !== -1) {
            users[userIndex] = updatedUser; // Update the user at the found index
        }

        localStorage.setItem("registeredUsers", JSON.stringify(users));

        // Update user in local storage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setEditProfile(false);
        alert("Profile updated successfully!");
    };


    const toggleMenu = () => setMenuOpen(!menuOpen);

    const renderContent = () => {
        switch (activeSection) {
            case 'newPost':
                return (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4 text-[#8e5c49]">Create a New Blog Post</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[60vw]">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="p-2 border rounded"
                                required
                            />
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Content"
                                className="p-2 border rounded h-40"
                                required
                            />
                            <label className="flex flex-col">
                                <span className="mb-2 text-[#8e5c49]">Add Picture</span>
                                <input
                                    type="file"
                                    name="img"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="p-2 border rounded cursor-pointer"
                                    required
                                />
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="Tags (comma separated)"
                                className="p-2 border rounded"
                            />
                            <button type="submit" className="sm:w-[200px] bg-[#F6BFC5] text-[#9C3A14] p-2 rounded shadow-md hover:bg-[#9C3A14] hover:text-white transition duration-300">
                                Publish Post
                            </button>
                        </form>
                    </div>
                );
            case 'yourProfile':
                return (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4 text-[#8e5c49]">
                            Your Profile
                            <button
                                onClick={() => setEditProfile(true)}
                                className="inline-flex gap-2 text-[16px] items-center ml-10 hover:underline text-[#403e3e]"
                            >
                                <CiEdit />Edit
                            </button>
                        </h2>
                        <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4 w-[60vw] text-[#635e5c]">
                            <label htmlFor="username" className="font-semibold">Username</label>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                value={profileData.username}
                                onChange={handleProfileChange}
                                disabled={!editProfile}
                                className=" p-2 border rounded"
                            />

                            <label htmlFor="email" className="mt-5 font-semibold">Email</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={profileData.email}
                                onChange={handleProfileChange}
                                disabled={!editProfile}
                                className="p-2 border rounded"
                            />

                            <label htmlFor="password" className="mt-5 font-semibold">New Password</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={profileData.password}
                                onChange={handleProfileChange}
                                disabled={!editProfile}
                                className="p-2 border rounded"
                            />

                            <label htmlFor="bio" className="mt-5 font-semibold">Bio</label>
                            <textarea
                                name='bio'
                                id='bio'
                                value={profileData.bio}
                                onChange={handleProfileChange}
                                disabled={!editProfile}
                                className="p-2 border rounded h-20"
                            />

                            <button
                                type="submit"
                                disabled={!editProfile}
                                className="sm:w-[200px] bg-[#F6BFC5] text-[#9C3A14] p-2 rounded shadow-md hover:bg-[#9C3A14] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F6BFC5] disabled:hover:text-[#9C3A14] hover:text-white transition duration-300"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                );

            case 'yourBlogs':
                return (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4 text-[#8e5c49]">Your Blogs</h2>
                        {user?.blogs && user.blogs.length > 0 ? (
                            <div className="grid gap-4">
                                {user.blogs.map((blog: any, index: number) => (
                                    <div key={index} className="border rounded p-4 shadow-md">
                                        <h3 className="text-lg font-bold">{blog.title}</h3>
                                        <p>{blog.content}</p>
                                        {blog.img && <Image src={blog.img} alt={blog.title} width={200} height={200} className="mt-2" />}
                                        <div className="flex gap-10">
                                            <p className="text-sm text-gray-500 mt-2">Tags: {blog.tags}</p>
                                            <button onClick={() => removeBlog ? removeBlog(blog.title) : ''} className="text-white bg-red-600 opacity-80 hover:opacity-100 transition-all duration-300 p-2 px-4 max-w-max inline-flex rounded-md">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h1 className="text-center">No Blogs yet.</h1>
                        )}
                    </div>
                );
            case 'savedBlogs':
                return (
                    <div className="p-4 flex flex-col items-center justify-center bg-gradient-to-t from-[#F1B5BD] via-[#F6BFC5] to-[#F2B9BF]">
                        <h2 className="text-2xl font-bold mb-6 text-[#8e5c49]">Saved Blogs</h2>
                        {user?.savedBlogs && user.savedBlogs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-montserrat">
                                {user.savedBlogs.map((blogId) => {
                                    const blog = blogsData.blogs.find(b => b.id === blogId);
                                    return blog ? (
                                        <div key={blog.id} className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                                            <Image
                                                src={`/${blog.imgUrl}`} // Adjusted for public folder
                                                alt={blog.tags[0] || 'Blog image'}
                                                className="w-full h-56 object-cover"
                                                width={500}
                                                height={400}
                                            />
                                            <div className="p-4 flex flex-col justify-between h-full">
                                                <p className="text-sm text-gray-500">By {blog.by}</p>
                                                <h2 className="text-xl font-semibold text-[#8e5c49]">{blog.title}</h2>
                                                <p className="mt-2 line-clamp-3 text-gray-700">{blog.content}</p>
                                                <Link href={`blogs/${blog.id}`} className="mt-4 inline-block p-2 rounded-md border border-[#b57d6a] bg-[#F2B9BF] text-[#9C3A14] hover:bg-[#9C3A14] hover:text-white transition-all duration-300">
                                                    Read more
                                                    <MdOutlineArrowRightAlt size={'1.5rem'} className="inline-block ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        ) : (
                            <h1 className="text-center text-lg text-gray-600">No Saved Blogs yet.</h1>
                        )}
                    </div>
                );


            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto flex flex-col md:w-[80vw] md:flex-row md:gap-10 mt-10 px-4">
                <div className="flex-grow md:w-[80vw] bg-gray-100 rounded-lg p-4 shadow-md">
                    <div className="flex justify-end items-center">
                        <div className="relative">
                            <button onClick={toggleMenu} className="flex items-center gap-2 hover:underline text-[#655650]">
                                {user?.img ? (
                                    <Image src={user.img} alt={user.username} width={30} height={30} className="rounded-full" />
                                ) : (
                                    <CgProfile size={30} className="text-[#9C3A14]" />
                                )}
                                <span className="capitalize font-semibold py-2">{user?.username}</span>
                            </button>
                            {menuOpen && (
                                <div className="menu absolute right-0 bg-white shadow-lg rounded mt-2 p-4 z-50 w-[200px] h-[350px] flex flex-col gap-3 text-center">
                                    <button onClick={() => { setActiveSection('newPost'); toggleMenu(); }} className="flex gap-2 items-center bg-[#9C3A14] text-white p-2 px-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300"><FaPlus /> New Post</button>
                                    <button onClick={() => { setActiveSection('yourProfile'); toggleMenu(); }} className="block text-left w-full hover:text-[#9C3A14] hover:bg-slate-200 p-2 px-4 rounded-lg transition-all duration-200 shadow-sm">Your Profile</button>
                                    <button onClick={() => { setActiveSection('yourBlogs'); toggleMenu(); }} className="block text-left w-full hover:text-[#9C3A14] hover:bg-slate-200 p-2 px-4 rounded-lg transition-all duration-200 shadow-sm">Your Blogs</button>
                                    <button onClick={() => { setActiveSection('savedBlogs'); toggleMenu(); }} className="block text-left w-full hover:text-[#9C3A14] hover:bg-slate-200 p-2 px-4 rounded-lg transition-all duration-200 shadow-sm">Saved Blogs</button>
                                    <button onClick={() => { logout ? logout() : ''; toggleMenu(); }} className="flex mt-auto gap-2 items-center w-full text-left hover:text-[#9C3A14] transition-all duration-200 ">
                                        <FiLogOut /> Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {renderContent()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
