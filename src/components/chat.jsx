import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chat = ({ onNewChat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  

  const hitRequest = async () => {
    if (message) {
      await generateResponse(message);
    } else {
      alert("You must write something...!");
    }
  };

  const generateResponse = async (msg) => {
    const genAI = new GoogleGenerativeAI("Your Gemini AI Api key");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
      
  
     
    
    setMessages((prev) => [
      ...prev, 
      { type: "userMsg", text: msg }, 
      { type: "responseMsg", text: result.response.text() }
    ]);
    setMessage("");
  };

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();   
    }
    setMessages([]);   
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      hitRequest();
    }
  };

  useEffect(() => {
     
    inputRef.current.focus();
  }, []);

  return (
    <div className="h-[80vh] bg-black text-white">
      <div className="header pt-6 flex items-center justify-between px-8">
        <h2 className='text-2xl font-semibold'>CBOT</h2>
        <button 
          className='bg-[#181818] p-3 rounded-full text-[14px] px-6' 
          onClick={handleNewChat}
        >
          New Chat
        </button>
      </div>

      <div className="messages my-6 px-8 space-y-4 overflow-y-auto max-h-[55vh]">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg ${msg.type === "userMsg" ? 'bg-[#2e2e2e]' : 'bg-[#1a1a1a]'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="bottom w-full flex items-center justify-center py-4">
        <div className="inputBox w-[80%] flex items-center bg-[#181818] rounded-full px-4">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            className='p-4 bg-transparent flex-1 outline-none text-white'
            placeholder='Write your message...'
          />
          <IoSend 
            className={`text-[24px] ${message ? 'text-green-500 cursor-pointer' : 'text-gray-500'}`} 
            onClick={hitRequest} 
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
