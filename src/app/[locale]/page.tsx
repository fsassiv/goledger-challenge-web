import { appAxios } from "@/config";
import { apiHandleRequest } from "@/utils";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, data] = await apiHandleRequest(
    appAxios.get("/query/getSchema"),
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quam
      eveniet cum earum dolore dolores iusto, vero, aperiam totam suscipit
      labore nobis debitis mollitia omnis. Quibusdam nisi a cupiditate
      voluptatem.
    </div>
  );
}
