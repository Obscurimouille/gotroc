import { EnumDashboardSection } from '@components/pages/dashboard';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { ExitIcon } from '@radix-ui/react-icons';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserContext } from 'src/providers/user-context';

const UserPagesSidebar = ({ activeSection }: { activeSection?: EnumDashboardSection }) => {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);

  const navItems = Object.values(EnumDashboardSection);

  return (
    <div className="w-[180px] lg:w-[240px] shrink-0 bg-background rounded-xl shadow flex flex-col gap-2 p-2">
      <div className="py-3 px-4 text-foreground rounded-md font-semibold">{t('page.dashboard.my-account')}</div>
      <div className="px-4">
        <Separator className="bg-neutral-300" />
      </div>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={'/dashboard/' + item}
          className={cn(
            'py-2 px-4 text-foreground hover:bg-neutral-200 rounded-md transition-colors',
            activeSection === item ? 'bg-neutral-100' : '',
          )}
        >
          {t('naviguation.account.' + item)}
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
        {t('naviguation.account.logout')}
      </button>
    </div>
  );
};

export default UserPagesSidebar;
