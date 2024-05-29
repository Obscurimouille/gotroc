import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@components/ui/form';
import { Separator } from '@components/ui/separator';
import { User } from '@gotroc/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { BookmarkIcon, Pencil1Icon, PersonIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { UserService } from 'src/services/user.service';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { EmailInput, FirstnameInput, LastnameInput, UsernameInput } from '../inputs';
import {
  NewEmailSchema,
  NewFirstnameSchema,
  NewLastnameSchema,
  NewUsernameSchema,
} from 'src/validators/schemas/user';

const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png'];
const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB

const DashboardProfile = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>(
    user.avatarUUID ? UserService.getAvatarURL(user.avatarUUID) : '',
  );

  const FormSchema = z.object({
    username: NewUsernameSchema(t),
    firstname: NewFirstnameSchema(t).optional(),
    lastname: NewLastnameSchema(t).optional(),
    email: NewEmailSchema(t),
    avatar: z.any(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user.username,
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      email: user.email,
      avatar: null,
    },
  });

  const imageChanged = (imageFile: File): void => {
    if (!imageFile) return;
    if (
      (imageFile.type && !ACCEPTED_IMAGE_MIME_TYPES.includes(imageFile.type)) ||
      !ACCEPTED_IMAGE_TYPES.includes(imageFile.name.split('.').pop() as string)
    ) {
      toast.error('Type de fichier non supporté.');
      return;
    }
    if (imageFile.size >= MAX_FILE_SIZE) {
      toast.error('Fichier trop volumineux. Taille maximum : 2MB.');
      return;
    }
    setImageFile(imageFile);
    setImage(URL.createObjectURL(imageFile));
    form.setValue('avatar', imageFile);
  };

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);
    const { username, ...rest } = data;
    const result = await UserService.updateProfile(rest);
    setSubmitting(false);
    if (!result.success) {
      if (
        result.errors &&
        Array.isArray(result.errors) &&
        result.errors[0].rule === 'uniqueEmail'
      ) {
        toast.error('Cet email est déjà utilisé.');
        form.reset({
          username: user.username,
          firstname: user.firstname || '',
          lastname: user.lastname || '',
          email: user.email,
          avatar: null,
        });
        return;
      }
      toast.error('Erreur lors de la mise à jour du profil. Veuillez réessayer plus tard.');
      form.reset({
        username: user.username,
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email,
        avatar: null,
      });
      return;
    }
    // Mettre a jour les nouvelles infos
    const newInfos = result.data;
    form.reset({
      username: newInfos.username,
      firstname: newInfos.firstname || '',
      lastname: newInfos.lastname || '',
      email: newInfos.email,
      avatar: null,
    });

    toast.success('Profil mis à jour');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex-1 flex flex-col gap-7 lg:gap-10 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow"
      >
        <div className="flex flex-col gap-5 lg:gap-8">
          <div className="flex items-center gap-3">
            <Separator className="flex-1 bg-neutral-300 md:hidden" />
            <h3 className="font-medium md:text-md">
              {t('page.dashboard.profile.public-information')}
            </h3>
            <Separator className="flex-1 bg-neutral-300" />
          </div>
          <div className="flex flex-col gap-4 pt-2 items-center md:pt-0 md:flex-row md:gap-12 flex-wrap md:items-stretch justify-between">
            <AvatarInput form={form} image={image} onChanged={imageChanged} />
            <div className="w-full flex-1 flex flex-col justify-between gap-5">
              <UsernameInput form={form} className="w-full md:w-[300px]" disabled />
              <div className="flex items-center gap-x-0.5">
                <BookmarkIcon className="text-foreground/50" />
                <p className="ml-1 text-sm text-foreground/50">
                  {UserService.formatRegisterDate(user.registerDate, t)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 md:gap-4 lg:gap-6">
          <div className="flex items-center gap-3">
            <Separator className="flex-1 bg-neutral-300 md:hidden" />
            <h3 className="font-medium">{t('page.dashboard.profile.personal-information')}</h3>
            <Separator className="flex-1 bg-neutral-300" />
          </div>
          <div className="flex flex-1 flex-col gap-4 lg:gap-6">
            <div className="flex flex-col md:flex-row md:flex-wrap gap-x-10 gap-y-4">
              <LastnameInput form={form} className="md:w-[260px]" />
              <FirstnameInput form={form} className="md:w-[260px]" />
            </div>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-x-10 gap-y-4">
              <EmailInput form={form} className="md:w-[360px]" />
            </div>
            <div className="flex-1 flex gap-10 justify-between items-end">
              <p className="text-xs text-foreground/50 italic">
                {t('page.dashboard.profile.information-tip')}
              </p>
              <Button
                type="submit"
                className="self-end"
                disabled={!form.formState.isValid || submitting}
              >
                {submitting ? <ReloadIcon className="h-4 w-4 animate-spin" /> : t('common.save')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

type FormInputParams = {
  form: any;
  className?: string;
};

const AvatarInput = (
  props: FormInputParams & { image: string; onChanged?: (image: File) => void },
) => {
  const openInput = () => document.getElementById('fileInput')?.click();
  return (
    <FormField
      control={props.form.control}
      name="avatar"
      render={({ field }) => (
        <FormItem className={cn(props.className, 'flex items-center')}>
          <FormControl>
            <div className="relative">
              <Avatar
                className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 cursor-pointer border-1 border-neutral-200"
                onClick={openInput}
              >
                <AvatarImage src={props.image} className="object-cover" />
                <AvatarFallback className="bg-neutral-700">
                  <PersonIcon color="white" className="w-[60%] h-[60%]" />
                </AvatarFallback>
              </Avatar>

              <button
                onClick={openInput}
                type="button"
                className="absolute bottom-0 right-0 bg-neutral-100 hover:bg-neutral-200 shadow-md rounded-full p-2 cursor-pointer"
              >
                <Pencil1Icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </button>

              <input
                type="file"
                className="hidden"
                id="fileInput"
                accept={ACCEPTED_IMAGE_TYPES.map((ext) => '.' + ext).join(',')}
                onBlur={field.onBlur}
                name={field.name}
                onChange={(e) => {
                  const images = e.target.files;
                  if (!images || !images[0]) return;
                  if (props.onChanged) props.onChanged(images[0]);
                }}
                ref={field.ref}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardProfile;
