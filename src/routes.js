import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/home";
import { Passwords } from "./pages/passwords";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./hooks/themeContext";
import { TouchableOpacity } from "react-native";
import { useScreenGuard } from "./hooks/useScreenGuard";

const Tab = createBottomTabNavigator();

export default function Routes() {
  const { theme } = useTheme();
  const authenticate = useScreenGuard();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.routesBackground,
          color: theme.itemTextColorOpposite,
          borderTopColor: theme.buttonColor
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              size={size}
              color={color}
              name={focused ? "home" : "home-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Passwords"
        component={Passwords}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              size={size}
              color={color}
              name={focused ? "lock-closed" : "lock-closed-outline"}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={async () => {
                const result = await authenticate();
                if (result) {
                  props.onPress(); 
                }
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
