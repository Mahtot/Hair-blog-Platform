'use client';
import { createContext, useState, useEffect, ReactNode } from "react";

interface Blog {
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
    blogs?: Blog[];
    savedBlogs: number[];
}

interface Comment {
    id: number;
    name: string;
    email: string;
    comment: string;
}

type Comments = Comment[];

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (userData: User) => Promise<boolean>;
    addBlog: (blog: Blog) => void;  // function to add a blog
    removeBlog: (title: string) => void; // function to remove a blog by title
    addComments: (comment: Comment) => void;  //function to add comments
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [comments, setComments] = useState<Comments>([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const addComments = (comment: Comment) => {
        const storedComments = localStorage.getItem('storedComments');
        const comments = storedComments ? JSON.parse(storedComments) : [];

        comments.push(comment);
        localStorage.setItem('storedComments', JSON.stringify(comments));
        setComments(comments);
        alert('Thank you for your comment!')
    }

    const register = async (userData: User) => {
        const storedUsers = localStorage.getItem("registeredUsers");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const userExists = users.some((user: User) => user.email === userData.email);

        if (userExists) {
            alert("User with this email already exists.");
            return false;
        }

        users.push(userData);
        localStorage.setItem("registeredUsers", JSON.stringify(users));

        // Save the newly registered user as the current user
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        alert("Registration successful!");
        return true;
    };

    const login = async (email: string, password: string) => {
        const storedUsers = localStorage.getItem("registeredUsers");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const foundUser = users.find((user: User) => user.email === email && user.password === password);

        if (foundUser) {
            // Store the full user object localStorage
            setUser(foundUser);
            localStorage.setItem("user", JSON.stringify(foundUser));
            return true;
        } else {
            alert("Invalid email or password.");
            return false;
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const addBlog = (blog: Blog) => {
        if (user) {
            const updatedUser = {
                ...user,
                blogs: [...(user.blogs || []), blog]
            };
            setUser(updatedUser);
            // get the list of registered users
            const storedUsers = localStorage.getItem("registeredUsers");
            const users = storedUsers ? JSON.parse(storedUsers) : [];
            // Find the index of the user to update
            const userIndex = users.findIndex((u: User) => u.username === user.username);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser; // Update the user at the found index
            }

            localStorage.setItem("registeredUsers", JSON.stringify(users));

            // Update user in local storage
            localStorage.setItem("user", JSON.stringify(updatedUser));


        }
    };

    // function to remove a blog by title
    const removeBlog = (title: string) => {
        if (user && user.blogs) {
            const updatedBlogs = user.blogs.filter(blog => blog.title !== title);
            const updatedUser = { ...user, blogs: updatedBlogs };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    };





    return (
        <UserContext.Provider value={{ user, setUser, login, logout, register, addBlog, removeBlog, addComments }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
