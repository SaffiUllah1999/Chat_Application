import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import axios from "react-native-axios";
import { View, Text, Center, Icon, HStack, Box } from "native-base";
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
                <HStack style={{ alignItems: "center" }}>
                  {user.Image === "" ? (
                    <Center
                      style={{
                        marginLeft: 18,
                        height: 60,
                        width: 60,
                        borderRadius: 100,
                        backgroundColor: "silver",
                      }}
                    >
                      <Icon
                        as={Ionicons}
                        name="person-circle-outline"
                        onPress={() => navigation.goBack()}
                        size={16}
                        color={"black.700"}
                      />
                    </Center>
                  ) : (
                    <Image
                      style={{
                        marginLeft: 10,
                        height: 60,
                        width: 60,
                        borderRadius: 100,
                      }}
                      source={{
                        uri: `data:image/png;base64,${user.Image}`,
                      }}
                    />
                  )}
                  <Text style={{ height: 40 }} marginLeft={5}>
                    {user.email}
                  </Text>
                </HStack>
              </TouchableOpacity>
            </Box>
          );
        })}
      </View>
    </ScrollView>
  );
}
export { End_user_Id, End_user_Name };
