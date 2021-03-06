import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,

} from 'react-native';
import {components} from '../../utils/styles';
import {NavigationActions} from 'react-navigation';
import {clearLocalNotification,setLocalNotification} from "../../utils/helpers";


class Results extends Component {


    state = {
        result: this.props.navigation.state.params.result,
        total: this.props.navigation.state.params.total,
        title: this.props.navigation.state.params.title,
    };


    componentDidMount(){
        clearLocalNotification()
            .then(setLocalNotification)
    }


    resetQuiz = NavigationActions.reset({

        index:2,
        actions: [

            NavigationActions.navigate({ routeName: 'Home'}),
            NavigationActions.navigate({ routeName: 'singleDeck',params:{title:this.state.title}}),
            NavigationActions.navigate({ routeName: 'Quiz',params:{title:this.state.title}})
        ]
    });
     resetDeck = NavigationActions.reset({
         index:1,
         actions: [

             NavigationActions.navigate({ routeName: 'Home'}),
             NavigationActions.navigate({ routeName: 'singleDeck',params:{title:this.state.title}}),

         ]
    });

    render() {
        const {result, total, title} = this.state;



        return (
            <View style={[components.content, {justifyContent: 'space-around'}]}>
                <View style={components.card}>
                    <Text style={[components.cardTitleText, {fontSize: 40}]}>You scored {result} out of {total}</Text>

                </View>
                <View style={components.buttonView}>
                    <TouchableOpacity style={components.button} onPress={() => {

                        this.props.navigation.dispatch(this.resetQuiz)
                    }}>
                        <Text style={components.textButton}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={components.button}
                                      onPress={() =>
                                          this.props.navigation.dispatch(this.resetDeck)

                                      }>
                        <Text style={components.textButton}>Back to Deck</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default Results;