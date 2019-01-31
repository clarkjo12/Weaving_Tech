import React, { Component } from "react";
import { Text, View, Image } from 'react-native';
import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <View style={{alignItems: "center", flex: 1}}>
        <View style={{backgroundColor: "#222", height: 190, padding: 20, alignSelf: "stretch", alignItems: "center"}}>
          <Image source={logo} alt="logo" style={{width: 120, height: 80}}/>
          <Text style={{fontSize: 36, fontWeight: "bold", margin: 30, color: "white", fontFamily: "sans-serif"}}>
            Welcome to React Native
          </Text>
        </View>
        <Text style={{fontSize: "large", fontFamily: "sans-serif", margin: 30}}>
          To get started, edit <Text>src/App.js</Text> and save to reload.
        </Text>
      </View>
    );
  }
}

export default App;
