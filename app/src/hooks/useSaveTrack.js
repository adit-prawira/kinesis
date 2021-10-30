import { useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";

export const useSaveTrack = () => {
    const { createTrack } = useContext(TrackContext);
    const {
        state: { locations, name },
    } = useContext(LocationContext);
    const saveTrack = () => {
        createTrack({ name, locations });
    };
    return [saveTrack];
};
