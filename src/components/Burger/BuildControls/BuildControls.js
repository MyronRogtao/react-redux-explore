import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const definedControls = [
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
]

const BuildControls = (props) => {
    let controls = definedControls.map(control =>
        <BuildControl 
            key={control.label}
            label={control.label}
            type={control.type}
            onMore={props.ingredientAdd}
            onLess={props.ingredientRemove}/>)

    return (
        <div className={classes.BuildControls}>
            <p className={classes.FixedFields}> Total Price :  <strong> {props.total}</strong></p>
            {controls}
            <button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.purchase}>Order Now</button>
        </div>
    )
}

export default BuildControls;