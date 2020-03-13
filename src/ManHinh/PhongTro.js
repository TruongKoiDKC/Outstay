import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import SelectMultiple from 'react-native-select-multiple'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ChonLoai = ['Gác', 'Wifi', 'Tivi','WC','Tủ lạnh', 'Khác ...']
export default class Home extends React.Component {
    state = { selectedFruits: [] }
    onSelectionsChange = (selectedFruits) => {
        // selectedFruits is array of { label, value }
        this.setState({ selectedFruits })
      }
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
            <KeyboardAwareScrollView>
                <View style={styles.body}>
                    <View style={styles.action}>
                        <TextInput 
                                secureTextEntry
                                placeholder="Tên phòng : "
                                style={styles.textInput}
                                

                        />
                        <TextInput 
                                secureTextEntry
                                placeholder="Loại phòng :"
                                style={styles.textInput}

                        />
                        <TextInput 
                                secureTextEntry
                                placeholder="Tầng :"
                                style={styles.textInput}

                        />
                        <TextInput 
                                secureTextEntry
                                placeholder="Diện tích :"
                                style={styles.textInput}

                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>   


            <SelectMultiple
                items={ChonLoai}
                selectedItems={this.state.selectedFruits}
                onSelectionsChange={this.onSelectionsChange} />
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
      flex:4,
      flexDirection: "row",
      //backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
      
    },

    body: {
        paddingTop: 10,
        backgroundColor: '#E3E3E3',
        flex:3,
        borderBottomColor: 'black'
        //alignItems: 'center',
        //justifyContent: 'center',

    },

    textInput: {
        backgroundColor: 'white',
        //marginTop:5,
        //marginBottom:5,
        paddingLeft: 10,
        color:'gray',
        fontStyle: 'italic',

    },

})
