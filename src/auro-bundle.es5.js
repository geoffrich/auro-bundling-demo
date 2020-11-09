// Used for bundling for legacy browsers

// this needs to be imported before WC polyfills to prevent "Out of stack space" errors in IE
import 'core-js/es/symbol'; 

// component specific polyfills
import 'whatwg-fetch'; // for auro-icon

import '@webcomponents/webcomponentsjs/webcomponents-bundle'; 
import './auro-bundle';