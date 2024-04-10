import { cn } from '@lib/utils';
import { ReactNode } from 'react';

const Page = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn('flex flex-col items-center min-h-dvh bg-neutral-100', className)}>
      {children}
    </div>
  );
};

const PageContent = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn('flex-1 w-full flex flex-col items-center px-4 min-h-0')}>
      <div className={cn("w-full lg:max-w-[1050px] h-full flex flex-col min-h-0", className)}>{children}</div>
    </div>
  );
};

export { Page, PageContent };
