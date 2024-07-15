import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import PreviewPage from './pages/PreviewPage';
import Loading from './components/Spinner/Loading';
import { getToken } from './services/userService';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyShelf from './pages/MyShelf';
import MainLayout from './layouts/Main';

const PrivateRoute = ({ element }) => {
    const token = getToken();
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    // Check if the user is logged in either by token or by remember me
    if (token || rememberMe) {
        return element;
    }
    // If not logged in, redirect to the login page
    return <Navigate to="/login" />;
};

const HomeComponent = <MainLayout component={<HomePage/>} />
const MyShelfComponent = <MainLayout component={<MyShelf/>} />
const PreviewComponent = <MainLayout component={<PreviewPage/>} />

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<PrivateRoute element={HomeComponent} />} />
                <Route path="/my-shelf" element={<PrivateRoute element={MyShelfComponent} />} />
                <Route path="/preview-page/:bookId" element={<PrivateRoute element={PreviewComponent} />} />
            </Routes>
            <Loading />
        </Router>
    );
};

export default App;
