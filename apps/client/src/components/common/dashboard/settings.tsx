import { Separator } from '@components/ui/separator';

const DashboardSettings = ({ userId }: { userId: number }) => {

  return (
    <div className="flex-1 flex flex-col gap-6 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow">
      <div className="flex items-center gap-3">
        <Separator className="flex-1 bg-neutral-300 md:hidden" />
        <h3 className="font-medium md:text-md">Paramètres</h3>
        <Separator className="flex-1 bg-neutral-300" />
      </div>

      <div className="w-full mt-12 flex flex-col items-center">
        Aucun paramètres disponibles pour le moment
      </div>
    </div>
  );
};

export default DashboardSettings;
