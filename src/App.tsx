import './App.css';
import { ImageCarousel } from './components/ImageCarousel';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeSwitch } from './components/ThemeSwitch';
import { useEffect } from 'react';

const images = [
  { id: 1, src: 'image1.jpg', alt: 'Image 1' },
  { id: 2, src: 'image2.jpg', alt: 'Image 2' },
  { id: 3, src: 'image3.jpg', alt: 'Image 3' },
  { id: 4, src: 'image4.jpg', alt: 'Image 4' },
  { id: 5, src: 'image5.jpg', alt: 'Image 5' },
];

const preloadImages = (imageArray: { src: string }[]) => {
  imageArray.forEach((image) => {
    const img = new Image();
    img.src = image.src;
  });
};

function App() {
  useEffect(() => {
    preloadImages(images);
  }, []);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ThemeSwitch />
      <ImageCarousel images={images} />
    </ThemeProvider>
  );
}

export default App;
