"use client";

import Header from '../components/Header'
import Footer from '../components/Footer'
import ChatComponent from '../components/Chat'
import Editor from '../components/Editor'

export default function Chat(){
    return <div className="flex flex-col">
        <Header/>
        <div className='flex bg-gray-200 dark:bg-gray-600'>
            <Editor />
            <ChatComponent/>
        </div>
        <Footer/>
    </div>
}