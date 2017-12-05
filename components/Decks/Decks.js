import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,

} from 'react-native';
import {white, theme} from "../../utils/colors";
import {fetchDecks} from '../../actions/index';
import {connect} from 'react-redux';
import Swipeout from 'react-native-swipeout';


class Decks extends Component {

    state = {
        text: 'Title Deck',
        decks: [],
        activeRowKey: null,
    };


    componentDidMount() {
        this.props.fetchDecks();
    }


    render() {
        const {decks, deckFetching, deckFail} = this.props;

        return (
            <View style={styles.content}>

                {
                    deckFetching ? <Text style={{color: theme.info, fontSize: 50}}>Loading...</Text>
                        : deckFail ?
                        <Text style={{color: theme.warning, fontSize: 50}}>Sorry we couldn't get your decks</Text>
                        : decks ?
                            <FlatList
                                data={decks}
                                keyExtractor={(item, index) => index}
                                renderItem={({item,index}) =>


                                    <TouchableOpacity style={styles.cards}
                                                      onPress={() => this.props.navigation.navigate('singleDeck', {title: item.title, key:index})}>

                                        <View style={styles.titleCard}>
                                            <Text style={{color: white, fontSize: 30}}>{item.title}</Text>
                                        </View>
                                        <View style={styles.subtitleCard}>
                                            <Text style={{
                                                color: white,
                                                fontSize: 15,
                                                textAlign: 'right',


                                            }}>
                                                {item.questions.length + ' cards'}
                                            </Text>
                                        </View>


                                    </TouchableOpacity>

                                }
                            />
                            : decks.length < 0 && <Text>It looks you haven't add any decks yet =)</Text>


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

    cards: {
        backgroundColor: theme.primary,

        flex: 3,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 300,
        height: 150,
        margin: 5,
        padding: 3
    },

    contentCard: {
        flex: 1
    },
    titleCard: {
        flex: 2
    },
    subtitleCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Decks);