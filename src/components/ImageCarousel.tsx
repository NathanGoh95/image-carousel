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
  const nextImages = images.slice(currentIndex + 1, currentIndex + 5);

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

  const getStackedIndex = (index: number) => {
    const position = {
      0: 'left-0 z-30',
      1: 'left-[20px] z-20',
      2: 'left-[40px] z-10',
      3: 'left-[60px] z-0',
    };

    return `cursor-pointer absolute w-full aspect-[4/3] hover:translate-y-2 ${position[index as keyof typeof position]}`;
  };

  return (
    <div className='max-w-7xl mx-auto p-4'>
      {/* Current Photo Section */}
      <div className='flex'>
        <div className='w-[50rem]'>
          <div className='aspect-[16/9] relative'>
            <img src={currentImage.src} alt={currentImage.alt} className='w-full h-[32rem] object-cover rounded-lg' />
          </div>
        </div>

        {/* Next Photo & Buttons container */}
        <div className='flex flex-col justify-around'>
          {/* Next Photo Section */}
          <div className='w-[300px] relative'>
            {nextImages.map((image, index) => (
              <div key={image.id} className={`${getStackedIndex(index)}`} onClick={handleNext}>
                <img src={image.src} alt={image.alt} className='w-full object-cover rounded-lg shadow-lg' />
              </div>
            ))}
          </div>

          {/* Carousel Buttons */}
          <div className='flex gap-4'>
            <CarouselButton onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </CarouselButton>
            <CarouselButton onClick={handleNext} disabled={currentIndex === images.length - 1}>
              Next
            </CarouselButton>
          </div>
        </div>
      </div>
    </div>
  );
};
