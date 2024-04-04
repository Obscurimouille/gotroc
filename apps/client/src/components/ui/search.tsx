import { cn } from '@lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Cross2Icon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

const Search = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    customFilter?: (identifier: string, query: string) => boolean;
  }
>(({ className, children, customFilter, ...props }, ref) => {
  const [searchText, setSearchText] = useState('');

  const list = children as React.ReactElement;
  if (list.type !== SearchList) console.error('SearchList required as child of Search');

  const items = list.props.children.find((child: React.ReactElement) => Array.isArray(child));
  const emptyItem = list.props.children.find(
    (child: React.ReactElement) => child.type === SearchEmpty,
  );
  if (emptyItem == null) console.error('SearchList required an EmptyItem');

  // Filter items based on search text
  const filteredItems = (): React.ReactElement[] => {
    const results = items.filter((child: React.ReactElement) => {
      if (customFilter) return customFilter(child.props.name, searchText);
      return child.props.name.includes(searchText.toLowerCase());
    });
    if (results.length) return results;
    return [
      <SearchEmpty key="empty" {...emptyItem.props}>
        {emptyItem.props.children}
      </SearchEmpty>,
    ];
  };

  return (
    <div
      className={cn(
        'relative flex gap-1 h-9 items-center rounded-md border border-input bg-white pl-3 pr-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
        className,
      )}
    >
      <MagnifyingGlassIcon className="h-[18px] w-[18px] shrink-0" />
      <input
        {...props}
        placeholder="Rechercher..."
        type="text"
        ref={ref}
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
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
      {children && searchText && <SearchList {...list.props}>{filteredItems()}</SearchList>}
    </div>
  );
});
Search.displayName = 'Search';

const SearchList = ({ className, children }: React.InputHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'absolute -bottom-2 left-0 w-full translate-y-full z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
    >
      {children}
    </div>
  );
};
SearchList.displayName = 'SearchList';

const SearchItem = ({
  className,
  children,
}: React.InputHTMLAttributes<HTMLDivElement> & { name: string }) => {
  return (
    <div
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-foreground outline-none hover:bg-foreground/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
    >
      {children}
    </div>
  );
};
SearchItem.displayName = 'SearchItem';

const SearchEmpty = ({ className, children }: React.InputHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-foreground outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
    >
      {children}
    </div>
  );
};
SearchEmpty.displayName = 'SearchEmpty';

export { Search, SearchList, SearchItem, SearchEmpty };
