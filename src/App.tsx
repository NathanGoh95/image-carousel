import './App.css';
import { Button } from './components/ui/button';
import { ImageCarousel } from './components/imageCarousel';
import image1 from '@/assets/image1.svg';
import image2 from '@/assets/image2.svg';

const images = [
  { id: 1, src: image1, alt: 'Image 1' },
  { id: 2, src: image2, alt: 'Image 2' },
  { id: 3, src: image1, alt: 'Image 3' },
  { id: 4, src: image2, alt: 'Image 4' },
  { id: 5, src: image1, alt: 'Image 4' },
];

function App() {
  return (
    <>
      <Button className='bg-slate-400' variant={'secondary'}>
        Hello
      </Button>
      <ImageCarousel images={images} />
    </>
  );
}

export default App;
