import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import TextInputComponent from './TextInputComponent';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import ButtonComponent from './ButtonComponent';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ShowClientDetailModal = ({data, setShowModal, showModal, selectedID}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deatil, setDetail] = useState(data);
  const [detailError, setDetailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (deatil === '') {
      setDetailError(`${selectedID} information is required!`);
    } else {
      if (deatil.length < 50) {
        setDetailError(
          `${selectedID} information required minimum 50 characters!`,
        );
      } else {
        setDetailError('');
      }
    }

    if (data === deatil) {
      console.log('no change occur!');
      return null;
    }

    if (deatil.length > 49) {
      Alert.alert('Ready for update!');
    }
  };

  return (
    <Modal visible={showModal} transparent animationType="slide">
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setShowModal(false)}
        />
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View>
              <TextInputComponent
                placeholder={`Enter client ${selectedID} detail`}
                inputStyle={{
                  ...styles.input,
                  ...{
                    borderWidth: detailError !== '' ? 1 : 0,
                    borderColor: detailError !== '' ? colors.red : null,
                  },
                }}
                value={deatil}
                onChangeText={text => {
                  if (isEdit) {
                    if (text.trim().length) {
                      setDetail(text);
                      if (text.length > 49) {
                        setDetailError('');
                      }
                    } else {
                      setDetail('');
                    }
                  }
                }}
                maxLength={500}
                editable={isEdit}
                textStyle={styles.inputSty}
                multiline
              />
              {isEdit && (
                <Text style={styles.textInputLengthTxt}>
                  {deatil.length}/500
                </Text>
              )}
            </View>
            {detailError !== '' && (
              <Text style={styles.errorTxt}>{detailError}</Text>
            )}
          </View>
          {isEdit ? (
            <ButtonComponent
              title="Save"
              style={styles.btn}
              textStyle={styles.btnTxt}
              onPress={handleSave}
            />
          ) : (
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setIsEdit(true)}>
              <Image
                source={require('../assets/edit-pen-icon.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight - 120,
    backgroundColor: colors.gray_light,
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  editIconContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  editIcon: {
    width: 30,
    height: 30,
    tintColor: colors.primary,
  },
  heading: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.medium,
    marginTop: 20,
    marginBottom: 14,
    textAlign: 'justify',
  },
  btn: {
    width: '40%',
    alignSelf: 'flex-end',
    height: 40,
  },
  btnTxt: {
    fontSize: 12,
    fontFamily: fontFamily.light,
  },

  errorTxt: {
    fontSize: 12,
    color: colors.red,
    fontFamily: fontFamily.medium,
    marginVertical: 2,
    paddingLeft: 4,
    lineHeight: 16,
  },
  textInputLengthTxt: {
    position: 'absolute',
    bottom: 20,
    right: 12,
    color: colors.black_light,
    fontFamily: fontFamily.regular,
    fontSize: 12,
  },
  input: {
    backgroundColor: colors.white,
    height: screenHeight / 2.5,
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  inputSty: {
    height: '90%',
  },
});

export default ShowClientDetailModal;
