import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { cn } from '@lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormInputParams = {
  form: UseFormReturn<any, any>;
  className?: string;
  disabled?: boolean;
};

export const IdentifierInput = (props: FormInputParams) => {
  const { t } = useTranslation();

  return (
    <FormField
      control={props.form.control}
      name="identifier"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>{t('input.identifier.title')}</FormLabel>
          <FormControl>
            <Input
              placeholder={t('input.identifier.placeholder')}
              {...field}
              disabled={props.disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const UsernameInput = (props: FormInputParams) => {
  const { t } = useTranslation();
  return (
    <FormField
      control={props.form.control}
      name="username"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>{t('input.username.title')}</FormLabel>
          <FormControl>
            <Input
              placeholder={t('input.username.placeholder')}
              {...field}
              disabled={props.disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const EmailInput = (props: FormInputParams) => {
  const { t } = useTranslation();
  return (
    <FormField
      control={props.form.control}
      name="email"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>{t('input.email.title')}</FormLabel>
          <FormControl>
            <Input
              placeholder={t('input.email.placeholder')}
              {...field}
              disabled={props.disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FirstnameInput = (props: FormInputParams) => {
  const { t } = useTranslation();
  return (
    <FormField
      control={props.form.control}
      name="firstname"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>{t('input.firstname.title')}</FormLabel>
          <FormControl>
            <Input
              placeholder={t('input.firstname.placeholder')}
              {...field}
              disabled={props.disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const LastnameInput = (props: FormInputParams) => {
  const { t } = useTranslation();
  return (
    <FormField
      control={props.form.control}
      name="lastname"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>{t('input.lastname.title')}</FormLabel>
          <FormControl>
            <Input
              placeholder={t('input.lastname.placeholder')}
              {...field}
              disabled={props.disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const PasswordInput = (props: FormInputParams & { showForgot?: boolean }) => {
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
              disabled={props.disabled}
            />
          </FormControl>
          <FormMessage />
          {!!props.showForgot && <a href="/reset-password" className="text-xs text-primary font-medium hover:underline">
            {t('input.password.forgot')}
          </a>}
        </FormItem>
      )}
    />
  );
};
