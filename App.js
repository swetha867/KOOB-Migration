/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {ExternalStorageDirectoryPath} from 'react-native-fs';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {WebView} from 'react-native-webview';
import StaticServer from 'react-native-static-server';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNFileSelector from 'react-native-file-selector';

import RNFS from 'react-native-fs';
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};
const App = () => {
  const serverConfig = {localOnly: true, keepAlive: true};
  const webview = useRef();
  const [visible, setVisible] = useState(true);
  const [book, setBook] = useState('');
  const [showBook, setShowBook] = useState(true);
  const [state, setState] = useState({bookUrl: null, server: null});
  const bookLocations =useState("");
  const myHtmlFile = require("./pages/epub.html");





  function _onPress() {
    let filter;
    // if (Platform.OS === 'ios') {
    //   filter = [];
    // } else if (Platform.OS === 'android') {
    //   filter = '*\\.(epub|EPUB|pdf|PDF)$';
    // }
    //  let granted = await checkStoragePermissions();
    //if (!granted) await getStoragePermission();
    RNFileSelector.Show({
      title: 'Select epub file',
      filter: '.*\\.(epub|EPUB|pdf|PDF)$',
      onDone: (url) => {
        let components = url.split('/');
        let file = components[components.length - 1].split('.');
        // if (file[file.length - 1] !== 'epub') {
        // 	return showToast('Invalid file. Only "epub" files are allowed');
        // }
        console.log(url);

        setShowBook(true);

        setBook(url);
        startServer(url);
      },
      onCancel: () => {},
    });

   

  }
  function startServer(url) {
    console.log("book"+url);

    let newone = url.replace(ExternalStorageDirectoryPath, '');
    let newServer = new StaticServer(
      0,
      ExternalStorageDirectoryPath,
      serverConfig,
    );
    newServer.start().then((url) =>
          setState({
            bookUrl: url + newone,
            server: newServer
      }))

       return () => {
        state.server && state.server.stop();
      };

    }
      console.log('url' + state.bookUrl);
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
          source={{ uri:'file:///android_asset/epub_renderer.html'}}            
            
            />
             <GestureRecognizer
        onSwipeLeft={goPrev}
        onSwipeRight={goNext}
        config={config}
        
        ></GestureRecognizer>
<TouchableOpacity	style={styles.container}			onPress={goPrev}
				
			>
<Text>Prev</Text>
        </TouchableOpacity>
<TouchableOpacity				onPress={goNext}
				
			>
<Text>next</Text>
        </TouchableOpacity>
       
     
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
    wholeScreen: { flex: 1 },
   
  
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;