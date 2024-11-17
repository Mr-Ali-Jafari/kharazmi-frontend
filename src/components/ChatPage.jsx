import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPaperPlane, FaSmile } from "react-icons/fa";

const ChatPage = ({ isSidebarExpanded }) => {
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]); 
  const [inputMessage, setInputMessage] = useState(""); 
  const [socket, setSocket] = useState(null); 
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      fetch("http://127.0.0.1:8000/profile/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
        .then(response => response.json())
        .then(data => {
          setUsername(data.username);
        })
        .catch(error => console.error("Error fetching profile:", error));
    }
  }, []);

  // اتصال به WebSocket
  useEffect(() => {
    if (username) {
      const ws = new WebSocket(`ws://127.0.0.1:8000/chat/ws/${groupName}/${username}`);

      ws.onopen = () => {
        console.log("Connected to WebSocket");
      };

      ws.onmessage = (event) => {
        const data = event.data;
        setMessages((prevMessages) => [...prevMessages, { text: data, sender: "server" }]);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [groupName, username]);

  // ارسال پیام
  const sendMessage = () => {
    if (inputMessage.trim() && socket) {
      socket.send(inputMessage);
      setInputMessage(""); // پاک کردن ورودی
    }
  };

  return (
    <div className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-16'}`}>
      <div className="flex-grow p-4 overflow-auto bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative shadow-lg">
        <header>
          <h1 className="text-3xl font-semibold">{`Chat with ${groupName}`}</h1>
        </header>

        <div className="mt-6">
          {loading ? (
            <div>Loading messages...</div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'server' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`bg-${msg.sender === 'server' ? 'gray' : 'blue'}-500 text-white p-2 rounded-lg`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center mt-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-grow p-2 rounded-lg bg-gray-800 text-white"
          />
          <button onClick={sendMessage} className="ml-4 text-2xl">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
