import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/providers/user-context';
import { z } from 'zod';
import { toast } from 'sonner';
import { AuthService } from 'src/services/auth-service';
import { IdentifierInput, PasswordInput } from '../inputs';

const LoginForm = () => {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const FormSchema = z.object({
    identifier: z
      .string()
      .trim()
      .min(1, {
        message: t('input.identifier.error.empty'),
      }),
    password: z.string().min(1, {
      message: t('input.password.error.empty'),
    }),
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    AuthService.login(data.identifier, data.password).then((result) => {
      setLoading(false);
      if (!result.success) {
        form.setValue('password', '');
        return toast.error(t('message.auth.wrong-credentials'));
      }
      userContext.user = result.data.user;
      navigate('/');
    });
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex-1 flex flex-col items-center gap-6 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow"
      >
        <IdentifierInput form={form} className="w-full" disabled={loading} />
        <PasswordInput form={form} className="w-full" disabled={loading} showForgot />
        <Button type="submit" size="lg" className="mt-3 w-full">
          {t('page.auth.login.submit')}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
