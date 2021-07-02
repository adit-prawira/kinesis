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
});

const SignInScreen = () => {
    const { state, signIn, clearErrorMessage } = useContext(AuthContext);
    const { errorMessage } = state;
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={clearErrorMessage} />
            <AuthForm
                errorMessage={errorMessage}
                screenTitle="Sign In"
                onSubmit={signIn}
            />
            <NavLink
                text="Don't have an account? Sign up here"
                routeName="SignUp"
            />
        </View>
    );
};

SignInScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

export default SignInScreen;
