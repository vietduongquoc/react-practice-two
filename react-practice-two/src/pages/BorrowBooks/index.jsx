import React from 'react';
import Button from '../../components/Button';

const BorrowBooks = ({ books, handleReturnBook }) => {
    return (
        <div className="books-list">
            {books.map(book => (
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
    );
};

export default BorrowBooks;
