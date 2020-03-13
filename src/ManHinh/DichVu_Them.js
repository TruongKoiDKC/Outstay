import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";

//Thư viện giúp keyboard ko che holder textinput

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Home extends React.Component {
    render() {
        return(
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhDichVu")}>
                    <Image
                        source={require("../images/iconfinder_left_2_4829870.png")}
                        style={{width: 25, height: 25,marginRight: 100}}
                    >
                    </Image>
                </TouchableOpacity>    

                    <Text style={{color:'#93278f', fontSize: 30, fontWeight:'bold',marginRight:100}}>Outstay</Text>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhHome")}>
                        <Image
                            source={require("../images/iconfinder_checkmark_4115228.png")}
                            style={{width: 25, height: 25}}
                        >
                        </Image>
                </TouchableOpacity>

            </View>  

            <View style={styles.body}>
                <TextInput 
                        secureTextEntry
                        placeholder="Tên dịch vụ "
                        style={styles.textInput}
                                    
                />
                <TextInput 
                        secureTextEntry
                        placeholder="Đơn giá"
                        style={styles.textInput}

                />
                <TextInput 
                        secureTextEntry
                        placeholder="Đơn vị"
                        style={styles.textInput}

                />
            </View>   
     
        </View>
        )
    }
}

const width = Dimensions.get("screen").width;
var styles = StyleSheet.create({
    container: {
      flex:0.3,
      backgroundColor:'white',
      justifyContent:'center' 
    },

    header: {
      flex:1,
      flexDirection: "row",
      //backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
      
    },

    body: {
        paddingTop: 10,
        backgroundColor: '#E3E3E3',
        flex:4.0,
        //alignItems: 'center',
        //justifyContent: 'center',

    },

    textInput: {
        backgroundColor: 'white',
        marginTop:5,
        paddingBottom:5,
        paddingLeft: 10,
        color:'gray',
        fontStyle: 'italic'
    },
})
