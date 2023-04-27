import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import axios from "react-native-axios";
import { View, Text, Box } from "native-base";
let End_user_Id = "";
let End_user_Name = "";
export default function Contacts({ navigation }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://172.16.10.58:3000/", {})
      .then(function (response) {
        let api = response.data;
        console.log("Data == > :" + JSON.stringify(user));
        setUser(api);
        ``;
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <ScrollView>
      <View
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        marginTop={18}
      >
        {user.map((user) => {
          return (
            <Box
              marginTop={5}
              width={"80%"}
              height={20}
              style={{ borderWidth: 2, borderRadius: 11 }}
              justifyContent={"center"}
            >
              <TouchableOpacity
                onPress={() => (
                  navigation.navigate("Chat"),
                  (End_user_Id = user._id),
                  (End_user_Name = user.email),
                  console.log(End_user_Id)
                )}
              >
                <Text marginLeft={5}>{user.email}</Text>
              </TouchableOpacity>
            </Box>
          );
        })}
      </View>
    </ScrollView>
  );
}
export { End_user_Id, End_user_Name };
