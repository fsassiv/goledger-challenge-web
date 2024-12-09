type IdTypes = {
  '@assetType': string;
  '@key': string;
};

export type SchemBaseTypes = {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
  name: string;
  year?: string;
  artist?: IdTypes;
  country?: string;
  private?: boolean;
  songs?: IdTypes[];
  album?: IdTypes;
};

export type SearchReturnTypes = {
  metadata: any;
  result: SchemBaseTypes[];
};

export enum SelectTypeEnum {
  'album',
  'artist',
  'playlist',
  'song',
}
