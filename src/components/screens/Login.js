import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import firebase from 'firebase'
require('firebase/auth')

let phoneHeight = Dimensions.get('window').height;
let phoneWidth = Dimensions.get('window').width;
let hf = phoneHeight/738.1818181818181;
let wf = phoneWidth/392.72727272727275;

class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        loggedin: true,
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

      console.log(phoneHeight)
      console.log(phoneWidth)
      console.log(hf)
      console.log(wf)



    }

    handleLogin = () => {
        const { email, password } = this.state
        this.setState({loading: true})
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {this.onLoginSuccess()
                  })
            .catch((error) => {Toast.show("Login error")
                  console.log(error) 
                  this.setState({loading: false})
                  })

    }


    onLoginSuccess() {

      firebase.database().ref('users/'+firebase.auth().currentUser.uid).on('value', (user) =>{
        this.setState({ user: user.val() })
      if(user.val() && user.val() != null && user.val().role==0)
      {
        this.props.navigation.dispatch(
          StackActions.replace('PatientLoggedIn'))
      }
      else if(user.val() && user.val() != null && user.val().role==1)
      {
        this.props.navigation.dispatch(
          StackActions.replace('DoctorLoggedIn'))
      }
      else if(user.val() && user.val() != null && user.val().role==2)
      {
        this.props.navigation.dispatch(
          StackActions.replace('HospitalLoggedIn'))
      }
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
       if (this.state.loggedin)
      {
        return(
          <View style = {{ alignItems: 'center', height: '100%', alignSelf: 'center'}}>
            <Image source = {require('../../Images/logo.png')}
            style = { [styles.imageStyle, {marginTop: hf*120}] }
            />
            <ActivityIndicator size = { "large" } style = {{marginTop: hf*100}} color = "#59bfff"/>
          </View>
        );
      }
      else
      {
    return(
      <LinearGradient colors = {['#fff', '#ADD8E6' ]} style = {styles.gradientStyle}>
        <Image source = {require('../../Images/logo.png')}
        style = { styles.imageStyle }
        />

        <TextInput
        secureTextEntry = { false }
        placeholder= 'Email'
        autoCorrect = { false }
        value={this.state.email}
        autoCapitalize='none'
        onChangeText={email => this.setState({ email })}
        style = { styles.inputStyle }
        ></TextInput>

        <TextInput
        secureTextEntry = { true }
        placeholder= 'Password'
        autoCorrect = { false }
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
        style = { styles.inputStyle }
        ></TextInput>
            
          <View>
            {this.renderButton()}
          </View>  

          <View style = {{flexDirection: 'row', marginTop: hf*40, alignSelf:"center"}}>
            <Text style = {{color: '#777', fontSize: 16}}>New User? </Text>
            <TouchableOpacity onPress = {() =>{this.props.navigation.navigate('Signup')}}>
              <Text style ={{color: "#1589ff", fontSize: 16}}>Get started here!</Text>
            </TouchableOpacity>
          </View>
          
          <View style ={{alignSelf: 'center', alignItems: 'center', marginTop: hf*100}}>
            <Text style = {{color: '#777'}}>Customer Care Helpline:</Text>
            <Text style = {{color: '#777'}}>9483763648 | nishchalamkumar12@gmail.com</Text>
          </View>
      </LinearGradient>

    );
      }
    }
  }


const styles = {

    inputStyle: {
      backgroundColor: '#fdfdfd',
      borderRadius: 50,
      height: hf*40,
      width: wf*300,
      paddingBottom: 2,
      paddingTop: 2,
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: hf*15,
      marginTop: hf*2,
      paddingLeft: 10,
      flexWrap: 'wrap'
    },

    gradientStyle: {
      height: '100%'
    },
  
    buttonStyle: {
      color: '#222222',
      backgroundColor: '#59bfff',
      borderRadius: 30,
      width: wf*100,
      height: hf*40,
      justifyContent: 'center',
      alignSelf: 'center',
      marginLeft: wf*5,
      marginRight: wf*5,
      paddingTop: 7,
      paddingBottom: 10,
      marginTop: hf*10
    },
  
    textStyle: {
      alignSelf: 'center',
      color: '#fdfdfd',
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
  
    labelStyle: {
      fontSize: 18,
      paddingTop: 9,
      marginLeft: wf*10
   },

   spinnerStyle: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: hf*50
   },
  
   imageStyle: {
     height: hf*200,
     width: wf*200,
     marginBottom: hf*50,
     marginTop: hf*70,
     alignSelf: 'center',
     resizeMode: 'contain'
  
   },

  };

export default Login;

