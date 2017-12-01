import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {white, theme} from "../utils/colors";
import {saveDeckTitle, getDecks, getDeck, addCardToDeck} from "../utils/helpers";


class AddDeck extends Component {
    state = {text: 'Deck Title'};


    render() {

        return (
            <View style={styles.content}>
                <TouchableOpacity style={{backgroundColor:theme.primary}} >
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>
                <View>
                    <Text>Title</Text>
                </View>
                <View>
                    <TextInput
                        style={{height: 40, width: 200, borderBottomColorColor: theme.primary, borderWidth: 2}}
                        onChangeText={(text) => this.setState({text})}
                        onFocus={() => this.setState({text: ''})}
                        value={this.state.text}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity >
                        <Text style={styles.textButton}>Add</Text>
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

export default AddDeck;