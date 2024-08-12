import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useTheme } from "../../../hooks/themeContext";
import useStorage from "../../../hooks/useStorage";

export function ModalName({ name, onSave, handleClose }) {
  const { updateItem } = useStorage();
  const { theme } = useTheme();
  const [nome, setNome] = useState(name || ""); 

  useEffect(() => {
    setNome(name || ""); 
  }, [name]);

  const handleSave = async () => {
    const newName = nome.trim(); 

    if (newName === "" || newName === name) {
      alert("O novo nome deve ser diferente do atual e não pode estar vazio.");
      return;
    }

    try {
      await updateItem("@pass", name, newName);
      onSave(); 
      handleClose();
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
      alert("Erro ao atualizar nome.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundModal }]}>
      <View style={[styles.content, { backgroundColor: theme.itemBackgroundContainer }]}>
        <Text style={[styles.title, { color: theme.color }]}>Edite o nome</Text>

        <View style={[styles.changeName, { backgroundColor: theme.itemBackground }]}>
          <TextInput
            style={[styles.text, { color: theme.itemTextColor }]}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o novo nome"
            placeholderTextColor={theme.itemTextColor}
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={[styles.buttonText, { color: theme.itemTextColorOpposite }]}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleSave}
          >
            <Text style={[styles.buttonSaveText ]}>Salvar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  changeName: {
    width: "90%",
    padding: 14,
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
  },
  buttonArea: {
    flexDirection: "row",
    width: "90%",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
  },
    buttonSave: {
        backgroundColor: "#392DE9",
        borderRadius: 8
    },
    buttonSaveText: {
        color: "#FFF",
        fontWeight: "bold"
    }
});
