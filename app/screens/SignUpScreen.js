import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../config/colors';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {validateEmail} from '../helper/validation';
import {styles} from '../styles/LoginSignUpStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import useAuths from '../auth/useAuth';
import MyIndicator from '../components/MyIndicator';

export default function SignUpScreen() {
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const {user, setUser} = useAuths();

  const handleUploadUserData = async () => {
    try {
      setLoading(true);
      await auth().currentUser?.updateProfile({
        displayName: userName,
      });
      await firestore().collection('users').doc(auth().currentUser.uid).set({
        fullName: userName,
        email: email,
        imageUrl: '',
        phoneNumber: '',
        dateOfBirth: '',
      });
      setLoading(false);
      setUser(auth().currentUser);
    } catch (error) {
      setLoading(false);
      console.log('Error while uploading data of user to firestore: ', error);
    }
  };

  const handleSignUp = async () => {
    if (userName === '') {
      setUserNameError('User Name is required!');
    } else {
      if (userName.length < 2) {
        setUserNameError('Enter valid user name!');
      } else {
        setUserNameError('');
      }
    }

    if (password === '') {
      setPasswordError('Password is required!');
    } else {
      if (password.length < 6) {
        setPasswordError('Password is not less then 6 characters!');
      } else {
        setPasswordError('');
      }
    }

    if (email === '') {
      setEmailError('Email is required!');
    } else {
      if (!validateEmail(email)) {
        setEmailError('Email is invalid!');
      } else {
        setEmailError('');
      }
    }
    try {
      if (validateEmail(email) && password.length > 5 && userName.length > 1) {
        setLoading(true);
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(result => {
            setLoading(false);
            handleUploadUserData();
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setLoading(false);
              console.log('That email address is already in use!');
              setEmailError('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              setLoading(false);
              console.log('That email address is invalid!');
              setEmailError('That email address is invalid!');
            }
            if (error.code == 'auth/weak-password') {
              setLoading(false);
              console.log('Password is weak, create strong password!');
              setPasswordError('Password is weak, create strong password!');
            }
            if (error.code === 'auth/network-request-failed') {
              setLoading(false);
              console.log(
                'auth/network-request-failed. Please check your network connection!',
              );
              Alert.alert('Please check your network connection!');
            }
            setLoading(false);
            console.log('getting ERROR while Sign up with Eamil: ', error);
          });
      } else {
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.log('Error while SignUp: ', error);
    }
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingTop: Platform.OS === 'ios' ? insets.top : 6,
          },
        ]}>
        <View style={[styles.logoContainer, {flex: 0.2}]}>
          <Image
            source={require('../assets/app-logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={[styles.mainContainer, {flex: 0.8}]}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="always">
            <View style={{}}>
              <Text style={styles.heading}>Sign Up</Text>
              <Text style={styles.subHeading}>create an account</Text>
              <Text style={styles.labelStyle}>User Name</Text>
              <TextInputComponent
                value={userName}
                onChangeText={text => {
                  if (text.trim().length) {
                    setUserName(text);
                  } else {
                    setUserName('');
                  }
                }}
                placeholder="Enter user name"
                placeholderTextColor={colors.gray}
                inputStyle={{
                  marginBottom: userNameError !== '' ? 4 : 10,
                  borderWidth: userNameError !== '' ? 1 : 0,
                  borderColor: userNameError !== '' ? colors.red : null,
                }}
              />
              {userNameError !== '' && (
                <Text style={styles.errorText}>{userNameError}</Text>
              )}
              <Text style={styles.labelStyle}>Email</Text>
              <TextInputComponent
                value={email}
                onChangeText={text => {
                  if (text.trim().length) {
                    setEmail(text);
                    if (validateEmail(text)) {
                      setEmailError('');
                    }
                  } else {
                    setEmail('');
                  }
                }}
                maxLength={320}
                autoCapitalize="none"
                placeholder="Enter email address"
                placeholderTextColor={colors.gray}
                keyboardType="email-address"
                inputStyle={{
                  marginBottom: emailError !== '' ? 4 : 10,
                  borderWidth: emailError !== '' ? 1 : 0,
                  borderColor: emailError !== '' ? colors.red : null,
                }}
              />
              {emailError !== '' && (
                <Text style={styles.errorText}>{emailError}</Text>
              )}
              <Text style={[styles.labelStyle, {marginTop: 14}]}>Password</Text>
              <TextInputComponent
                value={password}
                onChangeText={text => {
                  if (text.trim().length) {
                    setPassword(text);
                    if (text.length > 5) {
                      setPasswordError('');
                    }
                  } else {
                    setPassword('');
                  }
                }}
                maxLength={320}
                placeholder="Password"
                placeholderTextColor={colors.gray}
                secureText={
                  secureTextEntry
                    ? require('../assets/hide.png')
                    : require('../assets/eye.png')
                }
                inputStyle={{
                  marginBottom: passwordError !== '' ? 4 : 10,
                  borderWidth: passwordError !== '' ? 1 : 0,
                  borderColor: passwordError !== '' ? colors.red : null,
                }}
                secureTextEntry={secureTextEntry}
                onPressSecure={() => setSecureTextEntry(!secureTextEntry)}
              />
              {passwordError !== '' && (
                <Text style={[styles.errorText, {marginBottom: 6}]}>
                  {passwordError}
                </Text>
              )}

              <ButtonComponent
                title="Sign Up"
                style={styles.btn}
                onPress={handleSignUp}
                loading={loading}
              />
            </View>
          </KeyboardAwareScrollView>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={styles.footer}>
              <Text style={[styles.footerTxt, {fontWeight: '400'}]}>
                Already have an account ?
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationStrings.LoginScreen)
                }>
                <Text
                  style={[
                    styles.footerTxt,
                    {
                      marginLeft: 6,
                    },
                  ]}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <MyIndicator visible={loading} />
    </>
  );
}
