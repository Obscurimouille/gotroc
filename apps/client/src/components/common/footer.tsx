import { cn } from '@lib/utils';
import { useTranslation } from 'react-i18next';
import { Separator } from '@components/ui/separator';
import { Link } from 'react-router-dom';

function Footer({ className, ...props }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <footer
      className={cn(className, 'w-full bg-gray-800 text-background flex justify-center px-4')}
    >
      <div className="w-full lg:w-[1050px] pt-8 pb-5 flex flex-col items-stretch gap-6">
        <div className="h-200 flex gap-8 mb-2">
          <div className="flex-1 flex flex-col gap-2">
            <h5 className="font-semibold uppercase">{t('component.footer.about.title')}</h5>
            <Separator />
            <ol className="mt-2 flex flex-col gap-2">
              <li>{t('component.footer.about.us')}</li>
              <li>{t('component.footer.about.career')}</li>
              <li>{t('component.footer.about.engagements')}</li>
            </ol>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h5 className="font-semibold uppercase">{t('component.footer.legal.title')}</h5>
            <Separator />
            <ol className="mt-2 flex flex-col gap-2">
              <li>{t('component.footer.legal.terms')}</li>
              <li>{t('component.footer.legal.sell-terms')}</li>
              <li>{t('component.footer.legal.user-ratings')}</li>
              <li>{t('component.footer.legal.privacy')}</li>
              <li>{t('component.footer.legal.accessibility')}</li>
            </ol>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h5 className="font-semibold uppercase">{t('component.footer.questions.title')}</h5>
            <Separator />
            <ol className="mt-2 flex flex-col gap-2">
              <li>{t('component.footer.questions.help')}</li>
              <li>
                <Link to="/contact">{t('component.footer.questions.contact')}</Link>
              </li>
              <li>{t('component.footer.questions.faqs')}</li>
            </ol>
          </div>
        </div>
        <Separator />
        <div>GoTroc 2024</div>
      </div>
    </footer>
  );
}

export default Footer;
