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
                <Text style={{color:'#93278f', fontSize: 30, fontWeight:'bold',marginRight:128}}>Outstay</Text>
          </View>



          <View style={styles.body}>
            <Image
                style={styles.Image}
                source={require("../images/iconfinder_profle_406768.png")}
            >
            </Image>    

            <Text style={styles.Textbody}>
                Thông tin tài khoản
                <Image
                style={styles.ImageBody}
                source={require("../images/right.png")}
                >
                </Image>
            </Text> 
            <Text style={styles.Textbody}>
                Hướng dẫn sử dụng
                <Image
                style={styles.ImageBody}
                source={require("../images/right.png")}
                >
                </Image>
            </Text> 
            <Text style={styles.Textbody}>
                Hỗ trợ
                <Image
                style={styles.ImageBody}
                source={require("../images/right.png")}
                >
                </Image>
            </Text> 
            <Text style={styles.Textbody}>
                Về chúng tôi !
                <Image
                style={styles.ImageBody}
                source={require("../images/right.png")}
                >
                </Image>
            </Text> 

            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhLogin")}>
                <Text style={{marginTop: 100,
                              fontSize: 25,
                              fontWeight: 'bold',
                              color:'red',
                              backgroundColor: 'white',
                              alignItems: 'center',
                              paddingLeft: 150,
                              padding: 10}}>
                     Đăng xuất
                </Text>
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
      flex:0.25,
      flexDirection: "row",
      //backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
    },

    body: {
        backgroundColor: '#E3E3E3',
        flex:4,
    },

    Image:{
        width: 100, 
        height: 100,
        marginTop: 20,
        alignSelf: 'center'
    },
    
    Textbody:{

        fontSize: 20,
        backgroundColor:'white',
        marginTop: 30,
        paddingRight: 20,
        padding: 10,
    },
    ImageBody:{
        flexDirection: 'row',
        width: 25,
        height: 25


    }

});