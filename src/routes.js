import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/home";
import { Passwords } from "./pages/passwords";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./hooks/themeContext"; // Certifique-se de ajustar o caminho de acordo com sua estrutura de pastas

const Tab = createBottomTabNavigator();

export default function Routes() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
         tabBarStyle: {
          backgroundColor: theme.routesBackground,
          color: theme.itemTextColorOpposite
       }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons
                size={size}
                color={color}
                name={focused ? "home" : "home-outline"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Passwords"
        component={Passwords}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons
                size={size}
                color={color}
                name={focused ? "lock-closed" : "lock-closed-outline"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
