/**
*	screenDetector
*	@event "resize.screenDetector"
*	@event "scroll.screenDetector"
*	@description
*	detect window scroll and resize change and store browser state
*/
define(['modules/pubSub'], function(pubSub) {
	"use strict";

	var resizeTimer = null,
		scrollTimer = null,
		defaultConfig = {
			mobileWidth: 320,
			tabletWidth: 768,
			resizeDelay: 500,
			scrollDelay: 200
		},
		config = {},
		browserState = {},
		isDetectScrolled = false,
		isDetectResized = true,
		events = {
			screenResized: "resized.screenDetector",
			screenScrolled: "scrolled.screenDetector",
			winResized: "windowResized",
			winScrolled: "windowScrolled",
			onReady: "onReady"
		},
		$win = $(window),
		$doc = $(document);

	function setUpConfig(settings) {
		if (settings && $.isPlainObject(settings)){
			config = $.extend({}, defaultConfig, settings);
		}
	}
	
	function getBrowserState(e, isResized) {
		// only do more check if resized
		if (isDetectResized && isResized) {
			browserState.width = $win.width();
			browserState.height = $win.height();
			browserState.docHeight = $doc.height();
			browserState.isMobile = browserState.width <= config.mobileWidth;
			browserState.isTablet = browserState.width <= config.tabletWidth;
			browserState.isDesktop = browserState.width >= config.tabletWidth;
		}
		if (isDetectScrolled) {
			browserState.winScrollTop = $win.scrollTop();
			browserState.winScrollLeft = $win.scrollLeft();
		}
		return (!isDetectResized && !isDetectScrolled) ? {} : browserState;
	}
	
	function onScreenChange(e, changedType) {
		var currentState;
		// publish event 'windowResized';
		if (changedType === events.screenResized) {
			currentState = getBrowserState(e, true);
			pubSub.pub(events.winResized, currentState);
		} 
		// publish event 'windowScrolled';
		else if (changedType === events.screenScrolled) {
			currentState = getBrowserState(e);
			pubSub.pub(events.winScrolled, currentState);
		}
	}

	function bindDetectResized() {
		// debounce window resize event
		if (!isDetectResized) {
			return;
		}
		$win.on(events.screenResized, function(e) {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				onScreenChange(e, events.screenResized);
			}, config.resizeDelay);
		});
		isDetectResized = true;
	}
	
	function bindDetectScrolled(){
		if (!isDetectScrolled) {
			return;
		}
		$win.on(events.screenScrolled, function(e) {
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(function() {
				onScreenChange(e, events.screenScrolled);
			}, config.scrollDelay);
		});
		isDetectScrolled = true;
	}
	
	function enable(feature){
		if (feature === undefined || feature === "resized"){
			bindDetectResized();
			isDetectResized = true;
		}
		if (feature === undefined || feature === "scrolled"){
			bindDetectScrolled();
			isDetectScrolled = true;
		}
	}
	
	function disable(feature){
		if (feature === undefined || feature === "resized"){
			$win.off(events.screenResized);
			isDetectResized = false;
		}
		if (feature === undefined || feature === "scrolled"){
			$win.off(events.screenScrolled);
			isDetectScrolled = false;
		}
	}
	
	// generate config
	setUpConfig();
	
	// init browserState on DOM ready
	$doc.ready(function(e) {
		var currentState = getBrowserState(e, true);
		pubSub.pub(events.onReady, currentState);
	});
	
	
	return {
		config: setUpConfig,
		getBrowserState: getBrowserState,
		enable: enable,
		disable: disable
	};
	
});