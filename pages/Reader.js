/**
 * Sample React Native Reader
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import StaticServer from 'react-native-static-server';

import RNFS from 'react-native-fs';
import {EPUB_IMPORT_LOCAL_DIR_NAME} from '../constants';

const epub_renderer = require('../assets/epub_renderer.html');

// import RNFS from 'react-native-fs';
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};
const Reader = ({isLoggedIn, bookUrl, dispatch}) => {
  const serverConfig = {localOnly: true, keepAlive: true};
  const webview = useRef();
  const [visible, setVisible] = useState(true);
  const [book, setBook] = useState('');
  const [showBook, setShowBook] = useState(true);
  const [state, setState] = useState({bookUrl: null, server: null});
  const bookLocations = useState('');

  function _onPress() {
    let filter;
    const split = url.split('/');
    const name = split.pop();
    const inbox = split.pop();
    const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
  }

  function startServer(url) {
    const book_name = 'childrens-literature.epub';

    let newServer = new StaticServer(
      0,
      `${RNFS.DocumentDirectoryPath}/${EPUB_IMPORT_LOCAL_DIR_NAME}`,
      serverConfig,
    );
    newServer.start().then((url) => {
      const book_name = 'childrens-literature.epub';
      console.log(url + '/' + book_name);
      setState({
        bookUrl: url + book_name,
        server: newServer,
      });
    });
    return () => {
      state.server && state.server.stop();
    };
  }

  React.useEffect(() => {
    console.log('isLoggedin' + isLoggedIn);
    console.log('Reader Page' + bookUrl);
    startServer();
  }, []);

  console.log('url' + state.bookUrl);
  function goPrev() {
    webview.current?.injectJavaScript('window.rendition.prev()');
  }
  let injectedJS = `renderEpubFile(${state.bookUrl})`;

  function goPrev() {
    webview.current?.injectJavaScript(`window.rendition.prev()`);
  }

  function goNext() {
    webview.current?.injectJavaScript(`window.rendition.next()`);
  }
  return (
    <>
      <WebView
        ref={webview}
        source={epub_renderer}
        injectedJavaScriptBeforeContentLoaded={injectedJS}
      />
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
    bookUrl: state.userReducer.book_url,
  };
};
export default connect(mapStateToProps)(Reader);
