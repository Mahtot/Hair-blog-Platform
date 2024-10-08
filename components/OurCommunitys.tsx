import Image from "next/image";
import img1 from "@/public/beautiful.jpeg";
import img2 from "@/public/beautiful3.jpeg";
import img3 from "@/public/beautiful4.jpeg";
import img4 from "@/public/hairStyle1.jpeg";
import img5 from "@/public/hairStyle2.jpeg";
import img6 from "@/public/hairStyle3.jpeg";
import img7 from "@/public/hairStyle4.jpeg";
import img8 from "@/public/hairStyle5.jpeg";
import img9 from "@/public/hairStyle6.jpeg";
import img10 from "@/public/hairStyle7.jpeg";
import img11 from "@/public/hairStyle8.jpeg";
import img12 from "@/public/fashionHai.jpeg";
import Marquee from "react-fast-marquee";

const OurCommunitys = () => {
    const imgsFirst = [img1, img2, img3, img4, img5, img6];
    const imgsSecond = [img7, img8, img9, img10, img11, img12];

    return (
        <div className="flex flex-col w-full gap-10">
            <h1 className="font-bold text-3xl md:text-4xl text-[#1d1d1d] text-center">
                Our Communities
            </h1>

            {/* Marquee for imgsFirst */}
            <div className="marquee-left">
                <div className="marquee-content-left">
                    <Marquee direction="right">
                        {imgsFirst.map((item, index) => (
                            <Image
                                src={item}
                                alt="Our community member"
                                key={index}
                                className="h-[300px] w-[220px] rounded-lg mx-2 transition-all duration-300"
                            />
                        ))}</Marquee>
                </div>
            </div>

            {/* Marquee for imgsSecond */}
            <div className="marquee-right">
                <div className="marquee-content-right">
                    <Marquee >
                        {imgsSecond.map((item, index) => (
                            <Image
                                src={item}
                                alt="Our community member"
                                key={index}
                                className="h-[300px] w-[220px] rounded-lg mx-2 transition-all duration-300"
                            />
                        ))}
                    </Marquee>
                </div>
            </div>

        </div>
    );
};

export default OurCommunitys;
