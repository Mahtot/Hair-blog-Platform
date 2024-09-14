import Navbar from "@/components/NavBar/Navbar"
import Footer from "@/components/Footer"
import img from "@/public/heroSectionPic.jpg";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full min-h-[300px] flex justify-end bg-[#F6BFC4]  bg-gradient-to-t  from-[#F1B5BD] via-[#F6BFC5] to-[#F2B9BF]">
        <div className="p-10 mt-10 bg-[#9C3A14] text-white flex sm:w-[70vw] self-end">
          <div className="contact flex flex-col gap-5">
            <h1 className=" font-bold text-2xl md:text-4xl">ABOUT HAIRYHAVEN</h1>
            <p className="w-[300px]">
              A hair salon is a business that provides clients with a variety of hair-related services. Haircutting, regular and formal styling, chemical treatments (color, highlights, perms, and keratin treatments), hair and scalp treatments, and beard and mustache shaping are all included
            </p>
          </div>
          <div>
            <Image src={img} alt="girl with a nice hair" />
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
export default About