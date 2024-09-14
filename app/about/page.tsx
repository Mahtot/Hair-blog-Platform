import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer";
import img from "@/public/heroSectionPic.jpg";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="w-full flex justify-end ">
        <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto p-6 sm:p-10 bg-[#9C3A14] text-white shadow-lg rounded-lg mt-10">
          {/* Text Content */}
          <div className="contact flex flex-col gap-5 md:w-1/2">
            <h1 className="font-extrabold text-3xl md:text-5xl leading-tight">ABOUT HAIRYHAVEN</h1>
            <p className="text-lg md:text-xl leading-relaxed">
              HairyHaven is a premier hair salon offering a variety of hair-related services. From cutting-edge haircuts to chemical treatments, beard shaping, and more — we are here to help you look your best. Our goal is to provide a relaxing, enjoyable experience with personalized care for each client.
            </p>
          </div>

          {/* Image */}
          <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
            <Image
              src={img}
              alt="Girl with nice hair"
              className="rounded-lg shadow-lg"
              placeholder="blur"
              width={400}
              height={400}
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
