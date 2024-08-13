
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { ThemeProvider } from './src/hooks/themeContext'; 

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
