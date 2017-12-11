import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Constants} from 'expo';
import Decks from './components/Decks/Decks';
import {colors} from "./utils/styles";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware,compose} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { TabNavigator , StackNavigator} from 'react-navigation';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import AddDeck from './components/Decks/addDeck';
import singleDeck  from  './components/Decks/singleDeck';
import AddCard from './components/Cards/AddCard';
import Quiz from './components/Quiz/Quiz';
import Results from './components/Quiz/Results';




const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk,logger)

    )
);

const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions:{
            title: 'Decks',
            tabBarLabel: 'View Decks',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions:{
            title: 'Add Deck',
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />

        }
    }
} , {

    tabBarOptions: {
        activeTintColor: colors.white,
        labelStyle: {
            fontSize: 14,
        },
        style: {
            backgroundColor: colors.primary,
        },
    }
});


const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions:{
            title: 'Decks',
            headerTintColor:colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            title: 'Add Deck',
            headerTintColor:colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },
        }
    },
    singleDeck:{
        screen: singleDeck,
        navigationOptions:({ navigation }) => ({
            title:  `${navigation.state.params.title}`,
            headerTintColor:colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },

        })

    },
    AddCard:{
        screen: AddCard,
        navigationOptions:({ navigation }) => ({
            title:  `${navigation.state.params.title}`,
            headerTintColor:colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },

        })

    },
    Quiz:{
        screen: Quiz,
        navigationOptions:({ navigation }) => ({
            title:  `Quiz - ${navigation.state.params.title}`,
            headerTintColor:colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },

        })

    },
    Results:{
        screen: Results,
        navigationOptions:({ navigation }) => ({
            title:  `Results - ${navigation.state.params.title}`,
            headerTintColor:colors.white,
            headerLeft: null,
            headerStyle: {

                backgroundColor: colors.primary,
            },

        })

    }
});

function StatusBarCards({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>

        </View>
    )
}


export default class App extends React.Component {


    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBarCards backgroundColor={colors.primary} barStyle='light-content'/>
                    <MainNavigator/>
                </View>
            </Provider>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary
    },
});
