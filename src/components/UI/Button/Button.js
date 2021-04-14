import classes from './Button.module.css';

const Button = (props) => (
    <button 
        style={{cursor: props.disabled? 'not-allowed' : 'pointer'}}
        className={[classes.Button, classes[props.type]].join(' ')}
        onClick={props.clicked}
        disabled={props.disabled}>
        {props.children}
    </button>
)

export default Button;