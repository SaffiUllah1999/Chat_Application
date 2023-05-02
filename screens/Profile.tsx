import React, { useEffect, useState } from "react";
import { Avatar, View, Icon, Center } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { User_ID, User_Email } from "./Login";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "react-native-axios";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

export default function Profile({ navigation }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    // console.log(" Get UseEffect--:" + End_user_Id);
    let dataSet = {
      _id: User_ID,
    };
    axios
      .post("http://172.16.10.58:3000/DisplayImage", dataSet)
      .then(function (response) {
        let api = response.data;
        // console.log(api);
        try {
          setImage(api.Image);
        } catch (v) {
          console.log(v);
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // setImage(result.assets[0]);
    console.log("\n\n Result:=========" + JSON.stringify(result));

    if (!result.canceled) {
      setImage(result.assets[0].base64);
      Upload_Image();
    }
  };

  const Upload_Image = () => {
    // console.log(" Get UseEffect--:" + End_user_Id);
    let dataSet = {
      _id: User_ID,
      Image: image,
    };

    axios
      .post("http://172.16.10.58:3000/UpdateImage", dataSet)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  // console.log("Image :" + JSON.stringify(image));

  // var base64Icon = "data:image/png;base64,${image}";
  // var base64 = base64Icon;
  // console.log("\nBase Data :" + image);
  console.log("\n\n Result:=========" + image);
  return (
    <View style={{ marginTop: 10 }}>
      <Icon
        as={Ionicons}
        name="arrow-back-circle"
        onPress={() => navigation.goBack()}
        size={10}
        color={"black.700"}
      />
      {/* <Center
        bg="pink.600"
        alignSelf="center"
        size="2xl"
        style={{ borderRadius: 100 }}
      > */}
      <Center>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: `data:image/png;base64,${image}`,
          }}
        />
      </Center>
      {/* </Center> */}
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => pickImage()}>
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
