import { translate } from "@/translations/translations";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import { Slider } from "@miblanchard/react-native-slider";
import useGeneralStore from "@/stores/useGeneralStore";
import useSetsStore from "@/stores/useSetsStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import TooltipWrapper from "../TooltipWrapper";

const StatSliderContent = ({ name, value, statFilterNumber, setStatFilterNumber, theme }) => {
  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);
  const updateStatValue = useSetsStore((state) => state.updateStatValue);

  const [tempValue, setTempValue] = useState(value);

  const onValueChange = ([v]) => setTempValue(v);

  const onSlidingStart = () => setIsScrollEnable(false);

  const onSlidingComplete = ([v]) => {
    updateStatValue(name, v);
    setIsScrollEnable(true);
  };

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const borderColor = useMemo(() => getStatSliderBorderColor(statFilterNumber, theme), [statFilterNumber, theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        outerContainerStyle: {
          marginBottom: 0,
          width: "100%",
        },
        innerContainerStyle: {
          flexDirection: "row",
          paddingHorizontal: 7,
          paddingVertical: 3,
          backgroundColor: theme.surface,
          borderWidth: 2,
          borderRadius: 17,
          borderColor,
        },
        containerLeft: {
          flex: 1,
        },
        containerTop: {
          flexDirection: "row",
          alignItems: "center",
        },
        textWrapper: {
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        },
        baseText: {
          color: theme.on_surface,
          fontSize: 22,
          fontWeight: "600",
        },
        nameText: {
          marginLeft: 10,
          overflow: "hidden",
        },
        separatorText: {
          marginRight: 2,
        },
        valueWrapper: {
          width: 50,
          alignItems: "flex-start",
        },
        containerBottom: {
          width: "100%",
          paddingHorizontal: 10,
        },
        sliderContainer: {
          height: 50,
          alignItems: "stretch",
          justifyContent: "center",
        },
        track: {
          height: 16,
          borderRadius: 100,
        },
        thumb: {
          backgroundColor: theme.primary,
          borderRadius: 100,
          width: 4,
          height: 44,
        },
        minimumTrack: {
          backgroundColor: theme.primary,
          borderColor: theme.surface,
          borderRightWidth: 8,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        maximumTrack: {
          backgroundColor: theme.secondary_container,
          borderColor: theme.surface,
          borderLeftWidth: 8,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        containerRight: {
          paddingTop: 4,
        },
      }),
    [theme, borderColor]
  );

  return (
    <TooltipWrapper
      tooltipText="DefineAValue"
      style={styles.outerContainerStyle}
      innerContainerStyle={styles.innerContainerStyle}
    >
      <View style={styles.containerLeft}>
        <View style={styles.containerTop}>
          <View style={styles.textWrapper}>
            <Text style={[styles.baseText, styles.nameText]} numberOfLines={1} ellipsizeMode="tail">
              {translate(name)}
            </Text>
            <Text style={[styles.baseText, styles.separatorText]}>{translate(":")}</Text>
          </View>

          <View style={styles.valueWrapper}>
            <Text style={styles.baseText}>{tempValue}</Text>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.sliderContainer}>
            <Slider
              value={tempValue}
              onValueChange={onValueChange}
              onSlidingStart={onSlidingStart}
              onSlidingComplete={onSlidingComplete}
              minimumValue={0}
              maximumValue={6}
              step={0.25}
              trackStyle={styles.track}
              thumbTouchSize={{ width: 10, height: 10 }}
              thumbStyle={styles.thumb}
              minimumTrackStyle={styles.minimumTrack}
              maximumTrackStyle={[
                styles.maximumTrack,
                {
                  borderLeftWidth: (tempValue / 6) * 230 + 10,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.containerRight}>
        <ButtonMultiStateToggle
          number={statFilterNumber}
          setNumber={setStatFilterNumber}
          filterCase={true}
          tooltipText="ChangeCondition"
        />
      </View>
    </TooltipWrapper>
  );
};

export default StatSliderContent;
