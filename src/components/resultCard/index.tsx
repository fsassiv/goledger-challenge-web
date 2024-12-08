import { SchemBaseTypes } from '@/types/schema';
import { capitalize } from '@/utils';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export const ResultCard: FC<{ item: SchemBaseTypes }> = ({ item }) => {
  const { name, country, year, album, songs } = item;

  return (
    <Card className="mb-4 w-full md:w-[24%] md:mr-[1%] bg-neutral-600 border-0 flex flex-col justify-between">
      <CardHeader className="p-2">
        <CardTitle>{capitalize(name)}</CardTitle>
      </CardHeader>
      <div>
        <CardContent className="p-2">
          {country ? <p>Country: {country}</p> : null}
          {year ? <p>Year: {year}</p> : null}
          {songs ? <p>{songs.length} tracks</p> : null}
        </CardContent>
        <CardFooter className="flex justify-between p-2">
          <Link href={`/item/${item['@key']}`}>
            <Button
              variant="outline"
              className="bg-neutral-950 text-orange-500 px-3 text-xs rounded-xl border-0"
            >
              Details
            </Button>
          </Link>
          {album ? (
            <Link href={`/item/${item.album?.['@key']}`}>
              <Button variant="outline">Check Album</Button>
            </Link>
          ) : null}
        </CardFooter>
      </div>
    </Card>
  );
};
