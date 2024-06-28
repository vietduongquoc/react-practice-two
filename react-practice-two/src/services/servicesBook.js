import axios from 'axios';

const api = axios.create({
    baseURL: 'https://v1.slashapi.com/viet/mongodb/KYgqV24RyU'
});

export const fetchBook = async () => {
    try {
        const response = await api.get('/books');
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error fetching books:', error);
        return { data: null, error };
    }
};

export const fetchFavorites = async () => {
    try {
        const response = await api.get('/books');
        const data = response.data;
        
        console.log('API Response Data:', data); // Kiểm tra dữ liệu trả về

        // Kiểm tra xem dữ liệu có phải là một mảng không
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
    try {
        const response = await api.put(`/books/${bookId}`, { favorite: updatedFavorite });
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return { data: null, error };
    }
};

export const updateBookStatus = async (bookId, updatedStatus) => {
    try {
        const response = await api.put(`/books/${bookId}`, { status: updatedStatus });
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error updating book status:', error);
        return { data: null, error };
    }
};

export const updateFavoriteStatus = async (bookId, updatedFavorite) => {
    try {
        const response = await api.put(`/books/${bookId}`, { favorite: updatedFavorite });
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error updating favorite status:', error);
        return { data: null, error };
    }
};
