import React, { useContext, useEffect } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import {
    Button,
    List,
    ListItem,
    Divider,
    Card,
    Text,
} from "@ui-kitten/components";
import { Context as TrackContext } from "../context/TrackContext";
import { NavigationEvents } from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoadSpinner from "../components/LoadSpinner.jsx";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "1%",
        backgroundColor: "rgb(45, 48, 65)",
    },
    list: {
        borderRadius: 5,
        elevation: 3,
    },
    divider: { backgroundColor: "rgb(78,79,90)" },
    button: {
        marginRight: "5%",
        marginLeft: "5%",
    },

    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    image: { width: 300, height: 300 },
    cardContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
    },
    noDataContainer: {
        flex: 1,
        padding: "1%",
        backgroundColor: "rgb(45, 48, 65)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25%",
    },
    noDataText: {
        textAlign: "center",
        marginTop: "10%",
        color: "#5bc78d",
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
            description={`Date Created:${new Date(
                item.dateCreated
            ).toLocaleDateString()}`}
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
                        navigation.navigate("Detail", { trackId: item.id })
                    }
                >
                    View Details
                </Button>
            )}
            style={styles.list}
        />
    );
    const renderContent = () => {
        if (tracks.length > 0) {
            return (
                <List
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    data={tracks}
                    ItemSeparatorComponent={() => (
                        <Divider style={styles.divider} />
                    )}
                    renderItem={renderListItem}
                />
            );
        }
        return (
            <View style={styles.noDataContainer}>
                <Card style={styles.cardContainer}>
                    <Image
                        source={require("../../assets/NoData.png")}
                        style={styles.image}
                    />
                    <Text style={styles.noDataText} category="s1">
                        You don't have any records yet
                    </Text>
                </Card>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationEvents onWillFocus={getTracks} />
            {tracks !== null ? renderContent() : <LoadSpinner />}
        </SafeAreaView>
    );
};

TrackListScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

export default TrackListScreen;
