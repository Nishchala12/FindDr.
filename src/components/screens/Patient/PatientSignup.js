import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase'
require('firebase/auth')

class PatientSignup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        loading: false,
        phone: '',
        raddr: ''
    } 


    handleSignUp = () => {
        const { email, password } = this.state

        this.setState({ loading: true })
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {Toast.show('Signed Up Successfully')
                        var user = firebase.auth().currentUser
                        var userId = user.uid
                        this.writeUserData(userId, this.state.name,this.state.email, 0, this.state.phone, this.state.raddr)
                        this.setState({ loading: false })
                         this.props.navigation.navigate('PatientLoggedIn')
                          })
            .catch(error =>{this.setState({ loading: false})
                            Toast.show('Signup Error')
                            console.log(error)
                        })

                      }


   writeUserData( userId, name, email, role, phone, raddr)
   {
    firebase.database().ref('users/'+userId).set ({
      name: name,
      email: email,
      role: role,
      phone: phone,
      raddr: raddr
    }).then(()=>{
            console.log('Success');
            this.setState({ name: '',email: '', password: '', phone: '', raddr: '' })
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
    <Image source = {require('../../../Images/patient.png')}
    style = { styles.imageStyle } tintColor ="#59bfff"
    />
     <Text style = {{alignSelf:'center', fontSize: 16, fontWeight: 'bold', color: '#59bfff', marginBottom: 30}}>Sign Up as a Patient!</Text>
  <View style = { styles.textContainerStyle }>
   <TextInput
   secureTextEntry = { false }
   placeholder= 'Full Name'
   autoCorrect = { false }
   value={this.state.name}
   onChangeText={name => this.setState({ name })}
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

   <View style = { styles.textContainerStyle }>
   <TextInput
   secureTextEntry = { false }
   placeholder= 'Contact No.'
   autoCorrect = { false }
   value={this.state.phone}
   onChangeText={phone => this.setState({ phone })}
   style = { styles.inputStyle }
    ></TextInput>
    </View>

    <View style = { styles.textContainerStyle1 }>
   <TextInput
   secureTextEntry = { false }
   placeholder= 'Residential Address'
   autoCorrect = { false }
   value={this.state.raddr}
   onChangeText={raddr => this.setState({ raddr })}
   style = { styles.inputStyle }
   multiline = { true }
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

    gradientStyle: {
        height: 670
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

   spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },

  textContainerStyle1: {
    backgroundColor: '#fff',
    borderRadius: 30,
    height: 100,
    width: 300,
    paddingBottom: 2,
    paddingTop: 2,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
  },
  
   imageStyle: {
     height: 200,
     width: 200,
     marginBottom: 30,
     marginTop: 40,
     alignSelf: 'center'
  
   }
  };

export default PatientSignup;

