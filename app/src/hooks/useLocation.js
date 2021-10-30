import { useState, useEffect } from "react";
import {
    Accuracy,
    requestForegroundPermissionsAsync,
    watchPositionAsync,
} from "expo-location";

/**
 *
 * @param {boolean} shouldTrack
 * @param {Function} callback
 * @returns any error messages when generated every time location streaming experiencing an error
 */
export const useLocation = (shouldTrack, callback) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            try {
                const { granted } = await requestForegroundPermissionsAsync();
                if (!granted) {
                    throw new Error("Location permission not granted");
                }
                subscriber = await watchPositionAsync(
                    {
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000, // update once every second
                        distanceInterval: 10, // update once every 10 meters
                    },
                    callback
                );
            } catch (e) {
                setError(e);
            }
        };

        if (shouldTrack) {
            // start watching/tracking when user is currently on map screen and is recording
            startWatching();
        } else {
            // stop watching/tracking otherwise
            if (subscriber) subscriber.remove();
            subscriber = null;
        }
        return () => {
            // only calling this when subscriber id defined/startWatching is active
            if (subscriber) subscriber.remove();
        };
    }, [shouldTrack, callback]);

    return [error];
};
