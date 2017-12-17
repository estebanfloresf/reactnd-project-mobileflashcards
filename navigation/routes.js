import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Decks from '../components/Decks/Decks';
import AddDeck from '../components/Decks/AddDeck';
import singleDeck from '../components/Decks/SingleDeck';
import AddCard from '../components/Cards/AddCard';
import Quiz from '../components/Quiz/Quiz';
import Results from '../components/Quiz/Results';
import {colors} from "../utils/styles";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'


const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            title: 'Decks',
            tabBarLabel: 'View Decks',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={30} color={tintColor}/>
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            title: 'Add Deck',
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-add' size={30} color={tintColor}/>

        }
    }
}, {

    tabBarOptions: {
        activeTintColor: colors.white,
        labelStyle: {
            fontSize: 14,
        },
        style: {
            backgroundColor: colors.primary,
        },
    }
});


const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            title: 'Decks',
            headerTintColor: colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            title: 'Add Deck',
            headerTintColor: colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },
        }
    },
    singleDeck: {
        screen: singleDeck,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title}`,
            headerTintColor: colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },

        })

    },
    AddCard: {
        screen: AddCard,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title}`,
            headerTintColor: colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },

        })

    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({navigation}) => ({
            title: `Quiz - ${navigation.state.params.title}`,
            headerTintColor: colors.white,
            headerStyle: {

                backgroundColor: colors.primary,
            },

        })

    },
    Results: {
        screen: Results,
        navigationOptions: ({navigation}) => ({
            title: `Results - ${navigation.state.params.title}`,
            headerTintColor: colors.white,
            headerLeft: null,
            headerStyle: {

                backgroundColor: colors.primary,
            },

        })

    }
});

export default MainNavigator;