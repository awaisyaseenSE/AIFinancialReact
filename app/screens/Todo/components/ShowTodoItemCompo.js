import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import colors from '../../../config/colors';
import fontFamily from '../../../config/fontFamily';
import {Swipeable} from 'react-native-gesture-handler';

const ShowTodoItemCompo = ({
  data,
  index,
  openSwiper,
  onDoneTodo,
  onSkipTodo,
  onMoveToNextDayTodo,
}) => {
  const ref = useRef(null);

  const leftSwipe = () => {
    return (
      <TouchableOpacity
        style={styles.doneBtnContainer}
        activeOpacity={0.8}
        onPress={() => {
          ref?.current?.close();
          onDoneTodo(data?.id);
        }}>
        <Image
          source={require('../../../assets/todo/check.png')}
          style={styles.doneIcon}
        />
      </TouchableOpacity>
    );
  };

  const rightSwipe = () => {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.skipBtnContainer, {marginHorizontal: 10}]}
          activeOpacity={0.8}
          onPress={() => {
            ref?.current?.close();
            onMoveToNextDayTodo(data);
          }}>
          <Text style={styles.btnTxt} numberOfLines={2}>
            Move to next day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipBtnContainer}
          activeOpacity={0.8}
          onPress={() => {
            ref?.current?.close();
            onSkipTodo(data?.id);
          }}>
          <Text style={styles.btnTxt} numberOfLines={2}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (data?.opened == false) {
      ref?.current?.close();
    }
  });

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={leftSwipe}
      renderRightActions={rightSwipe}
      onSwipeableOpen={() => openSwiper(index)}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={() => console.log(data?.id)}>
        <Text numberOfLines={2} style={styles.titleTxt}>
          {data?.title}
        </Text>
        <Text style={styles.timeTxt}>{data?.time}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black_light,
    marginBottom: 14,
    paddingHorizontal: 14,
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 14,
    color: colors.off_White,
    fontFamily: fontFamily.semi_bold,
  },
  timeTxt: {
    fontSize: 10,
    color: colors.gray,
    fontFamily: fontFamily.medium,
    position: 'absolute',
    bottom: 6,
    right: 12,
    zIndex: 1,
  },
  doneBtnContainer: {
    backgroundColor: colors.green,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneIcon: {
    width: 20,
    height: 20,
    tintColor: colors.black,
  },
  skipBtnContainer: {
    backgroundColor: colors.yellow,
    height: 50,
    borderRadius: 6,
    maxWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  btnTxt: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.medium,
    lineHeight: 16,
  },
  row: {
    flexDirection: 'row',
  },
});

export default ShowTodoItemCompo;
