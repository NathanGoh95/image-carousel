import { useCallback, useEffect, useMemo, useState } from 'react';
import { CarouselButton } from './CarouselButton';
import { AnimatePresence, motion } from 'framer-motion';

type Image = {
  id: number;
  alt: string;
  src: string;
};

type ImageCarouselProps = {
  images: Image[];
  loop: boolean;
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

const STACKED_POSITIONS = {
  0: 'left-0 z-30',
  1: 'left-[20px] z-20',
  2: 'left-[40px] z-10',
  3: 'left-[60px] z-0',
} as const;

export const ImageCarousel = ({ images, loop }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomCurrent, setZoomCurrent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isPushing, setIsPushing] = useState(false);

  const currentImage = useMemo(() => images[currentIndex], [images, currentIndex]);

  const nextImages = useMemo(() => {
    if (images.length <= 1) return [];

    const nextIndices = [
      (currentIndex + 1) % images.length,
      (currentIndex + 2) % images.length,
      (currentIndex + 3) % images.length,
      (currentIndex + 4) % images.length,
    ];

    if (!loop && currentIndex >= images.length - 4) {
      return images.slice(currentIndex + 1).filter(Boolean);
    }

    return nextIndices.map((index) => images[index]);
  }, [images, currentIndex, loop]);

  const isNextDisabled = useMemo(
    () => !loop && currentIndex === images.length - 1,
    [loop, currentIndex, images.length],
  );

  const isPrevDisabled = useMemo(() => !loop && currentIndex === 0, [loop, currentIndex]);

  const handleNext = useCallback(() => {
    if (isNextDisabled) return;

    setZoomCurrent(true);
    setLoading(true);
    setIsPulling(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length, isNextDisabled]);

  const handlePrevious = useCallback(() => {
    if (isPrevDisabled) return;

    setZoomCurrent(true);
    setIsPushing(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length, isPrevDisabled]);

  const getStackedIndex = useCallback((index: number) => {
    return `cursor-pointer absolute w-full ${STACKED_POSITIONS[index as keyof typeof STACKED_POSITIONS]}`;
  }, []);

  useTimeoutReset(zoomCurrent, setLoading, 50);
  useTimeoutReset(zoomCurrent, setZoomCurrent, 50);
  useTimeoutReset(zoomCurrent, setIsPulling, 50);
  useTimeoutReset(isPushing, setIsPushing, 100);

  useEffect(() => {
    nextImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, [nextImages]);

  return (
    <div className='max-w-8xl mx-auto p-4'>
      <div className='flex gap-6'>
        {/* Current Photo Section */}
        <AnimatePresence mode='wait'>
          <motion.div
            className='w-[50rem] h-[32rem]'
            initial={{ scale: 1 }}
            animate={{ scale: zoomCurrent ? 0.25 : 1 }}
            transition={{ type: 'keyframe', stiffness: 50 }}>
            <div className='aspect-[7/5] relative'>
              {!loading && (
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className='w-full h-full rounded-lg shadow-lg'
                  loading='eager'
                  decoding='async'
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

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
                className={`${getStackedIndex(index)} shadow-glow-dark dark:shadow-glow-light`}
                onClick={handleNext}
                whileHover={{ y: -20 }}
                animate={index === 0 && isPulling ? { x: -100 } : { x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading='eager'
                  decoding='async'
                  className='w-full aspect-[16/9] rounded-lg shadow-lg object-cover'
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Carousel Buttons */}
          <div className='flex gap-4 justify-center'>
            <CarouselButton onClick={handlePrevious} disabled={isPrevDisabled}>
              Previous
            </CarouselButton>
            <CarouselButton onClick={handleNext} disabled={isNextDisabled}>
              Next
            </CarouselButton>
          </div>
        </div>
      </div>
    </div>
  );
};
