'use client';
import { useState } from 'react';
import Image from 'next/image';
import img from '@/public/girlsTalking.jpeg';
import Navbar from '@/components/NavBar/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

interface User {
  name: string;
  email: string;
  subject: string;
  content: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    subject: '',
    content: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      content: '',
    });
  };

  return (
    <div className="flex flex-col  min-h-screen">
      <Navbar />
      <div className="contact w-full bg-gradient-to-tr from-[#F1B5BD] via-[#F6BFC5] to-[#F2B9BF] py-16 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl text-[#9C3A14] font-extrabold mb-4">Say Hello to Us</h1>
        <h2 className="text-lg md:text-2xl text-[#150C08]">We&apos;d love to hear from you!</h2>
      </div>

      <div className="flex flex-col md:flex-row md:w-[90vw] max-w-7xl mx-auto mt-10 gap-8 bg-gray-50">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:w-[50%] gap-6 p-6 bg-white shadow-lg rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-[#9C3A14]">Let&apos; Begin</h3>

          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            name="name"
            className="p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9C3A14] transition duration-300"
            required
          />

          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            name="email"
            className="p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9C3A14] transition duration-300"
            required
          />

          <input
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            name="subject"
            className="p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9C3A14] transition duration-300"
            required
          />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Message"
            className="p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9C3A14] h-40 transition duration-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#9C3A14] text-white p-3 rounded-md shadow-md hover:bg-[#8B3411] transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="flex flex-col md:w-[50%] gap-8 p-6">
          <Image src={img} alt="Two girls talking" className="rounded-lg shadow-md" />
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-[#9C3A14] mb-4">Connect with Us</h3>
            <p className="text-lg">New Business Enquiries:</p>
            <p className="text-lg font-semibold mb-4">hairyhaven@gmail.com</p>

            <div className="flex gap-6 mt-4">
              <Link href="#" target="_blank">
                <FaFacebook
                  size={30}
                  className="text-blue-600 hover:text-blue-700 transition duration-300"
                />
              </Link>
              <Link href="#" target="_blank">
                <RiInstagramFill
                  size={30}
                  className="text-pink-500 hover:text-pink-600 transition duration-300"
                />
              </Link>
              <Link href="#" target="_blank">
                <FaLinkedin
                  size={30}
                  className="text-blue-800 hover:text-blue-900 transition duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
