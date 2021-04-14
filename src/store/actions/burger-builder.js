import { ADD_INGREDIENT, LOAD_INGREDIENTS, REMOVE_INGREDIENT } from "./action-types"
import axios from '../../axios-orders';
import { BASE_PRICE, INGREDIENT_PRICES } from "../../containers/BurgerBuilder/constants";

export const addIngredient = (payload) => {
    return {
        type: ADD_INGREDIENT,
        payload: payload
    }
}

export const removeIngredient = (payload) => {
    return {
        type: REMOVE_INGREDIENT,
        payload: payload
    }
}

const initIngredients = (payload) => {
    return {
        type: LOAD_INGREDIENTS,
        payload: payload
    }
}

export const loadIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
            .then(response => dispatch(initIngredients({
                ingredients: response.data,
                price: getBasePrice(response.data)
            })))
    }
}

function getBasePrice(ingredients) {
    if (ingredients) {
        return Object.keys(ingredients)
            .map(ingKey => INGREDIENT_PRICES[ingKey] * ingredients[ingKey])
            .reduce((s, v) => s + v, BASE_PRICE);
    }
    return BASE_PRICE;  
}