import React from 'react';
import { View, StatusBar} from 'react-native';
import {Constants} from 'expo';
import {colors} from "./utils/styles";
import {Provider} from 'react-redux';
import {setLocalNotification} from "./utils/helpers";
import store from './store/index';
import MainNavigator from './navigation/routes';


function StatusBarCards({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>

        </View>
    )
}


export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification();
    }

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


