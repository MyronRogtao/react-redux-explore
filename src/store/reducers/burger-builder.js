import * as actionTypes from '../actions/action-types'; 

const initialState = {
    ingredients: null,
    price: 0
}

const burgerBuilderReducer = (state=initialState, action) => {
    switch(action.type) {
        case(actionTypes.LOAD_INGREDIENTS):
            return {
                ...state,
                ingredients: action.payload.ingredients,
                price: action.payload.price
            }
        case(actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.type]: state.ingredients[action.payload.type] + 1
                },
                price: state.price + action.payload.rate
            }
        case(actionTypes.REMOVE_INGREDIENT): 
            let ingCurrCount = state.ingredients[action.payload.type];
            if (ingCurrCount > 0) {
                return {
                    ...state,
                    ingredients : {
                        ...state.ingredients,
                        [action.payload.type]: state.ingredients[action.payload.type] - 1
                    },
                    price: state.price - action.payload.rate
                }
            }
            return {...state}
        default: return {...state}
    }
}

export default burgerBuilderReducer;