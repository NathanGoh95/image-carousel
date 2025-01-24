import './App.css';
import { Button } from './components/ui/button';
import { ImageCarousel } from './components/ImageCarousel';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeSwitch } from './components/ThemeSwitch';

const images = [
  { id: 1, src: 'image1.jpg', alt: 'Image 1' },
  { id: 2, src: 'image2.jpg', alt: 'Image 2' },
  { id: 3, src: 'image3.jpg', alt: 'Image 3' },
  { id: 4, src: 'image4.jpg', alt: 'Image 4' },
  { id: 5, src: 'image5.jpg', alt: 'Image 5' },
];

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ThemeSwitch />
      <ImageCarousel images={images} />
    </ThemeProvider>
  );
}

export default App;
