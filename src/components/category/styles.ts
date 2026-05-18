/**
 * Estilos do componente Category (chip individual).
 */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    // A cor do texto é aplicada inline no componente (depende de isSelected)
  },
});
