import { cn } from '@lib/utils';
import { Button } from '@components/ui/button';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { ExitIcon, GlobeIcon, PersonIcon } from '@radix-ui/react-icons';
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
import { useTranslation } from 'react-i18next';
import { EnumDashboardSection } from '@components/pages/dashboard';
import i18next from 'i18next';

function Header({ className, ...props }: { className?: string }) {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const isAdmin = userContext.user?.isAdmin;

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

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <Button variant="outline" size="sm" className="hidden md:block">
              <Link to="/admin">{t('component.admin-button.title')}</Link>
            </Button>
          ) : (
            <Button variant="default" size="sm" className="hidden md:block">
              <Link to="/create">{t('component.create-offer-button.title')}</Link>
            </Button>
          )}
          {userContext.user ? (
            <AccountDropdown className="ml-4" />
          ) : (
            <>
              <Button variant="link" size="sm" className="ml-4" asChild>
                <Link to="/auth">{t('component.login-button.title')}</Link>
              </Button>
              <LanguageDropdown />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const AccountDropdown = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const navItems = Object.values(EnumDashboardSection);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn('w-8 h-8 cursor-pointer border-1 border-neutral-200', className)}>
          {!!userContext.user?.avatarUUID && (
            <AvatarImage
              src={UserService.getAvatarURL(userContext.user.avatarUUID)}
              className="object-cover"
            />
          )}
          <AvatarFallback className="bg-neutral-700">
            <PersonIcon color="white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {navItems.map((item, index) => (
            <DropdownMenuItem key={index} className="cursor-pointer p-0">
              <Link
                to={'/dashboard/' + item}
                className="flex-1 flex items-center gap-2 px-2 py-1.5"
              >
                {t('naviguation.account.' + item)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => userContext.logout()}>
          <div className="flex items-center gap-2">
            <ExitIcon />
            {t('naviguation.account.logout')}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LanguageDropdown = ({ className }: { className?: string }) => {
  const laguages = [
    {
      code: 'en-US',
      label: 'English',
    },
    {
      code: 'fr-FR',
      label: 'Français',
    },
  ];

  const setLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn('', className)}>
          <GlobeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {laguages.map((lang, index) => (
          <DropdownMenuItem key={index} className="cursor-pointer p-0">
            <button
              className="flex-1 flex items-center gap-2 px-2 py-1.5"
              onClick={() => setLanguage(lang.code)}
            >
              {lang.label}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
