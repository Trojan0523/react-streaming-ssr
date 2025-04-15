import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-blue-50 p-5 rounded-lg shadow-sm" style={{ gridArea: 'sidebar' }}>
      <h2 className="text-lg font-bold text-gray-800">Sidebar</h2>
      <ul className="list-none p-0 m-0 mt-3">
        <li className="mb-2.5"><a href="/profile" className="text-blue-600 font-bold hover:underline">Profile</a></li>
        <li className="mb-2.5"><a href="/settings" className="text-blue-600 font-bold hover:underline">Settings</a></li>
        <li className="mb-2.5"><a href="/dashboard" className="text-blue-600 font-bold hover:underline">Dashboard</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
