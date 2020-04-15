
import React, { Component } from 'react';
import {
    AppRegistry, FlatList,
    StyleSheet, Text, View, Image, Alert, Platform,
    TouchableHighlight,
    RefreshControl, TextInput,YellowBox
} from 'react-native';

import firebase from 'react-native-firebase';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

//Tắt khung cảnh báo màu vàng
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
  if (!/already exists/.test(err.message)) {
  console.error('Firebase initialization error raised', err.stack)    
}}

const rootRef = firebase.database().ref();
const LoaiPhongRef = rootRef.child('Loại phòng');
export default class DatabaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            LoaiPhong:[],
            textTenLoaiPhong: '',
            textDienTich: '',
            textDonGia: '',
            textDVT: '',
            loading: false,
        });
    }
    componentDidMount() {
        LoaiPhongRef.on('value', (childSnapshot) => {
            const LoaiPhong = [];
            childSnapshot.forEach((doc) => {
                LoaiPhong.push({
                    key: doc.key,
                    TenLoaiPhong: doc.toJSON().TenLoaiPhong,
                    DienTich: doc.toJSON().DienTich,
                    DonGia: doc.toJSON().DonGia,
                    DonViTinh: doc.toJSON().DonViTinh,
                    
                });
                this.setState({
                    LoaiPhong: LoaiPhong.sort((a, b) => {
                        return (a.TenLoaiPhong < b.TenLoaiPhong);
                    }),
                    loading: false,
                    LoaiPhong: LoaiPhong.sort((a, b) => {
                        return (a.DienTich < b.DienTich);
                    }),
                    loading: false,
                    LoaiPhong: LoaiPhong.sort((a, b) => {
                        return (a.DonGia < b.DonGia);
                    }),
                    loading: false,
                    LoaiPhong: LoaiPhong.sort((a, b) => {
                        return (a.DonViTinh < b.DonViTinh);
                    }),
                    loading: false,
                });
            });
        });
    }
    onPressAddLoaiPhong = () => {
        if (this.state.textTenLoaiPhong.trim() === '' || 
            this.state.textDienTich.trim() === '' || 
            this.state.textDonGia.trim() === '' ||
            this.state.textDVT.trim() === '' )
             {
            alert('Vui lòng nhập đầy đủ thông tin !');
            return;
        }
        else{
            alert('Thông tin đã được lưu !')
        }
        LoaiPhongRef.push({
            TenLoaiPhong: this.state.textTenLoaiPhong,
            DienTich: this.state.textDienTich,
            DonGia: this.state.textDonGia,
            DonViTinh: this.state.textDVT,
        });
    }

    _renderItem = ({item}) => {

        return(
            <View >
                <Text>{item.TenLoaiPhong} </Text>
                <Text>{item.DienTich}</Text>
                <Text>{item.DonGia}</Text>
                <Text>{item.DonViTinh}</Text>
            </View>


        );

    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
                <View style={{
                    backgroundColor: 'green',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 64
                }}>
                    <TextInput
                                placeholder='Tên loại phòng'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textTenLoaiPhong: text });
                                    }
                                }
                                value={this.state.textTenLoaiPhong}
                            />
                            <TextInput
                                placeholder='Diện Tích'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textDienTich: text });
                                    }
                                }
                                value={this.state.textDienTich}
                            />
                            <TextInput
                                placeholder='Đơn giá'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textDonGia: text });
                                    }
                                }
                                value={this.state.textDonGia}
                                
                            />

                            <TextInput
                                placeholder='DVT'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textDVT: text });
                                    }
                                }
                                value={this.state.textDVT}
                                
                            />

                    <TouchableHighlight  
                        
                        underlayColor='tomato'
                        onPress={this.onPressAddLoaiPhong}
                        
                    >
                                <Icon
                            name='building-o'
                            type='FontAwesome'
                            style={{fontSize: 25, marginLeft:'40%'}}
                                />
   
                    </TouchableHighlight>
                </View>
                <FlatList
                    style={{borderColor: '#5aaf76',borderWidth: 4,height:100,marginTop: 10,fontSize: 10}}
                    data={this.state.LoaiPhong}
                    renderItem={this._renderItem}  
                    
                >
                </FlatList>
                </View>
                
            
        );
    }
}