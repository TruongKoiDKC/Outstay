import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class Home extends React.Component {
    render() {
        return(
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
              Cài đặt
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
      padding: 20
    }

});