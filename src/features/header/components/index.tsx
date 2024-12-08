import { CreateItemDialog } from '@/features/';
import { SearchBar } from './searchbar';

export const Header = () => {
  return (
    <header className="px-8 mb-4 flex justify-between">
      <SearchBar />
      <CreateItemDialog />
    </header>
  );
};
