// HomePageContent.jsx
import React from 'react';
import './index.css';
import CardBook from '../CardBook';

const HomePageContent = ({ books, onAddToFavorites, onPreview }) => {
    // Function to split books into rows with max 6 items per row
    const splitIntoRows = (books) => {
        return books.reduce((rows, book, index) => {
            const rowIndex = Math.floor(index / 6);
            if (!rows[rowIndex]) {
                rows[rowIndex] = [];
            }
            rows[rowIndex].push(book);
            return rows;
        }, []);
    };

    // Render each row of books
    const renderRows = () => {
        const rows = splitIntoRows(books);
        return rows.map((row, index) => (
            <div className="row" key={index}>
                {row.map((book) => (
                    <CardBook
                        key={book.id}
                        book={book}
                        onAddToFavorites={onAddToFavorites}
                        onPreview={onPreview}
                    />
                ))}
            </div>
        ));
    };

    return <div className="homepage-content">{renderRows()}</div>;
};

export default HomePageContent;
