import {
    ADD_DECK_FAIL,
    ADD_DECK_SUCCESS,
    ADD_DECK_FETCHING,
    GET_DECKS_FAIL,
    GET_DECKS_SUCCESS,
    GET_DECKS_FETCHING
} from "../actions/index";


const initialState = {
    decks: [],
    deckFetching: false,
    deckError: false,
    addDeckFetching: false,
    addDeckError: false,
    addDeckSuccess: false,
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
                decks: action.decks,
                deckFetching: false,
            };
        case GET_DECKS_FAIL:
            return {
                ...state,
                deckFetching: false,
                deckError: true
            };
        case ADD_DECK_FETCHING:
            return {
                ...state,
                addDeckFetching: true,
            };
        case ADD_DECK_SUCCESS:
            return {
                ...state,
                decks: [...state.decks,  action.newDeck],
                addDeckFetching: false,
                addDeckSuccess: true,
            };
        case ADD_DECK_FAIL:
            return{
                ...state,
                addDeckFetching: false,
                addDeckSuccess: false,
                addDeckError: action.payload,
            };

        default:
            return state;
    }
}



