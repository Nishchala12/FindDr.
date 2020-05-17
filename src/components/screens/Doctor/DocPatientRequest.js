import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PatientRequestCard from '../../PatientRequestCard';
import firebase from 'firebase'
require('firebase/auth')



class DocPatientRequest extends Component {
    state = {
        requests: {},
        expanded: {},

    }
    
    componentDidMount() 
    {
       firebase.database().ref('requests/patient').on('value', (r) => {
            if( r.val() && r.val() != null)
            {
                this.setState({ requests: r.val() }, () => {
                    let reqIDs = Object.keys( this.state.requests );
                    let temp = {};
                    for(let i=0; i<reqIDs.length; i++)
                        temp[reqIDs[i]] = false
                    this.setState({ expanded: temp })
                })
            }    
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
                renderArray.push(<PatientRequestCard data = { this.state.requests[reqIDs[i]] } expanded = { this.state.expanded[reqIDs[i]] } 
                toggle = { this.toggle.bind(this, reqIDs[i]) } acceptRequest = { this.acceptRequest.bind(this, reqIDs[i]) } 
                tickAction = { this.tickAction.bind(this, reqIDs[i]) }/>)
            }

        }
            return renderArray;
    }
    
    acceptRequest(reqID) 
    {
        var user = firebase.auth().currentUser
        var userId = user.uid

        var updateRequests = {};
        updateRequests['requests/patient/'+reqID+'/status'] = 1;
        updateRequests['users/'+userId+'/patientrequests/'+reqID] = '';
        firebase.database().ref().update(updateRequests)
        .then(()=>{
            console.log('Success')
            }).catch((error)=>{
                console.log('error ' , error);
            })

    }

    tickAction(reqID) 
    {
        console.log("Yaay");

    }

    crossAction(reqID)
    {
        console.log("YaayCross");
    }

    render()
    {

        return(
        <View style = { styles.containerStyle }>
            <ScrollView style = {{ flex: 1 }}>
                { this.renderList()}
            </ScrollView>
        </View>
        );
    }

}

const styles = {

    containerStyle: {
        flex: 1,
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


export default DocPatientRequest;

