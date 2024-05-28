export const environment = {
  production: true,
  stage: false,
  qc: false,
  version: require('../../package.json').version,
  frontAppURL: "http://222.108.58.251",
  apiURL: "http://222.108.58.251:9000",
  cachableApiURL: "https://d2y1n10kyc0ey5.cloudfront.net",
};

// 반응형 구간 정의
import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';

let responsiveDefinitionConfig = {
    breakPoints: {
        xs: {max: 0},
        sm: {min: 1, max: 2},
        md: {min: 3, max: 4},
        lg: {min: 5, max: 1024}, // mobile
        xl: {min: 1025}  // desktop
    },
    debounceTime: 100
};

// let responsiveDefinitionConfig = {
//     breakPoints: {
//         xs: {max: 0},
//         sm: {min: 1, max: 2},
//         md: {min: 3, max: 4},
//         lg: {min: 5, max: 767}, // mobile
//         xl: {min: 768}  // desktop
//     },
//     debounceTime: 100
// };

export function ResponsiveDefinition() {
    return new ResponsiveConfig(responsiveDefinitionConfig);
};
