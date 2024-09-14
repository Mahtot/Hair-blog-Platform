'use client';

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery}`);
    }
  };


  return (
    <form onSubmit={handleSearchSubmit} className="flex border border-[#fed5f1] w-[100%] mx-auto items-center justify-center">
      <input
        type='text'
        placeholder="Search blogs..."
        value={searchQuery}
        className="border-none m-2 outline-none w-[100%] text-[#3f2436]"
        onChange={(e) => {
          setSearchQuery(e.target.value)

        }
        }
      />
      <button type="submit" className="bg-[#9C3A14] text-white font-extrabold p-3">
        <CiSearch className="h-[100%]" size={'1.5rem'} />
      </button>
    </form>
  );
};

export default Search;
