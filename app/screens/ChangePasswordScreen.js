import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import auth from '@react-native-firebase/auth';
import ButtonComponent from '../components/ButtonComponent';
import ScreenComponent from '../components/ScreenComponent';
import TopCompoWithHeading from '../components/TopCompoWithHeading';
import TextInputComponent from '../components/TextInputComponent';
import MyIndicator from '../components/MyIndicator';
import ChangePasswordSuccessModal from '../components/ChangePasswordSuccessModal';
import {useNavigation} from '@react-navigation/native';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const reauthenticate = userCurrentPassword => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(
      user.email,
      userCurrentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };

  const updatePassword = () => {
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
              setCurrentPassword('');
              setConfirmPassword('');
              setNewPassword('');
              setShowSuccessModal(true);
            })
            .catch(error => {
              setLoading(false);
              if (error.code == 'auth/weak-password') {
                setNewPasswordError(
                  'New Password is week make sure it atleast 6 characters or more!',
                );
              }
              console.log('Error after authenticate is: ', error);
            });
        })
        .catch(error => {
          setLoading(false);
          if (error.code == 'auth/invalid-credential') {
            setCurrentPasswordError('Current Password is incorrect!');
          }
          console.log('Er: ', error);
        });
    } catch (error) {
      setLoading(false);
      console.log('Error in updating user password: ', error);
    }
  };

  const handleUpdatePassword = () => {
    let confirmPass = false;

    if (currentPassword === '') {
      setCurrentPasswordError('Current password is required!');
    } else {
      if (currentPassword.length < 6) {
        setCurrentPasswordError('Enter correct current password!');
      } else {
        setCurrentPasswordError('');
      }
    }

    if (newPassword === '') {
      setNewPasswordError('New password is required!');
    } else {
      if (newPassword.length < 6) {
        setNewPasswordError('Password must be 6 characters or more!');
      } else {
        setNewPasswordError('');
      }
    }

    if (confirmPassword === '') {
      setConfirmPasswordError('Confirm password is required!');
    } else {
      if (confirmPassword.length < 6) {
        setConfirmPasswordError('Password must be 6 characters or more!');
      } else {
        if (newPassword !== confirmPassword) {
          setConfirmPasswordError('Confirm password is not same!');
        } else {
          setConfirmPasswordError('');
        }
      }
    }

    if (newPassword === confirmPassword) {
      confirmPass = true;
    } else {
      confirmPass = false;
    }

    if (
      currentPassword.length > 5 &&
      newPassword.length > 5 &&
      confirmPassword.length > 5 &&
      confirmPass
    ) {
      updatePassword();
    }
  };

  const goBackScreen = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  return (
    <ScreenComponent>
      <TopCompoWithHeading title="Change Password" />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: '100%',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image
              source={require('../assets/change-password.jpg')}
              style={styles.img}
            />
            <Text style={styles.label}>Current Password</Text>
            <TextInputComponent
              value={currentPassword}
              onChangeText={text => {
                if (text.trim().length) {
                  setCurrentPassword(text);
                  if (text.length > 5) {
                    setCurrentPasswordError('');
                  }
                } else {
                  setCurrentPassword('');
                }
              }}
              maxLength={20}
              secureTextEntry={secureTextEntry}
              onPressSecure={() => setSecureTextEntry(!secureTextEntry)}
              placeholder="Enter current password"
              secureText={
                secureTextEntry
                  ? require('../assets/hide.png')
                  : require('../assets/eye.png')
              }
              showHideIconStyle={{tintColor: colors.gray}}
              inputStyle={{
                marginBottom: currentPasswordError !== '' ? 4 : 20,
                borderWidth: currentPasswordError !== '' ? 1 : 0,
                borderColor: currentPasswordError !== '' ? colors.red : null,
              }}
            />
            {currentPasswordError !== '' && (
              <Text style={styles.errorText}>{currentPasswordError}</Text>
            )}
            <Text style={styles.label}>New Password</Text>
            <TextInputComponent
              value={newPassword}
              onChangeText={text => {
                if (text.trim().length) {
                  setNewPassword(text);
                  if (text.length > 5) {
                    setNewPasswordError('');
                  }
                } else {
                  setNewPassword('');
                }
              }}
              maxLength={20}
              secureTextEntry={secureTextEntry1}
              onPressSecure={() => setSecureTextEntry1(!secureTextEntry1)}
              placeholder="Enter new password"
              secureText={
                secureTextEntry1
                  ? require('../assets/hide.png')
                  : require('../assets/eye.png')
              }
              showHideIconStyle={{tintColor: colors.gray}}
              inputStyle={{
                marginBottom: newPasswordError !== '' ? 4 : 20,
                borderWidth: newPasswordError !== '' ? 1 : 0,
                borderColor: newPasswordError !== '' ? colors.red : null,
              }}
            />
            {newPasswordError !== '' && (
              <Text style={styles.errorText}>{newPasswordError}</Text>
            )}

            <Text style={styles.label}>Confirm Password</Text>
            <TextInputComponent
              value={confirmPassword}
              onChangeText={text => {
                if (text.trim().length) {
                  setConfirmPassword(text);
                  if (text.length > 5 && text == newPassword) {
                    setConfirmPasswordError('');
                  }
                } else {
                  setConfirmPassword('');
                }
              }}
              maxLength={20}
              secureTextEntry={secureTextEntry2}
              onPressSecure={() => setSecureTextEntry2(!secureTextEntry2)}
              placeholder="Enter confirm password"
              secureText={
                secureTextEntry2
                  ? require('../assets/hide.png')
                  : require('../assets/eye.png')
              }
              showHideIconStyle={{tintColor: colors.gray}}
              inputStyle={{
                marginBottom: confirmPasswordError !== '' ? 4 : 20,
                borderWidth: confirmPasswordError !== '' ? 1 : 0,
                borderColor: confirmPasswordError !== '' ? colors.red : null,
              }}
            />
            {confirmPasswordError !== '' && (
              <Text style={[styles.errorText, {marginBottom: 0}]}>
                {confirmPasswordError}
              </Text>
            )}

            <ButtonComponent
              title="Update Password"
              style={styles.btn}
              loading={loading}
              onPress={handleUpdatePassword}
            />
            {showSuccessModal && (
              <ChangePasswordSuccessModal
                setShow={setShowSuccessModal}
                show={showSuccessModal}
                goBackScreen={goBackScreen}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <MyIndicator visible={loading} />
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  img: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.medium,
    marginBottom: 6,
  },
  btn: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: colors.red,
    marginBottom: 20,
    paddingLeft: 4,
  },
});
