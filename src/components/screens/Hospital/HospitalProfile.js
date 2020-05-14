import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase'
require('firebase/auth')

class HospitalProfile extends Component
{
    state = {
        user: {},
        editText: false,
        profileText: 'Edit Profile',
        transparency: 'transparent'
    }

    
    componentDidMount() 
    {
       firebase.database().ref('users/'+firebase.auth().currentUser.uid).once('value', (user) =>{
       this.setState({ user: user.val() })
       })
    }

    editProfile() {
        if(this.state.editText==false){
            this.setState({ editText: true, profileText: 'Save Profile', transparency: '#59bfff' });
        }
        else
        {
            var user = firebase.auth().currentUser
            var userId = user.uid
            firebase.database().ref('users/'+userId).update ({
                hname: this.state.user.hname,
                dname: this.state.user.dname,
                email: this.state.user.email,
              }).then(()=>{
                      console.log('Success');
                      Toast.show("Profile Successfully Updated")
                  }).catch((error)=>{
                    Toast.show("Update Error")
                      console.log('error ' , error);
                  })
            this.setState({ editText: false, profileText: 'Edit Profile', transparency: 'transparent' }); 
        }
    }

    
    saveProfile(text, resp) {
        let u = this.state.user;
        u[text] = resp;
        this.setState({user: u});
        
    }

   /* handleImage()
    {
        if(this.state.user1.ImageURL!=null)
        {
        return(<View style = {styles.imageContainerStyle}>
        <Image source = {{uri: this.state.user1.ImageURL}} style ={{height: 300, width: 300}} />
        </View>);
        }
        else{
            return(<View style = {styles.imageContainerStyle}>
            <Text>No Profile Photo Uploaded</Text>
            </View>);
        }
    }*/

    render() 
    {
        return(
            <View style = {{ backgroundColor: '#fdfdfd', height: 800 }}>
                <View style = { styles.headerStyle}>
                    <TouchableOpacity onPress = {() =>{ this.editProfile()}} style = {styles.saveButtonStyle}>
                        <Text style ={{color: "#59bfff", fontSize: 14, alignSelf: 'center'}}>{ this.state.profileText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { styles.logoutStyle } onPress = {() =>{ firebase.auth().signOut()
                                                this.props.navigation.navigate('Login')}}>
                        <Text style = {{fontSize: 16,  alignSelf: 'center', marginRight: 120, color: '#fdfdfd'}}>Logout</Text>
                    </TouchableOpacity>
            </View>
        <KeyboardAwareScrollView>
                    <Image source = {require('../../../Images/profile.png')}
                    style = { styles.imageStyle } tintColor ="#59bfff"
                />
             <View style = {{marginBottom: 25, marginLeft: 60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
            <Text style = {styles.textStyle}>Hospital Name:</Text>
           <TextInput
           secureTextEntry = { false }
           placeholder= 'Hospital Name'
           underlineColorAndroid = { this.state.transparency }
           placeholderTextColor = '#222222'
           autoCorrect = { false }
           value={this.state.user.hname}
           onChangeText={(hn) => this.saveProfile('hname', hn)}
           style = { styles.inputStyle }
           editable = {this.state.editText}
            ></TextInput>
            </View>
    
            <View style = {{marginBottom: 25, marginLeft: 60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
            <Text style = {styles.textStyle}>Doctor Name:</Text>
           <TextInput
           secureTextEntry = { false }
           placeholder= 'Doctor Name'
           placeholderTextColor = '#222222'
           underlineColorAndroid = { this.state.transparency }
           autoCorrect = { false }
           value={this.state.user.dname}
           onChangeText={(dn) => this.saveProfile('dname', dn)}
           style = { styles.inputStyle }
           editable = {this.state.editText}
            ></TextInput>
            </View>

            <View style = {{marginBottom: 25, marginLeft: 60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
            <Text style = {styles.textStyle}>Email:</Text>
           <TextInput
           secureTextEntry = { false }
           placeholder= 'user@gmail.com'
           placeholderTextColor = '#222222'
           underlineColorAndroid = { this.state.transparency }
           autoCorrect = { false }
           value={this.state.user.email}
           onChangeText={(e) => this.saveProfile('name', e)}
            autoCapitalize='none'
           style = { styles.inputStyle }
           editable = {this.state.editText}
            ></TextInput>
            </View>
          </KeyboardAwareScrollView>
        </View>
        
            );
        }
    }
    
    const styles = {
    
        logoutStyle: {
            marginLeft: 190,
        },
    
        headerStyle: {
            height: 50,
            backgroundColor: '#59bfff',
            elevation: 30,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25
        },
    
        saveButtonStyle:{
          backgroundColor: '#fdfdfd',
          borderRadius: 30,
          width: 100,
          height: 30,
          justifyContent: 'center',
          alignSelf: 'center',
          marginLeft: 120,
          marginRight: 200,
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: 10,
          marginBottom:10
        },
    
        gradientStyle: {
            height: 670
        },
    
        imageContainerStyle: {
            alignItems: 'center',
            alignSelg: 'center',
            justifyContent: 'center'
        },
    
        inputStyle: {
            marginRight: 5,
            color:'#222222',
            height: 30,
            width: 250,
            paddingTop: 0,
            paddingBottom: 0,
            marginLeft: 10,
            flexWrap: 'wrap',
            paddingBottom: 10,
            
          },
    
          textStyle: {
              marginLeft: 15,
              fontWeight: 'bold',
              color: '#59bfff'
    
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
    }

export default HospitalProfile;