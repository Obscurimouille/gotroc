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
import { useTranslation } from 'react-i18next';
import {
  NewOfferDescriptionSchema,
  NewOfferPriceSchema,
  NewOfferTitleSchema,
  OfferCategorySchema,
  OfferConditionSchema,
} from 'src/validators/schemas/offer';

const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];
const NB_IMAGES_MAX = 5;

const CreateOfferForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = React.useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<(MainCategory & { subCategories: string[] })[]>([]);

  const formSchema = z.object({
    title: NewOfferTitleSchema(t),
    price: NewOfferPriceSchema(t),
    category: OfferCategorySchema(t),
    condition: OfferConditionSchema(t),
    description: NewOfferDescriptionSchema(t),
    images: z
      .array(z.any())
      .min(1, {
        message: t('input.offer.images.error.empty'),
      })
      .max(NB_IMAGES_MAX, {
        message: t('input.offer.images.error.too-many', {
          max: NB_IMAGES_MAX,
        }),
      }),
  });

  useState(() => {
    CategoryService.getAll().then((result) => {
      if (!result.success) return;
      setCategories(result.data!);
    });
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      condition: undefined,
      price: undefined,
      images: [],
    },
  });

  const addImages = (imageList: FileList) => {
    let nbSuccess = 0;
    const nbToConcider = Math.min(imageList.length, 5 - images.length);
    if (nbToConcider !== imageList.length) {
      toast.error(
        t('message.file.too-many', {
          max: NB_IMAGES_MAX,
        }),
      );
    }
    for (let i = 0; i < nbToConcider; i++) {
      nbSuccess += +addImage(imageList[i]);
    }
    if (nbToConcider && nbSuccess === imageList.length) {
      if (nbToConcider === 1) toast.success(t('message.file.added-single'));
      else
        toast.success(
          t('message.file.added-single', {
            count: nbToConcider,
          }),
        );
    }
  };

  const addImage = (image: File): boolean => {
    if (!image) return false;
    if (
      (image.type && !ACCEPTED_IMAGE_MIME_TYPES.includes(image.type)) ||
      !ACCEPTED_IMAGE_TYPES.includes(image.name.split('.').pop() as string)
    ) {
      toast.error(t('message.file.invalid-type'));
      return false;
    }
    if (image.size >= MAX_FILE_SIZE) {
      toast.error(
        t('message.file.too-heavy', {
          maxSize: '2MB',
        }),
      );
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

  const getMainCategory = (subCategoryName: string) => {
    return categories.find((mainCategory) => mainCategory.subCategories.includes(subCategoryName));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await OfferService.create({
      title: values.title,
      price: values.price,
      description: values.description,
      subCategoryName: values.category,
      images,
    });
    if (!result.success) {
      toast.error(t('message.offer-created.error'));
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
                <FormLabel className="text-lg">{t('input.offer.title.title')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={32}
                    placeholder={t('input.offer.title.placeholder')}
                  />
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
                <FormLabel className="text-lg">{t('input.offer.price.title')}</FormLabel>
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
                <FormLabel>{t('input.offer.category.title')}</FormLabel>
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
                        {field.value
                          ? t(
                              `category.${getMainCategory(field.value)!.name}.subcategories.${field.value}`,
                            )
                          : t('input.offer.category.placeholder')}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[360px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={t('input.offer.category.search')}
                        className="h-9"
                      />
                      <CommandEmpty>{t('input.offer.category.search-empty')}</CommandEmpty>
                      <CommandList>
                        {categories.map((mainCategory, index) => (
                          <div key={index}>
                            <CommandGroup heading={t(`category.${mainCategory.name}.title`)}>
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
                                  {t(
                                    `category.${mainCategory.name}.subcategories.${subCategoryName}`,
                                  )}
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
                <FormLabel>{t('input.offer.condition.title')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t(`input.offer.condition.placeholder`)} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(EnumCondition).map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {t(`condition.${condition.toLowerCase()}`)}
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
              <FormLabel className="">{t('input.offer.description.title')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('input.offer.description.placeholder')}
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
              <FormLabel className="">
                {t('input.offer.images.title', {
                  count: images.length,
                  maxCount: NB_IMAGES_MAX,
                })}
              </FormLabel>
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
                        {t('input.offer.images.remove')}
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
            {t('common.create')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateOfferForm;
