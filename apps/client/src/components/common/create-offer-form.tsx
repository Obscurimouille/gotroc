import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@components/ui/button';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@components/ui/command';
import { CaretSortIcon, CheckIcon, PlusIcon } from '@radix-ui/react-icons';
import { cn } from '@lib/utils';
import React, { useState } from 'react';
import { EnumCondition, MainCategory } from '@gotroc/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { OfferService } from 'src/services/offer-service';
import { CategoryService } from 'src/services/category-service';

const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];
const NB_IMAGES_MAX = 5;

const formSchema = z.object({
  title: z
    .string({
      required_error: 'Veuillez renseigner un titre',
    })
    .trim()
    .min(5, {
      message: 'Le titre doit contenir au moins 5 caractères',
    })
    .max(32, {
      message: 'Le titre ne peut pas dépasser 32 caractères',
    }),
  price: z.coerce
    .number({
      required_error: 'Veillez renseigner un prix',
    })
    .positive({
      message: 'Prix invalide',
    }),
  category: z
    .string({
      required_error: 'Veuillez choisir une catégorie',
    })
    .min(1, {
      message: 'Veuillez choisir une catégorie',
    }),
  condition: z.nativeEnum(EnumCondition, {
    required_error: 'Veillez renseigner un état',
    invalid_type_error: 'État invalide',
  }),
  description: z
    .string({
      required_error: 'Veuillez renseigner une description',
    })
    .min(10, {
      message: 'La description doit contenir au moins 10 caractères',
    })
    .max(1000, {
      message: 'La description ne peut pas dépasser 1000 caractères',
    }),
  images: z
    .array(z.any(), {
      required_error: 'Vous devez ajouter au moins une image',
    })
    .min(1, {
      message: 'Vous devez ajouter au moins une image',
    })
    .max(NB_IMAGES_MAX, {
      message: 'Vous ne pouvez pas ajouter plus de ' + NB_IMAGES_MAX + ' images',
    }),
});

const CreateOfferForm = () => {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = React.useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<(MainCategory & { subCategories: string[] })[]>([]);

  useState(() => {
    CategoryService.getAll().then((result) => {
      if (!result.success) return;
      setCategories(result.data!);
    });
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const addImages = (images: FileList) => {
    let nbSuccess = 0;
    for (let i = 0; i < images.length; i++) {
      nbSuccess += +addImage(images[i]);
    }
    if (images.length && nbSuccess === images.length) {
      if (images.length === 1) toast.success('1 fichier ajouté');
      else toast.success(images.length + ' fichiers ajoutés');
    }
  };

  const addImage = (image: File): boolean => {
    if (!image) return false;
    if (
      (image.type && !ACCEPTED_IMAGE_MIME_TYPES.includes(image.type)) ||
      !ACCEPTED_IMAGE_TYPES.includes(image.name.split('.').pop() as string)
    ) {
      toast.error('Type de fichier non supporté.');
      return false;
    }
    if (image.size >= MAX_FILE_SIZE) {
      toast.error('Fichier trop volumineux. Taille maximum : 2MB.');
      return false;
    }
    setImages((prev) => [...prev, image]);
    form.setValue('images', [...images, image]);
    return true;
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    form.setValue(
      'images',
      images.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.success('Annonce créée avec succès');
    const result = await OfferService.create({
      title: values.title,
      price: values.price,
      description: values.description,
      subCategoryName: values.category,
      images,
    });
    if (!result.success) {
      toast.error('Erreur lors de la création de l\'annonce, veuillez réessayer plus tard.');
      return;
    }
    toast.success('Annonce créée avec succès');
    navigate('/?offer_created=1');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-6 mb-20">
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1 bg-background p-6 px-8 rounded-xl pb-8 flex flex-col gap-2">
                <FormLabel className="text-lg">Titre de l'annonce</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={32} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="shrink-1 bg-background p-6 px-8 rounded-xl pb-8 flex flex-col gap-2">
                <FormLabel className="text-lg">Prix (€)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" className="max-w-32" step="any" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="grow-1 basis-3/5 bg-background p-6 px-8 rounded-xl pb-8 flex flex-col gap-2">
                <FormLabel>Catégorie</FormLabel>
                <Popover open={openCategory} onOpenChange={setOpenCategory}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        aria-expanded={openCategory}
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[360px] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value || 'Choisir une catégorie'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[360px] p-0">
                    <Command>
                      <CommandInput placeholder="Rechercher..." className="h-9" />
                      <CommandEmpty>Aucun résultat.</CommandEmpty>
                      <CommandList>
                        {categories.map((mainCategory, index) => (
                          <div key={index}>
                            <CommandGroup heading={mainCategory.name}>
                              {mainCategory.subCategories!.map((subCategoryName, subIndex) => (
                                <CommandItem
                                  value={subCategoryName}
                                  key={subIndex}
                                  onSelect={() => {
                                    form.setValue('category', subCategoryName);
                                    setOpenCategory(false);
                                  }}
                                  className={cn(
                                    subCategoryName === field.name ? 'font-semibold' : '',
                                  )}
                                  disabled={false}
                                >
                                  {subCategoryName}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      subCategoryName === field.value ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                            {
                              // Add a separator between each group
                              index < categories.length - 1 && <CommandSeparator />
                            }
                          </div>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem className="grow-1 basis-2/5 bg-background p-6 px-8 rounded-xl pb-8 flex flex-col gap-2">
                <FormLabel>État</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un état" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(EnumCondition).map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {OfferService.formatCondition(condition)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="bg-background p-6 px-8 rounded-xl pb-8 flex flex-col gap-2">
              <FormLabel className="">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre annonce..."
                  className="resize-none h-[200px]"
                  {...field}
                  maxLength={1000}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="bg-background p-6 px-8 rounded-xl pb-8 flex flex-col gap-2">
              <FormLabel className="">Images ({images.length + '/' + NB_IMAGES_MAX})</FormLabel>
              <FormControl className="">
                <div className="flex gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-32 h-32 object-cover shadow-md rounded-xl overflow-hidden"
                    >
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-0 left-0 w-full shadow-md h-[38%] bg-gradient-to-t from-black/60 to-black/0 text-destructive-foreground flex items-end pb-2 justify-center font-medium"
                        onClick={() => {
                          removeImage(index);
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                  {images.length < NB_IMAGES_MAX && (
                    <button type="button">
                      <input
                        multiple
                        type="file"
                        className="hidden"
                        id="fileInput"
                        accept={ACCEPTED_IMAGE_TYPES.map((ext) => '.' + ext).join(',')}
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          if (!e?.target?.files) return;
                          addImages(e?.target?.files);
                        }}
                        ref={field.ref}
                      />
                      <label
                        htmlFor="fileInput"
                        className="w-32 h-32 bg-neutral-100 cursor-pointer flex items-center justify-center shadow-md rounded-xl"
                      >
                        <PlusIcon className="h-8 w-8" />
                      </label>
                    </button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-end">
          <Button type="submit" size="lg">
            Valider
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateOfferForm;
