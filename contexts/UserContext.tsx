'use client'
import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
    username: string;
    email: string;
    password: string;
}

interface UserContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    register: (userData: User) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const register = (userData: User) => {
        const storedUsers = localStorage.getItem("registeredUsers");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const userExists = users.some((user: User) => user.email === userData.email);

        if (userExists) {
            alert("User with this email already exists.");
            return false;
        }

        users.push(userData);
        localStorage.setItem("registeredUsers", JSON.stringify(users));
        alert("Registration successful!");
        return true;
    };

    const login = (email: string, password: string) => {
        const storedUsers = localStorage.getItem("registeredUsers");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const foundUser = users.find((user: User) => user.email === email && user.password === password);

        if (foundUser) {
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

    return (
        <UserContext.Provider value={{ user, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
