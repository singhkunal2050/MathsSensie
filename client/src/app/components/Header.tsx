'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [currentRoute, setcurrentRoute] = useState('');

    const handleRouteChange = (e: any) =>{
        setcurrentRoute(e.target.dataset.route);
    }
    return <header>
        <nav className="bg-[#005bd3] text-white dark:bg-gray-800 dark:text-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" className="fill-white w-8 mr-2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 23.5V20.5H32V23.5H16ZM16 15.5V12.5H32V15.5H16ZM11 28.5H27C27.881 28.5 28.7013 28.7 29.4608 29.1C30.2203 29.5 30.8667 30.0333 31.4 30.7L37 38V7H11V28.5ZM11 41H35.5L29.05 32.55C28.7978 32.2206 28.4931 31.9632 28.1358 31.7779C27.7786 31.5926 27.4 31.5 27 31.5H11V41ZM37 44H11C10.2 44 9.5 43.7 8.9 43.1C8.3 42.5 8 41.8 8 41V7C8 6.2 8.3 5.5 8.9 4.9C9.5 4.3 10.2 4 11 4H37C37.8 4 38.5 4.3 39.1 4.9C39.7 5.5 40 6.2 40 7V41C40 41.8 39.7 42.5 39.1 43.1C38.5 43.7 37.8 44 37 44Z"/>
                    </svg>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MathSensie</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="text-white font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                        <li>
                            <Link href="/" className={`block py-2 pl-3 pr-4 bg-[#005bd3]-700 rounded md:bg-transparent md:p-0 dark:text-white`} aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/editor" className={`block py-2 pl-3 pr-4 bg-[#005bd3]-700 rounded md:bg-transparent md:p-0 dark:text-white`}>Editor</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

}