import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import TopCompoWithHeading from '../components/TopCompoWithHeading';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ClientDetailScreen({route}) {
  const navigation = useNavigation();
  const data = route?.params?.clientData;
  //   console.log('data in detail screen: ', data);
  const clientDetailInfo = [
    {
      id: 'financialInfo',
      title: 'Financial Information',
    },
    {
      id: 'personalInfo',
      title: 'Personal Information',
    },
    {
      id: 'taxInfo',
      title: 'Tax Information',
    },
    {
      id: 'investmentInfo',
      title: 'Investment Information',
    },
    {
      id: 'estateInfo',
      title: 'Estate Information',
    },
    {
      id: 'insuranceInfo',
      title: 'Insurance Information',
    },
  ];

  const renderItem = ({item, index}) => {
    let isEven = index % 2 == 0 ? true : false;
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            marginRight: isEven ? 6 : 0,
            marginLeft: isEven ? 0 : 6,
          },
        ]}>
        <Text style={styles.cardText}>
          {item?.title?.split(' ')[0]}
          {'\n'}
          {item?.title?.split(' ')[1]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenComponent>
      <TopCompoWithHeading title="Details" />
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          <FastImage
            source={
              data?.imageURL
                ? {uri: data?.imageURL}
                : require('../assets/avatar.png')
            }
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.nameStyle}>{data?.fullName}</Text>
        <View style={styles.aiGeneratedCard}>
          <Text style={styles.aiGeneratedCardTxt}>AI generated{'\n'}Plan</Text>
          <Image
            source={require('../assets/ai-image.png')}
            style={styles.aiGeneratedCardImage}
          />
        </View>
        <FlatList
          data={clientDetailInfo}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.white,
  },
  profileImageContainer: {
    backgroundColor: colors.white,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    borderRadius: 200,

    elevation: 11,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.gray_light,
  },
  nameStyle: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 18,
  },
  aiGeneratedCard: {
    backgroundColor: colors.primary,
    marginVertical: 22,
    paddingVertical: 16,
    borderRadius: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiGeneratedCardTxt: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fontFamily.semi_bold,
    lineHeight: 28,
  },
  aiGeneratedCardImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: colors.text_Input_Bg,
    marginBottom: 14,
    width: screenWidth / 2 - 26,
    paddingVertical: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardText: {
    width: '80%',
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.medium,
    lineHeight: 20,
  },
});
