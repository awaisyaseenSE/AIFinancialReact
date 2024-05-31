import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../../config/colors';
import FastImage from 'react-native-fast-image';
import {
  listData1,
  listData2,
  listData3,
  listData4,
} from '../../helper/dummyData';

const screenWidth = Dimensions.get('window').width;

const NewTaskCompo = ({data, index, listNum, listIndex, setIsListScroll}) => {
  const handleOnPress = () => {
    if (listNum == 1) {
      console.log('index: ', index, '   and list index: ', listIndex);
      const updatedList = listData1.map(item => {
        if (item.id === index) {
          return {...item, isPin: !item.isPin};
        } else {
          console.log('else');
          return {...item, isPin: false};
        }
      });
      for (let i = 0; i < listData1.length; i++) {
        listData1[i] = updatedList[i];
      }
      // console.log('list 1 after: ', listData1);

      var statusPin = listData1.some(function (element) {
        return element.isPin;
      });
      // console.log('Pin status of list 1: ', statusPin);
      setIsListScroll(!statusPin);
    } else if (listNum == 2) {
      const updatedList = listData2.map(item => {
        if (item.id === index) {
          return {...item, isPin: !item.isPin};
        } else {
          return {...item, isPin: false};
        }
      });
      for (let i = 0; i < listData2.length; i++) {
        listData2[i] = updatedList[i];
      }

      var statusPin = listData2.some(function (element) {
        return element.isPin;
      });

      setIsListScroll(!statusPin);
    } else if (listNum == 3) {
      const updatedList = listData3.map(item => {
        if (item.id === index) {
          return {...item, isPin: !item.isPin};
        } else {
          return {...item, isPin: false};
        }
      });
      for (let i = 0; i < listData3.length; i++) {
        listData3[i] = updatedList[i];
      }

      var statusPin = listData3.some(function (element) {
        return element.isPin;
      });

      setIsListScroll(!statusPin);
    } else if (listNum == 4) {
      const updatedList = listData4.map(item => {
        if (item.id === index) {
          return {...item, isPin: !item.isPin};
        } else {
          return {...item, isPin: false};
        }
      });
      for (let i = 0; i < listData4.length; i++) {
        listData4[i] = updatedList[i];
      }

      var statusPin = listData4.some(function (element) {
        return element.isPin;
      });
      setIsListScroll(!statusPin);
    } else {
      return null;
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
            data?.isPin
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
