import { EnumDashboardSection } from '@components/pages/dashboard';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { ExitIcon } from '@radix-ui/react-icons';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from 'src/providers/user-context';

const UserPagesSidebar = ({ activeSection }: { activeSection?: EnumDashboardSection }) => {
  const userContext = useContext(UserContext);

  const navItems: { title: string; value: EnumDashboardSection; url: string }[] = [
    {
      title: 'Profil',
      value: EnumDashboardSection.PROFILE,
      url: '/dashboard/profile',
    },
    {
      title: 'Mes annonces',
      value: EnumDashboardSection.OFFERS,
      url: '/dashboard/offers',
    },
    {
      title: 'Favoris',
      value: EnumDashboardSection.FAVOURITES,
      url: '/dashboard/favourites',
    },
    {
      title: 'Paramètres',
      value: EnumDashboardSection.SETTINGS,
      url: '/dashboard/settings',
    },
  ];

  return (
    <div className="w-[180px] lg:w-[240px] shrink-0 bg-background rounded-xl shadow flex flex-col gap-2 p-2">
      <div className="py-3 px-4 text-foreground rounded-md font-semibold">Mon compte</div>
      <div className="px-4">
        <Separator className="bg-neutral-300" />
      </div>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.url}
          className={cn(
            'py-2 px-4 text-foreground hover:bg-neutral-200 rounded-md transition-colors',
            activeSection === item.value ? 'bg-neutral-100' : '',
          )}
        >
          {item.title}
        </Link>
      ))}
      <div className="flex-1"></div>
      <div className="px-4">
        <Separator className="bg-neutral-300" />
      </div>
      <button
        onClick={() => userContext.logout()}
        className="py-2 px-4 flex items-center gap-2 text-foreground hover:bg-neutral-200 rounded-md transition-colors"
      >
        <ExitIcon />
        Déconnexion
      </button>
    </div>
  );
};

export default UserPagesSidebar;
