import { NguCarouselConfig } from '@ngu/carousel';

export function getNguCarouselConfig(): NguCarouselConfig {
    return {
        grid: { xs: 1, sm: 1, md: 1, lg: 2, all: 0 },
        slide: 1,
        speed: 400,
        point: {
            visible: false,
        },
        load: 2,
        touch: false,
        loop: true,
        custom: 'banner',
    };
}
