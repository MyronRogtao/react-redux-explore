import { Fragment } from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
    const ingredientLi = Object.keys(props.ingredients ? props.ingredients : {})
        .map(igKey => <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>)
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientLi}
            </ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.orderCancel} type='Danger'>CANCEL</Button>
            <Button clicked={props.orderContinue} type='Success'>CONTINUE</Button>
            
        </Fragment>
    )
}

export default OrderSummary;