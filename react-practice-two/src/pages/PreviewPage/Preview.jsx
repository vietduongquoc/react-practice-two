import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Preview.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import Button from '../../components/Button';
import { fetchBookById, updateBookStatus } from '../../services/servicesBook';
import authorImage from '../../assets/image/preview-image.png';
import arrowBack from '../../assets/image/arrow-small-left.png';
import rateStars from '../../assets/image/rate-stars.png'
import { useLoading } from '../../components/Spinner/LoadingProvider';
import { useToast } from '../../components/Toast/ToastProvider';

const PreviewPage = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [status, setStatus] = useState('In-shelf');
    const { showLoading, hideLoading } = useLoading();
    const addToast = useToast();

    const fetchBookDetail = async (bookId) => {
        try {
            const { data } = await fetchBookById(bookId)
            setBook(data)
            console.log('result: ', data)
        } catch (error) {
            console.log('error: ', error)
        }

    }

    useEffect(() => {
        if (bookId) {
            fetchBookDetail(bookId)
        }
    }, [bookId])

    useEffect(() => {
        if (book) {
            hideLoading(); // Hide loading when book is set
        }
    }, [book, hideLoading]);

    const handleBorrowBook = async () => {
        if (status === 'In-shelf') {
            showLoading();
            try {
                const { error } = await updateBookStatus(bookId, true);
                if (error) {
                    addToast('Failed to borrow book: ' + error, 'error');
                } else {
                    setStatus('Borrowed');
                    setBook(prevBook => ({ ...prevBook, status: true })); // Update the book status
                    addToast('Book borrowed successfully', 'success');
                }
            } catch (error) {
                addToast('Failed to borrow book: ' + error.message, 'error');
            } finally {
                hideLoading();
            }
        }
    };

    if (!book) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <div className="preview-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content">
                    <div className="preview-page">
                        <figure className='wrap-back-arrow'>
                            <a className='link-homepage' href="/home-page"><img src={arrowBack} alt="Arrow" className='icon-arrow' /></a>
                            <figcaption><a className='link-homepage' href="/home-page">Back to results</a></figcaption>
                        </figure>
                        <div className="preview-content">
                            <div className='preview-left'>
                                <div className='wrap-preview-book-image'>
                                    <img src={book.urlImage} alt={book.name} className="preview-book-image" />
                                </div>
                                <div className="preview-book-details">
                                    <h1 className="preview-book-title">{book.name}</h1>
                                    <div className='preview-book-ders'>
                                        <img src={rateStars} alt="stars" className="icon-start" />
                                        <p className="preview-book-rate">5.0 Ratings</p>
                                        <p>25 Currently reading</p>
                                        <p>119 Have read</p>
                                    </div>
                                    <div className='wrap-status'>
                                        <ul className="availability-title">Availability
                                            <li className='availability-ders'>
                                                <input type="checkbox" checked={true} readOnly />
                                                <label>Hard Copy</label>
                                            </li>
                                            <li className='availability-ders'>
                                                <input type="checkbox" checked={true} readOnly />
                                                <label>E - Book</label>
                                            </li>
                                            <li className='availability-ders'>
                                                <input type="checkbox" checked={true} readOnly />
                                                <label>Audio book</label>
                                            </li>
                                        </ul>
                                        <div className="status">
                                            <p>Status</p>
                                            <Button
                                                className={status === 'In-shelf' ? "btn-enable" : "btn-primary"}
                                                text={status === 'In-shelf' ? 'In-shelf' : 'None'}
                                                borderRadius="btn-rounded"
                                                size="btn-medium"
                                                isDisabled={false}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        borderRadius="btn-rounded"
                                        size="btn-big"
                                        className={status === 'In-shelf' ? "btn-primary" : "btn-disabled"}
                                        disabled={status !== 'In-shelf'}
                                        onClick={handleBorrowBook}
                                        text="BORROW"
                                    />
                                </div>
                            </div>
                            <aside className="preview-right">
                                <div className='preview-right-wrap-header'>
                                    <div className='wrap-title'>
                                        <h2 className="preview-title">About <span>Author</span></h2>
                                        <p>{book.author}</p>
                                    </div>
                                    <img src={authorImage} alt='authorImage' className="preview-image" />
                                </div>
                                <p className="preview-description">Steve Krug is a usability consultant who has more than 30 years of experience
                                    as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success
                                    of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design.</p>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;