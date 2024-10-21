import { StyleSheet } from "react-native";
import th from "./light_theme";

export default checkbox = StyleSheet.create({
    square: {
        width: 18,
        height: 18,
        backgroundColor: th.primary,
        margin: 15,
        borderColor: th.on_surface_variant,
    },
    text: {
        color: th.on_surface,
        fontSize: 18,
        marginVertical: 10,
    }
})