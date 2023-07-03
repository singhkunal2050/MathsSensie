import React, { useState, useEffect } from 'react';
type Message = {
    sender: string;
    content: string;
};

function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    // for(let i=0; i< 20 ; i++) {
    //   setMessages([...messages, { sender: 'bot', content: "Hello! How can I assist you?" },{ sender: 'user', content: "Hello! How can I assist you?" }]);  
    // }
  }, []);

  const handleSendMessage = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const chats = await response.json();
    const messageResult = chats.map((message:any, index:number) =>{
      return {
        sender: index % 2 == 0 ? 'user' : 'bot',
        content: message.body.substring(0,Math.random()*1000%100)
      }
    });
    console.log({chats});
    const message = e.target.message.value;
    if (message.trim() !== '') {
      setMessages([...messages, ...messageResult]);
      e.target.reset();
      scrollToBottom();
    }
  };

  const abortRequest = (e: any) => {
    // TODO
    setLoading(false);
  }

  const scrollToBottom = () => {
    const chatContainer = document.getElementById('chat-container');
    if(chatContainer){
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const renderHints = () => {
    return <div className='bg-gray-100 text-gray-800 w-full mx-auto md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100 dark:bg-gray-800'>
      <h1 className='text-gray-800 dark:text-gray-100 text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center'>MathSensie</h1>
      <div className='text-gray-800 md:flex items-start text-center gap-3.5'>
        <div className='flex flex-col mb-8 md:mb-auto gap-3.5 flex-1'>
          <h2 className='dark:text-white text-gray-800 flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2'>
            <svg stroke='currentColor' fill='none' strokeWidth='1.5' viewBox='0 0 24 24' strokeLinecap='round' strokeLinejoin='round' className='h-6 w-6' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='5'></circle><line x1='12' y1='1' x2='12' y2='3'></line><line x1='12' y1='21' x2='12' y2='23'></line><line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line><line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line><line x1='1' y1='12' x2='3' y2='12'></line><line x1='21' y1='12' x2='23' y2='12'></line><line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line><line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line></svg>
            Examples</h2>
          <ul className='flex flex-col gap-3.5 w-full sm:max-w-md m-auto'>
            <button className='w-full bg-gray-50 dark:bg-white/5 dark:text-gray-100 dark:bg-gray-800 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900'>&apos;What are the tax slabs in India?&apos; →</button>
            <button className='w-full bg-gray-50 dark:bg-white/5 dark:text-gray-100 dark:bg-gray-800 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900'>&apos;Which tax slab should I chose when?&apos; →</button>
            <button className='w-full bg-gray-50 dark:bg-white/5 dark:text-gray-100 dark:bg-gray-800 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900'>&apos;What are the best tax saving techniques?&apos; →</button>
            <button className='w-full bg-gray-50 dark:bg-white/5 dark:text-gray-100 dark:bg-gray-800 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900'>&apos;What are the different investments options for tax saving?&apos; →</button>

          </ul>
      </div>
    </div>
    </div>
  }

  const renderMessages = (messages: Message[]) => {
    return messages.map((message, index) => (
      <div
        key={index}
        className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} mb-2`}
      >
        <div className="avatar mb-2">
          {
            message.sender === 'user' ? <img src="https://randomuser.me/api/portraits/women/80.jpg" className='rounded-full' width={40} height={40} alt="" /> :
            <img src="https://randomuser.me/api/portraits/women/88.jpg" className='rounded-full' width={40} height={40} alt="" />
          }
          
        </div>
        <div
          className={`rounded-lg px-4 py-2 dark:text-white ${
            message.sender === 'user' ? 'bg-gray-200 dark:bg-slate-900' : 'dark:bg-gray-700 bg-white'
          }`}
        >
          <p className={message.sender === 'user' ? 'text-right' : ''}>{message.content}</p>
        </div>
      </div>
    ))
  }

  return (
    <div className="max-w-[30vw] border-solid border-l border-l-gray-200">
      <section className=''>
        <div id="chat-container" className="flex flex-col gap-2 h-[87vh] overflow-y-auto">
          { messages?.length ? renderMessages(messages) : renderHints()  }
        </div>
        <form onSubmit={handleSendMessage} className="flex items-center p-0 bg-white dark:bg-gray-700">
          <input
            type="text"
            name="message"
            placeholder="Type your message..."
            className="flex-growborder-0 rounded-lg py-4 px-4 focus:outline-none flex-1 outline-none bottom-0 bg-white dark:bg-gray-700 dark:text-white"
            autoComplete="off"
            required
          />
          <button type='button'
            onClick={abortRequest}
            className="ml-2">
              <svg width="18" className={`dark:fill-white fill-black ${loading ? '' : 'hidden'}`} height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 14.3448V1.10345H15.75V14.3448H2.25ZM3.9375 12.6897H14.0625V2.75863H3.9375V12.6897Z" />
              </svg>
          </button>
          <button
            type="submit"
            className="ml-2 fill-gray-400"
            disabled={loading ? true : false}
          >
          <svg xmlns="http://www.w3.org/2000/svg" className={`dark:fill-white fill-black ${loading ? '!fill-gray-400' : ''}`} height="18" viewBox="0 -960 960 960" width="48"><path d="M120-160v-640l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z"/></svg>
          </button>
        </form>
      </section>
    </div>
  );
}

export default ChatComponent;
