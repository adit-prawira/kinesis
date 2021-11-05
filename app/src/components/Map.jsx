import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";
const styles = StyleSheet.create({
    map: {
        height: 300,
        borderRadius: 5,
    },
    activityIndicator: {
        marginTop: 200,
    },
});

const Map = () => {
    const {
        state: { currentLocation, locations },
    } = useContext(LocationContext);

    if (!currentLocation) {
        return (
            <ActivityIndicator size="large" style={styles.activityIndicator} />
        );
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                ...currentLocation.coords,
                longitudeDelta: 0.01,
                latitudeDelta: 0.01,
            }}
            region={{
                ...currentLocation.coords,
                longitudeDelta: 0.01,
                latitudeDelta: 0.01,
            }}
        >
            <Polyline
                coordinates={locations.map(({ coords }) => coords)}
                strokeWidth={2}
                strokeColor="rgba(64, 99, 201,0.7)"
                lineDashPattern={[1]}
            />
            <Circle
                center={currentLocation.coords}
                radius={20}
                strokeColor="rgba(64, 99, 201,1.0)"
                fillColor="rgba(186,226,145,0.5)"
            />
        </MapView>
    );
};

export default Map;
