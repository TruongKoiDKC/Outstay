import * as React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
//import React Native chart Kit for different kind of Chart

export default class ThongKe extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontSize: 21, fontWeight: 'bold'}}>
            Thống kê
          </Text>
        </View>

        <ScrollView>
          <View>
            <View>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 17,
                  color: 'black',
                  marginTop: 20,
                  fontWeight:'bold'
                }}>
                Thống kê theo doanh thu từ tháng 1 đến tháng 6
              </Text>
              <Text
                style={{fontStyle: 'italic', marginLeft: 23, marginTop: 15}}>
                VNĐ
              </Text>
              <BarChart
                data={{
                  labels: ['1', '2', '3', '4', '5', '6'],
                  datasets: [
                    {
                      data: [4000, 1000, 3500, 8000, 2500, 6300],
                    },
                  ],
                }}
                width={350}
                height={250}
                chartConfig={{
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  decimalPlaces: 1,
                  color: (opacity = 1) => '#5aaf76',
                  boderRadius: 16,
                  style: {boderRadius: 16},
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 17,
                  color: 'black',
                  marginTop: 20,
                  fontWeight:'bold'
                }}>
                Thống kê theo doanh thu từ tháng 7 đến tháng 12
              </Text>
              <Text
                style={{fontStyle: 'italic', marginLeft: 23, marginTop: 15}}>
                VNĐ
              </Text>
              <BarChart
                data={{
                  labels: ['7', '8', '8', '10', '11', '12'],
                  datasets: [
                    {
                      data: [2000, 1000, 3500, 6000, 2500, 3000],
                    },
                  ],
                }}
                width={350}
                height={250}
                chartConfig={{
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  decimalPlaces: 1,
                  color: (opacity = 1) => '#5aaf76',
                  boderRadius: 16,
                  style: {boderRadius: 16},
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
    padding: '5%',
    backgroundColor: 'white',
  },
});
