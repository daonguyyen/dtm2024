import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import Reducer from "./AuthReducer";

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user") || null),
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser))
    }, [state.currentUser]);

    return (
        <AuthContext.Provider value={{ 
            currentUser: state.currentUser,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>{children}</AuthContext.Provider>
    )
};