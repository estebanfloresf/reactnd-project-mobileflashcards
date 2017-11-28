import {  AsyncStorage } from 'react-native'

export async function getAllDecks() {
    try {
        const value = await AsyncStorage.getA('@MySuperStore:key');
        if (value !== null){
            // We have data!!
            console.log(value);
        }
    } catch (error) {
        console.log('There was an error: ',error);
    }
}

export  function addDeck(title) {
    try {
         AsyncStorage.setItem('one', 'I like to save it.');
         AsyncStorage.setItem('two', 'I like to save it.');
         AsyncStorage.setItem('three', 'I like to save it.');
    } catch (error) {
        console.log('There was an error: ',error);
    }
}