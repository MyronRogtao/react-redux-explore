import classes from './BuildControl.module.css';

const BuildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={() => props.onLess(props.type)}>Less</button>
            <button className={classes.More} onClick={() => props.onMore(props.type)}>More</button>
        </div>
    )
}

export default BuildControl;