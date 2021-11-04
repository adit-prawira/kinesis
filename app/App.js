import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import AccountScreen from "./src/screens/AccountScreen.jsx";
import SignInScreen from "./src/screens/SignInScreen.jsx";
import SignUpScreen from "./src/screens/SignUpScreen.jsx";
import TrackDetailScreen from "./src/screens/TrackDetailScreen.jsx";
import TrackListScreen from "./src/screens/TrackListScreen.jsx";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen.jsx";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
        SignUp: SignUpScreen,
        SignIn: SignInScreen,
    }),
    mainFlow: createBottomTabNavigator(
        {
            Tracks: createStackNavigator({
                List: TrackListScreen,
                Detail: TrackDetailScreen,
            }),
            Create: TrackCreateScreen,
            Account: AccountScreen,
        },
        {
            tabBarOptions: {
                style: {
                    backgroundColor: "rgb(33, 34, 48)",
                },
                activeTintColor: "white",
            },
        }
    ),
});

const App = createAppContainer(switchNavigator);

const MainApp = () => {
    return (
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    <ApplicationProvider {...eva} theme={eva.dark}>
                        <App
                            ref={(navigator) => {
                                setNavigator(navigator);
                            }}
                        />
                    </ApplicationProvider>
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    );
};

export default MainApp;
