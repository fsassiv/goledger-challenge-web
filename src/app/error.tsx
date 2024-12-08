'use client'; // Error components must be Client Components

import ErrorIcon from '#/svg/error.svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center items-center container">
      <p className="text-uppercase text-gray-400 text-lg">
        Something went wrong
      </p>
      <p className="text-uppercase text-gray-400 mb-6 text-lg">
        We&apos;re sorry
      </p>
      <Image
        src={ErrorIcon}
        alt={error.message}
        width={100}
        height={100}
        className="mb-4 w-full md:w-1/2 lg:w-1/5 lg:mb-10"
      />
      <p className="text-uppercase text-gray-400 mb-5 lg:max-w-1/2">
        {error.message}
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
