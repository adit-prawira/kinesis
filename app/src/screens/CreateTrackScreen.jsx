import React from "react";
import { View, StyleSheet } from "react-native";
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
const CreateTrackScreen = () => {
    return (
        <View style={styles.container}>
            <Button appearance="outline" status="success">
                Add New Track
            </Button>
        </View>
    );
};

CreateTrackScreen.navigationOptions = () => {
    return {
        title: "Create New Track",
        headerTitleStyle: {
            color: "white",
        },
        headerStyle: {
            backgroundColor: "rgb(28, 34, 54)",
        },
    };
};
export default CreateTrackScreen;
