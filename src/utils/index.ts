import { SchemBaseTypes } from '@/types/schema';

export const apiHandleRequest = <T>(
  promise: Promise<{ data: T; resposne: { data: T } }>
): Promise<[undefined, T, any] | [Error]> =>
  promise
    .then(
      (response) => [undefined, response.data, response] as [undefined, T, any]
    )
    .catch((error) => [
      error instanceof Error ? error : new Error(String(error)),
    ]);

export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const AssetTypes = ['album', 'artist', 'playlist', 'song'];

export const sortListByName = (data: SchemBaseTypes[]) => {
  return data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
};
