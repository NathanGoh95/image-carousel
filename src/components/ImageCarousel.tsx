import { useState } from 'react';
import { CarouselButton } from './CarouselButton';

type Image = {
  id: number;
  alt: string;
  src: string;
};

type ImageCarouselProps = {
  images: Image[];
};

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = images[currentIndex];
  const nextImages = images.slice(currentIndex + 1, currentIndex + 4);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className='max-w-7xl mx-auto p-4'>
      {/* Current Photo Section */}
      <div className='flex gap-6'>
        <div className='w-[45rem]'>
          <div className='aspect-[16/9] relative'>
            <img src={currentImage.src} alt={currentImage.alt} className='w-full h-[500px] object-cover rounded-lg' />
          </div>
        </div>

        {/* Next Photo Section */}
        <div className='w-[35rem] flex flex-col gap-4' onClick={handleNext}>
          {nextImages.map((image) => (
            <div key={image.id} className='cursor-pointer relative w-full'>
              <img src={image.src} alt={image.alt} className='h-[9rem] aspect-[3/2] object-cover rounded-lg' />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Buttons */}
      <div className='flex justify-center gap-4 mt-6'>
        <CarouselButton onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </CarouselButton>
        <CarouselButton onClick={handleNext} disabled={currentIndex === images.length - 1}>
          Next
        </CarouselButton>
      </div>
    </div>
  );
};
