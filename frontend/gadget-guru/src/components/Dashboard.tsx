import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaExchangeAlt, FaChartPie } from 'react-icons/fa';
import { FaSatelliteDish } from 'react-icons/fa6';

const Dashboard = () => {
  const routes = [
    { path: '/chat', label: 'Chat with AI', icon: <FaRobot className="text-xl" /> },
    { path: '/compare', label: 'Compare Products', icon: <FaExchangeAlt className="text-xl" /> },
    { path: '/insights', label: 'Gadget Insights', icon: <FaChartPie className="text-xl" /> },
    { path: '/status', label: 'API Status', icon: <FaSatelliteDish className="text-xl" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {routes.map(({ path, label, icon }) => (
        <Link
          to={path}
          key={path}
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
        >
          <div className="mb-2 text-blue-600">{icon}</div>
          <div className="text-lg font-semibold">{label}</div>
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
