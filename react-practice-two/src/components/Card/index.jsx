import { useNavigate } from 'react-router-dom';
import HeartIcon from "../Icon/index";
import React from 'react';
import './index.css';

const ItemCard = ({ book, onPreview, isFavorited, onAddToFavorites }) => {
    const navigate = useNavigate();

    const handlePreview = async () => {
        await onPreview();
        navigate(`/preview-page/${book._id.$oid}`);
    };

    return (
        <article className="item-card">
            <figure onClick={handlePreview}>
                <img src={book.urlImage} alt={book.name} className="book-image" />
            </figure>
            <div className='wrap-card-content'>
                <div className="book-details">
                    <p className='book-details-name'>{book.name}</p>
                    <p className='book-details-author'>{book.author}</p>
                    <p className='book-details-rate'>4.5/5</p>
                </div>
                <div className="heartIcon-actions">
                    <HeartIcon
                        onClick={onAddToFavorites}
                        isFavorited={isFavorited}
                    />
                </div>
            </div>
        </article>
    );
};

export default ItemCard;