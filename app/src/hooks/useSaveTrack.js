import { useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";
import { navigate } from "../navigationRef";
export const useSaveTrack = () => {
    const { createTrack } = useContext(TrackContext);
    const {
        state: { locations, name },
        resetTrackForm,
    } = useContext(LocationContext);
    const saveTrack = async () => {
        await createTrack({ name, locations });
        resetTrackForm(); // reset track create form
        navigate("List");
    };
    return [saveTrack];
};
