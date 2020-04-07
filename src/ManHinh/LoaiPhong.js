import React, { Component } from 'react'
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,} from 'react-native'

import { ScrollView, } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';


/*
var config = {
    databaseURL: "https://fir-outstay.firebaseio.com/",
    projectId: "fir-outstay",
};*/
//firebase.initializeApp(config);
/*
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}*/
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
const LoaiPhongRef = rootRef.child('Loai Phong');




export default class LoaiPhong extends Component {
    /*
    UNSAFE_componentWillMount() {
        var config = {
            clientId: '409483301695-ff7d5576e5vus75pr0ud2kf157hjgbc9.apps.googleusercontent.com',
            appId: '1:409483301695:android:e9ff877f4a6d4a6a77398a',
            apiKey: 'AIzaSyDYmW5KUcA4YK9RFX8rmozMCmtb1q2sL5Q',
            databaseURL: 'https://fir-outstay.firebaseio.com',
            storageBucket: 'fir-outstay.appspot.com',
            messagingSenderId: '409483301695',
            projectId: 'fir-outstay',
            // enable persistence by adding the below flag
            // persistence: true,
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        /*
        firebase.database().ref('LoaiPhong/').set({
            TenLoaiPhong: 'VVIP Room',
            DienTich: '1000',
            DonGia: '100000',
            DonViTinh: 'trieu'
        }).then(()=>{
            //success callback
            console.log('data ')
        }).catch((error)=>{
            //error callback
            console.log('error ')
        })
    }*/
    
    constructor(props) {
        super(props);
        this.state = ({
            LoaiPhong: [],
            textTenLoaiPhong: '',
            textDienTich: '',
            textDonGia: '',
            textDVT: '',
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
    onPressAdd = () => {
        if (this.state.textTenLoaiPhong.trim() === '') {
            alert('Ban chưa nhập thông tin !!!');
            return;
        }
        LoaiPhongRef.push({
            TenLoaiPhong: this.state.textTenLoaiPhong,
            DienTich: this.state.textDienTich,
            DonGia: this.state.textDonGia,
            DonViTinh: this.state.textDVT,
        });
    }
    
    DichVu(){
        const {navigate} = this.props.navigation;
        navigate('ManHinhDichVu');
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
                        <TouchableOpacity onPress={this.onPressAdd}>
                            
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