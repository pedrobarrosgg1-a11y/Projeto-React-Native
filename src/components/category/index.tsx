import { Text, Pressable, PressableProps } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/styles/colors"
import { styles } from "./styles"

type Props = PressableProps & {
  name: string
  isSelected: boolean
  icon: keyof typeof MaterialIcons.glyphMap
}

export function Category({ name, icon, isSelected, ...rest }: Props) {
  // ✅ A cor muda dependendo se está selecionado ou não
  const color = isSelected ? colors.green[300] : colors.gray[400]

  return (
    <Pressable style={styles.container} {...rest}>
      {/* ✅ Agora o ícone usa a variável `color`, não mais hardcoded */}
      <MaterialIcons 
        name={icon}
        size={16} 
        color={color}  // 👈 aqui estava o erro!
      />
      <Text style={[styles.name, { color }]}>{name}</Text>
    </Pressable>
  )
}