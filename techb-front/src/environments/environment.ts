export const environment = {
    production: false,
    stage: false,
    qc: false,
    version: require('../../package.json').version,
    frontAppURL: "http://localhost:4200",
    apiURL: "http://localhost:9000", // "https://techbapi.crefestudio.synology.me"
    cachableApiURL: "https://techbapi.crefestudio.synology.me",
};


// 반응형 구간 정의

import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';

// if (!environment.production) {
//     let responsiveDefinitionConfig = {
//         breakPoints: {
//             xs: {max: 0},
//             sm: {min: 1, max: 2},
//             md: {min: 3, max: 4},
//             lg: {min: 5, max: 2000}, // mobile
//             xl: {min: 2001}  // desktop
//         },
//         debounceTime: 100
//     };
// } 

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

export function ResponsiveDefinition() {
    return new ResponsiveConfig(responsiveDefinitionConfig);
};
