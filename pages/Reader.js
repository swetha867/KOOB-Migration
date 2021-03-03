/**
 * Sample React Native Reader
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import StaticServer from 'react-native-static-server';
import _ from 'lodash';

import RNFS from 'react-native-fs';
import {logger} from '../utils/logger';

const epub_renderer = require('../assets/epub_renderer.html');

import DictionaryModal from '../components/DictionaryModal';

import {EPUB_IMPORT_LOCAL_DIR_NAME} from '../constants';

import {
  setSelectedWord,
  setActiveBookLocation,
} from '../redux/actions/activeBookActions';

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const Reader = ({
  activeBookFileName,
  selectedWord,
  book_location,
  dispatch,
}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const serverConfig = {localOnly: true, keepAlive: true};
  const webview = useRef();

  function startServer() {
    let newServer = new StaticServer(
      0,
      `${RNFS.DocumentDirectoryPath}/${EPUB_IMPORT_LOCAL_DIR_NAME}`,
      serverConfig,
    );
    newServer.start().then((url) => {
      const book_url = url + '/' + activeBookFileName;
      logger.debug(`Book should be available at ${book_url}`);
      setTimeout(() => {
        webview.current?.injectJavaScript(
          `(function() {renderEpubFile("${book_url}",${windowWidth},${
            windowHeight * 0.7
          });})()`,
        );
      }, 1000);
    });
    return () => {
      newServer.server && newServer.stop();
    };
  }

  React.useEffect(() => {
    startServer();
  }, []);

  function goPrev() {
    webview.current?.injectJavaScript(
      `(function() {window.rendition.prev();})()`,
    );
  }

  function goNext() {
    webview.current?.injectJavaScript(
      `(function() {window.rendition.next();})()`,
    );
  }

  function handleMessage(e) {
    let parsedData = JSON.parse(e.nativeEvent.data);
    delete parsedData.type;
    const {selected, event} = parsedData;
    console.log(event);
    dispatch(setSelectedWord(selected));
    const {locations, event1} = parsedData;
    dispatch(setActiveBookLocation(locations));
    console.log(event1);

    // switch (type) {
    //   case 'selected': {
    //     setSelectedText(parsedData.selected);
    //     if (parsedData.selected.length < 40) setModal(true);
    //     return;
    //   }
    //   case 'loc': {
    //     const {progress, totalPages} = parsedData;
    //     props.addMetadata({progress, totalPages}, params.index);
    //     delete parsedData.progress;
    //     delete parsedData.totalPages;
    //     return props.addLocation(parsedData);
    //   }
    //   case 'key':
    //   case 'metadata':
    //   case 'contents':
    //   case 'locations':
    //     return props.addMetadata(parsedData, params.index);
    //   case 'search':
    //     return setSearchResults(parsedData.results);
    //   default:
    //     return;
    // }
  }

  let platform_independent_webview_source;
  if (Platform.OS === 'ios') {
    platform_independent_webview_source = epub_renderer;
  } else {
    platform_independent_webview_source = {
      uri: 'file:///android_asset/epub_renderer.html',
    };
  }

  if (selectedWord !== undefined) {
    console.log('selectedWord check', selectedWord);
  }
  return (
    <>
      <GestureRecognizer
        onSwipeLeft={goPrev}
        onSwipeRight={goNext}
        config={config}
        style={{
          flex: 1,
        }}>
        <WebView
          ref={webview}
          source={platform_independent_webview_source}
          onMessage={handleMessage}
        />
      </GestureRecognizer>
      {!_.isUndefined(selectedWord) && <DictionaryModal />}
      <TouchableOpacity onPress={goPrev}>
        <Text>Prev</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goNext}>
        <Text>next</Text>
      </TouchableOpacity>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    activeBookFileName: state.activeBookReducer.file_name,
    selectedWord: state.activeBookReducer.selected_word,
    book_location: state.activeBookReducer.setActiveBookLocation,
  };
};
export default connect(mapStateToProps)(Reader);
