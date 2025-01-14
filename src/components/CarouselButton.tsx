import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './ui/button';

type CarouselButtonProps = ButtonProps & {
  children: React.ReactNode;
};

export const CarouselButton = ({ children, className, ...props }: CarouselButtonProps) => {
  return (
    <Button className={cn(className)} {...props} variant={'default'}>
      {children}
    </Button>
  );
};
