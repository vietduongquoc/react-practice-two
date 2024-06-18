// CardBook.jsx
import React from 'react';
import './index.css';
import heartIcon from '../../assets/image/heart-icon.jpg'; // Import your heart icon

const CardBook = ({ book, onAddToFavorites, onPreview }) => {
    // console.log(book);
    const handleAddToFavorites = () => {
        // Call API to add book to favorites
        onAddToFavorites(book.id);
    };

    const handlePreview = () => {
        // Navigate to preview page or open modal
        onPreview(book.id);
    };


    return (
        <div className="card-book" onClick={handlePreview}>
            <img src={book.urlImage} alt={book} className="book-image" />
            <div className='wrap-card-content'>
                <div className="book-details">
                    <p className='book-details-name'>{book.name}</p>
                    <p className='book-details-author'>{book.author}</p>
                    <p className='book-details-rate'>4.5/5</p>
                </div>
                <div className="heart-icon-actions">
                    <img
                        src={heartIcon}
                        alt="Add to favorites"
                        className="heart-icon"
                        onClick={handleAddToFavorites}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardBook;
