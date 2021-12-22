import { useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as TrackDetailsContext } from "../context/TrackDetailsContext";
export const useCleanup = () => {
    const { cleanup: locationCleanup } = useContext(LocationContext);
    const { cleanup: trackCleanup } = useContext(TrackContext);
    const { cleanup: trackDetailsCleanup } = useContext(TrackDetailsContext);

    return () => {
        locationCleanup();
        trackCleanup();
        trackDetailsCleanup();
    };
};
