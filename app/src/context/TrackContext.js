import produce from "immer";
import createDataContext from "./utils/createDataContext";
import { GET_TRACKS, CREATE_TRACK, ALERT_ERROR } from "./utils/actionTypes";
import trackApi from "../api/trackApi";
import _ from "lodash";
export const initialState = { tracks: null, error: null, success: null };

export const trackReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case GET_TRACKS:
            state.tracks = action.payload;
            return state;
        case CREATE_TRACK:
            state.tracks.unshift(action.payload);
            return state;
        case ALERT_ERROR:
            state.error = { message: action.payload };
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
        dispatch({
            type: ALERT_ERROR,
            payload: "ERROR: Unable to get your records",
        });
    }
};

const createTrack = (dispatch) => async (formValues) => {
    try {
        const res = await trackApi.post("/tracks/new", formValues);
        const newTrack = _.pick(res.data, [
            "dateCreated",
            "dateUpdated",
            "id",
            "met",
            "name",
        ]);
        dispatch({ type: CREATE_TRACK, payload: newTrack });
    } catch (err) {
        dispatch({
            type: ALERT_ERROR,
            payload: "ERROR: Unable to create new record",
        });
    }
};

export const { Provider, Context } = createDataContext(
    trackReducer,
    { getTracks, createTrack },
    initialState
);
