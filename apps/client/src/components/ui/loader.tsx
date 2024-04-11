import { cn } from '@lib/utils';

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('animate-spin w-28 h-28 border-[.75rem] rounded-full border-primary border-l-transparent', className)}
    ></div>
  );
};

export default Loader;
