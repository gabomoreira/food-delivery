import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, icons, SIZES} from '../../constants';

import {Image, Text, View} from 'react-native';

export const HorizontalFoodCard = ({
  containerStyle,
  imageStyle,
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}>
      {/* Image */}
      <Image source={item.image} style={imageStyle} />
      {/* Info */}
      <View style={{flex: 1}}>
        {/* Name */}
        <Text
          style={{
            ...FONTS.h3,
            fontSize: 17,
          }}>
          {item.name}
        </Text>
        {/* Description */}
        <Text style={{color: COLORS.darkGray2, ...FONTS.body4}}>
          {item.description}
        </Text>
        {/* Price */}
        <Text
          style={{
            marginTop: SIZES.base,
            ...FONTS.h2,
          }}>
          R$ {item.price}
        </Text>
      </View>
      {/* Calories */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 5,
          right: SIZES.radius,
        }}>
        <Image source={icons.calories} style={{height: 30, width: 30}} />
        <Text>{item.calories} Calories</Text>
      </View>
    </TouchableOpacity>
  );
};
