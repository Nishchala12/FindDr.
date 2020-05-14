import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class PatientRequestCard extends Component {

    expandCard() {

        if(!this.props.expanded)
            return;

        return(
            <View style = {{ flexDirection: 'row'}}>
                        <View style = { styles.cardBodyStyle}>
                            <View style = {{flexDirection: 'row'}}> 
                                <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff', alignSelf:'center' }}>Patient Name:</Text>
                                <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>{this.props.data.name}</Text>
                            </View>

                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff' }}>Age:</Text>
                                <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>{this.props.data.age}</Text>
                            </View>
                            
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff' }}>Gender:</Text>
                                <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>{this.props.data.gender}</Text>
                            </View>
                            
                            <View style = {{flexDirection: 'row'}}>
                            <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff' }}>Phone:</Text>
                                <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>{this.props.data.phone}</Text>
                            </View>

                            <View style = {{flexDirection: 'row'}}>
                            <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff' }}>Email:</Text>
                            <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>{this.props.data.email}</Text>
                            </View>

                            <Text style = {{ fontWeight: 'bold', color: '#59bfff', alignSelf: 'center' }}>{ '\n' } Complaints</Text>
                             <Text style = {{ marginLeft: 5, marginBottom: 10 }}>{this.props.data.complaints}</Text>
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
            <View style = {{ margin: 5 }}>
                    <TouchableOpacity style = { styles.cardHeaderStyle } onPress = { () => this.props.toggle() }>
                        <View style = {{width: 80}}>
                            <Image source = {require('../Images/profile.png')}
                            style = { styles.imageStyle } tintColor ="#A9A9A9"
                            />
                        </View>
                        <View style = {{width: 120}}>
                            <Text style = {{ marginRight: 5 }}> <Text style = {{ fontWeight: 'bold', marginRight: 10, color: '#59bfff' }}>Profile Name:{ '\n' }</Text>{this.props.data.profilename}</Text>
                        </View>
                        <View style = {{width: 170}}>
                        <Text style = {{paddingBottom: 5, paddingRight: 5}}> <Text style = {{ fontWeight: 'bold', color: '#59bfff'}}>Address:{'\n' }</Text>{this.props.data.raddr}</Text>
                        </View>
                    </TouchableOpacity>
                    { this.expandCard() }
            </View>
        );
    }
}

const styles = {

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
        borderColor: '#59bfff',
        borderRadius: 20,
        marginBottom: 5,
        elevation: 5, 
        backgroundColor: '#fdfdfd',
        
    },

    cardBodyStyle: {
        marginLeft: 10,
        borderRadius: 20,
        elevation: 5, 
        backgroundColor: '#fdfdfd', 
        width: '78%',
        marginRight: 5,
        marginBottom: 5,
    },

    cardButtonStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 5, 
        backgroundColor: '#fdfdfd',
        marginBottom: 5,
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