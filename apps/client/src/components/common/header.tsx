import { cn } from '@lib/utils';
import { Button } from '@components/ui/button';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useContext } from 'react';
import { UserContext } from 'src/providers/user-context';
import { UserService } from 'src/services/user.service';

function Header({ className, ...props }: { className?: string }) {
  const userContext = useContext(UserContext);

  return (
    <header
      className={cn(
        className,
        'w-full border-b-1 border-foreground/25 bg-background flex justify-center px-4',
      )}
    >
      <div className="w-full lg:w-[1050px] py-3 flex justify-between items-center gap-6">
        <div className="flex-1 flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-foreground">
            GoTroc
          </Link>

          <SearchBar className="flex-1 lg:max-w-[400px]" />
        </div>

        <div className="flex items-center gap-6">
          <Button variant="default" size="sm" className="hidden md:block">
            <Link to="/create">Déposer une annonce</Link>
          </Button>
          {userContext.user ? (
            <AccountDropdown />
          ) : (
            <Button variant="link" size="sm" asChild>
              <Link to="/login">Se connecter</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

const AccountDropdown = () => {
  const userContext = useContext(UserContext);

  const items: { title: string; url: string }[] = [
    {
      title: 'Profil',
      url: '/dashboard/profile',
    },
    {
      title: 'Mes annonces',
      url: '/dashboard/offers',
    },
    {
      title: 'Favoris',
      url: '/dashboard/favourites',
    },
    {
      title: 'Paramètres',
      url: '/dashboard/settings',
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 cursor-pointer border-1 border-neutral-200">
          {!!userContext.user?.avatarUUID && (
            <AvatarImage src={UserService.getAvatarURL(userContext.user.avatarUUID)} />
          )}
          <AvatarFallback className="bg-neutral-700">
            <PersonIcon color="white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem key={index} className="cursor-pointer p-0">
              <Link to={item.url} className="flex-1 flex items-center gap-2 px-2 py-1.5">
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => userContext.logout()}>
          <div className="flex items-center gap-2">
            <ExitIcon />
            Déconnexion
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
