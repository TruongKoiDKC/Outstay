import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {
  BarChart,
} from 'react-native-chart-kit';
//import React Native chart Kit for different kind of Chart

export default class ThongKe extends React.Component {
  render() {
    return (
        <View style={styles.chart}>
            <ScrollView>
                <View style={styles.container}>
                <View>
                    <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 23,
                        //padding: 16,
                        marginBottom:10,
                        color: '#1cc910',
                        fontWeight: 'bold',
                    }}>
                    Bảng thống kê theo tháng
                    </Text>
                    <Text style={{fontStyle:'italic',fontWeight:'bold'}}>Hàng nghìn</Text>
                    <BarChart
                    data={{
                        labels: [
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        ],
                        datasets: [
                        {
                            data: [5000000,1200000,4000000,1000000,28000000,55000000],
                        },
                        ],
                    }}
                    //width={Dimensions.get('window').width - 22}
                    width={370}
                    height={400}
                    //yAxisLabel={'VNĐ'}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 0.5,
                        color: (opacity = 1) => `gray`,
                        style: {
                        borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8
                        //borderRadius: 16,

                    }}
                    />

                    <BarChart
                    data={{
                        labels: [
                        '7',
                        '8',
                        '9',
                        '10',
                        '11',
                        '12',
                        ],
                        datasets: [
                        {
                            data: [4000000, 5000000, 7000000, 8000000, 1000000, 4300000],
                        },
                        ],
                    }}
                    //width={Dimensions.get('window').width - 22}
                    width={370}
                    height={400}
                    //yAxisLabel={'VNĐ'}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 0.5,
                        color: (opacity = 1) => `gray`,
                        style: {
                        borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,

                    }}
                    />

                </View>
                </View>
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    padding: 8,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  chart:{
      marginLeft: 2
  }
});
