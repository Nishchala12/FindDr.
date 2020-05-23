import Login from './screens/Login';
import PatientSignup from './screens/Patient/PatientSignup';
import PatientRequestForm from './screens/Patient/PatientRequestForm';
import PatientProfile from './screens/Patient/PatientProfile'
import PatientRequests from './screens/Patient/PatientRequests';
import PatientAccepted from './screens/Patient/PatientAccepted';
import DoctorSignup from './screens/Doctor/DoctorSignup';
import DoctorProfile from './screens/Doctor/DoctorProfile';
import DocPatientRequest from './screens/Doctor/DocPatientRequest';
import DocHospitalRequest from './screens/Doctor/DocHospitalRequest';
import DocHospitalAccepted from './screens/Doctor/DocHospitalAccepted';
import DocPatientAccepted from './screens/Doctor/DocPatientAccepted';
import HospitalSignup from './screens/Hospital/HospitalSignup';
import HospitalRequestForm from './screens/Hospital/HospitalRequestForm';
import HospitalProfile from './screens/Hospital/HospitalProfile';
import HospitalAccepted from './screens/Hospital/HospitalAccepted';
import HospitalRequests from './screens/Hospital/HospitalRequests';

import React from 'react';
import { Image, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();


let phoneHeight = Dimensions.get('window').height;
let phoneWidth = Dimensions.get('window').width;
let hf = phoneHeight/738.1818181818181;
let wf = phoneWidth/392.72727272727275;




function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode = {false}>

        <Stack.Screen name = "Login" component = { Login }/>

          <Stack.Screen name = "Signup" >
            { () => (
                <BottomTab.Navigator tabBarOptions = {{activeBackgroundColor: '#fdfdfd', inactiveBackgroundColor: '#59bfff', activeTintColor: '#59bfff', inactiveTintColor: '#fdfdfd', showIcon: true}}>
                  <BottomTab.Screen name = "Patient" component = { PatientSignup }
                  options = {{tabBarIcon: ({focused }) => (
                    <Image source = { require('../Images/patient.png') } style = { [styles.patientImageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}} />

                  <BottomTab.Screen name = "Doctor" component = { DoctorSignup } 
                  options = {{tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/doctor.png')} style = { [styles.doctorImageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}} />

                  <BottomTab.Screen name = "Hospital" component = { HospitalSignup } 
                  options = {{tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/hospital.png')} style = { [styles.hospitalImageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}} />
                </BottomTab.Navigator>
                      )
              }

          </Stack.Screen>

          <Stack.Screen name = "DoctorLoggedIn">
            { () => (
              <BottomTab.Navigator headerMode = {true} tabBarOptions = {{activeBackgroundColor: '#fdfdfd', inactiveBackgroundColor: '#59bfff', activeTintColor: '#59bfff', inactiveTintColor: '#fdfdfd', showIcon: true}}>
                
                <BottomTab.Screen name = "Requests" 
                options = {{tabBarIcon: ({ focused }) => (
                  <Image source = { require('../Images/request.png') } style = { [styles.imageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}]} />
                )}}>
                  { () => (
                    <TopTab.Navigator tabBarOptions = {{ activeTintColor: '#fdfdfd', inactiveTintColor: '#696969', showIcon: true, labelStyle: { textTransform: 'none' }, indicatorStyle: {backgroundColor: '#fdfdfd'}, style: { backgroundColor: '#59bfff' }} } >
                      <TopTab.Screen name = "Patient" component = { DocPatientRequest } />
                      <TopTab.Screen name = "Hospital" component = { DocHospitalRequest } />
                    </TopTab.Navigator>)}
                </BottomTab.Screen>

                <BottomTab.Screen name = "Accepted" 
                options = {{tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/accept.png') } style = { [styles.acceptImageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}}>
                  { ({focused}) => (
                    <TopTab.Navigator tabBarOptions = {{ activeTintColor: '#fdfdfd', inactiveTintColor: '#696969', showIcon: true, labelStyle: { textTransform: 'none' },indicatorStyle: {backgroundColor: '#fdfdfd'}, style: { backgroundColor: '#59bfff' }}} >
                      <TopTab.Screen name = "Patient" component = { DocPatientAccepted } />
                      <TopTab.Screen name = "Hospital" component = { DocHospitalAccepted } />
                    </TopTab.Navigator>)}
                  </BottomTab.Screen>
                

                <BottomTab.Screen name = "Profile" component = { DoctorProfile } 
                options = {{ tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/profile.png')} style = { [styles.imageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}} />
                  </BottomTab.Navigator>
            )
            }
          </Stack.Screen>

          <Stack.Screen name = "PatientLoggedIn">
            { () => (
                <BottomTab.Navigator tabBarOptions = {{activeBackgroundColor: '#fdfdfd', inactiveBackgroundColor: '#59bfff', activeTintColor: '#59bfff', inactiveTintColor: '#fdfdfd', showIcon: true}}>
                  
                  <BottomTab.Screen name = "Request Form" component = { PatientRequestForm }
                  options = {{tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/request.png')} style = { [styles.imageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}} />
                  
                  <BottomTab.Screen name = "Status"
                  options = {{tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/summary.png')} style = { [styles.imageResponseStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}}>
                    { () => (
                    <TopTab.Navigator tabBarOptions = {{ activeTintColor: '#fdfdfd', inactiveTintColor: '#696969', showIcon: true, labelStyle: { textTransform: 'none' }, indicatorStyle: {backgroundColor: '#fdfdfd'}, style: { backgroundColor: '#59bfff' }} } >
                      <TopTab.Screen name = "Requested" component = { PatientRequests } />
                      <TopTab.Screen name = "Accepted" component = { PatientAccepted } />
                    </TopTab.Navigator>)}
                  </BottomTab.Screen>

                <BottomTab.Screen name = "Profile" component = { PatientProfile } 
                options = {{tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/profile.png')} style = { [styles.imageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}} />
                </BottomTab.Navigator>
                    )
            }
          </Stack.Screen>

          <Stack.Screen name = "HospitalLoggedIn">
            { () => (
                <BottomTab.Navigator tabBarOptions = {{ activeBackgroundColor: '#fdfdfd', inactiveBackgroundColor: '#59bfff', activeTintColor: '#59bfff', inactiveTintColor: '#fdfdfd', showIcon: true}}>
                  <BottomTab.Screen name="Request Form" component={ HospitalRequestForm }
                  options = {{tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/request.png')} style = { [styles.imageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}} />

                  <BottomTab.Screen name="Status"
                  options = {{tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/summary.png')} style = { [styles.imageResponseStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}}>
                    { () => (
                    <TopTab.Navigator tabBarOptions = {{ activeTintColor: '#fdfdfd', inactiveTintColor: '#696969', showIcon: true, labelStyle: { textTransform: 'none' }, indicatorStyle: {backgroundColor: '#fdfdfd'}, style: { backgroundColor: '#59bfff' }} } >
                      <TopTab.Screen name = "Requested" component = { HospitalRequests } />
                      <TopTab.Screen name = "Accepted" component = { HospitalAccepted } />
                    </TopTab.Navigator>)}
                  </BottomTab.Screen>

                  <BottomTab.Screen name="Profile" component={ HospitalProfile } 
                  options = {{tabBarIcon: ({ focused }) => (
                    <Image source = {require('../Images/profile.png')} style = { [styles.imageStyle, {tintColor: focused ? '#59bfff' : '#fdfdfd'}] } />
                  )}} />
                </BottomTab.Navigator>
                    )
            }
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = {

    stackStyle: {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      marginLeft: wf*20
    },

    imageStyle: {
      height: hf*25,
      width: wf*25,
      tintColor: '#fdfdfd',
    },

    imageResponseStyle: {
      height: hf*24,
      width: wf*40,
      marginLeft: wf*10
    },

    patientImageStyle: {
      height: hf*28,
      width: wf*28
    },

    doctorImageStyle: {
      height: hf*26,
      width: wf*26,
      marginTop: hf*5
    },

    hospitalImageStyle: {
      height: hf*23,
      width: wf*23,
    },

    acceptImageStyle: {
      height: hf*23,
      width: wf*23,
    }

    
}

export default Root;