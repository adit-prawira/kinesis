import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import {
    SafeAreaView,
    NavigationEvents,
    withNavigationFocus,
} from "react-navigation";
import Map from "../components/Map";
import { Button, Layout } from "@ui-kitten/components";
import { Context as LocationContext } from "../context/LocationContext";
import { Icon } from "react-native-eva-icons";
import { useLocation } from "../hooks";

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
    buttons: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
});

export const StartRecordIcon = () => (
    <Icon
        name="play-circle-outline"
        fill="rgb(233, 79, 144)"
        width={24}
        height={24}
    />
);
export const AddIcon = () => (
    <Icon
        name="plus-outline"
        fill="rgb(102, 220, 156)"
        width={24}
        height={24}
    />
);
const TrackCreateScreen = ({ isFocused }) => {
    const { addLocation } = useContext(LocationContext);
    const [error] = useLocation((location) => addLocation(location));

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
            <Layout style={styles.buttons}>
                <Button
                    appearance="outline"
                    status="danger"
                    accessoryLeft={StartRecordIcon}
                >
                    Record Track
                </Button>
                <Button
                    appearance="outline"
                    status="success"
                    accessoryLeft={AddIcon}
                >
                    Add New Track
                </Button>
            </Layout>
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
