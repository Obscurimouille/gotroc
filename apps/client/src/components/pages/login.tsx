import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { UserContext } from 'src/providers/user-context';
import { AuthService } from 'src/services/auth-service';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

function LoginPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromParam = (queryParams.get('from') || '').toLowerCase();
  const [fromParamToastState, setFromParamToastState] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const FormSchema = z.object({
    identifier: z.string().trim().min(1, {
      message: t('input.identifier.error.empty'),
    }),
    password: z
      .string()
      .min(1, {
        message: t('input.password.error.empty'),
      })
  });

  useEffect(() => {
    // Display a toast message if the user is redirected from the create-offer page
    if (fromParam === 'create-offer' && !fromParamToastState) {
      toast.error(t('message.must-be-connected-to-create-offer'));
      setFromParamToastState(true);
    }
  }, [fromParam, fromParamToastState, t]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    AuthService.login(data.identifier, data.password).then((result) => {
      setLoading(false);
      if (!result.success) return toast.error(t('message.wrong-credentials'));
      userContext.user = result.data;
      navigate('/');
    });
  };

  return (
    <Page loading={loading}>
      <Header />
      <PageContent className="items-center py-24">
        <div className="flex flex-col items-center gap-8 w-[330px]">
          <h1 className="text-3xl font-semibold">{t('page.login.title')}</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex-1 flex flex-col items-center gap-6 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow"
            >
              <IdentifierInput form={form} className="w-full" />
              <PasswordInput form={form} className="w-full" />
              <div className="flex flex-col w-full gap-4">
                <Button type="submit" size="lg" className="mt-3 w-full">
                  {t('page.login.submit')}
                </Button>
                <small className="text-sm">
                  {t('page.login.new-user') + ' '}
                  <a href="/register" className="text-primary font-semibold hover:underline">
                    {t('page.login.new-account')}
                  </a>
                </small>
              </div>
            </form>
          </Form>
        </div>
      </PageContent>
    </Page>
  );
}

type FormInputParams = {
  form: any;
  className?: string;
};

const IdentifierInput = (props: FormInputParams) => {
  const { t } = useTranslation();

  return (
    <FormField
      control={props.form.control}
      name="identifier"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>{t('input.identifier.title')}</FormLabel>
          <FormControl>
            <Input placeholder={t('input.identifier.placeholder')} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordInput = (props: FormInputParams) => {
  const { t } = useTranslation();
  return (
    <FormField
      control={props.form.control}
      name="password"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>{t('input.password.title')}</FormLabel>
          <FormControl>
            <Input
              placeholder={t('input.password.placeholder')}
              {...field}
              type="password"
            />
          </FormControl>
          <FormMessage />
          <a href="/reset-password" className="text-xs text-primary font-medium hover:underline">
            {t('page.login.forgot-password')}
          </a>
        </FormItem>
      )}
    />
  );
};

export default LoginPage;
