import React from "react";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Register from "../screens/Register";
import Contacts from "../screens/Contacts";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Test from "../screens/Test";
const StackNavigation = createStackNavigator();

export default function Stack() {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackNavigation.Screen name="Login" component={Login} />
        <StackNavigation.Screen name="Register" component={Register} />
        <StackNavigation.Screen name="Contacts" component={Contacts} />
        <StackNavigation.Screen name="Home" component={Home} />
        <StackNavigation.Screen name="Chat" component={Chat} />
        <StackNavigation.Screen name="Profile" component={Profile} />
        <StackNavigation.Screen name="Test" component={Test} />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}
