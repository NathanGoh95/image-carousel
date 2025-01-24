import { useTheme } from './ThemeProvider';
import { Switch } from './ui/switch';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const handleSwtich = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Switch checked={theme === 'dark'} onCheckedChange={handleSwtich} aria-label='Switch theme' />
  )
};
