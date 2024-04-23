import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/carousel';
import { SubCategory } from '@gotroc/types';
import { cn } from '@lib/utils';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryService } from 'src/services/category-service';

type Props = {
  title: string;
  categories: SubCategory[];
  className?: string;
};

const CategoryCarousel = ({ title, categories, className }: Props) => {
  return (
    <div className={cn('w-full flex flex-col gap-4', className)}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <Carousel
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: 'auto',
        }}
      >
        <CarouselContent className="">
          {categories.map((subCategory, index) => (
            <CarouselItem
              key={index}
              className="basis-[80%] xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <CategoryCard subCategory={subCategory} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 shadow-lg" />
        <CarouselNext className="right-2 shadow-lg" />
      </Carousel>
    </div>
  );
};

const CategoryCard = ({ subCategory }: { subCategory: SubCategory }) => {
  const { t } = useTranslation();

  return (
    <Link to={'/search?subcategory=' + subCategory.name} >
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={CategoryService.getIllustrationUrl(subCategory.illustrationUUID!)}
          alt=""
          className="w-full h-28 bg-neutral-200 object-cover"
        />
        <div className="absolute bottom-0 w-full h-2/5 flex justify-center items-end bg-gradient-to-t from-neutral-900 to-neutral-900/0">
          <p className="text-mx font-semibold text-background pb-1.5 px-3 truncate">
            {t(`category.${subCategory.mainCategoryName}.subcategories.${subCategory.name}`)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCarousel;
