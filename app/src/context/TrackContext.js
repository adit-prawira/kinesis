import produce from "immer";
import createDataContext from "./utils/createDataContext";
import { GET_TRACKS, CREATE_TRACK, ALERT_ERROR } from "./utils/actionTypes";
import trackApi from "../api/trackApi";

const initialState = { tracks: null, error: null, success: null };

const trackReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case GET_TRACKS:
            state.tracks = action.payload;
            return state;
        case CREATE_TRACK:
            return state;
        case ALERT_ERROR:
            return state;
        default:
            return state;
    }
});

const getTracks = (dispatch) => async () => {
    try {
        const tracks = (await trackApi.get("/tracks")).data;
        dispatch({ type: GET_TRACKS, payload: tracks });
    } catch (err) {
        dispatch({ type: ALERT_ERROR, payload: "Oops! Something went wrong!" });
    }
};

const createTrack = (dispatch) => async (formValues) => {
    await trackApi.post("/tracks/new", formValues);
};

export const { Provider, Context } = createDataContext(
    trackReducer,
    { getTracks, createTrack },
    initialState
);
