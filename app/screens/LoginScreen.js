import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import colors from '../config/colors';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {validateEmail} from '../helper/validation';
import {styles} from '../styles/LoginSignUpStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import useAuths from '../auth/useAuth';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';
import MyIndicator from '../components/MyIndicator';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  const {user, setUser} = useAuths();

  const handleLogin = async () => {
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
      if (validateEmail(email) && password.length > 5) {
        setLoading(true);
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(result => {
            setEmail('');
            setPassword('');
            setLoading(false);
            // console.log('user details: ', auth().currentUser);
            setUser(auth().currentUser);
          })
          .catch(error => {
            setLoading(false);

            if (error.code === 'auth/user-not-found') {
              setEmailError('Invalid Email please check your email');
            } else if (error.code === 'auth/invalid-email') {
              setEmailError('Email is invalid!');
            } else if (error.code === 'auth/wrong-password') {
              setPasswordError('Password is invalid!');
            } else if (error.code === 'auth/internal-error') {
              Alert.alert('Please enter valid email and password!');
            } else if (error.code === 'auth/invalid-credential') {
              Alert.alert('Please enter valid email and password!');
            } else if (error.code === 'auth/invalid-login') {
              Alert.alert('Please enter valid email and password!');
            } else if (error.code === 'auth/network-request-failed') {
              Alert.alert('Please check your network connection!');
            } else {
              console.log('Error while login: ', error);
            }
          });
      }
    } catch (error) {
      console.log('Error while Login: ', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/app-logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}>
            <View style={{}}>
              <Text style={styles.heading}>Welcome Back!</Text>
              <Text style={styles.subHeading}>Please Sign in to continue</Text>
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
              <TouchableOpacity
                style={styles.forgotTxtContainer}
                onPress={() =>
                  navigation.navigate(navigationStrings.ForgotPasswordScreen)
                }>
                <Text style={styles.forgotTxt}>Forgot password?</Text>
              </TouchableOpacity>
              <ButtonComponent
                title="Login"
                style={{...styles.btn, ...{marginTop: 40}}}
                onPress={handleLogin}
                loading={loading}
              />
            </View>
          </KeyboardAwareScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View style={[styles.footer]}>
              <Text style={[styles.footerTxt, {fontWeight: '400'}]}>
                Don't have an account ?
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationStrings.SignUpScreen)
                }>
                <Text
                  style={[
                    styles.footerTxt,
                    {
                      marginLeft: 6,
                    },
                  ]}>
                  Sign Up
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
