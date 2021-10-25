import { useState, useEffect } from "react";
import {
    Accuracy,
    requestForegroundPermissionsAsync,
    watchPositionAsync,
} from "expo-location";

export const useLocation = (shouldTrack, callback) => {
    const [error, setError] = useState(null);
    const [subscriber, setSubscriber] = useState(null);
    const startWatching = async () => {
        try {
            const { granted } = await requestForegroundPermissionsAsync();
            if (!granted) {
                throw new Error("Location permission not granted");
            }

            const sub = await watchPositionAsync(
                {
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000, // update once every second
                    distanceInterval: 10, // update once every 10 meters
                },
                callback
            );
            setSubscriber(sub);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
        if (shouldTrack) {
            startWatching(); // start watching/tracking when user is currently on map screen and is recording
        } else {
            // stop watching/tracking otherwise
            subscriber.remove();
            setSubscriber(null);
        }
    }, [shouldTrack]);

    return [error];
};
