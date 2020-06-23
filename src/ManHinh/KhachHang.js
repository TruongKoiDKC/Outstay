import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import {
  Button,
  Snackbar,
  Portal,
  Dialog,
  Paragraph,
  Provider as PaperProvider,
} from 'react-native-paper';

//import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { ScrollView } from "react-native-gesture-handler";
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import * as firebaseApp from 'firebase';
import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {SearchBar, ListItem} from 'react-native-elements';

//Các option của Image picker
var options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
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

export default class DichVu extends React.Component {
  //Mở Modal box
  openModal = () => {
    this.setState({modal: true});
  };

  constructor(props) {
    super(props);
    if (!firebaseApp.apps.length) {
      firebaseApp.initializeApp({
        apiKey: 'AIzaSyDYmW5KUcA4YK9RFX8rmozMCmtb1q2sL5Q',
        //authDomain: “FULL_AUTHDOMAIN_PUT_HERE”,
        databaseURL: 'https://fir-outstay.firebaseio.com',
        storageBucket: 'fir-outstay.appspot.com',
      });
    }
    this.KhachHangRef = firebaseApp.database().ref('/Khách hàng');

    const data = [];
    this.state = {
      data: data,
      selecteditem: null,
      snackbarVisible: false,
      confirmVisible: false,

      ////Khai báo Modal box
      modal: false,
    };
    //Khai báo của Image Picker
    avatarSource: null;
  }

