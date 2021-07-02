import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";

const styles = StyleSheet.create({
    container: {},
    button: {
        padding: "5%",
    },
});
const TrackListScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 48, textAlign: "center" }}>
                Track List Screen
            </Text>
            <Button
                title="Go to Track Details"
                style={styles.button}
                onPress={() => {
                    navigation.navigate("Detail");
                }}
            />
            <Button
                title="Back to Sign up"
                style={styles.button}
                onPress={() => {
                    navigation.navigate("Signup");
                }}
            />
        </View>
    );
};

export default TrackListScreen;
