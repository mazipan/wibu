import { gql, useQuery } from 'urql';
import { Stack, Grid, Flex } from '@mantine/core';
import PageLoader from '../components/PageLoader';
import ErrorBox from '../components/ErrorBox';
import AnimeItem from '../components/AnimeItem';

import type { Anime } from '../types/Anime';

const POPULAR_QUERY = gql`
query  {
  popular: Page(page: 1, perPage: 10) {
    media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
}

fragment media on Media {
  id
  title {
    userPreferred
    romaji
    english
    native
  }
  coverImage {
    extraLarge
    large
    color
    medium
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  bannerImage
  season
  seasonYear
  description
  type
  format
  status(version: 2)
  episodes
  duration
  chapters
  volumes
  genres
  isAdult
  averageScore
  popularity
  mediaListEntry {
    id
    status
  }
  nextAiringEpisode {
    airingAt
    timeUntilAiring
    episode
  }
  studios(isMain: true) {
    edges {
      isMain
      node {
        id
        name
      }
    }
  }
}

`;

export default function Homepage() {

  const [{ data, fetching, error }] = useQuery({
    query: POPULAR_QUERY,
  });

  if (fetching) return <PageLoader />;
  if (error) return <ErrorBox message={error.message} />;

  console.log(data);

  return (
    <Stack>
      {data && data.popular && data.popular.media && data.popular.media.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gridGap: "25px 20px",
        }}>
          {data.popular.media.map((anime: Anime) => (
            <Stack key={anime.id} sx={() => ({
              width: ""
            })}>
              <AnimeItem anime={anime} />
            </Stack>
          ))}
        </div>
      ) : null}
    </Stack>
  );
}
