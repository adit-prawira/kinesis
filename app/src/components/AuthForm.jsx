import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Text } from "react-native-elements";
// Button;
import { Button } from "@ui-kitten/components";
import Spacer from "./Spacer.jsx";
const styles = StyleSheet.create({
    title: {
        fontSize: 48,
        textAlign: "center",
        color: "white",
    },
    error: {
        color: "rgb(255, 0, 77)",
        textAlign: "center",
    },
    button: {
        padding: "5%",
    },
});

const AuthForm = ({ errorMessage, screenTitle, onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <React.Fragment>
            <Spacer>
                <Text style={styles.title}>{screenTitle}</Text>
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
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            {/* <Button
                title={screenTitle}
                type="solid"
                style={styles.button}
                onPress={() => signUp({ email, password })}
            /> */}
            <Button
                style={styles.button}
                appearances="outline"
                status="success"
            >
                {screenTitle}
            </Button>
        </React.Fragment>
    );
};

export default AuthForm;
