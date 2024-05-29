import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ShowClientsProfileCompo = ({data}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() =>
          navigation.navigate(navigationStrings.ClientDetailScreen, {
            clientData: data,
          })
        }>
        <FastImage
          source={
            data?.imageURL
              ? {uri: data?.imageURL}
              : require('../assets/avatar.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.nameTxt} numberOfLines={1}>
          {data?.fullName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShowClientsProfileCompo;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 3 - 12,
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop: 8,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    borderRadius: 6,

    elevation: 11,
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: colors.gray_light,
  },
  profileImage: {
    width: '90%',
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.gray_light,
  },
  nameTxt: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fontFamily.medium,
    marginTop: 12,
    paddingHorizontal: 8,
  },
});
