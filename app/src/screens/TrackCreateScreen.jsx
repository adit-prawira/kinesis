import React, { useContext, useCallback, useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { NavigationEvents, withNavigationFocus } from "react-navigation";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as AuthContext } from "../context/AuthContext";
import { useLocation } from "../hooks";
import TrackForm from "../components/TrackForm";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "2%",
        marginBottom: "5%",
        backgroundColor: "rgb(45, 48, 65)",
    },
    button: {
        marginRight: "5%",
        marginLeft: "5%",
    },
    errorMessage: {
        color: "rgb(236, 102, 101)",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
    },
});

const TrackCreateScreen = ({ isFocused }) => {
    const [visible, setVisible] = useState(false);
    const {
        state: { currentUser },
    } = useContext(AuthContext);
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

    // should record any position changes whenever user is currently in the create track screen or
    // the user already pressed the recording button
    const [error] = useLocation(isFocused || recording, callback);
    const snackbar = {
        open: () => setVisible(true),
        close: () => setVisible(false),
    };

    useEffect(() => {
        let mounted = true;
        if (mounted && currentUser && isFocused) {
            const { mass, height, age } = currentUser;
            if (mass === 0 || height === 0 || age === 0) {
                snackbar.open();

                return () => {
                    mounted = false;
                };
            }
        }
    }, [currentUser, isFocused]);

    return (
        <ScrollView style={styles.container}>
            <Portal>
                <Dialog visible={visible} onDismiss={snackbar.close}>
                    <Dialog.Title>Warning</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Please make sure that your health profile has been
                            filled. Otherwise, inaccurate data may be processed.
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={snackbar.close}
                            mode="contained"
                            color="rgb(236, 102, 101)"
                        >
                            Close
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Map />
            <NavigationEvents />
            {error && (
                <Text style={styles.errorMessage}>
                    Please enable location services
                </Text>
            )}
            <TrackForm />
        </ScrollView>
    );
};

export default withNavigationFocus(TrackCreateScreen);
