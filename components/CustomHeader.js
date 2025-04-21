import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomHeader = ({ title }) => {
  return (
    <View
      style={{
        height: 90,
        backgroundColor: "#ffcc00",
        justifyContent: "flex-end",
        paddingBottom: 12,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      <MaterialCommunityIcons
        name="car-sports"
        size={24}
        color="#333"
        style={{ marginRight: 10 }}
      />
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#333" }}>
        {title}
      </Text>
    </View>
  );
};

export default CustomHeader;
