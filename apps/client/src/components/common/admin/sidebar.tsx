import { EnumAdminDashboardSection } from '@components/pages/admin';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ activeSection }: { activeSection?: EnumAdminDashboardSection }) => {
  const { t } = useTranslation();
  const navItems = Object.values(EnumAdminDashboardSection);

  return (
    <div className="w-[320px] shrink-0 bg-background shadow-lg flex flex-col gap-2 p-2">
      <div className="py-3 px-4 text-foreground rounded-md font-semibold">
        {t('page.admin-dashboard.title')}
      </div>
      <div className="px-4">
        <Separator className="bg-neutral-300" />
      </div>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={'/admin/' + item}
          className={cn(
            'py-2 px-4 text-foreground hover:bg-neutral-200 rounded-md transition-colors',
            activeSection === item ? 'bg-neutral-100' : '',
          )}
        >
          {t('naviguation.admin-dashboard.' + item)}
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
