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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import { Input } from 'react-native-elements';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Jiro } from 'react-native-textinput-effects';
import ModalDropdown from 'react-native-modal-dropdown';

var radio_props = [
    {label: 'Phòng trống', value: 0 },
    {label: 'Đã cọc', value: 1 },
    {label: 'Đang ở', value: 2 }
];

export default class Chitiet_PhongTro extends Component {
    
    constructor(props){
        var d = new Date();
        super(props)
        this.state = {date: d.getDate()}
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                    <View style={{flex: 1}}>
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
                                <Jiro
                                    label={'Loại phòng'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Tiền phòng'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Số điện cũ'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Số điện mới'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Số nước cũ'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Số nước mới'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Phí dịch vụ'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                            </View>
                        </Animated.View>    
                    </View>

                    <View style={{flex: 1, marginTop: 20}}>
                        <Animated.View style={styles.vienkhung}>
                            <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                                Thông tin người ở
                            </Text>
                            <View style={{padding: 8}}>
                                <Jiro
                                    label={'Họ và tên'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <View style={{flexDirection:'row'}}>
                                   <View style={{flex:1}}>
                                   <Jiro
                                    label={'Ngày sinh'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                    />
                                   </View>
                                   <View style={{flex:1}}>
                                   <Jiro
                                    label={'Tháng sinh'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                    />
                                   </View>
                                   <View style={{flex:1}}>
                                   <Jiro
                                    label={'Năm sinh'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                    />
                                   </View>
                               </View>
                                <Jiro
                                    label={'Địa chỉ thường trú'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'CMND/CMT/CCCD'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'E-mail'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Số điện thoại'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
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
                            <View style={{flexDirection:'row'}}>
                                   <View style={{flex:1}}>
                                   <Jiro
                                    label={'Ngày vào'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                    />
                                   </View>
                                   <View style={{flex:1}}>
                                   <Jiro
                                    label={'Tháng vào'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                    />
                                   </View>
                                   <View style={{flex:1}}>
                                   <Jiro
                                    label={'Năm vào'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                    />
                                   </View>
                               </View>
                                <Jiro
                                    label={'Thời hạn hợp đồng'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Tiền phòng'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Tiền cọc'}
                                    borderColor={'#5aaf76'}
                                    inputPadding={16}
                                    inputStyle={{ color: 'white' }}
                                />
                                <Jiro
                                    label={'Chu kỳ thanh toán'}
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