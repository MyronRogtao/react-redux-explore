import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import { useSelector } from 'react-redux';

const NavigationItems = () => {
    const loggedIn = useSelector(state => state.auth.token);
    let navLinks = (
        <ul className={classes.NavItems}>
            <NavigationItem link='/'>Authenticate</NavigationItem>
        </ul>
    )
    if (loggedIn) {
        navLinks = (
            <ul className={classes.NavItems}>
                <NavigationItem link='/burger'>Burger Builder</NavigationItem>
                <NavigationItem link='/orders'>Orders</NavigationItem>
                <NavigationItem link='/logout'>Logout</NavigationItem>
            </ul>
        )
    }
    return navLinks;
}

export default NavigationItems;