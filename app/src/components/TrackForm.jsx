import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Card, Layout, Text } from "@ui-kitten/components";
import Spacer from "../components/Spacer";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Context as LocationContext } from "../context/LocationContext";
import TouchableIcon from "./TouchableIcon";
import { useSaveTrack } from "../hooks";

const styles = StyleSheet.create({
    button: {
        textAlign: "center",
    },
    container: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
    },
    title: { margin: "2%" },
});
const StartRecordIcon = () => (
    <MaterialCommunityIcons
        name="record-circle-outline"
        color="rgb(233, 79, 144)"
        size={24}
    />
);
const StopRecordIcon = () => (
    <MaterialCommunityIcons
        name="stop-circle-outline"
        color="rgb(116, 124, 146)"
        size={24}
    />
);
const AddIcon = ({ valid }) => (
    <MaterialIcons
        name="add-road"
        color={valid ? "rgb(102, 220, 156)" : "rgb(116, 124, 146)"}
        size={24}
    />
);
const TrackForm = () => {
    const {
        state: { name, recording, locations },
        startRecording,
        stopRecording,
        updateTrackName,
    } = useContext(LocationContext);
    const [saveTrack] = useSaveTrack();
    return (
        <>
            <Spacer>
                <Input
                    placeholder="Enter Track Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={name}
                    onChangeText={updateTrackName}
                    accessoryLeft={() => (
                        <FontAwesomeIcon
                            size={24}
                            color="white"
                            name="pencil-square-o"
                        />
                    )}
                />
            </Spacer>

            <Spacer>
                <Card
                    style={styles.item}
                    status="basic"
                    header={() => (
                        <Text style={styles.title}>Choose Activity:</Text>
                    )}
                    status="success"
                >
                    <Layout style={styles.container} level="1">
                        <TouchableIcon icon={Fontisto} name="bicycle" />
                        <TouchableIcon
                            icon={MaterialIcons}
                            name="directions-walk"
                        />
                        <TouchableIcon
                            icon={MaterialCommunityIcons}
                            name="run"
                        />
                        <TouchableIcon
                            icon={MaterialCommunityIcons}
                            name="run-fast"
                        />
                    </Layout>
                </Card>
            </Spacer>
            <Spacer>
                <Button
                    appearance="outline"
                    status={!recording ? "danger" : "basic"}
                    size="small"
                    accessoryLeft={
                        !recording ? StartRecordIcon : StopRecordIcon
                    }
                    style={styles.button}
                    onPress={!recording ? startRecording : stopRecording}
                >
                    {!recording ? "Start Recording" : "Stop Recording"}
                </Button>
            </Spacer>
            <Spacer>
                <Button
                    appearance="outline"
                    status="success"
                    size="small"
                    accessoryLeft={() => (
                        <AddIcon
                            valid={
                                !recording &&
                                locations.length > 0 &&
                                name.length > 0
                            }
                        />
                    )}
                    style={styles.button}
                    disabled={
                        !(!recording && locations.length > 0 && name.length > 0)
                    }
                    onPress={saveTrack}
                >
                    Add New Track
                </Button>
            </Spacer>
        </>
    );
};

export default TrackForm;
