import React, { useState, useEffect } from "react";
import {
  Text,
  HStack,
  Center,
  Input,
  Heading,
  Switch,
  VStack,
  Button,
  Box,
  View,
} from "native-base";

import * as Location from "expo-location";
import { FloatingLabelInput } from "react-native-floating-label-input";
import swal from "react-native-sweet-alert";
import axios from "react-native-axios";
import bcrypt from "react-native-bcrypt";

let User_ID = "";
let User_Email = "";
let User_Image = "";

export default function Login({ navigation }) {

  const [status, requestPermission] = Location.useBackgroundPermissions();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [show_email, setShow_email] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const login_Fn = () => {
    axios
      .post("http://172.16.10.58:3000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("-" + res.data.Id);
        // setId(res.data.Id);
        // setShow_email(res.data.email);
        User_ID = res.data.Id;
        User_Email = res.data.email;
        navigation.navigate("Home");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      });
  };

  console.log("ID" + id);
  return (
    <Box
      style={{ backgroundColor: "white" }}
      width="100%"
      height={"100%"}
      justifyContent={"center"}
      alignContent="center"
      alignItems={"center"}
    >
      <View
        style={{
          width: "60%",
          height: "100%",
        }}
        alignContent="center"
      >
        <View marginTop={5} style={{ height: "10%" }}>
          <FloatingLabelInput
            value={email}
            onChangeText={(v) => setEmail(v)}
            label="Email"
            staticLabel
            containerStyles={{
              height: 50,
              borderWidth: 2,
              paddingHorizontal: 10,
              backgroundColor: "#fff",

              borderRadius: 8,
            }}
            customLabelStyles={{
              fontSizeFocused: 12,
            }}
            labelStyles={{
              backgroundColor: "#fff",
              paddingHorizontal: 5,
            }}
            inputStyles={{
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View marginTop={10} style={{ height: "10%" }}>
          <FloatingLabelInput
            label="Password"
            onChangeText={(v) => setPassword(v)}
            value={password}
            staticLabel
            togglePassword={show}
            customShowPasswordComponent={<Text>Show</Text>}
            customHidePasswordComponent={<Text>Hide</Text>}
            containerStyles={{
              height: 50,
              borderWidth: 2,
              paddingHorizontal: 10,
              backgroundColor: "#fff",

              borderRadius: 8,
            }}
            customLabelStyles={{
              fontSizeFocused: 12,
            }}
            labelStyles={{
              backgroundColor: "#fff",
              paddingHorizontal: 5,
            }}
            inputStyles={{
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View
          style={{ marginTop: 20 }}
          justifyContent={"center"}
          alignContent="center"
          alignItems={"center"}
        >
          <Button
            style={{ width: "70%", borderRadius: 100 }}
            onPress={() => login_Fn()}
          >
            Log In
          </Button>

          <Button
            style={{ width: "70%", borderRadius: 100, marginTop: 20 }}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Button>
        </View>
      </View>
    </Box>
  );
}
export { User_ID, User_Email };
