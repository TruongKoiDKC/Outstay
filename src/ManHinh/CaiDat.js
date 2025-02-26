import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  YellowBox,
  Image,
  Platform,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import Modal from 'react-native-modal';
import firebase from 'firebase';
import _ from 'lodash';
import Communications from 'react-native-communications';
import {SocialIcon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

//Tắt khung cảnh báo màu vàng
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

//Kết nối database
try {
  firebase.initializeApp({
    apiKey: 'AIzaSyDYmW5KUcA4YK9RFX8rmozMCmtb1q2sL5Q',
    //authDomain: “FULL_AUTHDOMAIN_PUT_HERE”,
    databaseURL: 'https://fir-outstay.firebaseio.com',
    storageBucket: 'fir-outstay.appspot.com',
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack);
  }
}

//Khai báo thành phần trong ListItems
const Caidat = [
  {
    title: 'Thông tin tài khoản',
    icon: 'people',
  },
];
const Caidat1 = [
  {
    title: 'Hỗ trợ',
    icon: 'phone',
  },
];
const Caidat2 = [
  {
    title: 'Về chúng tôi',
    icon: 'info',
  },
];
const Caidat3 = [
  {
    title: 'Biểu mẫu',
    icon: 'print',
  },
];

const rootRef = firebase.database().ref();
const TTTKRef = rootRef.child('Thông tin tài khoản');

const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

const uploadImage = (uri, mime = 'img/jpg') => {
  return new Promise((resolve, reject) => {
    const uploadUri =
      Platform.OS === 'android' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storage.ref('images').child(`${sessionId}.jpg`);

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, {type: `${mime}; BASE64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error);
      });
  });
};

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

//Các option của Image picker
var options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class Home extends React.Component {
  //Mở Modal box
  openModalHotro = () => {
    this.setState({modalHotro: true});
  };
  openModalVechungtoi = () => {
    this.setState({modalVechungtoi: true});
  };
  openModalTTTK = () => {
    this.setState({modalTTTK: true});
  };
  openModalBieuMau = () => {
    this.setState({modalBieuMau: true});
  };
  

  constructor(props) {
    super(props);
    this.state = {
      TTTK: [],
      textHoten: '',
      textSDT: '',
      textemail: '',
      loading: false,

      //Khai báo Modalbox
      modalHotro: false,
      modalVechungtoi: false,
      modalBieuMau: false,

      //Khai báo của Image Picker
      avatarSource: null,
    };
  }

  componentDidMount() {
    TTTKRef.on('value', childSnapshot => {
      const TTTK = [];
      childSnapshot.forEach(doc => {
        TTTK.push({
          key: doc.key,
          Hoten: doc.toJSON().Hoten,
          SDT: doc.toJSON().SDT,
          Email: doc.toJSON().Email,
        });
        this.setState({
          TTTK: TTTK.sort((a, b) => {
            return a.Hoten < b.Hoten;
          }),
          loading: false,
          TTTK: TTTK.sort((a, b) => {
            return a.SDT < b.SDT;
          }),
          loading: false,
          TTTK: TTTK.sort((a, b) => {
            return a.Email < b.Email;
          }),
          loading: false,
        });
      });
    });
  }

  //Lưu thông tin tài khoản
  onPressAddTTTK = () => {
    if (
      this.state.textHoten.trim() === '' ||
      this.state.textSDT.trim() === '' ||
      this.state.textemail.trim() === ''
    ) {
      alert('Vui lòng nhập thông tin đầy đủ !');
      return;
    } else {
      alert('Thông tin đã được lưu !');
    }
    TTTKRef.push({
      Hoten: this.state.textHoten,
      SDT: this.state.textSDT,
      Email: this.state.textemail,
    });
    this.setState({
      textHoten: this.state.textHoten,
      textSDT: this.state.textSDT,
      textemail: this.state.textemail,
    });
  };

  show() {
    ImagePicker.showImagePicker(options, response => {
      this.setState({avatarSource: ''});
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else if (response.uri) {
        let source = {uri: response.uri};
        this.setState({
          avatarSource: source,
        });
      } else {
        uploadImage(response.uri)
          .then(url => this.setState({avatarSource: url}))
          .catch(error => console.log(error));
      }
    });
  }

  render() {
    let img =
      this.state.avatarSource == null ? null : (
        <Image
          source={this.state.avatarSource}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
        />
      );
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontSize: 21, fontWeight: 'bold'}}>
            Cài đặt
          </Text>
        </View>

        <View style={{marginTop: '5%'}}>
          {Caidat.map((CD, index) => (
            <ListItem
              onPress={this.openModalTTTK}
              bottomDivider
              chevron
              key={index}
              title={CD.title}
              subtitle={CD.subtitle}
              leftIcon={{name: CD.icon}}
            />
          ))}
          <Modal
            isVisible={this.state.modalTTTK}
            onBackdropPress={() => this.setState({modalTTTK: false})}>
            <View
              style={{
                width: 350,
                height: 460,
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: 20,
                shadowRadius: 20,
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 21,
                    fontWeight: 'bold',
                  }}>
                  Thông tin tài khoản
                </Text>
              </View>
              <View>
                <Animated.View style={styles.vienkhung}>
                  <View style={{padding: 8}}>
                    <View
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <TouchableOpacity onPress={this.show.bind(this)}>
                        {img}
                        <Text
                          style={{
                            marginTop: '3%',
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Hình đại diện
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      placeholder="Họ tên"
                      underlineColorAndroid="#5aaf76"
                      style={{fontSize: 15}}
                      onChangeText={text => {
                        this.setState({textHoten: text});
                      }}
                      value={this.state.textHoten}
                    />
                    <TextInput
                      placeholder="Số điện thoại"
                      underlineColorAndroid="#5aaf76"
                      style={{fontSize: 15}}
                      onChangeText={text => {
                        this.setState({textSDT: text});
                      }}
                      value={this.state.textSDT}
                    />
                    <TextInput
                      placeholder="E-mail"
                      underlineColorAndroid="#5aaf76"
                      style={{fontSize: 15}}
                      onChangeText={text => {
                        this.setState({textemail: text});
                      }}
                      value={this.state.textemail}
                    />
                  </View>
                </Animated.View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={this.onPressAddTTTK}>
                  <Animated.View
                    style={[styles.btn, {backgroundColor: '#5aaf76'}]}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Lưu
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={{marginTop: '5%'}}>
          {Caidat1.map((CD1, index) => (
            <ListItem
              onPress={this.openModalHotro}
              bottomDivider
              chevron
              key={index}
              title={CD1.title}
              subtitle={CD1.subtitle}
              leftIcon={{name: CD1.icon}}
            />
          ))}
          <Modal
            isVisible={this.state.modalHotro}
            onBackdropPress={() => this.setState({modalHotro: false})}>
            <View
              style={{
                width: 350,
                height: 300,
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: 20,
                shadowRadius: 20,
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 21,
                    fontWeight: 'bold',
                  }}>
                  Hỗ trợ khách hàng
                </Text>
              </View>

              <View style={{marginTop: '5%'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => Communications.phonecall('0838532354', true)}>
                  <View>
                    <SocialIcon
                      title="Liên lạc qua số điện thoại"
                      button
                      type="github"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    Communications.text('0838532354', 'Test Text Here')
                  }>
                  <View>
                    <SocialIcon
                      title="Liên lạc qua tin nhắn"
                      button
                      type="wechat"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    Communications.email(
                      ['aboutreact11@gmail.com', 'hello@aboutreact.com'],
                      null,
                      null,
                      'Demo Subject',
                      'Demo Content for the mail',
                    )
                  }>
                  {/*email(to, cc, bcc, subject, body)*/}
                  <View>
                    <SocialIcon
                      title="Gửi mail cho chúng tôi"
                      button
                      type="google"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={{marginTop: '5%'}}>
          {Caidat3.map((CD3, index) => (
            <ListItem
              onPress={this.openModalBieuMau}
              bottomDivider
              chevron
              key={index}
              title={CD3.title}
              subtitle={CD3.subtitle}
              leftIcon={{name: CD3.icon}}
            />
          ))}
          <Modal
            isVisible={this.state.modalBieuMau}
            onBackdropPress={() => this.setState({modalBieuMau: false})}>
            <View
              style={{
                width: 350,
                height: 300,
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: 20,
                shadowRadius: 20,
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 21,
                    fontWeight: 'bold',
                  }}>
                  Biểu mẫu
                </Text>
              </View>
              <View style={{padding: '5%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ManHinhHDTN')}>
                  <Animated.View
                    style={{
                      borderColor: '#5aaf76',
                      borderWidth: 2.5,
                      padding: 15,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#5aaf76',
                      }}>
                      Bản hợp đồng thuê nhà
                    </Text>
                  </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ManHinhNhanKhau')
                  }
                  style={{marginTop: 20}}>
                  <Animated.View
                    style={{
                      borderColor: '#f5be27',
                      borderWidth: 2.5,
                      padding: 15,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#f5be27',
                      }}>
                      Bản khai nhân khẩu - hộ khẩu
                    </Text>
                  </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ManHinhTDNK')}
                  style={{marginTop: 20}}>
                  <Animated.View
                    style={{
                      borderColor: '#278df2',
                      borderWidth: 2.5,
                      padding: 15,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#278df2',
                        textAlign: "center"
                      }}>
                      Bản khai thay đổi nhân khẩu - hộ khẩu
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={{marginTop: '5%'}}>
          {Caidat2.map((CD2, index) => (
            <ListItem
              onPress={this.openModalVechungtoi}
              bottomDivider
              chevron
              key={index}
              title={CD2.title}
              subtitle={CD2.subtitle}
              leftIcon={{name: CD2.icon}}
            />
          ))}
          <Modal
            isVisible={this.state.modalVechungtoi}
            onBackdropPress={() => this.setState({modalVechungtoi: false})}>
            <View
              style={{
                width: 350,
                height: 300,
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: 20,
                shadowRadius: 20,
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 21,
                    fontWeight: 'bold',
                  }}>
                  Thông tin về nhà phát triển
                </Text>
              </View>
              <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      marginTop: '9%',
                    }}
                    source={require('../images/header.png')}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      marginTop: '5%',
                    }}>
                    Made by Truong Dang & Tien Nguyen
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>Version 1.0.0</Text>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ManHinhLogin')}>
          <Animated.View style={styles.DX}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Đăng xuất
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const width = Dimensions.get('screen').width;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: '5%',
  },

  DX: {
    borderColor: '#ff4343',
    backgroundColor: '#ff4343',
    padding: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 250,
  },

  vienkhung: {
    paddingVertical: 10,
    borderColor: '#5aaf76',
    borderWidth: 4,
    margin: '5%',
    borderRadius: 20,
  },

  btn: {
    borderColor: '#5aaf76',
    borderWidth: 4,
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 120,
  },
});
