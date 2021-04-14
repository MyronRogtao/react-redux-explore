import { useEffect } from "react";
import classes from './Orders.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from "./Order/Order";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from "../../store/actions";

const Orders = (props) => {
    const loading = useSelector(state => state.order.loadingOrders);
    const orders = useSelector(state => state.order.orders);

    const dispatch = useDispatch();

    useEffect(() => dispatch(getOrders()), [dispatch]);

    let displayOrders = <h4> No past orders </h4>;
    if (loading) {
        displayOrders = <Spinner />
    } else if (orders.length > 0) {
        displayOrders = orders
            .map((order, index) => <Order key={index} ingredients={order.ingredients} price={order.price} />)
    }

    return (
        <div className={classes.Orders}>
            {displayOrders}
        </div>
    )
}

export default Orders;