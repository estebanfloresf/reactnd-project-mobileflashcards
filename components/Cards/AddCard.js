import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addCard} from '../../actions/Cards';
import {components,colors} from '../../utils/styles';
import {

    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput

} from 'react-native';


class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.title,
            question: 'Question',
            answer: 'Answer',
        };
    }

    _addCard = () =>{

        const card = {
            question: this.state.question,
            answer: this.state.answer
        };
        this.props.addCard(this.state.title,card);

        this.setState({
            question: 'Question',
            answer: 'Answer',
        })
    };
    render() {
        const {question, answer} = this.state;
        const {addCardFetching, addCardSuccess, addCardFail} = this.props;
        return (
            <View style={components.content}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                        <View style={[components.card, {
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: colors.secondary
                        }]}>
                            <View style={{marginTop: 5}}>
                                <TextInput
                                    style={components.inputFieldText}
                                    onChangeText={(newQuestion) => this.setState({question: newQuestion})}
                                    value={question}
                                    onFocus={() => this.setState({question: ''})}
                                />
                            </View>
                            <View style={{marginTop: 5}}>
                                <TextInput
                                    style={components.inputFieldText}
                                    onChangeText={(newAnswer) => this.setState({answer: newAnswer})}
                                    value={answer}
                                    onFocus={() => this.setState({answer: ''})}
                                />
                            </View>

                        </View>

                        <View style={components.buttonView}>
                            <TouchableOpacity style={components.button} onPress={() => {
                                this._addCard();
                                Keyboard.dismiss()
                            }}>
                                <Text style={components.textButton}>Add Card</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={components.messages}>
                            {
                                addCardFetching ? <Text style={{textAlign: 'center'}}>Loading...</Text>
                                    : addCardFail ?
                                    Alert.alert(
                                        'Add Card Error',
                                        'That card is already in use or is an invalid',
                                        [

                                            {text: 'Change Card', onPress: () => this.props.addCardFail(false)},

                                        ],
                                        {cancelable: false}
                                    )
                                    : addCardSuccess && Alert.alert(
                                    'Card Added',
                                    'Your card  has been added',
                                    [

                                        {text: 'Awesome', onPress: () => this.props.addDeckFail(false)},

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
        // decks: state.decksReducer.decks,
        // deckFetching: state.decksReducer.deckFetching,
        // deckFail: state.decksReducer.deckFail,
        addCardFetching : state.decksReducer.addCardFetching,
        addCardSuccess : state.decksReducer.addCardSuccess,
        addCardFail : state.decksReducer.addCardFail,
    }
}


const mapDispatchToProps = {
    addCard
};

export default connect(mapStateToProps,mapDispatchToProps)( AddCard);