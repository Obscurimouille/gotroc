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
    } else setMontLoader(true);
  }, [loading]);

  return (
    <>
      <div
        className={cn(
          `relative flex flex-col items-center min-h-dvh bg-neutral-100 transition-[filter] duration-[${animationDuration}ms]`,
          loading ? 'blur-sm brightness-95' : '',
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

const PageContent = ({
  children,
  className,
  paddingX,
}: {
  children: ReactNode;
  className?: string;
  paddingX?: number;
}) => {
  return (
    <div
      className={cn(
        'flex-1 w-full flex flex-col items-center min-h-0',
        'px-' + (paddingX !== undefined ? paddingX : 4),
      )}
    >
      <div className={cn('lg:max-w-[1050px] w-full h-full flex flex-col min-h-0', className)}>
        {children}
      </div>
    </div>
  );
};

export { Page, PageContent };
