import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "@ui-kitten/components";
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
const TrackListScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 48, textAlign: "center", color: "white" }}>
                Track List Screen
            </Text>
            <Button
                appearance="outline"
                status="success"
                style={styles.button}
                onPress={() => {
                    navigation.navigate("Detail");
                }}
            >
                Go to Track Details
            </Button>
        </View>
    );
};

TrackListScreen.navigationOptions = () => {
    return {
        title: "Tracks",
        headerTitleStyle: {
            color: "white",
        },
        headerStyle: {
            backgroundColor: "rgb(28, 34, 54)",
        },
    };
};

export default TrackListScreen;
