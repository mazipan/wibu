import { Badge, Button, Group } from '@mantine/core';
import { IconBookmarkPlus, IconBookmarkMinus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useCallback, useEffect, useState } from 'react';

import { addToBookmark, isExistInBookmark, removeFromBookmark } from '~/helpers/storage';
import { Anime } from '~/types/Anime';

interface BookmarkButtonProps {
  anime: Anime;
  withBadge?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
}

export default function BookmarkButton({
  anime,
  withBadge,
  fullWidth,
  outline,
}: BookmarkButtonProps) {
  const [isExist, setIsExist] = useState<boolean>(false);

  const bookmarkChecker = useCallback(
    async function bookmarkChecker() {
      const found = await isExistInBookmark(anime.id);
      setIsExist(found);
    },
    [anime.id],
  );

  async function handleClickBookmark() {
    if (!isExist) {
      await addToBookmark(anime);
      notifications.show({
        autoClose: 3000,
        title: 'Anime Bookmarked!',
        message: `Anime ${anime.title.english} have been added to bookmark list.`,
      });
      setIsExist(true);
    } else {
      await removeFromBookmark(anime);
      notifications.show({
        autoClose: 3000,
        title: 'Bookmark Removed!',
        message: `Anime ${anime.title.english} have been remove from bookmark list.`,
      });
      setIsExist(false);
    }
  }

  useEffect(() => {
    if (anime.id) {
      bookmarkChecker();
    }
  }, [anime.id, bookmarkChecker]);

  return (
    <Group>
      {isExist && withBadge ? <Badge>Bookmarked</Badge> : null}
      <Button
        leftIcon={isExist ? <IconBookmarkMinus /> : <IconBookmarkPlus />}
        onClick={handleClickBookmark}
        color={isExist ? 'red' : 'blue'}
        variant={outline ? 'outline' : 'filled'}
        fullWidth={fullWidth}
      >
        {isExist ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
      </Button>
    </Group>
  );
}
