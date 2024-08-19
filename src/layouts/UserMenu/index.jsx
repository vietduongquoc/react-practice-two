import { useToast } from '../../components/Toast/ToastProvider';
import avatarUser from '../../assets/images/avatar-user.jpg';
import React, { useState, useEffect, useRef } from 'react';
import { logoutUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useLoading } from '../../components/Spinner/LoadingProvider';

const UserMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const username = localStorage.getItem('username') || sessionStorage.getItem('username');
    const addToast = useToast();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

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
        try {
            showLoading();
            await logoutUser();

            // Remove authentication information from localStorage and sessionStorage
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword');
            localStorage.removeItem('username');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('username');

            hideLoading();
            addToast('Logout successful!', 'success');
            navigate('/login');
        } catch (error) {
            addToast('Logout failed! Please try again.', 'error');
        }
    };

    return (
        <div className="user-menu" ref={dropdownRef}>
            <img src={avatarUser} alt="User Avatar" className="avatar" onClick={toggleDropdown} />
            <p className='user-name' onClick={toggleDropdown}>{username}</p>
            <Button
                className="dropdown-btn-menu"
                onClick={toggleDropdown}
                text={`${dropdownOpen ? '▲' : '▼'}`}
            />
            {dropdownOpen && (
                <ul className="dropdown-menu-user">
                    <li className='dropdown-menu-option' onClick={handleLogout}>Logout</li>
                </ul>
            )}
        </div>
    );
};

export default UserMenu;
