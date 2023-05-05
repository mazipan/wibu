import { Stack } from '@mantine/core';
import { useState } from 'react';

import { PAGINATION } from '~/helpers/constants';
import PaginatedAnimeList from '~/components/PaginatedAnimeList';
import GenreFilter from '~/components/GenreFilter';

const DEFAULT_PAGINATION = {
  page: PAGINATION.INITAL_PAGE,
  perPage: PAGINATION.SIZE,
};

export default function HomePage() {
  const [genres, setGenres] = useState<string[] | null>(null);

  const [variables, setVariables] = useState([DEFAULT_PAGINATION]);

  const handleNextPage = (page = 2) => {
    const isPageAlreadyExist = variables.find((vars) => vars.page === page);
    if (!isPageAlreadyExist) {
      setVariables([...variables, { page, perPage: PAGINATION.SIZE }]);
    }
  };

  const handleGenreFilter = (newGenres: string[]) => {
    setVariables([DEFAULT_PAGINATION]);
    if (newGenres && newGenres.length > 0) {
      setGenres(newGenres);
    } else {
      setGenres(null);
    }
  };

  return (
    <Stack>
      <GenreFilter onSelected={handleGenreFilter} />
      {variables.map((vars, i) => (
        <PaginatedAnimeList
          key={`idx${i}-page${vars.page}`}
          variables={vars}
          onLoadMore={handleNextPage}
          isLastPageInTheScreen={i === variables.length - 1}
          genres={genres}
        />
      ))}
    </Stack>
  );
}
