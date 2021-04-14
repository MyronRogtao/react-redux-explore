import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    const eleClsArr = [classes.InputElement];
    if (!props.valid && !props.pristine) {
        eleClsArr.push(classes.Invalid);
    }
    const inputClasses = eleClsArr.join(' ');

    switch(props.type) {
        case('input'):
            inputElement = <input className={inputClasses} {...props.config} value={props.value} onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea className={inputClasses}  {...props.config} value={props.value} onChange={props.changed}/>
            break;
        case('select'):
            inputElement = (
                <select className={inputClasses} value={props.value} onChange={props.changed}>
                    {
                        props.config.options
                            .map(opt => <option key={opt.value} value={opt.value}>{opt.displayValue}</option>)
                    }
                </select>
            )
            break;
        default:
            inputElement = <input className={inputClasses} {...props.config} value={props.value} onChange={props.changed}/>


    }
    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;