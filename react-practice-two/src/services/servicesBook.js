import axios from 'axios';

const api = axios.create({
    baseURL: 'https://v1.slashapi.com/viet/mongodb/KYgqV24RyU'
});

export const fetchBook = async () => {
    try {
        const response = await api.get('/books');
        const data = response.data.data;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching books:', error);
        return { data: null, error };
    }
};

export const fetchBookById = async (bookId) => {
    try {
        const response = await api.get(`/books/${bookId}`);
        return { data: response.data.data, error: null };
    } catch (error) {
        console.error(`Error fetching book with ID ${bookId}:`, error);
        return { data: null, error };
    }
};

export const fetchFavorites = async () => {
    try {
        const response = await api.get('/books');
        const data = response.data.data;

        if (Array.isArray(data)) {
            const favoriteBooks = data.filter(book => book.favorite === true);
            return { data: favoriteBooks, error: null };
        } else {
            console.error('Data is not an array:', data);
            return { data: null, error: 'Data is not an array' };
        }
    } catch (error) {
        console.error('Error fetching favorite books:', error);
        return { data: null, error };
    }
};


export const addBookToFavorites = async (bookId, updatedFavorite) => {
    const params = {
        data: {
            favorite: updatedFavorite
        }
    }
    try {
        const response = await api.patch(`/books/${bookId}`, params);
        return { data: response.data.data, error: null };
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return { data: null, error };
    }
};

export const updateBookStatus = async (bookId, updatedStatus) => {
    const params = {
        data: {
            status: updatedStatus
        }
    }
    try {
        const response = await api.patch(`/books/${bookId}`, params);
        return { data: response.data.data, error: null };
    } catch (error) {
        console.error('Error updating book status:', error);
        return { data: null, error };
    }
};

export const updateFavoriteStatus = async (bookId, updatedFavorite) => {
    const params = {
        data: {
            favorite: updatedFavorite
        }
    }
    try {
        const response = await api.patch(`/books/${bookId}`, params);
        return { data: response.data.data, error: null };
    } catch (error) {
        console.error('Error updating favorite status:', error);
        return { data: null, error };
    }
};