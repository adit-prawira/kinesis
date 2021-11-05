import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "@ui-kitten/components";
const styles = StyleSheet.create({
    button: {
        textAlign: "center",
    },
});
const TouchableIcon = ({ icon: Icon, iconName, ...rest }) => {
    const [pressed, setPressed] = useState(false);
    return (
        <Button
            onPress={() => setPressed(!pressed)}
            status="primary"
            appearance="ghost"
            accessoryLeft={() => (
                <Icon
                    size={24}
                    name={iconName}
                    color={pressed ? "rgb(52, 235, 183)" : "white"}
                    {...rest}
                />
            )}
        />
    );
};

export default TouchableIcon;
