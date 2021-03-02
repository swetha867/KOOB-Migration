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
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {fetchMeanings} from '../redux/actions/asyncActions';
import {setWordMeanings} from '../redux/actions/activeBookActions';
import axios from 'axios';
import tailwind from 'tailwind-rn';
import Tts from 'react-native-tts';

function DictionaryModal({selected_word, dictionar_data, dispatch}) {
  const [dic, setDic] = useState([]);
  useEffect(() => {
    axios
      .post(
        'http://3.15.37.149:6010/lookup',
        {
          word: 'squares',
          user_id: '20',
          sentence: 'Kinship was an assertion',
          book_name: 'Reading with Patrick',
          author_name: 'Michelle Kuo',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(function (response) {
        console.log('Dictionary Data' + response.data.length);
        Tts.speak('Dictionary Data fetched' + response.data.length + 'records');

        dispatch(setWordMeanings(response.data));
        setDic(response.data);
      });
    console.log('Dictionary data' + dictionar_data);
  });

  function speak(word) {
    Tts.speak('Hello, world!');
  }
  const renderItem = ({item}) => <Item title={item.meaning} />;
  return (
    <Modal
      swipeDirection="down"
      animationOutTiming={100}
      animationInTiming={100}
      hideModalContentWhileAnimating
      isVisible={true}
      backdropColor="rgba(0, 0, 0, 0.6)"
      style={tailwind('justify-end items-center')}>
      <View
        style={tailwind(
          'pt-4 items-center bg-gray-100 bg-opacity-80 min-w-full rounded',
        )}>
        <Text style={tailwind('text-gray-800 text-lg font-extrabold')}>
          {selected_word}
        </Text>
        {/* <SafeAreaView style={styles.container}>
          <FlatList
            data={dic}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView> */}
      </View>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    selected_word: state.activeBookReducer.selected_word,
    dictionar_data: state.activeBookReducer.dictionar_data,
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
