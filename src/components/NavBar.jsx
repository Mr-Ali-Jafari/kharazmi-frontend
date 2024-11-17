import React from 'react';
import { FaHome, FaUserFriends, FaCog, FaUser } from 'react-icons/fa';
import { AiFillRocket } from "react-icons/ai";
import { LuListTodo } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { TbDoorExit } from "react-icons/tb";
import { FaCalculator } from "react-icons/fa";


const NavBar = ({ onLogout }) => {
  return (
    <div className="bg-gray-700 text-white w-16 flex flex-col items-center h-screen shadow-md">
      <div className="flex items-center justify-center h-16">
        <AiFillRocket className="text-3xl" />
      </div>
      <nav className="flex-1">
        <ul className="space-y-4 mt-6">
          <li className="flex items-center justify-center hover:bg-gray-700 p-2 rounded">
            <Link to="/">
              <FaHome className="text-2xl" />
            </Link>
          </li>
          <li className="flex items-center justify-center hover:bg-gray-700 p-2 rounded">
            <Link to="/research-profile">
              <FaUser className="text-2xl" />
            </Link>
          </li>
          <li className="flex items-center justify-center hover:bg-gray-700 p-2 rounded">
            <FaUserFriends className="text-2xl" />
          </li>
          <li className="flex items-center justify-center hover:bg-gray-700 p-2 rounded">
            <Link to="/create-profile">
              <FaCog className="text-2xl" />
            </Link>
          </li>
          <li className="flex items-center justify-center hover:bg-gray-700 p-2 rounded">
            <Link to="/todolist">
              <LuListTodo className="text-2xl" />
            </Link>
          </li>

          <li className="flex items-center justify-center hover:bg-gray-700 p-2 rounded">
            <Link to="/calculator">
              <FaCalculator className="text-2xl" />
            </Link>
          </li>


        </ul>
      </nav>
      <button
        onClick={onLogout}
        className="bg-red-600 p-2 rounded-full mt-4 hover:bg-red-700 mb-4"
      >
        <TbDoorExit className="text-2xl" />
      </button>
    </div>
  );
};

export default NavBar;
