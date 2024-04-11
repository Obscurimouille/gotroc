import Loader from '@components/ui/loader';
import { cn } from '@lib/utils';
import { ReactNode, useEffect, useState } from 'react';

const Page = ({
  children,
  loading,
  className,
}: {
  children: ReactNode;
  loading?: boolean;
  className?: string;
}) => {
  const [montLoader, setMontLoader] = useState(loading);
  const animationDuration = 500;

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setMontLoader(false);
      }, animationDuration);
    }
  });

  return (
    <>
      <div
        className={cn(
          `relative flex flex-col items-center min-h-dvh bg-neutral-100 transition-[filter] duration-[${animationDuration}ms]`,
          loading ? 'blur-sm' : '',
          className,
        )}
      >
        {children}
      </div>
      {!!montLoader && (
        <div
          className={cn(
            'absolute top-0 left-0 w-full h-dvh flex items-center justify-center transition-opacity duration-500',
            loading ? '' : 'opacity-0',
          )}
        >
          <Loader />
        </div>
      )}
    </>
  );
};

const PageContent = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn('flex-1 w-full flex flex-col items-center px-4 min-h-0')}>
      <div className={cn('w-full lg:max-w-[1050px] h-full flex flex-col min-h-0', className)}>
        {children}
      </div>
    </div>
  );
};

export { Page, PageContent };
