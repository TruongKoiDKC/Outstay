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
    Picker 
} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Input } from 'react-native-elements';
import {Sae} from 'react-native-textinput-effects';

import DatePicker from 'react-native-datepicker';


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome';


var radio_props = [
    {label: 'Phòng trống', value: 0 },
    {label: 'Đã cọc', value: 1 },
    {label: 'Đang ở', value: 2 }
];


export default class Chitiet_PhongTro extends Component {
    constructor(props){
        super(props);
        this.state = {
        chosenDate: new Date(),
        date: '' ,
        visible: false
        };
    }

    render () {

        return ( 
            
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhPhongTro")}>
                            <Image
                                source={require("../images/iconfinder_left_2_4829870.png")}
                                style={{width: 25, height: 25,marginRight: 100}}
                            >
                            </Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 3, alignItems:"center"}}>
                        <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                            Chi tiết phòng trọ
                        </Text>
                    </View>

                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ManHinhCTLP')}>
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

                    <View style={{ marginTop: 20}}>
                        <Animated.View style={styles.vienkhung}>
                            <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                                Thông tin hợp đồng
                            </Text>
                            <View style={{padding: 8}}>
                            <TextInput
                                placeholder='Họ và tên'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <View style={{padding:4}}>
                            <DatePicker
                                style={{width: '100%'}}
                                placeholder= "Ngày / tháng / năm sinh"
                                date={this.state.date} 
                                mode="date" 
                                format="DD-MM-YYYY"
                                minDate="01-01-1900"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"  
                                androidMode='spinner' 
                                showIcon={false}
                                onDateChange={date => {this.setState({ date: date }); }}
                                customStyles={{
                                  dateInput: { 
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor:'#5aaf76',
                                    alignItems: "flex-start",
                                    
                                  },
                                  placeholderText:{
                                    color:'#9e9e9e',
                                    fontSize: 15,
                                  },
                                  dateText: {
                                    fontSize: 15,
                                    color: "black",
                                    alignItems: "flex-start"
                                  }
                                }}
                            />
                            </View>
                            <TextInput
                                placeholder='Địa chỉ thường trú'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='CMND/CMT/CCCD'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Số điện thoại'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='E-mail'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                             <TextInput
                                placeholder='Thời hạn hợp đồng'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Tiền phòng'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Tiền cọc'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Chu kỳ thanh toán'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
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
        padding:'5%'
    },

    vienkhung:{
        paddingVertical:10,
        borderColor: '#5aaf76',
        borderWidth: 4,
        padding: 15,
        borderRadius: 20
    }
})