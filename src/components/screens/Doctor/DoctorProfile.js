import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase'
require('firebase/auth')

let phoneHeight = Dimensions.get('window').height;
let phoneWidth = Dimensions.get('window').width;
let hf = phoneHeight/738.1818181818181;
let wf = phoneWidth/392.72727272727275;

class DoctorProfile extends Component
{
    state = {
        user: {},
        editText: false,
        profileText: 'Edit Profile',
        transparency: 'transparent',
        newPhoto: ''  
    }
 
    componentDidMount() 
    {
       firebase.database().ref('users/'+firebase.auth().currentUser.uid).on('value', (user) =>{
       this.setState({ user: user.val(), newPhoto: user.val().photo })
       })
    }

    uploadPhoto = () => { 

          const options ={ noData: true }
          ImagePicker.launchImageLibrary(options, response => {
            console.log('response', response);
            if(response.didCancel)
            {
            console.log('Cancelled')
            }
            else if(response.error)
            {
              Toast.show('Error while uploading. Try Again.')
            }
            else
            {
                this.setState({newPhoto: response.uri})
            }  
    
          });
      
        }
        
      
      uriToBlob = (uri) => {
    
        return new Promise((resolve, reject) => {
    
          const xhr = new XMLHttpRequest();
    
          xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
          };
          
          xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
          };
    
          // this helps us get a blob
          xhr.responseType = 'blob';
    
          xhr.open('GET', uri, true);
          xhr.send(null);
    
        });
    
      }
    
      uploadToFirebase = (blob) => {
    
        return new Promise((resolve, reject)=>{
          
          firebase.storage().ref('/profile/'+firebase.auth().currentUser.uid+'.jpg').put(blob, {
            contentType: 'image/jpeg'
          }).then((snapshot)=>{
    
            blob.close();
    
            resolve(snapshot);
    
          }).catch((error)=>{
    
            reject(error);
    
          });
    
        });
    
    
      }      

    editProfile() {
        if(this.state.editText==false){
            this.setState({ editText: true, profileText: 'Save Profile', transparency: '#59bfff'});
        }
        else
        {
            if(this.state.user.name==''||this.state.user.email==''||this.state.user.DOB==''||this.state.user.age==''||this.state.user.phone==''||this.state.user.kmc==''||this.state.user.college==''||this.state.user.raddr==''||this.state.user.waddr==''||this.state.user.qualifications=='')
            {
                Toast.show('Kindly fill in all the fields.')
            }
            else 
            {
                if(this.state.newPhoto != this.state.user.photo) {
                let imageRef = firebase.storage().ref('/profile/'+firebase.auth().currentUser.uid+'.jpg')
                this.uriToBlob(this.state.newPhoto)
                  .then((blob)=>{
                    return this.uploadToFirebase(blob);
                  }).then((snapshot)=>{
                    console.log(snapshot)
                     return imageRef.getDownloadURL()
                  }).then(async (url) => {
                      console.log(url)
                      await firebase.database().ref('users/'+firebase.auth().currentUser.uid).update ({
                            name: this.state.user.name,
                            email: this.state.user.email,
                            kmc: this.state.user.kmc,
                            DOB: this.state.user.DOB,
                            age: this.state.user.age,
                            phone: this.state.user.phone,
                            photo: url,
                            college: this.state.user.college,
                            raddr: this.state.user.raddr,
                            waddr: this.state.user.waddr,
                            qualifications: this.state.user.qualifications
                            }).then(()=>{
                                    console.log('Success');
                                    Toast.show("Profile Successfully Updated")
                                }).catch((error)=>{
                                Toast.show("Update Error")
                                    console.log('error ' , error);
                                }) 
                  }).catch((error)=>{
                    console.log(error)
                    Toast.show('Sign Up not Successful')
                  })
                
                }
                else {
                    firebase.database().ref('users/'+firebase.auth().currentUser.uid).update ({
                        name: this.state.user.name,
                        email: this.state.user.email,
                        kmc: this.state.user.kmc,
                        DOB: this.state.user.DOB,
                        age: this.state.user.age,
                        phone: this.state.user.phone,
                        photo: this.state.user.photo,
                        college: this.state.user.college,
                        raddr: this.state.user.raddr,
                        waddr: this.state.user.waddr,
                        qualifications: this.state.user.qualifications
                        }).then(()=>{
                                console.log('Success');
                                Toast.show("Profile Successfully Updated")
                            }).catch((error)=>{
                            Toast.show("Update Error")
                                console.log('error ' , error);
                            }) 
                }

                this.setState({ editText: false, profileText: 'Edit Profile', transparency: 'transparent'}); 
            }
        }
    }
                




    saveProfile(text, resp) {
        let u = this.state.user;
        u[text] = resp;
        this.setState({user: u}); 
    }

    render() 
    {
        return(
            <View style = {{ backgroundColor: '#fdfdfd' }}>
                <View style = { styles.headerStyle}>
                        <TouchableOpacity onPress = {() =>{ this.editProfile()}} style = {styles.saveButtonStyle}>
                            <Text style ={{color: "#59bfff", fontSize: 14, alignSelf: 'center'}}>{ this.state.profileText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = { styles.logoutStyle } onPress = {() =>{ firebase.auth().signOut()
                                                        this.props.navigation.navigate('Login')}}>
                            <Text style = {{fontSize: 16, alignSelf: 'center', marginRight: wf*120, color: '#fdfdfd'}}>Logout</Text>
                        </TouchableOpacity>
                </View>
                <View style = {{ backgroundColor: '#fdfdfd', height: '93%'}}>
                    <ScrollView>
                        <TouchableOpacity disabled = {!this.state.editText} onPress = {() =>{ this.uploadPhoto()}}>
                            { this.state.newPhoto == '' ?
                                <Image source = {require('../../../Images/profile.png')}
                                style = { [styles.imageStyle, {borderWidth: 0}] } tintColor ="#59bfff"
                                />     :
                                <Image source = {{uri: this.state.newPhoto}}
                                style = { styles.imageStyle } 
                                /> 
                            }
                        </TouchableOpacity>
       <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
       <Text style = {styles.textStyle}>Name:</Text>
            <TextInput
            secureTextEntry = { false }
            underlineColorAndroid = { this.state.transparency }
            placeholder = 'Full Name'
            placeholderTextColor = '#A9A9A9'
            autoCorrect = { false }
            value={this.state.user.name}
            onChangeText = {(n) => {this.saveProfile('name', n)}}
            style = { styles.inputStyle }
            editable = {this.state.editText}
            />
        </View>   

        <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
        <Text style = {styles.textStyle}>Email:</Text>
        <TextInput
        secureTextEntry = { false }
        placeholder= 'user@gmail.com'
        placeholderTextColor = '#A9A9A9'
        autoCorrect = { false }
        underlineColorAndroid = { this.state.transparency }
        value={this.state.user.email}
        onChangeText={(e) => {this.saveProfile('email', e)}}
        autoCapitalize='none'
        style = { styles.inputStyle }
        editable = {this.state.editText}
        ></TextInput>
        </View>
    
        <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
        <Text style = {styles.textStyle}>Date of Birth:</Text>
        <TextInput
        secureTextEntry = { false }
        placeholder= 'D.O.B.'
        placeholderTextColor = '#A9A9A9'
        autoCorrect = { false }
        underlineColorAndroid = { this.state.transparency }
        value={this.state.user.DOB}
        onChangeText={(d) => {this.saveProfile('DOB', d)}}
        style = { styles.inputStyle }
        editable = {this.state.editText}
            ></TextInput>
        </View>
    
        <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
        <Text style = {styles.textStyle}>Age:</Text>
       <TextInput
       secureTextEntry = { false }
       placeholder= 'Age'
       placeholderTextColor = "#A9A9A9"
       underlineColorAndroid = { this.state.transparency }
       autoCorrect = { false }
       value={this.state.user.age}
       onChangeText={(a) => {this.saveProfile('age', a)}}
       style = { styles.inputStyle }
       editable = {this.state.editText}
        ></TextInput>
        </View>
    
        <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
        <Text style = {styles.textStyle}>Contact No:</Text>
       <TextInput
       secureTextEntry = { false }
       placeholder= 'Contact No.'
       placeholderTextColor = '#A9A9A9'
       underlineColorAndroid = { this.state.transparency }
       autoCorrect = { false }
       value={this.state.user.phone}
       onChangeText={(p) => {this.saveProfile('phone', p)}}
       style = { styles.inputStyle }
       editable = {this.state.editText}
        ></TextInput>
        </View>
    
        <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
        <Text style = {styles.textStyle}>KMC Registration Number:</Text>
       <TextInput
       secureTextEntry = { false }
       underlineColorAndroid = { this.state.transparency }
       placeholder= 'KMC Registration No.'
       placeholderTextColor = '#A9A9A9'
       autoCorrect = { false }
       value={this.state.user.kmc}
       onChangeText={(k) => {this.saveProfile('kmc', k)}}
       style = { styles.inputStyle }
       editable = {this.state.editText}
        ></TextInput>
        </View>

        <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
        <Text style = {styles.textStyle}>Graduated Medical College:</Text>
       <TextInput
       secureTextEntry = { false }
       placeholder= ' Graduated Medical College'
       placeholderTextColor = '#A9A9A9'
       underlineColorAndroid = { this.state.transparency }
       autoCorrect = { false }
       value={this.state.user.college}
       onChangeText={(d) => {this.saveProfile('college', d)}}
       style = { styles.inputStyle }
       editable = {this.state.editText}
        ></TextInput>
        </View>
    
        <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
        <Text style = {styles.textStyle}>Residential Address:</Text>
       <TextInput
       secureTextEntry = { false }
       placeholder= 'Residential Address'
       placeholderTextColor = '#A9A9A9'
       underlineColorAndroid = { this.state.transparency }
       multiline = { true }
       autoCorrect = { false }
       value={this.state.user.raddr}
       onChangeText={(r) => {this.saveProfile('raddr', r)}}
       style = { styles.inputStyle1 }
       editable = {this.state.editText}
        ></TextInput>
        </View>

        <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
        <Text style = {styles.textStyle}>Workplace Address:</Text>
       <TextInput
       secureTextEntry = { false }
       placeholder= 'Workplace Address'
       placeholderTextColor = '#A9A9A9'
       underlineColorAndroid = { this.state.transparency }
       autoCorrect = { false }
       value={this.state.user.waddr}
       multiline = { true }
       onChangeText={(w) => {this.saveProfile('waddr', w)}}
       style = { styles.inputStyle1 }
       editable = {this.state.editText}
        ></TextInput>
        </View>
    
        <View style = {{marginBottom: hf*25, marginLeft: wf*60, borderLeftColor: '#59bfff', borderLeftWidth: 1.5}}>
        <Text style = {styles.textStyle}>Additional Qualifications:</Text>
       <TextInput
       secureTextEntry = { false }
       placeholder= 'Additional Qualifications'
       placeholderTextColor = '#A9A9A9'
       underlineColorAndroid = { this.state.transparency }
       autoCorrect = { false }
       value={this.state.user.qualifications}
       onChangeText={(q) => {this.saveProfile('qualifications', q)}}
       style = { styles.inputStyle }
       editable = {this.state.editText}
        ></TextInput>
        </View>    
      </ScrollView>
    </View>
</View>
        );
    }
}

const styles = {

    logoutStyle: {
        marginLeft: wf*190,
    },

    headerStyle: {
        height: hf*50,
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
      width: wf*100,
      height: hf*30,
      justifyContent: 'center',
      alignSelf: 'center',
      marginLeft: wf*120,
      marginRight: wf*200,
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: hf*10,
      marginBottom: hf*10
    },

    gradientStyle: {
        height: '100%'
    },

    imageContainerStyle: {
        alignItems: 'center',
        alignSelg: 'center',
        justifyContent: 'center'
    },

    inputStyle: {
        marginRight: 5,
        color:'#222222',
        height: hf*30,
        width: wf*250,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: wf*10,
        flexWrap: 'wrap',
        paddingBottom: 10,
        
      },

      inputStyle1: {
        marginRight: wf*5,
        color:'#222222',
        width: wf*250,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: wf*10,
        flexWrap: 'wrap',
        paddingBottom: 10,
        
      },

      textStyle: {
          marginLeft: wf*15,
          fontWeight: 'bold',
          color: '#59bfff'

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
      alignSelf: 'center',
      borderRadius: 500,
      borderWidth: 1,
      borderColor: '#59bfff'
    }
}

export default DoctorProfile;