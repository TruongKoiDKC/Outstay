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
    Alert,
    YellowBox,
} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';
import _ from 'lodash';

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
    }
};

try {
    firebase.initializeApp({
    apiKey: 'AIzaSyDYmW5KUcA4YK9RFX8rmozMCmtb1q2sL5Q',
    //authDomain: “FULL_AUTHDOMAIN_PUT_HERE”,
    databaseURL: 'https://fir-outstay.firebaseio.com',
    storageBucket: 'fir-outstay.appspot.com',
    })
    } catch (err) {
    // we skip the “already exists” message which is
    // not an actual error when we’re hot-reloading
    if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack)
    
}}

const rootRef = firebase.database().ref();
const PhongTroRef = rootRef.child('Phòng trọ');

//RadioForm
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
        visible: false,

        PhongTro: [],
            textTenPhong: '',
            textLoaiPhong: '',
            textTien: '',
            textSDTcu: '',
            textSDTmoi: '',
            textSoNuoccu: '',
            textSoNuocmoi: '',
            textPhiDV: '',
            loading: false,
        };
    }

    UNSAFE_componentDidMount() {
        PhongTroRef.on('value', (childSnapshot) => {
            const phongtros = [];
            childSnapshot.forEach((doc) => {
                phongtros.push({
                    key: doc.key,
                    phongtroName: doc.toJSON().phongtroName
                });
                this.setState({
                    phongtros: phongtros.sort((a, b) => {
                        return (a.phongtroName < b.phongtroName);
                    }),
                    loading: false,
                });
            });
        });
    }
    onPressAdd = () => {
        if (this.state.textTenPhong.trim() === '' && 
        this.state.textLoaiPhong.trim() === '' && 
        this.state.textTien.trim() === '' &&
        this.state.textSDTcu.trim() === '' &&  
        this.state.textSDTmoi.trim() === '' && 
        this.state.textSoNuoccu.trim() === '' && 
        this.state.textSoNuocmoi.trim() === '' && 
        this.state.textPhiDV.trim() === '' ){
            alert('Ban chưa nhập thông tin !!!');
            return;
        }
        PhongTroRef.push({
            TenPhong: this.state.textTenPhong,
            LoaiPhong: this.state.textLoaiPhong,
            TienPhong: this.state.textTien,
            SoDienCu: this.state.textSDTcu,
            SoDienMoi: this.state.textSDTmoi,
            SoNuocCu: this.state.textSoNuoccu,
            SoNuocMoi: this.state.textSoNuocmoi,
            PhiDichVu: this.state.textPhiDV,
        });
    }

    //Menu chọn Khách hàng và Hợp đồng
    menu = null;
    setMenuRef = ref => {
      this.menu = ref;
    };
    showMenu = () => {
      this.menu.show();
    };

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
                        <Menu
                            style={{width: 150, height: 100}}
                            ref={this.setMenuRef}
                            button={ 
                            <Text style={{marginLeft: '80%'}} onPress={this.showMenu}>
                                <Icon
                                    name='ellipsis-v'
                                    type='FontAwesome5'
                                    style={{fontSize: 25}}
                                />
                            </Text>}
                        >
                            <MenuItem onPress={() => this.props.navigation.navigate('ManHinhKhachHang')}>Khách thuê</MenuItem>
                            <MenuItem onPress={() => this.props.navigation.navigate('ManHinhHopDong')}>Hợp đồng</MenuItem>
                            <MenuItem onPress={this.hideMenu} disabled> </MenuItem>
                        </Menu>
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
                                style={[{fontSize:15}]}
                                onChangeText={(text) => {this.setState({ textTenPhong: text });
                                    }
                                }
                                 value={this.state.textTenPhong}
                            />
                            <TextInput
                                placeholder='Loại phòng'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textLoaiPhong: text });
                                    }
                                }
                                 value={this.state.textLoaiPhong}
                            />
                            <TextInput
                                placeholder='Tiền phòng'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textTien: text });
                                    }
                                }
                                 value={this.state.textTien}
                            />
                            <TextInput
                                placeholder='Số điện cũ'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textSDTcu: text });
                                    }
                                }
                                 value={this.state.textSDTcu}
                            />
                            <TextInput
                                placeholder='Số điện hiện tại'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textSDTmoi: text });
                                    }
                                }
                                 value={this.state.textSDTmoi}
                            />
                            <TextInput
                                placeholder='Số nước cũ'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textSoNuoccu: text });
                                    }
                                }
                                 value={this.state.textSoNuoccu}
                            />
                            <TextInput
                                placeholder='Số nước hiện tại'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textSoNuocmoi: text });
                                    }
                                }
                                 value={this.state.textSoNuocmoi}
                            />
                            <TextInput
                                placeholder='Phí dịch vụ'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textPhiDV: text });
                                    }
                                }
                                 value={this.state.textPhiDV}
                            />
                            </View>
                        </Animated.View>    
                    </View>

                    
                    <View style ={{marginTop:20, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                        <TouchableOpacity>
                            <Animated.View style={[styles.btn,{height:50, backgroundColor:'#5aaf76'}]}>
                                <Text style={{fontSize: 20, color:'white', fontWeight:'bold'}}>Xuất hóa đơn</Text>
                            </Animated.View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Animated.View style={[styles.btn,{height: 50, width: 150, backgroundColor:'white', marginLeft:20}]}>
                                <TouchableOpacity onPress={this.onPressAdd}>
                                    <Text style={{fontSize: 20, color:'#5aaf76', fontWeight:'bold'}}>Lưu</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </TouchableOpacity>
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
    },

    btn:{
        borderColor:'#5aaf76',
        borderWidth: 4,
        padding: 15,
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center'
    }
})