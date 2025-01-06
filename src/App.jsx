import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import ResearchProfileCreationPage from './components/ResearchProfileCreationPage';
import ResearchProfilePage from './components/ResearchProfilePage';
import AuthGuard from './components/AuthGuard';
import TodoList from './components/TodoList';
import ScientificCalculator from './components/ScientificCalculator';
import ChatPage from './components/ChatPage';
import CreateGroupPage from './components/CreateGroupPage';
import PersonalChat from './components/PersonalChat';
import './index.css';
import './App.css';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('access_token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="h-screen">
        <Routes>

          <Route path="/create-group" element={<CreateGroupPage />} />

          <Route
            path="/chat/group/:groupName"
            element={
              <AuthGuard>
                <div className="flex h-screen">
                  <div className="flex-1 overflow-auto">
                    <ChatPage isSidebarExpanded={isSidebarExpanded} />
                  </div>
                  <NavBar onLogout={handleLogout} />
                  <Sidebar onToggle={setIsSidebarExpanded} />
                </div>
              </AuthGuard>
            }
          />

          <Route
            path="/calculator"
            element={
              <AuthGuard>
                <div className="flex h-screen">
                  <div className="flex-1 overflow-auto">
                    <ScientificCalculator />
                  </div>
                  <NavBar onLogout={handleLogout} />
                </div>
              </AuthGuard>
            }
          />

          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          <Route
            path="/TodoList"
            element={
              <AuthGuard>
                <div className="flex h-screen">
                  <div className="flex-1 overflow-auto">
                    <TodoList />
                  </div>
                  <NavBar onLogout={handleLogout} />
                </div>
              </AuthGuard>
            }
          />

          <Route
            path="/create-profile"
            element={
              <AuthGuard>
                <div className="flex h-screen">
                  <div className="flex-1 overflow-auto">
                    <ResearchProfileCreationPage />
                  </div>
                  <NavBar onLogout={handleLogout} />
                </div>
              </AuthGuard>
            }
          />

          <Route
            path="/research-profile"
            element={
              <AuthGuard>
                <div className="flex h-screen">
                  <div className="flex-1 overflow-auto">
                    <ResearchProfilePage />
                  </div>
                  <NavBar onLogout={handleLogout} />
                </div>
              </AuthGuard>
            }
          />

          <Route
            path="/chat-personal"
            element={
              <AuthGuard>
                <div className="flex h-screen">
                  <div className="flex-1 overflow-auto">
                    <PersonalChat />
                  </div>
                  <NavBar onLogout={handleLogout} />
                </div>
              </AuthGuard>
            }
          />

          <Route
            path="*"
            element={
              <AuthGuard>
                <div className="flex h-full">
                  <Sidebar onToggle={setIsSidebarExpanded} />
                  <ChatWindow isSidebarExpanded={isSidebarExpanded} />
                  <NavBar onLogout={handleLogout} />
                </div>
              </AuthGuard>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
