import Image from "next/image";
import Link from "next/link";
import img from "@/public/beautiful.jpeg";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const AuthorProfile = () => {
    return (
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-2xl w-full sm:max-w-md transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="flex gap-4 items-center">
                <div className="flex-shrink-0">
                    <Image
                        src={img}
                        alt="Author"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center text-gray-700">
                    <p className="font-bold text-lg sm:text-xl">Natalia Dmitrieva</p>
                    <p className="text-sm sm:text-base text-gray-500">Hair Stylist</p>
                    <div className="flex gap-2 mt-2">
                        <Link href="https://facebook.com" target="_blank" className="text-blue-600 hover:text-blue-700">
                            <FaFacebook size={24} />
                        </Link>
                        <Link href="https://instagram.com" target="_blank" className="text-pink-500 hover:text-pink-600">
                            <RiInstagramFill size={24} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-gray-600 leading-relaxed">
                <p className="text-sm sm:text-base mb-3">
                    Natalia Dmitrieva has been doing hair for many years. She's not only
                    great with styles but also at hair care.
                </p>
                <Link href="/natalia-dmitrieva" className="text-[#9C3A14] hover:underline">
                    View Profile
                </Link>
            </div>
        </div>
    );
};

export default AuthorProfile;
