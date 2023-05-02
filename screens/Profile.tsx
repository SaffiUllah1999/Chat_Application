import React from "react";
import { Avatar, View, Icon, Center } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { User_ID, User_Email } from "./Login";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile({ navigation }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Icon
        as={Ionicons}
        name="arrow-back-circle"
        onPress={() => navigation.goBack()}
        size={10}
        color={"black.700"}
      />
      <Center
        bg="pink.600"
        alignSelf="center"
        size="2xl"
        style={{ borderRadius: 100 }}
      ></Center>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Center
            size="xs"
            style={{ backgroundColor: "silver", borderRadius: 50 }}
          >
            <Icon
              as={Ionicons}
              name="camera"
              onPress={() => navigation.goBack()}
              size={7}
              color={"black.700"}
            />
          </Center>
        </TouchableOpacity>
      </View>
    </View>
  );
}
