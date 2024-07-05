import Sidebar from '../../layouts/SideBar';
import React from 'react';
import './index.css';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout-container">
            <Sidebar />
            <div className="content-container">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;