import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {COLORS, FONTS, SIZES} from '../../constants';

export const TwoPointsSlider = ({
  values,
  min,
  max,
  prefix,
  postfix,
  onValuesChange,
}) => {
  return (
    <MultiSlider
      values={values}
      min={min}
      max={max}
      sliderLength={SIZES.width - SIZES.padding * 2 - 20}
      step={1}
      markerOffsetY={20}
      selectedStyle={{
        backgroundColor: COLORS.primary,
      }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
      }}
      minMarkerOverlapDistance={50}
      customMarker={e => (
        <View
          style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              backgroundColor: COLORS.primary,
              borderRadius: 15,
              borderWidth: 4,
              borderColor: COLORS.white,
              ...styles.shadow,
            }}
          />
          <Text
            style={{
              marginTop: 5,
              color: COLORS.darkGray,
              ...FONTS.body4,
            }}>
            {prefix}
            {e.currentValue} {postfix}
          </Text>
        </View>
      )}
      onValuesChange={values => onValuesChange(values)}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
});
