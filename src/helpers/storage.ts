import localForage from "localforage";
import { Anime } from "~/types/Anime";

const STORAGE_KEYS = {
  BOOKMARK: "__b",
};

export async function getFromStorage<Type>(key: string): Promise<Type | null> {
  try {
    await localForage.getItem(key);
  } catch (error) {
    console.debug(`Failed to get storage ${key}`, error);
  }
  return null;
}

export async function getBookmark(): Promise<Anime[] | null> {
  return await getFromStorage<Anime[]>(STORAGE_KEYS.BOOKMARK);
}

export async function addToBookmark(anime: Anime): Promise<void> {
  const existing: Anime[] | null = await getBookmark();

  if (existing) {
    localForage.setItem(STORAGE_KEYS.BOOKMARK, [...existing, ...[anime]]);
  } else {
    localForage.setItem(STORAGE_KEYS.BOOKMARK, [anime]);
  }
}

export async function isExistInBookmark(animeId: number): Promise<boolean> {
  const existing: Anime[] | null = await getBookmark();

  if (existing) {
    const matchItem = (existing).find((item: Anime) => item.id === animeId);
    return !!matchItem
  }

  return false
}
