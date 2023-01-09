import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {FONTS} from '../../constants';

export const TextButton = ({
  label,
  labelStyle,
  buttonContainerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={{...buttonContainerStyle}} onPress={onPress}>
      <Text style={{...FONTS.h3, ...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  );
};
