import { useToast } from '../../components/Toast/ToastProvider';
import avatarUser from '../../assets/image/avatar-user.jpg';
import React, { useState, useEffect, useRef } from 'react';
import { logoutUser } from '../../services/servicesUser';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const username = localStorage.getItem('username');
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
    }, [dropdownRef]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        logoutUser();
        addToast('Logout successful!', 'success');
        navigate('/login');
    };

    return (
        <div className="user-menu" ref={dropdownRef}>
            <img src={avatarUser} alt="User Avatar" className="avatar" onClick={toggleDropdown} />
            <p className='user-name' onClick={toggleDropdown}>{username}</p>
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
