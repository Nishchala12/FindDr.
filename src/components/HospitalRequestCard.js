import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

let phoneHeight = Dimensions.get('window').height;
let phoneWidth = Dimensions.get('window').width;
let hf = phoneHeight/738.1818181818181;
let wf = phoneWidth/392.72727272727275;

class HospitalRequestCard extends Component {

    getDate() {
        let d = new Date(Number(this.props.id.split("_")[1]))
        return d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
    }

    expandCard() {
        if(!this.props.expanded)
            return;

        return(
            <View style = {{ flexDirection: 'row' }}>
            <View style = { [styles.cardBodyStyle, { width: this.props.tickAction||this.props.crossAction ? '78%' : '95%'}] }>

                    <View style = {{flexDirection: 'row'}}> 
                        <View style = {{marginLeft: '3%', marginRight: '1%', marginTop: hf*5, width: '36%'}}>
                            <Text style = {{ fontSize: 13,  fontWeight: 'bold', color: '#59bfff' }}>Contact No:</Text>
                        </View>
                        <View style = {{ marginLeft: '1%', marginRight: '3%', marginTop: hf*5, width: '56%' }}>
                            <Text style = {{ fontSize: 13 }}>{ this.props.data.phone }</Text>
                        </View>
                    </View>

                    <View style = {{flexDirection: 'row'}}> 
                        <View style = {{marginLeft: '3%', marginRight: '1%', marginTop: hf*5, width: '36%'}}>
                            <Text style = {{ fontSize: 13,  fontWeight: 'bold', color: '#59bfff' }}>Email:</Text>
                        </View>
                        <View style = {{ marginLeft: '1%', marginRight: '3%', marginTop: hf*5, width: '56%' }}>
                            <Text style = {{ fontSize: 13 }}>{ this.props.data.email }</Text>
                        </View>
                    </View>

                    <View style = {{flexDirection: 'row'}}>
                        <View  style = {{ marginLeft: '3%', marginRight: '1%', marginTop: hf*5, width: '36%' }}>
                            <Text style = {{ fontSize: 13,  fontWeight: 'bold', color: '#59bfff' }}>Duty Location:</Text>
                        </View>
                        <View style = {{ marginLeft: '1%', marginRight: '3%', marginTop: hf*5, width: '56%' }}>
                            <Text style = {{ fontSize: 13 }}>{ this.props.data.location }</Text>
                        </View>
                    </View>

                    <View style = {{flexDirection: 'row'}}>
                        <View style = {{ marginLeft: '3%', marginRight: '1%', marginTop: hf*5, width: '36%' }}>   
                            <Text style = {{ fontSize: 13,  fontWeight: 'bold', color: '#59bfff' }}>Duty Duration:</Text>
                        </View>
                        <View style = {{ marginRight: '3%', marginLeft: '1%', marginTop: hf*5, width: '56%' }}>
                            <Text style = {{ fontSize: 13 }}>{ this.props.data.duration }</Text>
                        </View>
                    </View>

                    <View style = {{flexDirection: 'row'}}>
                        <View style = {{ marginLeft: '3%', marginRight: '1%', marginTop: hf*5, width: '36%' }} >
                            <Text style = {{ fontSize: 13,  fontWeight: 'bold', color: '#59bfff' }}>Qualifications:</Text>
                        </View>
                        <View style = {{ marginLeft: '1%', marginRight: '3%', marginTop: hf*5, width: '56%'}}>
                            <Text style = {{ fontSize: 13 }}>{ this.props.data.qualifications }</Text>
                        </View>
                    </View>

                    { this.props.data.docInfo ?
                            <View style = {{flexDirection: 'row'}}>
                                <View style = {{ marginLeft: '3%', marginRight: '1%', marginTop: hf*5, width: '36%' }} >
                                    <Text style = {{ fontSize: 13,  fontWeight: 'bold', color: '#59bfff' }}>{this.props.data.kmc != '' ? 'Doctor Details:' : 'Healthcare Assistant\nDetails:'}</Text>
                                </View>
                                <View style = {{ marginLeft: '1%', marginRight: '3%', marginTop: hf*5, width: '56%'}}>
                                    <Text style = {{ fontSize: 13 }}>{ this.props.data.docInfo }</Text>
                                </View>
                            </View>
                        : null
                    }

                    <View style = {{flexDirection: 'row'}}>
                        <View style = {{ marginLeft: wf*10,  marginBottom: hf*5  }}>
                            <Text style = {{ fontSize: 13,  fontWeight: 'bold', color: '#59bfff' }}>{'\n'}</Text>
                        </View>
                        <View style = {{ position: 'absolute', right: wf*10, marginLeft: wf*10,  marginBottom: hf*5  }}>
                            <Text style = {{ fontSize: 13,  color: '#a9a9a9' }}>{ '\n'+ this.getDate() }</Text>
                        </View>
                    </View>
            </View>
            <View style = { [styles.cardButtonStyle,
                            { height: this.props.tickAction||this.props.crossAction ? null : 0 }
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
        </View>);
    }

    render() {
        return(
            <View style = {{ margin: 5 }}>
                    <TouchableOpacity style = {[styles.cardHeaderStyle]} onPress = { () => this.props.toggle() }>
                        <View style = {{width: wf*80}}>
                        { this.props.data.photo == '' ?
                            <Image source = {require('../Images/profile.png')}
                             style = { styles.imageStyle } tintColor ="#59bfff"
                            />     :
                            <Image source = {{uri: this.props.data.photo}}
                            style = { styles.imageStyle } 
                            /> 
                        }
                        </View>
                        <View style = {{width: wf*120}}>
                             <Text style = {{ fontSize: 13,  paddingRight: 5}}><Text style = {{ fontSize: 13,  fontWeight: 'bold', marginRight: 10, color: '#59bfff', }}>Doctor Name: {'\n' }</Text>{this.props.data.doctorname}</Text>
                        </View>
                        <View style = {{width: wf*170}}>
                            <Text style = {{ fontSize: 13,  paddingBottom: 5, paddingRight: 10, }}><Text style = {{ fontSize: 13,  fontWeight: 'bold', color: '#59bfff' }}>Hospital Address: {'\n' }</Text>{this.props.data.hospitalname }{'\n'}{this.props.data.hospitaladdress}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style = {{width: wf*340, marginBottom: hf*8, alignSelf: 'center', height: hf*10, elevation: 5, backgroundColor: this.props.colors, borderRadius: 20}} />
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
        elevation: 5,
        paddingTop: 5,
        backgroundColor: '#fdfdfd',
        
    },

    cardBodyStyle: {
        marginLeft: wf*10,
        borderRadius: 20,
        elevation: 5, 
        backgroundColor: '#fdfdfd', 
        width: '78%',
        marginRight: wf*5,
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
        height: hf*30,
        width: wf*30,
        resizeMode: 'contain'
    },

    buttonDeclineImageStyle: {
        height: hf*26,
        width: wf*26,
         resizeMode: 'contain'
    }
}

export default HospitalRequestCard;