/**
 * Sample React Native Reader
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, Platform, useWindowDimensions, View} from 'react-native';
import {Container, Header, Content, Footer, Title, ActionSheet} from 'native-base';
import SideMenu from 'react-native-side-menu';
import {Actions} from 'react-native-router-flux';

import GestureRecognizer from 'react-native-swipe-gestures';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Slider from 'react-native-slider';
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
  setAuthorName,
  setBookName,
  setSelectedWordinParagraph,
  setSelectedWordinSentence,
} from '../redux/actions/activeBookActions';

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const Reader = ({activeBookFileName, selectedWord, book_location, dispatch}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [sliderValue, setSliderValue] = useState(1);
  const serverConfig = {localOnly: true, keepAlive: true};
  const [isDrawer, setDrawer] = useState(false);
  const [locations, setLocations] = useState([]);
  const webview = useRef();

  function startServer() {
    let newServer = new StaticServer(0, `${RNFS.DocumentDirectoryPath}/${EPUB_IMPORT_LOCAL_DIR_NAME}`, serverConfig);
    newServer.start().then((url) => {
      const book_url = url + '/' + activeBookFileName;
      logger.debug(`Book should be available at ${book_url}`);
      setTimeout(() => {
        webview.current?.injectJavaScript(
          `(function() {renderEpubFile("${book_url}",${windowWidth},${windowHeight * 0.7});})()`,
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
    webview.current?.injectJavaScript('(function() {window.rendition.prev();})()');
  }

  function goNext() {
    webview.current?.injectJavaScript('(function() {window.rendition.next();})()');
  }
  function openDictionary() {
    //alert("selectedWord")
    dispatch(setSelectedWordinSentence('Kinship was an assertion'));
    dispatch(
      setSelectedWordinParagraph(
        'Helena had begun an effort to market an enchanting part of its history, the blues, at the old train depot, which was converted to a museum. The museum shares stories and photos of black musicians who sang in Helena, lived in Helena, visited Helena, used Helena as a stepping-stone to Chicago, or retired in Helena when Chicago didn’t work out. Their names are evocative, often involving infirmity or animals: Blind Lemon Jefferson, Howlin’ Wolf, Super Chikan. Exhibits here have hopeful titles—A Heritage of Determination, reads one, or Struggle in a Bountiful Land—but few visitors.',
      ),
    );
    return Actions.dictionary();
  }

  function onMessage(e) {
    let parsedData = JSON.parse(e.nativeEvent.data);
    let {type, selected, data} = parsedData;
    console.log('selected:: ', selected);
    console.log('data:: ', data);
    console.log(e.nativeEvent.data);
    switch (type) {
      case 'selected': {
        dispatch(setSelectedWord(selected));
      }
      case 'loc': {
      }
      case 'key':
      case 'metadata': {
        dispatch(setAuthorName(parsedData.author));
        dispatch(setBookName(parsedData.title));
      }
      case 'contents':
      case 'locations':
      default:
        return;
    }
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
  const contents = <Text>Content2 </Text>;
  return (
    <SideMenu menu={contents} isOpen={isDrawer} menuPosition="right" onChange={setDrawer}>
      <GestureRecognizer
        onSwipeLeft={goPrev}
        onSwipeRight={goNext}
        config={config}
        style={{
          flex: 1,
        }}>
        <WebView ref={webview} source={platform_independent_webview_source} onMessage={onMessage} />
      </GestureRecognizer>
      {/* {!_.isUndefined(selectedWord) && <DictionaryModal />} */}
      <Footer style={styles.wrapper}>
        <TouchableOpacity onPress={openDictionary}>
          <View>
            <Icon name="volume-up" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDictionary}>
          <View>
            <Icon name="volume-off" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDictionary}>
          <View>
            <Icon name="microphone" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goPrev}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          maximumValue={100}
          minimumValue={0}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(parseInt(value))}>
          <Text>Value:{sliderValue} </Text>
        </Slider>
        <TouchableOpacity onPress={goNext}>
          <Text>next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDictionary}>
          <View>
            <Icon name="book" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.reader();
          }}>
          <View>
            <Icon name="times" size={20} />
          </View>
        </TouchableOpacity>
      </Footer>
    </SideMenu>
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
const styles = {
  wrapper: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  slider: {
    width: '35%',
    height: 6,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
};
