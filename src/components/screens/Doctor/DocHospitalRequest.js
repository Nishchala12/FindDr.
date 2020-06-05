import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import HospitalRequestCard from '../../HospitalRequestCard';
import firebase from 'firebase'
require('firebase/auth')

let phoneHeight = Dimensions.get('window').height;
let phoneWidth = Dimensions.get('window').width;
let hf = phoneHeight/738.1818181818181;
let wf = phoneWidth/392.72727272727275;

class DocHospitalRequest extends Component {
    state = {
        requests: {},
        expanded: {},
        colors: {},
        user: {}

    }
    
    componentDidMount() 
    {
        firebase.database().ref('users/'+firebase.auth().currentUser.uid).on('value', (u) => {
            firebase.database().ref('requests/hospital').on('value', (r) => {
                if( r.val() && r.val() != null)
                {
                    this.setState({ requests: r.val(), user: u.val() }, () => {
                        let reqIDs = Object.keys( this.state.requests );
                        let col = {};
                        let temp = {};
                        for(let i=0; i<reqIDs.length; i++)
                        {
                            temp[reqIDs[i]] = false
                            col[reqIDs[i]] = '#ccc'
                        }
                        this.setState({ expanded: temp, colors: col })
                    })
                }    
            })
        })
    }

    toggle(id) {
        let t = this.state.expanded
        if(t[id])
            t[id] = false
        else
            t[id] = true
        this.setState({ expanded: t })
    }
    
    renderList()
    {
        let renderArray = [];
        let reqIDs = Object.keys( this.state.requests );
        for(let i=0; i<reqIDs.length; i++)
        {
            if(this.state.requests[reqIDs[i]].status==0)
            {
                renderArray.push(<HospitalRequestCard data = { this.state.requests[reqIDs[i]] } expanded = { this.state.expanded[reqIDs[i]] } 
                toggle = { this.toggle.bind(this, reqIDs[i]) } tickAction = { this.tickAction.bind(this, reqIDs[i]) }  
                colors = { this.state.colors[reqIDs[i]] } id = { reqIDs[i] }/>)
            }
        }
        if(renderArray.length==0)
        {
        return(
            <View style = {{alignSelf: 'center',marginTop: hf*300}}>
                <Text style = {{fontSize: 16, color: '#777', alignSelf: 'center'}}>You have no new requests!</Text>
            </View>);
        }

        return renderArray;
    }

    tickAction(reqID) 
    {
        var user = this.state.user
        var updateRequests = {};
        updateRequests['requests/hospital/'+reqID+'/status'] = 1;
        updateRequests['requests/hospital/'+reqID+'/docInfo'] = user.name+'\n'+user.phone+'\n'+user.qualifications;
        updateRequests['requests/hospital/'+reqID+'/kmc'] = user.kmc;
        updateRequests['users/'+firebase.auth().currentUser.uid+'/hospitalrequests/'+reqID] = '';
        firebase.database().ref().update(updateRequests)
        .then(()=>{
            console.log('Success')
            }).catch((error)=>{
                console.log('error ' , error);
            })

    }
    
    render()
    {

        return(
        <View style = { styles.containerStyle }>
            <ScrollView style = {{ flex: 1 }}>
                {this.renderList()}
            </ScrollView>
        </View>
        );
    }

}

const styles = {

    containerStyle: {
        flex: 1,
    },

}


export default DocHospitalRequest;

