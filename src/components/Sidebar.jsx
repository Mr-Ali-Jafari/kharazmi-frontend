import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [username, setUsername] = useState('');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    onToggle(!isExpanded);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
  
      Promise.all([
        fetch('http://127.0.0.1:8000/profile/profile', {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json()),
        fetch('http://127.0.0.1:8000/chat/groups', {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json()),
      ])
        .then(([profileData, groupData]) => {
          setUsername(profileData.username || 'User');
          setGroups(groupData.groups || []); 
        })
        .catch((err) => {
          setError('Failed to fetch data.');
        })
        .finally(() => {
          setLoading(false); 
        });
    } else {
      setError('Token not found.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 text-white h-full flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 text-white h-full flex items-center justify-center">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-800 text-white h-full p-4 transition-all duration-500 ease-in-out ${isExpanded ? 'w-64' : 'w-20'} fixed top-0 left-0 shadow-lg`}
      aria-expanded={isExpanded}
    >
      <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={toggleSidebar}>
        <h1 className={`text-lg font-semibold text-indigo-400 ${isExpanded ? 'block' : 'hidden'}`}>
          {`Username: ${username}`}
        </h1>
        <span className="text-3xl">{isExpanded ? '➖' : '➕'}</span>
      </div>

      <div className="mt-6">
        <h4 className={`font-semibold mb-4 ${isExpanded ? 'block' : 'hidden'}`}>Groups</h4>
        {groups.length ? (
          groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center mb-4 hover:bg-indigo-700 rounded-xl p-2 transition-all duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/256/2082/2082022.png"
                alt={group.name}
                className="rounded-full shadow-lg"
                style={{ width: '40px' }}
              />
              <Link to={`/chat/group/${group.name}`}>
                {isExpanded && <span className="ml-4 text-lg font-medium">{group.name}</span>}
              </Link>
            </div>
          ))
        ) : (
          <div className="text-gray-400">{isExpanded && 'No groups available.'}</div>
        )}

        <div className="flex items-center mb-4 hover:bg-green-700 rounded-xl p-2 cursor-pointer transition-all duration-300">
          <FaPlus className="text-3xl text-green-400" />
          {isExpanded && <Link to="/create-group" className="ml-4 text-lg font-medium text-green-400">Create Group</Link>}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center cursor-pointer hover:bg-indigo-700 rounded-xl p-2 transition-all duration-300">
          <FaMicrophone className="text-3xl" />
          {isExpanded && <span className="ml-4 text-lg font-medium">Voice Chat</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
