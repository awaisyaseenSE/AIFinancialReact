import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View, Text, Platform, StyleSheet, Image, Alert} from 'react-native';
import DrawerItemListCompo from '../../../navigation/DrawerItemListCompo';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getResponsiveHeight} from '../../../helper/getResponsive';
import {useNavigation} from '@react-navigation/native';

function TodoCustomDrawer({navigation}) {
  const insect = useSafeAreaInsets();
  return (
    <>
      <DrawerContentScrollView
        style={{
          backgroundColor: colors.primary,
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginTop: 18}}>
          <DrawerItemListCompo
            image={require('../../../assets/home.png')}
            title="Home"
            iconStyle={{tintColor: colors.white}}
            txtStyle={{color: colors.white}}
            onPress={() => {
              navigation.navigate('TodoHomeScreen');
            }}
          />
          <DrawerItemListCompo
            image={require('../../../assets/home.png')}
            title="Forgot Password"
            iconStyle={{tintColor: colors.white}}
            txtStyle={{color: colors.white}}
            onPress={() => {
              navigation.navigate(navigationStrings.ForgotPasswordScreen);
            }}
          />
        </View>
      </DrawerContentScrollView>
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
    width: '80%',
    height: 2,
    backgroundColor: colors.black,
    marginBottom: 20,
  },
});

export default TodoCustomDrawer;
