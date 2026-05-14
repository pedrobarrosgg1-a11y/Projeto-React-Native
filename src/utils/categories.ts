import { MaterialIcons } from "@expo/vector-icons"

type Category = {
    id: string
    name: string
    icon: keyof typeof MaterialIcons.glyphMap
}


export const categories: Category[] = [
    { id: "1", name: "Curso", icon: "code"},
    { id: "2", name: "Projeto", icon: "folder"},
    { id: "3", name: "Site", icon: "language"},
    { id: "4", name: "Artigo", icon: "newspaper"},
    { id: "5", name: "Video", icon: "movie"},
    { id: "6", name: "Documentação", icon: "content-paste"},
]

/** Label for UI: accepts legacy storage by id or current storage by name */
export function getCategoryLabel(stored: string): string {
    const byId = categories.find((c) => c.id === stored)
    if (byId) return byId.name
    const byName = categories.find((c) => c.name === stored)
    if (byName) return byName.name
    return stored
}

/** Tab uses category name; links may still store legacy numeric id */
export function linkMatchesSelectedCategory(
    linkCategory: string,
    selectedName: string,
): boolean {
    if (linkCategory === selectedName) return true
    const selected = categories.find((c) => c.name === selectedName)
    return selected != null && linkCategory === selected.id
}