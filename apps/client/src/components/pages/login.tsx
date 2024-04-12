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
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { UserContext } from 'src/providers/user-context';
import { AuthService } from 'src/services/auth-service';
import { z } from 'zod';

const FormSchema = z.object({
  identifier: z.string().trim().min(1, {
    message: 'Veuillez renseigner un identifiant.',
  }),
  password: z
    .string()
    .min(1, {
      message: 'Veuillez renseigner votre mot de passe.',
    })
    .max(24, {
      message: '24 charactères maximum.',
    }),
});

function LoginPage() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    AuthService.login(data.identifier, data.password).then((result) => {
      if (!result.success) return toast.error("Nom d'utilisateur ou mot de passe incorrect.");
      userContext.user = result.data;
      navigate('/');
    });
  };

  return (
    <Page>
      <Header />
      <PageContent className="items-center py-24">
        <div>
          <h1>Connexion</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex-1 flex flex-col gap-7 lg:gap-10 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow"
            >
              <IdentifierInput form={form} />
              <PasswordInput form={form} />
              <Button type="submit" size="lg">
                Se connecter
              </Button>
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
  return (
    <FormField
      control={props.form.control}
      name="identifier"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>Nom d'utilisateur ou adresse mail</FormLabel>
          <FormControl>
            <Input placeholder="Nom d'utilisateur ou adresse mail..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordInput = (props: FormInputParams) => {
  return (
    <FormField
      control={props.form.control}
      name="password"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>Mot de passe</FormLabel>
          <FormControl>
            <Input {...field} type="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LoginPage;
