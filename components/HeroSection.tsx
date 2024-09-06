import Image from "next/image";
import img from "@/public/heroSectionPic.jpg";
import { nunito, montserrat } from "@/app/fonts";
import Link from "next/link";

const HeroSection = () => {
    return (
        <div className={` md:w-[80vw] p-8 rounded-t-none rounded-3xl border justify-center items-center mx-auto flex flex-col md:flex-row bg-[#F6BFC4] bg-gradient-to-t from-[#F1B5BD] via-[#F6BFC5] to-[#F2B9BF] shadow-lg ${montserrat.variable}`}>
            {/* Montserrat is applied to the whole section */}
            <div className="flex flex-col gap-4 md:w-1/2">
                <h1 className="text-3xl text-[#da5520] md:text-5xl font-bold text-center md:text-left">
                    Your Hair is Your Best Accessory
                </h1>
                <h2 className={` text-lg text-[#da5520] md:text-4xl font-semibold text-center md:text-left ${nunito.variable}`}>
                    Say Goodbye to Hair Loss and Unhealthy Hair!
                </h2>

                <Link href="/blogs" className="flex justify-center mt-4 px-6 py-2 bg-[#da5520] text-white rounded-lg shadow hover:bg-[#c54a1b] transition duration-300">
                    Read Our Blogs
                </Link>
            </div>
            <div className="flex md:w-1/2 h-[400px] justify-center items-center">
                <Image src={img} alt="A lady with nice hair" className="max-w-full h-auto rounded-lg shadow-md" />
            </div>
        </div>
    );
};

export default HeroSection;
