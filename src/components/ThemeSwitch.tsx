import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const ThemeSwitch = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className='p-0'>
          <Button
            variant={'outline'}
            size={'icon'}
            onClick={handleThemeToggle}
            aria-label='Swtich Theme'
            className={cn('p-2 rounded-md transition-colors', className)}>
            {theme === 'dark' ? <Moon /> : <Sun />}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
