import {combineReducers} from 'redux';

import {decksReducer} from "./Decks";
import {cardsReducer} from "./Cards";

export default combineReducers({
    cardsReducer,
    decksReducer
});