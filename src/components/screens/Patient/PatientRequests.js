import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PatientRequestCard from '../../PatientRequestCard';
import firebase from 'firebase'
require('firebase/auth')

class PatientRequests extends Component {
    state = {
        requests: {},
        myrequests: {},
        expanded: {},
        colors: {},

    }
    
     componentDidMount() 
    {
       firebase.database().ref('requests/patient').on('value', (r) => {
           firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/myrequests').on('value', (mr) => {
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
                                col[reqIDs[i]] = '#ccc'
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
                renderArray.push(<PatientRequestCard data = { this.state.requests[reqIDs[i]] } expanded = { this.state.expanded[reqIDs[i]] } 
                    toggle = { this.toggle.bind(this, reqIDs[i]) } colors = { this.state.colors[reqIDs[i]] } id = { reqIDs[i] }/>)
        }
        return renderArray;
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



export default PatientRequests;