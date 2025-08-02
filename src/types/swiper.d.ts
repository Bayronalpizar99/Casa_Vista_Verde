declare module 'swiper/css';
declare module 'swiper/css/effect-fade';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/bundle';
declare module 'swiper/swiper-bundle.css';
declare module 'swiper/modules';
declare module 'swiper/react';

declare module 'swiper' {
  export interface Swiper {
    slidePrev(): void;
    slideNext(): void;
    slideTo(index: number): void;
    realIndex: number;
  }
}