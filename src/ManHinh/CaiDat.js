import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  YellowBox,
  Image,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import Modal from 'react-native-modal';
import firebase from 'firebase';
import _ from 'lodash';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SocialIcon} from 'react-native-elements';

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

export default class Home extends React.Component {
  //Mở Modal box
  openModalHotro = () => {
    this.setState({modalHotro: true});
  };
  openModalVechungtoi = () => {
    this.setState({modalVechungtoi: true});
  };

  constructor(props) {
    super(props);
    this.state = {
      //Khai báo Modalbox
      modalHotro: false,
      modalVechungtoi: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontSize: 21, fontWeight: 'bold'}}>
            Cài đặt
          </Text>
        </View>

        <View style={{marginTop: '5%'}}>
          {Caidat.map((CD, index) => (
            <ListItem
              onPress={() => this.props.navigation.navigate('ManHinhPhongTro')}
              bottomDivider
              chevron
              key={index}
              title={CD.title}
              subtitle={CD.subtitle}
              leftIcon={{name: CD.icon}}
            />
          ))}
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
                  <Text style={{fontWeight: 'bold'}}>Version 0.0.1</Text>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View>
          <TouchableOpacity>
            <Animated.View style={styles.DX}>
              <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                Đăng xuất
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
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
    marginTop: 280,
  },
});
