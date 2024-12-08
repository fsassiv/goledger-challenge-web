import { Page } from '@/components/page';
import { ResultCard } from '@/components/resultCard';
import { API_ENDPOINTS, appAxios } from '@/config';
import { SchemBaseTypes, SearchReturnTypes } from '@/types/schema';
import { apiHandleRequest } from '@/utils';
import { SearchPagePropTypes } from './types';
import { AssetTypes } from './utils';

export default async function SearchPage({ params }: SearchPagePropTypes) {
  const { slug } = params;

  const getSelector = () => {
    if (AssetTypes.includes(slug[0]))
      return {
        '@assetType': slug[0],
      };

    return {
      name: slug[0],
    };
  };

  const [error, data] = await apiHandleRequest<SearchReturnTypes>(
    appAxios.post(API_ENDPOINTS.SEARCH, {
      query: {
        selector: getSelector(),
      },
    })
  );

  if (error) throw new Error(error.message);

  const renderResultCards = () =>
    data?.result?.map((item: SchemBaseTypes) => (
      <ResultCard item={item} key={item['@key']} />
    ));

  return (
    <Page>
      <div className="flex flex-wrap w-full">{renderResultCards()}</div>
    </Page>
  );
}
