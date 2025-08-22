import React, { ReactNode } from "react";
import { Text } from "react-native";

interface HelpBoldTextProps {
  children: ReactNode;
}

const HelpBoldText = ({ children }: HelpBoldTextProps) => <Text style={{ fontWeight: "600" }}>{children}</Text>;

export default HelpBoldText;
