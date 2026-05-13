import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const LINKS_STORAGE_KEY = "Links-storage"

export type LinkStorages = {
    id: string
    name: string
    url: string
    category: string
}

async function get(): Promise<LinkStorages[]> {
    const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY)
    const response = storage ? JSON.parse(storage) : [ ]

    return response
}

async function save(newLink: LinkStorages) {
    try {
        const storage = await get()
        const updated = JSON.stringify([...storage, newLink])

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, updated)

    } catch (error) {
        throw error
    }
}

export const LinkStorage = { get, save }