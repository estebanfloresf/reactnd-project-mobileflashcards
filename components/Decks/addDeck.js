import React, {Component} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity, Keyboard, TextInput} from 'react-native';
import {components, colors} from "../../utils/styles";
import {connect} from 'react-redux';
import {addDeck, addDeckFail} from '../../actions/index';


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
        const {addDeckFetching, addDeckError, addDeckSuccess} = this.props;
        return (

            <View style={components.content}>
                <View style={[components.card, {justifyContent:'flex-end',alignItems: 'center', backgroundColor:colors.secondary}]}>
                    <TextInput
                        style={styles.inputFieldText}
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

                <View style={styles.messages}>
                    {
                        addDeckFetching ? <Text style={{textAlign: 'center'}}>Loading...</Text>
                            : addDeckError ?
                            Alert.alert(
                                'Deck Duplicated',
                                'Your title is already in use',
                                [

                                    {text: 'Change Title', onPress: () => this.props.addDeckFail(false)},

                                ],
                                {cancelable: false}
                            )
                            : addDeckSuccess && Alert.alert(
                            'Deck Added',
                            'Your deck  has been added',
                            [

                                {text: 'Awesome', onPress: () => this.props.addDeckFail(false)},

                            ],
                            {cancelable: false}
                            )

                    }
                </View>

            </View>


        )
    }
}


function mapStateToProps(state) {

    return {
        addDeckSuccess: state.decksReducer.addDeckSuccess,
        addDeckError: state.decksReducer.addDeckError,
        addDeckFetching: state.decksReducer.addDeckFetching,
    }
}

const mapDispatchToProps = {
    addDeck,
    addDeckFail

};

const styles = StyleSheet.create({

    inputFieldText: {
        height: 50,
        width: 300,

        borderBottomColor: colors.primary,
        borderBottomWidth: 3,
        textAlign: 'center',
        backgroundColor: colors.white,
    },

    textButton: {
        color: colors.info,
        textAlign: 'center',
        fontSize: 25,
        padding: 2,
    },
    messages: {
        flex: 2,
        justifyContent: 'flex-start',

    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDeck);