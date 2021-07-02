import createDataContext from "./createDataContext";
import trackApi from "../api/trackApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGN_IN, SIGN_OUT, SIGN_UP, AUTH_ERROR } from "./types";
import { navigate } from "../navigationRef";

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
            dispatch({ type: SIGN_UP, payload: token });
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
        // API request to sign in
        const res = await trackApi.post("/signin", { email, password });
        const token = res.data.token;
        // If signed in => modify the state that the user is authenticated
        // if fails => reflect an error message
    };

const signOut = () => async (dispatch) => {
    // API request to sign out, might destroy jwt token
};

// authReducer
function authReducer(state, action) {
    switch (action.type) {
        case SIGN_UP:
            return { ...state, errorMessage: "", token: action.payload };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}

// createDataContext(reducer, actions, defaultValue)
export const { Provider, Context } = createDataContext(
    authReducer, // reducer
    { signUp }, // action functions
    { token: null, errorMessage: "" } // initial state or default value
);
