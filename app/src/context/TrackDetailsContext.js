import produce from "immer";
import createDataContext from "./utils/createDataContext";
import trackApi from "../api/trackApi";
import {
    GET_TRACK,
    UPDATE_TRACK,
    DELETE_TRACK,
    ALERT_ERROR,
    CLEAN_UP,
} from "./utils/actionTypes";
export const initialState = { details: null, error: null, success: null };
export const trackDetailsReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case GET_TRACK:
            state.details = action.payload;
            return state;
        case UPDATE_TRACK:
            return state;
        case DELETE_TRACK:
            return state;
        case CLEAN_UP:
            state = initialState;
            return state;
        case ALERT_ERROR:
            return state;
    }
});

const getTrack = (dispatch) => async (trackId) => {
    try {
        const res = await trackApi.get(`/api/tracks/${trackId}`);
        dispatch({ type: GET_TRACK, payload: res.data });
    } catch (err) {
        dispatch({
            type: ALERT_ERROR,
            payload: "ERROR: Unable to get track details",
        });
    }
};

const cleanup = (dispatch) => () => dispatch({ type: CLEAN_UP });
const updateTrack = (dispatch) => async (updatedFormValues) => {};
const deleteTrack = (dispatch) => async (trackId) => {};
export const { Provider, Context } = createDataContext(
    trackDetailsReducer,
    {
        getTrack,
        updateTrack,
        deleteTrack,
        cleanup,
    },
    initialState
);
