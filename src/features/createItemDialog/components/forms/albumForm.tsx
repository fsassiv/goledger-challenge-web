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
import { ArtistTypes, FormPropTypes } from '../../types';

const FormSchema = z.object({
  artist: z.string({
    required_error: 'Artist Name.',
  }),
  year: z
    .string({
      required_error: 'Album Year.',
    })
    .min(4, {
      message: 'Year must be 4 characters.',
    })
    .max(4, {
      message: 'Year must be 4 characters.',
    }),
  name: z
    .string({
      required_error: 'Album Name.',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    }),
});
export const CreateAlbumForm: FC<FormPropTypes> = ({
  handleSubmit,
  closeDialog,
}) => {
  const [artists, setArtists] = useState<ArtistTypes[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      artist: '',
      name: '',
      year: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { name, year, artist } = data;

    const structuredData = {
      asset: [
        {
          '@assetType': 'album',
          name,
          year,
          artist: {
            '@assetType': 'artist',
            '@key': artist,
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
              '@assetType': 'artist',
            },
          },
        })
      );

      if (error) return;
      setArtists((sortListByName(data?.result) as ArtistTypes[]) || []);
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
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter the year"
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
          name="artist"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-800 border-0 text-neutral-400 outline-none focus-visible:ring-offset-0">
                    <SelectValue placeholder="Select the Artist" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-neutral-800 border-0">
                  {artists.map((item) => (
                    <SelectItem key={item['@key']} value={item['@key']}>
                      {capitalize(item.name)} - {item.country}
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
