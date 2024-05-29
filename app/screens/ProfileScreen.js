import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import FastImage from 'react-native-fast-image';
import TopCompoWithHeading from '../components/TopCompoWithHeading';
import {pickImage} from '../helper/mediaPicker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInputComponent from '../components/TextInputComponent';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ButtonComponent from '../components/ButtonComponent';
import {validatePhoneNumber} from '../helper/validation';

export default function ProfileScreen() {
  const insect = useSafeAreaInsets();
  const [selectedImg, setSelectedImg] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userAllData, setUserAllData] = useState(null);
  const [phone, setPhone] = useState('');

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handlePickImage = async () => {
    try {
      let res = await pickImage();
      if (!!res) {
        setSelectedImg(res?.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(snap => {
        if (snap.exists) {
          var data = snap.data();
          setUserAllData(data);
          //   setUserImageUrl(data?.imageUrl);
          setFullName(data?.fullName);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);

  const handleUpadteProfile = async () => {
    try {
      let phoneValid = false;

      if (fullName == '') {
        setNameError('Please enter your name!');
        return;
      } else {
        setNameError('');
      }

      if (phone !== '') {
        if (validatePhoneNumber(phone)) {
          setPhoneError('');
          phoneValid = true;
        } else {
          setPhoneError('Enter valid phone number!');
          phoneValid = false;
        }
      } else {
        setPhoneError('');
        phoneValid = true;
      }

      if (fullName.length > 0 && phoneValid) {
        Alert.alert('ok');
      }
    } catch (error) {
      console.log('Error in updating profile: ', error);
    }
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.black} />

      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TopCompoWithHeading
            title="Profile"
            titleStyle={{color: colors.white}}
            backIconStyle={{tintColor: colors.white}}
            style={{
              marginTop: Platform.OS === 'ios' ? insect.top : 8,
              paddingVertical: 0,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={handlePickImage}>
          <FastImage
            source={
              selectedImg !== ''
                ? {uri: selectedImg}
                : userAllData?.imageUrl
                ? {uri: userAllData?.imageUrl}
                : require('../assets/avatar.png')
            }
            style={styles.profileImage}
          />
          <Image
            source={require('../assets/edit-pen.png')}
            style={styles.edit}
          />
        </TouchableOpacity>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            width: '100%',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={{paddingHorizontal: 20, marginTop: 12, flex: 1}}>
              <Text style={styles.label}>Full Name</Text>
              <TextInputComponent
                placeholder="Enter full name"
                value={fullName}
                onChangeText={text => {
                  if (text.trim().length) {
                    setFullName(text);
                    if (text.length > 0) {
                      setNameError('');
                    }
                  } else {
                    setFullName('');
                  }
                }}
                maxLength={100}
                inputStyle={{
                  marginBottom: nameError !== '' ? 4 : 10,
                  borderWidth: nameError !== '' ? 1 : 0,
                  borderColor: nameError !== '' ? colors.red : null,
                }}
              />
              {nameError !== '' && (
                <Text style={styles.errorTxt}>{nameError}</Text>
              )}
              <Text style={styles.label}>Date of Birth</Text>
              <TextInputComponent
                placeholder="DD-MM-YYYY"
                value={dateOfBirth}
                onChangeText={text => {
                  if (text.trim().length) {
                    setDateOfBirth(text);
                  } else {
                    setDateOfBirth('');
                  }
                }}
                maxLength={10}
              />

              <Text style={styles.label}>Email</Text>
              <TextInputComponent
                placeholder="Your email"
                value={userAllData?.email}
                maxLength={50}
                editable={false}
              />

              <Text style={styles.label}>Phone Number</Text>
              <TextInputComponent
                placeholder="Enter phone number"
                value={phone}
                onChangeText={text => {
                  if (text.trim().length) {
                    setPhone(text);
                  } else {
                    setPhone('');
                  }
                }}
                keyboardType="phone-pad"
                maxLength={15}
                inputStyle={{
                  marginBottom: phoneError !== '' ? 4 : 10,
                  borderWidth: phoneError !== '' ? 1 : 0,
                  borderColor: phoneError !== '' ? colors.red : null,
                }}
              />
              {phoneError !== '' && (
                <Text style={styles.errorTxt}>{phoneError}</Text>
              )}
              <ButtonComponent
                title="Save"
                style={styles.btn}
                onPress={handleUpadteProfile}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topContainer: {
    height: 150,
    backgroundColor: colors.primary,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.white,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginTop: -50,
    backgroundColor: colors.white,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    borderRadius: 200,

    elevation: 11,
  },
  edit: {
    width: 24,
    height: 24,
    position: 'absolute',
    bottom: 4,
    right: 0,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.medium,
    marginVertical: 12,
    paddingLeft: 4,
  },
  input: {
    height: 110,
    alignItems: 'flex-start',
  },
  textInput: {
    alignItems: 'flex-start',
    paddingTop: 14,
  },
  btn: {
    marginBottom: 12,
    marginTop: 30,
  },
  errorTxt: {
    fontSize: 12,
    color: colors.red,
    fontFamily: fontFamily.medium,
    marginBottom: 10,
    paddingLeft: 4,
  },
});
