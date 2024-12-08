'use client';
import NotFoundIcon from '#/svg/not-found.svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { replace, back } = useRouter();

  return (
    <div className="flex justify-center pt-10">
      <div className="flex flex-col justify-evenly lg:justify-center items-center container">
        <h2 className="text-orange-500 text-center text-[30px] lg:text-[40px] font-bold mb-4">
          Not found
        </h2>

        <Image
          src={NotFoundIcon}
          alt="test"
          width={200}
          height={200}
          className="mb-4 w-full md:w-1/2 lg:w-2/5 lg:mb-8"
        />

        <div className="flex flex-col w-full md:w-[20%] justify-between">
          <Button
            variant="outline"
            className="max-lg:w-full mb-4 flex-1"
            onClick={() => replace('/')}
          >
            Home
          </Button>

          <Button
            variant="default"
            className="max-lg:w-full flex-1"
            onClick={() => back()}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
