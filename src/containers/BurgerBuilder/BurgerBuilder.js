import { useEffect, useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from '../../components/Burger/Burger';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import { useDispatch, useSelector } from 'react-redux';
import classes from './BurgerBuilder.module.css';
import * as actions from '../../store/actions/index';
import { INGREDIENT_PRICES } from './constants'; 

const BurgerBuilder = (props) => {
    const ingredients = useSelector(state => state.builder.ingredients);
    const price = useSelector(state => state.builder.price);
    const dispatch = useDispatch();

    const [builderState, setBuilderState] = useState({
        purchasable: false,
        purchasing: false,
        loading: false
    })

    useEffect(() => {
        setBuilderState(prevState => {
            return {
                ...prevState,
                purchasable: isOrderPurchasable(ingredients)
            }
        })
    }, [ingredients])

    useEffect(() => {
        dispatch(actions.loadIngredients());
    }, [dispatch])

    const purchaseHandler = () => {
        setBuilderState(prevState => {
            return {
                ...prevState,
                purchasing: true
            }
        })
    }

    const purchaseCancelHandler = () => {
        setBuilderState(prevState => {
            return {
                ...prevState,
                purchasing: false
            }
        })
    }

    const purchaseContinueHandler = () => {
        props.history.push('/check-out');
    }

    const isOrderPurchasable = (ingredients) => {
        let sum = 0;
        if (ingredients) {
            sum = Object.keys(ingredients)
                .map(ingKey => ingredients[ingKey])
                .reduce((s, v) => s + v, 0);
        }
        return sum > 0;
    }



    let orderView = (
        <OrderSummary ingredients={ingredients}
            orderCancel={purchaseCancelHandler}
            orderContinue={purchaseContinueHandler}
            price={price}/>);
        if (builderState.loading) {
            orderView = <Spinner/>
        }
        return (
        <div className={classes.BurgerBuilder}>
            <Modal show={builderState.purchasing} modalClosed={purchaseCancelHandler}>
                {orderView}
            </Modal>
            <Burger ingredients={ingredients}/>
            <BuildControls
                ingredientAdd={(type) => dispatch(actions.addIngredient({type : type, rate: INGREDIENT_PRICES[type]}))}
                ingredientRemove={(type) => dispatch(actions.removeIngredient({type : type, rate: INGREDIENT_PRICES[type]}))}
                total={price}
                purchasable={builderState.purchasable}
                purchase={purchaseHandler}
                />
        </div>
    );
}

export default withErrorHandler(BurgerBuilder, axios);