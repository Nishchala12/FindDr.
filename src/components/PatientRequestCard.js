import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

let phoneHeight = Dimensions.get('window').height;
let phoneWidth = Dimensions.get('window').width;
let hf = phoneHeight/738.1818181818181;
let wf = phoneWidth/392.72727272727275;

class PatientRequestCard extends Component {

    getDate() {
        let d = new Date(Number(this.props.id.split("_")[1]))
        return d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
    }

    expandCard() {

        if(!this.props.expanded)
            return;

        return(
            <View style = {{ flexDirection: 'row'}}>
                        <View style = { [styles.cardBodyStyle, { width: this.props.tickAction||this.props.crossAction ? '78%' : '95%'}]}>
                            <View style = {{flexDirection: 'row'}}> 
                                <Text style = {{ fontWeight: 'bold', marginLeft: wf*10, marginTop: hf*5, color: '#59bfff', alignSelf:'center' }}>Patient Name:</Text>
                                <Text style = {{ position: 'absolute', right: wf*10, marginLeft: wf*10, marginTop: hf*5 }}>{this.props.data.name}</Text>
                            </View>

                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{ fontWeight: 'bold', marginLeft: wf*10, marginTop: hf*5, color: '#59bfff' }}>Age:</Text>
                                <Text style = {{ position: 'absolute', right: wf*10, marginLeft: wf*10, marginTop: hf*5 }}>{this.props.data.age}</Text>
                            </View>
                            
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{ fontWeight: 'bold', marginLeft: wf*10, marginTop: hf*5, color: '#59bfff' }}>Gender:</Text>
                                <Text style = {{ position: 'absolute', right: wf*10, marginLeft: wf*10, marginTop: hf*5 }}>{this.props.data.gender}</Text>
                            </View>
                            
                            <View style = {{flexDirection: 'row'}}>
                            <Text style = {{ fontWeight: 'bold', marginLeft: wf*10, marginTop: hf*5, color: '#59bfff' }}>Phone:</Text>
                                <Text style = {{ position: 'absolute', right: wf*10, marginLeft: wf*10, marginTop: hf*5 }}>{this.props.data.phone}</Text>
                            </View>

                            <View style = {{flexDirection: 'row'}}>
                            <Text style = {{ fontWeight: 'bold', marginLeft: wf*10, marginTop: hf*5, color: '#59bfff' }}>Email:</Text>
                            <Text style = {{ position: 'absolute', right: wf*10, marginLeft: wf*10, marginTop: hf*5 }}>{this.props.data.email}</Text>
                            </View>

                            <Text style = {{ fontWeight: 'bold', color: '#59bfff', alignSelf: 'center' }}>{ '\n' } Complaints</Text>
                            <Text style = {{ marginLeft: wf*5 }}>{this.props.data.complaints}</Text>

                             <View style = {{flexDirection: 'row'}}>
                                <Text style = {{ fontWeight: 'bold', marginLeft: wf*10, marginTop: hf*5, color: '#59bfff', marginBottom: hf*5 }}></Text>
                                <Text style = {{ position: 'absolute', right: wf*10, marginLeft: wf*10, marginTop: hf*5, color: '#a9a9a9' }}>{ this.getDate() }</Text>
                            </View>
                        </View>

                        <View style = { [styles.cardButtonStyle,
                        { backgroundColor: this.props.tickAction ? '#fdfdfd' : null,
                          elevation: this.props.tickAction ? 5 : null,
                          height: this.props.tickAction ? null : 0}
                            ]}>
                            <TouchableOpacity style = {{ marginLeft: wf*15, marginRight: wf*15 }} onPress = { () => this.props.tickAction() }>
                                { this.props.tickAction ?
                                   <Image source = {require('../Images/check.png')}
                                style = { styles.buttonAcceptImageStyle } tintColor ="#59bfff"
                                />
                                : null
                                }       
                            </TouchableOpacity >
                            <TouchableOpacity style = {{ marginLeft: wf*15, marginRight: wf*15 }} onPress = { () => this.props.crossAction() }>
                            { this.props.crossAction ?  
                                <Image source = {require('../Images/cross.png')}
                                style = { styles.buttonDeclineImageStyle } tintColor ="#696969"
                                />
                                : null
                                } 
                            </TouchableOpacity>
                        </View>
                    </View>
        );
    }

    render() {
        return(
            <View style = {{ margin: 5 }}>
                    <TouchableOpacity style = { [styles.cardHeaderStyle] } onPress = { () => this.props.toggle() }>
                        <View style = {{width: wf*80}}>
                        { this.props.data.photo == '' ?
                            <Image source = {require('../Images/profile.png')}
                             style = { [styles.imageStyle, {borderWidth: 0}] } tintColor ="#59bfff"
                            />     :
                            <Image source = {{uri: this.props.data.photo}}
                            style = { styles.imageStyle } 
                            /> 
                        }
                        </View>
                        <View style = {{width: wf*120}}>
                            <Text style = {{ paddingRight: 5 }}><Text style = {{ fontWeight: 'bold', marginRight: wf*10, color: '#59bfff' }}>Profile Name: { '\n' }</Text>{this.props.data.profilename}</Text>
                        </View>
                        <View style = {{width: wf*170}}>
                            <Text style = {{paddingBottom: 5, paddingRight: 10}}><Text style = {{ fontWeight: 'bold', color: '#59bfff'}}>Address: {'\n' }</Text>{this.props.data.raddr}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style = {{width: wf*340, marginBottom: hf*8, alignSelf: 'center', height: hf*10, elevation: 5, backgroundColor: this.props.colors, borderRadius: 20}} />
                    { this.expandCard() }
            </View>
        );
    }
}

const styles = {

    imageStyle: {
        width: wf*50,
        height: hf*50,
        marginLeft: wf*10,
        marginTop: hf*5,
        marginRight: wf*30,
        marginBottom: hf*10,
        borderRadius: 500,
        borderWidth: 1,
        borderColor: '#59bfff'
    },

    cardHeaderStyle: {
        marginLeft: wf*10,
        marginRight: wf*10,
        flexDirection: 'row',
        marginTop: hf*15,
        borderColor: '#59bfff',
        borderRadius: 20,
        paddingTop: 5,
        elevation: 5, 
        backgroundColor: '#fdfdfd',
        
    },

    cardBodyStyle: {
        marginLeft: wf*10,
        borderRadius: 20,
        elevation: 5, 
        backgroundColor: '#fdfdfd', 
        width: '78%',
        marginRight: wf*5,
        marginBottom: hf*5,
    },

    cardButtonStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 5, 
        backgroundColor: '#fdfdfd',
        marginBottom: hf*5,
    },

    buttonAcceptImageStyle: {
        height: hf*30,
        width: wf*30
    },

    buttonDeclineImageStyle: {
        height: hf*28,
        width: wf*28
    }
}


export default PatientRequestCard;