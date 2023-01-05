import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HorizontalFoodCard} from '../../components/HorizontalFoodCard';

import {SIZES, COLORS, FONTS, icons, dummyData} from '../../constants';

export const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  const handleChangeCategory = (categoryId, menuTypeId) => {
    let selectedRecommend = dummyData.menu.find(i => i.name === 'Recommended');

    let selectedMenu = dummyData.menu.find(i => i.id === menuTypeId);

    setRecommended(
      selectedRecommend?.list?.filter(i => i.categories.includes(categoryId)),
    );

    setMenuList(
      selectedMenu?.list?.filter(i => i.categories.includes(categoryId)),
    );
  };

  const Section = ({title, onPress, children}) => {
    return (
      <View>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: SIZES.padding,
            marginTop: 30,
            marginBottom: 20,
          }}>
          <Text style={{flex: 1, ...FONTS.h3}}>{title}</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={{color: COLORS.primary, ...FONTS.body3}}>
              Show all
            </Text>
          </TouchableOpacity>
        </View>
        {/* Content */}
        {children}
      </View>
    );
  };

  const Search = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        {/* Icon */}
        <Image
          source={icons.search}
          style={{height: 20, width: 20, tintColor: COLORS.black}}
        />
        {/* Text */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="Pesquise o que deseja comer..."
        />
        {/* Filter Button */}
        <TouchableOpacity
        //onPress
        >
          <Image
            source={icons.filter}
            style={{height: 20, width: 20, tintColor: COLORS.black}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const MenuType = () => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dummyData.menu}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedMenuType(item.id);
              handleChangeCategory(selectedCategoryId, selectedMenuType);
            }}
            style={{
              marginLeft: SIZES.padding,
              marginRight:
                index === dummyData.menu.length - 1 ? SIZES.padding : 0,
            }}>
            <Text
              style={{
                color:
                  item.id === selectedMenuType ? COLORS.primary : COLORS.black,
                ...FONTS.h3,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const SectionRecommended = () => {
    return (
      <Section
        title="Popular Near You"
        onPress={() => console.log('Show all section recommend')}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recommended}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <HorizontalFoodCard
              containerStyle={{
                height: 180,
                width: SIZES.width * 0.85,
                marginLeft: index === 0 ? SIZES.padding : 18,
                marginRight:
                  index === recommended.length - 1 ? SIZES.padding : 0,
                paddingRight: SIZES.radius,
                alignItems: 'center',
              }}
              imageStyle={{
                marginTop: 35,
                height: 150,
                width: 150,
              }}
              item={item}
              onPress={() => console.log('Horizontal Foo Card')}
            />
          )}
        />
      </Section>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* Search */}
      <Search />

      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            {/* Recommended */}
            <SectionRecommended />
            <MenuType />
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <HorizontalFoodCard
            containerStyle={{
              height: 130,
              alignItems: 'center',
              marginHorizontal: SIZES.padding,
              marginBottom: SIZES.radius,
            }}
            imageStyle={{
              marginTop: 20,
              height: 110,
              width: 110,
            }}
            item={item}
            onPress={() => console.log('HorizontalFoodCard')}
          />
        )}
      />
    </View>
  );
};
