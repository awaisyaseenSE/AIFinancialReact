import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import TopCompoWithHeading from '../components/TopCompoWithHeading';
import FastImage from 'react-native-fast-image';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import ShowClientDetailModal from '../components/ShowClientDetailModal';
import firestore from '@react-native-firebase/firestore';
import MyIndicator from '../components/MyIndicator';

const screenWidth = Dimensions.get('window').width;

export default function ClientDetailScreen({route}) {
  const data = route?.params?.clientData;
  const [selectedData, setSelectedData] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [clientDetailID, setClientDetailID] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientFullData, setclientFullData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection('clientProfiles')
      .doc(data?.id)
      .onSnapshot(snap => {
        if (snap.exists) {
          let fullData = {...snap.data(), id: snap.id};
          setclientFullData(fullData);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

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

  const handleGetData = id => {
    setClientDetailID(data?.id);

    if (id == 'financialInfo') {
      setSelectedData(clientFullData?.financialInfo);
      setSelectedID('financialInfo');
      setShowModal(true);
    } else if (id == 'personalInfo') {
      setSelectedData(clientFullData?.personalInfo);
      setSelectedID('personalInfo');
      setShowModal(true);
    } else if (id == 'taxInfo') {
      setSelectedData(clientFullData?.taxInfo);
      setSelectedID('taxInfo');
      setShowModal(true);
    } else if (id == 'investmentInfo') {
      setSelectedData(clientFullData?.investmentInfo);
      setSelectedID('investmentInfo');
      setShowModal(true);
    } else if (id == 'estateInfo') {
      setSelectedData(clientFullData?.estateInfo);
      setSelectedID('estateInfo');
      setShowModal(true);
    } else if (id == 'insuranceInfo') {
      setSelectedData(clientFullData?.insuranceInfo);
      setSelectedID('insuranceInfo');
      setShowModal(true);
    } else {
      setSelectedData('');
      setSelectedID('');
      setShowModal(false);
    }
  };

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
        ]}
        onPress={() => handleGetData(item.id)}>
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
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
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
            <Text style={styles.aiGeneratedCardTxt}>
              AI generated{'\n'}Plan
            </Text>
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
            scrollEnabled={false}
          />
          {showModal && (
            <ShowClientDetailModal
              showModal={showModal}
              setShowModal={setShowModal}
              data={selectedData}
              selectedID={selectedID}
              clientDetailID={clientDetailID}
            />
          )}
        </View>
      </ScrollView>
      <MyIndicator visible={loading} isLoaderShow={true} />
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
