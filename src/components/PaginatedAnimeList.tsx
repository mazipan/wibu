import { useQuery } from 'urql';
import { Button, Loader, Stack } from '@mantine/core';

import type { Anime } from '~/types/Anime';
import ErrorBox from '~/components/ErrorBox';
import AnimeItem from '~/components/AnimeItem';
import GetPopularAnimePageable from '~/queries/PopularPageableQuery.graphql';
import { PAGINATION } from '~/helpers/constants';

interface PaginatedAnimeListProps {
  onLoadMore: (page: number) => void;
  variables: {
    page: number;
    perPage: number;
  };
  isLastPageInTheScreen: boolean;
}
export default function PaginatedAnimeList({
  onLoadMore,
  variables = {
    page: PAGINATION.INITAL_PAGE,
    perPage: PAGINATION.SIZE,
  },
  isLastPageInTheScreen,
}: PaginatedAnimeListProps) {
  const [{ data, fetching, error }] = useQuery({
    query: GetPopularAnimePageable,
    variables: variables,
  });

  const handleClickLoadMore = () => {
    onLoadMore(data.popular.pageInfo.currentPage + 1);
  };

  return (
    <Stack>
      {fetching ? (
        <Stack align='center' justify='center'>
          <Loader size='lg' />
        </Stack>
      ) : null}

      {!fetching && error ? <ErrorBox message={error?.message} /> : null}

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

      {isLastPageInTheScreen && data && data.popular && data.popular.pageInfo.hasNextPage && (
        <Button onClick={handleClickLoadMore}>Load more</Button>
      )}
    </Stack>
  );
}
