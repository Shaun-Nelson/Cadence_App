export type Track = {
  title: string;
  imageUrl: string;
  artist: string;
  duration: string;
  previewUrl: string;
  externalUrl: string;
  album: string;
  spotifyId: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  link: string;
  songs: Track[];
};

export type UserInfo = {
  token: string;
  results: [];
};

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
