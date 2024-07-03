import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import ScreenComponent from './ScreenComponent';
import {Modal} from 'react-native';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import ButtonComponent from './ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';

const AiCreditExceedModal = ({show, setShow}) => {
  const navigation = useNavigation();
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
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                }}
                activeOpacity={0.8}
                onPress={() => setShow(false)}>
                <Image
                  source={require('../assets/close.png')}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.imgContainer}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.img}
              />
            </View>
            <Text style={styles.heading}>Ai Financial</Text>
            <Text style={styles.txt}>Ai credit have been{'\n'}used up</Text>
            <ButtonComponent
              title="Add Additional credits"
              style={styles.btn}
              textStyle={styles.btnTxt}
              onPress={() => {
                navigation.navigate(navigationStrings.AiPlanScreen);
                setShow(false);
              }}
            />
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
    paddingBottom: 30,
    paddingHorizontal: 6,
    borderRadius: 12,
    paddingTop: 4,
  },
  img: {
    width: 120,
    height: 120,
    alignSelf: 'center',

    backgroundColor: colors.white,
    borderRadius: 12,
  },
  txt: {
    fontSize: 14,
    color: colors.black_light,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    marginBottom: 18,
    alignSelf: 'center',
    lineHeight: 20,
  },
  heading: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
    textAlign: 'center',
    marginBottom: 30,
    alignSelf: 'center',
  },
  imgContainer: {
    alignSelf: 'center',
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
    borderWidth: 1,
    borderColor: colors.off_White,
    backgroundColor: colors.white,
    marginBottom: 14,
    marginTop: 12,
  },
  btn: {
    height: 40,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  btnTxt: {
    fontSize: 12,
  },
  closeIcon: {
    width: 14,
    height: 14,
    tintColor: colors.black_light,
  },
});

export default AiCreditExceedModal;
