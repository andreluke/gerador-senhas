    import React, { useState, useEffect } from "react";
    import { Text, View, StyleSheet, Pressable } from "react-native";
    import { Ionicons } from "@expo/vector-icons";
    import * as Clipboard from "expo-clipboard";
    import { useFocusEffect } from "@react-navigation/native";


    export function PasswordItem({ name, password, removePassword, editPassword, theme }) {
        const [invisible, setInvisible] = useState(false);

        async function handleCopyPassword() {
            if(invisible){
                return alert("Não foi possível copiar uma senha escondida")
            }
            await Clipboard.setStringAsync(password);
            alert("Senha copiada com sucesso");
        }

        useFocusEffect(
            React.useCallback(() => {
                setInvisible(true); 
            }, [])
        );


        return (
            <Pressable 
                onPress={handleCopyPassword} 
                onLongPress={removePassword} 
                style={[styles.container, { backgroundColor: theme.itemBackground }]}
            >
                <View style={[styles.textContainer]}>
                    <Text style={[styles.name, { color: theme.itemTextColor }]}>{name}</Text>
                    <Text style={[
                        styles.password, 
                        invisible ? styles.hiddenText : { color: theme.itemTextColor },
                    ]}>
                        {password}
                    </Text>
                    {invisible && (
                        <View style={[styles.strikethrough, { backgroundColor: theme.itemTextColor }]} />
                    )}
                </View>
                <View style={styles.buttons}>
                    <Pressable 
                        style={styles.button} 
                        onPress={() => setInvisible(!invisible)}
                    >
                        <Ionicons 
                            name={invisible ? "eye-off" : "eye"} 
                            size={24} 
                            color={theme.buttonColor} 
                        />
                    </Pressable>
                    <Pressable style={styles.button} onPress={editPassword}>
                        <Ionicons name="create" size={24} color={theme.buttonColor} />
                    </Pressable>
                </View>
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
            flex: 1,
            position: "relative",
        },
        password: {
            fontSize: 16,
            fontWeight: "bold",
        },
        hiddenText: {
            color: "transparent",
        },
        strikethrough: {
            position: "absolute",
            top: '60%',
            left: 0,
            right: 4,
            height: 10, 
            zIndex: 1,
            borderRadius: 8
        },
        name: {
            fontSize: 14
        },
        button: {
            marginLeft: 10,
        },
        buttons:{
            flexDirection: "row"
        }
    });
