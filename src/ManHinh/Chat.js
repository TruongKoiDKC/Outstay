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
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhHome")}>
                <Image
                    source={require("../images/iconfinder_left_2_4829870.png")}
                    style={{width: 25, height: 25,marginRight: 100}}
                >
                </Image>
            </TouchableOpacity>    
                <Text style={{color:'#93278f', fontSize: 30, fontWeight:'bold',marginRight:120}}>Outstay</Text>
          </View>


          <View style={styles.body}>
                <Text style={{fontStyle:'italic',fontWeight:"bold", fontSize: 20 }}>
                    Tính năng này đang được phát triển !!!
                </Text>

                <Image
                    source={require("../images/iconfinder_roadblock_406861.png")}
                     style={{width: 100, height: 100}}
                >
                </Image>
          </View>


          <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhLogin")}>
              <Image
                  source={require("../images/iconfinder_star_406773.png")}
                  style={{width: 60, height: 60}}
              >
              </Image>
              </TouchableOpacity>

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
      flex:0.3,
      flexDirection: "row",
      //backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
      
    },

    body: {
        backgroundColor: '#E3E3E3',
        flex:4.0,
        alignItems: 'center',
        justifyContent: 'center'

    },

    footer:{
        flex: 0.5,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent: 'center'
    },

});