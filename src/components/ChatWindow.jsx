import React, { useState } from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import ConnectionStatus from "./ConnectionStatus"; 

const ChatWindow = ({ isSidebarExpanded }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setLoading(true);

      try {

        const response = await fetch("http://127.0.0.1:8000/ai/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputValue }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.response, sender: "bot" },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "خطا در دریافت پاسخ از مدل.", sender: "bot" },
          ]);
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "خطا در ارسال درخواست.", sender: "bot" },
        ]);
      }
      setInputValue("");
      setLoading(false);
    }
  };

  return (
    <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-16'} h-screen flex flex-col`}>

      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative shadow-lg">
        <div className="absolute top-4 right-4 text-white text-xs bg-gray-800 shadow-lg animate-pulse">
          <ConnectionStatus />
        </div>
        {messages.length === 0 ? (
          <p className="text-gray-300 text-center mt-10 animate-fade-in">
            هنوز پیامی ارسال نشده. گفتگو را شروع کنید!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="flex items-start mb-3 animate-slide-in">
              <img
                style={{ borderRadius: '50%' }}
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-10 h-10 mr-2 border-2 border-purple-400 shadow-lg"
              />
              <div className={`bg-gradient-to-r ${msg.sender === 'user' ? 'from-gray-800 to-gray-700' : 'from-purple-800 to-blue-700'} text-white p-3 shadow-md transition transform hover:scale-105`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>


      <div className="p-4 bg-gray-800 border-t border-gray-700 shadow-inner flex items-center">
        <button className="mr-2 text-yellow-400 hover:text-yellow-300 transition duration-200">
          <FaSmile size={24} />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 border border-gray-600 p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 placeholder-gray-400 shadow-lg"
          placeholder="پیام خود را بنویسید..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-3 ml-3 shadow-md transform hover:bg-blue-500 transition duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : <FaPaperPlane size={16} />}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
