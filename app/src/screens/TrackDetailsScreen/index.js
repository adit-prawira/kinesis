import React, { useEffect, useContext, useState } from "react";
import { ScrollView } from "react-native";
import { Context as TrackDetailsContext } from "../../context/TrackDetailsContext";
import uuid from "react-native-uuid";
import LoadSpinner from "../../components/LoadSpinner.jsx";
import MapDirections from "./MapDirections.jsx";
import { trackDetailsScreenStyles as styles } from "./styles";
import DetailsOverview from "./DetailsOverview.jsx";
import _ from "lodash";
const TrackDetailsScreen = ({
    navigation: {
        state: {
            params: { trackId },
        },
    },
}) => {
    const [markers, setMarkers] = useState(null);
    const [midPoint, setMidPoint] = useState(null);
    const {
        state: { details },
        getTrack,
        cleanUpTrackDetails,
    } = useContext(TrackDetailsContext);
    const calcInitialParams = () => {
        const totalLocationRecorded = details.locations.length - 1;
        const { latitude: x1, longitude: y1 } =
            details.locations[totalLocationRecorded].coords;
        const { latitude: x2, longitude: y2 } = details.locations[0].coords;
        const markers = [
            { name: "Start", latitude: x2, longitude: y2, id: uuid.v4() },
            { name: "Finish", latitude: x1, longitude: y1, id: uuid.v4() },
        ];
        return {
            markers,
            midLatitude: (x1 + x2) / 2,
            midLongitude: (y1 + y2) / 2,
        };
    };
    useEffect(() => {
        getTrack(trackId);
    }, []);

    useEffect(() => {
        let mounted = true;

        if (mounted && details) {
            const { markers, midLatitude, midLongitude } = calcInitialParams();
            setMarkers(markers);
            setMidPoint({
                latitude: midLatitude,
                longitude: midLongitude,
            });
            return () => {
                mounted = false;
                cleanUpTrackDetails();
            };
        }
    }, [details, cleanUpTrackDetails]);

    const dataIsReadyToRender = () => details && midPoint && markers;

    return (
        <ScrollView style={styles.container}>
            {dataIsReadyToRender() ? (
                <>
                    <MapDirections
                        locations={details.locations}
                        midPoint={midPoint}
                        markers={markers}
                    />
                    <DetailsOverview details={_.omit(details, ["locations"])} />
                </>
            ) : (
                <LoadSpinner />
            )}
        </ScrollView>
    );
};

TrackDetailsScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};
export default TrackDetailsScreen;
