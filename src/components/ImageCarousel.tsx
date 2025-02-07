import { useEffect, useState } from 'react';
import { CarouselButton } from './CarouselButton';
import { motion } from 'framer-motion';

type Image = {
  id: number;
  alt: string;
  src: string;
};

type ImageCarouselProps = {
  images: Image[];
};

const useTimeoutReset = (state: boolean, setState: (value: boolean) => void, delay: number) => {
  useEffect(() => {
    if (state) {
      const timer = setTimeout(() => {
        setState(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [state, setState, delay]);
};

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomCurrent, setZoomCurrent] = useState(false);
  const [laoding, setLoading] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isPushing, setIsPushing] = useState(false);

  const currentImage = images[currentIndex];
  const nextImages = images.slice(currentIndex + 1, currentIndex + 5);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setZoomCurrent(true);
      setLoading(true);
      setIsPulling(true);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setZoomCurrent(true);
      setIsPushing(true);
      setCurrentIndex(currentIndex - 1);
    }
  };

  useTimeoutReset(zoomCurrent, setLoading, 50);
  useTimeoutReset(zoomCurrent, setZoomCurrent, 50);
  useTimeoutReset(zoomCurrent, setIsPulling, 50);
  useTimeoutReset(isPushing, setIsPushing, 100);

  const getStackedIndex = (index: number) => {
    const position = {
      0: 'left-0 z-30',
      1: 'left-[20px] z-20',
      2: 'left-[40px] z-10',
      3: 'left-[60px] z-0',
    };

    return `cursor-pointer absolute w-full ${position[index as keyof typeof position]}`;
  };

  return (
    <div className='max-w-8xl mx-auto p-4'>
      <div className='flex gap-6'>
        {/* Current Photo Section */}
        <motion.div
          className='w-[50rem] h-[32rem]'
          initial={{ scale: 1 }}
          animate={{ scale: zoomCurrent ? 0.25 : 1 }}
          transition={{ type: 'keyframe', stiffness: 50 }}>
          <div className='aspect-[7/5] relative'>
            {!laoding && (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className='w-full h-full rounded-lg shadow-lg'
                loading='lazy'
              />
            )}
          </div>
        </motion.div>

        {/* Next Photo & Buttons container */}
        <div className='flex flex-col justify-around'>
          {/* Next Photo Section */}
          <motion.div
            className='w-[300px] relative'
            animate={isPushing ? { x: 40 } : { x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}>
            {nextImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={`${getStackedIndex(index)}`}
                onClick={handleNext}
                whileHover={{ y: -20 }}
                animate={index === 0 && isPulling ? { x: -100 } : { x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading='lazy'
                  className='w-full aspect-[16/9] rounded-lg shadow-lg object-cover'
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Carousel Buttons */}
          <div className='flex gap-4 justify-center'>
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
