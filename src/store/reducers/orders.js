import * as actionTypes from '../actions/action-types';

const initialState = {
    orders : [],
    orderData: null,
    purchaseError: false,
    purchaseInProgress: false,
    loadingOrders: false
}

const orderReducer = (state=initialState, action) => {
    switch(action.type) {
        case(actionTypes.PURCHASE_SUCCESS):
            return {
                ...state,
                orderId : action.payload.orderId,
                orderData: action.payload.orderData,
                purchaseError: false,
                purchaseInProgress: false
            }
        case(actionTypes.PURCHASE_FAIL):
            return {
                ...state,
                purchaseError: true,
                purchaseInProgress: false
            }
        case(actionTypes.PURCHASE_START):
            return {
                ...state,
                purchaseInProgress: true
            }
        case(actionTypes.SET_ORDERS):
            return {
                ...state,
                orders: action.payload
            }
        case(actionTypes.LOADING_ORDERS):
            return {
                ...state,
                loadingOrders: action.payload
            }
        default: return {...state}
    }
}

export default orderReducer;