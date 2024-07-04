import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/Login';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/Register';
import PreviewPage from './pages/PreviewPage/Preview';
import Loading from './components/Spinner/Loading';
import MyShelf from './pages/Shelf/MyShelf';
import { getToken } from './services/servicesUser';

const PrivateRoute = ({ element }) => {
    const token = getToken();
    return token ? element : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
                <Route path="/my-shelf" element={<PrivateRoute element={<MyShelf />} />} />
                <Route path="/preview-page/:bookId" element={<PrivateRoute element={<PreviewPage />} />} />
            </Routes>
            <Loading />
        </Router>
    );
};

export default App;
