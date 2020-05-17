import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase'
require('firebase/auth')


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
        this.setState({raddr: this.state.user.raddr})
    }

    writeRequestData()
   {
        if(this.state.name==''||this.state.age==''||this.state.gender==''||this.state.phone==''||this.state.email==''||this.state.raddr==''||this.state.complaints=='')
        {
        Toast.show("Kindly fill in all the fields.")
        }
        else
        {
        const now = new Date()  
        const reqID = 'P_'+Math.round(now.getTime())
        
        var user = firebase.auth().currentUser
        var userId = user.uid

        let obj = {profilename: this.state.user.name, name: this.state.name, age: this.state.age, 
            email: this.state.email, gender: this.state.gender, 
            phone: this.state.phone, raddr: this.state.raddr, complaints: this.state.complaints, status: 0}

        var updateRequests = {};
        updateRequests['requests/patient/'+reqID] = obj;

        updateRequests['users/'+userId+'/myrequests/'+reqID] = '';

        firebase.database().ref().update(updateRequests)
        .then(()=>{
            console.log('Success');
            Toast.show("Submission Successful!")   
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
        <KeyboardAwareScrollView>
            <Image source = {require('../../../Images/requestform.png')}
            style = { styles.imageStyle } tintColor ="#59bfff"
            />

            <Text style = {{alignSelf:'center', fontSize: 16, color: '#59bfff', marginBottom: 20}}>Enter Patient's Details</Text>

            <TextInput
            placeholder = ' Full Name'
            autoCorrect = { false }
            value = {this.state.name}
            onChangeText = {name => this.setState({ name })}
            style = { styles.inputStyle }
            ></TextInput>
        
            <TextInput
            placeholder= 'user@gmail.com'
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
       

            <TouchableOpacity style = {styles.importButtonStyle} onPress={() => {this.importAddress()}}>
                <Text style ={{color: "#59bfff", fontSize: 14, fontWeight: 'bold'}}>Import from Profile</Text>
            </TouchableOpacity>

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

    </KeyboardAwareScrollView>
  </LinearGradient>
    );
   
    }
}

const styles = {

    inputStyle: {
        flexWrap: 'wrap',
        backgroundColor: '#fdfdfd',
        borderRadius: 50,
        height: 40,
        width: 300,
        paddingBottom: 2,
        paddingTop: 2,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 15,
        paddingLeft: 10
      
    },

    inputStyle1: {
        backgroundColor: '#fdfdfd',
        borderRadius: 30,
        height: 100,
        width: 300,
        paddingBottom: 2,
        paddingTop: 2,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 15,
        paddingLeft: 10
    },

    gradientStyle: {
        height: 670
    },

    logoutStyle: {
        alignSelf: 'center', 
        alignItems: 'center',
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
        marginTop: 5,
        marginBottom: 25
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
        height: 40,
        width: 300,
        paddingBottom: 2,
        paddingTop: 2,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 15,
    },

    importButtonStyle: {
        alignSelf: 'flex-end',
        marginRight: 60,
        marginBottom: 5
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
  
   }
  };

export default PRequests;

