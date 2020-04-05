import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';

import Icon from 'react-native-vector-icons/FontAwesome';
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
                            <Icon
                            name='chevron-left'
                            type='FontAwesome5'
                            style={{fontSize: 20}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 3, alignItems:"center"}}>
                        <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                            Dịch vụ 
                        </Text>
                    </View>

                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ManHinhHome')}>
                        <Icon
                            name='check'
                            type='FontAwesome5'
                            style={{fontSize: 25, marginLeft:'60%'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                
                <View>
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