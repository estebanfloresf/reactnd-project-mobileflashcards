import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Constants} from 'expo';
import Decks from './components/Decks';
import {theme} from "./utils/colors";
import {Provider} from 'react-redux';
import {createStore,compose, applyMiddleware} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';


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
                    <View style={styles.container}>

                        <Decks/>
                    </View>
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
