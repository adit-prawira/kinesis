import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
    Button,
    List,
    Spinner,
    ListItem,
    Divider,
} from "@ui-kitten/components";
import { Context as TrackContext } from "../context/TrackContext";
import { NavigationEvents } from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "1%",
        backgroundColor: "rgb(36, 42, 67)",
    },
    button: {
        marginRight: "5%",
        marginLeft: "5%",
    },

    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
});

const TrackListScreen = ({ navigation }) => {
    const {
        state: { tracks },
        getTracks,
    } = useContext(TrackContext);
    const renderListItem = ({ item, index }) => (
        <ListItem
            title={`${item.name} `}
            description={`Date Created:${new Date().toLocaleDateString()}`}
            accessoryLeft={() => (
                <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={24}
                    color="white"
                />
            )}
            accessoryRight={() => (
                <Button
                    appearance="outline"
                    status="success"
                    size="small"
                    accessoryLeft={() => (
                        <MaterialIcons
                            name="preview"
                            size={20}
                            color="rgb(102, 220, 156)"
                        />
                    )}
                    onPress={() =>
                        navigation.navigate("Detail", { trackId: item._id })
                    }
                >
                    View Details
                </Button>
            )}
        />
    );
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={getTracks} />
            {tracks.length > 0 ? (
                <List
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    data={tracks}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={renderListItem}
                />
            ) : (
                <Spinner status="success" />
            )}
        </View>
    );
};

TrackListScreen.navigationOptions = () => {
    return {
        title: "Tracks",
        headerTitleStyle: {
            color: "white",
        },
        headerStyle: {
            backgroundColor: "rgb(28, 34, 54)",
        },
    };
};

export default TrackListScreen;
