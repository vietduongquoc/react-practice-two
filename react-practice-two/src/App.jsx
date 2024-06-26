import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/Login';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/Register';
import PreviewPage from './pages/PreviewPage/Preview';
import Loading from './components/Spinner/Loading';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/preview-page/:bookId" element={<PreviewPage />} />
            </Routes>
            <Loading />
        </Router>
    );
};

export default App;
