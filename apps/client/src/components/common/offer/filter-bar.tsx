import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@components/ui/navigation-menu';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { EnumCondition, EnumOfferSortBy, OfferFilters } from '@gotroc/types';
import { cn } from '@lib/utils';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  defaultFilters?: OfferFilters;
  onChange?: (filters: OfferFilters) => void;
  className?: string;
  getFilters?: (filters: OfferFilters) => void;
  enableCondition?: boolean;
  enableMileage?: boolean;
};

const SearchFilterBar = ({
  defaultFilters,
  onChange,
  getFilters,
  enableCondition,
  enableMileage,
}: Props) => {
  const [filters, setFilters] = useState<OfferFilters>(
    defaultFilters || {
      priceMin: undefined,
      priceMax: undefined,
      mileageMin: undefined,
      mileageMax: undefined,
      condition: [],
      sortBy: EnumOfferSortBy.DATE_DESC,
    },
  );

  useEffect(() => {
    if (getFilters) getFilters(filters);
  });

  useEffect(() => {
    if (onChange) onChange(filters);
  }, [filters, onChange]);

  return (
    <NavigationMenu delayDuration={0}>
      <NavigationMenuList className="gap-1.5">
        <PriceFilter
          haveModifications={!!filters.priceMin || filters.priceMax !== undefined}
          defaultValue={{
            min: filters.priceMin,
            max: filters.priceMax,
          }}
          onPriceMinChange={(value) => {
            setFilters((prev) => ({ ...prev, priceMin: value }));
          }}
          onPriceMaxChange={(value) => {
            setFilters((prev) => ({ ...prev, priceMax: value }));
          }}
        />
        {!!enableCondition && (
          <ConditionFilter
            haveModifications={filters.condition.length > 0}
            defaultValue={filters.condition}
            onChange={(value) => setFilters((prev) => ({ ...prev, condition: value }))}
          />
        )}
        {!!enableMileage && (
          <MileageFilter
            haveModifications={!!filters.mileageMin || filters.mileageMax !== undefined}
            defaultValue={{
              min: filters.mileageMin,
              max: filters.mileageMax,
            }}
            onMileageMinChange={(value) => {
              setFilters((prev) => ({ ...prev, mileageMin: value }));
            }}
            onMileageMaxChange={(value) => {
              setFilters((prev) => ({ ...prev, mileageMax: value }));
            }}
          />
        )}

        <SortFilter
          haveModifications={filters.sortBy !== EnumOfferSortBy.DATE_DESC}
          defaultValue={filters.sortBy}
          onChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const FilterItem = ({
  title,
  haveModifications,
  children,
}: {
  title: string;
  haveModifications?: boolean;
  children: ReactElement;
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn('border-1', haveModifications ? 'border-neutral-600' : 'border-neutral-300')}
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>{children}</NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const PriceFilter = ({
  className,
  defaultValue,
  onPriceMinChange,
  onPriceMaxChange,
  haveModifications,
}: {
  className?: string;
  defaultValue?: { min: number | undefined; max: number | undefined };
  onPriceMinChange?: (value: number | undefined) => void;
  onPriceMaxChange?: (value: number | undefined) => void;
  haveModifications?: boolean;
}) => {
  const { t } = useTranslation();
  const [priceMin, setPriceMin] = useState<number | undefined>(defaultValue?.min);
  const [priceMax, setPriceMax] = useState<number | undefined>(defaultValue?.max);
  const [error, setError] = useState<string | undefined>();

  const priceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = value !== '' ? parseInt(value) : undefined;
    setPriceMin(parsedValue);
    if (onPriceMinChange) onPriceMinChange(parsedValue);
  };

  const priceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = value !== '' ? parseInt(value) : undefined;
    setPriceMax(parsedValue);
    if (onPriceMaxChange) onPriceMaxChange(parsedValue);
  };

  useEffect(() => {
    if (priceMin === undefined || priceMax === undefined) return;
    if (priceMin > priceMax) setError('Minimum price must be less than maximum price');
    else setError(undefined);
  }, [priceMin, priceMax]);

  return (
    <FilterItem title={t('component.filters.price.title')} haveModifications={haveModifications}>
      <div className={cn('flex gap-4 items-stretch p-5 pt-4 md:w-[240px] lg:w-[320px]', className)}>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="priceMin">
            {t('component.filters.price.label-min', {
              unit: '€',
            })}
          </Label>
          <Input
            className={error ? 'border-destructive text-destructive' : ''}
            id="priceMin"
            type="number"
            placeholder={t('component.filters.price.placeholder-min')}
            value={priceMin === undefined ? '' : priceMin}
            min={0}
            onChange={priceMinChange}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="priceMax">
            {t('component.filters.price.label-max', {
              unit: '€',
            })}
          </Label>
          <Input
            className={error ? 'border-destructive text-destructive' : ''}
            id="priceMax"
            type="number"
            placeholder={t('component.filters.price.placeholder-max')}
            value={priceMax === undefined ? '' : priceMax}
            min={0}
            onChange={priceMaxChange}
          />
        </div>
      </div>
    </FilterItem>
  );
};

const ConditionFilter = ({
  className,
  defaultValue,
  onChange,
  haveModifications,
}: {
  className?: string;
  defaultValue?: EnumCondition[];
  onChange?: (value: EnumCondition[]) => void;
  haveModifications?: boolean;
}) => {
  const { t } = useTranslation();
  const [conditions, setConditions] = useState<EnumCondition[]>(defaultValue || []);

  const change = (value: EnumCondition, checked: boolean) => {
    const newConditions = [...conditions];
    checked ? newConditions.push(value) : newConditions.splice(newConditions.indexOf(value), 1);
    setConditions(newConditions);
    if (onChange) onChange(newConditions);
  };

  return (
    <FilterItem
      title={t('component.filters.condition.title')}
      haveModifications={haveModifications}
    >
      <div className={cn('flex gap-4 items-stretch p-5 pt-4 md:w-[200px] lg:w-[240px]', className)}>
        <div className="grid w-full max-w-sm items-center gap-2">
          {Object.values(EnumCondition).map((condition) => (
            <div className="flex items-center space-x-2" key={condition}>
              <Checkbox
                id={condition}
                checked={conditions.includes(condition)}
                onCheckedChange={(checked) => {
                  change(condition, !!checked);
                }}
              />
              <label
                htmlFor={condition}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t(`enum.condition.${condition.toLowerCase()}`)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </FilterItem>
  );
};

const MileageFilter = ({
  className,
  defaultValue,
  onMileageMinChange,
  onMileageMaxChange,
  haveModifications,
}: {
  className?: string;
  defaultValue?: { min: number | undefined; max: number | undefined };
  onMileageMinChange?: (value: number | undefined) => void;
  onMileageMaxChange?: (value: number | undefined) => void;
  haveModifications?: boolean;
}) => {
  const { t } = useTranslation();
  const [mileageMin, setMileageMin] = useState<number | undefined>(defaultValue?.min);
  const [mileageMax, setMileageMax] = useState<number | undefined>(defaultValue?.max);
  const [error, setError] = useState<string | undefined>();

  const mileageMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = value ? parseInt(value) : undefined;
    setMileageMin(parsedValue);
    if (onMileageMinChange) onMileageMinChange(parsedValue);
  };

  const mileageMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = value ? parseInt(value) : undefined;
    setMileageMax(parsedValue);
    if (onMileageMaxChange) onMileageMaxChange(parsedValue);
  };

  useEffect(() => {
    if (mileageMin === undefined || mileageMax === undefined) return;
    if (mileageMin > mileageMax) setError('Minimum mileage must be less than maximum mileage');
    else setError(undefined);
  }, [mileageMin, mileageMax]);

  return (
    <FilterItem title={t('component.filters.mileage.title')} haveModifications={haveModifications}>
      <div className={cn('flex gap-4 items-stretch p-5 pt-4 md:w-[240px] lg:w-[320px]', className)}>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="mileageMin">
            {t('component.filters.mileage.label-min', {
              unit: 'km',
            })}
          </Label>
          <Input
            className={error ? 'border-destructive text-destructive' : ''}
            id="mileageMin"
            type="number"
            placeholder={t('component.filters.mileage.placeholder-min')}
            value={mileageMin === undefined ? '' : mileageMin}
            min={0}
            onChange={mileageMinChange}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="mileageMax">
            {t('component.filters.mileage.label-max', {
              unit: 'km',
            })}
          </Label>
          <Input
            className={error ? 'border-destructive text-destructive' : ''}
            id="mileageMax"
            type="number"
            placeholder={t('component.filters.mileage.placeholder-max')}
            value={mileageMax === undefined ? '' : mileageMax}
            min={0}
            onChange={mileageMaxChange}
          />
        </div>
      </div>
    </FilterItem>
  );
};

const SortFilter = ({
  className,
  defaultValue,
  onChange,
  haveModifications,
}: {
  className?: string;
  defaultValue?: EnumOfferSortBy;
  onChange?: (value: EnumOfferSortBy) => void;
  haveModifications?: boolean;
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<EnumOfferSortBy>(defaultValue || EnumOfferSortBy.DATE_DESC);

  const change = (value: EnumOfferSortBy) => {
    setValue(value);
    if (onChange) onChange(value);
  };

  return (
    <FilterItem title={t('component.filters.sort-by.title')} haveModifications={haveModifications}>
      <div className={cn('flex gap-4 items-stretch p-5 pt-4 md:w-[200px] lg:w-[240px]', className)}>
        <RadioGroup defaultValue={value} onValueChange={change}>
          {Object.values(EnumOfferSortBy).map((sortBy) => (
            <div key={sortBy} className="flex items-center space-x-2">
              <RadioGroupItem value={sortBy} id={sortBy} />
              <Label htmlFor={sortBy}>{t('enum.offer-sort-by.' + sortBy)}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </FilterItem>
  );
};

export default SearchFilterBar;
