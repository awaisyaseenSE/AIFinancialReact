import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import DrawerItemListCompo from './DrawerItemListCompo';
import navigationStrings from '../navigation/navigationStrings';
import colors from '../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getResponsiveHeight, getResponsiveWidth} from '../helper/getResponsive';

function CustomDrawer({navigation}) {
  const insect = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          styles.topContainer,
          {
            height:
              Platform.OS === 'ios'
                ? getResponsiveHeight(20)
                : getResponsiveHeight(16),
          },
        ]}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
            }}
            style={styles.profileImage}
          />
          <View style={{marginLeft: 12}}>
            <Text style={styles.userNameText}>David Brown</Text>
            <Text style={styles.emailTxt}>davidbrown33@gmail.com</Text>
          </View>
        </View>
      </View>
      <DrawerContentScrollView
        style={{
          backgroundColor: colors.white,
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'red',
            marginTop: Platform.OS === 'ios' ? -insect.top : 0,
          }}></View>
        <View style={{flex: 1, marginTop: 18}}>
          <DrawerItemListCompo
            image={require('../assets/setting.png')}
            title="Setting"
            onPress={() => {
              navigation.navigate(navigationStrings.SettingScreen);
              navigation.closeDrawer();
            }}
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.drawerFooter}>
        <View style={styles.line} />
        <DrawerItemListCompo
          image={require('../assets/exit.png')}
          title="SignOut"
          style={{
            marginBottom: Platform.OS === 'ios' ? 12 : 4,
            paddingHorizontal: 0,
          }}
          txtStyle={{color: colors.black}}
          iconStyle={{tintColor: colors.black}}
          onPress={{}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userNameText: {
    fontSize: 14,
    color: colors.white,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.white,
  },
  drawerFooter: {
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  topContainer: {
    height: getResponsiveHeight(20),
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
    paddingHorizontal: 14,
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 34,
  },
  emailTxt: {
    fontSize: 12,
    color: colors.white,
  },
  line: {
    width: '50%',
    height: 2,
    backgroundColor: colors.black,
    marginBottom: 20,
  },
});

export default CustomDrawer;
