import { useQuery } from 'urql';
import { Loader, Stack } from '@mantine/core';
import { useCallback, useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import type { Anime } from '~/types/Anime';
import ErrorBox from '~/components/ErrorBox';
import AnimeItem from '~/components/AnimeItem';
import GetPopularAnimePageable from '~/queries/PopularPageableQuery.graphql';
import { PAGINATION } from '~/helpers/constants';
import { PageInfo } from '~/types/PageInfo';

interface PaginatedAnimeListProps {
  onLoadMore: (page: number) => void;
  variables: {
    page: number;
    perPage: number;
  };
  isLastPageInTheScreen: boolean;
  genres: string[] | null;
}

interface DataGetPopularResponse {
  popular: {
    pageInfo: PageInfo;
    media: Anime[];
  };
}

export default function PaginatedAnimeList({
  onLoadMore,
  variables = {
    page: PAGINATION.INITAL_PAGE,
    perPage: PAGINATION.SIZE,
  },
  isLastPageInTheScreen,
  genres = null,
}: PaginatedAnimeListProps) {
  const elRef = useRef<HTMLDivElement>(null);

  const [{ data, fetching, error }] = useQuery<DataGetPopularResponse>({
    query: GetPopularAnimePageable,
    variables: {
      ...variables,
      genres: genres && genres.length > 0 ? genres : null,
    },
  });

  // Read: https://usehooks-ts.com/react-hook/use-intersection-observer
  const entry = useIntersectionObserver(elRef, { freezeOnceVisible: true });

  const handleCallLoadMore = useCallback(() => {
    // Only allow refetching when the current request was done
    // Represented by fetching=false
    if (
      !fetching &&
      data &&
      data.popular &&
      data.popular.pageInfo &&
      data.popular.pageInfo.hasNextPage
    ) {
      onLoadMore((data?.popular?.pageInfo?.currentPage || 1) + 1);
    }
  }, [fetching, data, onLoadMore]);

  useEffect(() => {
    const isVisible = !!entry?.isIntersecting;
    if (isVisible) {
      handleCallLoadMore();
    }
  }, [entry, handleCallLoadMore]);

  return (
    <Stack>
      {fetching ? (
        <Stack align='center' justify='center'>
          <Loader size='lg' />
        </Stack>
      ) : null}

      {!fetching && error ? <ErrorBox message={error?.message} /> : null}

      <Stack mih={`${window.screen.height || 1000}px`}>
        {data && data.popular && data.popular.media && data.popular.media.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gridGap: '25px 20px',
            }}
          >
            {data.popular.media.map((anime: Anime) => (
              <Stack key={anime.id}>
                <AnimeItem anime={anime} />
              </Stack>
            ))}
          </div>
        ) : null}
      </Stack>

      {isLastPageInTheScreen && (
        <div
          ref={elRef}
          style={{
            width: '100%',
            height: '50px',
          }}
        />
      )}
    </Stack>
  );
}
