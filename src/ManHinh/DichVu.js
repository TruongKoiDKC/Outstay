import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  YellowBox,
  FlatList,
  SectionList,
} from "react-native";

//import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { ScrollView } from "react-native-gesture-handler";
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import firebase from 'firebase';
import _ from 'lodash';


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
            LoaiPhong:[],
            textTenLoaiPhong: '',
            textDienTich: '',
            textDonGia: '',
            textDVT: '',
            loading: false,

            PhiDichVu: [],
            textTenPhiDV: '',
            textDonGiaPhiDV: '',
            textDVTPhiDV: '',

            loading: false,

            ////Khai báo Modal box
            modalPhiDV: false,
            modalLoaiPhong: false
        });
    }

    //Component của Loại Phòng vs Phí dịch vụ ..UNSAFE_ ko hoạt động qua Flatlist
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
    componentDidMount() {
      PhiDVRef.on('value', (childSnapshot) => {
          const PhiDichVu = [];
          childSnapshot.forEach((doc) => {
              PhiDichVu.push({
                  key: doc.key,
                  PhiDichVu: doc.toJSON().PhiDichVu,
                  DonGia: doc.toJSON().DonGia,
                  DonViTinh: doc.toJSON().DonViTinh,
                  
              });
              this.setState({
                  PhiDichVu: PhiDichVu.sort((a, b) => {
                      return (a.PhiDichVu < b.PhiDichVu);
                  }),
                  loading: false,
                  PhiDichVu: PhiDichVu.sort((a, b) => {
                      return (a.DonGia < b.DonGia);
                  }),
                  loading: false,
                  PhiDichVu: PhiDichVu.sort((a, b) => {
                      return (a.DonViTinh < b.DonViTinh);
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
          DonGiaLoaiPhong: this.state.textDonGia,
          DonViTinhLoaiPhong: this.state.textDVT,
      });
  }

    //Lưu Phí dịch vụ
    onPressAddPhiDV = () => {
      if (this.state.textTenPhiDV.trim() === '' || 
          this.state.textDonGia.trim() === '' ||
          this.state.textDVT.trim() === '' )
           {
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
  }
  _renderItemLoaiPhong = ({item}) => {

    return(
        <View style={{margin: 10}}>
            <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Tên loại phòng :{item.TenLoaiPhong} </Text>
            <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Diện tích :{item.DienTich}</Text>
            <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Đơn giá :{item.DonGia}</Text>
            <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Đơn vị tính :{item.DonViTinh}</Text>
            <Text style={{fontSize: 15,fontStyle: 'italic'}}> </Text>
        </View>
    );
  }

  _renderItemPhiDV = ({item}) => {

    return(
        <View style={{padding: 10,}}>
            
            <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Tên phí dịch vụ :{item.PhiDichVu} </Text>
            <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Đơn giá :{item.DonGia}</Text>
            <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Đơn vị tính :{item.DonViTinh}</Text>
            <Text style={{fontSize: 15,fontStyle: 'italic'}}> </Text>
        </View>


    );
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
                        <View>
                        </View>
                      </View>
                </Modal>
                    
              </View>
            </View>                      
            <View>

            <FlatList
                        style={{borderColor: '#5aaf76',borderWidth: 4,height:200,marginTop: 20}}
                        data={this.state.LoaiPhong}
                        renderItem={this._renderItemLoaiPhong}     
                        >
            </FlatList>

            <FlatList
                        style={{borderColor: '#5aaf76',borderWidth: 4,height:100,marginTop: 10,fontSize: 10}}
                        data={this.state.PhiDichVu}
                        renderItem={this._renderItemPhiDV}
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
    width: 120,
  },
  
});