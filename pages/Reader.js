/**
 * Sample React Native Reader
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef,useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
// import RNFS from 'react-native-fs';
// import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import RNFetchBlob from 'rn-fetch-blob';

const Dirs = RNFetchBlob.fs.dirs

import {WebView} from 'react-native-webview';
import StaticServer from 'react-native-static-server';
import { startClock } from 'react-native-reanimated';


import RNFS from 'react-native-fs';
import {EPUB_IMPORT_LOCAL_DIR_NAME} from '../constants';

//const epub_renderer = require('../assets/epub_renderer.html');
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};
if (!global.Blob) {
  global.Blob = RNFetchBlob.polyfill.Blob;
}
const Reader = (  { isLoggedIn,  bookUrl,
  dispatch,book_name}) => {
  const serverConfig = {localOnly: true, keepAlive: true};
  const webview = useRef();
  const [visible, setVisible] = useState(true);
  const [book, setBook] = useState('');
  const [showBook, setShowBook] = useState(true);
  const [state, setState] = useState({bookUrl: null, server: null,serverOrigin:null,serverStarted:false});
  const bookLocations =useState("");
  
    const[url,setUrl]=useState("file:///storage/emulated/0/Reading with Patrick-V1.epub");

    React. useEffect(() => {
      let newServer = new StaticServer(
        8080,
        `${RNFS.DocumentDirectoryPath}/${EPUB_IMPORT_LOCAL_DIR_NAME}`,
        serverConfig,
      );
      newServer.start().then((url) => {
        //const book_name = 'childrens-literature.epub';
        console.log(url + '/' + book_name);
        setState({
          bookUrl: url + '/'+book_name,
          server: newServer,
        });
      });
      return () => {
        state.server && state.server.stop();
      };
   
  },[]);

  function getPath() {
    return Platform.OS === "android"
      ? RNFS.DocumentDirectoryPath + "/www"
      : RNFS.MainBundlePath + "/www";
  }  
  
    function startServer() {

  //  const targetPath = `${RNFetchBlob.fs.dirs.SDCardDir}/${bookUrl}/${book_name}`;

  let newServer = new StaticServer(
    0,
    `${RNFS.DocumentDirectoryPath}/${EPUB_IMPORT_LOCAL_DIR_NAME}`,
    serverConfig,
  );
  newServer.start().then((url) => {
    setState({
      bookUrl: url +"/"+ book_name,
      server: newServer,
    });
  });
  return () => {
    state.server && state.server.stop();
  };

  
  } 

      function goPrev() {
        webview.current?.injectJavaScript(`window.rendition.prev()`);
      }
    
      function goNext() {
        webview.current?.injectJavaScript(`window.rendition.next()`);
      }
     

      let injectedJS = `window.BOOK_PATH = "${state.bookUrl}";
     
      `;
      function handleMessage(e) {
          console.log("Metadata"+e.nativeEvent.data)

      }
    
  
  return (
    <>
     

  
 <WebView 
          ref={webview}
          source={{ uri:'file:///android_asset/epub_renderer.html'}}            
  injectedJavaScriptBeforeContentLoaded={injectedJS} 
  onMessage={handleMessage}

            />   
                     


             <GestureRecognizer
        onSwipeLeft={goPrev}
        onSwipeRight={goNext}
        config={config}
        
        ></GestureRecognizer>
<TouchableOpacity				onPress={goPrev}
				
			>
<Text>Prev</Text>
        </TouchableOpacity>
<TouchableOpacity				onPress={goNext}
				
			>
<Text>next</Text>
        </TouchableOpacity>
       
     
    </>
  );

  }

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    bookUrl:state.userReducer.book_url,
    book_name:state.userReducer.current_book_name
  };
};
export default connect(mapStateToProps)(Reader);
