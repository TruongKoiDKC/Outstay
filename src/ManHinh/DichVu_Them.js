import React, { Component } from 'react'
import { View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ImageBackground, 
} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Jiro } from 'react-native-textinput-effects';

//Sửa label text 
const placeholder = {
    label: 'Lựa chọn...',
    color:'gray',
    value: null,
};

export default class Chitiet_PhongTro extends Component {
    render () {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhDichVu")}>
                        <Image
                            source={require("../images/iconfinder_left_2_4829870.png")}
                            style={{width: 25, height: 25,marginRight: 100}}
                        >
                        </Image>
                    </TouchableOpacity>

                    <View style={{flex: 3, alignItems:"center"}}>
                        <Text style={{color:'black', fontSize: 21, fontWeight:'bold',marginRight: 60}}>
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

                                <Text style={{fontSize: 13,fontWeight: 'bold', color: 'black',marginTop: 25,marginLeft: 30}}>
                                        Loại hình dịch vụ : 
                                </Text>
                                <View style={{borderWidth: 2,borderColor: '#5aaf76',marginLeft: 20,marginRight:20,color: '#5aaf76',fontStyle: 'italic',marginTop: 5}}>
                                    <RNPickerSelect
                                        
                                        style={{fontStyle: 'italic'}}
                                        onValueChange={(value) => console.log(value)}
                                        placeholder={placeholder}
                                        useNativeAndroidPickerStyle
                                        items={[
                                            { label: 'Football', value: 'football',color: '#5aaf76'},
                                            { label: 'Baseball', value: 'baseball',color: '#5aaf76'  },
                                            { label: 'Hockey', value: 'hockey',color: '#5aaf76'  },
                                    ]}
                                />
                                </View>  

                                <View style={{paddingBottom: 50}}>
                                    <Jiro
                                        label={'Tên dịch vụ / Loại phòng'}
                                        borderColor={'#5aaf76'}
                                        inputPadding={16}
                                        inputStyle={{ color: 'white' }}
                                    />
                                    <Jiro
                                        label={'Đơn giá'}
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
        marginTop: 40,
        paddingVertical:10,
        borderColor: '#5aaf76',
        borderWidth: 4,
        padding: 15,
        borderRadius: 20
    },

    TextInput:{
        borderBottomWidth: 1, 
        paddingBottom: 0, 
        marginTop: 5,
        borderBottomColor:'#5aaf76',
        fontSize: 15
    }

})