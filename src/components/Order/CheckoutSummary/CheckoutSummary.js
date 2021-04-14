import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes goooooood!!</h1>
            <div style={{width: '100%', margin: 'auto', height: '50%'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button type='Danger' clicked={props.checkoutCancel}>CANCEL</Button>
            <Button type='Success' clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary;