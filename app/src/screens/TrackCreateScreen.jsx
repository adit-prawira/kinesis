import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import Map from "../components/Map";
import { Button } from "@ui-kitten/components";
import {
    requestForegroundPermissionsAsync,
    watchPositionAsync,
    Accuracy,
} from "expo-location";
import "../_mockLocation";
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
    errorMessage: {
        color: "rgb(236, 102, 101)",
    },
});

const TrackCreateScreen = () => {
    const [error, setError] = useState(null);
    const startWatching = async () => {
        let obj = await requestForegroundPermissionsAsync();
        // const obj = await requestForegroundPermissionsAsync();
        // console.log(obj);
        // try {
        //     // const obj = await requestForegroundPermissionsAsync();
        //     // console.log(obj);
        //     // if (!granted) throw new Error("Location permission not granted");
        //     // await watchPositionAsync(
        //     //     {
        //     //         accuracy: Accuracy.BestForNavigation,
        //     //         timeInterval: 1000, // update once every second
        //     //         distanceInterval: 10, // update once every 10 meters
        //     //     },
        //     //     (location) => {
        //     //         console.log(location);
        //     //     }
        //     // );
        // } catch (e) {
        //     setError(e);
        // }
    };

    useEffect(() => {
        startWatching();
    }, []);

    return (
        <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
            <Text h3>Create New Track</Text>
            <Map />
            {error && (
                <Text style={styles.errorMessage}>
                    Please enable location services
                </Text>
            )}
            <Button appearance="outline" status="success">
                Add New Track
            </Button>
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions = () => {
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
export default TrackCreateScreen;
