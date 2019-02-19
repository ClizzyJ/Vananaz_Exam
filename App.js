import React, { Component } from 'react';
import { Text, View , StyleSheet, AppRegistry, Image} from 'react-native';
const styles = StyleSheet.create({
  lowerbg: {
    position: 'absolute',
    bottom: 0
  },
});
export default class Backgrounds extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignContent: 'stretch'
      }}>
      <View>
        <Image source={require('./assets/images/01-upper-bg.png')}/>
      </View>
      <View style={styles.lowerbg}>
        <Image source={require('./assets/images/01-lower-bg.png')}/>
      </View>
      </View>
    );
  }
}
