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
import swal from "react-native-sweet-alert";
import axios from "react-native-axios";
import { FloatingLabelInput } from "react-native-floating-label-input";

export default function Register({ navigation }) {
  const [status, requestPermission] = Location.useBackgroundPermissions();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = "http://172.16.10.58:3000/";

  const Register_User = () => {
    axios
      .post("http://172.16.10.58:3000/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        swal({
          icon: "success",
          type: "success",
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        swal({
          icon: "error",
          type: "error",
        });
      });
  };

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
            onPress={() => (navigation.navigate("Login"), Register_User())}
          >
            Register
          </Button>
        </View>
      </View>
    </Box>
  );
}
