/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React, {useEffect, useState, useRef,useContext} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';


// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import { connect } from "react-redux";



// // import { NativeRouter, Route, Link,Switch } from "react-router-native";
// import { ReactDOM, BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import Home from "./pages/Home";
// import Learning from "./pages/Learning";
// import Login from "./pages/Login";
// const config = {
//   velocityThreshold: 0.3,
//   directionalOffsetThreshold: 80
// };

import React from 'react';

import { Provider } from 'react-redux';
import Router from './Root';
import {store,persistor} from './configureStore';
import { PersistGate } from 'redux-persist/integration/react';



export default class App extends React.Component {
  render () {

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <Router/>
        </PersistGate>
        </Provider>
    );  
    
  }
  
}
