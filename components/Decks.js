import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {white, theme} from "../utils/colors";
import {saveDeckTitle, getDecks,getDeck,addCardToDeck} from "../utils/helpers";


class Decks extends Component {

    state = {text: 'Useless Placeholder'};

    componentDidMount() {

    }


    actionAddDeck = () => {

        saveDeckTitle(this.state.text);

    };

    actionGetDecks = () => {

        getDecks();
    };

    actionGetSingleDeck = () => {

        getDeck(this.state.text);
    };

    actionAddCardDeck = () => {
       addCardToDeck(this.state.text,{});

    } ;

    render() {

        return (
            <View style={styles.content}>
                <View style={styles.container}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({text})}
                        onFocus= {() => this.setState({text : ''})}
                        value={this.state.text}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={this.actionAddDeck} style={styles.button}>
                        <Text style={styles.textButton}>Add Deck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.actionGetDecks} style={styles.button}>
                        <Text style={styles.textButton}>Get Decks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.actionAddCardDeck} style={styles.button}>
                        <Text style={styles.textButton}>Single</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.secondary,
        alignItems: 'center',
        justifyContent: 'center',

    },
    container: {
        flex:3,
        justifyContent: 'center',
        margin: 5,
        padding: 2,
        width: 300,

    },
    buttonGroup:{
        flex:1,
        justifyContent: 'center',
        flexDirection: 'row',

    },

    button: {
        flex: 1,


        padding: 2,
        margin: 2,
        backgroundColor: theme.primary,
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 2,
        marginLeft: 2,
        justifyContent: 'center',

    },
    textButton: {
        color: theme.info,
        textAlign: 'center',

        alignItems: 'center',
        fontSize: 15,
        padding: 4,
    }
});

export default Decks;