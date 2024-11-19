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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAQlBMVEV0qpz///94rJ9ppJVup5j7/fzC19H0+Pdlo5OrycHV49+yzsa40cqKtqrn7+2Su7Dd6ebN3tlcno2BsaWjxLuav7UZXoJDAAADMElEQVRIiZ2Xi3KsIAyGkQTFO+ru+7/qSUJEUPa0W6cz3a58JPlzgZrmfIZ+Pex/n2Pth7Tc6O8RAM2PDwKMBTjgLyhlcbjAyf8W48dPJzjBN5wxMEVw+Mqe2BwErIVHKtDPR72QwfH5Fo52IW9c6D+gOBL4CBDNlS3X1+OHxgz3NzgLsoTFSaYAKj7DYHqscG5ED+DnIe6wDNNR7o+9We8GyU7QesC9TU6HuUBXc9x82MiG5geOpcmeIt2HsaU9Lojz4yax9gfgMXb0sc1IW4CIfdD3GKu5e3nxGqXOMj0KUEqpaWZ6De8uepeWwov+tnVQI+K1QTJh+SOoUkBCbVABkW1sXeO8QRZzERnhCE0bUWyy8rxAIHtu3hP4kkhlC60fFvyNdxB7ek+SnGC389LeaSqWFQxSlNMDJKJZ0VygN7By0JuxGjCspPgDpC+DNxm4W6k3LjVYo8Q1kGNh/y9Qh9LEwqA/R9R4ByHEJMGlKkGcV6cqbSnHJUjhQAlSFjG6q3nhiF81EHPQxWaAmXUdDL/zbVY7CRy01AjcVVV5fNek2vMb9/VNnDEqxlkJB+3dQUpTy5Y67ltwyWRKhyUZeK0o35agp7KTLzh21fUqAPJ189xOsUUyV8mT3UVwTr5etWrZEq+OQy4Th0AfQa7z5Q5yJcZCodVLno4MhBoYp+ImLQQvdxZAAZJb4QGmqmLlEafYGGOXgfhO1ZqBpNgqJroVzkIZ7J6DntRdTQ0ECaoJViYcN6HPQFyblKYMnKQSYxNebZ9ZROOuQZeBb51F2vatqpTE2blsl3Na5cPqnEU8aEKWFwXZ+a4yrGQW6axGlGxrwLopB21MBZTaeaXBqbXXvSHlOD88cpAHHV1AdOS/upRUmcWhL6405REg/TMeCEcv2m5G1/JJVJ6jtjjmtDPOWXoepn7Jh/8JFgcrzCFx7a6nK9J37n6W2/tRDsc0LHR6c73NfJyb0eXT7QKflwe5LUgmXNyhwhH4vK5Ey+nYOIfcA6xckKLhPjC7tEdtawI/mIw+46drmf3TJVBBKo8/gs34vU2rV+vfXMhrIF3e/HfsCTby74P9GUjgP1rAG9tkhEg8AAAAAElFTkSuQmCC"
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
