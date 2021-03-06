import React, { Component } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import NaviApp from "./src/Screen/NaviApp";
import SignNavi from "./src/Screen/SignNavi";
import { AsyncStorage } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      logInStatus: false // using for seperate TH(false) / HS(true)
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({
      loading: false
    });
    // 토큰 (로그아웃 or 회원탈퇴) 이 없어지면 loginStatus false 로 변경
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (!token) {
      this.setState({
        logInStatus: false
      });
    } else {
      this.setState({
        logInStatus: true
      });
    }
  }

  render() {
    const { logInStatus } = this.state;

    if (this.state.loading) {
      return <AppLoading />;
    }

    return logInStatus === false ? <SignNavi /> : <NaviApp />;
  }
}
