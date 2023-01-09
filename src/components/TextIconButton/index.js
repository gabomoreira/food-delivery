import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {FONTS} from '../../constants';

export const TextIconButton = ({
  containerStyle,
  label,
  labelStyle,
  icon,
  iconStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        ...containerStyle,
      }}>
      <Text style={{marginRight: 5, ...FONTS.body3, ...labelStyle}}>
        {label}
      </Text>
      <Image source={icon} style={{width: 20, height: 20, ...iconStyle}} />
    </TouchableOpacity>
  );
};
