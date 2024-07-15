import Sidebar from '../../layouts/SideBar';
import React from 'react';

const MainLayout = ({ component }) => {
    return (
        <div className="main-layout-container">
            <Sidebar />
            <main className="content-container">
                {component}
            </main>
        </div>
    );
};

export default MainLayout;