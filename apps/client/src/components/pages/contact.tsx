import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import illustration from '@assets/illustrations/contact.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '@components/common/footer';

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Header />
      <PageContent className="items-center py-24">
        <img src={illustration} className="w-64 mb-8" alt=""></img>
        <p className="mt-4 text-2xl font-semibold">{t('page.contact.title')}</p>
        <ul className="mt-6 text-center space-y-1 ">
          <li>{t('page.contact.phone')} <span className='font-semibold'>09 12 34 56 78</span></li>
          <li>{t('page.contact.email')} <span className='font-semibold'>contact@gotroc.com</span></li>
        </ul>
      </PageContent>
      <Footer />
    </Page>
  );
};

export default ContactPage;
