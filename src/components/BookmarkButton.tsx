
import {
  Button,
} from '@mantine/core';
import { IconBookmark } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useEffect, useMemo, useState } from 'react';
import { addToBookmark, isExistInBookmark } from '~/helpers/storage';
import { Anime } from '~/types/Anime';

export default function BookmarkButton({ anime }: { anime: Anime }) {
  const [isExist, setIsExist] = useState<boolean>(false);

  const bookmarkChecker = useMemo(() => {
    return async function bookmarkChecker() {
      const found = await isExistInBookmark(anime.id);
      setIsExist(found);
    }
  }, [anime.id]);

  async function handleClickBookmark() {
    await addToBookmark(anime);
    notifications.show({
      autoClose: 3000,
      title: 'Success!',
      message: `Anime ${anime.title.english} have been added to bookmark list.`,
    })
  }

  useEffect(() => {
    if (anime.id) {
      bookmarkChecker();
    }
  }, [anime.id]);

  return (
    <Button leftIcon={<IconBookmark />} disabled={isExist} onClick={handleClickBookmark}>Bookmark</Button>
  )
}
