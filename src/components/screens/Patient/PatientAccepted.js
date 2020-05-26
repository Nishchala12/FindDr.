import React, { Component } from 'react';
import { View, ScrollView,Text, Dimensions } from 'react-native';
import PatientRequestCard from '../../PatientRequestCard';
import firebase from 'firebase'
require('firebase/auth')

let phoneHeight = Dimensions.get('window').height;
let phoneWidth = Dimensions.get('window').width;
let hf = phoneHeight/738.1818181818181;
let wf = phoneWidth/392.72727272727275;

class PatientAccepted extends Component {
    state = {
        requests: {},
        myrequests: {},
        expanded: {},
        colors: {},

    }
    
     componentDidMount() 
    {
        let authUID = firebase.auth().currentUser.uid
        firebase.database().ref('requests/patient').on('value', (r) => {
           firebase.database().ref('users/'+authUID+'/myrequests').on('value', (mr) => {
                if( r.val() && r.val() != null )
                {
                    if( mr.val() && mr.val() != null)
                    {
                        this.setState({ requests: r.val(), myrequests: mr.val() },  () => {
                            let reqIDs = Object.keys( this.state.myrequests );
                            let temp = {};
                            let col = {};
                            for(let i=0; i<reqIDs.length; i++)
                            {
                                temp[reqIDs[i]] = false
                                if(this.state.requests[reqIDs[i]].status==1)
                                    col[reqIDs[i]] = '#ccc'
                                else if(this.state.requests[reqIDs[i]].status==2)
                                    col[reqIDs[i]] = '#d0f0c0'
                                else if(this.state.requests[reqIDs[i]].status==3)
                                 col[reqIDs[i]] = '#ffcccb'
                            }
                            this.setState({ expanded: temp, colors: col })
                        })
                    }
                    else
                    {
                        this.setState({ requests: r.val() })
                    }
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
        let reqIDs = Object.keys( this.state.myrequests );
        for(let i=0; i<reqIDs.length; i++)
        {
            if(this.state.requests[reqIDs[i]].status==1||this.state.requests[reqIDs[i]].status==2||this.state.requests[reqIDs[i]].status==3)
            {
                renderArray.push(<PatientRequestCard data = { this.state.requests[reqIDs[i]] } expanded = { this.state.expanded[reqIDs[i]] } 
                    toggle = { this.toggle.bind(this, reqIDs[i]) } colors = { this.state.colors[reqIDs[i]] }
                    tickAction = { this.tickAction.bind(this, reqIDs[i]) } crossAction = { this.crossAction.bind(this, reqIDs[i]) }
                    id = { reqIDs[i] }/>)
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

    tickAction(id) {
        let t = this.state.colors
        t[id]='#d0c0f0'
        this.setState({ colors: t })
        firebase.database().ref('requests/patient/'+id).update({
            status: 2
        })
        .then(()=>{
            console.log('Success')
            }).catch((error)=>{
                console.log('error ' , error);
            })
    }

    crossAction(id) {
        let t = this.state.colors
        t[id]='#ffcccb'
        this.setState({ colors: t })
        firebase.database().ref('requests/patient/'+id).update({
            status: 3
        })
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

export default PatientAccepted;