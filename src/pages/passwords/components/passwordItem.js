import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";4

export function PasswordItem({ name, password, removePassword, editPassword, theme }) {
    async function handleCopyPassword() {
        
        await Clipboard.setStringAsync(password);
        alert("Senha salva com sucesso");

    }
    return (
        <Pressable onPress={handleCopyPassword} onLongPress={removePassword} style={[styles.container, { backgroundColor: theme.itemBackground }]}>
            <View style={[styles.textContainer]}>
                <Text style={[styles.name, { color: theme.itemTextColor }]}>{name}</Text>
                <Text style={[styles.password, { color: theme.itemTextColor }]}>{password}</Text>
            </View>
            <Pressable style={styles.button} onPress={editPassword}>
                <Ionicons name="create" size={24} color={theme.buttonColor} />
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textContainer: {
        flexDirection: "column",
        flex: 1
    },
    password: {
        fontSize: 16,
        fontWeight: "bold",
    },
    name: {
        fontSize: 14
    },
    button: {
        marginLeft: 10,
    }
});
