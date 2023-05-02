import React, { useState, useEffect } from "react";
import { FlatList, StatusBar, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Select, View, Text } from "native-base";
import { ServerContainer } from "@react-navigation/native";
import axios from "react-native-axios";

export default function Test() {
  const [service, setService] = React.useState("");
  const [user, setUser] = React.useState([]);

  useEffect(() => {
    axios
      .get("https://dummy.restapiexample.com/api/v1/employees")
      .then(function (response) {
        let api = response.data;
        console.log("Data == > :" + JSON.stringify(api));
        setUser(api.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  console.log("User Data:" + JSON.stringify(user));

  return (
    <View marginTop={20}>
      {user.map((data) => {
        return <Text>{data.id}</Text>;
      })}
      <Select>
        {user.map((data) => {
          return <Select.Item label={data.employee_name} value={data.id} />;
        })}
        {/* <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Select.Item label={item.title} value={item.id} />
        )}
      /> */}
      </Select>
      {/* <Picker> */}
      {/* <FlatList
        // keyExtractor={(item) => item.id}
        data={DATA}
        renderItem={({ item }) => (
          <Picker.Item label={item.title} value={item.id} />
        )}
      /> */}
      {/* </Picker> */}
      {/* <Picker>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#000",
  },
  title: {
    color: "#000",
  },
});
