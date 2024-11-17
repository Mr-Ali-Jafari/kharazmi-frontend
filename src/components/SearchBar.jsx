import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ setReceiverId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/search?username=${searchQuery}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }
  };

  const handleSelectUser = (userId) => {
    setReceiverId(userId); 
  };

  return (
    <div className="w-1/4 bg-white border-r shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Search Users</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-md"
        placeholder="Enter username..."
      />
      <button
        onClick={handleSearch}
        className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Search
      </button>
      <ul className="mt-4 space-y-2">
        {results.map((user) => (
          <li
            key={user.id}
            className="p-2 border rounded-md cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelectUser(user.id)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
