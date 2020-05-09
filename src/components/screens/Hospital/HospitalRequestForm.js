import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase'
require('firebase/auth')


class HospitalRequestForm extends Component {
    state = {
      dname: '',
      hname: '',
      duration: '',
      location: '',
      qualify: '',
      haddr: ''
    }


    writeRequestData() {
      const now = new Date()  
      const reqID ='H_'+Math.round(now.getTime());

      let obj = {doctorname: this.state.dname, hospitalname: this.state.hname, 
        duration: this.state.duration, location: this.state.location, 
        qualifications: this.state.qualify, hospitaladdress: this.state.haddr
      }

      var user = firebase.auth().currentUser
      var userId = user.uid
      var updateRequests = {};
      updateRequests['requests/hospital/'+reqID] = obj;
      updateRequests['users/'+userId+'/myrequests/'+reqID] = '';

      firebase.database().ref().update(updateRequests)
      .then(()=>{
        console.log('Success');
        Toast.show("Submission Successful!")  
        this.setState({dname:'', hname: '', duration: '', location: '', qualify: '', haddr:'' })
        }).catch((error)=>{
          console.log('error ' , error);
        })
    }

    render()
    {
      return(
        <LinearGradient colors = {['#fff', '#ADD8E6' ]} style = {styles.gradientStyle}>
          <KeyboardAwareScrollView>
            <Image source = {require('../../../Images/abc.png')}
            style = { styles.imageStyle } tintColor ="#59bfff"
            />
            <Text style = {{alignSelf:'center', fontSize: 16, color: '#59bfff', marginBottom: 20}}>Enter Doctor's Details</Text>

            <View style = { styles.textContainerStyle }>
              <TextInput
              placeholder = 'Doctor Name'
              autoCorrect = { false }
              value = {this.state.dname}
              onChangeText = {dname => this.setState({ dname })}
              style = { styles.inputStyle }
                ></TextInput>
            </View>

            <View style = { styles.textContainerStyle }>
              <TextInput
              placeholder= 'Hospital Name'
              autoCorrect = { false }
              value={this.state.hname}
              onChangeText={hname => this.setState({ hname })}
              style = { styles.inputStyle }
                ></TextInput>
            </View>

            <View style = { styles.textContainerStyle1 }>
              <TextInput
              placeholder= 'Hospital Address'
              autoCorrect = { false }
              value={this.state.haddr}
              onChangeText={haddr => this.setState({ haddr })}
              multiline = { true }
              style = { styles.inputStyle }
              ></TextInput>
            </View>

            <View style = { styles.textContainerStyle }>
              <TextInput
              placeholder= 'Duty Location'
              autoCorrect = { false }
              value={this.state.location}
              onChangeText={location => this.setState({ location })}
              style = { styles.inputStyle }
              ></TextInput>
            </View>

            <View style = { styles.textContainerStyle }>
              <TextInput
              placeholder= 'Duty Duration: (Start - End)'
              autoCorrect = { false }
              value={this.state.duration}
              onChangeText={duration => this.setState({ duration })}
              style = { styles.inputStyle }
              ></TextInput>
            </View>

            <View style = { styles.textContainerStyle }>
              <TextInput
              placeholder= 'Qualifications Required'
              autoCorrect = { false }
              value={this.state.qualify}
              onChangeText={qualify => this.setState({ qualify })}
              style = { styles.inputStyle }
              ></TextInput>
            </View>

            <View>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => {this.writeRequestData()}}> 
                <Text style ={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
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
      height: 40,
      justifyContent: 'center',
      alignSelf: 'center',
      marginLeft: 5,
      marginRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 10
    },

    textContainerStyle: {
      backgroundColor: '#fdfdfd',
      borderRadius: 50,
      height: 40,
      width: 300,
      paddingBottom: 2,
      paddingTop: 2,
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 15,
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
  
    textContainerStyle1: {
      backgroundColor: '#fdfdfd',
      borderRadius: 30,
      height: 100,
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
  
   imageStyle: {
     height: 100,
     width: 100,
     marginBottom: 30,
     marginTop: 30,
     alignSelf: 'center'
   },

   gradientStyle: {
    height: 670
  },

  };

export default HospitalRequestForm;
