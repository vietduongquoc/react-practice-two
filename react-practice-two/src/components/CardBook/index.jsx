// CardBook.jsx
import React from 'react';
import './index.css';
import heartIcon from '../../assets/image/heart-icon.jpg'; // Import your heart icon

const CardBook = ({ book, onAddToFavorites, onPreview }) => {
    console.log(book);
    const handleAddToFavorites = () => {
        // Call API to add book to favorites
        onAddToFavorites(book.id);
    };

    const handlePreview = () => {
        // Navigate to preview page or open modal
        onPreview(book.id);
    };


    return (
        <div className="card-book">
            <img src={book.urlImage} alt={book.title} className="book-image" />
            <div className="book-details">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
            </div>
            <div className="actions">
                <img
                    src={heartIcon}
                    alt="Add to favorites"
                    className="heart-icon"
                    onClick={handleAddToFavorites}
                />
                <button className="preview-button" onClick={handlePreview}>
                    Preview
                </button>
            </div>
        </div>
    );
};

export default CardBook;
