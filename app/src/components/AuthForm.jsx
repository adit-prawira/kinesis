import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Text, Input, Button } from "@ui-kitten/components";
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

    input: {
        color: "white",
    },
});

const AuthForm = ({ errorMessage, screenTitle, onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const showPasswordIcon = () => (
        <TouchableWithoutFeedback
            onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
            <IonIcon
                name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="white"
                style={{ marginRight: "5%" }}
            />
        </TouchableWithoutFeedback>
    );
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
                    label={<Text>Email Address:</Text>}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    accessoryLeft={
                        <FontAwesomeIcon
                            name="user-circle-o"
                            size={24}
                            color="white"
                        />
                    }
                />
            </Spacer>
            <Spacer>
                <Input
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={secureTextEntry}
                    label={<Text>Password:</Text>}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    accessoryLeft={
                        <IonIcon
                            name="ios-lock-closed"
                            size={24}
                            color="white"
                        />
                    }
                    accessoryRight={showPasswordIcon}
                />
            </Spacer>
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <Spacer>
                
                    <Button
                        style={styles.button}
                        appearance="outline"
                        status="success"
                        onPress={() => onSubmit({ email, password })}
                    >
                        {
            screenTitle}
                </Button>
            </Spacer>
        </React.Fragment>
    );
};

export default AuthForm;
