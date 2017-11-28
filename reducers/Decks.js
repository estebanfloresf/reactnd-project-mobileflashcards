import {ADD_DECK} from "../actions/index";

export function decks(state={},action) {
    switch (action.type){
        case ADD_DECK:
            return{
                ...state,
                ...action.deck
            };
        default:
            return state;
    }
}



