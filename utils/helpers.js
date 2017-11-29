import {AsyncStorage} from 'react-native'

export async function getDecks() {

    return await AsyncStorage.getAllKeys()
        .then((keys) => {
            return keys
        })
        .catch(() => {
            return 'Error getting the Decks'
        });

}

export async function saveDeckTitle(title) {

    // 1. The title wil be the key in AsyncStorage
    const key = title.trim().toLowerCase();
    // 2. Array of cards it will have the decks
    const questions = [];
    // 3. Create the object deck
    const newDeck = {
        title: key,
        questions
    };

    // We saved at AsyncStorage, if successful return true
    return await AsyncStorage.setItem(key, JSON.stringify(newDeck))
        .then(() => {
            return true
        })
        .catch(() => {
            console.log('There was an error saving the deck '+title);
            return false
        });
    
}

export async function getDeck(title) {
    return await AsyncStorage.getItem(title.trim().toLowerCase())
        .then((deck) => {

            return deck
        })
        .catch(() => {
            console.log('There was an error getting the deck '+title);
            return false
        });
}


export async function addCardToDeck(title,card) {

    card = {
        question: 'test question',
        answer: 'test answer'
    };

    return await AsyncStorage.getItem(title.trim().toLowerCase())
        .then(JSON.parse)
        .then((deck) => {
            deck.questions.push(card);
            return deck
        })
        .catch(() => {
            return 'Error adding the card '+ card+' to the deck ' + title
        });
}
