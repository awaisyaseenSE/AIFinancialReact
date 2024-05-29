import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../config/colors';
import TopCompoWithHeading from '../components/TopCompoWithHeading';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {pickImage} from '../helper/mediaPicker';
import fontFamily from '../config/fontFamily';
import TextInputComponent from '../components/TextInputComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonComponent from '../components/ButtonComponent';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

export default function CreateClientScreen() {
  const insect = useSafeAreaInsets();
  const [selectedImg, setSelectedImg] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [financialInfo, setFinancialInfo] = useState('');
  const [personalInfo, setPersonalInfo] = useState('');
  const [investmentInfo, setInvestmentInfo] = useState('');
  const [taxInfo, setTaxInfo] = useState('');
  const [estateInfo, setEstateInfo] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

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

  const handleUploadImage = async () => {
    let imgID = Date.now();
    const imageName = `clientProfileImages/${imgID}.jpg`;
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

  const handleSubmit = async () => {
    try {
      let dataOfbithValid = false;

      if (fullName === '') {
        setFullNameError('Client name is required!');
      } else {
        setFullNameError('');
      }

      if (dateOfBirth !== '') {
        if (moment(dateOfBirth, 'DD-MM-YYYY', true).isValid()) {
          let currentDate = new Date();
          let currentYear = currentDate.getFullYear();
          let yy = dateOfBirth?.split('-')[2];
          if (yy <= currentYear) {
            setDateOfBirthError('');
            dataOfbithValid = true;
          } else {
            dataOfbithValid = false;
            setDateOfBirthError('Enter valid date of birth!');
          }
        } else {
          dataOfbithValid = false;
          setDateOfBirthError('Enter valid date of birth!');
        }
      } else {
        setDateOfBirthError('');
        dataOfbithValid = true;
      }

      if (fullName !== '' && dataOfbithValid) {
        let clientImageUrl = '';
        if (selectedImg !== '') {
          clientImageUrl = await handleUploadImage();
        }
        setLoading(true);
        console.log('client uploading image: ', clientImageUrl);
        firestore()
          .collection('clientProfiles')
          .add({
            fullName,
            dateOfBirth,
            financialInfo,
            personalInfo,
            investmentInfo,
            taxInfo,
            estateInfo,
            insuranceInfo,
            imageURL: clientImageUrl,
            time: new Date(),
            userUid: auth().currentUser.uid,
          })
          .then(docRef => {
            Alert.alert('Client data is uploaded successfully!');
            setLoading(false);
          })
          .catch(er => {
            console.log(
              'getting error while uploading client data to firestore: ',
              er,
            );
            setLoading(false);
          });
      }
    } catch (error) {
      setLoading(false);
      console.log(
        'Error while uplaoding data for create client profile: ',
        error,
      );
    }
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.black} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TopCompoWithHeading
            title="Create Client"
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
                : require('../assets/avatar.png')
            }
            style={styles.profileImage}
          />
          <Image
            source={require('../assets/edit-pen.png')}
            style={styles.edit}
          />
        </TouchableOpacity>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}>
          <View style={{paddingHorizontal: 20, marginTop: 12}}>
            <Text style={styles.label}>Full Name</Text>
            <TextInputComponent
              placeholder="Enter full name"
              value={fullName}
              onChangeText={text => {
                if (text.trim().length) {
                  setFullName(text);
                } else {
                  setFullName('');
                }
              }}
              maxLength={100}
              inputStyle={{
                marginBottom: fullNameError !== '' ? 4 : 10,
                borderWidth: fullNameError !== '' ? 1 : 0,
                borderColor: fullNameError !== '' ? colors.red : null,
              }}
            />
            {fullNameError !== '' && (
              <Text style={styles.errorTxt}>{fullNameError}</Text>
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
              inputStyle={{
                marginBottom: dateOfBirthError !== '' ? 4 : 10,
                borderWidth: dateOfBirthError !== '' ? 1 : 0,
                borderColor: dateOfBirthError !== '' ? colors.red : null,
              }}
            />
            {dateOfBirthError !== '' && (
              <Text style={styles.errorTxt}>{dateOfBirthError}</Text>
            )}
            <Text style={styles.label}>Financial Information</Text>
            <View>
              <TextInputComponent
                placeholder="Enter Financial Information"
                value={financialInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setFinancialInfo(text);
                  } else {
                    setFinancialInfo('');
                  }
                }}
                maxLength={100}
                inputStyle={styles.input}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {financialInfo.length}/100
              </Text>
            </View>
            <Text style={styles.label}>Personal Information</Text>
            <View>
              <TextInputComponent
                placeholder="Enter Personal Information"
                value={personalInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setPersonalInfo(text);
                  } else {
                    setPersonalInfo('');
                  }
                }}
                maxLength={100}
                inputStyle={styles.input}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {personalInfo.length}/100
              </Text>
            </View>
            <Text style={styles.label}>Investment Information</Text>
            <View>
              <TextInputComponent
                placeholder="Enter Investment Information"
                value={investmentInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setInvestmentInfo(text);
                  } else {
                    setInvestmentInfo('');
                  }
                }}
                maxLength={100}
                inputStyle={styles.input}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {investmentInfo.length}/100
              </Text>
            </View>
            <Text style={styles.label}>Tax Information</Text>
            <View>
              <TextInputComponent
                placeholder="Enter Tax Information"
                value={taxInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setTaxInfo(text);
                  } else {
                    setTaxInfo('');
                  }
                }}
                maxLength={100}
                inputStyle={styles.input}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {taxInfo.length}/100
              </Text>
            </View>
            <Text style={styles.label}>Estate Information</Text>
            <View>
              <TextInputComponent
                placeholder="Enter Estate Information"
                value={estateInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setEstateInfo(text);
                  } else {
                    setEstateInfo('');
                  }
                }}
                maxLength={100}
                inputStyle={styles.input}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {estateInfo.length}/100
              </Text>
            </View>
            <Text style={styles.label}>Insurance Information</Text>
            <View>
              <TextInputComponent
                placeholder="Enter Insurance Information"
                value={insuranceInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setInsuranceInfo(text);
                  } else {
                    setInsuranceInfo('');
                  }
                }}
                maxLength={100}
                inputStyle={styles.input}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {insuranceInfo.length}/100
              </Text>
            </View>
            <ButtonComponent
              title="Submit"
              style={styles.btn}
              onPress={handleSubmit}
              textStyle={styles.btnTxt}
              loading={loading}
            />
          </View>
        </KeyboardAwareScrollView>
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
  textInputLengthTxt: {
    position: 'absolute',
    bottom: 20,
    right: 14,
    color: colors.black_light,
    fontFamily: fontFamily.regular,
  },
  btn: {
    marginVertical: 30,
  },
  btnTxt: {
    fontSize: 16,
  },
  errorTxt: {
    fontSize: 12,
    color: colors.red,
    fontFamily: fontFamily.medium,
    marginBottom: 10,
    paddingLeft: 4,
  },
});
