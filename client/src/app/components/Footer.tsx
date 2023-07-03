import Link from 'next/link';

export default function Footer() {
   return <footer hidden className="bg-[#005bd3] text-white dark:bg-gray-800 dark:text-white">
         <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-white sm:text-center ">© 2023 <Link href="/" className="hover:underline">MathSensie™</Link>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0 text-white">
               <li>
                  <Link href="/" className="mr-4 hover:underline md:mr-6 ">About</Link>
               </li>
               <li>
                  <Link href="/" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
               </li>
               <li>
                  <Link href="/" className="mr-4 hover:underline md:mr-6">Licensing</Link>
               </li>
               <li>
                  <Link href="/" className="hover:underline">Contact</Link>
               </li>
            </ul>
         </div>
      </footer>
}