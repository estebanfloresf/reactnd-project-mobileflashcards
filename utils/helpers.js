import {  AsyncStorage } from 'react-native'

export async function getAllDecks() {
    try {
        const value = await AsyncStorage.getAllKeys()
            .then((keys)=>{console.log(keys)})

    } catch (error) {
        console.log('There was an error: ',error);
    }
}

export  function addDeck(item) {
    try {

            const newDeck = item.trim().toLowerCase();


         AsyncStorage.setItem(newDeck, 'I like to save it.');


    } catch (error) {
        console.log('There was an error: ',error);
    }
}