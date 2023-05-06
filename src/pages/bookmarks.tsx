import { Button, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import type { Anime } from '~/types/Anime';
import AnimeItem from '~/components/AnimeItem';
import BreadcrumbList from '~/components/BreadcrumbList';
import { getBookmarks } from '~/helpers/storage';

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState<Anime[]>([]);

  async function fetchBookmarks() {
    const foundInStorage: Anime[] | null = await getBookmarks();
    if (foundInStorage) {
      setBookmarks(foundInStorage);
    }
  }

  useEffect(() => {
    fetchBookmarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <BreadcrumbList
        items={[
          {
            title: 'My Bookmarks',
            href: `/bookmarks`,
          },
        ]}
      />
      {bookmarks && bookmarks.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: '25px 20px',
          }}
        >
          {bookmarks.map((anime: Anime) => (
            <Stack
              key={anime.id}
              sx={() => ({
                width: '',
              })}
            >
              <AnimeItem anime={anime} withBookmark />
            </Stack>
          ))}
        </div>
      ) : (
        <Stack align='center' mt='xl'>
          <Title>No animes have been bookmarked yet!</Title>
          <Text color='dimmed' size='xl' mb='lg' fw={700}>
            Let's browse the available Animes and bookmark it, so you can find it faster next time.
          </Text>
          <Button
            variant='outline'
            size='md'
            onClick={() => {
              window.location.assign('/');
            }}
          >
            Browse Animes
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
