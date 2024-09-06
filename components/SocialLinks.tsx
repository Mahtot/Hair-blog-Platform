'use client'
import Link from "next/link";
import { LuGithub, LuLinkedin, LuInstagram } from "react-icons/lu";

const SocialLinks = () => {
    return (
        <>
            {/* Social media icons */}
            <div className="flex gap-5  text-white ml-auto " >
                <Link href="https://github.com/Mahtot" title="Github" className="border border-[#b57d6a] rounded-full p-2 bg-white text-[#9C3A14] hover:text-white hover:bg-[#9C3A14] transition-all">
                    <LuGithub size={"1.5rem"} />
                </Link>
                <Link href="https://www.linkedin.com/in/mahtot-gher-57860a274/" title="Linkedin" className="border border-[#b57d6a] rounded-full p-2 bg-white text-[#9C3A14] hover:text-white hover:bg-[#9C3A14] transition-all">
                    <LuLinkedin size={"1.5rem"} />
                </Link>
                <Link href="https://www.instagram.com/mahtot_gher?igsh=MWp0bTVpNmxoZ2I1MA==" title="Instagram" className="border border-[#b57d6a] rounded-full p-2 bg-white text-[#9C3A14] hover:text-white hover:bg-[#9C3A14] transition-all">
                    <LuInstagram size={"1.5rem"} />
                </Link>
            </div>
        </>
    )
}
export default SocialLinks