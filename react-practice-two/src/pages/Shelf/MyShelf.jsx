// import { fetchFavorites, deleteFavorite } from '../../services/servicesFavorite';
// import { fetchShelfBooks, deleteShelfBook } from '../../services/servicesShelf';
// import { useToast } from '../../components/Toast/ToastProvider';
// import { getCurrentUserId } from '../../services/servicesUser';
// import { getListBookById } from '../../services/servicesBook';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import HeartIcon from '../../components/Icon';
// import Button from '../../components/Button';
// import Header from '../../layouts/Header';
// import './MyShelf.css';

// const MyShelf = () => {
//     const [currentTab, setCurrentTab] = useState('all');
//     const [books, setBooks] = useState([]);
//     const [favorites, setFavorites] = useState([]);
//     const addToast = useToast();
//     const navigate = useNavigate();
//     const [filteredBooks, setFilteredBooks] = useState([]);
//     const [filteredFavorites, setFilteredFavorites] = useState([]);

//     useEffect(() => {
//         fetchAllBooks();
//         fetchFavoriteBooks();
//     }, []);

//     const fetchAllBooks = async () => {
//         try {
//             const userId = getCurrentUserId();
//             const result = await fetchShelfBooks(userId);
//             const formatData = result.map(item => item.bookId)
//             const listBook = await getListBookById(formatData)
//             const newListBook = listBook.map(book => {
//                 return {
//                     shelfId: result.find(item => item.bookId === book._id.$oid)._id.$oid,
//                     ...book
//                 }
//             })
//             setBooks(newListBook || []);
//             // Initialize filteredBooks with all books
//             setFilteredBooks(newListBook || []);
//         } catch (error) {
//             addToast('Error fetching borrowed books: ' + error, 'error');
//         }
//     };

//     const fetchFavoriteBooks = async () => {
//         try {
//             const userId = getCurrentUserId();
//             const result = await fetchFavorites(userId);
//             const formatData = result.map(item => item.bookId)
//             const listBook = await getListBookById(formatData)

//             const newListBook = listBook.map(book => {
//                 return {
//                     favoriteId: result.find(item => item.bookId === book._id.$oid)._id.$oid,
//                     ...book
//                 }
//             });

//             setFavorites(newListBook || []);
//             // Initialize filteredFavorites with all favorites
//             setFilteredFavorites(newListBook || []);
//         } catch (error) {
//             addToast('Error fetching favorite books: ' + error, 'error');
//         }
//     };

//     const handleTabChange = (tab) => {
//         setCurrentTab(tab);
//     };

//     const handleReturnBook = async (shelfId) => {
//         try {
//             const result = await deleteShelfBook(shelfId);
//             await fetchAllBooks();
//             addToast('Book is returned from my shelf ', 'success')
//         } catch (error) {
//             addToast('Error returned books: ', 'error');
//         }
//     };

//     const handleUnlikeBook = async (favoriteId) => {
//         try {
//             console.log('favoriteId: ', favoriteId)
//             const result = await deleteFavorite(favoriteId);
//             await fetchFavoriteBooks();
//             console.log('result: ', result)
//             addToast('Book removed from favorites', 'success');
//         } catch (error) {
//             addToast('Error handling unlike book: ' + error.message, 'error');
//         }
//     };

