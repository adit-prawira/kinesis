import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Polyline } from "react-native-maps";

const styles = StyleSheet.create({
    map: {
        height: 300,
    },
});

const Map = () => {
    let points = [];
    for (var i = 0; i < 10; i++) {
        if (i % 2 === 0) {
            points.push({
                latitude: 37.33233 + i * 0.01,
                longitude: -122.03121 + i * 0.01,
            });
        } else {
            points.push({
                latitude: 37.33233 - i * 0.01,
                longitude: -122.03121 + i * 0.01,
            });
        }
    }
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.33233,
                longitude: -122.03121,
                longitudeDelta: 0.01,
                latitudeDelta: 0.01,
            }}
        >
            <Polyline coordinates={points} />
        </MapView>
    );
};

export default Map;
