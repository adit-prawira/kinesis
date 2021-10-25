import createDataContext from "./createDataContext";
import trackApi from "../api/trackApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGN_IN, SIGN_OUT, AUTH_ERROR, CLEAR_ERROR_MESSAGE } from "./types";
import { navigate } from "../navigationRef";
import produce from "immer";
// auth action functions
const signUp =
    (dispatch) =>
    async ({ email, password }) => {
        try {
            // API request to sign up
            const res = await trackApi.post("/signup", { email, password });
            const token = res.data.token;

            // If signed up => modify the state that the user is authenticated => store tosken in storage
            await AsyncStorage.setItem("token", token);

            // dispatch to reducer
            dispatch({ type: SIGN_IN, payload: token });
            navigate("List");
        } catch (err) {
            // if fails => reflect an error message
            console.log(err.response.data);

            dispatch({
                type: AUTH_ERROR,
                payload: "Something went wrong during sign up",
            });
        }
    };

const signIn =
    (dispatch) =>
    async ({ email, password }) => {
        try {
            // API request to sign in
            const res = await trackApi.post("/signin", { email, password });
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

const signOut = (dispatch) => async () => {
    // API request to sign out, might destroy jwt token
    await AsyncStorage.removeItem("token");
    navigate("SignUp");
};

const autoLocalSignIn = (dispatch) => async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        dispatch({ type: SIGN_IN, payload: token });
        navigate("List");
    } else {
        navigate("SignUp");
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
};

const initialState = { token: null, errorMessage: "" };
// authReducer
const authReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            state.errorMessage = "";
            state.token = action.payload;
            return state;
        case AUTH_ERROR:
            state.errorMessage = action.payload;
            return state;
        case CLEAR_ERROR_MESSAGE:
            state.errorMessage = "";
            return state;
        default:
            return state;
    }
});

export const { Provider, Context } = createDataContext(
    authReducer, // reducer
    { signUp, signIn, signOut, clearErrorMessage, autoLocalSignIn }, // action functions
    initialState // initial state or default value
);
