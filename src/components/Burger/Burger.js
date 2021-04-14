import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import _ from 'lodash';

const Burger = (props) => {
    
    let burgerIngredients = Object.keys(props.ingredients ? props.ingredients : {})
        .flatMap(igKey => [...Array(props.ingredients[igKey])]
            .map((e,index) => <BurgerIngredient key={igKey+index} type={igKey} />));
    if(_.isEmpty(burgerIngredients)) {
        burgerIngredients = <h6> Please start selecting ingredients</h6>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {burgerIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default Burger;