import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase'
require('firebase/auth')


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
        uploadText: 'Upload Profile Photo (Optional)',
        photo: null
    } 


    handleSignUp = () => {
        const { email, password } = this.state

        this.setState({ loading: true })
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {Toast.show('Signed Up Successfully')
                        var user = firebase.auth().currentUser
                        var userId = user.uid
                        this.writeUserData(userId, this.state.name, this.state.email, 1, this.state.kmc, 
                            this.state.dob, this.state.age, this.state.phone, this.state.college, this.state.raddr,
                            this.state.waddr, this.state.qualify)
                        this.setState({ loading: false })
                         this.props.navigation.navigate('DoctorLoggedIn')
                          })
            .catch(error =>{this.setState({ loading: false})
                            Toast.show('Signup Error')
                            console.log(error)
                        })

                      }


  uploadPhoto = () => { 

    if(this.state.uploadText=='Upload Profile Photo (Optional)')
    {
      const options ={ noData: true }
      ImagePicker.launchImageLibrary(options, response => {
        console.log('response', response);
        if(response.didCancel)
        {
        this.setState({uploadText: 'Upload Profile Photo (Optional)'})
        }
        else if(response.error)
        {
          Toast.show('Error while uploading. Try Again.')
        }
        else
        {
        this.setState({uploadText: 'Choose Another Photo', photo: response.uri})
        
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
        this.setState({uploadText: 'Choose Another Photo'})
        }
        else if(response.error)
        {
          Toast.show('Error while uploading. Try Again.')
        }
        else
        {
        this.setState({uploadText: 'Choose Another Photo', photo: response.uri})

        
        }  

      });
  
    }
  }
      
  
  /*uriToBlob = (uri) => {

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
      
      var storageRef = firebase.storage().ref('/profile/');

      storageRef.child('uploads/photo.jpg').put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{

        blob.close();

        resolve(snapshot);

      }).catch((error)=>{

        reject(error);

      });

    });


  }  */    


   writeUserData( userId, name, email, role, kmc, dob, age, phone, college, raddr, waddr, qualify)
   {
    firebase.database().ref('users/'+userId).set ({
      name: name,
      email: email,
      role: role,
      kmc: kmc,
      DOB: dob,
      age: age,
      phone: phone,
      college:college,
      raddr: raddr,
      waddr: waddr,
      qualifications: qualify
    }).then(()=>{
            console.log('Success');
            this.setState({ name: '',email: '', password: '', kmc: '', dob: '', 
            age: '', phone: '', waddr: '', raddr: '' , college: '', qualify: ''})
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
                <Text style ={styles.textStyle}>Sign Up</Text>
             </TouchableOpacity>);
      }
    }

    render()
    {
    return(
    <LinearGradient colors = {['#fff', '#ADD8E6' ]} style = {styles.gradientStyle}>
      <KeyboardAwareScrollView>
        <Image source = {require('../../../Images/doctor.png')}
        style = { styles.imageStyle } tintColor ="#59bfff"
        />
        <Text style = {{alignSelf:'center', fontSize: 16, color: '#59bfff', marginBottom: 30}}>Sign Up as a Doctor!</Text>
    
        <TextInput
        secureTextEntry = { false }
        placeholder= 'Full Name'
        autoCorrect = { false }
        value={this.state.name}
        onChangeText={name => this.setState({ name })}
        style = { styles.inputStyle }
          ></TextInput>
        
        <TextInput
        secureTextEntry = { false }
        placeholder= 'user@gmail.com'
        autoCorrect = { false }
        value={this.state.email}
        onChangeText={email => this.setState({ email })}
          autoCapitalize='none'
        style = { styles.inputStyle }
          ></TextInput>

        <TextInput
        secureTextEntry = { true }
        placeholder= 'password'
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

        <TextInput
        secureTextEntry = { false }
        placeholder= 'KMC Registration No.'
        autoCorrect = { false }
        value={this.state.kmc}
        onChangeText={kmc => this.setState({ kmc })}
        style = { styles.inputStyle }
          ></TextInput>

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
        placeholder= 'Additional Qualifications'
        autoCorrect = { false }
        value={this.state.qualify}
        onChangeText={qualify => this.setState({ qualify })}
        style = { styles.inputStyle }
          ></TextInput>

          <View style = { styles.uploadStyle }>
            <TouchableOpacity onPress = {() =>{ this.uploadPhoto()}}>
              <Text style ={{color: "#59bfff", fontWeight: "bold", fontSize: 16}}>{ this.state.uploadText}</Text>
            </TouchableOpacity>
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
      backgroundColor: '#fdfdfd',
      borderRadius: 50,
      height: 40,
      width: 300,
      paddingBottom: 2,
      paddingTop: 2,
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 15,
      flexWrap: 'wrap',
      paddingLeft: 10,
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
      flexWrap: 'wrap',
      marginBottom: 15,
      paddingLeft: 10,
    },

    uploadStyle: {
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15,
    },

    gradientStyle: {
      height: 670
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
        marginTop: 10,
        marginBottom:20
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
      marginTop: 30
  },
  
  imageStyle: {
      height: 150,
      width: 150,
      marginBottom: 10,
      marginTop: 50,
      alignSelf: 'center'
 
  }
  };

export default DoctorSignup;
