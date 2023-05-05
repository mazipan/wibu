import { Stack } from '@mantine/core';
import { useState } from 'react';

import { PAGINATION } from '~/helpers/constants';
import PaginatedAnimeList from '~/components/PaginatedAnimeList';

export default function HomePage() {
  const [variables, setVariables] = useState([
    {
      page: PAGINATION.INITAL_PAGE,
      perPage: PAGINATION.SIZE,
    },
  ]);

  const handleNextPage = (page: number) => {
    setVariables([...variables, { page, perPage: PAGINATION.SIZE }]);
  };

  return (
    <Stack>
      {variables.map((vars, i) => (
        <PaginatedAnimeList
          key={vars.page}
          variables={vars}
          onLoadMore={handleNextPage}
          isLastPageInTheScreen={i === variables.length - 1}
        />
      ))}
    </Stack>
  );
}
