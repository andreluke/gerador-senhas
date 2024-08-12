import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Modal, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import useStorage from "../../hooks/useStorage";
import { PasswordItem } from "./components/passwordItem";
import { ModalName } from "./components/modalName";
import { useTheme } from "../../hooks/themeContext";
import { Ionicons } from "@expo/vector-icons";

export function Passwords() {
  const [listPasswords, setListPasswords] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();
  const { theme, toggleTheme } = useTheme();

  async function handleDeletePassword(name, password) {
    const updatedPasswords = await removeItem("@pass", name, password);
    setListPasswords(updatedPasswords);
  }

  function handleEditPassword(name) {
    setSelectedPassword(name);
    setModalVisible(true);
  }

  async function loadPasswords() {
    const passwords = await getItem("@pass");
    setListPasswords(passwords);
  }


  useEffect(() => {
    loadPasswords();
  }, [focused]);

  const handleSave = () => {
    loadPasswords();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBackground }]}>
      <View
        style={[styles.header, { backgroundColor: theme.headerBackground }]}
      >
        <TouchableOpacity style={styles.sunButton} onPress={toggleTheme}>
          <Ionicons
            name={theme.itemTextColorOpposite === "#000" ? "sunny" : "moon"}
            size={24}
            color={theme.itemTextColorOpposite}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.color }]}>
          Minhas senhas
        </Text>
      </View>

      <View style={styles.content}>
        <FlatList
          style={{ flex: 1, paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PasswordItem
              name={item.name}
              password={item.password}
              removePassword={() =>
                handleDeletePassword(item.name, item.password)
              }
              editPassword={() => handleEditPassword(item.name)}
              theme={theme}
            />
          )}
        />
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <ModalName
            name={selectedPassword}
            onSave={handleSave}
            handleClose={() => setModalVisible(false)}
            theme={theme}
          />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 120,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
  sunButton: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
  },
});
