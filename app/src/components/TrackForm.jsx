import React, { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Card, Layout, Text } from "@ui-kitten/components";
import Spacer from "../components/Spacer";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Context as LocationContext } from "../context/LocationContext";
import { useSaveTrack } from "../hooks";
import { Stopwatch } from "react-native-stopwatch-timer";

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

const metDataList = [
    {
        name: "bicycle",
        iconName: "bicycle",
        level: 7.5,
        IconComponent: Fontisto,
        selected: false,
    },
    {
        name: "walk",
        iconName: "directions-walk",
        level: 4.3,
        IconComponent: MaterialIcons,
        selected: false,
    },
    {
        name: "run",
        iconName: "run",
        level: 6,
        IconComponent: MaterialCommunityIcons,
        selected: false,
    },
    {
        name: "run-fast",
        iconName: "run-fast",
        level: 8,
        IconComponent: MaterialCommunityIcons,
        selected: false,
    },
];
const timerOptions = {
    container: {
        backgroundColor: "rgb(35, 42, 67)",
        borderColor: "black",
        borderWidth: "1px",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    text: {
        fontSize: 40,
        color: "white",
    },
};

const TrackForm = () => {
    const {
        state: { name, recording, locations },
        startRecording,
        stopRecording,
        updateTrackName,
        setMetLevel,
    } = useContext(LocationContext);
    const [saveTrack] = useSaveTrack();
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [time, setTime] = useState("");
    const [metData, setMetData] = useState(metDataList);

    const handleResetStopwatch = () => setResetStopwatch(true);
    const handleChooseMet = (value) => {
        let copy = metDataList.map((item) => {
            if (item.name === value.name) {
                return { ...item, selected: true };
            }
            return { ...item, selected: false };
        });
        setMetLevel(value.level);
        setMetData(copy);
    };
    useEffect(() => {
        if (resetStopwatch) {
            const timer = setTimeout(() => {
                setResetStopwatch(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resetStopwatch]);

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
                <Stopwatch
                    laps
                    start={recording}
                    getTime={setTime}
                    options={timerOptions}
                    reset={resetStopwatch}
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
                        {metData.map(
                            (
                                {
                                    name,
                                    iconName,
                                    level,
                                    IconComponent,
                                    selected,
                                },
                                index
                            ) => (
                                <Button
                                    key={index}
                                    onPress={() =>
                                        handleChooseMet({ name, level })
                                    }
                                    status="primary"
                                    appearance="ghost"
                                    accessoryLeft={() => (
                                        <IconComponent
                                            size={24}
                                            name={iconName}
                                            color={
                                                selected
                                                    ? "rgb(52, 235, 183)"
                                                    : "white"
                                            }
                                        />
                                    )}
                                />
                            )
                        )}
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
                    onPress={
                        !recording ? startRecording : () => stopRecording(time)
                    }
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
                    onPress={async () => {
                        await saveTrack();
                        handleResetStopwatch();
                    }}
                >
                    Add New Track
                </Button>
            </Spacer>
        </>
    );
};

export default TrackForm;
