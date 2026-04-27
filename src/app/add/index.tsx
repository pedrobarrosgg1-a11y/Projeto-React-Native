import { useState } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

import { Categories } from "@/components/categories"
import { Input } from "@/components/input"
import { Button } from "@/components/button"

export default function Add() {
    const [category, setCategory] = useState("")
    const [ name, setName] = useState<string>()
    const [url, setUrl] =useState<string>()

    function handleAdd(){
        if(!category){
            return Alert.alert("Categoria", "Selecione a categoria")
        }

        if(!name?.trim( )){
            return Alert.alert("Nome", "Informe o Nome")
        }

        console.log({ category, name, url})
    }

    return (
        <View style={styles.container}>

            {/* 
              ✅ O header agora tem APENAS seta + "Novo"
              com flexDirection: "row" e justifyContent: "space-between"
              → seta fica na esquerda, "Novo" fica na direita
            */}
            <View style={styles.header}>

                {/* Botão de voltar com verificação de segurança */}
                <TouchableOpacity onPress={() => {
                    // Verifica se tem tela anterior antes de tentar voltar
                    if (router.canGoBack()) {
                        router.back()   // Volta para a tela anterior
                    } else {
                        router.replace("./") // Se não tiver histórico, vai pro início
                    }
                }}>
                    <MaterialIcons 
                        name="arrow-back" 
                        size={32} 
                        color={colors.gray[200]} 
                    />
                </TouchableOpacity>

                {/* "Novo" agora fica no lado direito do header */}
                <Text style={styles.title}>Novo</Text>
            </View>

            {/* 
              ✅ Label FORA do header
              Assim fica abaixo da linha com seta + "Novo"
            */}
            <Text style={styles.label}>Selecione uma Categoria</Text>
            <Categories onChange={setCategory} selected={category}/>

            <View style={styles.form}>
                <Input placeholder="Nome" onChangeText={setName} autoCorrect={false}/>
                <Input placeholder="URL" onChangeText={setUrl} autoCorrect={false}/>
                <Button title="Adicionar" onPress={handleAdd} />
            </View>
        </View>
    )
}