//     return (
//         <div className="my-shelf-container">
//             <div className="main-content">
//                 <Header />
//                 <div className="content">
//                     <div className='myshelf-page'>
//                         <h1 className='myshelf-title'>Your <span>Shelf</span></h1>
//                         <div className="tabs">
//                             <button className={`tab ${currentTab === 'all' ? 'active' : ''}`} onClick={() => handleTabChange('all')}>All Books</button>
//                             <button className={`tab ${currentTab === 'favorites' ? 'active' : ''}`} onClick={() => handleTabChange('favorites')}>Favorite</button>
//                         </div>
//                         {currentTab === 'all' && (
//                             <div className="books-list">
//                                 {filteredBooks.map(book => (
//                                     <article key={book._id.$oid} className="book-item">
//                                         <div className='book-item-column-left'>
//                                             <img src={book.urlImage} alt={book.name} className="book-item-image" />
//                                             <h3 className='book-item-name'>{book.name}</h3>
//                                             <p className='book-item-author'>{book.author}</p>
//                                             <p className="book-item-rate">5.0 Ratings</p>
//                                         </div>
//                                         <aside className="book-item-column-right">
//                                             <div className="book-item-column-right-text">
//                                                 <p className='book-item-status'>Borrowed on </p>
//                                                 <p className='book-item-time'>11 Mar 2023 09:00 AM</p>
//                                             </div>
//                                             <Button
//                                                 onClick={() => handleReturnBook(book.shelfId)}
//                                                 text="Return"
//                                                 className="btn-return"
//                                                 size="btn-large"
//                                             />
//                                         </aside>
//                                     </article>
//                                 ))}
//                             </div>
//                         )}
//                         {currentTab === 'favorites' && (
//                             <div className="books-list">
//                                 <div className='wrap-book-item-favourite-title'>
//                                     <p className='title-one'>Title</p>
//                                     <p className='title-two'>Ratings</p>
//                                     <p className='title-three'>Category</p>
//                                     <p className='title-four'>Status</p>
//                                 </div>
//                                 {filteredFavorites.map(book => (
//                                     <div key={book._id.$oid} className="book-item-favourite">
//                                         <img src={book.urlImage} alt={book.name} className="book-item-favourite-image" />
//                                         <div className='book-item-favourite-content'>
//                                             <h3 className='book-item-name'>{book.name}</h3>
//                                             <p className='book-item-author'>{book.author}</p>
//                                         </div>
//                                         <p className="book-item-favourite-rate">4.5/<span>5</span></p>
//                                         <div className='book-item-favourite-category'>
//                                             <p>Computer Science</p>
//                                             <p>Ux Design</p>
//                                         </div>
//                                         <Button
//                                             text="In-Shelf"
//                                             className="btn-In-Shelf"
//                                             color="btn-enable"
//                                             borderRadius="btn-rounded"
//                                         />
//                                         <HeartIcon
//                                             className="heart-icon"
//                                             onClick={() => handleUnlikeBook(book.favoriteId)}
//                                         />
//                                         <Button
//                                             onClick={() => navigate(`/preview-page/${book._id.$oid}`)}
//                                             text="Preview"
//                                             className="btn-preview"
//                                             borderRadius="btn-rounded"
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyShelf;


import { fetchFavorites, deleteFavorite } from '../../services/servicesFavorite';
import { fetchShelfBooks, deleteShelfBook } from '../../services/servicesShelf';
import { useToast } from '../../components/Toast/ToastProvider';
import { getCurrentUserId } from '../../services/servicesUser';
import { getListBookById } from '../../services/servicesBook';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../components/Icon';
import Button from '../../components/Button';
import Header from '../../layouts/Header';
import FormControl from '../../layouts/FormControl';
import './MyShelf.css';

const MyShelf = () => {
    const [currentTab, setCurrentTab] = useState('all');
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const addToast = useToast();
    const navigate = useNavigate();
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filteredFavorites, setFilteredFavorites] = useState([]);

    useEffect(() => {
        fetchAllBooks();
        fetchFavoriteBooks();
    }, []);

    const fetchAllBooks = async () => {
        try {
            const userId = getCurrentUserId();
            const result = await fetchShelfBooks(userId);
            const formatData = result.map(item => item.bookId)
            const listBook = await getListBookById(formatData)
            const newListBook = listBook.map(book => {
                return {
                    shelfId: result.find(item => item.bookId === book._id.$oid)._id.$oid,
                    ...book
                }
            })
            setBooks(newListBook);
            // Initialize filteredBooks with all books
            setFilteredBooks(newListBook);
        } catch (error) {
            addToast('Error fetching borrowed books: ' + error, 'error');
        }
    };

    const fetchFavoriteBooks = async () => {
        try {
            const userId = getCurrentUserId();
            const result = await fetchFavorites(userId);
            const formatData = result.map(item => item.bookId)
            const listBook = await getListBookById(formatData)

            const newListBook = listBook.map(book => {
                return {
                    favoriteId: result.find(item => item.bookId === book._id.$oid)._id.$oid,
                    ...book
                }
            });

            setFavorites(newListBook);
            // Initialize filteredFavorites with all favorites
            setFilteredFavorites(newListBook);
        } catch (error) {
            addToast('Error fetching favorite books: ' + error, 'error');
        }
    };

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    const handleReturnBook = async (shelfId) => {
        try {
            const result = await deleteShelfBook(shelfId);
            await fetchAllBooks();
            addToast('Book is returned from my shelf ', 'success')
        } catch (error) {
            addToast('Error returned books: ', 'error');
        }
    };

    const handleUnlikeBook = async (favoriteId) => {
        try {
            const result = await deleteFavorite(favoriteId);
            await fetchFavoriteBooks();
            addToast('Book removed from favorites', 'success');
        } catch (error) {
            addToast('Error handling unlike book: ' + error.message, 'error');
        }
    };

    return (
        <div className="my-shelf-container">
            <div className="main-content">
                <Header
                    setFilteredBooks={currentTab === 'all' ? setFilteredBooks : setFilteredFavorites}
                    books={currentTab === 'all' ? books : favorites} />
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
