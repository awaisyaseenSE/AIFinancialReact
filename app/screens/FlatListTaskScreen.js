import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import TopCompoWithHeading from '../components/TopCompoWithHeading';
import colors from '../config/colors';
import {listData1, listData2, listData3, listData4} from '../helper/dummyData';
import ShowListDataCompo from './FlatListTask/ShowListDataCompo';

export default function FlatListTaskScreen() {
  const [selectedList, setSelectedList] = useState(2);

  const flatListRef = useRef(null);
  const scrollToEnd = () => {
    if (flatListRef?.current) {
      flatListRef?.current?.scrollToEnd({animated: true});
    }
  };

  return (
    <>
      <ScreenComponent>
        <TopCompoWithHeading
          title="Products"
          rightIcon={require('../assets/right-arrow.png')}
          rightIconStyle={styles.topRightIcon}
        />
        <View style={styles.container}>
          <FlatList
            data={listData1}
            renderItem={({item, index}) => (
              <ShowListDataCompo data={item} index={index} />
            )}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            data={listData2}
            renderItem={({item, index}) => (
              <ShowListDataCompo data={item} index={index} />
            )}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
          {(selectedList == 3 || selectedList == 4) && (
            <FlatList
              ref={flatListRef}
              data={listData3}
              renderItem={({item, index}) => (
                <ShowListDataCompo data={item} index={index} />
              )}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          )}
          {selectedList == 4 && (
            <FlatList
              data={listData4}
              renderItem={({item, index}) => (
                <ShowListDataCompo data={item} index={index} />
              )}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedList(2)}>
            <Image
              source={require('../assets/circle-1.png')}
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
              source={require('../assets/circle-2.png')}
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
              source={require('../assets/circle-4.png')}
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
            onPress={() => scrollToEnd()}>
            <Image
              source={require('../assets/circle-random.png')}
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
    // backgroundColor: 'green',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
});
