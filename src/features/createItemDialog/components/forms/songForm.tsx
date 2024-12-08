'use client';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { API_ENDPOINTS, appAxios } from '@/config';
import { SearchReturnTypes } from '@/types/schema';
import { apiHandleRequest, capitalize, sortListByName } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlbumTypes, FormPropTypes } from '../../types';

const FormSchema = z.object({
  album: z.string({
    required_error: 'Album Name.',
  }),
  name: z
    .string({
      required_error: 'Album Name.',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    }),
});
export const CreateSongForm: FC<FormPropTypes> = ({
  handleSubmit,
  closeDialog,
}) => {
  const [albums, setAlbums] = useState<AlbumTypes[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      album: '',
      name: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { name, album } = data;

    const structuredData = {
      asset: [
        {
          '@assetType': 'song',
          name,
          album: {
            '@assetType': 'album',
            '@key': album,
          },
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
              '@assetType': 'album',
            },
          },
        })
      );

      if (error) return;
      setAlbums((sortListByName(data?.result) as AlbumTypes[]) || []);
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
                  placeholder="Enter a name"
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
          name="album"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-800 border-0 text-neutral-400 outline-none focus-visible:ring-offset-0">
                    <SelectValue placeholder="Select the Album" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-neutral-800 border-0">
                  {albums.map((item) => (
                    <SelectItem key={item['@key']} value={item['@key']}>
                      {capitalize(item.name)} - year: {item.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
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
