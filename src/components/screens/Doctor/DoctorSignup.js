import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import firebase from 'firebase'
require('firebase/auth')

let phoneHeight = Dimensions.get('window').height;
let phoneWidth = Dimensions.get('window').width;
let hf = phoneHeight/738.1818181818181;
let wf = phoneWidth/392.72727272727275;

class DoctorSignup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        loading: false,
        kmc: '',
        dob: '',
        age: '',
        phone: '',
        college: '',
        raddr: '',
        waddr: '',
        qualify: '',
        uploadText: 'Upload Profile Photo',
        photo: '',
        msg: '(Optional)',
        leftPill: true
    } 


    handleSignUp = () => {
      if(this.state.name == ''||this.state.email == ''||this.state.password == ''||this.state.dob == ''||this.state.age == ''||this.state.phone == ''||this.state.college == ''||this.state.raddr == ''||this.state.waddr == ''||this.state.qualify == '')
      {
        Toast.show("Kindly fill in all the fields")
        return;
      }
      if(this.state.leftPill==true && this.state.kmc=='')
      {
        Toast.show("Kindly fill in all the fields")
        return;        
      }
      if(this.state.password.length < 6)
      {
        Toast.show('Password should be atleast 6 characters')
        return;
      }      
      if(this.state.phone.length != 10)
      {
          Toast.show('Enter 10 - digit contact number')
          return;
      }

        const { email, password } = this.state

        this.setState({ loading: true })
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                        var user = firebase.auth().currentUser
                        var userId = user.uid
                        this.writeUserData(userId, this.state.name, this.state.email, 1, this.state.kmc, 
                            this.state.dob, this.state.age, this.state.phone, this.state.college, this.state.raddr,
                            this.state.waddr, this.state.qualify, this.state.photo)
                          })
            .catch(error =>{this.setState({ loading: false})
                            Toast.show('Sign Up error')
                            console.log(error)
                        })
     }


  uploadPhoto = () => { 

    if(this.state.uploadText=='Upload Profile Photo')
    {
      const options ={ noData: true }
      ImagePicker.launchImageLibrary(options, response => {
        console.log('response', response);
        if(response.didCancel)
        {
        this.setState({uploadText: 'Upload Profile Photo'})
        }
        else if(response.error)
        {
          Toast.show('Error while uploading, try again.')
        }
        else
        {
          ImageResizer.createResizedImage(response.uri, 500, 500, 'JPEG', 95 )
              .then(resp => {
                  console.log('Image resized')
                  console.log(resp.size)
                  console.log(resp.uri)
                  this.setState({uploadText: 'Change Photo', msg: 'Done ✓', photo: resp.uri})
              }).catch(err => {
                 console.log(err,'Image not resized')
              });
        
        
        }  

      });
  
    }
    else
    {
      const options ={ noData: true }
      ImagePicker.launchImageLibrary(options, response => {
        console.log('response', response);
        if(response.didCancel)
        {
        this.setState({uploadText: 'Change Photo', msg: 'Done ✓' })
        }
        else if(response.error)
        {
          Toast.show('Error while uploading, try again.')
        }
        else
        {
          ImageResizer.createResizedImage(response.uri, 500, 500, 'JPEG', 95 )
              .then(resp => {
                  console.log('Image resized')
                  console.log(resp.size)
                  console.log(resp.uri)
                  this.setState({uploadText: 'Change Photo', msg: 'Done ✓', photo: resp.uri})
              }).catch(err => {
                 console.log(err,'Image not resized')
              });

        

        
        }  

      });
  
    }
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


   writeUserData( userId, name, email, role, kmc, dob, age, phone, college, raddr, waddr, qualify, photo )
   {
      if(this.state.photo != '') {
      let imageRef = firebase.storage().ref('/profile/'+firebase.auth().currentUser.uid+'.jpg')
      this.uriToBlob(this.state.photo)
        .then((blob)=>{
          return this.uploadToFirebase(blob);
        }).then((snapshot)=>{
          console.log(snapshot)
           return imageRef.getDownloadURL()
        }).then(async (url) => {
            console.log(url)
            await firebase.database().ref('users/'+userId).set ({
              name: name,
              email: email,
              role: role,
              photo: url,
              kmc: kmc,
              DOB: dob,
              age: age,
              phone: phone,
              college:college,
              raddr: raddr,
              waddr: waddr,
              qualifications: qualify
            }).then(()=>{
                    this.setState({ name: '',email: '', password: '', kmc: '', dob: '', 
                    age: '', phone: '', waddr: '', raddr: '' , college: '', qualify: ''})
                }).catch((error)=>{
                    //error callback
                    console.log('error ' , error);
                })
        }) 
        .catch((error)=>{
          console.log(error)
          Toast.show('Sign Up not successful')
        })
      }
      else {
        firebase.database().ref('users/'+userId).set ({
          name: name,
          email: email,
          role: role,
          photo: photo,
          kmc: kmc,
          DOB: dob,
          age: age,
          phone: phone,
          college:college,
          raddr: raddr,
          waddr: waddr,
          qualifications: qualify
        }).then(()=>{
                this.setState({ name: '',email: '', password: '', kmc: '', dob: '', 
                age: '', phone: '', waddr: '', raddr: '' , college: '', qualify: ''})
            }).catch((error)=>{
                console.log('error ' , error);
            })
      }
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
                <Text style ={styles.textStyle}>Sign Up</Text>
             </TouchableOpacity>);
      }
    }

    render()
    {
    return(
    <LinearGradient colors = {['#fff', '#ADD8E6' ]} style = {styles.gradientStyle}>
      <TouchableOpacity style = {{marginLeft: wf*10, marginTop: hf*10, marginBottom: hf*10}} onPress = {() =>{this.props.navigation.navigate('Login')}}>
        <Text style = {{fontSize: 18, color: '#59bfff'}}>◀ Login</Text>
      </TouchableOpacity>
      <ScrollView keyboardShouldPersistTaps='always'>

        <Image source = {require('../../../Images/doctor.png')}
        style = { styles.imageStyle } tintColor ="#59bfff"
        />
        <Text style = {{alignSelf:'center', fontSize: 16, color: '#59bfff'}}>Sign Up as a</Text>
    <Text style = {{alignSelf:'center', fontSize: this.state.leftPill ? 25 : 22, fontWeight: 'bold', color: '#59bfff', marginBottom: this.state.leftPill ? hf*10 : hf*13}}>{this.state.leftPill ? 'DOCTOR' : 'HEALTHCARE  ASSISTANT'}</Text>
 
        <View style = {{flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: hf*10, marginTop: hf*18}}>
          <TouchableOpacity style = {[styles.leftPillStyle, {backgroundColor: this.state.leftPill ? '#59bfff' : '#fdfdfd'}]}
          onPress = {() => this.setState({ leftPill: true, name: '',email: '', password: '', kmc: '', dob: '', 
          age: '', phone: '', waddr: '', raddr: '' , college: '', qualify: ''})}>
            <Text style = {{padding: 13.3, alignSelf: 'center', color: this.state.leftPill ? '#fdfdfd': '#59bfff'}}>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.rightPillStyle, {backgroundColor: !this.state.leftPill ? '#59bfff' : '#fdfdfd'} ]} 
          onPress = {() => this.setState({ leftPill: false, name: '',email: '', password: '', kmc: '', dob: '', 
          age: '', phone: '', waddr: '', raddr: '' , college: '', qualify: ''})}>
            <Text style = {{padding: 5, alignSelf: 'center', color: !this.state.leftPill ? '#fdfdfd': '#59bfff'}}>Healthcare{'\n'} Assistant</Text>
          </TouchableOpacity>
        </View>
        <TextInput
        secureTextEntry = { false }
        placeholder= 'Full Name'
        autoCorrect = { false }
        value={this.state.name}
        onFocus = {() =>{ this.state.leftPill ? this.setState({name: 'Dr. '}) : this.setState({name: ''}) }}
        onChangeText={name => this.setState({ name })}
        style = { styles.inputStyle }
        ></TextInput>
        
        <TextInput
        secureTextEntry = { false }
        placeholder= 'Email'
        autoCorrect = { false }
        value={this.state.email}
        onChangeText={email => this.setState({ email })}
          autoCapitalize='none'
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

        <TextInput
        secureTextEntry = { false }
        placeholder= 'D.O.B.'
        autoCorrect = { false }
        value={this.state.dob}
        onChangeText={dob => this.setState({ dob })}
        style = { styles.inputStyle }
          ></TextInput>

        <TextInput
        secureTextEntry = { false }
        placeholder= 'Age'
        autoCorrect = { false }
        value={this.state.age}
        onChangeText={age => this.setState({ age })}
        style = { styles.inputStyle }
          ></TextInput>

        <TextInput
        secureTextEntry = { false }
        placeholder= 'Contact No.'
        autoCorrect = { false }
        value={this.state.phone}
        onChangeText={phone => this.setState({ phone })}
        style = { styles.inputStyle }
          ></TextInput>
        
        { this.state.leftPill ?
          <TextInput
          secureTextEntry = { false }
          placeholder= 'KMC Registration No.'
          autoCorrect = { false }
          value={this.state.kmc}
          onChangeText={kmc => this.setState({ kmc })}
          style = {styles.inputStyle}
            ></TextInput>
          : null
        }

        <TextInput
        secureTextEntry = { false }
        placeholder= 'Graduated Medical College'
        autoCorrect = { false }
        value={this.state.college}
        onChangeText={college => this.setState({ college })}
        style = { styles.inputStyle }
          ></TextInput>

        <TextInput
        secureTextEntry = { false }
        placeholder= 'Residential Address'
        multiline = { true }
        autoCorrect = { false }
        value={this.state.raddr}
        onChangeText={raddr => this.setState({ raddr })}
        style = { styles.inputStyle1 }
          ></TextInput>

        <TextInput
        secureTextEntry = { false }
        placeholder= 'Workplace Address'
        autoCorrect = { false }
        value={this.state.waddr}
        multiline = { true }
        onChangeText={waddr => this.setState({ waddr })}
        style = { styles.inputStyle1 }
          ></TextInput>

        <TextInput
        secureTextEntry = { false }
        placeholder= 'Qualifications'
        autoCorrect = { false }
        value={this.state.qualify}
        onChangeText={qualify => this.setState({ qualify })}
        style = { styles.inputStyle }
          ></TextInput>

          <View>
            <TouchableOpacity onPress = {() =>{ this.uploadPhoto()}} style = { styles.uploadStyle }>
              <Text style ={{color: "#59bfff", fontSize: 16}}>{ this.state.uploadText}</Text>
            </TouchableOpacity>
            <Text style = {{alignSelf: 'center', marginBottom: hf*15,color: '#777', marginTop: '1%'}}>{this.state.msg}</Text>
          </View>

          {this.state.photo == '' ? null : <Image style = {styles.uploadImageStyle} source = {{uri: this.state.photo}} />}

          <View>
            { this.renderButton() }
          </View>
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
      flexWrap: 'wrap',
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
      flexWrap: 'wrap',
      marginBottom: hf*15,
      paddingLeft: 10,
    },

    uploadStyle: {
        alignSelf: 'center',
        marginTop: hf*15,
        backgroundColor: '#fdfdfd',
        borderRadius: 30,
        padding: 10

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
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: hf*10,
        marginBottom: hf*20
    },

    rightPillStyle: {
        borderColor: '#59bfff',
        backgroundColor: '#fdfdfd',
        borderWidth: 1,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        width: wf*148,
        marginLeft: wf*1,
        justifyContent: 'center',

    },

    leftPillStyle: {
      borderColor: '#59bfff',
      backgroundColor: '#fdfdfd',
      borderWidth: 1,
      borderBottomLeftRadius: 25,
      borderTopLeftRadius: 25,
      width: wf*148,
      marginRight: wf*1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    textStyle: {
        alignSelf: 'center',
        color: '#fdfdfd',
        fontWeight: '600',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
    },
  
   spinnerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hf*15,
      marginBottom: hf*10
  },
  
  imageStyle: {
      height: hf*155,
      width: wf*155,
      marginBottom: hf*5,
      marginTop: hf*32,
      alignSelf: 'center',
      resizeMode: 'contain'
 
  },
  uploadImageStyle: {
    height: 125,
    width: 125,
    marginBottom: hf*15,
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#59bfff'
}
  };

export default DoctorSignup;
