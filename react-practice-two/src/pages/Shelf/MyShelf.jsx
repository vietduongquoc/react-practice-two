import { fetchFavorites, deleteFavorite } from '../../services/servicesFavorite';
import { fetchShelfBooks, deleteShelfBook } from '../../services/servicesShelf';
import { useLoading } from '../../components/Spinner/LoadingProvider';
import { useToast } from '../../components/Toast/ToastProvider';
import { getCurrentUserId } from '../../services/servicesUser';
import { getListBookById } from '../../services/servicesBook';
import React, { useState, useEffect } from 'react';
import Header from '../../layouts/Header';
import BorrowBooks from '../BorrowBooks';
import FavoriteBooks from '../FavoriteBooks';

const MyShelf = () => {
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentTab, setCurrentTab] = useState('all');
    const { showLoading, hideLoading } = useLoading();
    const [favoriteBooks, setFavorites] = useState([]);
    const [borrowBooks, setBorrowBooks] = useState([]);
    const addToast = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        showLoading();
        try {
            const userId = getCurrentUserId();

            // Fetch shelf books and favorite books concurrently
            const [shelfBooksResult, favoriteBooksResult] = await Promise.all([
                fetchShelfBooks(userId),
                fetchFavorites(userId)
            ]);

            // Process shelf books
            const shelfBookIds = shelfBooksResult.map(item => item.bookId);
            const shelfBooksList = await getListBookById(shelfBookIds);
            const formattedShelfBooks = shelfBooksList.map(book => ({
                shelfId: shelfBooksResult.find(item => item.bookId === book._id.$oid)._id.$oid,
                ...book
            }));

            setBorrowBooks(formattedShelfBooks);
            setFilteredBooks(formattedShelfBooks);

            // Process favorite books
            const favoriteBookIds = favoriteBooksResult.map(item => item.bookId);
            const favoriteBooksList = await getListBookById(favoriteBookIds);
            const formattedFavoriteBooks = favoriteBooksList.map(book => ({
                favoriteId: favoriteBooksResult.find(item => item.bookId === book._id.$oid)._id.$oid,
                ...book
            }));

            setFavorites(formattedFavoriteBooks);
            setFilteredFavorites(formattedFavoriteBooks);
        } catch (error) {
            addToast('Error fetching books: ' + error.message, 'error');
        } finally {
            hideLoading();
        }
    };

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    const handleReturnBook = async (shelfId) => {
        try {
            await deleteShelfBook(shelfId);
            setBorrowBooks(prevBooks => prevBooks.filter(book => book.shelfId !== shelfId));
            setFilteredBooks(prevFilteredBooks => prevFilteredBooks.filter(book => book.shelfId !== shelfId));
            addToast('Book returned from shelf', 'success');
        } catch (error) {
            addToast('Error returning book: ' + error.message, 'error');
        }
    };

    const handleUnlikeBook = async (favoriteId) => {
        try {
            await deleteFavorite(favoriteId);
            setFavorites(prevFavorites => prevFavorites.filter(book => book.favoriteId !== favoriteId));
            setFilteredFavorites(prevFilteredFavorites => prevFilteredFavorites.filter(book => book.favoriteId !== favoriteId));
            addToast('Book removed from favorites', 'success');
        } catch (error) {
            addToast('Error removing book: ' + error.message, 'error');
        }
    };

    return (
        <div className="my-shelf-container">
            <div className="main-content">
                <Header
                    setFilteredBooks={currentTab === 'all' ? setFilteredBooks : setFilteredFavorites}
                    myShelf={currentTab === 'all' ? borrowBooks : favoriteBooks}
                />
                <div className="content">
                    <div className='myshelf-page'>
                        <h1 className='myshelf-title'>Your <span>Shelf</span></h1>
                        <div className="tabs">
                            <button className={`tab ${currentTab === 'all' ? 'active' : ''}`} onClick={() => handleTabChange('all')}>All Books</button>
                            <button className={`tab ${currentTab === 'favorites' ? 'active' : ''}`} onClick={() => handleTabChange('favorites')}>Favorite</button>
                        </div>
                        {currentTab === 'all' && (
                            <BorrowBooks borrowBooks={filteredBooks} handleReturnBook={handleReturnBook} />
                        )}
                        {currentTab === 'favorites' && (
                            <FavoriteBooks favoriteBooks={filteredFavorites} handleUnlikeBook={handleUnlikeBook} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyShelf;
