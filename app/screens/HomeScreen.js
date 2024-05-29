import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonComponent from '../components/ButtonComponent';
import TextInputComponent from '../components/TextInputComponent';
import useAuth from '../auth/useAuth';
import ScreenComponent from '../components/ScreenComponent';
import TopHomeScreenCompo from '../components/TopHomeScreenCompo';
import colors from '../config/colors';
import {getResponsiveHeight} from '../helper/getResponsive';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ShowClientsProfileCompo from '../components/ShowClientsProfileCompo';

export default function HomeScreen() {
  const {logout} = useAuth();
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [clientsData, setClientsData] = useState([]);
  const currentUserUid = auth()?.currentUser?.uid;

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection('clientProfiles')
      .orderBy('time', 'desc')
      .onSnapshot(snap => {
        const allClientsData = snap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        const filteredClientsData = allClientsData.filter(
          ele => ele.userUid === currentUserUid,
        );
        setClientsData(filteredClientsData);
        // console.log(
        //   'Filtered Clients data length is: ',
        //   filteredClientsData.length,
        // );
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return (
    <ScreenComponent>
      <TopHomeScreenCompo onPressLeft={() => navigation.openDrawer()} />
      <View style={styles.container}>
        <TextInputComponent
          leftIcon={require('../assets/search.png')}
          inputStyle={styles.textInputStyle}
          placeholder="Search here.."
          value={searchText}
          onChangeText={text => {
            if (text.trim().length) {
              setSearchText(text);
            } else {
              setSearchText('');
            }
          }}
        />
        <TouchableOpacity
          style={styles.plusIconContainer}
          onPress={() =>
            navigation.navigate(navigationStrings.CreateClientScreen)
          }>
          <Image
            source={require('../assets/plus.png')}
            style={styles.plusIcon}
          />
          <Text style={styles.txt}>Add new client</Text>
        </TouchableOpacity>
        {clientsData?.length > 0 && (
          <Text style={styles.heading}>Client profiles</Text>
        )}
        {loading && <ActivityIndicator size={'large'} color={colors.primary} />}
        <View style={{flex: 1}}>
          <FlatList
            data={clientsData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ShowClientsProfileCompo data={item} />}
            numColumns={3}
            ListFooterComponent={<View style={{marginVertical: 30}} />}
          />
        </View>
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  textInputStyle: {
    backgroundColor: colors.gray_light,
    marginVertical: 16,
  },
  plusIcon: {
    width: 28,
    height: 28,
  },
  plusIconContainer: {
    height: getResponsiveHeight(16),
    backgroundColor: colors.gray_light,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 6,
  },
  txt: {
    color: colors.gray_dark,
    marginTop: 8,
    fontSize: 14,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginVertical: 10,
  },
});

{
  /* <ButtonComponent style={styles.btn} title="Logout" onPress={logout} /> */
}
