import Image from "next/image";
import img from "@/public/zdGif.gif";

const Headline = () => {
    return (
        <div className="flex w-[100vw] flex-col lg:flex-row items-center bg-gradient-to-r from-[#FDEDE4] via-[#F6BFC4] to-[#F1B5BD] rounded-lg gap-5 p-6 md:p-10 shadow-lg justify-center mx-auto">
            {/* Column for the 2D girl illustration and headline */}
            <div className="flex items-center flex-col sm:flex-row gap-5 w-full md:max-w-max p-2 md:p-6 rounded-lg bg-white shadow-md">
                <Image
                    src={img}
                    alt="2D Girl"
                    width={160}
                    height={80}
                    className="object-contain"
                />
                <h2 className="headline  text-2xl md:text-3xl font-bold text-[#823a1e]">Let Your Hair Do the Talking!</h2>
            </div>

            {/* Columns for statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-[100%]">
                {/* First Column */}
                <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-md bg-[#e3aad0] hover:scale-105 transform transition-all duration-300">
                    <h3 className="font-bold text-2xl text-[#c05125]">15M+</h3>
                    <p className="text-center text-white text-[14px] sm:text-[16px]">Global monthly readers</p>
                </div>

                {/* Second Column */}
                <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-md bg-[#f2c8b9] hover:scale-105 transform transition-all duration-300">
                    <h3 className="font-bold text-2xl text-[#9C3A14]">100+</h3>
                    <p className="text-center text-[14px] sm:text-[16px]">Experienced writers & editors</p>
                </div>

                {/* Third Column */}
                <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-md bg-[#FEFDFE] hover:scale-105 transform transition-all duration-300">
                    <h3 className="font-bold text-2xl text-[#9C3A14]">6000+</h3>
                    <p className="text-center text-[14px] sm:text-[16px]">Extensively researched articles</p>
                </div>

                {/* Fourth Column */}
                <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-md bg-[#edd1d4] hover:scale-105 transform transition-all duration-300">
                    <h3 className="font-bold text-2xl text-[#9C3A14]">500+</h3>
                    <p className="text-center text-[14px] sm:text-[16px]">Subject matter experts & contributors</p>
                </div>
            </div>
        </div>
    );
}

export default Headline;
