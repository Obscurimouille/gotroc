import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
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

const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png'];
const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB

const FormSchema = z.object({
  username: z
    .string({
      required_error: "Veuillez renseigner un nom d'utilisateur.",
    })
    .min(5, {
      message: '5 charactères minimum.',
    })
    .max(20, {
      message: '20 charactères maximum.',
    }),
  firstname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  lastname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Adresse mail invalide.',
  }),
  avatar: z.any(),
});

const DashboardProfile = ({ user }: { user: User }) => {
  const [submitting, setSubmitting] = useState(false);
  const [, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>('');

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

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);
    setTimeout(() => {
      user.username = data.username;
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.email = data.email;
      setSubmitting(false);
      toast.success('Profil mis à jour');
    }, 2000);
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
            <h3 className="font-medium md:text-md">Informations publiques</h3>
            <Separator className="flex-1 bg-neutral-300" />
          </div>
          <div className="flex flex-col gap-4 pt-2 items-center md:pt-0 md:flex-row md:gap-12 flex-wrap md:items-stretch justify-between">
            <AvatarInput form={form} image={image} onChanged={imageChanged} />
            <div className="w-full flex-1 flex flex-col justify-between gap-5">
              <UsernameInput form={form} className="w-full md:w-[300px]" />
              <div className="flex items-center gap-x-0.5">
                <BookmarkIcon className="text-foreground/50" />
                <p className="ml-1 text-sm text-foreground/50">
                  {UserService.formatRegisterDate(user.registerDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 md:gap-4 lg:gap-6">
          <div className="flex items-center gap-3">
            <Separator className="flex-1 bg-neutral-300 md:hidden" />
            <h3 className="font-medium">Informations personnelles</h3>
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
                Les informations personnelles ne seront pas visibles par les autres utilisateurs
              </p>
              <Button
                type="submit"
                className="self-end"
                disabled={!form.formState.isValid || submitting}
              >
                {submitting ? <ReloadIcon className="h-4 w-4 animate-spin" /> : 'Enregistrer'}
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

const UsernameInput = (props: FormInputParams) => {
  return (
    <FormField
      control={props.form.control}
      name="username"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>Nom d'utilisateur</FormLabel>
          <FormControl>
            <Input placeholder="Nom d'utilisateur" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FirstnameInput = (props: FormInputParams) => {
  return (
    <FormField
      control={props.form.control}
      name="firstname"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>Prénom</FormLabel>
          <FormControl>
            <Input placeholder="Prénom" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const LastnameInput = (props: FormInputParams) => {
  return (
    <FormField
      control={props.form.control}
      name="lastname"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>Nom</FormLabel>
          <FormControl>
            <Input placeholder="Nom" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const EmailInput = (props: FormInputParams) => {
  return (
    <FormField
      control={props.form.control}
      name="email"
      render={({ field }) => (
        <FormItem className={cn(props.className, '')}>
          <FormLabel>Adresse mail</FormLabel>
          <FormControl>
            <Input placeholder="Exemple : dupont@mail.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardProfile;
