import React,  { Component } from 'react'
import { View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Picker,
    Alert
} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import OptionsMenu from "react-native-options-menu";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome';
import KhachHang from './KhachHang';

//RadioForm
var radio_props = [
    {label: 'Phòng trống', value: 0 },
    {label: 'Đã cọc', value: 1 },
    {label: 'Đang ở', value: 2 }
];

//Icon 3 chấm 
const myIcon = (<Icon 
    name='ellipsis-h'
    type='FontAwesome5'
    style={{fontSize:25, marginLeft:"60%"}}/>)


export default class Chitiet_PhongTro extends Component {
    constructor(props){
        super(props);
        this.state = {
        chosenDate: new Date(),
        date: '' ,
        visible: false
        };
    }
    
    KH(){
        const {navigate} = this.props.navigation;
        navigate('ManHinhKhachHang');
    }
    HD(){
        const {navigate} = this.props.navigation;
        navigate('ManHinhHopDong');
    }


    render () {

        return ( 
            
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhPhongTro")}>
                            <Icon
                            name='chevron-left'
                            type='FontAwesome5'
                            style={{fontSize: 20}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 3, alignItems:"center"}}>
                        <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                            Chi tiết phòng trọ
                        </Text>
                    </View>

                    <View style={{flex: 1}}>
                        <OptionsMenu
                            customButton={myIcon}
                            destructiveIndex={1}
                            options={["Tạo khách hàng", "Tạo hợp đồng"]}
                            actions={[this.KH(), this.HD()]}/>
                    </View>
                </View>

                
                <View>
                    <ScrollView>
                        <View style={{flex: 1, marginTop: 20}}>
                        <Animated.View style={styles.vienkhung}>
                            <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                                Trạng thái phòng
                            </Text>
                            <View style={{padding: 8}}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                onPress={(value) => {this.setState({value:value})}}
                                buttonColor={'#5aaf76'}
                                labelColor={'#5aaf76'}
                                labelStyle={{fontSize:15}}
                            />
                            </View>
                        </Animated.View>    
                        </View>

                    <View style={{flex: 1, marginTop: 20}}>
                        <Animated.View style={styles.vienkhung}>
                            <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                                Thông tin phòng
                            </Text>
                            <View style={{padding: 8}}>
                            <TextInput
                                placeholder='Tên phòng'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Loại phòng'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Tiền phòng'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Số điện cũ'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Số điện hiện tại'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Số nước cũ'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Số nước hiện tại'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Phí dịch vụ'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            </View>
                        </Animated.View>    
                    </View>

                    <TouchableOpacity>
                        <View style ={{marginTop:20, justifyContent:'center', alignItems:'center'}}>
                            <Animated.View style={styles.btn}>
                                <Text style={{fontSize: 20, color:'white', fontWeight:'bold'}}>Lưu</Text>
                            </Animated.View>
                        </View>
                    </TouchableOpacity>

                    
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
        padding:'5%'
    },

    vienkhung:{
        paddingVertical:10,
        borderColor: '#5aaf76',
        borderWidth: 4,
        padding: 15,
        borderRadius: 20
    },

    btn:{
        borderColor:'#5aaf76',
        backgroundColor:'#5aaf76',
        borderWidth: 4,
        padding: 15,
        borderRadius: 20,
        width:130,
        height: 50,
        justifyContent:'center',
        alignItems:'center'
    }
})