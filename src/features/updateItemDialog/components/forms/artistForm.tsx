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
import { API_ENDPOINTS, appAxios } from '@/config';
import { SearchReturnTypes } from '@/types/schema';
import { apiHandleRequest } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArtistTypes, FormPropTypes } from '../../types';

const FormSchema = z.object({
  country: z
    .string({
      required_error: 'Country Name.',
    })
    .min(2, {
      message: 'Country must be at least 2 characters.',
    }),
  name: z
    .string({
      required_error: 'Album Name.',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    }),
});

export const UpdateArtistForm: FC<FormPropTypes> = ({
  handleSubmit,
  closeDialog,
  targetKey,
}) => {
  const [defaultArtistData, setDefaultArtistData] = useState<
    ArtistTypes | undefined
  >(undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      country: '',
    },
  });

  const { reset } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { name, country } = data;

    const structuredData = {
      update: {
        '@assetType': 'artist',
        '@key': targetKey,
        name,
        country,
      },
    };
    handleSubmit(structuredData);
  }

  const loadArtistData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, albumData] = await apiHandleRequest<SearchReturnTypes>(
      appAxios.post(API_ENDPOINTS.SEARCH, {
        query: {
          selector: {
            '@key': targetKey,
          },
        },
      })
    );

    setDefaultArtistData(albumData?.result[0] as ArtistTypes);
  };

  useEffect(() => {
    if (targetKey) {
      loadArtistData();
    }
  }, [targetKey]);

  useEffect(() => {
    if (defaultArtistData) {
      reset({
        name: defaultArtistData.name,
        country: defaultArtistData.country,
      });
    }
  }, [defaultArtistData]);

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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter the Country"
                  className="bg-neutral-800 placeholder:text-neutral-400 border-0 outline-none focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
