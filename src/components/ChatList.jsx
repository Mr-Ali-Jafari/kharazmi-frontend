import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatList = ({ setReceiverId }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8000/chat/recent", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className="w-1/4 bg-white border-r shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Chats</h2>
      <ul className="mt-4 space-y-2">
        {chats.map((chat) => (
          <li
            key={chat.partner.id}
            className="p-2 border rounded-md cursor-pointer hover:bg-gray-200"
            onClick={() => setReceiverId(chat.partner.id)}
          >
            {chat.partner.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
