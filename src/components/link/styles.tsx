/**
 * Estilos do componente Link (card de um item na FlatList).
 */

import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  details: {
    flex: 1, // ocupa o espaço restante; empurra o ícone para a direita
  },
  name: {
    color: colors.gray[100],
    fontSize: 16,
    fontWeight: "600",
  },
  url: {
    color: colors.gray[400],
    fontSize: 14,
  },
});
