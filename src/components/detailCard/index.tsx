'use client';
import { API_ENDPOINTS, appAxios } from '@/config';
import { useDialogContext } from '@/context/dialogs';
import { SchemBaseTypes } from '@/types/schema';
import { apiHandleRequest, capitalize } from '@/utils';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export const DetailsCard: FC<{
  item: SchemBaseTypes;
}> = ({ item }) => {
  const { push } = useRouter();

  const { setUpdateDialogOpen } = useDialogContext();

  const {
    name,
    country,
    year,
    songs,
    private: isPrivate,
    '@assetType': assetType,
    '@key': assetKey,
  } = item;

  const handleDelete = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, data] = await apiHandleRequest(
      appAxios.delete(API_ENDPOINTS.DELETE_ASSET, {
        // @ts-expect-error non mapped prop
        key: {
          '@key': assetKey,
        },
      })
    );

    if (error) {
      return;
    }
    push('/');
  };

  return (
    <Card className="mb-4 w-full md:w-[40%] md:mr-[1%] bg-neutral-800 border-0 flex flex-col justify-between">
      <CardHeader className="p-3">
        <CardTitle className="text-neutral-400">
          {capitalize(assetType)}: {capitalize(name)}
        </CardTitle>
      </CardHeader>
      <div>
        <CardContent className="p-3">
          {country ? <p>Country: {country}</p> : null}
          {year ? <p>Year: {year}</p> : null}
          {songs ? <p>{songs.length} tracks</p> : null}
        </CardContent>
        <CardFooter className="flex p-3">
          <Button
            variant="outline"
            className=" text-red-500 px-3 text-xs border-0 mr-2"
            disabled={isPrivate}
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Button
            variant="outline"
            className="bg-orange-500 border-0 text-white"
            onClick={() => setUpdateDialogOpen(assetType)}
          >
            Edit
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
