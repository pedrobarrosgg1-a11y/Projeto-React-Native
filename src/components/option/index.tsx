/**
 * Botão de ação compacto (ícone + texto), usado no rodapé do modal.
 *
 * Variante `primary`: destaque verde (ex. "Abrir").
 * Variante `secondary`: tom neutro (ex. "Excluir").
 */

import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "@/styles/colors";

type Props = TouchableOpacityProps & {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  variant?: "primary" | "secondary";
};

export function Option({
  name,
  icon,
  variant = "primary",
  ...rest
}: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <MaterialIcons
        name={icon}
        size={20}
        color={
          variant === "primary" ? colors.green[300] : colors.gray[400]
        }
      />

      <Text
        style={
          variant === "primary" ? styles.primaryTitle : styles.secondaryTitle
        }
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
