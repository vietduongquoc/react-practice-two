import React from 'react';
import './HomePage.css';
import Header from '../../layouts/Header';
import Sidebar from '../../components/SideBar';

const HomePage = () => {
    return (
        <div className="homepage">
            <Header />
            <Sidebar />
            <div className="content">
                {/* Add your main content here */}
                <h1>Welcome to the Home Page</h1>
            </div>
        </div>
    );
};

export default HomePage;
