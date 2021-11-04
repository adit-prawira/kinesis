import React from "react";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "1%",
        backgroundColor: "rgb(45, 48, 65)",
    },
    button: {
        marginRight: "5%",
        marginLeft: "5%",
    },

    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
});

const TrackDetailScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, color: "white" }}>
                Track Detail Screen
            </Text>
        </View>
    );
};
TrackDetailScreen.navigationOptions = () => {
    return {
        title: "Track Details Preview",
        headerTitleStyle: {
            color: "white",
        },
        headerStyle: {
            backgroundColor: "rgb(28, 34, 54)",
        },
    };
};
export default TrackDetailScreen;
