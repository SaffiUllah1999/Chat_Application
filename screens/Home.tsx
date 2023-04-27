import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Icon, HStack, View } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function Home({ navigation }) {
  return (
    <View style={{ marginTop: 20 }}>
      <HStack>
        <Icon
          as={Ionicons}
          name="arrow-back-circle"
          onPress={() => navigation.goBack()}
          size={10}
          color={"black.700"}
        />
        <Icon
          as={Ionicons}
          style={{ marginLeft: "35%" }}
          name="chatbubble-ellipses"
          onPress={() => navigation.navigate("Contacts")}
          size={10}
          color={"black.700"}
        />
        <Icon
          as={Ionicons}
          style={{ marginLeft: "32%" }}
          name="person-circle"
          onPress={() => navigation.navigate("Profile")}
          size={10}
          color={"black.700"}
        />
      </HStack>
      <MapView
        loadingEnabled
        width="100%"
        height={"40%"}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          pinColor={"red"} // any color
          title={"title"}
          description={"description"}
        />
      </MapView>
    </View>
  );
}
