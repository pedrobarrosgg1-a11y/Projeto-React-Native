/**
 * Estilos da tela de adicionar novo link.
 *
 * Reutilizado em `src/app/add/index.tsx`.
 * O prefixo `_` diferencia do styles da tela index (mesma pasta `screens/add`).
 */

import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", // seta à esquerda, título "Novo" à direita
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    color: colors.gray[200],
    fontSize: 24,
    fontWeight: "600",
  },
  label: {
    color: colors.gray[400],
    fontSize: 14,
    paddingHorizontal: 24,
  },
  form: {
    padding: 24,
    gap: 10, // espaçamento entre inputs e botão
  },
});
