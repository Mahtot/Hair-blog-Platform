import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";


interface Blog {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imgUrl: string;
    by: string;
}

interface CardProps {
    blog: Blog;
}

const Card: React.FC<CardProps> = ({ blog }) => {
    return (
        <div className="mb-10 flex flex-col items-center justify-center">
            <Image
                src={require(`../public/${blog.imgUrl}`).default}
                alt={blog.tags[0]}
                className="sm:w-[80vw] md:h-[440px] shadow-md z-[-1] hover:scale-110 transition-all duration-300"
            />
            <div className="flex flex-col bg-white gap-3 shadow-2xl p-5 relative top-[-100px] md:mx-5 md:h-[350px]">
                <p>By {blog.by}</p>
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="mt-2 line-clamp-2 text-gray-700">{blog.content}</p>
                <Link href={`blogs/${blog.id}`} className="mt-auto max-w-max p-2 rounded-sm flex gap-2 border border-[#b57d6a] bg-white text-[#9C3A14] hover:text-white hover:bg-[#9C3A14] transition-all duration-300">
                    Read more
                    <MdOutlineArrowRightAlt size={'1.5rem'} />
                </Link>
            </div>
        </div>
    );
};

export default Card;
