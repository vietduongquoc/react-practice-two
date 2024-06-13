// HomePage.jsx
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import HomePageContent from '../../components/Home-page-conntent';
import { fetchCard, addCardToFavorites } from '../../services/servicesCard'; 

const HomePage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch books from API
        const fetchData = async () => {
            const { data, error } = await fetchCard();
            if (data) {
                setBooks(data);
            } else {
                console.error('Error fetching books:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddToFavorites = async (bookId) => {
        // Call API to add book to favorites
        const { data, error } = await addCardToFavorites(bookId);
        if (data) {
            // Update UI or show notification
        } else {
            console.error('Error adding to favorites:', error);
        }
    };

    const handlePreview = (cardId) => {
        // Navigate to preview page or open modal
        console.log('Preview book:', cardId);
    };

    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content">
                    <h1>Welcome to your Digital Library</h1>
                    <HomePageContent
                        books={books}
                        onAddToFavorites={handleAddToFavorites}
                        onPreview={handlePreview}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
