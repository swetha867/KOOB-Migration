/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { ActionConst, Lightbox, Modal, Scene, Stack, Router } from 'react-native-router-flux';
import React from 'react';


import Home from "./pages/Home";
import Learning from "./pages/Learning";
 import Login from "./pages/Login";
import Reader from "./pages/Reader";
export default function Root() {
  return(
    <Router>
    <Stack key="root">  

    <Scene key="home" component={Home} />

      <Scene key="login" component={Login} title="Login" />
      <Scene key="learning" component={Learning} title="Learning" />
      <Scene key="reader" component={Reader} title="Reader" />

    </Stack>
  </Router>
  )
}



