import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Spacer from "../components/Spacer.jsx";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm.jsx";

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

const SignUpScreen = ({ navigation }) => {
    const { state, signUp } = useContext(AuthContext);
    const { errorMessage } = state;
    return (
        <View style={styles.container}>
            <AuthForm
                errorMessage={errorMessage}
                screenTitle="Sign Up"
                onSubmit={signUp}
            />
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Spacer>
                    <Text style={styles.link}>Already have an account?</Text>
                </Spacer>
            </TouchableOpacity>
        </View>
    );
};

SignUpScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

export default SignUpScreen;
