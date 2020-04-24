import React, { Component } from 'react'
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    YellowBox,
    FlatList,
} from 'react-native'

import _ from 'lodash';
import { ScrollView, } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';


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
const LoaiPhongRef = rootRef.child('Loại phòng');


export default class LoaiPhong extends Component {
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
            <View style={{margin: 10}}>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Tên loại phòng :{item.TenLoaiPhong} </Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Diện tích :{item.DienTich}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Đơn giá :{item.DonGia}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Đơn vị tính :{item.DonViTinh}</Text>
            </View>


        );

    }



    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhDichVu")}>
                            <Icon
                            name='chevron-left'
                            type='FontAwesome5'
                            style={{fontSize: 20}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 3, alignItems:"center"}}>
                        <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                            Loại phòng
                        </Text>
                    </View>

                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this.onPressAddLoaiPhong}>
                            
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
                    </ScrollView>
                </View>
                <View>
                
                </View>
                <FlatList
                    style={{borderColor: '#5aaf76',borderWidth: 4,height:100,marginTop: 20}}
                    data={this.state.LoaiPhong}
                    renderItem={this._renderItem}  
                    
                >
                </FlatList>
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