import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../config/fontFamily';

export default function AiPlanScreen() {
  const navigation = useNavigation();
  return (
    <>
      <ScreenComponent>
        <View style={{alignItems: 'flex-end', marginBottom: 20}}>
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/close.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image source={require('../assets/logo.png')} style={styles.img} />
          </View>
          <Text style={styles.heading}>Ai Financial</Text>
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
  closeIcon: {
    width: 18,
    height: 18,
    tintColor: colors.gray,
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
  img: {
    width: 120,
    height: 120,
    alignSelf: 'center',

    backgroundColor: colors.white,
    borderRadius: 12,
  },
  heading: {
    fontSize: 26,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
    textAlign: 'center',
    marginBottom: 30,
    alignSelf: 'center',
    marginTop: 6,
  },
});
