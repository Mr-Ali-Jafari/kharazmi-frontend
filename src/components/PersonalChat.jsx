import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PersonalChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/profile/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(response.data.username);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }
  };

  const fetchMessages = async () => {
    if (selectedUser && currentUser) {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/personal/messages/${currentUser}/${selectedUser}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setMessages(response.data); // پیام‌ها را مستقیماً به‌روز کن
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    }
  };

  const sendMessage = (content) => {
    if (socket && content.trim() && selectedUser) {
      // ایجاد پیام با فرمت مورد نظر
      const newMessage = content;  // فقط محتوای پیام (بدون نام فرستنده)
      
      // افزودن پیام به لیست محلی
      setMessages((prev) => [...prev, { content: newMessage }]);
    
      // ارسال پیام از طریق WebSocket با فرمت جدید
      socket.send(content); // ارسال محتوای پیام به صورت ساده
    
      // پاک کردن فیلد ورودی
      setInput("");
    }
  };
  
  
  

  useEffect(() => {
    if (selectedUser && currentUser) {
      const ws = new WebSocket(
        `ws://localhost:8000/personal/ws/${selectedUser}/${currentUser}`
      );
  
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // مطمئن شوید که فقط محتوای پیام به درستی اضافه می‌شود
        setMessages((prev) =>
          prev.some((msg) => msg.id === message.id) ? prev : [...prev, message]
        );
      };

      setSocket(ws);
  
      return () => ws.close();
    }
  }, [selectedUser, currentUser]);

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 1000); // رفرش هر ثانیه
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex">
      {/* User List */}
      <div className="w-1/3 bg-gray-800 h-full overflow-y-auto border-r border-gray-800">
        <h2 className="text-lg font-bold p-4 border-b border-gray-800 text-white">Contacts</h2>
        <ul className="text-white">
          {users.length > 0 ? (
            users.map((username, index) => (
              <li
                key={index}
                onClick={() => setSelectedUser(username)}
                className={`p-3 rounded cursor-pointer ${
                  selectedUser === username ? "bg-blue-200" : "hover:bg-blue-100"
                }`}
              >
                <span>{username}</span>
                <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              </li>
            ))
          ) : (
            <li>No users found.</li>
          )}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 h-full flex flex-col">
        <header className="bg-gray-800 text-white p-4 text-lg font-bold  ">
           {selectedUser || "Select a user"}
        </header>
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
          {messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`mb-3 ${
                msg.sender === currentUser ? "text-right" : "text-left"
              }`}
            >
              <p
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === currentUser
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.sender === currentUser ? "You: " : `${msg.sender}: `}
                {msg.content}
              </p>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        <form
          className="flex p-4 border-t border-gray-300 bg-gray-800"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
            setInput("");
          }}
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="ml-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalChat;
