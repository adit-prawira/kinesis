import React, { useContext, useCallback } from "react";
import { Text, StyleSheet } from "react-native";
import {
    SafeAreaView,
    NavigationEvents,
    withNavigationFocus,
} from "react-navigation";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import { useLocation } from "../hooks";
import TrackForm from "../components/TrackForm";
// import "../_mockLocation";
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
    title: { fontSize: 20, textAlign: "center", color: "white", margin: "2%" },
});

const TrackCreateScreen = ({ isFocused }) => {
    const {
        state: { recording },
        addLocation,
    } = useContext(LocationContext);
    const callback = useCallback(
        (location) => {
            addLocation(location, recording);
        },
        [recording]
    );

    // should record any position changes whenever ur is currently in the create track screen or
    // the user already pressed the recording button
    const [error] = useLocation(isFocused || recording, callback);

    return (
        <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
            <Text style={styles.title}>Create New Track</Text>
            <Map />
            <NavigationEvents onWillBlur={() => console.log("leaving")} />
            {error && (
                <Text style={styles.errorMessage}>
                    Please enable location services
                </Text>
            )}
            <TrackForm />
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
export default withNavigationFocus(TrackCreateScreen);
