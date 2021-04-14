import { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { login, signUp } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-auth';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state= {
        authForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                valid: false,
                validations: {
                    required: true
                },
                pristine: true
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: false,
                validations: {
                    required: true
                },
                pristine: true
            }
        },
        authFormValid: false,
        isSignin: false
    }

    onValueChange = (ctrl, value) => {
        const authFormCopy = {...this.state.authForm };
        const ctrlToUpdate = { ...authFormCopy[ctrl] };
        ctrlToUpdate.value = value;
        ctrlToUpdate.pristine = false;
        ctrlToUpdate.valid = this.checkValidity(value, ctrlToUpdate.validations);
        authFormCopy[ctrl] = ctrlToUpdate;
        this.setState({
            authForm : authFormCopy,
            authFormValid: this.isFormValid(authFormCopy)
        })
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules) {
            if(rules.required) {
                isValid = isValid && value.trim() !== ''
            }
        }
        return isValid;
    }

    isFormValid(form) {
        if(form) {
            return Object.keys(form)
                .map(ctrl => form[ctrl].value)
                .reduce((c, ele) => c && ele, true)
        }
        return false
    }

    signInHandler = () => {
        if (this.state.isSignin) {
            this.props.login(this.state.authForm.username.value, this.state.authForm.password.value);
        } else {
            this.props.signUp(this.state.authForm.username.value, this.state.authForm.password.value);
        }
        
    }

    switchSigningMode = () => {
        this.setState(prevState => {
            return {
                isSignin: !prevState.isSignin
            }
        })
    }

    render() {
        let authData = null;
        if (this.props.authenticating) {
            authData = <Spinner />
        } else if (this.props.token) {
            authData = <Redirect to='/burger' />
        } else {
            let authControls = Object.keys(this.state.authForm)
                .map(ctrl => <Input
                        key={ctrl}
                        type={this.state.authForm[ctrl].elementType}
                        config={this.state.authForm[ctrl].elementConfig}
                        value={this.state.authForm[ctrl].value}
                        changed={(event => this.onValueChange(ctrl, event.target.value))}
                        pristine={this.state.authForm[ctrl].pristine}
                        valid={this.state.authForm[ctrl].valid}
                        />);
            return ( <div className={classes.Auth}>
                        {authControls}
                        <Button
                            type='Success'
                            disabled={!this.state.authFormValid}
                            clicked={this.signInHandler}>{this.state.isSignin ? 'Sign In' : 'Sign Up'}</Button>
                        <Button
                            type='Danger'
                            clicked={this.switchSigningMode}>Switch to {this.state.isSignin ? 'Sign Up' : 'Sign In'}</Button>
                    </div> )
        }
        
        return authData;
    }
}

const mapStateToProps = state => {
    return {
        authenticating: state.auth.authenticating,
        token: state.auth.token
    }
}

const mapActionsToProps = dispatch => {
    return {
        login: (user, pass) => dispatch(login(user, pass)),
        signUp: (user, pass) => dispatch(signUp(user, pass))
    }
}
export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(Auth, axios, error => error.response.data.error.message));