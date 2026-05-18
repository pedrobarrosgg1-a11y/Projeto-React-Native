/**
 * Chip de uma categoria na lista horizontal.
 *
 * Quando `isSelected` é true, ícone e texto usam a cor de destaque (verde).
 * Usa Pressable (em vez de TouchableOpacity) para feedback nativo de toque.
 */

import { Text, Pressable, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

type Props = PressableProps & {
  name: string;
  isSelected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export function Category({ name, icon, isSelected, ...rest }: Props) {
  const color = isSelected ? colors.green[300] : colors.gray[400];

  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons name={icon} size={16} color={color} />
      <Text style={[styles.name, { color }]}>{name}</Text>
    </Pressable>
  );
}
