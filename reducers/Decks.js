import {ADD_DECK, GET_DECKS_FAIL, GET_DECKS_SUCCESS, GET_DECKS_FETCHING} from "../actions/index";

const initialState = {
    data: [],
    deckFetching: false,
    deckError: false
};

export function decksReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DECKS_FETCHING:
            return {
                ...state,
                deckFetching: true
            };
        case GET_DECKS_SUCCESS:
            return {
                ...state,
                data: action.decks,
                deckFetching: false,
            };
        case GET_DECKS_FAIL:
            return {
                ...state,
                deckFetching: false,
                deckError: true
            };
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            };
        default:
            return state;
    }
}



