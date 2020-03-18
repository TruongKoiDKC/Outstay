import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native"

import SelectMultiple from 'react-native-select-multiple'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class PhongTro extends React.Component {
    render() {
        return(
        <View style={styles.container}>
            <View style={{alignItems: "center", justifyContent:"center"}}>
                <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                    Phòng trọ
                </Text>
            </View>
        </View>
        )
    }
}

const width = Dimensions.get("screen").width;
var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        padding: 20,
    },

})