  //Component của Loại Phòng vs Phí dịch vụ ..UNSAFE_ ko hoạt động qua Flatlist
  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.KhachHangRef);
  }
  //Dịch Vụ và Loại phòng
  listenForTasks(KhachHangRef) {
    KhachHangRef.on('value', dataSnapshot => {
      var tasks = [];
      dataSnapshot.forEach(child => {
        tasks.push({
          TenPhong: child.val().TenPhong,
          HovaTen: child.val().HovaTen,
          NgaySinh: child.val().NgaySinh,
          DiaChi: child.val().DiaChi,
          CMNhanDan: child.val().CMNhanDan,
          SoDT: child.val().SoDT,
          Email: child.val().Email,
          key: child.key,
        });
      });

      this.setState({
        data: tasks,
      });
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 2,
          backgroundColor: '#BBB5B3',
        }}>
        <View />
      </View>
    );
  };

  //Xoá Item
  deleteItem(item) {
    this.setState({deleteItem: item, confirmVisible: true});
  }

  performDeleteItem(key) {
    var updates = {};
    updates['/Khách hàng/' + key] = null;
    return firebaseApp
      .database()
      .ref()
      .update(updates);
  }

  //Thêm Items
  addItem(itemName) {
    var newPostKey = firebaseApp
      .database()
      .ref()
      .child('Khách hàng')
      .push().key;

    var updates = {};
    updates['/Khách hàng/' + newPostKey] = {
      TenPhong:
        itemName === '' || itemName == undefined
          ? this.state.itemTenPhong
          : itemName,
      HovaTen:
        itemName === '' || itemName == undefined
          ? this.state.itemHovaTen
          : itemName,
      NgaySinh:
        itemName === '' || itemName == undefined
          ? this.state.itemNgaySinh
          : itemName,
      DiaChi:
        itemName === '' || itemName == undefined
          ? this.state.itemDiaChi
          : itemName,
      CMNhanDan:
        itemName === '' || itemName == undefined
          ? this.state.itemCMND
          : itemName,
      SoDT:
        itemName === '' || itemName == undefined
          ? this.state.itemSDT
          : itemName,
      Email:
        itemName === '' || itemName == undefined
          ? this.state.itemEmail
          : itemName,
    };
    return firebaseApp
      .database()
      .ref()
      .update(updates);
  }

  //Sửa Update lại Items
  updateItem() {
    var updates = {};
    updates['/Khách hàng/' + this.state.selecteditem.key] = {
      TenPhong: this.state.itemTenPhong,
      HovaTen: this.state.itemHovaTen,
      NgaySinh: this.state.itemNgaySinh,
      DiaChi: this.state.itemDiaChi,
      CMNhanDan: this.state.itemCMND,
      SoDT: this.state.itemSDT,
      Email: this.state.itemEmail,
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);
  }

  // Lưu các item của PDV và LP
  saveItem() {
    if (this.state.selecteditem === null) this.addItem();
    else this.updateItem();
    this.setState({itemTenPhong: '', selecteditem: null});
    this.setState({itemHovaTen: '', selecteditem: null});
    this.setState({itemNgaySinh: '', selecteditem: null});
    this.setState({itemDiaChi: '', selecteditem: null});
    this.setState({itemCMND: '', selecteditem: null});
    this.setState({itemSDT: '', selecteditem: null});
    this.setState({itemEmail: '', selecteditem: null});
  }

  //Ẩn Dialog thông báo
  hideDialog(yesNo) {
    this.setState({confirmVisible: false});
    if (yesNo === true) {
      this.performDeleteItem(this.state.deleteItem.key).then(() => {
        this.setState({snackbarVisible: true});
      });
    }
  }
  //Hiện Dialog thông báo
  showDialog() {
    this.setState({confirmVisible: true});
    console.log('in show dialog');
  }

  //Hoàn tác lại những gì đã xoá
  undoDeleteItem() {
    this.addItem(this.state.deleteItem.name);
  }

  //ImagePicker
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
            alignSelf: 'center',
          }}
        />
      );
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}} />

          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 3}}>
            <Text style={{color: 'black', fontSize: 21, fontWeight: 'bold'}}>
              Khách hàng
            </Text>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.openModal} style={{marginLeft: 30}}>
              <Icon
                name="plus"
                type="MaterialCommunityIcons"
                style={{fontSize: 25}}
              />
            </TouchableOpacity>

            <Modal
              isVisible={this.state.modal}
              onBackdropPress={() => this.setState({modal: false})}>
              <View
                style={{
                  width: 355,
                  height: 550,
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
                    Thông tin khách hàng
                  </Text>
                </View>
                <View>
                  <Animated.View style={styles.vienkhung}>
                    <View style={{padding: 8}}>
                      <TouchableOpacity onPress={this.show.bind(this)}>
                        {img}
                        <Text
                          style={{
                            alignSelf: 'center',
                            marginTop: '3%',
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Hình đại diện
                        </Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder="Tên phòng"
                        underlineColorAndroid="#5aaf76"
                        style={[{fontSize: 15}]}
                        onChangeText={text =>
                          this.setState({itemTenPhong: text})
                        }
                        value={this.state.itemTenPhong}
                      />
                      <TextInput
                        placeholder="Họ và tên"
                        underlineColorAndroid="#5aaf76"
                        style={[{fontSize: 15}]}
                        onChangeText={text =>
                          this.setState({itemHovaTen: text})
                        }
                        value={this.state.itemHovaTen}
                      />
                      <TextInput
                        placeholder="Ngày/tháng/năm/sinh"
                        underlineColorAndroid="#5aaf76"
                        style={[{fontSize: 15}]}
                        onChangeText={text =>
                          this.setState({itemNgaySinh: text})
                        }
                        value={this.state.itemNgaySinh}
                      />
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <TextInput
                            placeholder="Địa chỉ thường trú"
                            underlineColorAndroid="#5aaf76"
                            style={{fontSize: 15}}
                            onChangeText={text =>
                              this.setState({itemDiaChi: text})
                            }
                            value={this.state.itemDiaChi}
                          />
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <TextInput
                            placeholder="CMND/CMT/CCCD"
                            underlineColorAndroid="#5aaf76"
                            style={{fontSize: 15}}
                            onChangeText={text =>
                              this.setState({itemCMND: text})
                            }
                            value={this.state.itemCMND}
                          />
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <TextInput
                            placeholder="Số điện thoại"
                            underlineColorAndroid="#5aaf76"
                            style={{fontSize: 15}}
                            onChangeText={text =>
                              this.setState({itemSDT: text})
                            }
                            value={this.state.itemSDT}
                          />
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <TextInput
                            placeholder="Email"
                            underlineColorAndroid="#5aaf76"
                            style={{fontSize: 15}}
                            onChangeText={text =>
                              this.setState({itemEmail: text})
                            }
                            value={this.state.itemEmail}
                          />
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Button
                    mode="contained"
                    onPress={() => this.saveItem()}
                    style={[styles.btn, {backgroundColor: '#5aaf76'}]}>
                    {this.state.selecteditem === null ? 'Thêm' : 'Cập Nhật'}
                  </Button>
                </View>
                <View />
              </View>
            </Modal>
          </View>
        </View>
        <View />

        <View style={{marginTop: 10}}>
          <SearchBar
            placeholder="Tìm kiếm ..."
            platform="android"
            underlineColorAndroid="#5aaf76"
            onChangeText={text => this.updateSearch(text)}
            autoCorrect={false}
            value={this.state.search}
          />
        </View>

        <PaperProvider>
          <ScrollView>
            <FlatList
              data={this.state.data}
              style={styles.vienkhung}
              renderItem={({item}) => (
                <View>
                  <ScrollView horizontal={true}>
                    <TouchableWithoutFeedback>
                      <View style={{paddingTop: 10}}>
                        <Text
                          style={{color: '#5aaf76', marginLeft: 20}}
                          onPress={() => this.deleteItem(item)}>
                          <Ionicons name="md-trash" size={20} />
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.setState({
                          selecteditem: item,
                          itemTenPhong: item.TenPhong,
                          itemHovaTen: item.HovaTen,
                          itemNgaySinh: item.NgaySinh,
                          itemDiaChi: item.DiaChi,
                          itemCMND: item.CMNhanDan,
                          itemSDT: item.SoDT,
                          itemEmail: item.Email,
                        })
                      }>
                      <View>
                        <Text style={styles.item}>
                          Tên phòng: {item.TenPhong}{''}
                        </Text>
                        <Text style={styles.item}>
                          Họ và tên: {item.HovaTen}{' '}
                        </Text>
                        <Text style={styles.item}>
                          Số điện thoại: {item.SoDT}{' '}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </ScrollView>
                </View>
              )}
              ItemSeparatorComponent={this.renderSeparator}
            />

            <Portal>
              <Dialog
                visible={this.state.confirmVisible}
                onDismiss={() => this.hideDialog(false)}>
                <Dialog.Title>Xác nhận</Dialog.Title>
                <Dialog.Content>
                  <Paragraph style={{fontSize: 15}}>
                    Bạn thật sự muốn xoá ?
                  </Paragraph>
                </Dialog.Content>

                <Dialog.Actions>
                  <Button color="#5aaf76" onPress={() => this.hideDialog(true)}>
                    Có
                  </Button>
                  <Button
                    color="#5aaf76"
                    onPress={() => this.hideDialog(false)}>
                    Không
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </ScrollView>
          <Snackbar
            visible={this.state.snackbarVisible}
            onDismiss={() => this.setState({snackbarVisible: false})}
            action={{
              label: 'Hoàn tác',
              onPress: () => {
                // Do something
                this.undoDeleteItem();
              },
            }}>
            Xoá thông tin thành công .
          </Snackbar>
        </PaperProvider>
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

  item: {
    marginLeft: 5,
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: 'center',
  },

  vienkhung: {
    paddingVertical: 10,
    borderColor: '#5aaf76',
    borderWidth: 3,
    margin: '3%',
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
