import * as actionTypes from "../actions/action-types"

const initialState = {
    token: localStorage.getItem('auth-token') ? localStorage.getItem('auth-token') : null,
    authenticating: false
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case(actionTypes.AUTH_SUCCESS):
            localStorage.setItem('auth-token', action.token)
            return {
                ...state,
                token: action.token,
                authenticating: false
            };
        case(actionTypes.AUTH_FAIL):
        case(actionTypes.LOG_OUT):
            localStorage.removeItem('auth-token')
            return {
                ...state,
                token: null,
                authenticating: false,
                authFailMessage: action.errorMessage
            }
        case(actionTypes.AUTH_START):
            return {
                ...state,
                authenticating: true
            }
        default: return {...state}
    }
}

export  default authReducer;