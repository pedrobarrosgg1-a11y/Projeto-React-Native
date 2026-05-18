/**
 * Tela de cadastro — adicionar novo link.
 *
 * Rota: `/add` (arquivo `src/app/add/index.tsx`).
 *
 * O usuário escolhe categoria, preenche nome e URL e persiste via LinkStorage.
 * Após sucesso, Alert confirma e `router.back()` retorna à lista.
 */

import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { styles } from "../../screens/add/_styles";
import { colors } from "@/styles/colors";
import { LinkStorage } from "@/storage/link-storage";

import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Add() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  /**
   * Valida campos, salva no AsyncStorage e volta para a tela anterior.
   * O `id` usa timestamp em string para ser único sem biblioteca extra.
   */
  async function handleAdd() {
    try {
      if (!category) {
        return Alert.alert("Categoria", "Selecione a categoria");
      }

      if (!name?.trim()) {
        return Alert.alert("Nome", "Informe o Nome");
      }

      if (!url?.trim()) {
        return Alert.alert("URL", "Informe a URL");
      }

      await LinkStorage.save({
        id: new Date().getTime().toString(),
        name,
        url,
        category,
      });

      Alert.alert("Sucesso", "Novo link adicionado", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o link");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Volta com segurança: se não houver histórico, vai para a home */}
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("./");
            }
          }}
        >
          <MaterialIcons
            name="arrow-back"
            size={32}
            color={colors.gray[200]}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>Selecione uma Categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input
          placeholder="Nome"
          onChangeText={setName}
          autoCorrect={false}
        />
        <Input
          placeholder="URL"
          onChangeText={setUrl}
          autoCorrect={false}
          autoCapitalize="none" // URLs não devem capitalizar automaticamente
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  );
}
