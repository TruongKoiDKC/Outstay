import React, { Component } from 'react'
import { 
    Text, 
    View,
    Dimensions,
    StyleSheet, 
} from 'react-native'

export default class LoaiPhong extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                        Dịch vụ
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
    padding: "5%"
  },
});