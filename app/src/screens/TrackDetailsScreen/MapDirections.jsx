import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Platform } from "react-native";

import MapView, { Polyline, Marker } from "react-native-maps";
import { mapDirectionsStyles as styles } from "./styles";

const MapDirections = ({ locations, midPoint, markers }) => {
    const mapRef = useRef();

    // the function that will handle fit coordinates functionality on android
    const handleLayout = () => {
        if (Platform.OS === "android") {
            mapRef.current.fitToCoordinates(
                locations.map(({ coords }) => ({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                })),
                {
                    animated: true,
                    edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
                }
            );
        }
    };
    useEffect(() => {
        let mounted = true;

        // NOTED: the process below only valid to ios
        if (mounted && mapRef.current && Platform.OS !== "android") {
            mapRef.current.fitToCoordinates(
                locations.map(({ coords }) => ({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                })),
                {
                    animated: true,
                    edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
                }
            );
            return () => {
                mounted = false;
            };
        }
    }, [locations, mapRef.current]);

    return (
        <View>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    ...locations[locations.length - 1].coords,
                    ...midPoint,

                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                }}
                onLayout={handleLayout}
            >
                {markers.map(({ id, name, latitude, longitude }) => (
                    <Marker
                        key={id}
                        id={id}
                        coordinate={{ latitude, longitude }}
                        title={name}
                    />
                ))}
                <Polyline
                    coordinates={locations.map(({ coords }) => coords)}
                    strokeWidth={2}
                    strokeColor="rgba(64, 99, 201,0.7)"
                    lineDashPattern={[1]}
                />
            </MapView>
        </View>
    );
};
MapDirections.propTypes = {
    locations: PropTypes.arrayOf(
        PropTypes.shape({
            timestamp: PropTypes.number,
            _id: PropTypes.string,
            coords: PropTypes.shape({
                accuracy: PropTypes.number,
                altitude: PropTypes.number,
                heading: PropTypes.number,
                latitude: PropTypes.number,
                longitude: PropTypes.number,
                speed: PropTypes.number,
            }),
        })
    ),
    midPoint: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
    }),
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            name: PropTypes.string,
        })
    ),
};
export default MapDirections;
