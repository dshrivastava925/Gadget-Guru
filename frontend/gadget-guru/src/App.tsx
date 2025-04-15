import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ChatPage from "./components/ChatPage";
import StatusPage from "./components/APIStatus";

const App = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md p-4 text-2xl font-bold relative flex items-center justify-center">
        {/* Home Icon - aligned to left */}
        <Link
          to="/"
          className="absolute left-4 text-blue-600 hover:text-blue-800 text-xl"
        >
          <FaHome />
        </Link>

        {/* Centered title */}
        <span>GadgetGuru AI</span>
      </header>
      <main className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route
            path="/compare"
            element={<div>Compare Page (Coming Soon)</div>}
          />
          <Route
            path="/insights"
            element={<div>Insights Page (Coming Soon)</div>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
