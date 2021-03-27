import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
const styles = StyleSheet.create({
    container: {},
    button: {
        padding: "5%",
    },
    input: {
        padding: "5%",
    },
});

const SignUpScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 48,
                    textAlign: "center",
                    marginBottom: "5%",
                }}
            >
                Sign Up Screen
            </Text>
            <Input style={styles.input} label="Email" />
            <Input style={styles.input} label="Password" />
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

export default SignUpScreen;
