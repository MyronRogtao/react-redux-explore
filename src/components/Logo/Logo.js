import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';
import React from 'react';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='My Burger'/>
    </div>
)

export default React.memo(Logo);