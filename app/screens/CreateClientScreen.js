import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
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
import MyIndicator from '../components/MyIndicator';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

export default function CreateClientScreen() {
  const insect = useSafeAreaInsets();
  const navigation = useNavigation();
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

  const [selectedImgError, setSelectedImgError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  const [financialInfoError, setFinancialInfoError] = useState('');
  const [personalInfoError, setPersonalInfoError] = useState('');
  const [investmentInfoError, setInvestmentInfoError] = useState('');

  const [taxInfoError, setTaxInfoError] = useState('');
  const [estateInfoError, setEstateInfoError] = useState('');
  const [insuranceInfoError, setInsuranceInfoError] = useState('');

  const [openDateModal, setOpenDateModal] = useState(false);

  const toggleOpenDateModal = () => {
    setOpenDateModal(!openDateModal);
  };

  const fullNameRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const financialInfoRef = useRef(null);
  const personalInfoRef = useRef(null);
  const investmentInfoRef = useRef(null);
  const taxInfoRef = useRef(null);
  const estateInfoRef = useRef(null);
  const insuranceInfoRef = useRef(null);

  const scrollRef = useRef(null);

  const handleClearState = () => {
    setSelectedImg('');
    setFullName('');
    setDateOfBirth('');
    setFinancialInfo('');
    setPersonalInfo('');
    setInvestmentInfo('');
    setTaxInfo('');
    setEstateInfo('');
    setInsuranceInfo('');
    setLoading(false);
    navigation.goBack();
  };

  const handlePickImage = async () => {
    try {
      let res = await pickImage();
      if (!!res) {
        setSelectedImg(res?.uri);
        setSelectedImgError('');
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

      if (selectedImg === '') {
        setSelectedImgError('Image is required!');
      } else {
        setSelectedImgError('');
      }

      if (insuranceInfo === '') {
        setInsuranceInfoError('Insurance information is required!');
        insuranceInfoRef?.current?.focus();
      } else {
        if (insuranceInfo.length < 50) {
          setInsuranceInfoError(
            'Insurance information required minimum 50 characters!',
          );
          insuranceInfoRef?.current?.focus();
        } else {
          setInsuranceInfoError('');
        }
      }
      if (estateInfo === '') {
        setEstateInfoError('Estate information is required!');
        estateInfoRef?.current?.focus();
      } else {
        if (estateInfo.length < 50) {
          setEstateInfoError(
            'Estate information required minimum 50 characters!',
          );
          estateInfoRef?.current?.focus();
        } else {
          setEstateInfoError('');
        }
      }

      if (taxInfo === '') {
        setTaxInfoError('Tax information is required!');
        taxInfoRef?.current?.focus();
      } else {
        if (taxInfo.length < 50) {
          setTaxInfoError('Tax information required minimum 50 characters!');
          taxInfoRef?.current?.focus();
        } else {
          setTaxInfoError('');
        }
      }

      if (investmentInfo === '') {
        setInvestmentInfoError('Investment information is required!');
        investmentInfoRef?.current?.focus();
      } else {
        if (investmentInfo.length < 50) {
          setInvestmentInfoError(
            'Investment information required minimum 50 characters!',
          );
          investmentInfoRef?.current?.focus();
        } else {
          setInvestmentInfoError('');
        }
      }

      if (personalInfo === '') {
        setPersonalInfoError('Personal information is required!');
        personalInfoRef?.current?.focus();
      } else {
        if (personalInfo.length < 50) {
          setPersonalInfoError(
            'Personal information required minimum 50 characters!',
          );
          personalInfoRef?.current?.focus();
        } else {
          setPersonalInfoError('');
        }
      }

      if (financialInfo === '') {
        setFinancialInfoError('Financial information is required!');
        financialInfoRef?.current?.focus();
      } else {
        if (financialInfo.length < 50) {
          setFinancialInfoError(
            'Financial information required minimum 50 characters!',
          );
          financialInfoRef?.current?.focus();
        } else {
          setFinancialInfoError('');
        }
      }

      if (dateOfBirth !== '') {
        setDateOfBirthError('');
        dataOfbithValid = true;
      } else {
        setDateOfBirthError('Date of birth is required!');
        dataOfbithValid = false;
      }

      if (fullName === '') {
        setFullNameError('Client name is required!');
        fullNameRef?.current?.focus();
      } else {
        setFullNameError('');
      }

      if (
        selectedImg !== '' &&
        fullName !== '' &&
        dataOfbithValid &&
        financialInfo.length > 49 &&
        personalInfo.length > 49 &&
        investmentInfo.length > 49 &&
        taxInfo.length > 49 &&
        estateInfo.length > 49 &&
        insuranceInfo.length > 49
      ) {
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
            handleClearState();
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
            style={[
              styles.profileImage,
              {
                borderColor:
                  selectedImgError !== '' ? colors.red : colors.white,
              },
            ]}
          />
          <Image
            source={require('../assets/edit-pen.png')}
            style={styles.edit}
          />
        </TouchableOpacity>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="always">
          {/* <KeyboardAvoidingView
          style={{
            flex: 1,
            width: '100%',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
          <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            ref={scrollRef}> */}
          <View style={{paddingHorizontal: 20, marginTop: 12}}>
            <Text style={styles.label}>Full Name</Text>
            <TextInputComponent
              // innerRef={fullNameRef}
              placeholder="Enter full name"
              value={fullName}
              onChangeText={text => {
                if (text.trim().length) {
                  setFullName(text);
                  if (text.length > 0) {
                    setFullNameError('');
                  }
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
            <TouchableOpacity
              style={[
                styles.dateOfBirthPicker,
                {
                  borderWidth: dateOfBirthError !== '' ? 1 : 0,
                  borderColor: dateOfBirthError !== '' ? colors.red : null,
                },
              ]}
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
                setDateOfBirthError('');
                setOpenDateModal(false);
              }}
              onCancel={() => setOpenDateModal(false)}
            />

            {dateOfBirthError !== '' && (
              <Text style={styles.errorTxt}>{dateOfBirthError}</Text>
            )}
            <Text style={styles.label}>Financial Information</Text>
            <View
              style={{
                marginBottom: financialInfoError !== '' ? 4 : 10,
              }}>
              <TextInputComponent
                // innerRef={financialInfoRef}
                placeholder="Enter Financial Information"
                value={financialInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setFinancialInfo(text);
                    if (text.length > 49) {
                      setFinancialInfoError('');
                    }
                  } else {
                    setFinancialInfo('');
                  }
                }}
                maxLength={500}
                inputStyle={{
                  ...styles.input,
                  ...{
                    borderWidth: financialInfoError !== '' ? 1 : 0,
                    borderColor: financialInfoError !== '' ? colors.red : null,
                  },
                }}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={[styles.textInputLengthTxt]}>
                {financialInfo.length}/500
              </Text>
            </View>
            {financialInfoError !== '' && (
              <Text style={styles.errorTxt}>{financialInfoError}</Text>
            )}

            <Text style={styles.label}>Personal Information</Text>
            <View
              style={{
                marginBottom: personalInfoError !== '' ? 4 : 10,
              }}>
              <TextInputComponent
                // innerRef={personalInfoRef}
                placeholder="Enter Personal Information"
                value={personalInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setPersonalInfo(text);
                    if (text.length > 49) {
                      setPersonalInfoError('');
                    }
                  } else {
                    setPersonalInfo('');
                  }
                }}
                maxLength={500}
                inputStyle={{
                  ...styles.input,
                  ...{
                    borderWidth: personalInfoError !== '' ? 1 : 0,
                    borderColor: personalInfoError !== '' ? colors.red : null,
                  },
                }}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {personalInfo.length}/500
              </Text>
            </View>
            {personalInfoError !== '' && (
              <Text style={styles.errorTxt}>{personalInfoError}</Text>
            )}

            <Text style={styles.label}>Investment Information</Text>
            <View
              style={{
                marginBottom: investmentInfoError !== '' ? 4 : 10,
              }}>
              <TextInputComponent
                // innerRef={investmentInfoRef}
                placeholder="Enter Investment Information"
                value={investmentInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setInvestmentInfo(text);
                    if (text.length > 49) {
                      setInvestmentInfoError('');
                    }
                  } else {
                    setInvestmentInfo('');
                  }
                }}
                maxLength={500}
                inputStyle={{
                  ...styles.input,
                  ...{
                    borderWidth: investmentInfoError !== '' ? 1 : 0,
                    borderColor: investmentInfoError !== '' ? colors.red : null,
                  },
                }}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {investmentInfo.length}/500
              </Text>
            </View>
            {investmentInfoError !== '' && (
              <Text style={styles.errorTxt}>{investmentInfoError}</Text>
            )}

            <Text style={styles.label}>Tax Information</Text>
            <View
              style={{
                marginBottom: taxInfoError !== '' ? 4 : 10,
              }}>
              <TextInputComponent
                // innerRef={taxInfoRef}
                placeholder="Enter Tax Information"
                value={taxInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setTaxInfo(text);
                    if (text.length > 49) {
                      setTaxInfoError('');
                    }
                  } else {
                    setTaxInfo('');
                  }
                }}
                maxLength={500}
                inputStyle={{
                  ...styles.input,
                  ...{
                    borderWidth: taxInfoError !== '' ? 1 : 0,
                    borderColor: taxInfoError !== '' ? colors.red : null,
                  },
                }}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {taxInfo.length}/500
              </Text>
            </View>
            {taxInfoError !== '' && (
              <Text style={styles.errorTxt}>{taxInfoError}</Text>
            )}
            <Text style={styles.label}>Estate Information</Text>
            <View
              style={{
                marginBottom: estateInfoError !== '' ? 4 : 10,
              }}>
              <TextInputComponent
                // innerRef={estateInfoRef}
                placeholder="Enter Estate Information"
                value={estateInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setEstateInfo(text);
                    if (text.length > 49) {
                      setEstateInfoError('');
                    }
                  } else {
                    setEstateInfo('');
                  }
                }}
                maxLength={500}
                inputStyle={{
                  ...styles.input,
                  ...{
                    borderWidth: estateInfoError !== '' ? 1 : 0,
                    borderColor: estateInfoError !== '' ? colors.red : null,
                  },
                }}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {estateInfo.length}/500
              </Text>
            </View>
            {estateInfoError !== '' && (
              <Text style={styles.errorTxt}>{estateInfoError}</Text>
            )}
            <Text style={styles.label}>Insurance Information</Text>
            <View
              style={{
                marginBottom: insuranceInfoError !== '' ? 4 : 10,
              }}>
              <TextInputComponent
                // innerRef={insuranceInfoRef}
                placeholder="Enter Insurance Information"
                value={insuranceInfo}
                onChangeText={text => {
                  if (text.trim().length) {
                    setInsuranceInfo(text);
                    if (text.length > 49) {
                      setInsuranceInfoError('');
                    }
                  } else {
                    setInsuranceInfo('');
                  }
                }}
                maxLength={500}
                inputStyle={{
                  ...styles.input,
                  ...{
                    borderWidth: insuranceInfoError !== '' ? 1 : 0,
                    borderColor: insuranceInfoError !== '' ? colors.red : null,
                  },
                }}
                textStyle={styles.textInput}
                multiline
              />
              <Text style={styles.textInputLengthTxt}>
                {insuranceInfo.length}/500
              </Text>
            </View>
            {insuranceInfoError !== '' && (
              <Text style={styles.errorTxt}>{insuranceInfoError}</Text>
            )}
            <ButtonComponent
              title="Submit"
              style={styles.btn}
              onPress={handleSubmit}
              textStyle={styles.btnTxt}
              loading={loading}
            />
          </View>
          {/* </ScrollView>
        </KeyboardAvoidingView> */}
        </KeyboardAwareScrollView>
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
    marginBottom: 0,
  },
  textInput: {
    alignItems: 'flex-start',
    paddingTop: 14,

    height: '82%',
    textAlignVertical: 'top',
  },
  textInputLengthTxt: {
    position: 'absolute',
    bottom: 6,
    right: 12,
    color: colors.black_light,
    fontFamily: fontFamily.regular,
    fontSize: 12,
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
