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
  ImageBackground
} from "react-native";

import { Jiro } from 'react-native-textinput-effects';
import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const placeholder = {
    label: 'Loại hình dịch vụ',
    color:'#5aaf76',
    value: null,
};

export default class DichVu_Them extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhDichVu")}>
                            <Image
                                source={require("../images/iconfinder_left_2_4829870.png")}
                                style={{width: 25, height: 25,marginRight: 100}}
                            >
                            </Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 3, alignItems:"center"}}>
                        <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                            Dịch vụ 
                        </Text>
                    </View>

                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ManHinhHome')}>
                            <ImageBackground source={require('../images/iconfinder_checkmark_4115228.png')}
                                style={{width: 30, height: 30, marginLeft:"50%"}}>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>

                
                <View style={{}}>
                    <ScrollView>
                        <View style={{flex: 1, marginTop: 20}}>
                            <Animated.View style={styles.vienkhung}>
                                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                                    Thông tin dịch vụ
                                </Text>

                                <View style={{padding: 8}}>
                                    <RNPickerSelect
                                        style={{fontStyle: 'italic'}}
                                        onValueChange={(value) => console.log(value)}
                                        placeholder={placeholder}
                                        useNativeAndroidPickerStyle
                                        items={[
                                            { label: 'Loại phòng', value: 'loaiphong',color: 'black'},
                                            { label: 'Phí dịch vụ', value: 'phiDV',color: 'black'  }
                                    ]}/>
                                    <TextInput
                                        placeholder='Tên dịch vụ/Loại phòng'
                                        underlineColorAndroid='#5aaf76'
                                    />
                                    <TextInput
                                        placeholder='Đơn giá'
                                        underlineColorAndroid='#5aaf76'
                                    />
                                    <TextInput
                                        placeholder='Đơn vị tính'
                                        underlineColorAndroid='#5aaf76'
                                    />
                                </View> 
                            </Animated.View>    
                        </View>
                    </ScrollView>
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

    vienkhung:{
        paddingVertical:10,
        borderColor: '#5aaf76',
        borderWidth: 4,
        padding: 15,
        borderRadius: 20
    },

})

