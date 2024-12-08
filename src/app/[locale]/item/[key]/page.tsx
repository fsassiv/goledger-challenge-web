import { Page } from '@/components/page';
import { API_ENDPOINTS, appAxios } from '@/config';
import { SearchReturnTypes } from '@/types/schema';
import { apiHandleRequest, capitalize } from '@/utils';
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

  if (error) throw new Error(error.message);

  const { '@assetType': assetType, name } = data?.result[0];

  // console.log(songs);
  return (
    <Page>
      <div className="container">
        {capitalize(assetType)} - {name}
      </div>
    </Page>
  );
}
