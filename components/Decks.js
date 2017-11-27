import React, {Component} from 'react';
// import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text} from 'native-base';
import {StyleSheet,ScrollView,View,Text,TouchableOpacity} from 'react-native';
import {white, theme} from "../helpers/colors";

class Decks extends Component {
    state = {
        decks: ['a', 'b', 'c']
    };

    render() {
        const {decks} = this.state;
        return (
            <View style={styles.content}>
                <Text style={styles.content}>
                    {decks.map((deck) => <Text  key={deck}>{deck}</Text>)}
                </Text>
                <TouchableOpacity style={styles.button} >

                    <Text style={styles.textButton}>Add Deck</Text>
                </TouchableOpacity>
                {/*<ScrollView contentContainerStyle={styles.contentContainer}>*/}
                {/*</ScrollView>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
   content:{
       flex: 1,
       flexDirection: 'column',
       justifyContent: 'space-between',
       backgroundColor: theme.secondary,
       alignItems: 'center',


   },
   button:{
       flex:1,
       height:30,
       width:300,
       paddingBottom: 2,
       paddingTop:2,
       backgroundColor: theme.primary,
       alignItems: 'center',
       borderRadius:50,
       marginRight:2,
       marginLeft:2

   },
   textButton:{
       color:theme.info,
       textAlign:'center',
       padding: 4,
   }
});

export default Decks;