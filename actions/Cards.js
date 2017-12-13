import {getDeck, addCardToDeck} from '../utils/helpers';
import {fetchDecks} from './Decks';
import {
    ADD_CARD_SUCCESS,
    ADD_CARD_FETCHING,
    ADD_CARD_FAIL,
    GET_CARDS_FETCHING,
    GET_CARDS_SUCCESS,
    GET_CARDS_FAIL,
} from './types';


export function addCardData() {
    return {
        type: ADD_CARD_FETCHING
    }
}

export function addCardSuccess(deck) {
    return {
        type: ADD_CARD_SUCCESS,
        payload: deck
    }
}

export function addCardFail(bool) {
    return {
        type: ADD_CARD_FAIL,
        payload: bool
    }
}


//Add Cards
export function addCard(title,card) {

    return (dispatch) => {
        dispatch(addCardData());
        addCardToDeck(title,card)
            .then((deck) => {
                    if (deck === false) {
                        dispatch(addCardFail(true))
                    } else {

                        dispatch( addCardSuccess(deck));
                        dispatch(fetchDecks());

                    }
                }
            )

            .catch((error) => {

                    console.log('Error saving the card ' + error.messages);
                    dispatch(addCardFail(true))
                }
            )


    };
}