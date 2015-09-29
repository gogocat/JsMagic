/**
* requestAnimationFrame polyfill simplify from:
* https://gist.github.com/mrdoob/838785
* @author paulirish / http://paulirish.com/
*/
define([], function () {
    "use strict";
    if (typeof window.requestAnimationFrame !== "function") {
        window.requestAnimationFrame = ( function() {
            return function(callback) {
                window.setTimeout( callback, 1000 / 60 );
            };
        })();
    }
    if (typeof window.cancelAnimationFrame !== "function") {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
    
    return window.requestAnimationFrame;
});

