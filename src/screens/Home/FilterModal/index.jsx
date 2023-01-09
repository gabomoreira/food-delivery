import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
} from 'react-native';
import {IconButton} from '../../../components/IconButton';
import {TextButton} from '../../../components/TextButton';
import {TextIconButton} from '../../../components/TextIconButton';
import {TwoPointsSlider} from '../../../components/TwoPointsSlider';
import {COLORS, constants, FONTS, icons, SIZES} from '../../../constants';

const Section = ({containerStyle, title, children}) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        ...containerStyle,
      }}>
      <Text style={{...FONTS.h3}}>{title}</Text>
      {children}
    </View>
  );
};

export const FilterModal = ({isVisible, onClose}) => {
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [ratings, setRatings] = useState('');
  const [tags, setTags] = useState('');

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  const Distance = () => {
    return (
      <Section title="Distância">
        <TwoPointsSlider
          values={[3, 10]}
          min={1}
          max={20}
          postfix="km"
          onValuesChange={values => console.log(values, '-------values------')}
        />
      </Section>
    );
  };

  const DeliveryTime = () => {
    return (
      <Section title="Delivery Time" containerStyle={{marginTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: SIZES.radius,
          }}>
          {constants.delivery_time.map((item, index) => (
            <TextButton
              key={index}
              label={item.label}
              labelStyle={{
                color: item.id === deliveryTime ? COLORS.white : COLORS.gray,
                ...FONTS.body3,
              }}
              buttonContainerStyle={{
                width: '30%',
                height: 50,
                margin: 5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.base,
                backgroundColor:
                  item.id === deliveryTime ? COLORS.primary : COLORS.lightGray2,
              }}
              onPress={() => setDeliveryTime(item.id)}
            />
          ))}
        </View>
      </Section>
    );
  };

  const PricingRange = () => {
    return (
      <Section title="Princing Range">
        <View style={{alignItems: 'center'}}>
          <TwoPointsSlider
            values={[10, 50]}
            min={1}
            max={100}
            prefix="R$"
            postfix=""
            onValuesChange={values => console.log(values)}
          />
        </View>
      </Section>
    );
  };

  const Ratings = () => {
    return (
      <Section title="Rating" containerStyle={{marginTop: 40}}>
        <View style={{flexDirection: 'row'}}>
          {constants.ratings.map((item, index) => (
            <TextIconButton
              key={index}
              containerStyle={{
                flex: 1,
                height: 50,
                margin: 5,
                alignItems: 'center',
                borderRadius: SIZES.base,
                backgroundColor:
                  item.id === ratings ? COLORS.primary : COLORS.lightGray2,
              }}
              label={item.label}
              labelStyle={{
                color: item.id === ratings ? COLORS.white : COLORS.gray,
              }}
              icon={icons.star}
              iconStyle={{
                tintColor: item.id === ratings ? COLORS.white : COLORS.gray,
              }}
              onPress={() => setRatings(item.id)}
            />
          ))}
        </View>
      </Section>
    );
  };

  const Tags = () => {
    return (
      <Section title="Tags">
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {constants.tags.map((item, index) => (
            <TextButton
              key={index}
              label={item.label}
              labelStyle={{
                color: item.id === tags ? COLORS.white : COLORS.gray,
                ...FONTS.body3,
              }}
              buttonContainerStyle={{
                height: 50,
                margin: 5,
                paddingHorizontal: SIZES.padding,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.base,
                backgroundColor:
                  item.id === tags ? COLORS.primary : COLORS.lightGray2,
              }}
              onPress={() => setTags(item.id)}
            />
          ))}
        </View>
      </Section>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <StatusBar barStyle="light-content" />

      <Modal
        statusBarTranslucent
        visible={isVisible}
        animationType="fade"
        transparent={true}>
        <View style={{flex: 1, backgroundColor: COLORS.transparentBlack7}}>
          <TouchableWithoutFeedback onPress={() => onClose()}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: modalY,
              bottom: 0,
              width: '100%',
              padding: SIZES.padding,
              borderTopLeftRadius: SIZES.padding,
              borderTopRightRadius: SIZES.padding,
              backgroundColor: COLORS.white,
            }}>
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{flex: 1, ...FONTS.h3, fontSize: 18}}>
                Filtre Sua Pesquisa
              </Text>
              <IconButton
                containerStyle={{
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: COLORS.gray2,
                }}
                icon={icons.cross}
                iconStyle={{
                  tintColor: COLORS.gray2,
                }}
                onPress={() => onClose()}
              />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}>
              {/* Distance */}
              <Distance />

              {/* DeliveryTime */}
              <DeliveryTime />

              {/* DeliveryTime */}
              <PricingRange />

              {/* Ratings */}
              <Ratings />

              {/* Tags */}
              <Tags />
            </ScrollView>

            {/* Apply Button */}
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 110,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
                backgroundColor: COLORS.white,
              }}>
              <TextButton
                label="Aplicar Filtros"
                labelStyle={{color: COLORS.white}}
                buttonContainerStyle={{
                  height: 50,
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => console.log('Apply filters')}
              />
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};
