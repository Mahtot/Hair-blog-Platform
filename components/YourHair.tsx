import Image from "next/image";
import Img from "@/public/Your hair ♥️.jpeg";
import Link from "next/link";

const YourHair = () => {
    return (
        <div className="flex flex-col md:w-[80vw] mx-auto mt-20 p-5 bg-white rounded-lg shadow-md">
            <h1 className="font-montserrat text-[#4f0e39] text-3xl md:text-5xl font-bold text-center shadow-sm">
                My Secrets for Long and Healthy Hair
            </h1>
            <div className="mt-10 flex flex-col md:flex-row w-full gap-10">
                <Image src={Img} alt="A healthy hair" className="max-w-full w-[390px] h-[360px] rounded-lg shadow-md" />
                <div className="flex flex-col md:w-[45vw]">
                    <h2 className="mb-5 text-lg">
                        By <span className="font-mono text-[#4f0e39]">Madison</span>
                    </h2>
                    <p className="text-lg leading-relaxed">
                        I often get asked about my secrets for <span className="font-bold">long and healthy hair.</span> It never fails that each time I get asked that question, I feel a little surprised. If there’s one thing I would never in a million years guess anyone would ever say about me, it’s “she has great hair!” Let me explain...
                    </p>
                    <Link href="/blogs/1" className="mt-5 text-[#4f0e39] font-bold hover:underline">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default YourHair;
