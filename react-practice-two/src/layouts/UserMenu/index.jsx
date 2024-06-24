import React, { useState } from 'react';
import './index.css';
import avatarUser from '../../assets/image/avatar-user.jpg';
import { useToast } from '../../components/Toast/ToastManager';

const UserMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const addToast = useToast();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        console.log('User logged out');
        addToast('Logout successful!', 'success');
    };

    return (
        <div className="user-menu">
            <img src={avatarUser} alt="User Avatar" className="avatar" />
            <p className='user-name'>Kenson</p>
            <button className="dropdown-btn-menu" onClick={toggleDropdown}>
                ▼
            </button>
            {dropdownOpen && (
                <ul className="dropdown-menu-user">
                    <li className='dropdown-menu-option' onClick={handleLogout}>Logout</li>
                </ul>
            )}
        </div>
    );
};

export default UserMenu;
