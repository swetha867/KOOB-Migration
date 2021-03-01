/**
 * Sample React Native Reader
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, Platform} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import StaticServer from 'react-native-static-server';

import RNFS from 'react-native-fs';
import {logger} from '../utils/logger';

const epub_renderer = require('../assets/epub_renderer.html');

import {EPUB_IMPORT_LOCAL_DIR_NAME} from '../constants';

//const epub_renderer = require('../assets/epub_renderer.html');
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const Reader = ({activeBookFileName, dispatch}) => {
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
        webview.current?.injectJavaScript(`renderEpubFile("${book_url}")`);
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
    webview.current?.injectJavaScript('window.rendition.prev()');
  }

  function goPrev() {
    webview.current?.injectJavaScript(`window.rendition.prev()`);
  }

  function goNext() {
    webview.current?.injectJavaScript(`window.rendition.next()`);
  }
  return (
    <>
      {Platform.OS === 'ios' && (
        <WebView ref={webview} source={epub_renderer} />
      )}
      {Platform.OS === 'android' && (
        <WebView
          ref={webview}
          source={{uri: 'file:///android_asset/epub_renderer.html'}}
        />
      )}
      <GestureRecognizer
        onSwipeLeft={goPrev}
        onSwipeRight={goNext}
        config={config}
      />
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
  };
};
export default connect(mapStateToProps)(Reader);
