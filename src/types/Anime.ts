export interface AnimeTitle {
  romaji: string;
  english: string;
  native: string;
}

export interface AnimeCoverImage {
  large: string;
  medium: string;
}

export interface Anime {
  id: number;
  bannerImage: string;
  description: string;
  genres: string[];
  title: AnimeTitle;
  coverImage: AnimeCoverImage;
  averageScore: number;
  episodes: number;
}
