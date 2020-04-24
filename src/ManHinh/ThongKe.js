import React, { Component } from 'react'
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

export default class ThongKe extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                        Thống kê
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