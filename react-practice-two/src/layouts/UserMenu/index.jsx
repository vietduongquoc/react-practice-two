import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import avatarUser from '../../assets/image/avatar-user.jpg';
import { useToast } from '../../components/Toast/ToastProvider';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const addToast = useToast();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        console.log('User logged out');
        addToast('Logout successful!', 'success');
        navigate('/');
    };

    return (
        <div className="user-menu">
            <img src={avatarUser} alt="User Avatar" className="avatar" onClick={toggleDropdown} />
            <p className='user-name' onClick={toggleDropdown}>Kenson</p>
            <button className="dropdown-btn-menu" onClick={toggleDropdown}>
                {dropdownOpen ? '▲' : '▼'}
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
