import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import HomePage from './pages/HomePage/HomePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/home-page" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default App;