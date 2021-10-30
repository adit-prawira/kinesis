import produce from "immer";
import createDataContext from "./createDataContext";
import {
    GET_TRACK,
    GET_TRACKS,
    CREATE_TRACK,
    UPDATE_TRACK,
    DELETE_TRACK,
} from "./actionTypes";

const initialState = [];

const trackReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case GET_TRACK:
            return state;
        case GET_TRACKS:
            return state;
        case CREATE_TRACK:
            return state;
        case UPDATE_TRACK:
            return state;
        case DELETE_TRACK:
            return state;
        default:
            return state;
    }
});

const getTracks = (dispatch) => async () => {};
const getTrack = (dispatch) => async (trackId) => {};
const createTrack = (dispatch) => async (formValues) => {
    console.log(formValues);
};
const updateTrack = (dispatch) => async (updatedFormValues) => {};
const deleteTrack = (dispatch) => async (trackId) => {};

export const { Provider, Context } = createDataContext(
    trackReducer,
    { getTrack, getTracks, createTrack, updateTrack, deleteTrack },
    initialState
);
