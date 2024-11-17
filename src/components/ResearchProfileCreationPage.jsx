import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaUserAlt, FaBriefcase } from "react-icons/fa";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

const ResearchProfileCreationPage = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    username: "",
    field_of_work: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingProfile, setExistingProfile] = useState(false);

  // دریافت پروفایل موجود از API
  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/profile/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            const data = await response.json();
            if (response.status === 200) {
                setProfile({
                    ...data,
                });
                setExistingProfile(true);
            }
        } catch (error) {
            console.log("خطا در بارگذاری پروفایل");
        }
    };
    fetchProfile();
}, []);



  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    console.log("Profile state before submit:", profile); 

    try {
        const url = existingProfile
            ? `http://127.0.0.1:8000/profile/profiles/${profile.id}`
            : "http://127.0.0.1:8000/profile/create";

        const response = await fetch(url, {
            method: existingProfile ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(profile),
        });

        const result = await response.json();
        console.log("Server response:", result); 

        if (response.status === 200) {
            setSuccess(true);
        } else {
            setError(result.detail || "خطا در ارسال اطلاعات.");
        }
    } catch (error) {
        setError("خطا در ارتباط با سرور.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl ">
        <h2 className="text-3xl font-bold text-center mb-6 ">
          {existingProfile ? "ویرایش پروفایل" : "ساخت پروفایل"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-600 text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-center mb-4">
              پروفایل شما با موفقیت به روز شد!
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <FaUser className="text-blue-500" />
            <input
              type="text"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              placeholder="نام"
              className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3">
            <FaUserAlt className="text-blue-500" />
            <input
              type="text"
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              placeholder="نام خانوادگی"
              className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3">
            <FaPhone className="text-blue-500" />
            <input
              type="text"
              name="phone_number"
              value={profile.phone_number}
              onChange={handleChange}
              placeholder="شماره تلفن"
              className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3">
            <AiOutlineFieldNumber className="text-blue-500" />
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              placeholder="نام کاربری"
              className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3">
            <FaBriefcase className="text-blue-500" />
            <input
              type="text"
              name="field_of_work"
              value={profile.field_of_work}
              onChange={handleChange}
              placeholder="حوضه کاری"
              className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          >
            {loading ? "در حال ارسال..." : existingProfile ? "ویرایش پروفایل" : "ارسال و ادامه"}
            <IoIosArrowForward className="inline mr-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResearchProfileCreationPage;
