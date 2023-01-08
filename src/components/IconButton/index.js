import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../../constants';

export const IconButton = ({containerStyle, icon, iconStyle, onPress}) => {
  return (
    <TouchableOpacity style={{...containerStyle}} onPress={onPress}>
      <Image
        source={icon}
        style={{height: 30, width: 30, tintColor: COLORS.white, ...iconStyle}}
      />
    </TouchableOpacity>
  );
};
