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

class PRequests extends Component {
    state = {
        name: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        raddr: '',
        complaints: '',
        user: {}
    }

    componentDidMount() {
        firebase.database().ref('users/'+firebase.auth().currentUser.uid).on('value', (user) =>{
            this.setState({ user: user.val() })
            })
    }

    importAddress () {
        this.setState({raddr: this.state.user.raddr, name: this.state.user.name, email: this.state.user.email, phone: this.state.user.phone, age: this.state.user.age, gender: this.state.user.gender })
    }

    writeRequestData()
   {
        if(this.state.name==''||this.state.age==''||this.state.gender==''||this.state.phone==''||this.state.email==''||this.state.raddr==''||this.state.complaints=='')
        {
        Toast.show("Kindly fill in all the fields")
        }
        else
        {
        const now = new Date()  
        const reqID = 'P_'+Math.round(now.getTime())
        
        var user = firebase.auth().currentUser
        var userId = user.uid

        let obj = {profilename: this.state.user.name, name: this.state.name, age: this.state.age, 
            email: this.state.email, gender: this.state.gender, photo: this.state.user.photo,
            phone: this.state.phone, raddr: this.state.raddr, complaints: this.state.complaints, status: 0}

        var updateRequests = {};
        updateRequests['requests/patient/'+reqID] = obj;

        updateRequests['users/'+userId+'/myrequests/'+reqID] = '';

        firebase.database().ref().update(updateRequests)
        .then(()=>{
            console.log('Success');
            Toast.show("Submission successful!")   
            this.setState({name: '', age: '', email: '', gender: '', phone: '', raddr: '', complaints: ''})
            }).catch((error)=>{
                console.log('error ' , error);
            })
        }
    }

    render()
    {
    return(
    <LinearGradient colors = {['#fff', '#ADD8E6' ]} style = {styles.gradientStyle}>
        <ScrollView keyboardShouldPersistTaps='always'>
            
            <Image source = {require('../../../Images/requestform.png')}
            style = { styles.imageStyle } tintColor ="#59bfff"
            />

            <Text style = {{alignSelf:'center', fontSize: 16, color: '#59bfff', marginBottom: hf*20}}>Enter Patient's Details</Text>
            
            <TouchableOpacity style = {styles.importButtonStyle} onPress={() => {this.importAddress()}}>
                <Text style ={{color: "#59bfff", fontSize: 14, fontWeight: 'bold'}}>Same as Profile</Text>
            </TouchableOpacity>

            <TextInput
            placeholder = ' Full Name'
            autoCorrect = { false }
            value = {this.state.name}
            onChangeText = {name => this.setState({ name })}
            style = { styles.inputStyle }
            ></TextInput>
        
            <TextInput
            placeholder= 'Email'
            autoCorrect = { false }
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style = { styles.inputStyle }
            ></TextInput>

            <TextInput
            placeholder= 'Contact No.'
            autoCorrect = { false }
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            style = { styles.inputStyle }
            ></TextInput>

            <TextInput
            placeholder= 'Age'
            autoCorrect = { false }
            value={this.state.age}
            onChangeText={age => this.setState({ age })}
            style = { styles.inputStyle }
            ></TextInput>

            <TextInput
            placeholder= 'Gender'
            autoCorrect = { false }
            value={this.state.gender}
            onChangeText={gender => this.setState({ gender })}
            style = { styles.inputStyle }
            ></TextInput>

            <TextInput
            placeholder= 'Residential Address'
            autoCorrect = { false }
            value={this.state.raddr}
            onChangeText={raddr => this.setState({ raddr })}
            style = { styles.inputStyle1 }
            multiline = { true } 
            ></TextInput>
    
            <TextInput
            placeholder= 'Complaints - (Duration)'
            autoCorrect = { false }
            value={this.state.complaints}
            onChangeText={complaints => this.setState({ complaints })}
            style = { styles.inputStyle1 }
            multiline = { true } 
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
        flexWrap: 'wrap',
        backgroundColor: '#fdfdfd',
        borderRadius: 50,
        height: hf*40,
        width: wf*300,
        paddingBottom: 2,
        paddingTop: 2,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: hf*15,
        paddingLeft: 10
      
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
        paddingLeft: 10
    },

    gradientStyle: {
        height: '100%'
    },

    logoutStyle: {
        alignSelf: 'center', 
        alignItems: 'center',
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
        marginTop: hf*5,
        marginBottom: hf*25
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

    importButtonStyle: {
        alignSelf: 'flex-end',
        marginRight: wf*60,
        marginBottom: hf*5
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
        height: hf*120,
        width: wf*120,
        marginBottom: hf*30,
        marginTop: hf*30,
        alignSelf: 'center',
        resizeMode: 'contain'
  
   }
  };

export default PRequests;

