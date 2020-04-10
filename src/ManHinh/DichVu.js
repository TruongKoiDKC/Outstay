import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  YellowBox
} from "react-native";

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import firebase from 'firebase';
import _ from 'lodash';
import FlatList from 'flatlist-react';

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
const PhiDVRef = rootRef.child('Phí dịch vụ')

export default class DichVu extends React.Component {
  //Khai báo Modal box
  state={
    modalPhiDV: false,
    modalLoaiPhong: false
  };

  //Mở Modal box
  openModalPhiDV = () => {
    this.setState ({ modalPhiDV: true});
  };
  openModalLoaiPhong = () => {
    this.setState ({ modalLoaiPhong: true});
  };

  //Đóng Modal box
  closeModalPhiDV = () => {
    this.setState ({ modalPhiDV: false});
  };
  closeModalLoaiPhong = () => {
    this.setState ({ modalLoaiPhong: false});
  };

  constructor(props) {
    super(props);
    this.state = ({
        LoaiPhong: [],
        textTenLoaiPhong: '',
        textDienTich: '',
        textDonGia: '',
        textDVT: '',

        PhiDichVu: [],
        textTenPhiDV: '',
        textDonGiaPhiDV: '',
        textDVTPhiDV: '',

        loading: false,
    });
}

UNSAFE_componentDidMount() {
  LoaiPhongRef.on('value', (childSnapshot) => {
      const loaiphongs = [];
      childSnapshot.forEach((doc) => {
          loaiphongs.push({
              key: doc.key,
              loaiphongName: doc.toJSON().loaiphongName
          });
          this.setState({
              loaiphongs: loaiphongs.sort((a, b) => {
                  return (a.loaiphongName < b.loaiphongName);
              }),
              loading: false,
          });
      });
  });
}

UNSAFE_componentDidMount() {
  PhiDVRef.on('value', (childSnapshot) => {
      const phidichvus = [];
      childSnapshot.forEach((doc) => {
          phidichvus.push({
              key: doc.key,
              phidichvuName: doc.toJSON().phidichvuName
          });
          this.setState({
              phidichvus: phidichvus.sort((a, b) => {
                  return (a.phidichvuName < b.phidichvuName);
              }),
              loading: false,
          });
      });
  });
}

//Lưu Loại phòng
onPressAddLoaiPhong = () => {
  if (this.state.textTenLoaiPhong.trim() === '' || 
      this.state.textDienTich.trim() === '' || 
      this.state.textDonGia.trim() === '' || 
      this.state.textDVT.trim() === '') {
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
  this.setState({
      textTenLoaiPhong: '',
      textDienTich: '',
      textDonGia: '',
      textDVT: '',
  })
}

//Lưu Phí dịch vụ
onPressAddPhiDV = () => {
  if (this.state.textTenPhiDV.trim() === '' || 
      this.state.textDonGiaPhiDV.trim() === '' ||
      this.state.textDVTPhiDV.trim() === '') {
      alert('Vui lòng nhập đầy đủ thông tin !');
      return;
  }
  else{
    alert('Thông tin đã được lưu !')
  }
  PhiDVRef.push({
      PhiDichVu: this.state.textTenPhiDV,
      DonGia: this.state.textDonGiaPhiDV,
      DonViTinh: this.state.textDVTPhiDV,
  });
  this.setState({
    textTenPhiDV: '',
    textDonGiaPhiDV: '',
    textDVTPhiDV: '',
})
}

    render() {
        return(
          <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>

              <View style={{flex: 1}}>
                <TouchableOpacity onPress={this.openModalPhiDV}>
                  <Icon
                    name='dollar'
                    type='FontAwesome'
                    style={{fontSize: 25}}
                  />
                </TouchableOpacity>
                <Modal isVisible={this.state.modalPhiDV}>
                <View style={{width:350, height:380, backgroundColor:'white'}}>
                    <View style={{alignItems:"center"}}>
                      <Text style={{color:'black', fontSize: 21, fontWeight:'bold', marginTop:'5%'}}>
                          Chi phí dịch vụ
                      </Text>
                    </View>
                    <View style={{marginTop: '2%'}}>
                            <Animated.View style={styles.vienkhung}>
                            <View style={{padding: 8}}>
                            <TextInput
                                placeholder='Tên phí dịch vụ'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textTenPhiDV: text });
                                    }
                                }
                                value={this.state.textTenPhiDV}
                            />
                            <TextInput
                                placeholder='Đơn giá'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textDonGiaPhiDV: text });
                                    }
                                }
                                value={this.state.textDonGiaPhiDV}
                            />
                            <TextInput
                                placeholder='Đơn vị tính'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textDVTPhiDV: text });
                                    }
                                }
                                value={this.state.textDVTPhiDV}
                            />
                            </View> 
                            </Animated.View>    
                        </View>
                        <View style ={{ justifyContent:'center', alignItems:'center', flexDirection: 'row', marginTop:'5%'}}>
                          <TouchableOpacity onPress={this.closeModalPhiDV}>
                            <Animated.View style={[styles.btn]}>
                                <Text style={{fontSize: 20, color:'#5aaf76', fontWeight:'bold'}}>Hủy bỏ</Text>
                            </Animated.View>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={this.onPressAddPhiDV}>
                            <Animated.View style={[styles.btn,{marginLeft: 20,backgroundColor:'#5aaf76'}]}>
                                <Text style={{fontSize: 20, color:'white', fontWeight:'bold'}}>Lưu</Text>
                            </Animated.View>
                          </TouchableOpacity>
                        </View>
                </View>
                </Modal>
              </View>

              <View style={{alignItems:"center", justifyContent:"center", flex:3}}>
                    <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                        Dịch vụ
                    </Text>
              </View>


              <View style={{flex: 1}}>
                <TouchableOpacity onPress={this.openModalLoaiPhong}>
                  <Icon
                    name='building-o'
                    type='FontAwesome'
                    style={{fontSize: 25, marginLeft:'70%'}}
                  />
                </TouchableOpacity>
                <Modal isVisible={this.state.modalLoaiPhong}>
                <View style={{width:350, height:420, backgroundColor:'white'}}>
                        <View style={{alignItems:"center"}}>
                          <Text style={{color:'black', fontSize: 21, fontWeight:'bold', marginTop:'5%'}}>
                              Loại phòng
                          </Text>
                        </View>
                        <View style={{marginTop: '2%'}}>
                            <Animated.View style={styles.vienkhung}>
                            <View style={{padding: 8}}>
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
                                placeholder='Diện tích'
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
                                placeholder='Đơn vị tính'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textDVT: text });
                                    }
                                }
                                value={this.state.textDVT}
                            />
                            </View> 
                            </Animated.View>    
                        </View>
                        <View style ={{ justifyContent:'center', alignItems:'center', flexDirection: 'row', marginTop:'5%'}}>
                          <TouchableOpacity onPress={this.closeModalLoaiPhong}>
                            <Animated.View style={[styles.btn]}>
                                <Text style={{fontSize: 20, color:'#5aaf76', fontWeight:'bold'}}>Hủy bỏ</Text>
                            </Animated.View>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={this.onPressAddLoaiPhong}>
                            <Animated.View style={[styles.btn,{marginLeft: 20,backgroundColor:'#5aaf76'}]}>
                                <Text style={{fontSize: 20, color:'white', fontWeight:'bold'}}>Lưu</Text>
                            </Animated.View>
                          </TouchableOpacity>
                        </View>
                      </View>
                </Modal>
                    
              </View>
            </View>

            <View>
              <Text>Viết Flat list trong đây nè :) Có import FlatList rồi nha </Text>
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
    margin: '5%',
    borderRadius: 20
  },

  btn:{
    borderColor:'#5aaf76',
    borderWidth: 4,
    padding: 15,
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center',
    height: 50,
    width: 120
}
  
});