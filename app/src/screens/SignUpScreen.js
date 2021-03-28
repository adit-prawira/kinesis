import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={styles.container}>
            <Spacer>
                <Text
                    style={{
                        fontSize: 48,
                        textAlign: "center",
                    }}
                >
                    Sign Up to MyRun
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
            <Button
                title="Sign Up"
                type="solid"
                style={styles.button}
                onPress={() => {
                    navigation.navigate("Signin");
                }}
            />
        </View>
    );
};

SignUpScreen.navigationOptions = () => {
    return {
        header: null,
    };
};

export default SignUpScreen;
