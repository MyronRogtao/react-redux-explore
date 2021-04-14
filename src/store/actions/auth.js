import axios, { buildUrl } from '../../axios-auth';
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, LOG_OUT } from './action-types';


export const signUp = (username, password) => {
    return dispatch => {
        dispatch(loginStart());
        axios.post(buildUrl('signUp'), {
            email: username,
            password: password,
            returnSecureToken: true
        })
        .then(resp => dispatch(loginSuccess(resp.data.idToken)))
        .catch(error => dispatch(loginFail()))
    }
}

const checkLogout = (expireIn) => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expireIn * 1000)
    }
}

export const login = (username, password) => {
    return dispatch => {
        dispatch(loginStart());
        axios.post(buildUrl('signInWithPassword'), {
            email: username,
            password: password,
            returnSecureToken: true
        })
        .then(resp => {
            dispatch(loginSuccess(resp.data.idToken));
            dispatch(checkLogout(resp.data.expiresIn))
        })
        .catch(error => dispatch(loginFail(error.message)))
    }
}

const loginStart = () => {
    return {
        type: AUTH_START
    }
}

const loginSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token: token
    }
}

const loginFail = (message) => {
    return {
        type: AUTH_FAIL,
        errorMessage: message
    }
}

export const logout = () => {
    return {
        type: LOG_OUT
    }
}