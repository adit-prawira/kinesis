import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
    const { autoLocalSignIn } = useContext(AuthContext);
    useEffect(() => {
        autoLocalSignIn();
    }, []);
    return null;
};

export default ResolveAuthScreen;
