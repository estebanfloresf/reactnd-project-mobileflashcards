import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, Keyboard, TextInput, TouchableWithoutFeedback} from 'react-native';
import {components, colors} from "../../utils/styles";
import {connect} from 'react-redux';
import {addDeck, addDeckFail} from '../../actions/Decks';
import {NavigationActions} from 'react-navigation';


class AddDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {deckTitle: 'Your Deck Title'};
        this._addDeck = this._addDeck.bind(this);
        this._goToDeck = this._goToDeck.bind(this);
    }

    _addDeck = () => {
        this.props.addDeck(this.state.deckTitle);
    };

    _goToDeck = () => {
        this.props.navigation.dispatch(NavigationActions.reset({

            index: 1,
            actions: [

                NavigationActions.navigate({routeName: 'Home'}),
                NavigationActions.navigate({routeName: 'singleDeck', params: {title: this.state.deckTitle}}),

            ]
        }));
        this.setState({deckTitle: 'Your Deck Title'})
    };

    render() {
        const {deckTitle} = this.state;
        const {deckFetching, deckError, deckSuccess} = this.props;
        return (
            <View style={components.content}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                        <View style={[components.card, {
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: colors.secondary
                        }]}>
                            <TextInput
                                style={components.inputFieldText}
                                onChangeText={(newdeckTitle) => this.setState({deckTitle: newdeckTitle})}
                                value={deckTitle}
                                onFocus={() => this.setState({deckTitle: ''})}
                            />
                        </View>
                        <View style={components.buttonView}>
                            <TouchableOpacity style={components.button} onPress={() => {
                                this._addDeck();
                                Keyboard.dismiss()
                            }}>
                                <Text style={components.textButton}>Add Deck</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={components.messages}>
                            {
                                deckFetching ? <Text style={{textAlign: 'center'}}>Loading...</Text>
                                    : deckError ?
                                    Alert.alert(
                                        'Add Deck Error',
                                        'That deck title is already in use or is an invalid title',
                                        [

                                            {text: 'Change Title', onPress: () => this.props.addDeckFail(false)},

                                        ],
                                        {cancelable: false}
                                    )
                                    : deckSuccess && Alert.alert(
                                    'Deck Added',
                                    'Your deck  has been added',
                                    [

                                        {
                                            text: 'Awesome', onPress: () => {
                                            this.props.addDeckFail(false);
                                            this._goToDeck();

                                        }
                                        },

                                    ],
                                    {cancelable: false}
                                    )

                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        deckSuccess: state.decksReducer.addDeckSuccess,
        deckError: state.decksReducer.addDeckError,
        deckFetching: state.decksReducer.addDeckFetching,
    }
}

const mapDispatchToProps = {
    addDeck,
    addDeckFail,

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDeck);