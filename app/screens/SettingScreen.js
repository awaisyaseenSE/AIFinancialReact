import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import fontFamily from '../config/fontFamily';
import colors from '../config/colors';
import SettingListCompo from '../components/SettingListCompo';
import ButtonComponent from '../components/ButtonComponent';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

export default function SettingScreen() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUserEmail = auth()?.currentUser?.email;
  const oldPassword = '123456';
  const updatePassword = 'ansans';
  const newEmail = 'awais1@gmail.com';

  const reauthenticate = currentPassword => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const changePassword = (currentPassword, newPassword) => {
    try {
      setLoading(true);
      reauthenticate(currentPassword)
        .then(() => {
          var user = auth().currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              console.log('Password updated!');
              setLoading(false);
            })
            .catch(error => {
              console.log('Error is: ', error);
              setLoading(false);
            });
        })
        .catch(error => {
          if (error.code == 'auth/invalid-credential') {
            Alert.alert('Old Password is incorrect!');
          }
          console.log('Er: ', error);
          setLoading(false);
        });
    } catch (error) {
      console.log('Error in updating password: ', error);
      setLoading(false);
    }
  };

  const changeEmail = (currentPassword, newEmail) => {
    try {
      setLoading(true);
      reauthenticate(currentPassword)
        .then(() => {
          var user = auth().currentUser;
          user
            .updateEmail(newEmail)
            .then(() => {
              console.log('Email updated!');
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
            });
        })
        .catch(error => {
          if (error.code == 'auth/invalid-credential') {
            Alert.alert('Old Password is incorrect!');
          }
          console.log('Re-authenticate error: ', error);
          setLoading(false);
        });
    } catch (error) {
      console.log('Error while changing email: ', error);
      setLoading(false);
    }
  };

  const handleGet = async () => {
    try {
      setLoading(true);
      let url = 'https://jsonplaceholder.typicode.com/posts/2';
      let res = await fetch('https://api.escuelajs.co/api/v1/products');
      let finalRes = await res.json();
      setData(finalRes);
      console.log(finalRes.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, paddingHorizontal: 8}}>
          <Text style={styles.heading}>{item?.title}</Text>
          <Text
            style={[
              styles.heading,
              {
                fontSize: 18,
                color: 'green',
              },
            ]}>
            {'\u20B9'}
            {' ' + item?.price}
          </Text>
        </View>
        <FastImage
          source={{uri: item?.images[0]}}
          style={{width: 180, height: 180, borderRadius: 8}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScreenComponent>
        <View style={styles.container}>
          <Text style={styles.heading}>Setting</Text>
          {/* <SettingListCompo
            title="Support"
            icon={require('../assets/mic.png')}
          />
          <SettingListCompo
            title="Privacy and policy"
            icon={require('../assets/privacy.png')}
          />
          <SettingListCompo
            title="Notification"
            icon={require('../assets/notification.png')}
            isSwitch={true}
            switchEnable={isEnabled}
            toggleSwitch={toggleSwitch}
          />
          <SettingListCompo
            title="Upgrade Password"
            icon={require('../assets/lock.png')}
          />
          <SettingListCompo
            title="Language"
            icon={require('../assets/lang.png')}
          /> */}
          {data.length < 1 && (
            <ButtonComponent
              title="Get Data"
              onPress={handleGet}
              loading={loading}
            />
          )}
          <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          {/* <ButtonComponent
            title="Get Data"
            // onPress={() => changePassword(oldPassword, updatePassword)}
            onPress={() => changeEmail(oldPassword, newEmail)}
            loading={loading}
          /> */}
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
  heading: {
    fontSize: 18,
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
});
