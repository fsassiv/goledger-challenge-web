'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { API_ENDPOINTS, appAxios } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { apiHandleRequest, AssetTypes, capitalize } from '@/utils';
import { useState } from 'react';
import { SelectTypeEnum } from '../types';
import {
  CreateAlbumForm,
  CreateArtistForm,
  CreatePlaylistForm,
  CreateSongForm,
} from './forms';

export const CreateItemDialog = () => {
  const { toast } = useToast();

  const [type, setType] = useState<SelectTypeEnum>(SelectTypeEnum.album);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (payload: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, data] = await apiHandleRequest(
      appAxios.post(API_ENDPOINTS.CREATE_ASSET, payload)
    );

    setOpen(false);

    // @ts-expect-error non mapped prop
    if (error?.code === 'ECONNABORTED') {
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Item created',
      });
      return;
    }

    if (error) {
      toast({
        variant: 'destructive',
        description: 'Uh oh! Something went wrong.',
      });
    }
  };

  const getTitle = () => {
    if (type === SelectTypeEnum.album) return 'Create Album';
    if (type === SelectTypeEnum.artist) return 'Create Artist';
    if (type === SelectTypeEnum.playlist) return 'Create Playlist';
    if (type === SelectTypeEnum.song) return 'Create Song';
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-0 bg-orange-500 text-white"
          onClick={() => setOpen(true)}
        >
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[425px] bg-neutral-950 border-0">
        <DialogHeader>
          <DialogTitle className="text-neutral-600">{getTitle()}</DialogTitle>
          <DialogDescription>
            Create a new Album, Artist, Playlist or Song
          </DialogDescription>
        </DialogHeader>
        <Select
          onValueChange={(data: string) =>
            setType(SelectTypeEnum[data as keyof typeof SelectTypeEnum])
          }
        >
          <SelectTrigger className="bg-neutral-800 border-0 text-neutral-400 outline-none focus-visible:ring-offset-0">
            <SelectValue placeholder="Select a verified type to display" />
          </SelectTrigger>

          <SelectContent className="bg-neutral-800 border-0">
            {AssetTypes.map((item) => (
              <SelectItem key={item} value={item}>
                {capitalize(item)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {type === SelectTypeEnum.album ? (
          <CreateAlbumForm
            handleSubmit={handleSubmit}
            closeDialog={() => setOpen(false)}
          />
        ) : null}
        {type === SelectTypeEnum.artist ? (
          <CreateArtistForm
            handleSubmit={handleSubmit}
            closeDialog={() => setOpen(false)}
          />
        ) : null}
        {type === SelectTypeEnum.playlist ? (
          <CreatePlaylistForm
            handleSubmit={handleSubmit}
            closeDialog={() => setOpen(false)}
          />
        ) : null}
        {type === SelectTypeEnum.song ? (
          <CreateSongForm
            handleSubmit={handleSubmit}
            closeDialog={() => setOpen(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
