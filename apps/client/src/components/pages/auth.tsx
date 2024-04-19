import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import LoginForm from '@components/common/auth/form-login';
import RegisterForm from '@components/common/auth/form-register';
import { UserContext } from 'src/providers/user-context';

function LoginPage() {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const fromParam = (queryParams.get('from') || '').toLowerCase();
  const [fromParamToastState, setFromParamToastState] = useState(false);

  useEffect(() => {
    // Redirect the user to the home page if they are already connected
    if (userContext.user) {
      return navigate('/');
    }

    // Display a toast message if the user is redirected from the create-offer page
    if (fromParam === 'create-offer' && !fromParamToastState) {
      toast.error(t('message.must-be-connected-to-create-offer'));
      setFromParamToastState(true);
    } else if (fromParam === 'add-bookmark' && !fromParamToastState) {
      toast.error(t('message.must-be-connected-to-add-bookmark'));
      setFromParamToastState(true);
    }
  }, [userContext.user, fromParam, fromParamToastState, navigate, t]);

  return (
    <Page>
      <Header />
      <PageContent className="items-center py-24">
        <div className="flex flex-col items-center gap-8 w-[330px]">
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('page.auth.login.title')}</TabsTrigger>
              <TabsTrigger value="register">{t('page.auth.register.title')}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </PageContent>
    </Page>
  );
}

export default LoginPage;
