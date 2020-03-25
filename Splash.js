import React from 'react';
import { StyleSheet,
         Text, 
         View,
         Image,
         TouchableOpacity } from 'react-native';

class SplashScreen extends React.Component {
  render() {
    const viewStyles = [styles.container, { backgroundColor: 'white' }];
    const textStyles = {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold'
    };

    return (
      <View style={viewStyles}>
        <Image
            style={{width: 350, height: 350}}
            source={require('../images/Store.jpg')}
            resizeMode= 'contain'
        ></Image>    
        <Text style={textStyles}>
          Splash Screen
        </Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true }
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (

    <View style={styles.header}> 
      <View style={styles.Image}>
        <Image
            style={{width: 280, height: 280}}
            source={require('../images/Store.jpg')}
            resizeMode= 'contain'
        />
      </View>

      <View style={styles.Intro}>
        <Text style={{marginTop:5, fontSize: 20, color: "#cfcfcf"}}>
          Chào mừng bạn đến với
        </Text>

        <Text style={{fontWeight:"bold", fontSize: 30, color: "#5aaf76"}}>
          OUTSTAY
        </Text>


        <Text style={{fontSize: 19,fontFamily:"AsapCondensed-Bold", textAlign: "center", alignItems: "center", marginTop: "15%", padding: "5%"}}>
          Outstay được ra đời giúp người quản lý tính toán chính xác tiền phòng, dịch vụ, tiết kiệm thời gian ghi chép, thống kê.
        </Text>
      
        <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhLogin")}>
          <Text style={{fontWeight:"bold", fontSize: 25, color:"black", marginTop: "35%"}}>
            BẮT ĐẦU
          </Text>
        </TouchableOpacity>   

      </View>
    </View> 

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  header:{
      flex: 1,
      backgroundColor: "white"
  },

  Image:{
      justifyContent:'center',
      alignItems: 'center'
  },

  Intro:{
    textAlign: "center",
    alignItems: "center"
  }
});