import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "@ui-kitten/components";
import { Context as AuthContext } from "../context/AuthContext";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "1%",
        backgroundColor: "rgb(36, 42, 67)",
    },
    button: {
        marginRight: "5%",
        marginLeft: "5%",
    },
});

const AccountScreen = () => {
    const { signOut } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 48, textAlign: "center", color: "white" }}>
                My Account
            </Text>
            <Button
                appearance="outline"
                status="danger"
                style={styles.button}
                onPress={signOut}
            >
                Sign Out
            </Button>
        </View>
    );
};
AccountScreen.navigationOptions = () => {
    return {
        title: "Account Screen",
        headerTitleStyle: {
            color: "white",
        },
        headerStyle: {
            backgroundColor: "rgb(28, 34, 54)",
        },
    };
};
export default AccountScreen;
