import React, {useState, useEffect} from 'react';
// import {ListItem, Badge, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  Button,
} from 'react-native';
import {Spinner} from 'native-base';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchMeanings, fetchImages} from '../redux/actions/asyncActions';
import {setSelectedWord} from '../redux/actions/activeBookActions';
import tailwind from 'tailwind-rn';
import Tts from 'react-native-tts';
import {SliderBox} from 'react-native-image-slider-box';

function DictionaryModal({
  selected_word,
  meanings,
  selected_paragraph,
  selected_sentence,
  book_name,
  author_name,
  wordImages,
  dispatch,
}) {
  const [modalVisible, setModalVisible] = useState(true);
  const [dict, setDict] = useState([]);
  const [images, setImages] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?tree',
  ]);
  useEffect(() => {
    // alert(selected_word);
    // Tts.speak('selected_word');
    // alert(selected_word);
    dispatch(
      fetchMeanings(
        'squares',
        '20',
        selected_sentence,
        selected_paragraph,
        book_name,
        author_name,
      ),
    );
    dispatch(fetchImages(selected_word));
    alert(wordImages);
    setModalVisible(true);
  }, []);
  let modalContent;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // if (_.isUndefined(meanings)) {
  //   modalContent = (
  //     <>
  //       <Spinner color="blue"></Spinner>
  //     </>
  //   );
  // } else {
  /*modalContent = meanings.map((meaning_) => {
      console.log(meaning_);
      const {pos, meaning, id, teacherVote} = meaning_;
      return (
        <View key={id}>
          <View style={tailwind('flex-row')}>
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
    });*/
  modalContent = Object.keys(meanings).map((meaning_, index) => {
    return (
      <View style={tailwind('px-1 pb-2 bg-gray-100 ')}>
        <TouchableOpacity>
          <Text>
            {meanings[meaning_].count} {'  '}
            {meanings[meaning_].meaning}:{meanings[meaning_].fl}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });
  // <Text style={tailwind('text-gray-800 text-2xl font-extrabold')}>
  //         {selected_word}
  //       </Text>
  //       {/* <SafeAreaView style={styles.container}>
  //         <FlatList
  //           data={dic}
  //           renderItem={renderItem}
  //           keyExtractor={(item) => item.id}
  //         />
  //       </SafeAreaView> */
  // }

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
      <SliderBox autoplay={true} circleLoop={true} images={images} />
      <TouchableOpacity
        style={tailwind('pt-4 pb-2 px-4 bg-gray-100 min-w-full rounded')}
        onPress={() => setModalVisible(false)}>
        <View style={tailwind('font-bold text-xl text-red-600')}>
          <Icon name="times" size={20} />
        </View>
      </TouchableOpacity>

      <View>{modalContent}</View>
      <TouchableOpacity>
        <View style={tailwind('font-bold text-xl text-red-600')}>
          <Text> Vote</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    selected_word: state.activeBookReducer.selected_word,
    meanings: state.activeBookReducer.meanings,
    author_name: state.activeBookReducer.author_name,
    book_name: state.activeBookReducer.book_name,
    selected_sentence: state.activeBookReducer.selected_sentence,
    selected_paragraph: state.activeBookReducer.selected_paragraph,
    wordImages: state.activeBookReducer.images,
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
