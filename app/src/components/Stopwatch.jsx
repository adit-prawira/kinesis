import React, { useState, useEffect, useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { StyleSheet } from "react-native";
import { Button, Input, Card, Layout, Text } from "@ui-kitten/components";
import PropTypes from "prop-types";
const styles = StyleSheet.create({
    text: {
        textAlign: "center",
    },
});
const Stopwatch = ({ recording, reset }) => {
    const { setTimeRecorded } = useContext(LocationContext);
    const [time, setTime] = useState(0);
    useEffect(() => {
        if (reset) {
            setTime(0);
        }
    }, [reset]);
    const getHours = () => ("0" + Math.floor((time / 3600000) % 60)).slice(-2);
    const getMinutes = () => ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const getSeconds = () => ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const getMilliSeconds = () => ("0" + ((time / 10) % 100)).slice(-2);
    useEffect(() => {
        let interval = null;
        if (recording) {
            interval = setInterval(() => {
                setTime((previousTime) => previousTime + 10);
            }, 10);
        } else {
            if (time > 0) setTimeRecorded(time / 1000);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [recording]);

    return (
        <Card>
            <Text
                category="h3"
                style={styles.text}
            >{`${getHours()} : ${getMinutes()} : ${getSeconds()} : ${getMilliSeconds()}`}</Text>
        </Card>
    );
};
Stopwatch.propTypes = {
    recording: PropTypes.bool,
};
export default Stopwatch;
