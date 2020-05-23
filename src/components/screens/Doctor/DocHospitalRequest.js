import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import HospitalRequestCard from '../../HospitalRequestCard';
import firebase from 'firebase'
require('firebase/auth')

class DocHospitalRequest extends Component {
    state = {
        requests: {},
        expanded: {},
        colors: {},

    }
    
    componentDidMount() 
    {
       firebase.database().ref('requests/hospital').on('value', (r) => {
            if( r.val() && r.val() != null)
            {
                this.setState({ requests: r.val() }, () => {
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
        return renderArray;
    }

    tickAction(reqID) 
    {
        var user = firebase.auth().currentUser
        var userId = user.uid

        var updateRequests = {};
        updateRequests['requests/hospital/'+reqID+'/status'] = 1;
        updateRequests['users/'+userId+'/hospitalrequests/'+reqID] = '';
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

