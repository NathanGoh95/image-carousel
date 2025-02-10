import { useState } from 'react';
import { Button } from './ui/button';
import { Infinity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type LoopSwitchProps = {
  onToggle: (looping: boolean) => void;
  className?: string;
};

export const LoopSwitch = ({ onToggle, className }: LoopSwitchProps) => {
  const [isLooping, setIsLooping] = useState(() => {
    const storedLooping = sessionStorage.getItem('isLooping');
    return storedLooping === 'true';
  });

  const toggleLooping = () => {
    const newLoopingState = !isLooping;
    setIsLooping((prev) => !prev);
    onToggle(!isLooping);
    sessionStorage.setItem('isLooping', JSON.stringify(newLoopingState));
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className='p-0'>
          <Button
            variant={'outline'}
            size={'icon'}
            aria-label='Toggle Loop'
            className={cn('p-2 border-none ring-0 rounded-md transition-colors', className)}
            onClick={toggleLooping}>
            <Infinity />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>
          {isLooping ? 'Looping enabled' : 'Looping disabled'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
