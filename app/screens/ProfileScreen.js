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
  TextInput,
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
import storage from '@react-native-firebase/storage';
import MyIndicator from '../components/MyIndicator';
import DatePicker from 'react-native-date-picker';
import navigationStrings from '../navigation/navigationStrings';

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
  const [isAnyChanges, setIsAnyChanges] = useState(false);

  const [openDateModal, setOpenDateModal] = useState(false);

  const toggleOpenDateModal = () => {
    setOpenDateModal(!openDateModal);
  };

  const handlePickImage = async () => {
    try {
      let res = await pickImage();
      if (!!res) {
        setSelectedImg(res?.uri);
        setIsAnyChanges(true);
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
          setFullName(data?.fullName);
          setPhone(data?.phoneNumber);
          setDateOfBirth(data?.dateOfBirth);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);

  const handleUploadImage = async () => {
    let imgID = Date.now();
    const imageName = `profileImages/${imgID}.jpg`;
    const reference = storage().ref(imageName);

    try {
      setLoading(true);
      const response = await fetch(selectedImg);
      const blobImage = await response.blob();
      const task = reference.put(blobImage);
      await task;
      const downloadURL = await reference.getDownloadURL();
      setLoading(false);
      return downloadURL;
    } catch (error) {
      if (error.code == 'storage/unknown') {
        setLoading(false);
        console.log('error while uploading profile picture: ', error);
        return null;
      }
      console.log('Error while uploading client image to firebase: ', error);
      setLoading(false);
      return null;
    }
  };

  const handleUpadteProfile = async () => {
    try {
      let phoneValid = false;
      let dataOfbithValid = false;

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
        let newImgUrl = userAllData?.imageUrl;
        if (selectedImg !== '') {
          newImgUrl = await handleUploadImage();
        }

        setLoading(true);
        await auth()?.currentUser?.updateProfile({
          displayName: fullName,
          photoURL: newImgUrl,
        });
        await firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .update({
            fullName: fullName,
            phoneNumber: phone,
            dateOfBirth: dateOfBirth,
            imageUrl: newImgUrl,
          })
          .then(() => {
            setLoading(false);
            console.log('profile is updated successfully!');
            navigation.goBack();
          })
          .catch(er => {
            setLoading(false);
            console.log(
              'error while uopdating data of user in firestore: ',
              er,
            );
          });
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
                    setIsAnyChanges(true);
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
              <TouchableOpacity
                style={styles.dateOfBirthPicker}
                activeOpacity={1}
                onPress={toggleOpenDateModal}>
                <TextInput
                  editable={false}
                  value={dateOfBirth}
                  placeholder="DD-MM-YYYY"
                  onPressIn={toggleOpenDateModal}
                  style={styles.inputDatePicker}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={openDateModal}
                date={new Date()}
                maximumDate={new Date()}
                minimumDate={new Date('1920-12-10')}
                onConfirm={date => {
                  let day = date.getDate();
                  let year = date.getFullYear();
                  let month = date.getMonth();

                  const myDate = new Date(year, month, day);
                  const result = myDate.toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  });
                  let finalDate = result.replace(new RegExp('/', 'g'), '-');

                  setDateOfBirth(finalDate);
                  setIsAnyChanges(true);

                  setOpenDateModal(false);
                }}
                onCancel={() => setOpenDateModal(false)}
              />

              <Text style={styles.label}>Email</Text>
              <TextInputComponent
                placeholder="Your email"
                value={userAllData?.email}
                maxLength={50}
                editable={false}
              />

              <Text style={styles.label}>Change Password</Text>
              <TextInputComponent
                placeholder="Enter your password"
                value={'********'}
                maxLength={20}
                editable={false}
                onPressIn={() =>
                  navigation.navigate(navigationStrings.ChangePasswordScreen)
                }
              />

              <Text style={styles.label}>Phone Number</Text>
              <TextInputComponent
                placeholder="Enter phone number"
                value={phone}
                onChangeText={text => {
                  if (text.trim().length) {
                    setPhone(text);
                    setIsAnyChanges(true);
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
                onPress={() => {
                  if (isAnyChanges) {
                    handleUpadteProfile();
                  } else {
                    navigation.goBack();
                  }
                }}
                loading={loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <MyIndicator visible={loading} />
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
  dateOfBirthPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.text_Input_Bg,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  inputDatePicker: {
    fontSize: 14,
    color: colors.black_light,
  },
});
