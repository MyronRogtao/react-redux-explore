import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { Fragment } from 'react';

const SideDrawer = (props) => {
    const drawerClasses = [classes.SideDrawer];
    if (props.isOpen) {
        drawerClasses.push(classes.Open);
    } else {
        drawerClasses.push(classes.Close)
    }
    return (
        <Fragment>
            <Backdrop show={props.isOpen} clicked={props.closed}/>
            <div className={drawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
        
    )
}

export default SideDrawer;