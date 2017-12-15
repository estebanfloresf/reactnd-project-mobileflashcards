import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo';

const NOTIFICATION_KEY = 'Flashcards:notifications';

export function getDecks() {

    // AsyncStorage.getAllKeys().then(decks=> AsyncStorage.multiRemove(decks));
    // AsyncStorage.getAllKeys().then(decks=> console.log(decks));

    return AsyncStorage.getAllKeys()
        .then((decks) => {
            const promises = [];

            for (var i = 0; i < decks.length; i++) {
                if (decks[i] !== 'Flashcards:notifications') {

                    promises.push(AsyncStorage.getItem(decks[i]));
                }
            }

            return Promise.all(promises)
                .then(responses => {

                        return responses.map(response => JSON.parse(response))

                })
                .catch((error) => {
                    console.log('There was an error getting the deck ' + error);
                    return false
                });


        })
        .catch(() => {
            return 'Error getting the Decks'
        });

}

export function saveDeckTitle(title) {

    //Verify if the deck name already exists
    return AsyncStorage.getAllKeys()
        .then((decks) => {
            var existDups = decks.filter((deck) => deck === title);
            if (existDups.length > 0 || title.length <= 0) {

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


export function addCardToDeck(title, card) {

    if (card.question.length <= 0 || card.answer.length <= 0) {
        return false
    } else {

        return AsyncStorage.getItem(titleCapitalize(title.trim().toLowerCase()))
            .then(JSON.parse)
            .then((deck) => {

                deck.questions.push(card);


                AsyncStorage.mergeItem(titleCapitalize(title), JSON.stringify(deck));
                return deck
            })
            .catch(() => {
                console.log('Error adding the card ' + JSON.stringify(card) + ' to the deck ' + title);
                return false;
            });
    }
}


export function titleCapitalize(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

}

export function clearLocalNotification() {

    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Time to study!',
        body: "👋 don't forget to study!",
        ios: {
            sound: true,
        },
    }

}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {

            if (data === null) {

                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate()+1);
                            tomorrow.setHours(15);
                            tomorrow.setMinutes(14);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}