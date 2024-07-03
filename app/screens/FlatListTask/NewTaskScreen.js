import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import TopCompoWithHeading from '../../components/TopCompoWithHeading';
import colors from '../../config/colors';
import {
  listData1,
  listData2,
  listData3,
  listData4,
} from '../../helper/dummyData';
import NewTaskCompo from './NewTaskCompo';
import Carousel from 'react-native-snap-carousel';

const screenWidth = Dimensions.get('window').width;

export default function NewTaskScreen() {
  const [selectedList, setSelectedList] = useState(2);

  const [list1Index, setList1Index] = useState(1);
  const [isList1Scroll, setIsList1Scroll] = useState(true);

  const [list2Index, setList2Index] = useState(1);
  const [isList2Scroll, setIsList2Scroll] = useState(true);

  const [list3Index, setList3Index] = useState(1);
  const [isList3Scroll, setIsList3Scroll] = useState(true);

  const [list4Index, setList4Index] = useState(1);
  const [isList4Scroll, setIsList4Scroll] = useState(true);

  const flatListRef3 = useRef(null);
  const flatListRef1 = useRef(null);
  const flatListRef2 = useRef(null);
  const flatListRef4 = useRef(null);

  function getRandomNumberExcluding(min, max, exclude) {
    let randomNumber;
    if (min >= max || exclude < min || exclude > max) {
      return 0;
    }

    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomNumber === exclude);

    return randomNumber;
  }

  const RandomizePosition = () => {
    if (isList1Scroll) {
      let leng = listData1.length - 1;
      let num = getRandomNumberExcluding(0, leng, list1Index);
      flatListRef1?.current?.snapToItem(num, true);
    }

    if (isList2Scroll) {
      let leng = listData2.length - 1;
      let num = getRandomNumberExcluding(0, leng, list2Index);
      flatListRef2?.current?.snapToItem(num, true);
    }

    if (isList3Scroll) {
      let leng = listData3.length - 1;
      let num = getRandomNumberExcluding(0, leng, list3Index);
      flatListRef3?.current?.snapToItem(num, true);
    }

    if (isList4Scroll) {
      let leng = listData4.length - 1;
      let num = getRandomNumberExcluding(0, leng, list4Index);
      flatListRef4?.current?.snapToItem(num, true);
    }
  };

  const handleShowIndex = () => {
    console.log('Current Index of List 1: ', list1Index);
    console.log('Current Index of List 2: ', list2Index);
    console.log('Current Index of List 3: ', list3Index);
    console.log('Current Index of List 4: ', list4Index);
  };

  return (
    <>
      <ScreenComponent>
        <TopCompoWithHeading
          title="New Task"
          rightIcon={require('../../assets/right-arrow.png')}
          rightIconStyle={styles.topRightIcon}
          onPressRight={handleShowIndex}
        />
        <View style={styles.container}>
          <Carousel
            data={listData1}
            ref={flatListRef1}
            renderItem={({item, index}) => (
              <NewTaskCompo
                data={item}
                index={index}
                listNum={1}
                setIsListScroll={setIsList1Scroll}
                listIndex={list1Index}
              />
            )}
            contentContainerStyle={{overflow: 'visible'}}
            firstItem={1}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.52}
            slideStyle={{alignItems: 'center'}}
            inactiveSlideOpacity={0.75}
            inactiveSlideScale={0.77}
            ListEmptyComponent={() => (
              <ActivityIndicator size={'large'} color={colors.red} />
            )}
            onSnapToItem={index => {
              setList1Index(index);
            }}
          />
          <Carousel
            data={listData2}
            ref={flatListRef2}
            renderItem={({item, index}) => (
              <NewTaskCompo
                data={item}
                index={index}
                listNum={2}
                setIsListScroll={setIsList2Scroll}
                listIndex={list2Index}
              />
            )}
            contentContainerStyle={{overflow: 'visible'}}
            firstItem={1}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.52}
            slideStyle={{alignItems: 'center'}}
            inactiveSlideOpacity={0.75}
            inactiveSlideScale={0.77}
            ListEmptyComponent={() => (
              <ActivityIndicator size={'large'} color={colors.red} />
            )}
            onSnapToItem={index => {
              setList2Index(index);
            }}
          />
          {(selectedList == 3 || selectedList == 4) && (
            <Carousel
              data={listData3}
              ref={flatListRef3}
              renderItem={({item, index}) => (
                <NewTaskCompo
                  data={item}
                  index={index}
                  listNum={3}
                  setIsListScroll={setIsList3Scroll}
                  listIndex={list3Index}
                />
              )}
              contentContainerStyle={{overflow: 'visible'}}
              firstItem={1}
              sliderWidth={screenWidth}
              itemWidth={screenWidth * 0.52}
              slideStyle={{alignItems: 'center'}}
              inactiveSlideOpacity={0.75}
              inactiveSlideScale={0.77}
              ListEmptyComponent={() => (
                <ActivityIndicator size={'large'} color={colors.red} />
              )}
              onSnapToItem={index => {
                setList3Index(index);
              }}
            />
          )}
          {selectedList == 4 && (
            <Carousel
              data={listData4}
              ref={flatListRef4}
              renderItem={({item, index}) => (
                <NewTaskCompo
                  data={item}
                  index={index}
                  listNum={4}
                  setIsListScroll={setIsList4Scroll}
                  listIndex={list4Index}
                />
              )}
              contentContainerStyle={{overflow: 'visible'}}
              firstItem={1}
              sliderWidth={screenWidth}
              itemWidth={screenWidth * 0.52}
              slideStyle={{alignItems: 'center'}}
              inactiveSlideOpacity={0.75}
              inactiveSlideScale={0.77}
              ListEmptyComponent={() => (
                <ActivityIndicator size={'large'} color={colors.red} />
              )}
              onSnapToItem={index => {
                setList4Index(index);
              }}
            />
          )}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedList(2)}>
            <Image
              source={require('../../assets/circle-1.png')}
              style={[
                styles.icon,
                {
                  tintColor: selectedList === 2 ? colors.red : colors.gray_dark,
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedList(3)}>
            <Image
              source={require('../../assets/circle-2.png')}
              style={[
                styles.icon,
                {
                  tintColor: selectedList === 3 ? colors.red : colors.gray_dark,
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedList(4)}>
            <Image
              source={require('../../assets/circle-4.png')}
              style={[
                styles.icon,
                {
                  tintColor: selectedList === 4 ? colors.red : colors.gray_dark,
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => RandomizePosition()}>
            <Image
              source={require('../../assets/circle-random.png')}
              style={[
                styles.icon,
                {
                  tintColor: selectedList === 5 ? colors.red : colors.gray_dark,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRightIcon: {
    tintColor: null,
    width: 22,
    height: 22,
  },
  footer: {
    paddingHorizontal: 10,
    backgroundColor: colors.off_White,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    marginTop: 10,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: colors.gray_dark,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  card: {
    height: 150,
    overflow: 'hidden',
    borderRadius: 15,
  },
});
