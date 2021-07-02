import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";

import AccountScreen from "./src/screens/AccountScreen.jsx";
import SignInScreen from "./src/screens/SignInScreen.jsx";
import SignUpScreen from "./src/screens/SignUpScreen.jsx";
import CreateTrackScreen from "./src/screens/CreateTrackScreen.jsx";
import TrackDetailScreen from "./src/screens/TrackDetailScreen.jsx";
import TrackListScreen from "./src/screens/TrackListScreen.jsx";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
        SignUp: SignUpScreen,
        SignIn: SignInScreen,
    }),
    mainFlow: createBottomTabNavigator({
        Tracks: createStackNavigator({
            List: TrackListScreen,
            Detail: TrackDetailScreen,
        }),
        Create: CreateTrackScreen,
        Account: AccountScreen,
    }),
});

const App = createAppContainer(switchNavigator);

const MainApp = () => {
    return (
        <AuthProvider>
            <ApplicationProvider {...eva} theme={eva.dark}>
                <App
                    ref={(navigator) => {
                        setNavigator(navigator);
                    }}
                />
            </ApplicationProvider>
        </AuthProvider>
    );
};

export default MainApp;
