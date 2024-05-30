import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../config/colors';
import FastImage from 'react-native-fast-image';

const screenWidth = Dimensions.get('window').width;

const NewTaskCompo = ({data, index, listNum, listIndex, setIsListScroll}) => {
  const [listDetail, setListDetail] = useState({
    index: null,
    listNo: null,
  });
  const handleOnPress = () => {
    if (listDetail.index == index && listDetail.listNo == listNum) {
      setListDetail({
        index: null,
        listNo: null,
      });
      setIsListScroll(true);
    } else {
      setListDetail({
        index: index,
        listNo: listNum,
      });
      setIsListScroll(false);
    }
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={{uri: data?.img}}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.iconContainer}
        activeOpacity={0.6}
        onPress={handleOnPress}>
        <Image
          source={
            listDetail.listNo == listNum && listDetail.index == listIndex
              ? require('../../assets/pin-fill.png')
              : require('../../assets/pin-unfill.png')
          }
          style={[styles.icon]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_light,
    height: '90%',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 22,
    paddingHorizontal: 20,
    width: screenWidth * 0.54,
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    borderRadius: 18,
    resizeMode: 'contain',
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: colors.black,
  },
  iconContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    padding: 6,
  },
});

export default NewTaskCompo;
