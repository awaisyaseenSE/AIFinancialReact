import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import ScreenComponent from './ScreenComponent';
import {Modal} from 'react-native';
import colors from '../config/colors';
import ButtonComponent from './ButtonComponent';
import fontFamily from '../config/fontFamily';

const ChangePasswordSuccessModal = ({show, setShow, goBackScreen}) => {
  return (
    <Modal visible={show} transparent animationType="slide">
      <ScreenComponent style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={{flex: 1}}
            onPress={() => setShow(false)}
          />
          <View style={styles.contentContainer}>
            <Image
              source={require('../assets/success.png')}
              style={styles.img}
            />
            <Text style={styles.heading}>Congratulation!</Text>
            <Text style={styles.txt}>
              Your password is updated successfully!
            </Text>
            <ButtonComponent title="Go Back" onPress={() => goBackScreen()} />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={{flex: 1}}
            onPress={() => setShow(false)}
          />
        </View>
      </ScreenComponent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.white,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 30,
    paddingHorizontal: 26,
    borderRadius: 12,
  },
  img: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 22,
  },
  txt: {
    fontSize: 14,
    color: colors.black_light,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 18,
    color: colors.green,
    fontFamily: fontFamily.semi_bold,
    textAlign: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default ChangePasswordSuccessModal;
