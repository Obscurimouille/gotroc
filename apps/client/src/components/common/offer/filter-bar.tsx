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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  defaultFilters?: OfferFilters;
  onChange?: (filters: OfferFilters) => void;
  className?: string;
  getFilters?: (filters: OfferFilters) => void;
};

const SearchFilterBar = ({ defaultFilters, onChange, getFilters, className }: Props) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<OfferFilters>(
    defaultFilters || {
      priceMin: undefined,
      priceMax: undefined,
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
        <NavigationMenuItem>
          {/* ---------------------------------- PRICE --------------------------------- */}
          <NavigationMenuTrigger
            className={cn(
              'border-1',
              !!filters.priceMin || filters.priceMax !== undefined
                ? 'border-neutral-600'
                : 'border-neutral-300',
            )}
          >
            {t('component.filters.price.title')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <PriceFilter
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
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/*-------------------------------- CONDITION ------------------------------- */}
          <NavigationMenuTrigger
            className={cn(
              'border-1',
              filters.condition.length ? 'border-neutral-600' : 'border-neutral-300',
            )}
          >
            {t('component.filters.condition.title')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ConditionFilter
              defaultValue={filters.condition}
              onChange={(value) => setFilters((prev) => ({ ...prev, condition: value }))}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* ---------------------------------- SORT ---------------------------------- */}
          <NavigationMenuTrigger
            className={cn(
              'border-1',
              filters.sortBy !== EnumOfferSortBy.DATE_DESC
                ? 'border-neutral-600'
                : 'border-neutral-300',
            )}
          >
            {t('component.filters.sort-by.title')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <SortFilter
              defaultValue={filters.sortBy}
              onChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const PriceFilter = ({
  className,
  defaultValue,
  onPriceMinChange,
  onPriceMaxChange,
}: {
  className?: string;
  defaultValue?: { min: number | undefined; max: number | undefined };
  onPriceMinChange?: (value: number | undefined) => void;
  onPriceMaxChange?: (value: number | undefined) => void;
}) => {
  const { t } = useTranslation();
  const [priceMin, setPriceMin] = useState<number | undefined>(defaultValue?.min);
  const [priceMax, setPriceMax] = useState<number | undefined>(defaultValue?.max);
  const [error, setError] = useState<string | undefined>();

  const priceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = value ? parseInt(value) : undefined;
    setPriceMin(parsedValue);
    if (onPriceMinChange) onPriceMinChange(parsedValue);
  };

  const priceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = value ? parseInt(value) : undefined;
    setPriceMax(parsedValue);
    if (onPriceMaxChange) onPriceMaxChange(parsedValue);
  };

  useEffect(() => {
    if (priceMin === undefined || priceMax === undefined) return;
    if (priceMin > priceMax) setError('Minimum price must be less than maximum price');
    else setError(undefined);
  }, [priceMin, priceMax]);

  return (
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
          value={priceMin || ''}
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
          value={priceMax || ''}
          min={0}
          onChange={priceMaxChange}
        />
      </div>
    </div>
  );
};

const ConditionFilter = ({
  className,
  defaultValue,
  onChange,
}: {
  className?: string;
  defaultValue?: EnumCondition[];
  onChange?: (value: EnumCondition[]) => void;
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
  );
};

const SortFilter = ({
  className,
  defaultValue,
  onChange,
}: {
  className?: string;
  defaultValue?: EnumOfferSortBy;
  onChange?: (value: EnumOfferSortBy) => void;
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<EnumOfferSortBy>(defaultValue || EnumOfferSortBy.DATE_DESC);

  const change = (value: EnumOfferSortBy) => {
    setValue(value);
    if (onChange) onChange(value);
  };

  return (
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
  );
};

export default SearchFilterBar;
