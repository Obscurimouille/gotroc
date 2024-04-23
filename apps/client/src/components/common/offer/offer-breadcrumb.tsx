import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@components/ui/breadcrumb";
import { Offer } from "@gotroc/types";
import { useTranslation } from "react-i18next";

const OfferBreadcrumb = ({ offer }: { offer: Offer }) => {
  const { t } = useTranslation();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="underline">
            {t('common.home')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={'/search?category=' + offer.subCategory!.mainCategoryName}
            className="underline"
          >
            {t(`category.${offer.subCategory!.mainCategoryName}.title`)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={'/search?subcategory=' + offer.subCategoryName}
            className="underline"
          >
            {t(
              `category.${offer.subCategory!.mainCategoryName}.subcategories.${offer.subCategoryName}`,
            )}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="font-semibold">{offer.title}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default OfferBreadcrumb;