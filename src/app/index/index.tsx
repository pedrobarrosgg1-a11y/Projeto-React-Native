// 1️⃣ Importar useState e useEffect do React
import { useState, useEffect, useCallback } from "react"
import { View, Image, TouchableOpacity, FlatList, Modal, Text, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router"

import { styles } from "../../screens/add/styles"
import { colors } from "@/styles/colors"

// 2️⃣ Importar o LinkStorage para buscar os links salvos
import { LinkStorage, LinkStorages } from "@/storage/link-storage"
import { categories, getCategoryLabel, linkMatchesSelectedCategory } from "@/utils/categories"

import { Link } from "@/components/link"
import { Option } from "@/components/option"
import { Categories } from "@/components/categories"

export default function Index() {
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState<LinkStorages>({} as LinkStorages)  
  const [links, setLinks] = useState<LinkStorages[]>([])
  const [category, setCategory] = useState(categories[0].name)

  // 3️⃣ Criar a função getLinks que busca os dados e loga no terminal
  async function getLinks() {
    try {
      const response = await LinkStorage.get()

      const filtered = response.filter((link) =>
        linkMatchesSelectedCategory(link.category, category),
      )

      setLinks(filtered)
    } catch (error){
      Alert.alert("Erro", "Não foi possível listar os links")
    }
  }

  function handleDetails(selected: LinkStorages) {
    setShowModal(true)
    setLink(selected)
  }

  async function linkRemove(){
    try {
      await LinkStorage.remove(link.id)
      getLinks()
      setShowModal(false)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir")
      console.log(error)
    }
  }

   function handleRemove() {
      Alert.alert("Excluir", "Deseja realmente excluir?", [
        {style: "cancel", text: "Não"},
        { text: "Sim", onPress: linkRemove}
      ]) 
  }
  
  useFocusEffect(useCallback(() => {
    getLinks()
  }, [category]))
  
  useEffect(() => {
    getLinks()
  }, [category])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require("@/assets/logo.png")} 
          style={styles.logo} 
        />
        <TouchableOpacity onPress={() => router.navigate("./add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Categories onChange={setCategory} selected={category} />

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

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{getCategoryLabel(link.category)}</Text>
              
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>
            <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant="secondary" onPress={handleRemove}/>
              <Option name="Abrir" icon="language" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}