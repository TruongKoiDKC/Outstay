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
  ScrollView,
  
} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
import { Jiro } from 'react-native-textinput-effects';
//Thư viện giúp keyboard ko che holder textinput

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Home extends React.Component {
    render() {
            let data = [{
              value: 'Banana',
            }, {
              value: 'Mango',
            }, {
              value: 'Pear',
            }];
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

                    <Text style={{color:'black', fontSize: 25, fontWeight:'bold',marginRight:100}}>Dịch vụ</Text>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhHome")}>
                        <Image
                            source={require("../images/iconfinder_checkmark_4115228.png")}
                            style={{width: 25, height: 25}}
                        >
                        </Image>
                </TouchableOpacity>

            </View>  

            <View style={styles.body}>
                <Dropdown
                    label='Loại hình và dịch vụ '
                    style={{fontStyle: 'italic'}}
                    data={data}
                    style={styles.Dropdown}
                />

                <Jiro
                    label={'Tên dịch vụ'}
                    borderColor={'#5aaf76'}
                    inputPadding={16}
                    inputStyle={{ color: 'white' }}
                />

                <Jiro
                    label={'Đơn giá'}
                    labelStyle= {'italic'}
                    borderColor={'#5aaf76'}
                    inputPadding={16}
                    inputStyle={{ color: 'white' }}
                />   

                <Jiro
                    label={'Đơn vị tính'}
                    borderColor={'#5aaf76'}
                    inputPadding={16}
                    inputStyle={{ color: 'white' }}
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

    Dropdown:{
        fontStyle: 'italic',
        paddingLeft: 20,
        paddingHorizontal: 20,
        color: 'gray'
    },

    Jiro: {
        backgroundColor: 'white',
        marginTop:2,
        paddingBottom:5,
        paddingLeft: 10,
        color:'gray',
        fontStyle: 'italic'
    },
})
