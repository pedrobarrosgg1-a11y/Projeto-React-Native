/**
 * Campo de texto estilizado para formulários.
 *
 * Encapsula TextInput com aparência padrão do app (fundo escuro, borda).
 * Todas as props nativas (placeholder, onChangeText, autoCapitalize…) passam via `...rest`.
 */

import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";
import { colors } from "@/styles/colors";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      placeholderTextColor={colors.gray[400]}
      {...rest}
    />
  );
}
