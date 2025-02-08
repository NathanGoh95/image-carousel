import { useState } from 'react';
import { Button } from './ui/button';
import { Infinity } from 'lucide-react';

export const LoopSwitch = ({ onToggle }) => {
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
    <Button
      variant={'outline'}
      size={'icon'}
      aria-label='Toggle Loop'
      className='p-2 rounded-md transition-colors'
      onClick={toggleLooping}>
      <Infinity />
    </Button>
  );
};
