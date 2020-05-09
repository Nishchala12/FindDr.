import React, { Component } from 'react';
import { View, Text } from 'react-native';
import HospitaRequestCard from '../../HospitalRequestCard';


class DocHospitalAccepted extends Component {
    state = {
        requests: {},
        myRequests: [],
        expanded: [],

    }
    
    /* componentDidMount() 
    {
       firebase.database().ref('requests/').on('value', (r) => {
           firebase.database.ref('users/'+firebase.auth().currentUser.uid+'/myrequests').on('value', (mr) => {
                if( r.val() && r.val() != null )
                {
                    if( mr.val() && mr.val() != null)
                    {
                        this.setState({ requests: r.val(), myRequests: mr.val() })
                    }
                    else
                    {
                        this.setState({ requests: r.val() })
                    }
                }
           })
       })
    } 
    
    renderList()
    {
        sampleArray = [];
        for(i=0; i<dataArray.length; i++)
            sampleArray.push(<HospitaRequestCard data = { this.state.requests[i] } expanded = { this.state.expanded[i] }/>)
        return sampleArray;
    } */
    
    render()
    {

        return(
        
        <View>
            <Text>ffrhjzjt</Text>
        </View>

        );

        {/* <View style = { styles.containerStyle }>
        <ScrollView>
            <View style = { styles.welcomeStyle}>
                <Text style ={{color: "#59bfff", fontWeight: "bold", fontSize: 16}} >{ this.state.user.hname ?  'Welcome '+ this.state.user.hname : '' }!!!</Text>
            </View>
            <View>
                { this.renderList(SampleNameArray)}
            </View>
        </ScrollView>
     </View>
        */}
    }

}

export default DocHospitalAccepted;

