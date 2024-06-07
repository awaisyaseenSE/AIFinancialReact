import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../config/fontFamily';
import AiPlanListItemCompo from '../components/AiPlanListItemCompo';
import ButtonComponent from '../components/ButtonComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

const screenWidth = Dimensions.get('window').width;

export default function AiSubscriptionScreen() {
  const navigation = useNavigation();
  const insect = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 0,
      title: 'Weekly',
      price: '$0.99',
      original: '$1.99',
    },
    {
      id: 1,
      title: 'Yearly',
      price: '$17.99',
      original: '$21.99',
    },
    {
      id: 2,
      title: 'Monthly',
      price: '$2.49',
      original: '$3.99',
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.aiPlanContainer,
          {
            marginLeft: index === 0 ? 20 : 0,
            borderWidth: selectedPlan == item.id ? 1 : 0,
            borderColor: selectedPlan == item.id ? colors.black : null,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => setSelectedPlan(item?.id)}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                selectedPlan == item?.id ? colors.light_blue : colors.white,
            },
          ]}>
          <Image
            source={require('../assets/crown-icon.png')}
            style={styles.icon}
          />
          {selectedPlan == item.id && (
            <Text
              style={
                styles.originalPrice
              }>{`${item.original}/${item.title}`}</Text>
          )}
          <Text
            style={[
              styles.planPriceTxt,
              {
                color: selectedPlan == item?.id ? colors.white : colors.black,
              },
            ]}>{`${item.price}/${item.title}`}</Text>
        </View>
        <Text style={styles.aiPlanHeading}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={colors.black} barStyle={'light-content'} />
      <View
        style={[
          styles.container,
          {
            paddingTop: Platform.OS === 'ios' ? insect.top : 10,
          },
        ]}>
        <View style={{alignItems: 'flex-end', marginBottom: 0}}>
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/close.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/logo.png')} style={styles.img} />
        <Text style={styles.heading}>Ai Financial</Text>
        <View style={styles.mainContainer}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.txt}>A Subscription includes</Text>
              <View
                style={{
                  width: '86%',
                  alignSelf: 'center',
                  paddingHorizontal: 16,
                  marginTop: 8,
                }}>
                <AiPlanListItemCompo
                  title="Daily Coins offer"
                  desc="Get 10 coins for free with Subscription"
                />
                <AiPlanListItemCompo
                  title="Additional Coin Purchase"
                  desc="Get 10 additional Coins for life time with Subscription"
                />
                <AiPlanListItemCompo
                  title="Reminder"
                  desc="Reminder about the end of your trial"
                />
                <AiPlanListItemCompo
                  title="Account debiting"
                  desc="Cancel anything at least 24 hours before your subscription expires"
                />
              </View>
              <View style={{paddingHorizontal: 0}}>
                <FlatList
                  data={plans}
                  renderItem={renderItem}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
                {/* <Carousel
              data={plans}
              renderItem={renderItem}
              firstItem={1}
              sliderWidth={screenWidth - 10}
              itemWidth={screenWidth * 0.42}
              slideStyle={{alignItems: 'center'}}
              inactiveSlideOpacity={0.75}
              inactiveSlideScale={0.77}
            /> */}
                <ButtonComponent title="Subscribe" style={styles.btn} />
                <View style={{marginVertical: 15}} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  img: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    backgroundColor: colors.gray,
    borderRadius: 12,
    marginBottom: 12,
  },
  heading: {
    fontSize: 26,
    color: colors.white,
    fontFamily: fontFamily.semi_bold,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 40,
  },
  closeIcon: {
    width: 18,
    height: 18,
    tintColor: colors.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  txt: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  aiPlanContainer: {
    backgroundColor: colors.gray_light2,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    marginRight: 20,
    borderRadius: 8,
  },
  icon: {
    width: 28,
    height: 28,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  planPriceTxt: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
    marginTop: 14,
    marginBottom: 10,
  },
  aiPlanHeading: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
    alignSelf: 'center',
    marginTop: 20,
  },
  originalPrice: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 10,
    fontFamily: fontFamily.semi_bold,
    textDecorationLine: 'line-through',
  },
  btn: {
    marginTop: 30,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
});
