import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Context as TrackDetailsContext } from "../context/TrackDetailsContext";

import { Text } from "@ui-kitten/components";
import { Circle } from "react-native-progress";
import MapView, { Polyline, Marker } from "react-native-maps";

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
    spinnerContainer: {
        flex: 1,
        padding: "1%",
        backgroundColor: "rgb(45, 48, 65)",
        borderColor: "white",
        borderWidth: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        position: "absolute",
        color: "rgb(102, 220, 156)",
    },
    map: { height: 300, borderRadius: 5 },
});

const TrackDetailsScreen = ({
    navigation: {
        state: {
            params: { trackId },
        },
    },
}) => {
    const [midPoint, setMidPoint] = useState(null);
    const {
        state: { details },
        getTrack,
    } = useContext(TrackDetailsContext);

    useEffect(() => {
        getTrack(trackId);
    }, []);

    useEffect(() => {
        let mounted = true;
        if (mounted && details) {
            const totalLocationRecorded = details.locations.length - 1;
            const { latitude: x1, longitude: y1 } =
                details.locations[totalLocationRecorded].coords;
            const { latitude: x2, longitude: y2 } = details.locations[0].coords;

            setMidPoint({
                latitude: (x1 + x2) / 2,
                longitude: (y1 + y2) / 2,
            });
            return () => {
                mounted = false;
            };
        }
    }, [details]);
    return (
        <View style={styles.container}>
            {details && midPoint ? (
                <View>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            ...details.locations[details.locations.length - 1]
                                .coords,
                            ...midPoint,
                            altitudeAccuracy: -1,
                            longitudeDelta: 0.01,
                            latitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            key="finish-point"
                            coordinate={details.locations[0].coords}
                            title="Finish"
                            description="Finish Here"
                        />
                        <Marker
                            key="start-point"
                            coordinate={
                                details.locations[details.locations.length - 1]
                                    .coords
                            }
                            title="Start"
                            description="Start here"
                        />
                        <Polyline
                            coordinates={details.locations.map(
                                ({ coords }) => coords
                            )}
                            strokeWidth={2}
                            strokeColor="rgba(64, 99, 201,0.7)"
                            lineDashPattern={[1]}
                        />
                    </MapView>
                </View>
            ) : (
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
            )}
        </View>
    );
};

TrackDetailsScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};
export default TrackDetailsScreen;
