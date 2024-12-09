'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { API_ENDPOINTS, appAxios } from '@/config';
import { useDialogContext } from '@/context/dialogs';
import { toast } from '@/hooks/use-toast';
import { apiHandleRequest } from '@/utils';

import { UpdateAlbumForm, UpdateArtistForm } from './forms';

export const UpdateItemDialog = () => {
  const { isUpdateDialogOpen, target, targetKey, closeDialogs } =
    useDialogContext();

  const handleSubmit = async (payload: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, data] = await apiHandleRequest(
      appAxios.put(API_ENDPOINTS.UPDATE_ASSET, payload)
    );

    closeDialogs();

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

  return (
    <Dialog open={isUpdateDialogOpen}>
      <DialogContent className="w-full sm:max-w-[425px] bg-neutral-950 border-0">
        <DialogHeader>
          <DialogTitle className="text-neutral-600">Edit item</DialogTitle>
          <DialogDescription>
            Edit Album, Artist, Playlist or Song
          </DialogDescription>
        </DialogHeader>
        {target === 'album' ? (
          <UpdateAlbumForm
            handleSubmit={handleSubmit}
            closeDialog={closeDialogs}
            targetKey={targetKey}
          />
        ) : null}
        {target === 'artist' ? (
          <UpdateArtistForm
            handleSubmit={handleSubmit}
            closeDialog={closeDialogs}
            targetKey={targetKey}
          />
        ) : null}
        {/* {target === SelectTypeEnum.artist ? (
          <CreateArtistForm
            handleSubmit={handleSubmit}
            closeDialog={() => setOpen(false)}
          />
        ) : null}
        {target === SelectTypeEnum.playlist ? (
          <CreatePlaylistForm
            handleSubmit={handleSubmit}
            closeDialog={() => setOpen(false)}
          />
        ) : null}
        {target === SelectTypeEnum.song ? (
          <CreateSongForm
            handleSubmit={handleSubmit}
            closeDialog={() => setOpen(false)}
          />
        ) : null} */}
      </DialogContent>
    </Dialog>
  );
};
