import { Text, View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import useStorage from "../../../hooks/useStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { useTheme } from "../../../hooks/themeContext";

export function ModalPassword({ password, handleClose }) {
    const { saveItem } = useStorage();
    const [count, setCount] = useState(1); 
    const { theme } = useTheme();

    async function loadCounter() {
        try {
            const savedCount = await AsyncStorage.getItem('@passwordCounter');
            if (savedCount !== null) {
                setCount(parseInt(savedCount));
            }
        } catch (error) {
            console.error("Erro ao carregar o contador", error);
        }
    }

    async function saveCounter(newCount) {
        try {
            await AsyncStorage.setItem('@passwordCounter', newCount.toString());
        } catch (error) {
            console.error("Erro ao salvar o contador", error);
        }
    }

    useEffect(() => {
        loadCounter();
    }, []);

    function generatePasswordName() {
        const name = `Senha ${count}`;
        const newCount = count + 1;
        setCount(newCount); 
        saveCounter(newCount); 
        return name;
    }

    async function handleCopyPassword() {
        const name = generatePasswordName();
        
        await Clipboard.setStringAsync(password);
        alert("Senha salva com sucesso");

        await saveItem("@pass", name, password);
        handleClose();
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundModal }]}>
        <View style={[styles.content, { backgroundColor: theme.itemBackgroundContainer }]}>
          <Text style={[styles.title, { color: theme.color }]}>Senha gerada</Text>

                <Pressable style={[styles.innerPassword, { backgroundColor: theme.itemBackground }]} onLongPress={handleCopyPassword}>
                    <Text style={[styles.text, { color: theme.itemTextColor }]}>{password}</Text>
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={[styles.buttonText,{color: theme.itemTextColorOpposite}]}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
                        <Text style={styles.buttonSaveText}>Salvar Senha</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24, 24, 24, 0.6)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        backgroundColor: "#FFF",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 24
    },
    innerPassword: {
        backgroundColor: "#0e0e0e",
        width: "90%",
        padding: 14,
        borderRadius: 8
    },
    text: {
        color: "#FFF",
        textAlign: "center"
    },
    buttonArea: {
        flexDirection: "row",
        width: "90%",
        marginTop: 8,
        alignItems: "center",
        justifyContent: "space-between"
    },
    button: {
        flex: 1,
        alignItems: "center",
        marginTop: 14,
        marginBottom: 14,
        padding: 8
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
