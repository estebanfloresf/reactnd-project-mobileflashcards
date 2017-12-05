import {getDecks, saveDeckTitle} from '../utils/helpers';

export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS';
export const ADD_DECK_FETCHING = 'ADD_DECK_FETCHING';
export const ADD_DECK_FAIL = 'ADD_DECK_FAIL';
export const GET_DECKS_FETCHING = 'GET_DECKS_FETCHING';
export const GET_DECKS_SUCCESS = 'GET_DECKS_SUCCESS';
export const GET_DECKS_FAIL = 'GET_DECKS_FAIL';


export function getDecksData() {
    return {
        type: GET_DECKS_FETCHING
    }
}

export function getDecksSuccess(decks) {

    return {
        type: GET_DECKS_SUCCESS,
        decks
    }
}

export function getDecksFail() {
    return {
        type: GET_DECKS_FAIL
    }
}


export function addDeckData() {
    return {
        type: ADD_DECK_FETCHING
    }
}

export function addDeckSuccess(newDeck) {
    return {
        type: ADD_DECK_SUCCESS,
        newDeck
    }
}

export function addDeckFail(bool) {
    return {
        type: ADD_DECK_FAIL,
        payload: bool
    }
}

//Get data
export function fetchDecks() {
    return (dispatch) => {
        dispatch(getDecksData());
        getDecks()

            .then((decks) => {

                    dispatch(getDecksSuccess(decks))
                }
            )
            .catch((error) => {

                    console.log('Error getting the decks ' + error);
                    dispatch(getDecksFail)
                }
            )


    };
}

//Add Deck

export function addDeck(title) {

    return (dispatch) => {
        dispatch(addDeckData());
        saveDeckTitle(title)
            .then((deck) => {
                    if (deck === false) {
                        dispatch(addDeckFail(true))
                    } else {

                        dispatch(addDeckSuccess(deck))
                    }
                }
            )
            .catch((error) => {

                    console.log('Error saving the decks ' + error);
                    dispatch(addDeckFail(true))
                }
            )


    };
}