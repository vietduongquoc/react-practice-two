import React from 'react';
import Button from '../../../../components/Button';

const BorrowBooks = ({ borrowBooks, handleReturnBook }) => {
    return (
        <ul className="books-list">
            {borrowBooks.map(book => (
                <li key={book._id.$oid} className="book-item">
                    <ul className='book-item-column-left'>
                        <li><img src={book.urlImage} alt={book.name} className="book-item-image" /></li>
                        <li> <h3 className='book-item-name'>{book.name}</h3></li>
                        <li> <p className='book-item-author'>{book.author}</p></li>
                        <li> <p className="book-item-rate">5.0 Ratings</p></li>
                    </ul>
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
                </li>
            ))}
        </ul>
    );
};

export default BorrowBooks;
