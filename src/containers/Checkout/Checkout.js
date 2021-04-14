import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { useSelector } from 'react-redux';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const ingredients = useSelector(state => state.builder.ingredients);

    const onCheckoutCancel = () => {
        props.history.goBack();
    }

    const onCheckoutContinue = () => {
        props.history.replace('/check-out/contact-data')
    }

    let summary = (<Redirect to='/'/>);
        if(ingredients) {
            summary = (
            <div className={classes.Checkout}>
                <CheckoutSummary
                    ingredients={ingredients}
                    checkoutCancel={onCheckoutCancel}
                    checkoutContinue={onCheckoutContinue}
                    ></CheckoutSummary>
                <Route path= {props.match.url + '/contact-data'} component={ContactData} />
            </div>
            )
        }
        return summary;
}

export default Checkout;