import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';

export const VerticalFoodCard = ({containerStyle, item, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
        width: 200,
        padding: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Image source={icons.calories} style={{height: 30, width: 30}} />
          <Text style={{...FONTS.body5, color: COLORS.darkGray2}}>
            {item.calories} Calories
          </Text>
        </View>
        <Image
          source={icons.love}
          style={{
            height: 20,
            width: 20,
            tintColor: item.isFavourite ? COLORS.primary : COLORS.gray,
          }}
        />
      </View>

      <View
        style={{
          height: 150,
          width: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={item.image} style={{height: '100%', width: '100%'}} />
      </View>
      <View style={{alignItems: 'center', marginTop: -20}}>
        <Text style={{...FONTS.h3}}>{item.name}</Text>
        <Text style={{...FONTS.body5, color: COLORS.darkGray2}}>
          {item.description}
        </Text>
        <Text style={{marginTop: SIZES.base, ...FONTS.h2}}>
          R$ {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
