import './App.css';
import { ImageCarousel } from './components/ImageCarousel';
import { LoopSwitch } from './components/LoopSwitch';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeSwitch } from './components/ThemeSwitch';
import { useEffect, useState } from 'react';

const images = [
  { id: 1, src: 'image1.jpg', alt: 'Image 1' },
  { id: 2, src: 'image2.jpg', alt: 'Image 2' },
  { id: 3, src: 'image3.jpg', alt: 'Image 3' },
  { id: 4, src: 'image4.jpg', alt: 'Image 4' },
  { id: 5, src: 'image5.jpg', alt: 'Image 5' },
];

function App() {
  const [isLooping, setIsLooping] = useState(() => {
    const storedLooping = sessionStorage.getItem('isLooping');
    return storedLooping === 'true';
  });

  const handleToggleLopping = (looping: boolean) => {
    setIsLooping(looping);
  };

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ThemeSwitch />
      <LoopSwitch onToggle={handleToggleLopping} />
      <ImageCarousel images={images} loop={isLooping} />
    </ThemeProvider>
  );
}

export default App;
