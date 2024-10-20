import { StyleSheet } from "react-native";

export const button_icon_style = StyleSheet.create({
    container: {
        display: "flex",
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: "#6750A4",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        color: "#fff",
    },
})

export const button_style = StyleSheet.create({
    container: {
        display: "flex",
        height: 40,
        borderRadius: 100,
        backgroundColor: "#6750A4",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontWeight: "500",
        fontSize: 14,
        color: "#fff"
    }
})
