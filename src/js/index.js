'use strict'

// object-fit and object-position polyfill
// =============================================================//
import objectFitImages from 'object-fit-images';
// =============================================================//


// svg-sprite polyfill
// =============================================================//
import svg4everybody from 'svg4everybody';
// =============================================================//

objectFitImages();
svg4everybody();

// import fontawesome from "font-awesome"
// fontawesome.dom.i2svg()

import './lib/polyfills'
import './common/main';
import './common/form';
import './common/slider-slick';
