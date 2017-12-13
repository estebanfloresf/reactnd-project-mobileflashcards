import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native';
import {connect} from 'react-redux';
import {components, colors, width} from '../../utils/styles';
import Results from './Results';


class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            next: 0,
        };
    }


    componentDidMount() {
        this.setState({
            score: 0,
            next: 0,
        })
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({value}) => {
            this.value = value;
        });
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        });
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }

    }

    Score(len, action) {


        this.setState({
            score: action === 'add' ? this.state.score + 1 : this.state.score,
            next: this.state.next + width
        }, () => {
            if (this.state.next < len * width) {

                this.refs._scrollView.scrollTo({x: this.state.next, y: 0, animated: true});
            }
            else {
                this.props.navigation.navigate('Results', {
                    title: this.props.decks[0].title,
                    result: this.state.score,
                    total: len
                })
            }

        });


    };


    render() {


        const {decks} = this.props;

        const len = decks[0].questions.length;
        const frontAnimatedStyle = {
            transform: [
                {rotateY: this.frontInterpolate}
            ]
        };
        const backAnimatedStyle = {
            transform: [
                {rotateY: this.backInterpolate}
            ]
        };
        if(decks[0].length){
            return <View></View>;
        }
        return (


            <View style={[components.content, {justifyContent: 'space-around'}]}>
                {
                    len > 0 ? <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={true}
                            ref='_scrollView'
                        >
                            {decks[0].questions.map((card, index) => (

                                <View key={index}>
                                    <View>
                                        <Text style={[components.cardSubText, {
                                            color: colors.text,
                                            fontSize: 30,
                                            paddingLeft: 4
                                        }]}>{index + 1 + '/' + len}</Text>
                                    </View>

                                    <View style={components.card}>
                                        <Animated.View style={[components.flipCard, frontAnimatedStyle]}>
                                            <Text style={[components.cardTitleText, {fontSize: 40}]}>{card.question}</Text>
                                            <TouchableOpacity onPress={() => this.flipCard()}>

                                                <Text style={[components.cardSubText, {color: colors.info, fontSize: 20}]}>See
                                                                                                                           Answer</Text>
                                            </TouchableOpacity>
                                        </Animated.View>
                                        <Animated.View
                                            style={[backAnimatedStyle, components.flipCard, components.flipCardBack]}>
                                            <Text style={[components.cardTitleText, {fontSize: 40}]}>{card.answer}</Text>
                                            <TouchableOpacity onPress={() => this.flipCard()}>

                                                <Text style={[components.cardSubText, {color: colors.info, fontSize: 20}]}>Back</Text>
                                            </TouchableOpacity>
                                        </Animated.View>
                                    </View>


                                    <View style={components.buttonView}>

                                        <TouchableOpacity
                                            style={[components.button, {backgroundColor: colors.success}]}
                                            onPress={() => {
                                                this.Score(len, 'add');

                                            }}
                                        >
                                            <Text
                                                style={[components.textButton, {color: colors.successText}]}>Correct</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[components.button, {backgroundColor: colors.warning}]}
                                            onPress={() => {
                                                this.Score(len, 'none');

                                            }}
                                        >
                                            <Text
                                                style={[components.textButton, {color: colors.warningText}]}>Incorrect</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>


                            ))}
                        </ScrollView>
                        : <View>
                            <Text style={{color: colors.warningText, fontSize: 30}}>You need to add cards to start 😄</Text>
                        </View>
                }


            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {

    return {
        decks: state.decksReducer.decks.filter((deck) => ownProps.navigation.state.params.title === deck.title),

    }
}

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
