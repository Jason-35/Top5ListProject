import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER"
}


function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        ErrorFlag: false,
        ErrorMsg: ""
    });

    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
        auth.loginUser();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    ErrorFlag: false
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    ErrorFlag: false,
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    ErrorFlag: false,
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    ErrorFlag: false,
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
            if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user,
                    
                }
             });
            }
        }catch (e){
            console.log(e)
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData); 
            if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
            store.loadIdNamePairs();
            }
        }catch (e){
            if(e.response.data.errorMessage === 'Please enter all required fields.' || e.response.data.errorMessage === 'Please enter a password of at least 8 characters.' 
            || e.response.data.errorMessage === 'Please enter the same password twice.' || e.response.data.errorMessage === 'An account with this email address already exists.'){
                setAuth({
                    user: null,
                    loggedIn: false,
                    ErrorFlag : true,
                    ErrorMsg : e.response.data.errorMessage
                })
            }
        }
    }

    auth.setFlagFalse = async() =>{
        setAuth({
            user: null,
            loggedIn: false,
            ErrorFlag : false,
            ErrorMsg : null
        })
    }

    auth.loginUser = async function(userData, store){
        try{
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            } 
        }catch (e){
            if(e.response.data.errorMessage === 'Wrong Password' || e.response.data.errorMessage === 'No Account With That Email' || e.response.data.errorMessage === 'Please enter all required fields'){
                setAuth({
                    user: null,
                    loggedIn: false,
                    ErrorFlag : true,
                    ErrorMsg : e.response.data.errorMessage
                })
            }
        }
    }

    auth.logoutUser = async function(){
        console.log('working on it')
        const response = await api.logoutUser()
        if(response.status === 200){
            setAuth({
                user: null,
                loggedIn: false})
            history.push('/')
        }    
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };