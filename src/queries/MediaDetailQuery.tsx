import { gql } from 'urql';

const MediaDetailQuery = gql`
  query GetMediaDetail($id: Int) {
    media: Media(id: $id, type: ANIME) {
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
  }
`;

export default MediaDetailQuery;
