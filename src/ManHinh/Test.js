import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    SafeAreaView,
    View,
    Text,
    PermissionsAndroid, Alert,
} from 'react-native';

import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob'
//import Orientation from 'react-native-orientation-locker';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;


export default class PDFExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            scale: 1,
            numberOfPages: 0,
            horizontal: false,
            width: WIN_WIDTH
        };
        this.pdf = null;
    }

    /*_onOrientationDidChange = (orientation) => {
        if (orientation == 'LANDSCAPE-LEFT'||orientation == 'LANDSCAPE-RIGHT') {
          this.setState({width:WIN_HEIGHT>WIN_WIDTH?WIN_HEIGHT:WIN_WIDTH,horizontal:true});
        } else {
          this.setState({width:WIN_HEIGHT>WIN_WIDTH?WIN_HEIGHT:WIN_WIDTH,horizontal:false});
        }
    };

    componentDidMount() {
        Orientation.addOrientationListener(this._onOrientationDidChange);
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }*/

    prePage = () => {
        let prePage = this.state.page > 1 ? this.state.page - 1 : 1;
        this.pdf.setPage(prePage);
        console.log(`prePage: ${prePage}`);
    };

    nextPage = () => {
        let nextPage = this.state.page + 1 > this.state.numberOfPages ? this.state.numberOfPages : this.state.page + 1;
        this.pdf.setPage(nextPage);
        console.log(`nextPage: ${nextPage}`);
    };

    zoomOut = () => {
        let scale = this.state.scale > 1 ? this.state.scale / 1.2 : 1;
        this.setState({scale: scale});
        console.log(`zoomOut scale: ${scale}`);
    };

    zoomIn = () => {
        let scale = this.state.scale * 1.2;
        scale = scale > 3 ? 3 : scale;
        this.setState({scale: scale});
        console.log(`zoomIn scale: ${scale}`);
    };

    switchHorizontal = () => {
        this.setState({horizontal: !this.state.horizontal, page: this.state.page});
    };

    actualDownload = () => {
      const { dirs } = RNFetchBlob.fs;
     RNFetchBlob.config({
       fileCache: true,
       addAndroidDownloads: {
       useDownloadManager: true,
       notification: true,
       mediaScannable: true,
       title: `test.pdf`,
       path: `${dirs.DownloadDir}/test.pdf`,
       },
     })
       .fetch('GET', 'https://timviec365.com.vn/pictures/files/m%E1%BA%ABu%20h%E1%BB%A3p%20%C4%91%E1%BB%93ng%20thu%C3%AA%20nh%C3%A0%20tr%E1%BB%8D.pdf', {})
       .then((res) => {
         console.log('The file saved to ', res.path());
       })
       .catch((e) => {
         console.log(e)
       });
   }

   downloadFile = async () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.actualDownload();
        } else {
          Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
      } catch (err) {
        console.warn(err);
      } 
   }

    render() {
        let source = {uri:'https://timviec365.com.vn/pictures/files/m%E1%BA%ABu%20h%E1%BB%A3p%20%C4%91%E1%BB%93ng%20thu%C3%AA%20nh%C3%A0%20tr%E1%BB%8D.pdf',cache:true};
        //let source = require('./test.pdf');  // ios only
        //let source = {uri:'bundle-assets://test.pdf'};

        //let source = {uri:'../images/HP.pdf'};

        return (
            <SafeAreaView style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight disabled={this.state.page === 1}
                                        style={this.state.page === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.prePage()}>
                        <Text style={styles.btnText}>{'-'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.btnText}>Trang</Text></View>
                    <TouchableHighlight disabled={this.state.page === this.state.numberOfPages}
                                        style={this.state.page === this.state.numberOfPages ? styles.btnDisable : styles.btn}
                                        onPress={() => this.nextPage()}>
                        <Text style={styles.btnText}>{'+'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.scale === 1}
                                        style={this.state.scale === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomOut()}>
                        <Text style={styles.btnText}>{'-'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.btnText}>Tỉ lệ</Text></View>
                    <TouchableHighlight disabled={this.state.scale >= 3}
                                        style={this.state.scale >= 3 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomIn()}>
                        <Text style={styles.btnText}>{'+'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.btnText}>{'Kiểu:'}</Text></View>
                    <TouchableHighlight style={styles.btn} onPress={() => this.switchHorizontal()}>
                        {!this.state.horizontal ? (<Text style={styles.btnText}>{'dọc'}</Text>) : (
                            <Text style={styles.btnText}>{'ngang'}</Text>)}
                    </TouchableHighlight>
                    <TouchableOpacity onPress={this.downloadFile}>
                      <View style={{margin: 2,padding: 2,marginTop: 5,marginLeft: 15}}>
                        <Text style={{color: 'red',fontSize: 15 ,fontWeight: 'bold'}}>Tải xuống</Text>
                      </View>
                    </TouchableOpacity>

                </View>
                <View style={{flex:1,width: this.state.width}}>
                    <Pdf ref={(pdf) => {
                        this.pdf = pdf;
                    }}
                         source={source}
                         scale={this.state.scale}
                         horizontal={this.state.horizontal}
                         onLoadComplete={(numberOfPages, filePath,{width,height},tableContents) => {
                             this.setState({
                                numberOfPages: numberOfPages 
                             });
                             console.log(`total page count: ${numberOfPages}`);
                             console.log(tableContents);
                         }}
                         onPageChanged={(page, numberOfPages) => {
                             this.setState({
                                 page: page
                             });
                             console.log(`current page: ${page}`);
                         }}
                         onError={(error) => {
                             console.log(error);
                         }}
                         style={{flex:1}}
                         />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    btn: {
        margin: 2,
        padding: 2,
        backgroundColor: "#5aaf76",
    },
    btnDisable: {
        margin: 2,
        padding: 2,
        backgroundColor: "gray",
    },
    btnText: {
        margin: 2,
        padding: 2,
    }
});
