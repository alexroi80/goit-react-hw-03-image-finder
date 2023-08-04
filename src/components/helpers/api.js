import axios from 'axios';

const API_KEY = '37247568-35df7f081861af6a3ea79c4b1';
axios.defaults.baseURL = "https://pixabay.com/api/";

export const fetchImagesWithQuery = async (searchQuery,page) => {
    const response = await axios.get(`/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data.hits;
}