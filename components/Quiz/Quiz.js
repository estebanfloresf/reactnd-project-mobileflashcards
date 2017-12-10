import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated
} from 'react-native';
import {connect} from 'react-redux';
import {components, colors} from '../../utils/styles';
import FlipCard from 'react-native-flip-card'


class Quiz extends Component {

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({value}) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
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

        return (


            <View style={[components.content, {justifyContent: 'space-around'}]}>
                {
                    len>0 ?    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={true}
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
                                    <Animated.View style={[ components.flipCard, frontAnimatedStyle]}>
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

                                    <TouchableOpacity style={[components.button, {backgroundColor: colors.success}]}>
                                        <Text style={[components.textButton, {color: colors.white}]}>Correct</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[components.button, {backgroundColor: colors.warning}]}>
                                        <Text style={[components.textButton, {color: colors.white}]}>Incorrect</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    ((index + 1) < len) && <View>
                                        <Text style={[components.cardSubText, {
                                            color: colors.text,
                                            fontSize: 15,
                                            textAlign: 'center'
                                        }]}>Swipe Right to continue -> </Text>
                                    </View>
                                }

                            </View>


                        ))}
                    </ScrollView>
                        : <View>
                            <Text style={{color: colors.warning}}>You need to add questions to start</Text>
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

const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
