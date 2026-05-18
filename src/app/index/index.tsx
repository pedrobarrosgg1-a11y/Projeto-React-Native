/**
 * Tela inicial — lista de links salvos.
 *
 * Rota: `/` (arquivo `src/app/index/index.tsx` no Expo Router).
 *
 * Fluxo principal:
 * 1. Carrega links do AsyncStorage e filtra pela categoria selecionada.
 * 2. FlatList renderiza cada item com o componente Link.
 * 3. Toque em "⋯" abre modal com opções Abrir (navegador) e Excluir.
 * 4. Ícone "+" navega para a tela de adicionar link.
 */

import { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  Alert,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { styles } from "../../screens/add/styles";
import { colors } from "@/styles/colors";
import { LinkStorage, LinkStorages } from "@/storage/link-storage";
import {
  categories,
  getCategoryLabel,
  linkMatchesSelectedCategory,
} from "@/utils/categories";

import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { Categories } from "@/components/categories";

export default function Index() {
  // Controla visibilidade do modal de detalhes/ações
  const [showModal, setShowModal] = useState(false);
  // Link atualmente selecionado no modal (para abrir URL ou excluir)
  const [link, setLink] = useState<LinkStorages>({} as LinkStorages);
  // Lista filtrada exibida na FlatList
  const [links, setLinks] = useState<LinkStorages[]>([]);
  // Categoria ativa no filtro (padrão: primeira da lista — "Curso")
  const [category, setCategory] = useState(categories[0].name);

  /**
   * Busca links no storage e aplica filtro pela categoria selecionada.
   * Chamada ao montar, ao mudar categoria e ao voltar da tela "add".
   */
  async function getLinks() {
    try {
      const response = await LinkStorage.get();

      const filtered = response.filter((item) =>
        linkMatchesSelectedCategory(item.category, category),
      );

      setLinks(filtered);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar os links");
    }
  }

  /** Abre o modal preenchendo o estado com o link tocado */
  function handleDetails(selected: LinkStorages) {
    setShowModal(true);
    setLink(selected);
  }

  /** Remove o link do AsyncStorage e atualiza a lista */
  async function linkRemove() {
    try {
      await LinkStorage.remove(link.id);
      getLinks();
      setShowModal(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir");
      console.log(error);
    }
  }

  /** Confirmação nativa antes de excluir (evita toque acidental) */
  function handleRemove() {
    Alert.alert("Excluir", "Deseja realmente excluir?", [
      { style: "cancel", text: "Não" },
      { text: "Sim", onPress: linkRemove },
    ]);
  }

  /** Abre a URL no navegador/app padrão do sistema via API Linking */
  async function handleOpen() {
    try {
      await Linking.openURL(link.url);
      setShowModal(false);
    } catch (error) {
      Alert.alert("Link", "Não foi possível abrir o link");
      console.log(error);
    }
  }

  /**
   * useFocusEffect: executa quando a tela ganha foco (ex.: voltar de "add").
   * useCallback evita recriar a função a cada render e loops desnecessários.
   */
  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [category]),
  );

  // Recarrega também quando a categoria do filtro muda
  useEffect(() => {
    getLinks();
  }, [category]);

  return (
    <View style={styles.container}>
      {/* Cabeçalho: logo + botão para nova tela */}
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={() => router.navigate("./add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      {/* Filtro horizontal por categoria */}
      <Categories onChange={setCategory} selected={category} />

      {/* Lista virtualizada — performática com muitos itens */}
      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal transparente: fundo escurecido + painel inferior */}
      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>
                {getCategoryLabel(link.category)}
              </Text>

              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>

            <View style={styles.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove}
              />
              <Option name="Abrir" icon="language" onPress={handleOpen} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
