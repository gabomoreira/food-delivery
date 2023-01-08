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
import {TwoPointsSlider} from '../../../components/TwoPointsSlider';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';

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

  return (
    <View style={{flex: 1}}>
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
              contentContainerStyle={{paddingBottom: 250}}>
              {/* Distance */}
              <Distance />
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};
