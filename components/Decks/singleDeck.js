import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,

} from 'react-native';


class singleDeck extends Component{

    state ={
      title:   this.props.navigation.state.params.title
    };


    render(){

        const {title} = this.state;
        const {deck} = this.props;
        console.log(deck);
        return(
            <View>
                <Text>
                    {title}               </Text>
            </View>
        )
    }
}
function mapStateToProps(state,ownProps) {

    return {
        deck: state.decksReducer.decks.filter((deck) => ownProps.navigation.state.params.title === deck.title ),
        // deck: state.decksReducer.decks,

    }
}


const mapDispatchToProps = {

};
export default connect(mapStateToProps,mapDispatchToProps)(singleDeck);