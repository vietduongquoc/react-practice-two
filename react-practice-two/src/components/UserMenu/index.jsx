import React, { useState } from 'react';
import './index.css';

const UserMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        console.log('User logged out');
    };

    return (
        <div className="user-menu">
            <img src="/path-to-avatar.jpg" alt="User Avatar" className="avatar" />
            <button className="dropdown-btn" onClick={toggleDropdown}>
                ▼
            </button>
            {dropdownOpen && (
                <ul className="dropdown-menu">
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            )}
        </div>
    );
};

export default UserMenu;
