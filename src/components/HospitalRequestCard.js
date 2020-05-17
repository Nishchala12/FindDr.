import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class HospitalRequestCard extends Component {

    expandCard() {
        if(!this.props.expanded)
            return;

        return(
            <View style = {{ flexDirection: 'row' }}>
            <View style = { [styles.cardBodyStyle, { width: this.props.tickAction ? '78%' : '95%'}] }>
                <View style = {{flexDirection: 'row'}}> 
                        <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff', alignSelf:'center' }}>Duty Location:</Text>
                        <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>{ this.props.data.location }</Text>
                    </View>

                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff' }}>Duty Duration:</Text>
                        <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>{ this.props.data.duration }</Text>
                    </View>

                    <View style = {{flexDirection: 'row', marginBottom: 10}}>
                        <Text style = {{ fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: '#59bfff' }}>Qualifications:</Text>
                        <Text style = {{ position: 'absolute', right: 10, marginLeft: 10, marginTop: 5 }}>{ this.props.data.qualifications }</Text>
                </View>
            </View>
            <View style = { [styles.cardButtonStyle,
                        { backgroundColor: this.props.tickAction ? '#fdfdfd' : null },
                        { elevation: this.props.tickAction ? 5 : null }
                    ] }>
                <TouchableOpacity style = {{ marginLeft: 15, marginRight: 15 }} onPress = { () => this.props.acceptRequest() }>
                    { this.props.tickAction ?
                    <Image source = {require('../Images/check.png')}
                    style = { styles.buttonAcceptImageStyle } tintColor ="#59bfff"
                    />
                    : null
                    }       
                </TouchableOpacity >
                <TouchableOpacity style = {{ marginLeft: 15, marginRight: 15 }}>
                    { this.props.crossAction ?  
                    <Image source = {require('../Images/cross.png')}
                    style = { styles.buttonDeclineImageStyle } tintColor ="#696969"
                    />
                    : null
                    } 
                </TouchableOpacity>
            </View>
        </View>);
    }

    render() {
        return(
            <View style = {{ margin: 5 }}>
                    <TouchableOpacity style = {styles.cardHeaderStyle} onPress = { () => this.props.toggle() }>
                        <View style = {{width: 80}}>
                            <Image source = {require('../Images/profile.png')}
                            style = { styles.imageStyle } tintColor ="#A9A9A9"
                            />
                        </View>
                        <View style = {{width: 120}}>
                             <Text style = {{ marginRight: 5 }}> <Text style = {{ fontWeight: 'bold', marginRight: 10, color: '#59bfff' }}>Doctor Name: {'\n' } </Text>{ this.props.data.doctorname }</Text>
                        </View>
                        <View style = {{width: 170}}>
                            <Text style = {{paddingBottom: 5, paddingRight: 10 }}><Text style = {{ fontWeight: 'bold', color: '#59bfff' }}>Hospital Address: {'\n' }</Text>{this.props.data.hospitalname }{'\n'}{this.props.data.hospitaladdress}</Text>
                        </View>
                    </TouchableOpacity>
                    { this.expandCard() }
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
    },

    cardButtonStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 5, 
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

export default HospitalRequestCard;