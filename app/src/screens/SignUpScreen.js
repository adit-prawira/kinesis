import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 200,
    },
    button: {
        padding: "5%",
    },
});

const SignUpScreen = ({ navigation }) => {
    const { state, signUp } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    205228162;
    const [password, setPassword] = useState("");
    const { errorMessage } = state;
    return (
        <View style={styles.container}>
            <Spacer>
                <Text
                    style={{
                        fontSize: 48,
                        textAlign: "center",
                    }}
                >
                    Sign Up
                </Text>
            </Spacer>
            <Spacer>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                />
            </Spacer>
            <Spacer>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                />
            </Spacer>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Button
                title="Sign Up"
                type="solid"
                style={styles.button}
                onPress={() => signUp({ email, password })}
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
