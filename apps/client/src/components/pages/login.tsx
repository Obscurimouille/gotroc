import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import LoginForm from '@components/common/auth/form-login';
import RegisterForm from '@components/common/auth/form-register';

function LoginPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromParam = (queryParams.get('from') || '').toLowerCase();
  const [fromParamToastState, setFromParamToastState] = useState(false);

  useEffect(() => {
    // Display a toast message if the user is redirected from the create-offer page
    if (fromParam === 'create-offer' && !fromParamToastState) {
      toast.error(t('message.must-be-connected-to-create-offer'));
      setFromParamToastState(true);
    } else if (fromParam === 'add-bookmark' && !fromParamToastState) {
      toast.error(t('message.must-be-connected-to-add-bookmark'));
      setFromParamToastState(true);
    }
  }, [fromParam, fromParamToastState, t]);

  return (
    <Page>
      <Header />
      <PageContent className="items-center py-24">
        <div className="flex flex-col items-center gap-8 w-[330px]">
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('page.authenticate.login.title')}</TabsTrigger>
              <TabsTrigger value="register">{t('page.authenticate.register.title')}</TabsTrigger>
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
