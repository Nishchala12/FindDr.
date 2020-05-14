import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase'
require('firebase/auth')

class HospitalResponse extends Component
{
    state = {
        user: {}
    }

    
    componentDidMount() 
    {
       firebase.database().ref('users/'+firebase.auth().currentUser.uid).on('value', (user) =>{
       this.setState({ user: user.val() })
       })
    }
    
    renderList(dataArray)
    {
        sampleArray = [];
        for(i=0; i<dataArray.length; i++)
            sampleArray.push(this.createItem(dataArray[i]))
        return sampleArray;
    }

    createItem(item)
    { 
        return(
        <LinearGradient colors = {['#fff', '#ADD8E6' ]} style = {styles.textContainerStyle}>
        <View>
            <Text style = {styles.textStyle} onPress = { this.SampleFunction.bind(this, item) }> { item } </Text>
        </View>
        </LinearGradient>);
    }


    
    SampleFunction=(item)=>
    {
        Alert.alert(item);   
        
    }
     
    render()
    {
    var SampleNameArray = [ "Pankaja", "Madhu Kumar", "Mehul",'dfhhd',"dsgsg", "Shgsrh","dbrf", "Rita","dv","3", "Mohan", "Amit", "Babulal", "Sakshi","sge", "sgesgsh", "3","rgr", "zdvsg" ];

    return(
    
    <View style = { styles.containerStyle }>
        <ScrollView>
            <View style = { styles.welcomeStyle}>
                <Text style ={{color: "#59bfff", fontWeight: "bold", fontSize: 16}} >{ this.state.user.hname ?  'Welcome '+ this.state.user.hname : '' }!!!</Text>
            </View>
            <View>
                { this.renderList(SampleNameArray)}
            </View>
        </ScrollView>
     </View>
    );
    }
}


const styles = {

    containerStyle: {
        alignSelf: 'center',
        width: 400,
        paddingTop: 5,
        paddingBottom: 10,
    },

    textStyle:{
        fontSize : 25,
        fontWeight: '600',
         textAlign: 'center'
      },

    textContainerStyle: { 
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding:20
    },


    welcomeStyle: {
        justifyContent: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: '200',
        alignItems: 'flex-start',
        flexDirection: 'row'

    }
}



export default HospitalResponse;