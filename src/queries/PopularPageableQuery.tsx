import { gql } from 'urql';

const PopularPageableQuery = gql`
  query GetPopularAnimePageable {
    popular: Page(page: 1, perPage: 20) {
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
    description
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    averageScore
    popularity
  }
`;

export default PopularPageableQuery;
