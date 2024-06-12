import React from 'react';
import './HomePage.css';
import Header from '../../layouts/Header';
import Sidebar from '../../components/SideBar';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <Sidebar />
            <Header />
            <div className="content">
                <h1>Welcome to your Digital Library</h1>
            </div>
        </div>
    );
};

export default HomePage;