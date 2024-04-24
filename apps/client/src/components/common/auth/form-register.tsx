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
import { NewEmailSchema, NewPasswordSchema, NewUsernameSchema } from 'src/validators/schemas/user';
import { EmailInput, PasswordInput, UsernameInput } from '../inputs';

const RegisterForm = () => {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const FormSchema = z.object({
    username: NewUsernameSchema(t),
    email: NewEmailSchema(t, { notUsed: true }),
    password: NewPasswordSchema(t),
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    AuthService.register(data.username, data.email, data.password).then((result) => {
      setLoading(false);
      if (!result.success) {
        return toast.error(t('message.auth.invalid-registration'));
      }
      userContext.user = result.data.user;
      navigate('/?register=1');
    });
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex-1 flex flex-col items-center gap-6 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow"
      >
        <UsernameInput form={form} className="w-full" disabled={loading} />
        <EmailInput form={form} className="w-full" disabled={loading} />
        <PasswordInput form={form} className="w-full" disabled={loading} />
        <Button type="submit" size="lg" className="mt-3 w-full">
          {t('page.auth.register.submit')}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
