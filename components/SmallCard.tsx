import Link from "next/link";
import Image from "next/image";

//  prop types
interface SmallCardProps {
    img: string;
    title: string;
    id: number | string;
    tag: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ img, title, id, tag }) => {
    return (
        <Link href={`/blogs/${id}`} className="flex gap-4 items-center hover:text-[#9C3A14] text-gray-700">
            <Image
                src={require(`../public/${img}`).default}
                alt={tag}
                width={100}
                height={100}
                className="rounded-lg"
            />
            <h2>{title}</h2>
        </Link>
    )
}
export default SmallCard