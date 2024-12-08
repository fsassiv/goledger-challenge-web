import { DetailsCard } from '@/components';
import { Page } from '@/components/page';
import { API_ENDPOINTS, appAxios } from '@/config';
import { SearchReturnTypes } from '@/types/schema';
import { apiHandleRequest } from '@/utils';
import { notFound } from 'next/navigation';
import { ItemPropTypes } from './types';

export default async function ItemPage({ params }: ItemPropTypes) {
  const { key } = params;

  const [error, data] = await apiHandleRequest<SearchReturnTypes>(
    appAxios.post(API_ENDPOINTS.SEARCH, {
      query: {
        selector: { '@key': key.replace('%3A', ':') },
      },
    })
  );

  if (error || !data.result.length) notFound();

  return (
    <Page>
      <div className="container">
        <DetailsCard item={data?.result[0]} />
      </div>
    </Page>
  );
}
