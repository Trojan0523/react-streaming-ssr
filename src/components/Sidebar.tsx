import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside>
      <h2>Sidebar</h2>
      <ul className="sidebar-menu">
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
