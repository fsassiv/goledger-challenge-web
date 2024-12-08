'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { API_ENDPOINTS, appAxios } from '@/config';
import { SearchReturnTypes } from '@/types/schema';
import { apiHandleRequest, capitalize, sortListByName } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormPropTypes, SongTypes } from '../../types';

const FormSchema = z.object({
  isPrivate: z.boolean(),
  name: z
    .string({
      required_error: 'Album Name.',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    }),
  songs: z.array(z.string()).optional(),
});

export const CreatePlaylistForm: FC<FormPropTypes> = ({
  handleSubmit,
  closeDialog,
}) => {
  const [songs, setSongs] = useState<SongTypes[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      isPrivate: false,
      songs: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { name, isPrivate, songs: selectedSongs } = data;

    const structuredData = {
      asset: [
        {
          '@assetType': 'playlist',
          name,
          private: isPrivate,
          songs: selectedSongs?.length
            ? selectedSongs.map((item) => ({
                '@assetType': 'song',
                '@key': item,
              }))
            : [],
        },
      ],
    };
    handleSubmit(structuredData);
  }

  useEffect(() => {
    (async () => {
      const [error, data] = await apiHandleRequest<SearchReturnTypes>(
        appAxios.post(API_ENDPOINTS.SEARCH, {
          query: {
            selector: {
              '@assetType': 'song',
            },
          },
        })
      );

      if (error) return;
      setSongs((sortListByName(data?.result) as SongTypes[]) || []);
    })();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter Playlist name"
                  className="bg-neutral-800 placeholder:text-neutral-400 border-0 outline-none focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4 border-0 outline-none focus-visible:ring-offset-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className=" bg-neutral-400 placeholder:text-neutral-400 border-0 outline-none focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormLabel className="font-normal text-white">Private?</FormLabel>
            </FormItem>
          )}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full text-neutral-400 bg-neutral-800 space-x-3 space-y-0 rounded-md p-2">
            Open Songs library
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-[40vh] overflow-auto bg-neutral-800 border-0">
            <DropdownMenuLabel className="text-neutral-400">
              Songs library
            </DropdownMenuLabel>
            <FormField
              control={form.control}
              name="songs"
              render={() => (
                <FormItem>
                  {songs.map((item) => (
                    <FormField
                      key={item['@key']}
                      control={form.control}
                      name="songs"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item['@key']}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item['@key'])}
                                className="bg-neutral-400"
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        // @ts-expect-error typecheck
                                        ...field.value,
                                        item['@key'],
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item['@key']
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-neutral-400">
                              {capitalize(item.name)}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-orange-500">
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
