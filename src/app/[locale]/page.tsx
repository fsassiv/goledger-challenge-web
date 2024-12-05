import { Button } from '@/components/ui/button';
import { API_ENDPOINTS, appAxios } from '@/config';
import { apiHandleRequest } from '@/utils';

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, response] = await apiHandleRequest(
    appAxios.get(API_ENDPOINTS.GET_SCHEMA)
  );

  // console.log(response?.data as Schema[]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-4">Blockchain Music Platform</h1>
        <p className="text-lg text-gray-600 mb-8">
          Registre artistas, músicas, álbuns e playlists de forma segura.
        </p>
        <Button className="mb-4" variant="default">
          Conectar Carteira (MetaMask)
        </Button>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Artistas</h3>
            <p>100+ registrados</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Álbuns</h3>
            <p>500+ disponíveis</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Playlists</h3>
            <p>200+ criadas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
