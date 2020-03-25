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
      
var radio_props = [
    {label: 'Phòng trống', value: 0 },
    {label: 'Đã cọc', value: 1 },
    {label: 'Đang ở', value: 2 }
];

export default class Chitiet_PhongTro extends Component {

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
                                    placeholder="Tiền phòng"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Số điện cũ"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Số điện mới"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Số nước cũ"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Số nước mới"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Phí dịch vụ"
                                    style={styles.TextInput}
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
                                <TextInput 
                                    placeholder="Họ và tên"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Ngày tháng năm sinh"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Địa chỉ thường trú"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="CMND/CCCD/CMT"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Số điện thoại"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Email"
                                    style={styles.TextInput}
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
                                    placeholder="Ngày khách vào"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Thời hạn hợp đồng"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Tiền phòng"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Tiền cọc"
                                    style={styles.TextInput}
                                />
                                <TextInput 
                                    placeholder="Chu ký thanh toán"
                                    style={styles.TextInput}
                                />
                            </View>
                        </Animated.View>    
                    </View>
                </ScrollView>
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
        borderBottomColor:'#5aaf76'
    }

})