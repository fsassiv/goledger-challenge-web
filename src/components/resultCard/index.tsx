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
    <Card className="mb-4 w-full md:w-[24%] md:mr-[1%]">
      <CardHeader>
        <CardTitle>{capitalize(name)}</CardTitle>
      </CardHeader>
      <CardContent>
        {country ? <p>Country: {country}</p> : null}
        {year ? <p>Year: {year}</p> : null}
        {songs ? <p>{songs.length} tracks</p> : null}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/item/${item['@key']}`}>
          <Button variant="outline">Details</Button>
        </Link>
        {album ? (
          <Link href={`/item/${item.album?.['@key']}`}>
            <Button variant="outline">Check Album</Button>
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
};
