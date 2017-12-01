import {getDecks} from '../utils/helpers';

export const ADD_DECK = 'ADD_DECK';
export const GET_DECKS_FETCHING = 'GET_DECKS_FETCHING';
export const GET_DECKS_SUCCESS = 'GET_DECKS_SUCCESS';
export const GET_DECKS_FAIL = 'GET_DECKS_FAIL';


export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function getDecksData() {
    return {
        type: GET_DECKS_FETCHING
    }
}

export function getDecksSuccess(decks) {
    console.log(decks);
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

