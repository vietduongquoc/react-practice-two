import { fetchFavorites, deleteFavorite } from '../../services/servicesFavorite';
import { fetchShelfBooks, deleteShelfBook } from '../../services/servicesShelf';
import { useLoading } from '../../components/Spinner/LoadingProvider';
import { useToast } from '../../components/Toast/ToastProvider';
import { getCurrentUserId } from '../../services/servicesUser';
import { getListBookById } from '../../services/servicesBook';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../components/Icon';
import Button from '../../components/Button';
import Header from '../../layouts/Header';

const MyShelf = () => {
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentTab, setCurrentTab] = useState('all');
    const { showLoading, hideLoading } = useLoading();
    const [favorites, setFavorites] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
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

            setBooks(formattedShelfBooks);
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
            const result = await deleteShelfBook(shelfId);
            await fetchData();
            addToast('Book returned from shelf', 'success');
        } catch (error) {
            addToast('Error returning book: ' + error.message, 'error');
        }
    };

    const handleUnlikeBook = async (favoriteId) => {
        try {
            const result = await deleteFavorite(favoriteId);
            await fetchData();
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
                    books={currentTab === 'all' ? books : favorites}
                />
                <div className="content">
                    <div className='myshelf-page'>
                        <h1 className='myshelf-title'>Your <span>Shelf</span></h1>
                        <div className="tabs">
                            <button className={`tab ${currentTab === 'all' ? 'active' : ''}`} onClick={() => handleTabChange('all')}>All Books</button>
                            <button className={`tab ${currentTab === 'favorites' ? 'active' : ''}`} onClick={() => handleTabChange('favorites')}>Favorite</button>
                        </div>
                        {currentTab === 'all' && (
                            <div className="books-list">
                                {filteredBooks.map(book => (
                                    <article key={book._id.$oid} className="book-item">
                                        <div className='book-item-column-left'>
                                            <img src={book.urlImage} alt={book.name} className="book-item-image" />
                                            <h3 className='book-item-name'>{book.name}</h3>
                                            <p className='book-item-author'>{book.author}</p>
                                            <p className="book-item-rate">5.0 Ratings</p>
                                        </div>
                                        <aside className="book-item-column-right">
                                            <div className="book-item-column-right-text">
                                                <p className='book-item-status'>Borrowed on </p>
                                                <p className='book-item-time'>11 Mar 2023 09:00 AM</p>
                                            </div>
                                            <Button
                                                onClick={() => handleReturnBook(book.shelfId)}
                                                text="Return"
                                                className="btn-return"
                                                size="btn-large"
                                            />
                                        </aside>
                                    </article>
                                ))}
                            </div>
                        )}
                        {currentTab === 'favorites' && (
                            <div className="books-list">
                                <div className='wrap-book-item-favourite-title'>
                                    <p className='title-one'>Title</p>
                                    <p className='title-two'>Ratings</p>
                                    <p className='title-three'>Category</p>
                                    <p className='title-four'>Status</p>
                                </div>
                                {filteredFavorites.map(book => (
                                    <div key={book._id.$oid} className="book-item-favourite">
                                        <img src={book.urlImage} alt={book.name} className="book-item-favourite-image" />
                                        <div className='book-item-favourite-content'>
                                            <h3 className='book-item-name'>{book.name}</h3>
                                            <p className='book-item-author'>{book.author}</p>
                                        </div>
                                        <p className="book-item-favourite-rate">4.5/<span>5</span></p>
                                        <div className='book-item-favourite-category'>
                                            <p>Computer Science</p>
                                            <p>Ux Design</p>
                                        </div>
                                        <Button
                                            text="In-Shelf"
                                            className="btn-In-Shelf"
                                            color="btn-enable"
                                            borderRadius="btn-rounded"
                                        />
                                        <HeartIcon
                                            className="heart-icon"
                                            onClick={() => handleUnlikeBook(book.favoriteId)}
                                        />
                                        <Button
                                            onClick={() => navigate(`/preview-page/${book._id.$oid}`)}
                                            text="Preview"
                                            className="btn-preview"
                                            borderRadius="btn-rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyShelf;

