import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, Keyboard, TextInput, TouchableWithoutFeedback} from 'react-native';
import {components, colors} from "../../utils/styles";
import {connect} from 'react-redux';
import {addDeck, addDeckFail} from '../../actions/Decks';


class AddDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {deckTitle: 'Your Deck Title'};
    }

    _addDeck = () => {
        this.props.addDeck(this.state.deckTitle);
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