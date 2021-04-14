import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../store/actions";
import { Redirect } from 'react-router';
import { useEffect } from 'react';

const LogOut = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    useEffect(() => dispatch(logout()), [dispatch]);

    if (token) {
        return null
    }
    return <Redirect to="/" />;
}

export default LogOut;