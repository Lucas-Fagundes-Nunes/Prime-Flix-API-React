
// Bae da URL: https://api.themoviedb.org/3
// URL DA API: https://api.themoviedb.org/3/movie/550?api_key=b7a9370e4b1b1517a2dc83f21996f7a4&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;