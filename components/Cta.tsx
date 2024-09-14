import Link from "next/link";

const Cta = () => {
    return (
        <div className="cta flex flex-col items-center  py-12 px-4 text-center mt-[100px]  shadow-md font-montserrat">
            <h1 className="font-bold text-3xl md:text-4xl text-[#9C3A14] font-montserrat mb-5">
                Got Amazing Hair Tips or Stories?
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto leading-relaxed font-montserrat">
                Whether you are a professional hairstylist or simply passionate about hair care,
                your knowledge and stories are invaluable. The world is ready for your tips and experiences!
            </p>
            <Link href="/user-account" className="mt-auto max-w-max p-2 px-10 rounded-sm flex gap-2 border border-[#b57d6a] bg-white text-[#9C3A14] hover:text-white hover:bg-[#9C3A14] transition-all duration-300">
                Share Your Story

            </Link>
        </div>
    );
};

export default Cta;
