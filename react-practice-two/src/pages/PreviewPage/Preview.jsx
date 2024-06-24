import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Preview.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import Button from '../../components/common/Button';
import { fetchCard } from '../../services/servicesCard';
import authorImage from '../../assets/image/preview-image.png';
import arrowBack from '../../assets/image/arrow-small-left.png';

const PreviewPage = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [status, setStatus] = useState('In-shelf');

    useEffect(() => {
        const fetchBookData = async (id) => {
            try {
                const { data, error } = await fetchCard();
                if (data) {
                    const bookData = data.find(b => b.id.toString() === id);
                    if (bookData) {
                        setBook(bookData);
                    } else {
                        console.error('Book not found in fetched data');
                        navigate('/'); // Handle the error scenario or navigate back
                    }
                } else {
                    console.error('Error fetching books:', error);
                    navigate('/'); // Handle the error scenario or navigate back
                }
            } catch (error) {
                console.error('Error fetching book data:', error);
                navigate('/'); // Handle the error scenario or navigate back
            }
        };

        fetchBookData(bookId);
    }, [bookId, navigate]);

    if (!book) {
        return <div>Loading...</div>;
    }

    const isAvailable = status === 'In-shelf';

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
                                <img src={book.urlImage} alt={book.name} className="preview-book-image" />
                                <div className="preview-book-details">
                                    <h1 className="preview-book-title">{book.name}</h1>
                                    <p className="preview-book-author">Author: {book.author}</p>
                                    <p className="preview-book-rate">Rate: {book.rate}/5</p>
                                    <div className='wrap-status'>
                                        <ul className="availability">Availability
                                            <li>
                                                <input type="checkbox" checked={true} readOnly />
                                                <label>Hard Copy</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" checked={false} readOnly />
                                                <label>E - Book</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" checked={false} readOnly />
                                                <label>Audio book</label>
                                            </li>
                                        </ul>
                                        <div className="status">
                                            <p>Status</p>
                                            <Button
                                                onClick={() => setStatus(isAvailable ? 'None' : 'In-shelf')}
                                                className="status-button"
                                                text={status}
                                                color="btn-primary"
                                                borderRadius="btn-rounded"
                                                size="btn-medium"
                                                isDisabled={false}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        size="btn-big"
                                        className="borrow-button"
                                        disabled={!isAvailable}
                                        text="BORROW"
                                    />
                                </div>
                            </div>
                            <aside className="preview-right">
                                <div className='preview-right-wrap-header'>
                                    <div className='wrap-title'>
                                        <h1 className="preview-title">About <span>Author</span></h1>
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
