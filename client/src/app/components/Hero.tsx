'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Hero() {

  const [email, setemail] = useState();
  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(event);
    const data = {
      email,
    }
  }

  return (
    <section className="bg-[#eaf2ff] dark:bg-gray-700 dark:text-white py-20 px-4 md:px-0">
      <div className="max-w-screen-xl mx-auto p-4 relative">
        <h1 className="text-4xl font-bold mb-6">Welcome to MathSensie</h1>
        <p className="text-lg">Unlock the power of AI with our advanced SAS product.</p>
        <div className=' mb-5' >
          <Link href="/chat"> Chat Now!</Link>
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 px-4 rounded-l-lg focus:outline-none text-black"
            required
            onChange={(e:any)=>setemail(e.target.value)}
          />
          <button className="bg-[#005bd3] dark:bg-gray-800 text-white px-6 rounded-r-lg">Subscribe</button>
        </form>
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          className='absolute right-0 bottom-[-100px] md:bottom-[-200px] w-[100px] md:w-[300px] ' 
          alt="Picture of the author"
        />
      </div>
    </section>
  );
}

export default Hero;
