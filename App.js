import React, { Component } from 'react';
import { StatusBar, View, Text  } from 'react-native'; 
import Root from './src/components/Root';
import firebase from 'firebase'
require('firebase/auth')


class App extends Component {

 componentDidMount() {
  if (!firebase.apps.length)
  {
    firebase.initializeApp
            ({
                apiKey: "AIzaSyCM4h-n-wO3nVhKag9kFm6n9HpQBapHvbA",
                authDomain: "authentication-65bd1.firebaseapp.com",
                databaseURL: "https://authentication-65bd1.firebaseio.com",
                projectId: "authentication-65bd1",
                storageBucket: "authentication-65bd1.appspot.com",
                messagingSenderId: "929964816709",
                appId: "1:929964816709:web:14998e55a241355f0da62c",
                measurementId: "G-R93QY2L56F"
              });
  } 
}


  render() {
    return (
        <Root />
    );
  }
}



export default App;