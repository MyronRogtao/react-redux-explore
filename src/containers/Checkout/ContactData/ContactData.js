import { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler';
import { purchaseOrder } from "../../../store/actions";
import { withRouter } from 'react-router-dom';

const ContactData = (props) => {
    const ingredients = useSelector(state => state.builder.ingredients);
    const price = useSelector(state => state.builder.price);
    const dispatch = useDispatch();

    const [orderFormState, setOrderFormState] = useState({
        orderFormValid: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                validations: {
                    required: true
                },
                pristine: true
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                valid: false,
                validations: {
                    required: true
                },
                pristine: true
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valid: false,
                validations: {
                    required: true
                },
                pristine: true
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                valid: false,
                validations: {
                    required: true
                },
                pristine: true
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                    placeholder: 'Delivery Method'
                },
                value: 'fastest',
                valid: true,
                pristine: true
            }
        }
    })

    const onOrderSubmission = (event) => {
        event.preventDefault();
        const orderFrm = orderFormState.orderForm;
        dispatch(purchaseOrder({
            ingredients: ingredients,
            price: price,
            customer: {
                name: orderFrm.name.value,
                address: {
                    street: orderFrm.street.value,
                    zipCode: orderFrm.postalCode.value
                },
                email: orderFrm.email.value,
            },
            deliveryMethod: orderFrm.deliveryMethod.value
        }, props.history));
       
    }

    const onValueChanged = (control, value) => {
        const formCopy = { ...orderFormState.orderForm};
        const ctrlCopy = { ...formCopy[control] };
        ctrlCopy.value = value;
        ctrlCopy.valid = checkValidity(value, ctrlCopy.validations);
        ctrlCopy.pristine = false;
        formCopy[control] = ctrlCopy;
        setOrderFormState({
            orderForm : formCopy,
            orderFormValid: Object.keys(formCopy)
                .map(ctrl => formCopy[ctrl].valid)
                .reduce((a, v) => a && v, true)
        });
    }

    const checkValidity = (value, rules)  => {
        let isValid = true;
        if (rules) {
            if(rules.required) {
                isValid = isValid && value.trim() !== ''
            }
        }
        return isValid;
    }

    let inputs = [];
        for(let control in orderFormState.orderForm) {
            const ctrlState = orderFormState.orderForm[control];
            inputs.push(<Input 
                    key={control}
                    type={ctrlState.elementType}
                    config={ctrlState.elementConfig}
                    value={ctrlState.value}
                    valid={ctrlState.valid}
                    pristine={ctrlState.pristine}
                    changed={(event) => onValueChanged(control, event.target.value)}/>)
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    {inputs}
                </form>
                <Button type='Success' disabled={!orderFormState.orderFormValid} clicked={onOrderSubmission}>Order</Button>
            </div>
        )
}
export default withRouter(withErrorHandler(ContactData, axios));