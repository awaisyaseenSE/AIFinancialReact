import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View, Text, Platform, StyleSheet, Image, Alert} from 'react-native';
import DrawerItemListCompo from './DrawerItemListCompo';
import navigationStrings from '../navigation/navigationStrings';
import colors from '../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getResponsiveHeight} from '../helper/getResponsive';
import useAuth from '../auth/useAuth';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

function CustomDrawer({navigation}) {
  const insect = useSafeAreaInsets();
  const {logout} = useAuth();
  // const navigation = useNavigation();
  const userPhotoUrl = auth()?.currentUser?.photoURL;

  const handleLogout = () => {
    try {
      Alert.alert('Signout', 'Are you sure to SignOut!', [
        {
          text: 'Yes',
          onPress: logout,
        },
        {
          text: 'No',
        },
      ]);
    } catch (error) {
      console.log(
        '============ERROR WHILE LOG OUT in Custom Drawer========================',
      );
      console.log(error);
      console.log('====================================');
    }
  };

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
            source={
              !userPhotoUrl
                ? require('../assets/avatar.png')
                : {uri: userPhotoUrl}
            }
            style={styles.profileImage}
          />
          <View style={{marginLeft: 12}}>
            <Text style={styles.userNameText}>
              {auth()?.currentUser?.displayName}
            </Text>
            <Text style={styles.emailTxt}>{auth()?.currentUser?.email}</Text>
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
            image={require('../assets/users.png')}
            title="Clients"
            onPress={() => {
              // navigation.navigate(navigationStrings.SettingScreen);
              // navigation.closeDrawer();
            }}
          />
          <DrawerItemListCompo
            image={require('../assets/user-icon.png')}
            title="Profile"
            onPress={() => {
              navigation.navigate(navigationStrings.ProfileScreen);
              navigation.closeDrawer();
            }}
          />
          <DrawerItemListCompo
            image={require('../assets/setting.png')}
            title="Setting"
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate(navigationStrings.SettingScreen);
              // navigation.closeDrawer();
            }}
          />
          {/* <DrawerItemListCompo
            image={require('../assets/circle-4.png')}
            title="New Task"
            onPress={() => {
              navigation.navigate(navigationStrings.NewTaskScreen);
            }}
          /> */}
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
          onPress={handleLogout}
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
    width: '80%',
    height: 2,
    backgroundColor: colors.black,
    marginBottom: 20,
  },
});

export default CustomDrawer;
