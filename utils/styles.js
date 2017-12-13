import {StyleSheet,Dimensions} from 'react-native';
export const {width} = Dimensions.get('window');


/* RGB */

export const colors = {
    success: '#8DE788',
    successText: '#068000',
    text: '#0A2D94',
    info: '#FFAE00',
    warning: '#FE9598',
    warningText: '#9C0004',
    secondary: '#889CD6',
    primary: '#092578',
    white: '#fff',
    gray: '#9c9c9c'
};



export const components = StyleSheet.create({

    content: {
        flex: 1,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',

    },

    card: {
        backgroundColor: colors.primary,
        flex: 4,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: width-10,
        margin: 5,
        padding: 3,
        marginTop: 50,
    },
    cardTitleText: {
        color: colors.white, fontSize: 30
    },
    cardSub: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cardSubText: {
        color: colors.white,
        fontSize: 10
    },

    buttonView: {
        flex: 3,
    },

    button: {

        padding: 2,
        margin: 5,
        backgroundColor: colors.primary,
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 2,
        marginLeft: 2,
        justifyContent: 'center',
    },
    textButton: {
        color: colors.info,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 15,
        padding: 4,
    },

    inputFieldText: {
        height: 50,
        width: 300,
        color: colors.gray,
        borderBottomColor: colors.primary,
        borderBottomWidth: 3,
        textAlign: 'center',
        backgroundColor: colors.white,
    },
    messages: {
        flex: 2,
        justifyContent: 'flex-start',

    },
    flipCard: {

        paddingLeft: 10,
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {

        position: "absolute",
        paddingLeft: 10
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});
