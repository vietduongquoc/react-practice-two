import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Image from '../../layouts/Logo';
import homeIcon from '../../assets/image/Sidebar-icon-home.jpg';
import bookshelfIcon from '../../assets/image/Sidebar-icon-Bookshelf.jpg';

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className='sidebar'>
                <div className="sidebar-logo">
                    <Image />
                </div>
                <ul className='List-sidebar-link'>
                    <li className='sidebar-link'>
                        <Link to="/">
                            <img src={homeIcon} alt="Home" className="sidebar-icon" />
                            <span className='sidebar-title-home'>Home</span>
                        </Link>
                    </li>
                    <li className='sidebar-link'>
                        <Link to="/my-shelf">
                            <img src={bookshelfIcon} alt="My Shelf" className="sidebar-icon" />
                            <span className='sidebar-title-myshelf'>My Shelf</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div >
    );
};

export default Sidebar;
