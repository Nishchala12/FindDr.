import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase'
require('firebase/auth')

let phoneHeight = Dimensions.get('window').height;
let phoneWidth = Dimensions.get('window').width;
let hf = phoneHeight/738.1818181818181;
let wf = phoneWidth/392.72727272727275;

class HospitalRequestForm extends Component {
    state = {
      duration: '',
      location: '',
      qualify: '',
      hname: '',
      haddr: '',
      user: {}
    }
    
  componentDidMount() {
      firebase.database().ref('users/'+firebase.auth().currentUser.uid).once('value', (user) =>{
          this.setState({ user: user.val() })
          })
  }

    writeRequestData() {
      if(this.state.hname==''||this.state.duration==''||this.state.location==''||this.state.qualify==''||this.state.haddr=='')
      {
        Toast.show("Kindly fill in all the fields.")
      }
      else
      {
      const now = new Date()  
      const reqID ='H_'+Math.round(now.getTime());

      let obj = {doctorname: this.state.user.dname, phone: this.state.user.phone, email: this.state.user.email, 
        hospitalname: this.state.hname, duration: this.state.duration, location: this.state.location, 
        qualifications: this.state.qualify, hospitaladdress: this.state.haddr, status: 0, photo: this.state.user.photo,}

      var user = firebase.auth().currentUser
      var userId = user.uid
      var updateRequests = {};
      updateRequests['requests/hospital/'+reqID] = obj;
      updateRequests['users/'+userId+'/myrequests/'+reqID] = '';

      firebase.database().ref().update(updateRequests)
      .then(()=>{
        console.log('Success');
        Toast.show("Submission Successful!")  
        this.setState({duration: '', location: '', qualify: '', haddr:'', hname:'' })
        }).catch((error)=>{
          console.log('error ' , error);
        })
      }
    }

    render()
    {
      return(
        <LinearGradient colors = {['#fff', '#ADD8E6' ]} style = {styles.gradientStyle}>
          <ScrollView>
            <Image source = {require('../../../Images/requestform.png')}
            style = { styles.imageStyle } tintColor ="#59bfff"
            />
            <Text style = {{alignSelf:'center', fontSize: 16, color: '#59bfff', marginBottom: hf*20}}>Enter Doctor's Details</Text>

              <TextInput
              placeholder= 'Hospital Name'
              autoCorrect = { false }
              value={this.state.hname}
              onChangeText={hname => this.setState({ hname })}
              style = { styles.inputStyle }
              ></TextInput>

              <TextInput
              placeholder= 'Hospital Address'
              autoCorrect = { false }
              value={this.state.haddr}
              onChangeText={haddr => this.setState({ haddr })}
              multiline = { true }
              style = { styles.inputStyle1 }
              ></TextInput>

              <TextInput
              placeholder= 'Duty Location'
              autoCorrect = { false }
              value={this.state.location}
              onChangeText={location => this.setState({ location })}
              style = { styles.inputStyle }
              ></TextInput>

              <TextInput
              placeholder= 'Duty Duration: (Start - End)'
              autoCorrect = { false }
              value={this.state.duration}
              onChangeText={duration => this.setState({ duration })}
              style = { styles.inputStyle }
              ></TextInput>

              <TextInput
              placeholder= 'Qualifications Required'
              autoCorrect = { false }
              value={this.state.qualify}
              onChangeText={qualify => this.setState({ qualify })}
              style = { styles.inputStyle }
              ></TextInput>

              <TouchableOpacity style={styles.buttonStyle} onPress={() => {this.writeRequestData()}}> 
                <Text style ={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
          );
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
        paddingLeft: 10,
    },

    inputStyle1: {
      backgroundColor: '#fdfdfd',
      borderRadius: 30,
      height: hf*100,
      width: wf*300,
      paddingBottom: 2,
      paddingTop: 2,
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: hf*15,
      paddingLeft: 10,
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
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: hf*10,
      marginBottom: hf*20
    },

    textContainerStyle: {
      backgroundColor: '#fdfdfd',
      borderRadius: 50,
      height: hf*40,
      width: wf*300,
      paddingBottom: 2,
      paddingTop: 2,
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: hf*15,
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
      height: hf*100,
      width: wf*300,
      paddingBottom: 2,
      paddingTop: 2,
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: hf*15,
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
    marginTop: hf*30
  },
  
   imageStyle: {
     height: hf*100,
     width: wf*100,
     marginBottom: hf*30,
     marginTop: hf*30,
     alignSelf: 'center'
   },

   gradientStyle: {
    height: '100%'
  },

  };

export default HospitalRequestForm;

