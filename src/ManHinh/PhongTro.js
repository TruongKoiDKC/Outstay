import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  YellowBox,
  FlatList,
} from "react-native"

import { SearchBar, ThemeConsumer } from 'react-native-elements'
import SelectMultiple from 'react-native-select-multiple'
import Animated from 'react-native-reanimated';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
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
export default class PhongTro extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        PhongTro: [],
            textTrangThaiPhong:'',
            textTenPhong: '',
            textLoaiPhong: '',
            textTien: '',
            textSDTcu: '',
            textSDTmoi: '',
            textSoNuoccu: '',
            textSoNuocmoi: '',
            textPhiDV: '',
            loading: false,
            
            ////Khai báo Modal box
            modal: false,

            //
            search: ''
        };
        
    }
    
    updateSearch = search => {
        this.setState({ search });
    };

    //Menu chọn Khách hàng và Hợp đồng
    menu = null;
    setMenuRef = ref => {
      this.menu = ref;
    };
    showMenu = () => {
      this.menu.show();
    };  

    //Mở Modal box
    openModal= () => {
        this.setState ({ modal: true});
    };
    //Đóng Modal box
    closeModal= () => {
        this.setState ({ modal: false});
    };
    

    componentDidMount() {
        PhongTroRef.on('value', (childSnapshot) => {
            const PhongTro = [];
            childSnapshot.forEach((doc) => {
                PhongTro.push({
                    key: doc.key,
                    TrangThaiPhong: doc.toJSON().TrangThaiPhong,
                    TenPhong: doc.toJSON().TenPhong,
                    LoaiPhong: doc.toJSON().LoaiPhong,
                    TienPhong: doc.toJSON().TienPhong,
                    SoDienCu: doc.toJSON().SoDienCu,
                    SoDienMoi: doc.toJSON().SoDienMoi,
                    SoNuocCu: doc.toJSON().SoNuocCu,
                    SoNuocMoi: doc.toJSON().SoNuocMoi,
                    PhiDichVu: doc.toJSON().PhiDichVu,
                });
                this.setState({
                    PhongTro: PhongTro.sort((a, b) => {
                        return (a.TrangThaiPhong < b.TrangThaiPhong);
                    }),
                    loading: false,
                });
            });
        });
    }
    onPressAdd = () => {
        if (this.state.textTrangThaiPhong.trim() === '' &&
        this.state.textTenPhong.trim() === '' && 
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
            TrangThaiPhong: this.state.textTrangThaiPhong,
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
    _renderItem= ({item}) => {

        return(
            <View style={{margin: 10}}>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Trạng thái phòng :{item.TrangThaiPhong} </Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Tên phòng :{item.TenPhong}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Loại phòng :{item.LoaiPhong}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Tiền phòng :{item.TienPhong}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Số ĐT cũ :{item.SoDienCu}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Số ĐT mới :{item.SoDienMoi}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Số nước cũ :{item.SoDienCu}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Số nước mới :{item.SoDienMoi}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Phí dịch vụ :{item.PhiDichVu}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}> </Text>
            </View>
        );
      }


    render() {
        const { search } = this.state;

        return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                <View style={{flex: 2}}>
                    <TouchableOpacity onPress={this.openModal}>
                        <Icon
                            name='plus'
                            type='FontAwesome5'
                            style={{fontSize:25, marginLeft:"60%"}}
                        />
                    </TouchableOpacity>
                        
                        
                            
                    <Modal isVisible={this.state.modal}>
                        <View style={{width:350, height:600, backgroundColor:'white'}}>
                            <View style={{alignItems:"center"}}>
                            <Text style={{color:'black', fontSize: 21, fontWeight:'bold', marginTop:'5%'}}>
                                Loại phòng
                            </Text>
                            </View>
                            <View style={{marginTop: '2%'}}>
                                <Animated.View style={styles.vienkhung}>
                                <View style={{padding: 8}}>
                                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                                    Trạng thái phòng
                                </Text>
                                <TextInput
                                    placeholder='Phòng trống - Đã cọc - Đang ở'
                                    underlineColorAndroid='#5aaf76'
                                    style={[{fontSize:15,fontStyle: 'italic'}]}
                                    onChangeText={(text) => {this.setState({ textTrangThaiPhong: text });
                                        }
                                    }
                                    value={this.state.textTrangThaiPhong}
                                />
                                <Text style={{fontSize: 20, color: 'black', fontWeight: "bold"}}>
                                    Thông tin phòng
                                </Text>
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
                            <View style ={{ justifyContent:'center', alignItems:'center', flexDirection: 'row', marginTop:'5%'}}>
                            <TouchableOpacity onPress={this.closeModal}>
                                <Animated.View style={[styles.btn]}>
                                    <Text style={{fontSize: 20, color:'#5aaf76', fontWeight:'bold'}}>Hủy bỏ</Text>
                                </Animated.View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.onPressAdd}>
                                <Animated.View style={[styles.btn,{marginLeft: 20,backgroundColor:'#5aaf76'}]}>
                                    <Text style={{fontSize: 20, color:'white', fontWeight:'bold'}}>Lưu</Text>
                                </Animated.View>
                            </TouchableOpacity>
                            </View>
                            <View>
                            </View>
                        </View>
                    </Modal>
                </View>


                <View style={{flex: 3, alignItems:"center"}}>
                    <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                        Phòng trọ
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

            <View style={{marginTop: 10}}>
                <SearchBar
                    placeholder="Tìm kiếm ..."
                    onChangeText={this.updateSearch}
                    value={search}
                    platform ="android"
                    underlineColorAndroid = "#5aaf76"
                />
            </View>
            <View>
                    <FlatList
                            style={{borderColor: '#5aaf76',borderWidth: 4,height:500,marginTop: 10,fontSize: 10}}
                            data={this.state.PhongTro}
                            renderItem={this._renderItem}
                            >
                    </FlatList>
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

})
