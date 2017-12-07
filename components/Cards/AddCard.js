import React, {Component} from 'react';
import {connect} from 'react-redux';
import {components} from '../../utils/styles';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,


} from 'react-native';


class AddCard extends Component{
    render(){
        return(
            <View>
                <Text>{this.props.navigation.state.params.title}</Text>
            </View>
        )
    }
}

export default AddCard;