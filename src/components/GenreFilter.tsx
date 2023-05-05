import { Chip, Group, Skeleton, Stack } from '@mantine/core';
import { useQuery } from 'urql';
import { useState } from 'react';

import ErrorBox from './ErrorBox';

import GetGenreCollection from '~/queries/GenreCollectionQuery.graphql';

interface GenreFilterProps {
  onSelected: (genres: string[]) => void;
}

interface DataGenreCollectionResponse {
  genres: string[];
}

export default function GenreFilter({ onSelected }: GenreFilterProps) {
  const [selectedGenres, setSelectedGenres] = useState<Record<string, number>>({});

  const [{ data, fetching, error }] = useQuery<DataGenreCollectionResponse>({
    query: GetGenreCollection,
  });

  const handleSelected = (genre: string) => {
    const newGenres = {
      ...selectedGenres,
      [genre]: selectedGenres[genre] ? 0 : 1,
    };
    const newKeys = Object.keys(newGenres).filter((key) => newGenres[key] !== 0);

    onSelected(newKeys);
    setSelectedGenres(newGenres);
  };

  return (
    <Stack>
      {fetching ? (
        <Group spacing='xs'>
          {(Array.from(Array(20).keys()) || []).map((i) => (
            <Chip size='md' color='blue' variant='outline' key={i}>
              <Skeleton height={8} width='50px' radius='xl' mt='sm' />
            </Chip>
          ))}
        </Group>
      ) : null}

      {!fetching && error ? <ErrorBox message={error?.message} /> : null}

      <Group spacing='xs'>
        {data &&
          data.genres &&
          data.genres.length > 0 &&
          data.genres.map((genre: string) => (
            <Chip
              size='md'
              color='blue'
              variant='outline'
              key={genre}
              checked={!!selectedGenres[genre]}
              onChange={() => {
                handleSelected(genre);
              }}
            >
              {genre}
            </Chip>
          ))}
      </Group>
    </Stack>
  );
}
