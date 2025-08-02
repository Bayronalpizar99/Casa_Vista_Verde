
declare module 'swiper/css';
declare module 'swiper/css/effect-fade';
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