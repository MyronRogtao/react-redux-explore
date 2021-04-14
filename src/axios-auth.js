import axios from 'axios';

const APP_KEY = 'AIzaSyAmQDDrdX-t36viMYEpYLE-zL1W7ooAaxw';

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts'
});

export const buildUrl = (action) => {
    return ':'+ action + '?key=' + APP_KEY;
}

export default instance;

