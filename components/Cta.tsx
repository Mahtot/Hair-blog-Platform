import Link from "next/link"
const Cta = () => {
    return (
        <div className="bg-[#f9f9f9] py-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1d] mb-4">
                Share Your Hair Journey with Us!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
                Your experiences and insights could inspire others. Join our community and help everyone achieve healthy, beautiful hair!
            </p>
            <a
                href="/post-blog"  // Adjust the link to your blog posting page
                className="bg-[#007bff] text-white py-2 px-6 rounded-lg hover:bg-[#0056b3] transition duration-300"
            >
                Share Your Experience
            </a>
        </div>
    );
};



export default Cta