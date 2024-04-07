import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import illustration from '@assets/illustration_page_not_found.svg';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Page>
      <Header />
      <PageContent className="items-center py-24">
        <img src={illustration} className="w-64 mb-8" alt=""></img>
        <p className="mt-4 text-xl font-semibold">Désolé, cette page n'existe pas</p>
        <p className="mt-2">
          Vérifiez l'URL ou retournez à la{' '}
          <Link to="/" className="underline hover:text-primary transition-colors">
            page d'accueil
          </Link>
        </p>
      </PageContent>
    </Page>
  );
};

export default NotFoundPage;
