import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as firebaseApp from "firebase";
import {
  Button,
  Snackbar,
  Portal,
  Dialog,
  Paragraph,
  Provider as PaperProvider
} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar, ListItem} from 'react-native-elements';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import { Platform } from "react-native";



export default class App extends React.Component {
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
    this.tasksRef = firebaseApp.database().ref("/Khách hàng");
    
    const dataSource = [];
    this.state = {
      dataSource: dataSource,
      selecteditem: null,
      snackbarVisible: false,
      confirmVisible: false,

      ////Khai báo Modal box
      modal: false,

      //Search
      search:'',
    };this.arrayholder = [];
  }

  //Menu chọn Khách hàng và Hợp đồng
  menu = null;
  setMenuRef = ref => {
    this.menu = ref;
  };
  showMenu = () => {
    this.menu.show();
  };

  //Mở Modal box
  openModal = () => {
    this.setState({modal: true});
  };  

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }

  listenForTasks(tasksRef) {
    tasksRef.on("value", dataSnapshot => {
      var tasks = [];
      dataSnapshot.forEach(child => {
        tasks.push({
          Hovaten: child.val().HovaTen,
          NgaySinh: child.val().NgaySinh,
          DiaChi: child.val().DiaChi,
          CMND: child.val().CmnD,
          SDT: child.val().Sdt,
          Email: child.val().Email,
          key: child.key
        });
      });

      this.setState({
        dataSource: tasks
      });
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          width: "90%",
          height: 2,
          backgroundColor: "#BBB5B3"
        }}
      >
        <View />
      </View>
    );
  };
  deleteItem(item) {
    this.setState({ deleteItem: item, confirmVisible: true });
  }

  performDeleteItem(key) {
    var updates = {};
    updates["/Khách hàng/" + key] = null;
    return firebaseApp
      .database()
      .ref()
      .update(updates);   
  }

  addItem(itemName) {
    var newPostKey = firebaseApp
      .database()
      .ref()
      .child("Khách hàng")
      .push().key;

   
    var updates = {};
    updates["/Khách hàng/" + newPostKey] = {
      HovaTen:
        itemName === "" || itemName == undefined
          ? this.state.itemHovaTen
          : itemName  ,
      NgaySinh:
        itemName === "" || itemName == undefined
          ? this.state.itemNgaySinh
          : itemName  ,
      DiaChi:
          itemName === "" || itemName == undefined
            ? this.state.itemDiaChi
            : itemName  ,
      CMND:
          itemName === "" || itemName == undefined
            ? this.state.itemCMND
            : itemName  ,
      SDT:
          itemName === "" || itemName == undefined
            ? this.state.itemSDT
            : itemName  ,
      Email:
          itemName === "" || itemName == undefined
            ? this.state.itemEmail
            : itemName  ,
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);    
  }

  updateItem() {
    
    var updates = {};
    updates["/Khách hàng/" + this.state.selecteditem.key] = {
      HovaTen: this.state.itemHovaTen,
      NgaySinh: this.state.itemNgaySinh,
      DiaChi: this.state.itemDiaChi,
      CMND: this.state.itemCMND,
      SDT: this.state.itemSDT,
      Email: this.state.itemEmail,
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);   
  }

  saveItem() {
    if (this.state.selecteditem === null) this.addItem();
    else this.updateItem();

    this.setState({ itemHovaTen: "", selecteditem: null });
    this.setState({ itemNgaySinh: "", selecteditem: null });
    this.setState({ itemDiaChi: "", selecteditem: null });
    this.setState({ itemCMND: "", selecteditem: null });
    this.setState({ itemSDT: "", selecteditem: null });
    this.setState({ itemEmail: "", selecteditem: null });;
  }

  hideDialog(yesNo) {
    this.setState({ confirmVisible: false });
    if (yesNo === true) {
      this.performDeleteItem(this.state.deleteItem.key).then(() => {
        this.setState({ snackbarVisible: true });
      });
    }
  }

  showDialog() {
    this.setState({ confirmVisible: true });
    console.log("in show dialog");
  }

  undoDeleteItem() {
    this.addItem(this.state.deleteItem.name);
  }
  
  updateSearch = text  => {
    this.setState({
      search: text,
    })   
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.itemTrangThaiPhong.toUpperCase()}`;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ dataSource: newData });  
  };

  render() {
    return (
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black', fontSize: 21, fontWeight: 'bold'}}>
                  Thông tin khách hàng
                </Text>
          </View>
        <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={this.openModal}>
                <Icon name="plus" type="FontAwesome5" style={{fontSize: 25}} />
              </TouchableOpacity>

              <Modal
                isVisible={this.state.modal}
                onBackdropPress={() => this.setState({modal: false})}>
                <View
                  style={{
                    width: 350,
                    height: 590,
                    position: 'relative',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    shadowRadius: 20,
                    justifyContent:'center'
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
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          Trạng thái phòng
                        </Text>
                       
                        <TextInput
                          placeholder="Họ và tên :"
                          underlineColorAndroid="#5aaf76"
                          style={[{fontSize: 15}]}
                          onChangeText={text => this.setState({ itemHovaTen: text })}
                          value={this.state.itemHovaTen}
                        />
                        <TextInput
                          placeholder="Ngày/tháng/năm/sinh :"
                          underlineColorAndroid="#5aaf76"
                          style={[{fontSize: 15}]}
                          onChangeText={text => this.setState({ itemNgaySinh: text })}
                          value={this.state.itemNgaySinh}
                        />
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="Địa chỉ thường trú :"
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemDiaChi: text })}
                              value={this.state.itemDiaChi}
                            />
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="CMND/CMT/CCCD :"
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemCMND: text })}
                              value={this.state.itemCMND}
                            />
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="Số điện thoại : "
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemSDT: text })}
                              value={this.state.itemSDT}
                            />
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="Email : "
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemEmail: text })}
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
                      style={[styles.btn, {backgroundColor: '#5aaf76'}]}
                    >
                      {this.state.selecteditem === null ?  "Thêm" : "Cập Nhật"}
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>  
        </View>

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
                data={this.state.dataSource}
                renderItem={({ item }) => (
                  <View>
                    <ScrollView horizontal={true}>
                      <TouchableWithoutFeedback>
                        <View style={{ paddingTop: 10 }}>
                          <Text
                            style={{ color: "#5aaf76" }}
                            onPress={() => this.deleteItem(item)}
                          >
                            <Ionicons name="md-trash" size={20} />
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.setState({
                            selecteditem: item,
                            itemMaSo: item.MaSo,
                            itemTrangThaiPhong: item.TrangThaiPhong,
                            itemTenPhong: item.TenPhong,
                            itemTienPhong: item.TienPhong,
                            itemSDTcu: item.SDTcu,
                            itemSDThientai: item.SDThientai,
                            itemSoNuocCu: item.SoNuocCu,
                            itemSoNuocHienTai: item.SoNuocHienTai,
                          })
                        }
                      >
                        <View>
                          <Text style={styles.item}>- Mã số : {item.MaSo} </Text>
                          <Text style={styles.item}>- Trạng thái phòng : {item.TrangThaiPhong} </Text>
                          <Text style={styles.item}>- Tên phòng : {item.TenPhong} </Text>
                          <Text style={styles.item}>- Tiền phòng : {item.TienPhong} </Text>
                          <Text style={styles.item}>- Số ĐT cũ : {item.SDTcu} </Text>
                          <Text style={styles.item}>- Số ĐT hiện tại : {item.SDThientai} </Text>
                          <Text style={styles.item}>- Số nước cũ :  {item.SoNuocCu} </Text>
                          <Text style={styles.item}>- Số nước mới : {item.SoNuocHienTai} </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </ScrollView>
                  </View>
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
              <Text />

              
              <Portal>
                <Dialog
                  visible={this.state.confirmVisible}
                  onDismiss={() => this.hideDialog(false)}
                >
                  <Dialog.Title>Xác nhận</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph style={{fontSize: 15}}>Bạn thật sự muốn xoá ?</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button color="#5aaf76" onPress={() => this.hideDialog(true)}>Có</Button>
                    <Button color="#5aaf76" onPress={() => this.hideDialog(false)}>Không</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </ScrollView>
            <Snackbar
              visible={this.state.snackbarVisible}
              onDismiss={() => this.setState({ snackbarVisible: false })}
              action={{
                label: "Hoàn tác",
                onPress: () => {
                  // Do something
                  this.undoDeleteItem();
                }
              }}
            >
              Xoá thông tin thành công .
            </Snackbar>
          </PaperProvider>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 38 : 22,
    backgroundColor: 'white',
    padding: '5%',
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: "center"
  },
});