export enum SelectTypeEnum {
  'album',
  'artist',
  'playlist',
  'song',
}

export type ArtistTypes = {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
  name: string;
  country: string;
};

export type AlbumTypes = {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
  artist: {
    '@assetType': string;
    '@key': string;
  };
  name: string;
  year: string;
};

export type SongTypes = {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
  name: string;
  album: {
    '@assetType': string;
    '@key': string;
  };
};

export type FormPropTypes = {
  handleSubmit: (data: unknown) => void;
  closeDialog: () => void;
  targetKey: string;
};
