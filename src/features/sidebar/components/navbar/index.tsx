import { capitalize } from '@/utils';
import { Home } from 'lucide-react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../../../../components/ui/navigation-menu';
import { SEARCH_NAV_LIST } from './utils';

export const NavBar = () => {
  const navItemStyles =
    'transition ease-in-out text-white text-left w-32 hover:bg-gray-600 p-2 pl-4 mb-1 rounded-lg';

  return (
    <NavigationMenu className="w-full flex justify-start">
      <NavigationMenuList className="flex flex-col">
        <NavigationMenuItem className={navItemStyles}>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="flex">
              <Home />
              <span className="ml-4">Home</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {SEARCH_NAV_LIST.map((item) => (
          <NavigationMenuItem key={item.label} className={navItemStyles}>
            <Link href={`/search/${item.label}`} legacyBehavior passHref>
              <NavigationMenuLink className="flex">
                {<item.Icon />}
                <span className="ml-4">{capitalize(item.label)}</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
