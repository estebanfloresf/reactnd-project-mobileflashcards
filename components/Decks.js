import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    ScrollView,
    ListView,
    SectionList
} from 'react-native';
import {white, theme} from "../utils/colors";
import {fetchDecks} from '../actions/index';
import {connect} from 'react-redux';


class Decks extends Component {

    state = {
        text: 'Title Deck',
        decks: []
    };

    componentDidMount() {
        this.props.fetchDecks();
    }


    // actionAddDeck = () => {
    //
    //     saveDeckTitle(this.state.text);
    //
    // };
    //
    // actionGetDecks = () => {
    //
    //     getDecks();
    // };
    //
    // actionGetSingleDeck = () => {
    //
    //     getDeck(this.state.text);
    // };
    //
    // actionAddCardDeck = () => {
    //    addCardToDeck(this.state.text,{});
    //
    //
    // } ;
    render() {
        const {decks, deckFetching, deckFail} = this.props;

        return (
            <View style={styles.content}>

                {
                    deckFetching ? <Text>Loading...</Text>
                        : deckFail ? <Text>Sorry we couldn't get your decks</Text>
                        : decks.length < 0 ? <Text>It looks you haven't add any decks yet =)</Text>
                            :
                            <FlatList
                                data={decks}
                                renderItem={({item}) =>
                                    <View key={item.title} style={styles.cards}>
                                        <Text style={{color:white, fontSize: 30}}>{item.title}</Text>
                                    </View>}
                            />

                }

            </View>
        )
    }
}

function mapStateToProps(state) {

    return {
        decks: state.decksReducer.decks,
        deckFetching: state.decksReducer.deckFetching,
        deckFail: state.decksReducer.deckFail
    }
}


const mapDispatchToProps = {
    fetchDecks
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: theme.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 5,
        justifyContent: 'center',
        margin: 5,
        padding: 2,
        width: 300
    },
    buttonGroup: {
        flex: 1,
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
    },

    cards:{
        backgroundColor: theme.primary,

        flex:3,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
width:300,
        height: 300,
        margin: 2,
        padding:2
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Decks);