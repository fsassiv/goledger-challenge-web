import { API_ENDPOINTS, appAxios } from '@/config';
import { apiHandleRequest } from '@/utils';

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, response] = await apiHandleRequest(
    appAxios.get(API_ENDPOINTS.GET_SCHEMA)
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Loading...
    </div>
  );
}
