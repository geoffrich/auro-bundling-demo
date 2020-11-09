// Used for bundling for legacy browsers

import 'core-js/es/symbol'; // not sure why this is needed, but it prevents "out of stack space" in IE11.
import 'whatwg-fetch';
// any other component specific polyfills

// TODO: good idea? Listen for WebComponentsReady?
import '@webcomponents/webcomponentsjs/webcomponents-bundle'; 
import './auro-bundle';