import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Input } from "@ui-kitten/components";
import Spacer from "../components/Spacer";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Context as LocationContext } from "../context/LocationContext";
import { useSaveTrack } from "../hooks";
const styles = StyleSheet.create({
    button: {
        textAlign: "center",
    },
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
