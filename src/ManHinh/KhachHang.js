import React, { Component } from 'react'
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HopDong extends Component {
    constructor(props){
        super(props);
        this.state = {
        chosenDate: new Date(),
        date: '' ,
        visible: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhCTPT")}>
                            <Icon
                            name='chevron-left'
                            type='FontAwesome5'
                            style={{fontSize: 20}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 3, alignItems:"center"}}>
                        <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                            Thông tin khách hàng 
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
                            <View style={{alignItems:'center'}}>
                                <TouchableOpacity>
                                    <Icon
                                    name='user-circle'
                                    type='FontAwesome5'
                                    style={{fontSize: 80}}
                                    />
                                </TouchableOpacity>
                                <Text style={{marginTop:10, fontSize: 15}}>Ảnh đại diện</Text>
                            </View>
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