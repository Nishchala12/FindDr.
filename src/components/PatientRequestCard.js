import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class PatientRequestCard extends Component {

    cardExpand() {
        return(
            <View style = {{ flexDirection: 'row'}}>
                        <View style = { styles.cardBodyStyle}>
                            <View style = {{flexDirection: 'row'}}> 
                                <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff', alignSelf:'center' }}>Patient Name: </Text>
                                <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>Full Name</Text>
                            </View>

                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff' }}>Age:</Text>
                                <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>Number</Text>
                            </View>

                            <View style = {{flexDirection: 'row'}}>
                            <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff' }}>Phone: </Text>
                                <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>Number</Text>
                            </View>

                            <View style = {{flexDirection: 'row'}}>
                            <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff' }}>Email: </Text>
                            <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>Number </Text>
                            </View>

                            <Text style = {{ fontWeight: 'bold', color: '#59bfff', alignSelf: 'center' }}>{ '\n' } Complaints</Text>
                             <Text style = {{ marginLeft: 5, marginBottom: 10 }}> Complaint 1{ '\n' } Complaint n</Text>
                        </View>
                        <View style = { styles.cardButtonStyle }>
                            <TouchableOpacity style = {{ marginLeft: 15, marginRight: 15 }}>
                                <Image source = {require('../Images/check.png')}
                                style = { styles.buttonAcceptImageStyle } tintColor ="#59bfff"
                                />
                            </TouchableOpacity >
                            <TouchableOpacity style = {{ marginLeft: 15, marginRight: 15 }}>
                                <Image source = {require('../Images/cross.png')}
                                style = { styles.buttonDeclineImageStyle } tintColor ="#696969"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
        );
    }

    render() {
        return(
            <View style = {{ backgroundColor: '#fff' }}>
                    <View style = { styles.cardHeaderStyle }>
                        <View style = {{width: 80}}>
                            <Image source = {require('../Images/Profile.png')}
                            style = { styles.imageStyle } tintColor ="#A9A9A9"
                            />
                        </View>
                        <View style = {{width: 120}}>
                            <Text style = {{ marginRight: 20 }}> <Text style = {{ fontWeight: 'bold', marginRight: 10, color: '#59bfff' }}>Profile Name: { '\n' } </Text>Patient's { '\n' } Request</Text>
                        </View>
                        <View style = {{width: 170}}>
                        <Text> <Text style = {{ fontWeight: 'bold', color: '#59bfff' }}>Address: {'\n' } </Text>Patient's { '\n' } Request</Text>
                        </View>
                    </View>
                    { this.cardExpand() }
            </View>
        );
    }
}

const styles = {
    gradientStyle: {
        height: 670
    },

    imageStyle: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginTop: 5,
        marginRight: 30,
        marginBottom: 10
    },

    cardHeaderStyle: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        marginTop: 15,
       // borderColor: '#59bfff',
        //borderWidth:1,
        borderRadius: 20,
        marginBottom: 5,
        elevation: 20, 
        backgroundColor: '#fdfdfd',
    },

    cardBodyStyle: {
        marginLeft: 10,
        //borderWidth:1,
        borderRadius: 20,
        elevation: 20, 
        backgroundColor: '#fdfdfd', 
        width:304,
       // borderColor: '#59bfff',
        marginRight: 5
    },

    cardButtonStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        //borderColor: '#59bfff',
        //borderWidth:1,
        borderRadius: 20,
        elevation: 20, 
        backgroundColor: '#fdfdfd',
    },

    buttonAcceptImageStyle: {
        height: 30,
        width: 30
    },

    buttonDeclineImageStyle: {
        height: 28,
        width: 28
    }
}

export default PatientRequestCard;