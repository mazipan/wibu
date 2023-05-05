import localForage from 'localforage';

import { STORAGE_DB, STORAGE_KEYS } from './constants';

import { Anime } from '~/types/Anime';

localForage.config({
  driver: localForage.INDEXEDDB,
  name: STORAGE_DB.MAIN_DB,
  version: 1.0,
});

export async function getFromStorage<Type>(key: string): Promise<Type | null> {
  try {
    const result = await localForage.getItem<Type>(key);
    return result;
  } catch (error) {
    console.debug(`Failed to get storage ${key}`, error);
  }
  return null;
}

export async function getBookmarks(): Promise<Anime[] | null> {
  return await getFromStorage<Anime[]>(STORAGE_KEYS.BOOKMARK);
}

export async function addToBookmark(anime: Anime): Promise<void> {
  const existing: Anime[] | null = await getBookmarks();

  if (existing) {
    await localForage.setItem(STORAGE_KEYS.BOOKMARK, [...existing, ...[anime]]);
  } else {
    await localForage.setItem(STORAGE_KEYS.BOOKMARK, [anime]);
  }
}

export async function removeFromBookmark(anime: Anime): Promise<void> {
  const existing: Anime[] | null = await getBookmarks();

  if (existing) {
    await localForage.setItem(
      STORAGE_KEYS.BOOKMARK,
      (existing || []).filter((item) => item.id !== anime.id),
    );
  }
}

export async function isExistInBookmark(animeId: number): Promise<boolean> {
  const existing: Anime[] | null = await getBookmarks();

  if (existing) {
    const matchItem = existing.find((item: Anime) => item.id === animeId);
    return Boolean(matchItem);
  }

  return false;
}
