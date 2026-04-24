import { View, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./styles"
import { colors } from "@/styles/colors"
import { router } from "expo-router"

export default function Add() {
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

        </View>
    )
}