import { cn } from '@lib/utils';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ className, ...props }: { className?: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const rawSearch = (text: string = searchText) => {
    if (!text ||!text.trim()) return;
    navigate('/search?rawText=' + text);
  };

  return (
    <div
      className={cn(
        'relative flex gap-1 h-9 items-center rounded-md border border-input bg-white pl-3 pr-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
        className,
      )}
    >
      <button
        onClick={() => {
          rawSearch();
        }}
      >
        <MagnifyingGlassIcon className="h-[18px] w-[18px] shrink-0" />
      </button>
      <input
        placeholder={t('component.searchbar.placeholder')}
        type="text"
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') rawSearch();
        }}
        className="w-full p-1 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        className={'h-[16px] w-[16px] ' + (searchText ? 'opacity-100' : 'opacity-0')}
        onClick={() => {
          setSearchText('');
        }}
      >
        <Cross2Icon />
      </button>
    </div>
  );
};

export default SearchBar;
