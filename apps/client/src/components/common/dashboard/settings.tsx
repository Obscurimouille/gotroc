import { Separator } from '@components/ui/separator';
import { User } from '@gotroc/types';
import { useTranslation } from 'react-i18next';

const DashboardSettings = ({ user }: { user: User }) => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col gap-6 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow">
      <div className="flex items-center gap-3">
        <Separator className="flex-1 bg-neutral-300 md:hidden" />
        <h3 className="font-medium md:text-md">{t('page.dashboard.settings.title')}</h3>
        <Separator className="flex-1 bg-neutral-300" />
      </div>

      <div className="w-full mt-12 flex flex-col items-center">
      {t('page.dashboard.settings.empty')}
      </div>
    </div>
  );
};

export default DashboardSettings;
