import { cn } from '@lib/utils';
import { ReactNode } from 'react';

const Page = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn(className, 'flex flex-col items-center min-h-dvh bg-neutral-100')}>
      {children}
    </div>
  );
};

const PageContent = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn('w-full flex justify-center px-4')}>
      <div className={cn(className, "w-full lg:w-[1000px] h-full flex flex-col")}>{children}</div>
    </div>
  );
};

export { Page, PageContent };
