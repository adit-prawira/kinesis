import createDataContext from "./utils/createDataContext";
import trackApi from "../api/trackApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    SIGN_IN,
    AUTH_ERROR,
    CLEAR_ERROR_MESSAGE,
    CLEAN_UP_AUTH_DETAILS,
} from "./utils/actionTypes";
import { navigate } from "../navigationRef";
import produce from "immer";

export const initialState = {
    token: null,
    errorMessage: "",
    currentUser: null,
};

// authReducer
export const authReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            state.errorMessage = "";
            state.token = action.payload.token;
            state.currentUser = { ...action.payload.currentUser };
            return state;
        case AUTH_ERROR:
            state.errorMessage = action.payload;
            return state;
        case CLEAR_ERROR_MESSAGE:
            state.errorMessage = "";
            return state;
        case CLEAN_UP_AUTH_DETAILS:
            state = initialState;
            return state;
        default:
            return state;
    }
});

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch a sign up action by setting auth token as its payload
 *          otherwise dispatch authentication error action and set error message as its payload
 */
const signUp =
    (dispatch) =>
    /**
     * Will create a request on accessing auth token by giving an existing and valid credentials
     * in the database
     * @param {string} email
     * @param {string} password
     */
    async ({ email, password }) => {
        try {
            // API request to sign up
            const res = await trackApi.post("/users/signup", {
                email,
                password,
            });
            const token = res.data.token;

            // If signed up => modify the state that the user is authenticated => store tosken in storage
            await AsyncStorage.setItem("token", token);

            // dispatch to reducer
            dispatch({ type: SIGN_IN, payload: token });
            navigate("List");
        } catch (err) {
            // if fails => reflect an error message

            dispatch({
                type: AUTH_ERROR,
                payload: "Something went wrong during sign up",
            });
        }
    };

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch a sign in action by setting auth token as its payload
 *          otherwise dispatch authentication error action and set error message as its payload
 */
const signIn =
    (dispatch) =>
    /**
     * Will create a request on creating new user profile to the database
     * @param {string} email
     * @param {string} password
     */
    async ({ email, password }) => {
        try {
            // API request to sign in
            const res = await trackApi.post("/users/signin", {
                email,
                password,
            });
            const token = res.data.token;

            // If signed in => modify the state that the user is authenticated
            await AsyncStorage.setItem("token", token);

            // if fails => reflect an error message
            dispatch({ type: SIGN_IN, payload: token });
            navigate("List");
        } catch (err) {
            // dispatch to reducer
            dispatch({
                type: AUTH_ERROR,
                payload: "Something went wrong during sign in",
            });
        }
    };

/**
 *
 * @param {Function} dispatch
 * @returns a function that will remove stored auth token from the AsyncStorage and navigate user
 *          to Authentication screen
 */
const signOut = (dispatch) => async () => {
    // API request to sign out, might destroy jwt token
    await AsyncStorage.removeItem("token");
    dispatch({ type: CLEAN_UP_AUTH_DETAILS });
    navigate("SignUp");
};

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch an action on to sign in automatically by getting an existing token
 *          in AsyncStorage
 */
const autoLocalSignIn = (dispatch) => async () => {
    const token = await AsyncStorage.getItem("token");
    const res = await trackApi.get("/users/currentuser");
    const currentUser = res.data.currentUser;

    if (token) {
        dispatch({ type: SIGN_IN, payload: { token, currentUser } });
        navigate("List");
    } else {
        navigate("SignUp");
    }
};

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch an action to reset/remove error messages
 */
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
};

const uploadProfileImage = (dispatch) => (photo) => {
    const formData = new FormData();
};
export const { Provider, Context } = createDataContext(
    authReducer, // reducer
    { signUp, signIn, signOut, clearErrorMessage, autoLocalSignIn }, // action functions
    initialState // initial state or default value
);
