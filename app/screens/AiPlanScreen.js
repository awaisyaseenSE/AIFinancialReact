import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../config/fontFamily';
import AiPlanListItemCompo from '../components/AiPlanListItemCompo';
import ButtonComponent from '../components/ButtonComponent';
import navigationStrings from '../navigation/navigationStrings';

export default function AiPlanScreen() {
  const navigation = useNavigation();
  return (
    <>
      <ScreenComponent>
        <View style={{alignItems: 'flex-end', marginBottom: 20}}>
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
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image source={require('../assets/logo.png')} style={styles.img} />
          </View>
          <Text style={styles.heading}>Ai Financial</Text>
          <View style={{flex: 1, justifyContent: 'space-around'}}>
            <View>
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
            <ButtonComponent
              title="View All Plans"
              textStyle={styles.txt}
              onPress={() =>
                navigation.navigate(navigationStrings.AiSubscriptionScreen)
              }
            />
          </View>
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  closeIcon: {
    width: 18,
    height: 18,
    tintColor: colors.gray,
  },
  imgContainer: {
    alignSelf: 'center',
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
    borderWidth: 1,
    borderColor: colors.off_White,
    backgroundColor: colors.white,
    marginBottom: 14,
    marginTop: 12,
  },
  img: {
    width: 120,
    height: 120,
    alignSelf: 'center',

    backgroundColor: colors.white,
    borderRadius: 12,
  },
  heading: {
    fontSize: 26,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 6,
  },
  txt: {
    fontSize: 16,
  },
});
