import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import {Spinner, Icon} from 'native-base';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchMeanings} from '../redux/actions/asyncActions';
import {setSelectedWord} from '../redux/actions/activeBookActions';
import tailwind from 'tailwind-rn';
import Tts from 'react-native-tts';

function DictionaryModal({selected_word, meanings, dispatch}) {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    Tts.speak(selected_word);
    dispatch(fetchMeanings(selected_word));
    setModalVisible(false);
  }, []);
  let modalContent;
  if (_.isUndefined(meanings)) {
    modalContent = (
      <>
        <Spinner color="blue"></Spinner>
      </>
    );
  } else {
    modalContent = meanings.map((meaning_) => {
      console.log(meaning_);
      const {pos, meaning, id, teacherVote} = meaning_;
      return (
        <View key={id}>
          <View style={tailwind('flex flex-row items-end pt-2')}>
            <Text style={tailwind('text-gray-800 text-2xl font-extrabold')}>
              {selected_word}
            </Text>
            <Text style={tailwind('px-2 text-gray-600 text-lg font-medium')}>
              {pos}
            </Text>
          </View>
          <View style={tailwind('flex flex-row items-end pt-2')}>
            <Text style={tailwind('text-green-600 text-base font-extrabold')}>
              {teacherVote}
              {teacherVote ? '✅' : ''}
            </Text>
            <Text
              style={tailwind(
                'px-1 text-gray-800 text-base text-justify leading-5 tracking-tighter font-normal',
              )}>
              {meaning}
            </Text>
          </View>
        </View>
      );
    });
  }

  // <Text style={tailwind('text-gray-800 text-2xl font-extrabold')}>
  //         {selected_word}
  //       </Text>
  //       {/* <SafeAreaView style={styles.container}>
  //         <FlatList
  //           data={dic}
  //           renderItem={renderItem}
  //           keyExtractor={(item) => item.id}
  //         />
  //       </SafeAreaView> */}

  return (
    <Modal
      swipeDirection="down"
      animationOutTiming={100}
      animationInTiming={100}
      hideModalContentWhileAnimating
      isVisible={modalVisible}
      backdropColor="rgba(0, 0, 0, 0.6)"
      onRequestClose={() => {
        setModalVisible(false);
      }}
      style={tailwind('justify-end')}>
      <View style={tailwind('pt-4 pb-2 px-4 bg-gray-100 min-w-full rounded')}>
        <Text
          style={tailwind('font-bold text-xl text-red-600')}
          onPress={() => dispatch(setSelectedWord(undefined))}>
          X
        </Text>
        {modalContent}
      </View>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    selected_word: state.activeBookReducer.selected_word,
    meanings: state.activeBookReducer.meanings,
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default connect(mapStateToProps)(DictionaryModal);
