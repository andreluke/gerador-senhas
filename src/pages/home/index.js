import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, Animated } from "react-native";
import Slider from "@react-native-community/slider";
import { ModalPassword } from "./components/modalPassword";
import { useTheme } from "../../hooks/themeContext";
import Ionicons from '@expo/vector-icons/Ionicons'; // Certifique-se de ter instalado @expo/vector-icons

let charset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}<>?";

export default function Home() {
  const [size, setSize] = useState(8);
  const [passwordValue, setPasswordValue] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const { theme, toggleTheme } = useTheme();

  function genetatePassowrd() {
    let password = "";
    for (let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    setPasswordValue(password)
    setModalVisible(true)
  }


  return (
    <View style={[styles.container, {backgroundColor: theme.containerBackground}]}>
      
     
      <TouchableOpacity style={styles.sunButton} onPress={toggleTheme}>
      <Ionicons
          name={theme.itemTextColorOpposite === '#000' ? "sunny" : "moon"} 
          size={24}
          color={theme.itemTextColorOpposite}
        />
    </TouchableOpacity>

      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={[styles.title, {color: theme.itemTextColorOpposite}]}>{size} caracteres</Text>

      <View style={[styles.area, {backgroundColor: theme.background}]}>
        <Slider
          minimumValue={6}
          maximumValue={20}
          maximumTrackTintColor="#ff0000"
          minimumTrackTintColor={theme.sliderColor}
          thumbTintColor={theme.sliderColor}
          value={size}
          onValueChange={(value) => setSize(parseInt(value.toFixed(0)))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={genetatePassowrd}>
        <Text style={[styles.buttonText]}>Gerar senha</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)}/>
      </Modal>

    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    borderRadius: 8,
    padding: 12,
  },
  button: {
    backgroundColor: "#392de9",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold"
  },
  sunButton: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
  },
});
