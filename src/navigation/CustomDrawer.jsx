import {View, Text, Image, TouchableOpacity} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {MainLayout} from '../screens/MainLayout';

import {COLORS, FONTS, SIZES, constants, icons, dummyData} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getSelectedTab, setSelectedTab} from '../store/tab/tabSlice';

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({label, icon, onPress, isFocused}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        style={{
          height: 20,
          width: 20,
          tintColor: COLORS.white,
        }}
      />
      <Text
        style={{
          color: COLORS.white,
          marginLeft: 15,
          ...FONTS.h3,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({navigation}) => {
  const selectedTab = useSelector(state => getSelectedTab(state));
  const dispatch = useDispatch();

  const handleNavigation = route => {
    dispatch(setSelectedTab(route));
    navigation.navigate('MainLayout');
  };

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: SIZES.radius}}>
        {/* Close Button */}
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigation.closeDrawer()}>
            <Image
              source={icons.cross}
              style={{
                height: 35,
                width: 35,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Profile */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}
          onPress={() => console.log('profile')}>
          <Image
            source={dummyData.myProfile.profile_image}
            style={{
              width: 50,
              height: 50,
              borderRadius: SIZES.radius,
            }}
          />
          <View style={{marginLeft: SIZES.radius}}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>
              {dummyData.myProfile.name}
            </Text>
            <Text style={{color: COLORS.white, ...FONTS.body4}}>
              Ver meu perfil
            </Text>
          </View>
        </TouchableOpacity>
        {/* Drawer items */}
        <View style={{flex: 1, marginTop: SIZES.padding}}>
          <CustomDrawerItem
            isFocused={selectedTab === constants.screens.home ? true : false}
            onPress={() => handleNavigation(constants.screens.home)}
            label={constants.screens.home}
            icon={icons.home}
          />
          <CustomDrawerItem
            isFocused={
              selectedTab === constants.screens.my_wallet ? true : false
            }
            onPress={() => handleNavigation(constants.screens.my_wallet)}
            label={constants.screens.my_wallet}
            icon={icons.wallet}
          />
          <CustomDrawerItem
            isFocused={
              selectedTab === constants.screens.notification ? true : false
            }
            onPress={() => handleNavigation(constants.screens.notification)}
            label={constants.screens.notification}
            icon={icons.notification}
          />
          <CustomDrawerItem
            isFocused={
              selectedTab === constants.screens.favourite ? true : false
            }
            onPress={() => handleNavigation(constants.screens.favourite)}
            label={constants.screens.favourite}
            icon={icons.favourite}
          />

          {/* Line Divider */}
          <View
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />

          <CustomDrawerItem
            label="Acompanhe seu Pedido"
            icon={icons.location}
          />
          <CustomDrawerItem label="Cupons" icon={icons.coupon} />
          <CustomDrawerItem label="Convidar um Amigo" icon={icons.profile} />
          <CustomDrawerItem label="Configurações" icon={icons.setting} />
          <CustomDrawerItem label="Central de Ajuda" icon={icons.help} />
        </View>

        <View style={{marginBottom: SIZES.padding}}>
          <CustomDrawerItem label="Sair" icon={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export const CustomDrawer = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'rgba(0,0,0,0.3)',
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
          drawerStyle: {
            flex: 1,
            width: '65%',
            paddingRight: 20,
            backgroundColor: 'transparent',
          },
        }}
        drawerContent={props => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}
        initialRouteName="MainLayout">
        <Drawer.Screen name="MainLayout">
          {props => {
            return <MainLayout {...props} />;
          }}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};
