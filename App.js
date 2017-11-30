import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Constants} from 'expo';
import Decks from './components/Decks';
import {theme} from "./utils/colors";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware,compose} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { TabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'



import AddDeck from './components/AddDeck';

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
            tabBarLabel: 'View Decks',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions:{
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />

        }
    },
},{

    tabBarOptions: {
        activeTintColor: theme.secondary,
        labelStyle: {
            fontSize: 14,
        },
        style: {
            backgroundColor: theme.primary,
        },
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
                    <StatusBarCards backgroundColor={theme.primary} barStyle='light-content'/>
                    <Tabs/>
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
        backgroundColor: theme.secondary
    },
});
