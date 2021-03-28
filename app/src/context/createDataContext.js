import React, { useReducer } from "react";
export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);
    };
};
