import { useQuery } from 'urql';
import { Stack } from '@mantine/core';

import type { Anime } from '~/types/Anime';
import PageLoader from '~/components/PageLoader';
import ErrorBox from '~/components/ErrorBox';
import AnimeItem from '~/components/AnimeItem';
import PopularPageableQuery from '~/queries/PopularPageableQuery';

export default function HomePage() {
  const [{ data, fetching, error }] = useQuery({
    query: PopularPageableQuery,
  });

  if (fetching) return <PageLoader />;
  if (error) return <ErrorBox message={error.message} />;

  console.debug('List::: ', data);

  return (
    <Stack>
      {data && data.popular && data.popular.media && data.popular.media.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: '25px 20px',
          }}
        >
          {data.popular.media.map((anime: Anime) => (
            <Stack
              key={anime.id}
              sx={() => ({
                width: '',
              })}
            >
              <AnimeItem anime={anime} />
            </Stack>
          ))}
        </div>
      ) : null}
    </Stack>
  );
}