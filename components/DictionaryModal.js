import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import tailwind from 'tailwind-rn';

function DictionaryModal({selected_word}) {
  return (
    <Modal
      swipeDirection="down"
      animationOutTiming={100}
      animationInTiming={100}
      hideModalContentWhileAnimating
      isVisible={false}
      backdropColor="rgba(0, 0, 0, 0.6)"
      style={tailwind('justify-end items-center')}>
      <View
        style={tailwind(
          'pt-4 items-center bg-gray-100 bg-opacity-80 min-w-full rounded',
        )}>
        <Text style={tailwind('text-gray-800 text-lg font-extrabold')}>
          {selected_word}
        </Text>
      </View>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    selected_word: state.activeBookReducer.selected_word,
  };
}

export default connect(mapStateToProps)(DictionaryModal);
