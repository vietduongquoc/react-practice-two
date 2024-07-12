import Sidebar from '../../layouts/SideBar';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout-container">
            <Sidebar />
            <main className="content-container">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;