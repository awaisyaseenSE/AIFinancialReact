import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../config/fontFamily';
import AiPlanListItemCompo from '../components/AiPlanListItemCompo';
import ButtonComponent from '../components/ButtonComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function AiSubscriptionScreen() {
  const navigation = useNavigation();
  const insect = useSafeAreaInsets();
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
});
