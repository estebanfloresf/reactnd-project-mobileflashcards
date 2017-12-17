import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addCard, addCardFail} from '../../actions/Cards';
import {components, colors} from '../../utils/styles';
import {

    View,
    Alert,
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

    _addCard = () => {

        const card = {
            question: this.state.question,
            answer: this.state.answer
        };
        this.props.addCard(this.state.title, card);

        this.setState({
            question: 'Question',
            answer: 'Answer',
        })
    };

    render() {
        const {question, answer} = this.state;
        const {fetching, success, failed} = this.props;
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
                                fetching ? <Text style={{textAlign: 'center'}}>Loading...</Text>
                                    : failed ?
                                    Alert.alert(
                                        'Add Card Error',
                                        'That card is already in use or is an invalid',
                                        [

                                            {text: 'Change Card', onPress: () => this.props.addCardFail(false)},

                                        ],
                                        {cancelable: false}
                                    )
                                    : success && Alert.alert(
                                    'Card Added',
                                    'Your card  has been added',
                                    [

                                        {
                                            text: 'Awesome', onPress: () => {
                                            this.props.addCardFail(false);
                                            this.props.navigation.goBack()
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
        fetching: state.cardsReducer.addCardFetching,
        success: state.cardsReducer.addCardSuccess,
        failed: state.cardsReducer.addCardFail,
    }
}


const mapDispatchToProps = {
    addCard,

    addCardFail
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);