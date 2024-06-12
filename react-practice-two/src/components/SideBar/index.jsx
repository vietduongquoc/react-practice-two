import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Image from '../../layouts/Logo';
// import { FaHome, FaBook } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <Image />
            </div>
            <ul>
                <li>
                    <Link to="/">
                        {/* <FaHome className="sidebar-icon" /> */}
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/my-shelf">
                        {/* <FaBook className="sidebar-icon" /> */}
                        <span>My Shelf</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
