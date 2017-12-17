import {

    ADD_CARD_FAIL,
    ADD_CARD_FETCHING,
    ADD_CARD_SUCCESS,
} from "../actions/types";

const initialState = {
    decks: [],
    deckFetching: false,
    deckError: false,
    addDeckFetching: false,
    addDeckError: false,
    addDeckSuccess: false,
    addCardFetching: false,
    addCardError: false,
    addCardSuccess:false,
};

export function cardsReducer(state = initialState, action) {

    switch (action.type) {


        case ADD_CARD_FETCHING:
            return{
                ...state,
                addDeckFetching: true,
            };
        case ADD_CARD_SUCCESS:
            return {
                ...state,
                decks: [...state.decks,  ...action.payload],
                addCardFetching: false,
                addCardError: false,
                addCardSuccess: true,
            };
        case ADD_CARD_FAIL:
            return{
                ...state,
                addCardFetching: false,
                addCardSuccess: false,
                addCardError: action.payload,
            };

        default:
            return state;
    }
}


