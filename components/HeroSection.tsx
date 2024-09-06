import Image from "next/image";
import img1 from "@/public/beautiful.jpeg";
import img2 from "@/public/beautiful3.jpeg";
import img3 from "@/public/beautiful4.jpeg";
import { montserrat } from "@/app/fonts";

const HeroSection = () => {
    const pics = [
        {
            imgUrl: img1,
            title: 'Healthy Hair Tips',
            description: 'Discover essential tips for maintaining healthy and beautiful hair.'
        },
        {
            imgUrl: img2,
            title: 'Can Natural Remedies Really Increase Hair Growth?',
            description: 'Explore the effectiveness of natural remedies for enhancing hair growth.'
        },
        {
            imgUrl: img3,
            title: 'Shiny Hair',
            description: 'Learn how to achieve shiny, vibrant hair with these simple techniques.'
        },
    ];

    return (
        <div className={`md:w-[80vw] p-8 rounded-md border justify-center items-center mx-auto flex flex-col md:flex-row bg-[#F6BFC4] bg-gradient-to-t from-[#F1B5BD] via-[#F6BFC5] to-[#F2B9BF] shadow-lg ${montserrat.variable}`}>
            {pics.map((item, index) => (
                <div key={index} className={`flex gap-1 flex-col m-4 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 relative ${index % 2 === 0 ? 'rotate-1 md:top-10' : '-rotate-1'}`}>
                    <Image
                        src={item.imgUrl}
                        alt={item.title}
                        className="w-full h-auto object-cover"
                        layout="responsive"
                        width={400}
                        height={300}
                    />
                    <div className="bg-white p-4 border border-[#9C3A14] rounded-md">
                        <h3 className="text-lg font-bold text-[#9C3A14]">{item.title}</h3>
                        <p className="text-gray-700 mt-2">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeroSection;
