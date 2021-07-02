import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "@ui-kitten/components";
import Spacer from "./Spacer.jsx";
const styles = StyleSheet.create({
    title: {
        fontSize: 48,
        textAlign: "center",
        color: "white",
    },
    error: {
        color: "#FF3D71",
        textAlign: "center",
        marginBottom: "5%",
    },
    button: {
        marginLeft: "5%",
        marginRight: "5%",
    },
    input: {
        color: "white",
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
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    label="Email:"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    leftIcon={
                        <Icon
                            name="user"
                            size={24}
                            color="grey"
                            style={{ marginRight: "5%" }}
                        />
                    }
                />
            </Spacer>
            <Spacer>
                <Input
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    label="Password:"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    leftIcon={
                        <Icon
                            name="lock"
                            size={24}
                            color="grey"
                            style={{ marginRight: "5%" }}
                        />
                    }
                />
            </Spacer>
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <Button
                style={styles.button}
                appearance="outline"
                status="success"
                onPress={() => onSubmit({ email, password })}
            >
                {screenTitle}
            </Button>
        </React.Fragment>
    );
};

export default AuthForm;
