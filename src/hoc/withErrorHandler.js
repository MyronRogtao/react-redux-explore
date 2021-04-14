import { Fragment, useState, useEffect } from "react"
import Modal from "../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios, errorExtractor) => {
    return (props) => {
        const [errorState, setErrorState] = useState({
            error: false,
            message: null
        });

        const clearErrorHandler = () => {
            setErrorState({
                error: false,
                message: null
            })
        }

        useEffect(() => {
            const reqInterceptor = axios.interceptors.response.use(resp => resp,
                error => {
                    setErrorState({
                    error: true,
                    message: errorExtractor ? errorExtractor(error) : error.message
                });
                return error;
            });
            const respInterceptor = axios.interceptors.request.use(req => {
                clearErrorHandler();
                return req;
            })
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(respInterceptor);
            }
        }, [])


        return (
            <Fragment>
                <Modal show={errorState.error} modalClosed={clearErrorHandler}>{errorState.message}</Modal>
                <WrappedComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;