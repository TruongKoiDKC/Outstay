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

export default class Home extends React.Component {
    render() {
        return(
        <View style={styles.container}>
          <View style={{justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
              Nhắn tin
            </Text>
          </View>

          <View style={{justifyContent:"center", alignItems:"center", marginTop: '100%'}}>
                <Text style={{fontStyle:'italic', fontSize: 15, color:"gray" }}>
                    Tính năng này đang được phát triển !!!
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