import * as actionTypes from './action-types';
import axios from '../../axios-orders';


const purchaseSuccess = (payload) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        payload: payload
    }
}

const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    }
}

const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    }
}

export const purchaseOrder = (orderData, router) => {
    return (dispatch,getstate) => {
        dispatch(purchaseStart())
        axios.post('orders.json?auth='+getstate().auth.token, orderData)
            .then(response => {
                dispatch(purchaseSuccess({orderId: response.data.name, orderData: orderData}));
                router.push('/burger');
            })
            .catch(error => dispatch(purchaseFail(error.message)))
    }
}

const orderLoadStatus = (payload) => {
    return {
        type: actionTypes.LOADING_ORDERS,
        payload: payload
    }
}

const setOrders = (payload) => {
    return {
        type: actionTypes.SET_ORDERS,
        payload: payload
    }
}

export const getOrders = () => {
    return (dispatch, getstate) => {
        dispatch(orderLoadStatus(true))
        axios.get('orders.json?auth='+ getstate().auth.token)
            .then(response => {
                let fetchedOrders = [];
                for(let orderId in response.data) {
                    fetchedOrders.push({
                        ingredients: response.data[orderId].ingredients,
                        price: response.data[orderId].price
                    })
                }
                dispatch(setOrders(fetchedOrders));
            })
            .then(() => dispatch(orderLoadStatus(false)))

    }
}


