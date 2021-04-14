import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger-bd227-default-rtdb.firebaseio.com/'
});

export default instance;

