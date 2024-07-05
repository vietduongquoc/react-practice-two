import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/Register';
import PreviewPage from './pages/PreviewPage/Preview';
import Loading from './components/Spinner/Loading';
import { getToken } from './services/servicesUser';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/Login';
import MyShelf from './pages/Shelf/MyShelf';
import MainLayout from './layouts/Main';

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
                <Route path="/" element={<PrivateRoute element={<MainLayout><HomePage /></MainLayout>} />} />
                <Route path="/my-shelf" element={<PrivateRoute element={<MainLayout><MyShelf /></MainLayout>} />} />
                <Route path="/preview-page/:bookId" element={<PrivateRoute element={<MainLayout><PreviewPage /></MainLayout>} />} />
            </Routes>
            <Loading />
        </Router>
    );
};

export default App;
