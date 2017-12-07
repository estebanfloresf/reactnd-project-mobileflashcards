import {AsyncStorage, Alert} from 'react-native'

export function getDecks() {

    return AsyncStorage.getAllKeys()
        .then((decks) => {
            const newArray = [];
            for (var i = 0; i < decks.length; i++) {

                AsyncStorage.getItem(decks[i])
                    .then(JSON.parse)
                    .then((deck) => {
                        newArray.push(deck);

                    })
                    .catch((error) => {
                        console.log('There was an error getting the deck ' + error);
                        return false
                    });

            }


            return newArray
        })
        .catch(() => {
            return 'Error getting the Decks'
        });

}

export function saveDeckTitle(title) {

    //Verify if the deck name already exists
    return AsyncStorage.getAllKeys()
        .then((decks) => {
            let existDups = decks.filter((deck) => deck === title);
            if (existDups.length > 0) {

                return false
            } else {
                if (title.length <= 0) {
                    return false
                }
                else {
                    // 1. The title wil be the key in AsyncStorage
                    const key = titleCapitalize(title.trim().toLowerCase());
                    // 2. Array of cards it will have the decks
                    const questions = [];
                    // 3. Create the object deck
                    const newDeck = {
                        title: key,
                        questions
                    };


                    // We saved at AsyncStorage, if successful return true
                    AsyncStorage.setItem(key, JSON.stringify(newDeck));


                    return AsyncStorage.getItem(key)
                        .then(JSON.parse)
                        .then((deck) => {

                            return deck
                        })
                        .catch(() => {
                            console.log('There was an error saving the deck ' + title);
                            return false
                        });
                }
            }

        });


}

export async function getDeck(title) {
    return await AsyncStorage.getItem(title.trim().toLowerCase())
        .then((deck) => {

            return deck
        })
        .catch(() => {
            console.log('There was an error getting the deck ' + title);
            return false
        });
}


export async function addCardToDeck(title, card) {



    return await AsyncStorage.getItem(title.trim().toLowerCase())
        .then(JSON.parse)
        .then((deck) => {
            console.log(card.question.length);
            console.log(card.answer.length);
            if (card.question.length <= 0 || card.answer.length <= 0) {
                return false
            }else{
                deck.questions.push(card);
                console.log(deck);
                return deck
            }

        })
        .catch(() => {
            console.log('Error adding the card ' + card + ' to the deck ' + title);
            return false;
        });
}


export function titleCapitalize(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

}