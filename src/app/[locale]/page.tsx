import { Page } from '@/components/page';

export default async function Home() {
  return (
    <Page>
      <div className="relative flex justify-center w-full h-[300px] bg-[url('/images/bg-home.jpg')] bg-center bg-repeat bg-cover rounded-lg border border-white">
        <h3 className="absolute font-light text-white bottom-1 left-2 text-sm">
          by Flavio Andrade
        </h3>
      </div>
    </Page>
  );
}
