import React, {Component} from 'react';
import {

    View,
    Text,
    TouchableOpacity,
    FlatList,

} from 'react-native';

import {fetchDecks} from '../../actions/Decks';
import {connect} from 'react-redux';
import {components, colors, width} from '../../utils/styles';

class Decks extends Component {

    state = {
        text: 'Title Deck',
        decks: [],
        activeRowKey: null,
    };


    // componentWillMount(){
    //     this.props.fetchDecks();
    // }

    componentDidMount() {
        this.props.fetchDecks();
    }


    render() {
        const {decks, deckFetching, deckFail} = this.props;
        console.log(this.props.navigation);
        return (
            <View style={components.content}>

                {
                    deckFetching ? <Text style={{color: colors.info, fontSize: 50}}>Loading...</Text>
                        : deckFail ?
                        <Text style={{color: colors.warningText, fontSize: 50}}>Sorry we couldn't get your decks</Text>
                        : decks ?
                            <FlatList
                                style={{width: width}}
                                data={decks}
                                keyExtractor={(item, index) => index}
                                renderItem={({item, index}) =>

                                    < TouchableOpacity
                                        style={[components.card,{height:width*0.6,margin:5,padding:2}]}
                                        onPress={() => this.props.navigation.navigate('singleDeck', {title: item.title})}>


                                        <View>
                                            <Text style={components.cardTitleText}>{item.title}</Text>
                                        </View>
                                        <View>
                                            <Text
                                                style={components.cardSubText}>{item.questions.length + ' cards'}</Text>
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
console.log(state.decksReducer.decks);
    return {
        decks: state.decksReducer.decks,
        deckFetching: state.decksReducer.deckFetching,
        deckFail: state.decksReducer.deckFail
    }
}


const mapDispatchToProps = {
    fetchDecks
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Decks);