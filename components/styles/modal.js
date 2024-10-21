import { StyleSheet } from "react-native";
import { button } from "./button";

export const modal = StyleSheet.create({
    background: {
        cursor: "auto",
        zIndex: -1,
        position: "absolute",
        width: "100vw",
        height: "100vh",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
        cursor: "auto",
        alignSelf: "center",
        minWidth: 280,
        maxWidth: 560,
        borderRadius: 28,
        paddingVertical: 24,
        backgroundColor: "#ECE6F0",
    },
    content: {
        marginBottom: 20,
        maxHeight: 300,
        overflow: "scroll",
        alignItems: "flex-start",
        paddingHorizontal: 24,
        borderTopColor: "#000",
        borderTopWidth: 1,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
    },
    title: {
        paddingHorizontal: 24,
        fontSize: 24,
        marginBottom: 16,
    }
})
