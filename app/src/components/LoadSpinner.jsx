import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { Circle } from "react-native-progress";
const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        padding: "1%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
    },
    text: {
        position: "absolute",
        color: "rgb(102, 220, 156)",
    },
});
const LoadSpinner = () => {
    return (
        <View style={styles.spinnerContainer}>
            <Circle
                size={300}
                indeterminate={true}
                thickness={7}
                color="rgb(102, 220, 156)"
            />
            <Text category="h6" style={styles.text}>
                Loading...
            </Text>
        </View>
    );
};

export default LoadSpinner;
