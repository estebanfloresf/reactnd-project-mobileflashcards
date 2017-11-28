import React, {Component} from 'react';
import {StyleSheet,ScrollView,View,Text,TouchableOpacity,FlatList} from 'react-native';
import {white, theme} from "../utils/colors";
import {addDeck} from "../utils/helpers";


class Decks extends Component {

    componentDidMount(){

    }


    actionAddDeck = ()=>{

        addDeck();

    };

    render() {

        return (
            <View style={styles.content}>
                <TouchableOpacity onPress={this.actionAddDeck}>
                    <Text>Add</Text>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({
   content:{
       flex: 2,
       flexDirection: 'column',
       justifyContent: 'space-between',
       backgroundColor: theme.secondary,
       alignItems: 'center',


   },
   button:{
       flex:1,
       height:20,
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