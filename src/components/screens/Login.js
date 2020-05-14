import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import firebase from 'firebase'
require('firebase/auth')


class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        loggedin: null,
    }

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
      firebase.auth().onAuthStateChanged((user)=>
      {
          if(user)
          {
            this.setState({ loggedin: true });
            this.onLoginSuccess()
            
          }
          else
          {
            this.setState({ loggedin: false });
          }
      });



    }

    handleLogin = () => {
        const { email, password } = this.state
        this.setState({loading: true})
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {this.onLoginSuccess()
                  })
            .catch((error) => {Toast.show("Login Error")
                  console.log(error) 
                  this.setState({loading: false})
                  })

    }


    onLoginSuccess() {
      Toast.show("Logged In Successfully!")
      firebase.database().ref('users/'+firebase.auth().currentUser.uid).on('value', (user) =>{
        this.setState({ user: user.val() })
      if(user.val().role==0)
        this.props.navigation.navigate('PatientLoggedIn')
      else if(user.val().role==1)
       this.props.navigation.navigate('DoctorLoggedIn')
      else if(user.val().role==2)
       this.props.navigation.navigate('HospitalLoggedIn')
      })
      this.setState({email: '', password: '', loading: false})
    }

    renderButton() {
      if(this.state.loading)
      {
        return(<View style = { styles.spinnerStyle }>
          <ActivityIndicator size = { "large" } color = "#59bfff"/>
        </View>);

      }
      else
      {
      return(<TouchableOpacity style={styles.buttonStyle} onPress={this.handleLogin}> 
          <Text style ={styles.textStyle}>Login</Text>
      </TouchableOpacity>);
      }
    }

    render(){
       if (this.state.loggedin==null)
      {
        return(
          <View style = {{justifyContent: 'center', alignItems: 'center', width:300, height: 700, alignSelf: 'center'}}>
          <ActivityIndicator size = { "large" } color = "#59bfff"/>
          </View>
        );
      }
      else
      {
    return(
      <LinearGradient colors = {['#fff', '#ADD8E6' ]} style = {styles.gradientStyle}>
  <KeyboardAwareScrollView>
    <Image source = {require('../../Images/doctor.png')}
    style = { styles.imageStyle } tintColor='#59bfff'
    />
    <View style = { styles.textContainerStyle }>
   <TextInput
   secureTextEntry = { false }
   placeholder= 'user@gmail.com'
   autoCorrect = { false }
   value={this.state.email}
   autoCapitalize='none'
   onChangeText={email => this.setState({ email })}
   style = { styles.inputStyle }
    ></TextInput>
    </View>

   <View style = { styles.textContainerStyle }>
   <TextInput
   secureTextEntry = { true }
   placeholder= 'password'
   autoCorrect = { false }
   value={this.state.password}
   onChangeText={password => this.setState({ password })}
   style = { styles.inputStyle }
   ></TextInput>
   </View>
      
    <View>
      {this.renderButton()}
    </View>  

    <View style = {styles.logoutStyle}>
                <TouchableOpacity onPress = {() =>{this.props.navigation.navigate('Signup')}}>
    <Text style ={{color: "#59bfff", fontWeight: "bold", fontSize: 15}}>New User? Get started here!</Text>
                </TouchableOpacity>
    </View>
  </KeyboardAwareScrollView>
  </LinearGradient>

    );
      }
    }
  }


const styles = {

    inputStyle: {
      
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      marginLeft: 50,
      marginRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      flexWrap: 'wrap',
      width: 200
    },

    gradientStyle: {
      height: 800
    },
  
    buttonStyle: {
      color: '#222222',
      backgroundColor: '#59bfff',
      borderRadius: 30,
      width: 100,
      height: 50,
      justifyContent: 'center',
      alignSelf: 'center',
      marginLeft: 5,
      marginRight: 5,
      paddingTop: 7,
      paddingBottom: 10,
      marginTop: 10
    },
  
    textStyle: {
      alignSelf: 'center',
          color: '#fff',
          fontWeight: '600',
          fontSize: 18,
          paddingTop: 10,
          paddingBottom: 10,
    },
  
    containerStyle: {
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center'
    },
  
    textContainerStyle: {
      backgroundColor: '#fff',
      borderRadius: 50,
      height: 40,
      width: 300,
      paddingBottom: 2,
      paddingTop: 2,
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 15,
      marginTop: 2
    },
  
    labelStyle: {
      fontSize: 18,
      paddingTop: 9,
      marginLeft: 10
   },

   spinnerStyle: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 30
   },
  
   imageStyle: {
     height: 200,
     width: 200,
     marginBottom: 70,
     marginTop: 70,
     alignSelf: 'center'
  
   },

   logoutStyle: {
    alignSelf: 'center', 
    alignItems: 'center',
    marginTop: 40
  },
  };

export default Login;

