import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import ChatWithAiScreen from '../screens/ChatWithAiScreen';
import colors from '../config/colors';
import DrawerView from './DrawerView';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from './navigationStrings';
import fontFamily from '../config/fontFamily';

const CustomBottomTabBar = props => {
  const [selectedScreen, setSelectedScreen] = useState(0);
  const navigation = useNavigation();

  return (
    <DrawerView>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {selectedScreen === 0 ? (
            <HomeScreen />
          ) : selectedScreen === 1 ? (
            <ChatWithAiScreen />
          ) : selectedScreen === 2 ? (
            <SettingScreen />
          ) : null}
        </View>
        <View style={styles.bottomTabContainer}>
          <TouchableOpacity
            onPress={() => setSelectedScreen(0)}
            style={styles.iconContainer}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/home.png')}
                style={[
                  styles.iconStyle,
                  {
                    tintColor:
                      selectedScreen === 0
                        ? colors.black
                        : colors.bottom_Tab_Gray,
                  },
                ]}
              />
              <Text
                style={[
                  styles.txt,
                  {
                    color:
                      selectedScreen === 0
                        ? colors.black
                        : colors.bottom_Tab_Gray,
                  },
                ]}>
                Home
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.ChatWithAiScreen)
            }
            style={{marginTop: -40}}>
            <Image
              source={require('../assets/bottom-tab-logo.png')}
              style={{width: 80, height: 80}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedScreen(2)}
            style={[styles.iconContainer, {alignItems: 'flex-end'}]}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/setting.png')}
                style={[
                  styles.iconStyle,
                  {
                    tintColor:
                      selectedScreen === 2
                        ? colors.black
                        : colors.bottom_Tab_Gray,
                  },
                ]}
              />
              <Text
                style={[
                  styles.txt,
                  {
                    color:
                      selectedScreen === 2
                        ? colors.black
                        : colors.bottom_Tab_Gray,
                  },
                ]}>
                Setting
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerView>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  bottomTabContainer: {
    height: Platform.OS === 'android' ? 60 : 70,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 44,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopWidth: 2,
    borderColor: colors.off_White,
    paddingTop: 6,
  },
  txt: {
    fontSize: 10,
    color: colors.black,
    marginTop: 4,
    fontFamily: fontFamily.semi_bold,
  },
});

export default CustomBottomTabBar;
