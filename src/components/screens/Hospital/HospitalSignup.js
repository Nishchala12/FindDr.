import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase'
require('firebase/auth')

class HospitalSignup extends Component {
    state = {
        hname: '',
        dname: '',
        email: '',
        password: '',
        loading: false
    } 


    handleSignUp = () => {
        const { email, password } = this.state

        this.setState({ loading: true })
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {Toast.show('Signed Up Successfully')
                        var user = firebase.auth().currentUser
                        var userId = user.uid
                        this.writeUserData(userId, this.state.hname, this.state.dname, this.state.email, 2)
                        this.setState({ loading: false })
                         this.props.navigation.navigate('HospitalLoggedIn')
                          })
            .catch(error =>{this.setState({ loading: false})
                            Toast.show('Signup Error')
                            console.log(error)
                        })

                      }


   writeUserData( userId, hname, dname, email, role)
   {
    firebase.database().ref('users/'+userId).set ({
      hname: hname,
      dname: dname,
      email: email,
      role: role
    }).then(()=>{
            console.log('Success');
            this.setState({ hname: '', dname: '',email: '', password: '' })
        }).catch((error)=>{
            //error callback
            console.log('error ' , error);
        })
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
      return(<TouchableOpacity style={styles.buttonStyle} onPress={this.handleSignUp}> 
                <Text style ={styles.textStyle}>Signup</Text>
             </TouchableOpacity>);
      }
    }

    render()
    {
    return(
    <LinearGradient colors = {['#fff', '#ADD8E6' ]} style = {styles.gradientStyle}>
 <KeyboardAwareScrollView>
    <Image source = {require('../../../Images/abc.png')}
    style = { styles.imageStyle } tintColor ="#59bfff"
    />
    <Text style = {{alignSelf:'center', fontSize: 16, fontWeight: 'bold', color: '#59bfff', marginBottom: 30}}>Sign Up as a Hospital!</Text>
  
  <View style = { styles.textContainerStyle }>
   <TextInput
   secureTextEntry = { false }
   placeholder= 'Hospital Name'
   autoCorrect = { false }
   value={this.state.hname}
   onChangeText={hname => this.setState({ hname })}
   style = { styles.inputStyle }
    ></TextInput>
    </View>
    
    <View style = { styles.textContainerStyle }>
   <TextInput
   secureTextEntry = { false }
   placeholder= 'Doctor - Full Name'
   autoCorrect = { false }
   value={this.state.dname}
   onChangeText={dname => this.setState({ dname })}
   style = { styles.inputStyle }
    ></TextInput>
    </View>

    <View style = { styles.textContainerStyle }>
   <TextInput
   secureTextEntry = { false }
   placeholder= 'user@gmail.com'
   autoCorrect = { false }
   value={this.state.email}
   onChangeText={email => this.setState({ email })}
    autoCapitalize='none'
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
      { this.renderButton() }
    </View>
  </KeyboardAwareScrollView>
  </LinearGradient>

    );
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
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 10,
      marginBottom: 20
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
    },
  
    labelStyle: {
      fontSize: 18,
      paddingTop: 9,
      marginLeft: 10
   },

   gradientStyle: {
     height: 670
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
    marginBottom: 30,
    marginTop: 40,
    alignSelf: 'center'
 
  }
  };

export default HospitalSignup;

