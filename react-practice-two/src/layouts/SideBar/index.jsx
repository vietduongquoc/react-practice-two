import bookshelfIcon from '../../assets/image/sidebarIconBookshelf.jpg';
import homeIcon from '../../assets/image/sidebarIconHome.jpg';
import logoIcon from '../../assets/image/Logo.jpg';
import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <aside className='sidebar'>
                <figure className="sidebar-Logo">
                    <a className='link-homepage' href="/"><img src={logoIcon} alt="Logo" className="Logo-icon" /></a>
                </figure>
                <ul className='list-sidebar-link'>
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
            </aside>
        </div >
    );
};

export default Sidebar;
