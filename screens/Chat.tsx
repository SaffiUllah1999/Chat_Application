import React, { useState, useRef, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Socket_Screen, { socket, io } from "../server/Socket_Screen";
import {
  Icon,
  Heading,
  Box,
  TextArea,
  Pressable,
  View,
  Input,
  Text,
  Button,
} from "native-base";
import axios from "react-native-axios";
import { User_ID, User_Email } from "./Login";
import { End_user_Id, End_user_Name } from "./Contacts";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";

export default function Chat() {
  //console.log("ID" + User_ID);

  // message to send
  const [textmessages, setTextmessages] = useState("");
  const [received_message, setReceived_message] = useState([]);
  const [getMessages, setGetMessages] = useState([]);
  const [send_Message, setSend_Message] = useState([]);
  const [message, setMessage] = useState([]);
  const [count, setCount] = useState(0);
  const [getcount, setGetCount] = useState(0);
  const [data, setData] = useState([]);
  const baseUrl = "http://172.16.10.58:3000/";
  const [keyboardStatus, setKeyboardStatus] = useState("");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    Socket_Screen();
    socket.emit("addUser", User_ID);
  }, []);

  useEffect(() => {
    socket.on("received_message", (msg) => {
      console.log(msg);
      if (
        msg._id === End_user_Id &&
        msg.message.send_body[0].Enduser_id === User_ID
      ) {
        msg.message.send_body[0].sender = false;
        msg.message.send_body[0].receiver = true;

        setReceived_message(msg);
        // handleSortMessages();
        console.log("----------------------");
        // msg.message.send_body.forEach((element) => {
        //   (element.sender = false) && (element.receiver = true);
        // });
        console.log(
          "Socket Received UseEffect Data :-----=" + JSON.stringify(msg)
        );
        const message_1 = msg;

        setMessage((message) => [...message, message_1.message.send_body[0]]);
      }
    });
  }, [received_message]);

  useEffect(() => {
    // console.log(" Get UseEffect--:" + End_user_Id);
    let dataSet = {
      _id: User_ID,
      message: {
        send_body: [{ Enduser_id: End_user_Id }],
      },
    };

    axios
      .post("http://172.16.10.58:3000/Get_Messages", dataSet)
      .then(function (response) {
        let api = response.data;
        setMessage(api.flat());
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, [count]);

  const getCurrentTime = () => {
    let today = new Date();
    let hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
    let minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
    return today;
  };

  const On_Send_Message = () => {
    socket.emit("send_message", {
      _id: User_ID,
      email: User_Email,
      message: {
        send_body: [
          {
            body: textmessages,
            date: getCurrentTime(),
            Enduser_id: End_user_Id,
            sender: true,
            receiver: false,
          },
        ],
      },
    });
    axios
      .post("http://172.16.10.58:3000/message", {
        _id: User_ID,
        email: User_Email,
        message: {
          send_body: [
            {
              body: textmessages,
              date: getCurrentTime(),
              Enduser_id: End_user_Id,
              sender: true,
              receiver: false,
            },
          ],
        },
      })
      .then(function (response) {
        setTextmessages("");
        let api = response.data;
        // console.log("Data == > :" + JSON.stringify(api));
        setCount(count + 1);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  console.log("All Data to Map == > :" + JSON.stringify(message));

  const Date_format = (date) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekday = weekdays[date.getUTCDay()];
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const formattedDate = `${weekday} ${hours}:${minutes}`;
    return formattedDate;
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View>
        <View
          style={{
            height: "10%",
            alignContent: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <Heading>{End_user_Name}</Heading>
        </View>

        <View height={"90%"}>
          <ScrollView>
            {message
              ? message.flat()?.map((index) => {
                  const formattedDate = Date_format(new Date(index.date));

                  return (
                    <View
                      key={index?._id}
                      style={{
                        alignItems:
                          index?.sender === false ? "flex-end" : "baseline",
                      }}
                    >
                      <View
                        style={{
                          marginTop: 8,
                          alignItems: "baseline",
                        }}
                      >
                        <View
                          justifyContent={"center"}
                          style={{
                            height: 40,
                            marginRight: 10,
                            backgroundColor:
                              index?.sender === false
                                ? "lightblue"
                                : "lightgreen",
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            borderTopRightRadius: 20,
                          }}
                        >
                          <Text style={{ marginLeft: 7, marginRight: 7 }}>
                            {index?.body}
                          </Text>
                        </View>
                        <Text fontSize={"xs"} italic style={{ color: "grey" }}>
                          {formattedDate}
                        </Text>
                      </View>
                    </View>
                  );
                })
              : ""}
          </ScrollView>

          <View height={"10%"}>
            <Input
              multiline
              onChangeText={(v) => setTextmessages(v)}
              placeholder="Enter Message...."
              style={{ marginBottom: 2, height: "100%" }}
              InputRightElement={
                <Pressable onPress={() => On_Send_Message()}>
                  <Icon
                    as={<Ionicons name={"send"} />}
                    size={8}
                    mr="2"
                    color="black.800"
                  />
                </Pressable>
              }
              value={textmessages}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
