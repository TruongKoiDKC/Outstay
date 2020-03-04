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

          <View style={styles.header}>
          <Text style={{color:'#93278f', fontSize: 40}}>Outstay</Text>
          </View>

          <View style={styles.body}>
          <ImageBackground
          source={require("../images/iconfinder_compose_406731.png")}
          style={styles.ImageBackground}
          >
          <View style={{ top: 85,justifyContent: 'center'}}>
          <Text style={{textAlign:'center'}}>Danh sách dịch vụ</Text>
           </View>
          </ImageBackground>

          <ImageBackground
          source={require("../images/iconfinder_calculator_406835.png")}
          style={styles.ImageBackground}
          >
          <View style={{ top: 85,justifyContent: 'center'}}>
          <Text style={{textAlign:'center'}}>Hoá đơn thu tiền</Text>
           </View>
          </ImageBackground>

          <ImageBackground
          source={require("../images/iconfinder_chat_406814.png")}
          style={styles.ImageBackground}
          >
          <View style={{ top: 85,justifyContent: 'center', 
           alignItems: 'center'}}>
           <Text>Nhắn tin</Text>
           </View>
          </ImageBackground>

          

          </View>

          <View style={styles.footer}>
          <Image
          source={require("../images/iconfinder_star_406773.png")}
          style={{width: 60, height: 60}}
          >
          </Image>

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
      justifyContent:'center'
    },
    header: {
      flex:0.5,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
    },

    body: {
        backgroundColor: '#E1E0DE',
        flex:3.5,
        padding:20,
        paddingVertical : 20
    },

    footer:{
        flex: 0.5,
        alignSelf: 'center',
        justifyContent: 'center'


    },


    ImageBackground: {
        width: 80,
        height: 80,
        marginLeft: 50,
        marginTop: 50
    }



});
