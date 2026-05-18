/**
 * Botão primário reutilizável (ex.: "Adicionar" na tela de novo link).
 *
 * Estende TouchableOpacityProps para aceitar onPress, disabled, etc.
 * sem precisar redeclarar cada prop do React Native.
 */

import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
  <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6} // feedback visual ao toque (opacidade)
      {...rest} // repassa onPress e demais props para o TouchableOpacity
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
