import React, {Component} from 'react';
import {connect} from 'react-redux';
import {components} from '../../utils/styles';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,


} from 'react-native';


class singleDeck extends Component {


    render() {


        const {deck} = this.props;


        return (
            <View style={components.content}>

                {
                    deck.map((deck) => {
                        return (
                            <View key={deck.title} >


                                <View style={components.card}>
                                    <Text style={components.cardTitleText}>{deck.title}</Text>
                                    <Text style={components.cardSubText}>{deck.questions.length + ' cards'}</Text>
                                </View>
                                <View style={components.buttonView}>
                                    <TouchableOpacity style={components.button} onPress={() => this.props.navigation.navigate('AddCard', {title: deck.title})}>
                                        <Text style={components.textButton}>Add Card</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={components.button} onPress={() => this.props.navigation.navigate('Quiz', {title: deck.title})}>
                                        <Text style={components.textButton}>Start Quiz</Text>
                                    </TouchableOpacity>

                                </View>


                            </View>

                        )
                    })
                }


            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {

    return {
        deck: state.decksReducer.decks.filter((deck) => ownProps.navigation.state.params.title === deck.title),


    }
}


const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(singleDeck);