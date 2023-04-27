import React from "react";
import { Avatar, View, Icon } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
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
      <Avatar
        bg="pink.600"
        alignSelf="center"
        size="2xl"
        source={{
          uri: "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80",
        }}
      >
        GG
      </Avatar>
    </View>
  );
}
