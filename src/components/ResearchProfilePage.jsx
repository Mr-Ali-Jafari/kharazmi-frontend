import { useState, useEffect } from 'react';
import { FaUser, FaPhoneAlt, FaUserEdit, FaBriefcase, FaRegIdCard } from 'react-icons/fa';

const ResearchProfilePage = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    username: '',
    field_of_work: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/profile/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.log("خطا در دریافت پروفایل");
        }
      } catch (error) {
        console.error("خطا در ارتباط با سرور:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
      <header className="flex flex-col items-center py-12 bg-opacity-80 bg-black shadow-lg rounded-xl mb-12 transform transition-all hover:scale-105">
        <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <FaUser className="text-6xl text-white animate-bounce" />
        </div>
        <h1 className="text-4xl font-bold">{profile.first_name} {profile.last_name}</h1>
        <p className="text-lg mt-2 opacity-75 text-center max-w-lg">{profile.field_of_work}</p>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-10">
        <section className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaUserEdit className="text-3xl text-yellow-400 animate-pulse" />
              <p className="text-xl">{profile.first_name} {profile.last_name}</p>
            </div>

            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-3xl text-green-400 animate-bounce" />
              <p className="text-xl">{profile.phone_number}</p>
            </div>

            <div className="flex items-center space-x-4">
              <FaRegIdCard className="text-3xl text-blue-400 animate-pulse" />
              <p className="text-xl">{profile.username}</p>
            </div>

            <div className="flex items-center space-x-4">
              <FaBriefcase className="text-3xl text-red-400 animate-bounce" />
              <p className="text-xl">{profile.field_of_work}</p>
            </div>
          </div>
        </section>
      </main>



    </div>
  );
};

export default ResearchProfilePage;
