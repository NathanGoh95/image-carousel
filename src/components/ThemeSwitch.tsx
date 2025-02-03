import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant={'outline'} size={'icon'} onClick={handleThemeToggle} aria-label='Swtich Theme' className='p-2 rounded-md transition-colors'>
      {theme === 'dark' ? <Moon /> : <Sun />}
    </Button>
  );
};
