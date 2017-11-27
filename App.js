import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Constants} from 'expo';
import Decks from './components/Decks';
import {theme} from "./helpers/colors";


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

            <View style={{flex: 1}}>
                <StatusBarCards backgroundColor={theme.primary} barStyle='light-content'/>
                <View style={styles.container}>

                    <Text>Hola</Text>
                </View>
            </View>
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
