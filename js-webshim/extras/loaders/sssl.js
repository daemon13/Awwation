/*
 * SSSL: smallest, simpelst script loader
 * version: 1.0.1
 * 
 * API:
 * Normal usage
 * sssl(source [,complete]);
 * 
 * Example:
 * sssl('jquery.js', function(){
 * 	$(function(){
 * 		$('div').addClass('ready');
 * 	});
 * });
 * 
 * -------------------------------
 * 
 * Queued script loading (not so fast as yepnope/labJS, but ordered execution):
 * sssl([source1, source2, source3], complete);
 * 
 * Example:
 * sssl(['jquery.js', 'jquery.ui.js'], function(){
 * 	$(function(){
 * 		$('div.accordion').accordion();
 * 	});
 * });
 */
(function(){var c=document.getElementsByTagName("script")[0];var g=c.parentNode;var b=/ded|co/;var f="onload";var e="onreadystatechange";var a="readyState";var d=function(j,i){var h=document.createElement("script");h[f]=h[e]=function(){if(!this[a]||b.test(this[a])){h[f]=h[e]=null;i&&i(h);h=null}};h.async=true;h.src=j;g.insertBefore(h,c)};window.sssl=function(i,h){if(typeof i=="string"){d(i,h);return}var j=i.shift();d(j,function(){if(i.length){window.sssl(i,h)}else{h&&h()}})}})();