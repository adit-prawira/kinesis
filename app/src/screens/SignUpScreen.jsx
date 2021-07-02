import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm.jsx";
import NavLink from "../components/NavLink.jsx";
import { NavigationEvents } from "react-navigation";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: "1%",
        backgroundColor: "rgb(36, 42, 67)",
    },
    link: {
        textAlign: "center",
        color: "rgb(52, 235, 183)",
    },
});

const SignUpScreen = () => {
    const { state, signUp, clearErrorMessage } = useContext(AuthContext);
    const { errorMessage } = state;
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={clearErrorMessage} />
            <AuthForm
                errorMessage={errorMessage}
                screenTitle="Sign Up"
                onSubmit={signUp}
            />
            <NavLink
                text="Already have an account? Sign in here."
                routeName="SignIn"
            />
        </View>
    );
};

SignUpScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

export default SignUpScreen;
