import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!groupName.trim()) {
      setError('نام گروه الزامی است.');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('لطفاً ابتدا وارد حساب کاربری شوید.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/chat/create-group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: groupName,
          description: description || null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || 'گروه با موفقیت ایجاد شد!');
        setTimeout(() => navigate('/'), 2000);
      } else {
        const data = await response.json();
        setError(data.detail || 'خطا در ایجاد گروه.');
      }
    } catch (err) {
      console.error('Error creating group:', err);
      setError('مشکلی در هنگام ایجاد گروه پیش آمد.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">ایجاد گروه جدید</h2>
        <form onSubmit={handleCreateGroup}>
          <div className="mb-4">
            <label
              htmlFor="groupName"
              className="block text-gray-700 font-bold mb-2"
            >
              نام گروه
            </label>
            <input
              id="groupName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="نام گروه را وارد کنید"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              توضیحات گروه
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات گروه را وارد کنید"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 text-sm mb-4">
              {success}
            </p>
          )}

          {/* دکمه‌ها */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ایجاد گروه
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              بازگشت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPage;
