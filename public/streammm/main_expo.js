var voiceObj = {};
voiceObj.speech = true,
voiceObj.speechRate = 1,
voiceObj.voiceFinished = true;

window.stopVoice = function(){};
window.aiVoice = function(){};

var ios6 = navigator.userAgent.match(/OS 6_[0-9_]+ like Mac OS X/i) !== null;
var ios7 = navigator.userAgent.match(/OS 7_[0-9_]+ like Mac OS X/i) !== null;
var ios8 = navigator.userAgent.match(/OS 8_[0-9_]+ like Mac OS X/i) !== null;
var ios9 = navigator.userAgent.match(/OS 9_[0-9_]+ like Mac OS X/i) !== null;
var ios10 = navigator.userAgent.match(/OS 10_[0-9_]+ like Mac OS X/i) !== null;
var ios11 = navigator.userAgent.match(/OS 11_[0-9_]+ like Mac OS X/i) !== null;

if(ios9 || ios10 || ios11) {
  voiceObj.speechRate = 1;
}

function toggleSound(){
  if(voiceObj.speech){
    window.streammmType = new streammmTyper({strings : ["Voice off^1000"], type : 'notification', wait : true, returnToInfo : true});
    stopVoice();
    voiceObj.speech = false;
	voiceObj.voiceFinished = true;
    StreammmAnalytics('event','VoiceOn',languageObj.globalLng);
  }else{
    window.streammmType = new streammmTyper({strings : ["Voice on^1000"], type : 'notification', wait : true, returnToInfo : true});
	voiceObj.speech = true;
    voiceObj.voiceFinished = true;
    StreammmAnalytics('event','VoiceOff',languageObj.globalLng);
  }
  _superStreammm();
  window.localStorage.setItem('userVoice', voiceObj.speech);
}

function voiceInit(){
  if(globalObj.hasPlugins){
    // PLUGIN
    window.plugins.tts.startup(function(){
      voiceObj.voiceFinished = true;
      window.plugins.tts.pitch(0.5,null,null);
      window.plugins.tts.speed(voiceObj.speechRate,null,null);
    },function(){voiceObj.speech = false;});
	
    window.aiVoice = function(text,lang){
      if(voiceObj.speech){
        voiceObj.voiceFinished = false;
        window.plugins.tts.setLanguage(lang,null,null);
        window.plugins.tts.speak(text, 
          function () { 
            voiceObj.voiceFinished = true;
          },
          function () {
            voiceObj.voiceFinished = true;
          }
        );
      }
    }

    window.stopVoice = function(){
      window.plugins.tts.stop();
    }
	
  }else{
    // SpeechSynthesisUtterance
    voiceObj.speech = true;
    voiceObj.voiceFinished = true;
    window.SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance  || window.SpeechSynthesisUtterance;
    var sayit = function ()	{
      var msg = new window.SpeechSynthesisUtterance();
      msg.voiceURI = 'native';
      msg.volume = 1;
      msg.pitch = 1;
      msg.rate = voiceObj.speechRate;
      msg.addEventListener('end', function () {
       voiceObj.voiceFinished = true;
      })
      return msg;
    }
	
    window.aiVoice = function(text,lang){
      if(voiceObj.speech){
        voiceObj.voiceFinished = true;
        window.speechSynthesis.cancel();
        var sentences = text.split(".");
        for (var i=0;i<sentences.length;i++){
          if(sentences[i].length > 5){
            var toSay = sayit();
            toSay.text = sentences[i];
            toSay.lang = lang;
			//console.log(lang);
			if(lang == "en-US"){
              toSay.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Google US English"; })[0];
			}
           window.speechSynthesis.speak(toSay);
          }
        }
      }
    }

    window.stopVoice = function(){
      var stopVoice = new SpeechSynthesisUtterance(" ");
      speechSynthesis.speak(stopVoice);
    }
  }
  
}
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setSlidesData = exports._makeRequest = exports._ajaxResponse = exports._firstRun = exports._slidesAmount = exports._slidesData = undefined;

var _slideModule = require("./slide-module.js");

var _texturesModule = require("./textures-module.js");

var _slideChangeModule = require("./slide-change-module.js");

var _textModule = require("./text-module");

var _promptModule = require("./prompt-module");

// store the ajax data in this module and serve it to the rest of the app

// get the text component methods
var _slidesData = exports._slidesData = void 0;
// VERSION 2.2.4
/* In some cases the API server could return a number of slides different than 20,
 * for that reason we create the slides amount variable to use in all calculations
 * and conditional checks. This variable will be defined everytime a new set of
 * slides is loaded and passed in the ajax response method.
*/

// get the method to start the prompt component

// get the current slides group
/*
*******************************************************************************************
*  MAIN AJAX REQUEST
*******************************************************************************************
*/
/**	This module handles the ajax request of the slides data.
 *	Stores the server's response and pass it to the rest of the app.
 */
// get the method to create the slides
var _slidesAmount = exports._slidesAmount = void 0;

/* VERSION 2.3.0
 * For the first run we create a boolean, set as true as default.
 * In the first run we don't have to check all the text at this point,
 * the text should be created for the first slide of the group and at
 * the first run, after the loader code is complete, this creates 
 * inconsistencies between the text size / position and the background.
 * When a new group is loaded we can run the text process code, but in
 * the first run the text process code is ran in the loader module.
*/
var _firstRun = exports._firstRun = true;

// callback for a successfull request
// in order to accomodate to the public methods, this will be exported in order
// to be called in the init method.
// when the react app is created, this will no longer be exported and used in the
// init method, then the make request method will be used.
var _ajaxResponse = exports._ajaxResponse = function _ajaxResponse(r) {

	// the response object is used only when making the request,
	// since we're exporting the method and the request is being handled outside
	// the component, we use the response parameter directly. When the react app
	// is made go back to this approach.
	exports._slidesData = _slidesData = r.slides;
	// set the amount of slides
	// the slides amount is used as an index position, therefore
	// it should be 1 less than the total slides.
	exports._slidesAmount = _slidesAmount = r.slides.length - 1;
	// create the main slide
	(0, _slideModule._createMainSlide)();
	// now reset the textures array in order to start loading the slides' images
	(0, _texturesModule._resetTexturesArray)();
	// load the slides logos
	(0, _promptModule._preloadLogos)();
	// after reseting the textures we can set process the text of the first slide
	// the slides data is set, the textures array is created and the slide index
	// has been set to 0 again, so it's safe to process and start the text animation
	/* PROCESS THE TEXT OF THE FIRST SLIDE OF THE NEW GROUP */
	/* THEN START THE WORD ANIMATION FOR THE FIRST SLIDE */
	if (!_firstRun) {
		(0, _textModule._processSlideText)();
		(0, _textModule._createNewSlideText)();
		//console.log("process first slide text");
		// start the prompt component
		// pass true to set the alpha of the prompt stage to 1
		(0, _promptModule._restartPrompt)(true);
	}
	// now toggle the first run boolean to false
	exports._firstRun = _firstRun = false;
};

// callback for failed request
var _ajaxError = function _ajaxError(o, t) {
	//console.log(t);
};

var _userChannels = ["fid_20181-h", "fid_20181-w", "fid_20181-n", "fid_20181-b", "fid_20181-e", "fid_20181-s", "fid_20181-t", "fid_20181-p", "fid_21905", "fid_691", "fid_658", "fid_1609", "fid_1117", "fid_726", "fid_21908", "fid_22011", "fid_7884", "fid_3792", "fid_22065", "fid_21920", "fid_1316", "fid_801", "fid_21927", "fid_3068", "fid_21907", "fid_21937", "fid_21940", "fid_21942", "fid_22055", "fid_21923", "fid_21939", "fid_22063", "fid_22070", "fid_22071", "fid_21943", "fid_21995", "fid_21993", "fid_21988", "fid_22001", "fid_22034", "fid_22025", "fid_22036", "fid_22028", "fid_22030", "fid_22042"];

var _userSliders = [{ "id": "world", "value": 20 }, { "id": "business", "value": 20 }, { "id": "entertainment", "value": 20 }, { "id": "sports", "value": 20 }, { "id": "science", "value": 20 }, { "id": "politics", "value": 20 }, { "id": "technology", "value": 20 }, { "id": "gaming", "value": 15 }, { "id": "movies", "value": 20 }, { "id": "design", "value": 20 }, { "id": "photography", "value": 20 }, { "id": "graphics", "value": 20 }, { "id": "architecture", "value": 20 }, { "id": "fashion", "value": 20 }, { "id": "food", "value": 20 }, { "id": "finance", "value": 15 }, { "id": "marketing", "value": 15 }];
var _targetURL = "http://aiwn.io/api/";

var _makeRequest = exports._makeRequest = function _makeRequest() {

	$.ajax({
		url: _targetURL,
		dataType: "json",
		type: "POST",
		xhrFields: {
			withCredentials: true
		},
		cache: false,
		data: {
			group_number: _slideChangeModule._slidesGroup,
			init: false,
			user_feeds: _userChannels,
			user_sliders: _userSliders,
			filterVal: "all",
			token: "bnjhbfdsk23432",
			version: "2.0.5"
		}
	}).done(_ajaxResponse).fail(_ajaxError);
};

/**  Method to set the slides data outside the ajax callbacks
 *  This is a public method to expose in the app's API
 * 	@param {array} d: the array with all the slides data
 */
var setSlidesData = exports.setSlidesData = function setSlidesData(d) {
	// loop trough the slides and create a single sprite for each
	exports._slidesData = _slidesData = d;
};

},{"./prompt-module":20,"./slide-change-module.js":24,"./slide-module.js":25,"./text-module":30,"./textures-module.js":33}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
*******************************************************************************************
*  ANIMATION STORE
*******************************************************************************************
*/

// test

// the animation store has the main animation information object
// this object holds the array with all the animations types (read-only objects)
// has a property for the last generic animation
// has a property for the las specific animations
// has a property for the animation type of the next slide
// has a property for the aniamtion type of the previous slide
// When an image is loaded in the base texture, check for the real dimensions of the 
// image and set the scale for the image (scale ratio). Then check if the scaled
// size is enough for a translation effect. If not use a zoom effect.
// add to the base texture an integer pointing to the index of the generic effect type.

var _animationStore = exports._animationStore = {
	// generic animations, array with a string for each generic animation type
	// this allows to access each generic type via an index integer
	genericAnimations: ["vertical", "horizontal", "zoom" // 0 1 2
	],
	/*	specific animations, object with a key for each generic type
  *	for horizontal and zoom, an array with the different types.
  *  In the case of the horizontal animation, the string represents the
  * 	side the slide is moved TO. Left means the slide is set at the right
  * 	edge of the screen (negative x) and is moved to the left (x = 0).
  */
	types: {
		vertical: "bottom",
		horizontal: ["right", "left"], // 0 1
		zoom: ["in", "out"] // 0 1
	},
	// last generic type used. Integer wiht the index of the generic animations
	// array. startup => null
	lastGeneric: null, // integer 0 1 2
	/*	last specific. Object with a key for each of the generic types that have
  *	specific types (horizontal - zoom). The value is the integer of the specific
  *	array on each types key (types object).
  *	in order to avoid an extra conditional check, set the last specific to be 0
  *	in both cases. So the first zoom animation will be zoom out and the first 
  *  horizontal animation will be to the left of the screen starting at x = 0.
  */
	lastSpecific: {
		horizontal: 0, // integer 0 1
		zoom: 0 // integer 0 1
	},
	// object for the current animation types
	// after the animation types are set, they're store in this object so we can
	// check for the next slide index the animation that should be used
	currentAnimations: {
		generic: null,
		specific: null
	},
	// next and previous animation types
	// this are set on touch start.
	previousAnimationType: null,
	nextAnimationType: null
};

/*	NOTE
 *  The methods to update the generic and specific animation types
 * 	should run on the update texture method. This because at that point in the code
 * 	we'll know the animation type the main slide will have after updating the texture,
 * 	allowing to check the specific type when the next and previous stripes are created.
 */

/** Set Generic Method	
 *  This is used to set the generic animation type in the store.	
 * 	Use the integer according to the generic animations array
 * 	@param {number} n: the index of the specific 
 */
var _setGeneric = exports._setGeneric = function _setGeneric(n) {
	exports._animationStore = _animationStore = _extends({}, _animationStore, {
		lastGeneric: n
	});
};

/** Set Specific Animation Type Method	
 *  Sets the specific animation type for the corresponding generic type.	
 * 	@param {number} g: the generic animation index
 */
var _setSpecific = exports._setSpecific = function _setSpecific(g) {
	if (g === 0) {
		return;
	}
	// get the string  of the generic type being updated
	var _updatedGeneric = _animationStore.genericAnimations[g];
	// set the new specific value
	var _newSpecific = _animationStore.lastSpecific[_updatedGeneric] === 0 ? 1 : 0;
	exports._animationStore = _animationStore = _extends({}, _animationStore, {
		lastSpecific: _extends({}, _animationStore.lastSpecific, _defineProperty({}, _updatedGeneric, _newSpecific))
	}); // new store end

	// console.log( "updating store", _updatedGeneric, _newSpecific );
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._resumeBurnsInstances = exports._pauseBurnsEffect = exports._burnsEffectTimer = exports._createBurnsEffect = exports._setRunningChecker = exports._burnsEffect = exports._burnsEffectRunning = exports._timerRunning = exports._nextTypeIndex = exports._currentTypeIndex = undefined;

var _slideChangeModule = require("../slide-change-module");

var _window = require("../window");

var _animationStore2 = require("./animation-store");

var _slideModule = require("../slide-module");

// this variable will have the index of the animation type for the current slide image

// get the animation store
/*
*******************************************************************************************
*  BURNS EFFECT MODULE
*******************************************************************************************
*/

// get the slide index value and the first slide/group bool
var _currentTypeIndex = exports._currentTypeIndex = null;
// this var will have the index of the animation for the main slide corresponding to
// the next/previous slide image

// get the main slide

// get the screen dimensions
var _nextTypeIndex = exports._nextTypeIndex = null;

// create two vars to check if the timer and the animation were started or not
// this because the interaction could start and not change the slide. In that case the
// corrrect instance should be resumed instead of resumin both. If the timer is complete
// then resume the animation, if the timer is not completed
var _timerRunning = exports._timerRunning = false;
var _burnsEffectRunning = exports._burnsEffectRunning = false;

// var for the ken burns animation
var _burnsEffect = exports._burnsEffect = null;

/** Method to toggle the running checkers.	
 *  This is used when the instances start/end
 * 	@param {string} t: the type to toggle
 * 	@param {boolean} v: the value to set
 */
var _setRunningChecker = exports._setRunningChecker = function _setRunningChecker(t, v) {
	switch (t) {
		case "timer":
			exports._timerRunning = _timerRunning = v;
			break;
		case "burns":
			exports._burnsEffectRunning = _burnsEffectRunning = v;
			break;
	} // switch
};

/** Method to create the burns animation.	
 *  Uses the generic and specific animation type, the main slide dimensions
 * 	and the screen dimensions to create the ken burns effect.
 * 	
*/
var _createBurnsEffect = exports._createBurnsEffect = function _createBurnsEffect() {
	// first kill the previous instance
	_burnsEffect ? _burnsEffect.kill() : null;
	exports._burnsEffect = _burnsEffect = null;
	// set the animation as active and the timer as inactive
	exports._timerRunning = _timerRunning = false;
	exports._burnsEffectRunning = _burnsEffectRunning = true;
	// create the new timeline
	// _burnsEffect = new TimelineLite({paused:true});
	// get the data from the main slide object and the animation store to
	// before creating any timer or animation check if the current slide image
	// is loaded or failed. If the image failed do nothing
	if (_slideModule._mainSlide._isLoaded) {
		// the image is loaded get the data to create the animation from the main slide
		// and the animation store
		var _generic = _animationStore2._animationStore.lastGeneric;
		// const testStr = _animationStore.genericAnimations[_generic];
		var _specific = _animationStore2._animationStore.lastSpecific[_animationStore2._animationStore.genericAnimations[_generic]];
		// the duration of the animation
		// set only for vertical and horizontal animations depending on the amount of
		// pixels the image will be translated.
		var _duration = void 0;
		// the animation config object
		var _tweenConfig = void 0;
		// create the animation configurations
		if (_generic === 0) {
			// set the duration, use the vertical position of the main slide
			_duration = _setDuration(Math.abs(_slideModule._mainSlide.y));
			// the animation is vertical, the element is set at the bottom edge of the screen
			// the animation is on the y axis to 0
			_tweenConfig = { y: 0, ease: Power1.easeOut };
		} else if (_generic === 1) {
			// set a constant for the target value
			var _targetXValue = _window.winSize.w - _slideModule._mainSlide.width;
			// set the duration, use the horizontal position of the main slide
			// or the target value, depending on the specific target value
			_duration = _setDuration(_specific === 0 ? Math.abs(_slideModule._mainSlide.x) : Math.abs(_targetXValue));
			// horizontal animation, check the specific value
			_tweenConfig = {
				x: _specific === 0 ? 0 : _targetXValue,
				ease: Power1.easeOut
			};
		} else if (_generic === 2) {
			// for zoom animations the duration is always the same because the final value
			// is a fixed factor of the current scale
			_duration = 8.5;
			// The animation is zoom
			_tweenConfig = {
				pixi: {
					scale: _specific === 0 ? _slideModule._mainSlide._scaleRatio * 1.5 : _slideModule._mainSlide._scaleRatio
				},
				ease: Power2.easeOut
			}; // configuration 
		}
		// create animation instance
		exports._burnsEffect = _burnsEffect = TweenLite.to(_slideModule._mainSlide, _duration, _tweenConfig);
	} // image loaded conditional
};

/** Ken Burns Animation Timer
 *  TweenLite instance that will start the ken burns animation
 * 	instance. When this instance has to re-run, will be with restart(true).	
 * 	The callback will be a method that will create the ken burns tween
 * 	everytime is invoked.
 * 	We add an extra 100 ms to the duration, because the timer will be set
 * 	on the update texture method. After this method is invoked in the interaction
 * 	end part of the code, other code needs to run (including a loop through all
 * 	the stripes), so that extra time gives a buffer to use the entire second in the
 * 	timer while that code runs.	
 * 	Once the timer is complete, it'll call the method to create the ken burns
 * 	animation
*/
var _burnsEffectTimer = exports._burnsEffectTimer = TweenLite.to({}, 0.55, {
	paused: true, onComplete: _createBurnsEffect
});

/** Method to restart the timer.	
 *  In cases such as the first run and a window resize 
 */

/** Pause Method.	
 *  This method pauses the ken burns animation and the timer.	
 * 	It doesn't matter which instance is active, pause both. On resume
 * 	the code will check which one was active when the pause method was called.
 */
var _pauseBurnsEffect = exports._pauseBurnsEffect = function _pauseBurnsEffect() {
	_burnsEffectTimer.pause();
	// if the animation has been created pause it
	_burnsEffect ? _burnsEffect.pause() : null;
};

/** Set Duration Method	
 *  Used to set the duration of the animation for vertical and horizontal
 * 	animations.	
 * 	Takes the amount of pixels the slide will move and sets the duration according
 * 	to that.
 * 	Returns the duration in seconds.
 * 	@param {number} d: the distance in pixels
 */
// create an animation ratio constant, this is the amount of px per second
var _animationPixelsRatio = 45;
var _setDuration = function _setDuration(d) {
	return d / _animationPixelsRatio;
};

/** Resume Method
 *  Used to restart or resume the animation if the min drag value was passed.	
 * 	@param {boolean} v: true if the min drag was passed, false if not
 */
var _resumeBurnsInstances = exports._resumeBurnsInstances = function _resumeBurnsInstances(v) {
	/*	If the min drag was passed (true), then kill both instances (timer and
  *  animation) and create the timer and animation again using the data in the
  * 	animation store and the main slide object.
  * 	If the min drag is not passed, check which instance was running when the 
  * 	pause method was used and resume it.
 */
	if (v) {
		// the min drag was passed, kill the animation instance and stop the timer
		// and set it back to 0
		_burnsEffect ? _burnsEffect.invalidate().kill() : null;
		_burnsEffectTimer ? _burnsEffectTimer.kill() : null;
		// this will restart the timer instance, so we set that as the active running
		exports._timerRunning = _timerRunning = true;
		// restart the timer element
		_burnsEffectTimer.restart();
	} else {
		// min drag not passed check the running instance
		if (_timerRunning) {
			// the timer was running when the pause method was called
			// resume the timer instance
			_burnsEffectTimer.resume();
			return;
		}
		if (_burnsEffectRunning) {
			// the animation was running when paused, resume the animation instance
			_burnsEffectTimer.resume();
			return;
		}
	} // min drag conditional
};

},{"../slide-change-module":24,"../slide-module":25,"../window":37,"./animation-store":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _animationStore = require("./animation-store");

Object.keys(_animationStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _animationStore[key];
    }
  });
});

var _burnsEffectModule = require("./burns-effect-module");

Object.keys(_burnsEffectModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _burnsEffectModule[key];
    }
  });
});

},{"./animation-store":2,"./burns-effect-module":3}],5:[function(require,module,exports){
"use strict";

var _initModule = require("./init-module.js");

var _globalClassModule = require("./global-class-module.js");

var _globalClassModule2 = _interopRequireDefault(_globalClassModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// attach the global class to the global object
/*
*******************************************************************************************
*  MAIN APP MODULE
*******************************************************************************************
*/
window.StreammmSlider = _globalClassModule2.default;

// when the slider is instantiated outside this code, we don't call the init method
// the init method creates the rederer and makes the ajax request, in the case of 
// the public methods, the slider is instantiated using the global class that 
// creates the renderer and when the ajax call has a response with the slides data
// we expose a create slider method and pass the slides data. that mehtod will call the
// ajax response method of the ajax module and that will create all the slider's arrays
// and will allow the user interaction.
// _initAINews();


// import the global class

},{"./global-class-module.js":7,"./init-module.js":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._currentInitStripes = undefined;

var _ajaxModule = require("./ajax-module");

var _window = require("./window");

var _pixiModule = require("./pixi-module.js");

var _slideModule = require("./slide-module.js");

var _textures = require("./textures");

var _slideChangeModule = require("./slide-change-module.js");

var _stripesModule = require("./stripes-module.js");

var _stripes = require("./stripes");

// use this variable to store the position of the image when the user interaction starts
// this in case the ken burns effect was playing when the user interaction started
// let _currentPosition = {};
// get the current slide scale
// let _currentScale = null;

// get the stripes amount 

// get the textures array
// import { _texturesArray } from "./textures-module.js";
// get the current color array index

// get the main renderer
/*
*******************************************************************************************
*  PREVIOUS STRIPES MODULE
*******************************************************************************************
*/
// this module has the code to create the stripes for the previous image
// has the arrays to hold the stripes as references and to drag/animate

/*	The position of the current slide image varies depneding on the ken burns
 *	effect. We need to get that position after the aniamtion is paused and correct
 *	it, in order to get real visible part of the image, in order to create and then
 *	correctly scale the stripes.
 *	We get the main slide's base texture as well as the scale ratio to set the
 *	stripes and it's texture's dimensions, then add them to the stage, the reference
 *	array and finally set the drag/animation order.
 *	Check if the current slide image was loaded, is loading or failed in order to create the
 *	stripes with the image and get the current position of the image, or use the base loading
 *	texture and use (0,0) as the position of the current slide (no burns effect).
*/

// get the amount of slides
var _currentInitStripes = exports._currentInitStripes = function _currentInitStripes() {
	var _isLoaded = _slideModule._mainSlide._isLoaded,
	    texture = _slideModule._mainSlide.texture,
	    _posX = _slideModule._mainSlide.x,
	    _posY = _slideModule._mainSlide.y,
	    _animationType = _slideModule._mainSlide._animationType,
	    _currentScale = _slideModule._mainSlide.scale,
	    _mainSlideHeight = _slideModule._mainSlide.height,
	    _mainSlideWidth = _slideModule._mainSlide.width;

	// base texture height, used to check if the stripe frame will fit in the texture

	var _baseRealHeight = texture.baseTexture.realHeight;
	// base texture real width, used to check if the stripe frame fits in the texture
	var _baseRealWidth = texture.baseTexture.realWidth;

	// check if the current image is loaded
	if (!_isLoaded) {
		/*  Check if this is the last or first slide of the group.
   *  In that case the current stripes will be created in order to move them
   * 	across the screen. If this is not the last or first slide, do nothing
  */
		if (_slideChangeModule._currentSlideIndex === 0 || _slideChangeModule._currentSlideIndex === _ajaxModule._slidesAmount) {
			// create the graphics stripes and add them to the curent init array
			(0, _stripes._createGraphicStripes)(_stripesModule._currentInitArray, 0, _textures._colorsArray[_textures._currentColorIndex]);
			// hide the main slide
			_slideModule._mainSlide.alpha = 0;
		}
		return;
	}
	// hide the main slide
	_slideModule._mainSlide.alpha = 0;

	/* FROM VERSION 2.2.4
  * the final stripe height will be an integer, there's no need to correct
  * the dimensions using toFixed() anymore.
 */
	// corrected height
	var _realStripeHeight = _window._stripeHeight / _currentScale.x;
	// corrected height
	var _realReminderHeight = _window._heightReminder / _currentScale.x;
	// corrected width
	var _realStripeWidth = _window.winSize.w / _currentScale.x;

	/** SET THE START POINTS FOR THE STRIPES	
  *  This depends on the animation type. For vertical and horizontal animations
  * 	the start points are based on the position of the slide considering that
  * 	the anchor point is 0.
  * 	For the zoom animations the anchor point is 0.5 (center of the slide) and
  * 	the slide is positioned to be at the center of the renderer, so we need to
  * 	consider the slide's dimensions and correct them with the current scale after
  * 	the animation has stopped.
 */

	// VERSION 2.1.0 since using different burns effects, we get the same starting position
	// in all cases for the current stripes.
	// check if the animation type is zoom 
	var _startY = _animationType === 2 ? parseFloat((_mainSlideHeight / 2 - _posY) / _currentScale.x) : parseFloat(Math.abs(_posY / _currentScale.x));

	// VERSION 2.1.0 USE THE CORRECTED SCALE RATIO
	// always check the current position due to the different ken burns effects
	// check if the animation is zoom 
	var _startX = _animationType === 2 ? parseFloat((_mainSlideWidth / 2 - _posX) / _currentScale.x) : parseFloat(Math.abs(_posX / _currentScale.x));
	// if the frame width is bigger then correct it
	if (_startX + _realStripeWidth > _baseRealWidth) {
		//console.log("frame width correction");
		//console.log(_startX + _realStripeWidth, _baseRealWidth);
		_realStripeWidth = _baseRealWidth - _startX;
	}

	for (var i = 0; i < _stripesModule._stripesAmount; i++) {
		// the calculated frame start Y point
		var _frameStartY = _startY + _realStripeHeight * i;

		var _newFrame = new PIXI.Rectangle(_startX, _frameStartY,
		// in the final stripe use the reminder height and not the regular height
		_realStripeWidth, i < _stripesModule._stripesAmount - 1 ? _realStripeHeight : _realReminderHeight); // new frame
		// create a new texture
		var _newTexture = new PIXI.Texture(_slideModule._mainSlide.texture.baseTexture, _newFrame);
		// create the new sprite
		var _newStripe = new PIXI.Sprite(_newTexture);
		// add the stripe to the current init array
		_stripesModule._currentInitArray.push(_newStripe); // for now we're adding it to the current stripes
		// set the y position of the stripe
		_newStripe.y = _window._stripeHeight * i;

		// VERSION 2.1.0 USE CORRECTED SCALE
		_newStripe.scale.set(_currentScale.x);

		// add the stripe to the stage
		_pixiModule._stripesStage.addChild(_newStripe);
	} // for loop end
};
// get the method to create graphic stipes

// get the current slide index and the slides group

// get the main slide object

// get window module vars. screen size / stripe height

},{"./ajax-module":1,"./pixi-module.js":18,"./slide-change-module.js":24,"./slide-module.js":25,"./stripes":29,"./stripes-module.js":27,"./textures":35,"./window":37}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._eventEmitter = exports._eventsObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // get the screen dimensions

// import the current slide index

// get the method to create the pixi renderer

// get the method to reset the app's init boolean for the destroy method

// get the current and next reference arrays in order to create the animations
// in the next slide method.

// get the method to create the current init array

// get the method to create the next init array

// get the methods to set the interaction bools

// get the textures array

// import the ajax response method to set the data passed by the create slider method
// and set the slides data in the ajax module.
// normally this is handled by the ajax module, but in this case the server comunication
// is handled elsewhere.

// import the pause method from the animation module. this will be used in the destroy
// method to prevent any type of callback from being trigered

// get the animated preloader

// get the method to reset the text data

// get the hide prompt method


var _window = require("./window");

var _slideChangeModule = require("./slide-change-module.js");

var _pixiModule = require("./pixi-module.js");

var _slideModule = require("./slide-module.js");

var _stripesModule = require("./stripes-module.js");

var _currStripesModule = require("./curr-stripes-module.js");

var _nextStripesModule = require("./next-stripes-module.js");

var _interactionModule = require("./interaction-module");

var _texturesModule = require("./textures-module");

var _ajaxModule = require("./ajax-module.js");

var _animation = require("./animation");

var _loader = require("./loader");

var _textModule = require("./text-module");

var _promptModule = require("./prompt-module");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Events Object.	
 *  This holds all the callbacks set by the public on method of the slider class.	
 * 	Each method is added using a string to identify it as a key on the object and
 * 	the callback is the value.
*/
var _eventsObject = exports._eventsObject = {};

/** Emitter Method.	
 *  This is called in different parts of the code passing a specific type of event,
 * 	which will trigger a callback in an object, if that callback is actually stored
 * 	in the events object.
 * 	@param {string} t: type of event being called
 *  @param {any} a: any data that's passed from the emitter that can be used by the
 * 									code.
*/
var _eventEmitter = exports._eventEmitter = function _eventEmitter(t, a) {
	// check if the type is defined in the events object
	if (_eventsObject[t] !== undefined) {
		a ? _eventsObject[t](a) : _eventsObject[t]();
	}
};

/** Public Slider Class	
 *  The class will create the main slider element in an existing
 * 	canvas element.	
 * 	The constructor creates the renderer and stage, and attachs it to
 * 	the existing canvas tag.	
 * 	The create method gets the slides data returned by the server, passes
 * 	the data to the ajax module and inits the slider creation process.
*/

var StreammmSlider = function () {
	// the slider constructor will call the function to create the render,
	// set the stage as interactive. Also this will take the id of the renderer target
	// as a string
	function StreammmSlider(id) {
		_classCallCheck(this, StreammmSlider);

		(0, _pixiModule.createRenderer)(id);
	}

	/** Create Method	
  *  Public method to create the slider.	
  * 	Takes an array with the slides data and stores it in the app.	
  * 	Creates the main slide and resets the textures array.
  * 	@param {array} d: the data slides array returned by the server.
 */


	_createClass(StreammmSlider, [{
		key: "createSlider",
		value: function createSlider(d) {
			// call the ajax response method in order to set the slides data and 
			// initialize the slider
			(0, _ajaxModule._ajaxResponse)(d);
		}

		/** Destroy Method	
   *  Method used to set the slider to a basic state.	
   * 	This state is setting the main slide with no texture (or the loading texture)
   * 	and alpha to 0, remove all the data from the textures array, set the active
   *	index to 0.	
   * 	Set all the stripes arrays to null (release to GC).
  */

	}, {
		key: "destroySlider",
		value: function destroySlider() {
			// pause the timer and animation
			(0, _animation._pauseBurnsEffect)();
			// set the app init bool to false in order to prevent user interaction 
			// until the slide is created again. In that process, when the textures array
			// is created again, the bool will be set to true.
			(0, _slideModule._resetAppInitBool)(false);

			// reset and hide the text element
			// stop all delayed calls.
			_textModule._parGap ? _textModule._parGap.pause() : null;
			_textModule._addWordDelayedCall ? _textModule._addWordDelayedCall.pause() : null;
			// now reset the texts of the slide
			(0, _textModule._resetTextData)();
			// set the main slide alpha to 0
			// _mainSlide.alpha = 0;


			/////////////////////////////////////////////
			// in order to solve this issue
			// https://websnap.slack.com/files/ndamofli/F6ZLE4J4B/img_2997.png
			// we hide the stripes stage in order to avoid this we hide the stripes
			// stage. Then when the slider is created again after the ajax response
			// we show the stage again. The stripes stage is a PIXI container object
			_pixiModule._stripesStage.alpha = 0;
			// hide the logo and menu button
			_pixiModule._logoStage.alpha = 0;
			// hide the prompt component
			(0, _promptModule._hidePrompt)();
			/////////////////////////////////////////////

			/* show the preloader animation
    * The preloader could be stopped so we play it before showing it
   */
			_loader._preloader.play();
			TweenLite.to(_loader._preloader, 0.1, { alpha: 1 });
			//console.log("show preloader destroy");

			// set the interacion bools to prevent any user interaction, since the renderer
			// and the stage will remain in the slider and the stage receives all the user interaction
			(0, _interactionModule._setInteractionBools)(true);
			// remove all the stripes from the renderer
			// reset the stripes position and opacity and then remove them from memory
			for (var i = 0; i < _stripesModule._stripesAmount; i++) {
				var _hasCurrent = _stripesModule._currentInitArray ? _stripesModule._currentInitArray[i] : null;
				var _hasPrevious = _stripesModule._previousInitArray ? _stripesModule._previousInitArray[i] : null;
				var _hasNext = _stripesModule._nextInitArray ? _stripesModule._nextInitArray[i] : null;

				if (_hasCurrent) {
					TweenLite.killTweensOf(_hasCurrent);
					_hasCurrent.destroy();
				}
				if (_hasPrevious) {
					TweenLite.killTweensOf(_hasPrevious);
					_hasPrevious.destroy();
				}
				if (_hasNext) {
					TweenLite.killTweensOf(_hasNext);
					_hasNext.destroy();
				}
			}
			// set the stripes array to null
			(0, _stripesModule._resetStripesArrays)();
			// destroy the current textures
			_texturesModule._texturesArray.forEach(function (e) {
				e ? e.destroy() : null;
				e ? e.dispose() : null;
			});
			// reset the slides group to 0
			(0, _slideChangeModule._resetSliderGroup)();
		}

		/** Active Slide Method	
   *  Public method that returns the current active slide index.
  */

	}, {
		key: "getActiveSlide",
		value: function getActiveSlide() {
			return _slideChangeModule._currentSlideIndex;
		}
	}, {
		key: "getCurrentGroup",
		value: function getCurrentGroup() {
			return _slideChangeModule._slidesGroup;
		}

		// Public method that returns the image status of the current slide

	}, {
		key: "getLoadedStatus",
		value: function getLoadedStatus() {
			var currentStatus = void 0;
			switch (_slideModule._mainSlide._isLoaded) {
				case true:
					currentStatus = 0;
					break;
				case null:
					currentStatus = 1;
					break;
				case false:
					currentStatus = 2;
					break;
			} // switch
			return currentStatus;
		}

		// public method that returns the screen size

	}, {
		key: "getScreenSize",
		value: function getScreenSize() {
			return _window.winSize;
		}

		/** Next Slide Method	
   *  Public Method to advance to the next slide.
   * 	This method should advance the slider to the next slide.	
   * 	This will be a mix of the interaction start, move and end methods
   * 	of the interaction module.
   * 	Stop the animation and timers. Set the direction to true. Set the
   * 	start stripe index to 0. Set the booleans to prevent user interaction
   * 	while the animation is happening. Create the stripes, the reference arrays
   * 	but not the animation arrays, because the animation is staggered from
   * 	the first stripe of the current and next slide.
  */

	}, {
		key: "nextSlide",
		value: function nextSlide() {
			// even if this method is called with timers and not by user interaction
			// events, we create some conditional logic in order to prevent it from 
			// being called until the animations are completed
			if (!_interactionModule._userInteraction && !_interactionModule._stripesAnimating) {
				// pause all timers and animations

				// set the interaction bools to prevent any user interaction
				// to trigger any method until the stripes animation is complete.
				(0, _interactionModule._setInteractionBools)(true);

				// set the init arrays to empty ones
				(0, _stripesModule._setEmptyArrays)();

				// create the reference arrays
				// since we're goign to the next slide create only the current and next
				(0, _currStripesModule._currentInitStripes)();
				(0, _nextStripesModule._nextInitStripes)();

				// IN VERSION 2.2.3 THE AUTO STRIPES ANIMATION
				// STARTS FROM THE MIDDLE NOT THE FIRST STRIPE
				// RUN THE METHOD TO CREATE THE ANIMATION STRIPES FROM 
				// THE MIDDLE AND USE THOSE ARRAYS TO ANIMATE THE STRIPES
				(0, _stripesModule._createAnimationArray)(_stripesModule._stripesMiddle);

				// set the main slide alpha to 0
				_slideModule._mainSlide.alpha = 0;

				// create the timeline to slide remove the current stripes
				// and animate in the next stripes
				var _removeTimeline = new TimelineLite({
					paused: true,
					onComplete: _interactionModule._resetUserInteraction,
					onCompleteParams: [true]
				});

				// VERSION 2.2.3 USE THE ANIMATION ARRAYS, NOT THE REFERENCE ARRAYS
				_removeTimeline.staggerTo(_stripesModule._currentStripes, 0.2, {
					x: -_window.winSize.w,
					ease: Power2.easeOut
				}, 0.04).staggerTo(_stripesModule._nextStripes, 0.2, {
					x: 0, ease: Power2.easeOut
				}, 0.04, 0).call(_textModule._resetTextData, [true], null, "-=0.1").play();
				//

				// solves #57 https://gitlab.com/rhernandog/ainw-pixi-component/issues/57
				// pause all the text delayed calls
				if (_textModule._parGap) {
					_textModule._parGap.pause().kill();
				};
				if (_textModule._addWordDelayedCall) {
					_textModule._addWordDelayedCall.pause().kill();
				};
			}
		} // next slide method

		/** Fast Forward Method
   * This method sets the fast forward option of the text component.
   * @param {boolean} v the value of the fast forward option
   * @public
  */

	}, {
		key: "setFastForward",
		value: function setFastForward(v) {
			(0, _textModule._setFastForward)(v);
		}

		/** Method to reset the text component
   * Basically set the text component to a start-up state. All data
   * is reset and every timer is paused and then set to undefined.
   * @public
  */

	}, {
		key: "resetTextModule",
		value: function resetTextModule() {
			(0, _textModule._resetTextData)();
			if (_textModule._parGap) _textModule._parGap.pause();
			if (_textModule._addWordDelayedCall) _textModule._addWordDelayedCall.pause();
			if (_textModule._textCompleteTimer) _textModule._textCompleteTimer.pause();
		}

		/** Method to restart the text component
   * Creates the text of the current slide index and starts the
   * text animation from the first word of the first paragraph
   * @param {boolean} processText if the slide text has to be processed
   * 				again. This in case that the slide index is reset to 0 or any
   * 				number different than the number it had when the text component
   * 				was paused.
   * @public
  */

	}, {
		key: "restartTextModule",
		value: function restartTextModule(processText) {
			// if the slide index has changed
			if (processText) (0, _textModule._processSlideText)();
			(0, _textModule._createNewSlideText)();
		}

		/** Method to interrupt the prompt element.
   * @param {string} text the interrupt text to be typed
   * @public
  */

	}, {
		key: "interruptPrompt",
		value: function interruptPrompt(text) {
			(0, _promptModule._interruptPrompt)(text);
		}

		/**
   * Method to check if the burns animation is complete
   * @public
  */

	}, {
		key: "isBurnsComplete",
		value: function isBurnsComplete() {
			if (_animation._burnsEffect) return _animation._burnsEffect.progress() === 1;
			return true;
		}

		/** The On Method.	
   *  Used to attach a callback to a specific event type, that's emitted
   * 	in different parts of the app.
   * 	@param {string} t: the event type
   * 	@param {function} c: the callback that will be invoked by the emitter
  */

	}, {
		key: "on",
		value: function on(t, c) {
			// check if the event type has been registered or not
			if (_eventsObject[t] === undefined && typeof c === "function") {
				_eventsObject[t] = c;
			}
			return this;
		}
	}]);

	return StreammmSlider;
}();

exports.default = StreammmSlider;

},{"./ajax-module.js":1,"./animation":4,"./curr-stripes-module.js":6,"./interaction-module":9,"./loader":12,"./next-stripes-module.js":17,"./pixi-module.js":18,"./prompt-module":20,"./slide-change-module.js":24,"./slide-module.js":25,"./stripes-module.js":27,"./text-module":30,"./textures-module":33,"./window":37}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._initStreammm = undefined;

var _pixiModule = require("./pixi-module.js");

var _ajaxModule = require("./ajax-module.js");

/*
*******************************************************************************************
*  INITIALIZATION MODULE
*******************************************************************************************
*/
/*  This module initializes the application.
 *  Creates the pixi instance and adds it to the DOM
 * 	Adds the public methods to the global window object
 */

/* IMPORTS */
// create pixi instance
var _initStreammm = exports._initStreammm = function _initStreammm() {
	// create the main render
	(0, _pixiModule.createRenderer)();
	// in the react app make ajax request and handle the response there
	(0, _ajaxModule._makeRequest)();
};
// make ajax request
// import the ajax response method for use with the global public methods
// for the react app use the make request method

},{"./ajax-module.js":1,"./pixi-module.js":18}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._setInteractionBools = exports._attachInteractionHandlers = exports._resetUserInteraction = exports._dragAmount = exports._interactionStartY = exports._interactionStartX = exports._direction = exports._stripesAnimating = exports._userInteraction = undefined;

var _window = require("./window");

var _ajaxModule = require("./ajax-module");

var _slideModule = require("./slide-module.js");

var _slideChangeModule = require("./slide-change-module.js");

var _stripesModule = require("./stripes-module.js");

var _stripes = require("./stripes");

var _globalClassModule = require("./global-class-module");

var _texturesModule = require("./textures-module.js");

var _animation = require("./animation");

var _interaction = require("./interaction");

var _textModule = require("./text-module");

var _pixiModule = require("./pixi-module");

// user interaction bool

// get the touch events from the text module

// get the pause method, resume method

// get the public event listeners

// get the methods to create the stripes

// get the init boolean
/*
*******************************************************************************************
*  INTERACTIONS MODULE
*******************************************************************************************
*/
// get the renderer to attach the handlers to the stage
// get the loading base texture
// import { _baseSpriteTexture } from "./pixi-module.js";
// get screen dimensions
var _userInteraction = exports._userInteraction = false;
// stripes animation bool. default false
// this is used to prevent any interaction while the stripes are animating

// get the text stage

// get the double tap event

// get the textures array

// get the current slide index

// get the slides amount
var _stripesAnimating = exports._stripesAnimating = false;
// drag threshold
var _minDrag = 80;
// drag direction, by default true (forward / next slide)
var _direction = exports._direction = true;
// the initial pointer position on the X axis
// this is for setting the drag direction
var _interactionStartX = exports._interactionStartX = void 0;
// the X value of the pointer event on each move event handler
var _currentInteractionX = void 0;
// the initial pointer position on the Y axis
// this is to set the leading stripe
var _interactionStartY = exports._interactionStartY = void 0;
// the current start index of the animations arrays according to the Y value of
// the pointer event
var _currentStartIndex = void 0;
// drag amount for the current/previous slide
// this should be an absolute value, because we need to know if the drag is bigger
// than the threshold regardless of the direction
var _dragAmount = exports._dragAmount = 0;

// var to keep track of the amount of touch events
// helps to check if there are multitouch events on the screen
var _touchAmount = 0;

/** Method to set the user interaction and the stripes animation	
 * 	booleans back to false. This method is called after the stripes
 * 	animation is complete.	
 * 	When the user goes to a previous slide, the main slide texture should be
 * 	updated to the previous texture. When the interaction starts, the main
 * 	slide texture is set to the next texture. In this case before removing the
 * 	previous stripes (move them to the left of the screen no need to update
 * 	the alpha value since the stripes won't be visible), the main slide 
 * 	should be updated to the previous texture (before updating the current
 * 	slide index).	
 * 	If the min drag is not passed, before hiding the current stripes we need
 * 	update the main slide texture to the one in the current index position on
 * 	the textures array.	
 * 	@param {boolean} m: is the distance value bigger than the min drag value
 * 	@param {object} t: the timeline instance invoking the callback
*/
var _resetUserInteraction = exports._resetUserInteraction = function _resetUserInteraction(m) {
	/*	check if the min drag is passed
  *	if the min drag is not passed, we don't update the main slide's texture
  *	in that case the current stripes will be animated back to 0 and after the
  *	animation is complete we remove them, so the main slide will be visible
  *	with the position it had before the interaction started.
  */
	if (m) {
		// the min drag distance is passed
		/* check if the user dragged to the previous slide, in that case we need
   * to update the main slide's texture with the previous texture, only if
   * the current slide is not the first (slide index is not 0)
  */
		if (!_direction && _slideChangeModule._currentSlideIndex !== 0) {
			/* set the base texture for the update main slide texture method
    * the user is going back. If this is the first slide of the group
    * the main slide texture is not updated  and remains hidden, until
    * the next group is ready and the main slide is updated again.
   */
			(0, _slideModule._updateMainSlideTexture)(_texturesModule._texturesArray[_slideChangeModule._currentSlideIndex - 1]);
			// _targetTexture = _currentSlideIndex === 0 ? _baseSpriteTexture : _texturesArray[_currentSlideIndex - 1];
		} else if (_direction && _slideChangeModule._currentSlideIndex < _ajaxModule._slidesAmount) {
			/* the user is going forward, check if this is the last slide on the group.
    * If this is the last slide, we don't update the texture
   */
			(0, _slideModule._updateMainSlideTexture)(_texturesModule._texturesArray[_slideChangeModule._currentSlideIndex + 1]);
		} // direction conditional
		// update the slide index value
		(0, _slideChangeModule._updateIndex)();
		// emitt the slide change callback
		(0, _globalClassModule._eventEmitter)("slidechange");
	} else {
		(0, _stripes._resetGraphicStripesBool)();
		// if the min drag is not passed set the main slide alpha to 1.
		// In this case the current stripes go back to 0 and the main slide
		// stays in the position it had when the interaction started, so there's
		// no need to change anything.
		_slideModule._mainSlide.alpha = 1;
		// console.log( "show main slide reset interaction false" );

		// the min drag wasn't passed, so we resume the burns animation/timer
		// pass false, meaning the method will check the active instance when the
		// interaction started.
		(0, _animation._resumeBurnsInstances)(false);
	} // min drag conditional
	// reset the stripes position and opacity and then remove them from memory
	for (var i = 0; i < _stripesModule._stripesAmount; i++) {
		var _hasCurrent = _stripesModule._currentInitArray ? _stripesModule._currentInitArray[i] : null;
		var _hasPrevious = _stripesModule._previousInitArray ? _stripesModule._previousInitArray[i] : null;
		var _hasNext = _stripesModule._nextInitArray ? _stripesModule._nextInitArray[i] : null;

		if (_hasCurrent) {
			TweenLite.killTweensOf(_hasCurrent);
			_hasCurrent.x = 0;
			_hasCurrent.alpha = 0;
			_hasCurrent.destroy();
		}
		if (_hasPrevious) {
			TweenLite.killTweensOf(_hasPrevious);
			_hasPrevious.x = 0;
			_hasPrevious.alpha = 0;
			_hasPrevious.destroy();
		}
		if (_hasNext) {
			TweenLite.killTweensOf(_hasNext);
			_hasNext.x = 0;
			_hasNext.alpha = 0;
			_hasNext.destroy();
		}
	}
	// reset the drag/animation arrays
	(0, _stripesModule._resetStripesArrays)();
	// in case of going to a previous slide, reset the deafult
	// forward direction in roder to allow the automatic slide change
	exports._direction = _direction = true;
	// reset the drag amount to 0. this because in case the user touches
	// and leaves without moving the pointer, the drag amount will be the
	// same as the previous interaction and could trigger a slide change
	exports._dragAmount = _dragAmount = 0;
	// set the interaction start Y value to 0, in case the next slide 
	// is animated automatically. Like that the stagger effect starts with
	// the first stripe on the top.
	exports._interactionStartY = _interactionStartY = 0;

	// reset the stripes animation bool to allow user interaction
	exports._stripesAnimating = _stripesAnimating = false;
	exports._userInteraction = _userInteraction = false;
	// console.log( `slider ready for interaction. main slide => ${_mainSlide.alpha}` );
}; // reset user interaction

// method to get the amount of stripes in the animation arrays
var _getAnimationStripes = function _getAnimationStripes() {
	if (_stripesModule._currentHasSprites) {
		return _stripesModule._currentStripes.length;
	}
	if (_stripesModule._previousHasSprites) {
		return _stripesModule._previousStripes.length;
	}
	if (_stripesModule._nextHasSprites) {
		return _stripesModule._nextStripes.length;
	}
};

/** METHOD TO DRAG STRIPES	
 *  This method checks the dragged distance and sets the array elements
 * 	and the index of the drag arrays that should be moved.	
 * 	Check the current drag distance, compare it with the min drag distance and
 * 	set the last drag index. This points to the last element that should be moved
 * 	when the user drags.
*/
var _setDragIndex = function _setDragIndex() {
	// set the index
	var _animationStripesAmount = _getAnimationStripes();
	// the element exists in the arrays, so we loop from the first element to this 
	// and set the position for each one. The position is the total drag amount
	// minus the min drag value multiplied by the drag index of the current loop
	var _targetPos = _window.winSize.w;
	for (var i = 0; i < _animationStripesAmount; i++) {
		var _preDistance = _dragAmount - (_minDrag - 1.75 * i) * i;
		// the distance to animate the stripes
		var _dragDistance = _preDistance < 0 ? 0 : _preDistance;
		// set the distance to each stripe depending on the direction
		var _currentMove = _direction ? -_dragDistance : _dragDistance;
		var _previousMove = _direction ? -_targetPos : -_targetPos + _dragDistance;
		var _nextMove = _direction ? _targetPos - _dragDistance : _targetPos;
		// create the animation
		// check if the current animation array has stripes
		_stripesModule._currentStripes[i] ? TweenLite.to(_stripesModule._currentStripes[i], 1.1, {
			x: _currentMove, ease: Elastic.easeOut, force3D: true
		}) : null;
		_stripesModule._previousStripes[i] ? TweenLite.to(_stripesModule._previousStripes[i], 1.1, {
			x: _previousMove, ease: Elastic.easeOut, force3D: true
		}) : null;
		_stripesModule._nextStripes[i] ? TweenLite.to(_stripesModule._nextStripes[i], 1.1, {
			x: _nextMove, ease: Elastic.easeOut, force3D: true
		}) : null;
	} // loop
}; // set drag index

/** Interaction Start Method	
 *  Gets the current pointer position.
 * 	Pauses all animations and timers.
 * 	@param {object} e: the pointer event object
*/
var _interactionStart = function _interactionStart(e) {
	// increase the touch events amount
	_touchAmount++;
	/* the amount of touch events is more than 1, call the interaction
  * end method to reset everything and cancel any touch event.
 */
	if (_touchAmount > 1) {
		// set the drag amount to 0 in order to reset the drag 
		// and touch events
		exports._dragAmount = _dragAmount = 0;
		_interactionEnd();
	}
	// run the code only if the app's init boolean is true and
	// the stripes animation bool is false
	if (_slideModule._appInitialized && !_userInteraction && !_stripesAnimating) {
		// console.log( "touch start!!!" );
		// call the public event listener
		(0, _globalClassModule._eventEmitter)("touchstart", e.data.global);
		// set the interaction bool to true
		exports._userInteraction = _userInteraction = true;
		// pause all timers and animations
		(0, _animation._pauseBurnsEffect)();
		// set the interaction point values
		exports._interactionStartX = _interactionStartX = e.data.global.x;
		exports._interactionStartY = _interactionStartY = e.data.global.y;
		// create stripes arrays (reference and animation)
		(0, _stripesModule._createRefArrays)();
		// to avoid a visual glitch, we set the main slide alpha to 0,
		// like that it becomes transparent. Also this is useful if the user is in
		// the final slide of the group and the user goes forward. Like that when
		// the current stripes are moved, we'll see the background color.
		// _mainSlide.alpha = 0;
	} // app init conditional end
}; // interaction start end

/** Interaction Move Method	
 *  Sets the drag direction and animates the stripes.	
 * 	The current stripes are always animated unless the image of the
 * 	current slide is not loaded, in that case the current stripes are
 * 	not created and we don't animate the current stripes.
*/
var _interactionMove = function _interactionMove(e) {
	// run only if the interaction bool is true
	if (_userInteraction && !_stripesAnimating) {
		// call the public event listener
		(0, _globalClassModule._eventEmitter)("touchmove", e.data.global);
		// store the current X value
		_currentInteractionX = e.data.global.x;
		// set direction
		exports._direction = _direction = _interactionStartX - _currentInteractionX > 0;
		// set drag amount
		exports._dragAmount = _dragAmount = Math.abs(_interactionStartX - _currentInteractionX);
		// move the stripes
		_setDragIndex();
		// check if the start index of the animation array should be changed or stay the
		// same value. This is when the 
		_currentStartIndex = Math.floor(e.data.global.y / _window._stripeHeight);
		if (_currentStartIndex !== _stripesModule._startStripeIndex && _currentStartIndex >= 0 && _currentStartIndex <= _stripesModule._stripesAmount - 1) {
			// the starting index for the animations arrays has changed
			// call the method to create the animations array
			(0, _stripesModule._createAnimationArray)(_currentStartIndex);
			// after creating the animations arrays again, animate the stripes to the 
			// corresponding positions.
			_setDragIndex();
		}
	} // interaction conditional end
}; // interaction move end

/** Interaction End Method
 *  Sets the interaction bool to false
*/
var _interactionEnd = function _interactionEnd(e) {
	// reset the touch amount
	_touchAmount = 0;
	// check if the stripes are not animating and the user interaction is true
	if (!_stripesAnimating && _userInteraction) {
		// call the public event listener
		(0, _globalClassModule._eventEmitter)("touchend");
		// set the stripes animation to true
		exports._stripesAnimating = _stripesAnimating = true;
		// check if the drag threshold was passed and if this is not the first slide
		// of the first group and the user is not going to a previous slide.
		if (_dragAmount > _minDrag) {
			// if this is the first slide of the first group and the user is going back
			// reset the current and next stripes to the normal position
			if (_slideChangeModule._firstSlideGroup && !_direction) {
				var tl = new TimelineLite({
					onComplete: _resetUserInteraction, onCompleteParams: [false]
				}).to(_stripesModule._currentInitArray, 0.2, { x: 0 }).to(_stripesModule._nextInitArray, 0.2, { x: _window.winSize.w }, 0);
				// exit code
				return;
			} // first group conditional end
			// the drag value is bigger than the min. Animate the stripes 
			// depending on the direction (previous / next) the
			// current stripes target value depends on the direction and 
			// the other stripes (next or previous) depend on the direction also.
			var _removeTimeline = new TimelineLite({
				onComplete: _resetUserInteraction, onCompleteParams: [true], paused: true
			});
			_removeTimeline.staggerTo(_stripesModule._currentStripes, 0.25, {
				x: _direction ? -_window.winSize.w : _window.winSize.w,
				ease: Power2.easeOut
			}, 0.04).staggerTo(_direction ? _stripesModule._nextStripes : _stripesModule._previousStripes, 0.25, {
				x: 0, ease: Power2.easeOut
			}, 0.04, 0).call(_textModule._resetTextData, [true], null, "-=0.1").play();
			//
			// pause all the text delayed calls
			if (_textModule._parGap) {
				_textModule._parGap.pause().kill();
			};
			if (_textModule._addWordDelayedCall) {
				_textModule._addWordDelayedCall.pause().kill();
			};
			// set the user interaction to false
			(0, _textModule._setUserInteraction)(false);
			/* // reset the text data in order to prevent the scroll touch events from
   // triggering before the new slide's text is set again
   _resetTextData(true);
   // hide the text stage only if the user goes to a new slide
   _textStage.alpha = 0; */
		} else {
			// the drag value is less than the min, set the current stripes to 0
			var _removeTimeline2 = new TimelineLite({
				paused: true, onComplete: _resetUserInteraction, onCompleteParams: [false]
			});
			var _secondTarget = _direction ? _stripesModule._nextInitArray : _slideChangeModule._firstSlideGroup ? [] : _stripesModule._previousInitArray;
			var _targetPos = _window.winSize.w;
			_removeTimeline2.to(_stripesModule._currentInitArray, 0.15, { x: 0 }).to(_secondTarget, 0.15, { x: _direction ? _targetPos : -_targetPos }, 0).play();
		} // drag amount conditional
	} // stripes animating conditional
}; // interaction end

// attach the event handlers to the render stage
var _attachInteractionHandlers = exports._attachInteractionHandlers = function _attachInteractionHandlers(t) {
	t.on("mousedown", _interactionStart).on("mousedown", _textModule._textTouchStart).on("mousemove", _interactionMove).on("mousemove", _textModule._textTouchMove).on("mouseup", _interactionEnd).on("mouseupoutside", _interactionEnd).on("mouseup", _textModule._textTouchEnd).on("mouseupoutside", _textModule._textTouchEnd).on("touchstart", _interactionStart).on("touchstart", _textModule._textTouchStart).on("touchmove", _interactionMove).on("touchmove", _textModule._textTouchMove).on("touchend", _interactionEnd).on("touchend", _textModule._textTouchEnd).on("touchendoutside", _interactionEnd).on("touchendoutside", _textModule._textTouchEnd).on("tap", _interaction._doubleTap).on("click", _interaction._doubleTap);
	//
}; // attach interaction handlers


/** 
 *  This method will toggle all the interaction and animation bools
 * 	in order to prevent any user interaction.	
 * 	This method will be called from the public next method. Normally
 * 	all the bools are toggle to their respective values in each
 * 	interaction handler, but since the public next method will create the 
 * 	stripes and the reference arrays, set the direction and trigger the 
 * 	the stagger animation, we need an instance to set all the interaction
 * 	bools to those values.
*/
var _setInteractionBools = exports._setInteractionBools = function _setInteractionBools(value) {
	// set the interaction bool to true
	// interaction start
	exports._userInteraction = _userInteraction = value;

	// set the stripes animation to true
	// interaction end
	exports._stripesAnimating = _stripesAnimating = value;

	// we always go forward in the public next method
	exports._direction = _direction = true;
};

},{"./ajax-module":1,"./animation":4,"./global-class-module":7,"./interaction":10,"./pixi-module":18,"./slide-change-module.js":24,"./slide-module.js":25,"./stripes":29,"./stripes-module.js":27,"./text-module":30,"./textures-module.js":33,"./window":37}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tapEventsModule = require("./tap-events-module");

Object.keys(_tapEventsModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tapEventsModule[key];
    }
  });
});

},{"./tap-events-module":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._doubleTap = undefined;

var _globalClassModule = require("../global-class-module");

/** Object Holding the double tap data.	
 *  This object has relevant information to check the time between
 * 	two tap events.
*/
var _lastEvent = null; /*
                       *******************************************************************************************
                       *  TAP EVENTS MODULE
                       *******************************************************************************************
                       */

// get the event emitter
var _doubleTap = exports._doubleTap = function _doubleTap(e) {
	var now = void 0,
	    delta = void 0;
	// get the current instance time number
	now = new Date().getTime();
	// set the difference between the current time and the previous (if defined)
	delta = _lastEvent ? now - _lastEvent : 0;
	var global = e.data.global;

	// check if the time between events is less than the threshold

	if (delta < 300 && delta > 30) {
		// time difference is less than the threshold
		// set the last event to null again so the next tap event will register
		// the time number on the last event and wait for the next event
		_lastEvent = null;
		// trigger the double tap code
		(0, _globalClassModule._eventEmitter)("doubletap", global);
	} else {
		// time is more than the threshold, set the last event to the latest
		_lastEvent = now;
	} // time elapsed conditional
}; // double tap

},{"../global-class-module":7}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logo = require("./logo");

Object.keys(_logo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logo[key];
    }
  });
});

var _menuButton = require("./menu-button");

Object.keys(_menuButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _menuButton[key];
    }
  });
});

var _preloader = require("./preloader");

Object.keys(_preloader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _preloader[key];
    }
  });
});

var _main = require("./main");

Object.keys(_main).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _main[key];
    }
  });
});

},{"./logo":13,"./main":14,"./menu-button":15,"./preloader":16}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._setLogoPosition = exports._createAnimatedLogo = exports._logoPositions = exports._logoSizes = exports._animatedLogo = undefined;

var _pixiModule = require("../pixi-module");

var _animatedLogo = exports._animatedLogo = void 0;
// logo sizes depending on screen height
// export const _logoSizes = [120, 150];
/*
*******************************************************************************************
		ANIMATED LOGO MODULE
*******************************************************************************************
*/

// get the logo stage
var _logoSizes = exports._logoSizes = [0.4, 0.5];
// logo position depending on screen width
var _logoPositions = exports._logoPositions = [-7, 20];

/**
 * Method to add the logo to the logo container.	
 * Passed to the preloader callback in order to create the animated
 * sprite and add it to the container.
 * @private
*/
var _createAnimatedLogo = exports._createAnimatedLogo = function _createAnimatedLogo() {
	// textures array
	var _logoFrames = [];

	for (var i = 0; i < 31; i++) {
		var _value = i < 10 ? "0" + i : i;
		_logoFrames.push(PIXI.Texture.fromFrame("streammm00" + _value + ".png"));
	}; // loop

	exports._animatedLogo = _animatedLogo = new PIXI.extras.AnimatedSprite(_logoFrames);

	// create shadow filter
	// shadow filter only works with webgl, no use in canvas renderer
	// var logoShadow = new PIXI.filters.DropShadowFilter(5, 1, 15, 0x000000, 0.75);

	_animatedLogo.position.set(-7, 0);
	_animatedLogo.animationSpeed = 0.35;
	_animatedLogo.scale.set(0.4);

	// _animatedLogo.filters = [logoShadow];
	_animatedLogo.play();
	// set the logo initial position and size
	_setLogoPosition(0);
	// finally add the logo to the stage
	_pixiModule._logoStage.addChild(_animatedLogo);
};

/**
 * Method to set the logo position.	
 * Takes a number corresponding to the current screen size (the logo
 * position depends on the screen width) and uses that number to select
 * the corresponding position from the position array.	
 * This method is called from the resize emitter in the window resize event.
 * @param {number} d the number of the dimension
 * @private
*/
var _setLogoPosition = exports._setLogoPosition = function _setLogoPosition(d) {
	// check if the animated logo exists. The logo might still be
	// loading when a resize event happens and a breakpoint is passed
	if (_animatedLogo) {
		_animatedLogo.x = _logoPositions[d];
		_animatedLogo.scale.set(_logoSizes[d]);
	}
};

},{"../pixi-module":18}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._addLogo = undefined;

var _logo = require("./logo");

var _menuButton = require("./menu-button");

var _window = require("../window");

var _textModule = require("../text-module");

var _promptModule = require("../prompt-module");

/* This file will create the PIXI loader for the logo and menu button
 * and it'll add the sprites to the respective container (logo stage)
 * after they are loaded.
 * The specficic methods and properties of each element will reside in
 * their own particular files.
*/

/**
 * Method to create the PIXI loader, add the animated logo spritesheet
 * and the menu button image.
 * @private
*/

// get the text component methods

// get the method to add the menu button
var _addLogo = exports._addLogo = function _addLogo() {
	// create the PIXI loader
	var _logoLoader = new PIXI.loaders.Loader();
	_logoLoader.add("logo-sprite", "js/stream-logo-sprite.json") // animated logo
	.add("menu_button", "images/streammm_main_btn.png") // menu button
	.load(_logoLoaded); // callback
};

/**
 * Callback for the PIXI Loader instance.	
 * This is called after the resources are loaded and ready to be
 * used.
 * @param {object} r the resources passed by the PIXI loader
 * @private
*/

// get the prompt component
/*
*******************************************************************************************
		LOADER MODULE MAIN FILE
*******************************************************************************************
*/

// get the method to add the animated logo
var _logoLoaded = function _logoLoaded(r) {
	// create the animated logo
	(0, _logo._createAnimatedLogo)(r);
	// create the menu button
	(0, _menuButton._createMenubutton)(r.resources.menu_button.texture);
	// now set the initial position and size of the logo and button
	(0, _window._checkBreakpoints)();
	// process the text for the first slide
	(0, _textModule._initTextModule)();
	(0, _textModule._processSlideText)();
	(0, _textModule._createNewSlideText)();
	// start the prompt component
	(0, _promptModule._initPrompt)();
};

},{"../prompt-module":20,"../text-module":30,"../window":37,"./logo":13,"./menu-button":15}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._positionButton = exports._menuButtonClick = exports._createMenubutton = exports._menuButton = exports._menuBtnPositions = undefined;

var _window = require("../window");

var _pixiModule = require("../pixi-module");

var _globalClassModule = require("../global-class-module");

// menu button Y AXIS position depending on screen width

// get the logo stage
var _menuBtnPositions = exports._menuBtnPositions = [48, 62];
// get the event emitter
/*
*******************************************************************************************
		MENU BUTTON MODULE
*******************************************************************************************
*/

// get the screen dimensions
var _menuButton = exports._menuButton = void 0;

/**
 * Method to create the menu button.	
 * This is called in the logo loader callback.	
 * Creates the menu button sprite, adds it to the logo container
 * and attach the pointer events to it.
 * @param {object} t the button texture generated by the PIXI loader
 * @private
*/
var _createMenubutton = exports._createMenubutton = function _createMenubutton(t) {
	// create the sprite
	exports._menuButton = _menuButton = new PIXI.Sprite(t);
	_menuButton.width = 25;
	_menuButton.height = 25;
	_menuButton.position.set(_window.winSize.w - 45, 0);

	// set the button to receive events
	_menuButton.interactive = true;
	// attach the click / tap events
	_menuButton.on("click", _menuButtonClick).on("tap", _menuButtonClick).on("touchstart", _menuClickStop).on("mousedown", _menuClickStop);
	//
	// position the button
	_positionButton(0);

	_pixiModule._logoStage.addChild(_menuButton);
};

/** Menu Button Tap / Click event.	
 *  This will trigger an event emitter.
*/
var _menuButtonClick = exports._menuButtonClick = function _menuButtonClick(e) {
	//console.log("menu button click");
	e.stopPropagation();
	(0, _globalClassModule._eventEmitter)("menuclick");
};
// method to prevent tiggering the stripes event
var _menuClickStop = function _menuClickStop(e) {
	return e.stopPropagation();
};

/**
 * Method to set the position of the menu button.	
 * Used on the window resize event.	
 * Takes a number for the current screen width and uses it to select
 * the position from the array with that index.	
 * @param {number} d the number of the current screen dimension
 * @private
*/
var _positionButton = exports._positionButton = function _positionButton(d) {
	_menuButton.x = _window.winSize.w - 45;
	_menuButton.y = _menuBtnPositions[d];
};

},{"../global-class-module":7,"../pixi-module":18,"../window":37}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._createLoader = exports._stopLoaderAnimation = exports._positionLoader = exports._preloaderCompleted = exports._preloader = undefined;

var _window = require("../window");

var _pixiModule = require("../pixi-module");

/*
*******************************************************************************************
*  PRELOADER MODULE
*******************************************************************************************
*/

/* This file will create the PIXI Loader instance for the preloader
 * animated sprite and it'll add it to the main stage
*/

// get the screen dimensions
var _preloader = exports._preloader = void 0;
// var to check if the preloader is done, this to prevent the PIXI
// loader to add the logo animation while the preloader is still 
// being loaded and processed

// get the main renderer
var _preloaderCompleted = exports._preloaderCompleted = false;
var _loaderFrames = [];

/** Method to set the Loader Position.	
 *  Centers the loader into the canvas element
*/
var _positionLoader = exports._positionLoader = function _positionLoader() {
	_preloader.position.set((_window.winSize.w - 320) / 2, (_window.winSize.h - 320) / 2);
};

/**
 * Callback when the loader sprite is loaded
*/
var _loaderLoaded = function _loaderLoaded() {

	// add the images to the frames array
	for (var i = 0; i < 32; i++) {
		var _value = i < 10 ? "0" + i : i;
		_loaderFrames.push(PIXI.Texture.fromFrame("prelaoder0" + _value + ".png"));
	} // loop

	// create the animated sprite
	exports._preloader = _preloader = new PIXI.extras.AnimatedSprite(_loaderFrames);

	_preloader.animationSpeed = 0.35;

	_preloader.play();

	_positionLoader();

	_pixiModule._mainRender.stage.addChild(_preloader);
};

/**
 * Method to stop the loader animation
*/
var _stopLoaderAnimation = exports._stopLoaderAnimation = function _stopLoaderAnimation() {
	_preloader.stop();
};

var _createLoader = exports._createLoader = function _createLoader() {
	PIXI.loader.add("js/stream-preloader-sprite.json").load(_loaderLoaded);
};

},{"../pixi-module":18,"../window":37}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._nextInitStripes = undefined;

var _ajaxModule = require("./ajax-module");

var _window = require("./window");

var _pixiModule = require("./pixi-module.js");

var _stripesModule = require("./stripes-module.js");

var _stripes = require("./stripes");

var _slideChangeModule = require("./slide-change-module.js");

var _texturesModule = require("./textures-module.js");

var _textures = require("./textures");

var _animationStore2 = require("./animation/animation-store");

// get the color rotation

// get the current slide index

// get the stripes amount, middle and method to set the index value

// get the screen dimensions
var _nextScale = null;

/** Method to create the reference array	
 *  Creates the array with all the stripes.	
 * 	Add the stripes to the drag/animation array.	
 * 	Adds the stripes to the renderer's stage.
 * 	The base textures don't have a corrected scale applied because, in case of
 * 	a zoom animation, we need to check the last zoom animation to see if the 
 * 	scale should be the same (zoom in) or it should be increased (zoom out).
 * 	In this method check the texture's animation type and if it's zoom (2)
 * 	then check the last zoom animation in the animation store and according
 * 	to that, apply or not a corrected scale before creating the stripes.
*/

// get the animation store

// get the textures array

// get the graphics stripes method

// get the main renderer and the loading base texture
/*
*******************************************************************************************
*  NEXT STRIPES MODULE
*******************************************************************************************
*/
// this module has the code to create the stripes for the next image
// has the arrays to hold the stripes as references and to drag/animate

// The initial position of the next slide image is always (0,0), so we don't
// need to calculate that. We run the same code used for the previous stripes,
// we get the next base texture (depending on the current slide index, if the
// current slide is the last of the group we don't create the next stripes) and
// it's dimensions, then using the screen size get the scale ratio, set the
// stripes and it's texture's dimensions, add them to the stage, the reference
// array and finally set the drag/animation order.
// get the slides amount
var _nextInitStripes = exports._nextInitStripes = function _nextInitStripes() {
	// creae the var for the base texture
	var _nextBase = void 0,
	    _animationType = void 0,
	    _realHeight = void 0,
	    _realWidth = void 0;
	var _animationStore$lastS = _animationStore2._animationStore.lastSpecific,
	    horizontal = _animationStore$lastS.horizontal,
	    zoom = _animationStore$lastS.zoom;
	// create the vars for the starting points of the stripes

	var _startX = void 0,
	    _startY = void 0;
	// get the screen dimensions
	var _sw = _window.winSize.w,
	    _sh = _window.winSize.h;
	// vars for the corrected size of the stripes

	var _realStripeHeight = void 0;
	var _realHeightReminder = void 0;
	var _realStripeWidth = void 0;
	/*  check if this is the last slide of the group
  *	if we're on the final slide the next base var will be undefined
  *	and in that case will be set to null later in the code and the init array
  *	will be empty.
 */
	if (_slideChangeModule._currentSlideIndex !== _ajaxModule._slidesAmount) {
		// this is not the final slide, so we can use a texture to create the stripes
		_nextBase = _texturesModule._texturesArray[_slideChangeModule._currentSlideIndex + 1];
	} else {
		// the current slide is the last one, do nothing
		return;
	}

	/*  Check if the texture for the current image is loading or failed
  *  In that case call the method to create the stripes using the next
  * 	color in the colors array and stop the code execution.
  * 	That method will create the graphics and add them to the init
  * 	stripes array.
 */
	if (!_nextBase) {
		_nextBase = null;
		/*  get the next color in the colors array, use this to create the
   *	graphics stripes. the params passed to the method are the target
   *	array and HEX color used
  */
		// create the graphics stripes
		// check if this is not the last slide
		if (_slideChangeModule._currentSlideIndex !== _ajaxModule._slidesAmount) {
			// check if the current slide image was loaded or not, this is to prevent
			// using a color that wont match with the color index and that creates a jump
			var _colorIndex = _texturesModule._texturesArray[_slideChangeModule._currentSlideIndex] ? _textures._currentColorIndex : _textures._currentColorIndex + 1;
			(0, _stripes._createGraphicStripes)(_stripesModule._nextInitArray, 2, _textures._colorsArray[_colorIndex]);
		}
		return;
	}
	// the animation type
	var _nextBase2 = _nextBase,
	    _genericAnimationType = _nextBase2._genericAnimationType,
	    _scaleRatio = _nextBase2._scaleRatio,
	    realHeight = _nextBase2.realHeight,
	    realWidth = _nextBase2.realWidth;
	// set the variables used in the conditional statements of the start positions

	_realHeight = realHeight;
	_realWidth = realWidth;
	_animationType = _genericAnimationType;
	// the image loaded, set the scale using the texture
	/*	Get he animation type and the scale ratio for the texture.
 	*  Using the animation type set the final value of the scale.
 	* 	The base texture already has a scale stored in it, in the case of
 	* 	vertical, horizontal or zoom-in animations, use that value.
 	* 	Check the last specific animation in the animation store and 
 	* 	set the starting points and scale of the stripes based on that.
 */

	// correct the animation scale if the animation is zoom out, check the
	// animation type in the texture and the last zoom in the animation store
	_nextScale = _genericAnimationType === 2 && zoom === 0 ? _scaleRatio * 1.5 : _scaleRatio;

	/*	SET THE STARTING POSITIONS OF THE STRIPES
  * 	Depending on the animation type and the last animation set the start
  * 	values for the stripes.
  * 	Use the scaled dimensions of the texture and the screen size to set
  * 	each start point.
  * 	Depending on the generic animation type the calculation required for each
  * 	start point.
 */
	/*  use the scaled dimensions of the base texture.
 	*  Take the natural dimensions of the image and multiply them by the scale
 	* 	being used to make it fit the screen in order to get the real part of
 	* 	the image visible on the screen when the stripes are made.
 */
	// now check the animation type
	if (_animationType === 2) {
		// the animation type is zoom
		// use half of the difference between the scaled texture and the screen
		_startX = (realWidth * _nextScale - _sw) / 2 / _nextScale;
		_startY = (realHeight * _nextScale - _sh) / 2 / _nextScale;
	} else {
		// the animation type is translation (horizontal or vertical)
		// use the difference between the screen and the scaled texture
		_startX = horizontal === 0 ? 0 : -(_sw - realWidth * _nextScale) / _nextScale;
		_startY = (realHeight * _nextScale - _sh) / _nextScale;
		/*	NOTE
   *  In the case of the translate animation, one of the dimensions will
   * 	always match the screen, so that starting point will be 0.
   * 	In the horizontal animation we need to see the last specific animation
   * 	When the animation is from 0 to a negative value (last specific = 1)
   * 	the start X point is 0, regardless of the calculation. When the animation
   * 	is from a negative value to 0 (last specific = 0), the start point is the
   * 	calculated value.
   * 	When the animation is vertical, since there's no specfic types for this, use
   * 	always the calculated value. In the case of a horizontal animation, the 
   * 	scaled height is equal to the screen height so it's always 0.
  */
	}

	// set the real dimensions of the stripes considering the scale applied to the
	// strecthed image.
	// _realStripeHeight = parseFloat((_stripeHeight / _nextScale).toFixed(4));
	// corrected width. the image animation is vertical so it fits the screen width
	// _realStripeWidth = parseFloat((winSize.w / _nextScale).toFixed(4));

	/* FROM VERSION 2.2.4
  * the final stripe height will be an integer, there's no need to correct
  * the dimensions using toFixed() anymore.
 */
	// corrected height
	_realStripeHeight = _window._stripeHeight / _nextScale;
	// set the corrected height reminder for the last stripe
	_realHeightReminder = _window._heightReminder / _nextScale;
	// corrected width
	_realStripeWidth = _window.winSize.w / _nextScale;

	// check if the height of the final stripe is bigger than the texture's height
	/* const _finalFrameHeight = _startY + ( _realStripeHeight * (_stripesAmount - 1) );
 if ( _finalFrameHeight + _realHeightReminder > realHeight ) {
 	console.log( "frame HEIGHT correction" );
 	console.log( _finalFrameHeight + _realHeightReminder, realHeight );
 	_realHeightReminder = realHeight - _finalFrameHeight;
 } */

	// check if the real stripe width has to be corrected
	if (_startX + _realStripeWidth > _realWidth) {
		//console.log("frame width correction");
		//console.log(_startX + _realStripeWidth, realWidth);
		_realStripeWidth = _realWidth - _startX;
	};

	// loop to create the stripes
	for (var i = 0; i < _stripesModule._stripesAmount; i++) {
		// the calculated frame start Y point
		var _frameStartY = _startY + _realStripeHeight * i;
		// FROM VERSION 2.2.4
		// the start y point doesn't need correction
		// check if the start Y point has to be corrected
		// _frameStartY = ( _frameStartY + _realStripeHeight ) > _realHeight ? ( _realHeight - _realStripeHeight ) : _frameStartY;

		// create the frame of the stripes
		var _newFrame = new PIXI.Rectangle(_startX, _frameStartY,
		// in the final stripe use the reminder height and not the regular height
		_realStripeWidth, i < _stripesModule._stripesAmount - 1 ? _realStripeHeight : _realHeightReminder);
		// create the texture
		var _newTexture = new PIXI.Texture(_nextBase, _newFrame);
		// create the new sprite object
		var _newStripe = new PIXI.Sprite(_newTexture);
		// add the stripe to the init array
		_stripesModule._nextInitArray.push(_newStripe);
		// position the stripe
		_newStripe.x = _window.winSize.w;
		_newStripe.y = _window._stripeHeight * i;
		// scale the stripe
		_newStripe.scale.set(_nextScale);
		// add the stripe to the stage
		// _mainRender.stage.addChild( _newStripe );
		_pixiModule._stripesStage.addChild(_newStripe);
	} // stripes loop end
}; // next init stripes

},{"./ajax-module":1,"./animation/animation-store":2,"./pixi-module.js":18,"./slide-change-module.js":24,"./stripes":29,"./stripes-module.js":27,"./textures":35,"./textures-module.js":33,"./window":37}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createRenderer = exports._updateBaseColor = exports._promptStage = exports._textStage = exports._stripesStage = exports._logoStage = exports._baseGraph = exports._baseSpriteTexture = exports._mainRender = undefined;

var _window = require("./window");

var _interactionModule = require("./interaction-module");

var _textures = require("./textures");

var _loader = require("./loader");

// main render variable

// get the color rotation method
/*
*******************************************************************************************
*  PIXI RENDERER MODULE
*******************************************************************************************
*/
/*  
 *  
 */

/* IMPORTS */
var _mainRender = exports._mainRender = void 0;
// the base texture for the slides. this is taken from the graphic
// element.

// get the loader methods

// get interaction handler method
var _baseSpriteTexture = exports._baseSpriteTexture = void 0;

// the graphic used to create the base texture
var _baseGraph = exports._baseGraph = void 0;

// add a new container to store the logo
// this in order to prevent the logo from getting behind the stripes when they
// are added on the user interaction
var _logoStage = exports._logoStage = new PIXI.Container();

// the stripes container, this should be added before the logo container
// in order to keep the logo above the stripes all the time
var _stripesStage = exports._stripesStage = new PIXI.Container();

// the text stage container
var _textStage = exports._textStage = new PIXI.Container();

// the feed container
var _promptStage = exports._promptStage = new PIXI.Container();

/*  private method to create the initial sprite form a graphic
 *	after the sprite is created and added to the renderer the
 *	graphic is removed
*/
var _createBaseSprite = function _createBaseSprite(c) {
	// create the graphic element
	exports._baseGraph = _baseGraph = new PIXI.Graphics();
	_baseGraph.beginFill(c || 0xFFFFFF, 1).drawRect(0, 0, _window.winSize.w, _window.winSize.h).endFill();

	// create texture (this is a pixi texture not a base texture)
	exports._baseSpriteTexture = _baseSpriteTexture = _mainRender.renderer.generateTexture(_baseGraph);
};

/** Method to update the color of the loading texture.	
 *  
*/
var _updateBaseColor = exports._updateBaseColor = function _updateBaseColor() {
	// set the new tint of the graphics
	_createBaseSprite(_textures._colorsArray[_textures._currentColorIndex]);
	// update the base sprite texture
	exports._baseSpriteTexture = _baseSpriteTexture = _mainRender.renderer.generateTexture(_baseGraph);
	// update the texture
	// _mainSlide.texture = _baseSpriteTexture;
};

/* GENERAL METHOD TO CREATE THE PIXI RENDERER */
var createRenderer = exports.createRenderer = function createRenderer(id) {

	// the renderer must go in an existing canvas element
	// const _renderTarget = document.getElementById("main-render");

	exports._mainRender = _mainRender = new PIXI.Application(_window.winSize.w, _window.winSize.h, {
		backgroundColor: 0x00051b,
		forceCanvas: true,
		// view: _renderTarget,
		view: document.getElementById(id),
		autoResize: true,
		resolution: window.devicePixelRatio || 1
	});

	// after creating the main renderer, create the loader animation
	(0, _loader._createLoader)();

	/*  Create the base graphic using the first color of the colors array.
  *  In the touch start event, if the current slide is not loaded, create the
  * 	stripes with the current color. If the next slide is not loaded use the
  * 	next color.
 */
	_createBaseSprite(_textures._colorsArray[_textures._currentColorIndex]);
	// set the renderer stage as interactive
	_mainRender.stage.interactive = true;
	// attach the event handlers to the stage
	(0, _interactionModule._attachInteractionHandlers)(_mainRender.stage);
};

},{"./interaction-module":9,"./loader":12,"./textures":35,"./window":37}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._previousInitStripes = undefined;

var _window = require("./window");

var _pixiModule = require("./pixi-module.js");

var _stripesModule = require("./stripes-module.js");

var _stripes = require("./stripes");

var _slideChangeModule = require("./slide-change-module.js");

var _texturesModule = require("./textures-module.js");

var _textures = require("./textures");

var _animationStore2 = require("./animation/animation-store");

// the scale of the next slide's image

// get the current color array index

// get the current slide index

// get the stripes amount, middle and method to set the index value
/*
*******************************************************************************************
*  PREVIOUS STRIPES MODULE
*******************************************************************************************
*/
// this module has the code to create the stripes for the previous image
// has the arrays to hold the stripes as references and to drag/animate

// The initial position of the previous slide image is always (0,0), so we don't
// need to calculate that.
// We get the next base texture (depending on the current slide index, if the
// current slide is the first of the group we don't create the next stripes) and
// it's dimensions, then using the screen size get the scale ratio, set the
// stripes and it's texture's dimensions, add them to the stage, the reference
// array and finally set the drag/animation order.

// get the screen dimensions
var _previousScale = null;

/** Method to create the previous stripes.	
 *  Creates the stripes and adds them to the main renderer's stage.	
 * 	Adds the stripes to the reference array (init array).
*/

// get the animation store

// get the textures array

// get the method to create graphic stipes

// get the main renderer and the loading base texture
var _previousInitStripes = exports._previousInitStripes = function _previousInitStripes() {
	// set the base texture for the stripes
	var _prevBase = void 0,
	    _animationType = void 0;
	var _animationStore$lastS = _animationStore2._animationStore.lastSpecific,
	    horizontal = _animationStore$lastS.horizontal,
	    zoom = _animationStore$lastS.zoom;
	/*	check if this is the first slide on the group	
  *  we don't do anything if this is the first slide in the group,
  * 	because we'll animate-out the current stripes and that animation
  * 	will create the feeling that we're animating the previous stripes.
 */

	if (_slideChangeModule._currentSlideIndex !== 0) {
		// this is not the first slide, get the texture for the previous
		// from the array
		_prevBase = _texturesModule._texturesArray[_slideChangeModule._currentSlideIndex - 1];
	} // index conditional end
	// check if the texture has been loaded (object) or not
	// (false or null) to set the scale ratio for the stripes
	if (_prevBase) {
		// the image has been loaded, we need to set the scale for the stripes
		// _previousScale = _setTextureScale(_prevBase);


		// the animation type
		var _prevBase2 = _prevBase,
		    _genericAnimationType = _prevBase2._genericAnimationType,
		    _scaleRatio = _prevBase2._scaleRatio;

		_animationType = _genericAnimationType;
		/*	Get he animation type and the scale ratio for the texture.
   *  Using the animation type set the final value of the scale.
   * 	The base texture already has a scale stored in it, in the case of
   * 	vertical, horizontal or zoom-in animations, use that value.
   * 	Check the last specific animation in the animation store and 
   * 	set the starting points and scale of the stripes based on that.
  */
		// correct the animation scale if the animation is zoom out, check the
		// animation type in the texture and the last zoom in the animation store
		_previousScale = _genericAnimationType === 2 && zoom === 0 ? _scaleRatio * 1.5 : _scaleRatio;
	} else {
		// the slide image is not loaded or failed
		// create graphic stripes
		_prevBase = null;
		// check if this is not the first slide
		if (_slideChangeModule._currentSlideIndex !== 0) {
			// check if the current slide image was loaded or not, this is to prevent
			// using a color that wont match with the color index and that creates a jump
			var _colorIndex = _texturesModule._texturesArray[_slideChangeModule._currentSlideIndex] ? _textures._currentColorIndex : _textures._currentColorIndex + 1;
			(0, _stripes._createGraphicStripes)(_stripesModule._previousInitArray, 1, _textures._colorsArray[_colorIndex]);
		}
		return;
	} // slide index conditional

	var _prevBase3 = _prevBase,
	    realHeight = _prevBase3.realHeight,
	    realWidth = _prevBase3.realWidth;
	/*	if this is the first slide of the group, we don't create anything
  *	in this case we don't create animations for the previous slide, just the current one
  *	to avoid using extra memory, because the current stripes will reveal the background
  *	color which will simulate the previous stripes being animated-in.
  *	The position of the previous slide image  will always be the same (0,0)
  *	we don't set the position in variables. The start X position will be 0 for all
  *	the stripes, while the Y position will change depending on the stripe number(loop count).
  *	with the scale ratio, set the real dimensions of the stripes
  *	corrected height of the stripe
 */

	/* FROM VERSION 2.2.4
  * the final stripe height will be an integer, there's no need to correct
  * the dimensions using toFixed() anymore.
 */
	// corrected height

	var _realStripeHeight = _window._stripeHeight / _previousScale;
	// set the corrected height reminder for the last stripe
	var _realHeighReminder = _window._heightReminder / _previousScale;
	// corrected width
	var _realStripeWidth = _window.winSize.w / _previousScale;

	/** SET THE STARTING POSITIONS OF THE STRIPES
  *  Depending on the animation type and the last animation set the start
  * 	values for the stripes.
  * 	Use the scaled dimensions of the texture and the screen size to set
  * 	each start point.
  * 	Depending on the generic animation type the calculation required for each
  * 	start point.
 */
	var _startX = void 0,
	    _startY = void 0;
	// get the screen dimensions
	var _sw = _window.winSize.w,
	    _sh = _window.winSize.h;
	// use the scaled dimensions of the base texture (natural size in line 91, the 
	// scale is corrected in line 75)
	// corrected width and height

	var _corrW = realWidth * _previousScale;
	var _corrH = realHeight * _previousScale;
	// now check the animation type
	if (_animationType === 2) {
		// the animation type is zoom
		// use half of the difference between the scaled texture and the screen
		_startX = (_corrW - _sw) / 2 / _previousScale;
		_startY = (_corrH - _sh) / 2 / _previousScale;
	} else {
		// the animation type is translation (horizontal or vertical)
		// use the difference between the screen and the scaled texture
		_startX = horizontal === 0 ? 0 : -(_sw - _corrW) / _previousScale;
		// _startY = ( _sh - _corrH ) / _previousScale;
		_startY = (_corrH - _sh) / _previousScale;
		/*	NOTE
   *  In the case of the translate animation, one of the dimensions will
   * 	always match the screen, so that starting point will be 0.
   * 	In the horizontal animation we need to see the last specific animation
   * 	When the animation is from 0 to a negative value (last specific = 1)
   * 	the start X point is 0, regardless of the calculation. When the animation
   * 	is from a negative value to 0 (last specific = 0), the start point is the
   * 	calculated value.
   * 	When the animation is vertical, since there's no specfic types for this, use
   * 	always the calculated value. In the case of a horizontal animation, the 
   * 	scaled height is equal to the screen height so it's always 0.
  */
	}

	// check if the height of the final stripe is bigger than the texture's height
	/* const _finalFrameHeight = _startY + ( _realStripeHeight * (_stripesAmount - 1) );
 if ( _finalFrameHeight + _realHeighReminder > realHeight ) {
 	console.log( "frame HEIGHT correction" );
 	console.log( _finalFrameHeight + _realHeighReminder, realHeight );
 	_realHeighReminder = realHeight - _finalFrameHeight;
 } */

	// check if the start x has to be corrected
	if (_startX + _realStripeWidth > realWidth) {
		//console.log("frame width correction");
		//console.log(_startX + _realStripeWidth, realWidth);
		_realStripeWidth = realWidth - _startX;
	}

	// loop to create the stripes
	for (var i = 0; i < _stripesModule._stripesAmount; i++) {
		// the calculated frame start Y point
		var _frameStartY = _startY + _realStripeHeight * i;
		// FROM VERSION 2.2.4
		// the start y point doesn't need correction
		// check if the start Y point has to be corrected
		// _frameStartY = (_frameStartY + _realStripeHeight) > realHeight ? (realHeight - _realStripeHeight) : _frameStartY;

		// create the frame of the stripes
		var _newFrame = new PIXI.Rectangle(_startX, _frameStartY, _realStripeWidth, i < _stripesModule._stripesAmount - 1 ? _realStripeHeight : _realHeighReminder);
		// create the texture
		var _newTexture = new PIXI.Texture(_prevBase, _newFrame);
		// create the new sprite object
		var _newStripe = new PIXI.Sprite(_newTexture);
		// add the stripe to the init array
		_stripesModule._previousInitArray.push(_newStripe);
		// position the stripe
		_newStripe.x = -_window.winSize.w;
		_newStripe.y = _window._stripeHeight * i;
		// scale the stripe
		_newStripe.scale.set(_previousScale);
		// add the stripe to the stage
		_pixiModule._stripesStage.addChild(_newStripe);
	} // loop end
};

},{"./animation/animation-store":2,"./pixi-module.js":18,"./slide-change-module.js":24,"./stripes":29,"./stripes-module.js":27,"./textures":35,"./textures-module.js":33,"./window":37}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promptImage = require("./prompt-image");

Object.keys(_promptImage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _promptImage[key];
    }
  });
});

var _promptText = require("./prompt-text");

Object.keys(_promptText).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _promptText[key];
    }
  });
});

var _promptInterrupt = require("./prompt-interrupt");

Object.keys(_promptInterrupt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _promptInterrupt[key];
    }
  });
});

},{"./prompt-image":21,"./prompt-interrupt":22,"./prompt-text":23}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._animateLogos = exports._preloadLogos = exports._createLogoTexture = exports._logosMask = exports._logosContainer = undefined;

var _ajaxModule = require("../ajax-module");

var _slideChangeModule = require("../slide-change-module");

/* The logos container
 * Add all the logos and graphic backrounds for each logo.
*/
// get the slides data
var _logosContainer = exports._logosContainer = new PIXI.Container();
/* The logos background graphic.
 * This will be behind the logos and in it we'll draw a square with
 * the background color for each logo.
*/

// get the current slide index
var _logosBackground = new PIXI.Graphics();
// add the logos background
_logosContainer.addChild(_logosBackground);

/* For the logo animation we set a graphics as the mask
 * for the logo sprites.
*/
var _logosMask = exports._logosMask = new PIXI.Graphics();
_logosMask.drawRect(0, 0, 26, 26);
_logosMask.position.set(0, -2);

// apply the mask to the logos container
_logosContainer.mask = _logosMask;

/** Method to create the texture for each logo
 * Creates the texture and checks if the image was loaded or not.
 * Adds the texture when loaded.
 * @param {string} u the url of the logo
 * @param {string} c the background color of the logo
 * @param {number} i the index position of the url
 * @private
*/
var _createLogoTexture = exports._createLogoTexture = function _createLogoTexture(u, c, i) {
	/* Before creating the texture draw the background rectangle
  * for this logo using the color and the index value
 */
	_logosBackground.beginFill(c.replace("#", "0x")).drawRect(0, 26 * i, 26, 26).endFill();
	//
	// create the texture
	var _logoTexture = new PIXI.Texture.fromImage(u, true);
	var _base = _logoTexture.baseTexture;
	// check if the image was loaded
	_base.on("loaded", function (t) {
		var realWidth = t.realWidth,
		    realHeight = t.realHeight;
		/* Some logos have the same dimensions (height/width), but others don't
   * Check if the logo is square or not and add to the texture in the array
   * a ratio for the logo image to be applied when the texture is updated.
  */
		// create the ratio for this logo

		var _logoRatio = parseFloat(Math.min(26 / realWidth, 26 / realHeight));
		// now create the new sprite, apply the ratio and add it to the container
		var _newLogo = new PIXI.Sprite.from(t);
		_newLogo.scale.set(_logoRatio);
		// position the logo
		_newLogo.y = 26 * i;
		// add it to the container
		_logosContainer.addChild(_newLogo);
	}).on("error", function () {
		//console.log("error => ", i);
		// just replace the null value with false
	});
	// 
};

/** Method to preload the logos images.
 * This starts preloading the images and draws the background graphics
 * @private
*/
var _preloadLogos = exports._preloadLogos = function _preloadLogos() {
	// clear the background graphics
	_logosBackground.clear();
	// set the position of the container to the initial one
	_logosContainer.position.set(0, -2);
	// preload each image
	_ajaxModule._slidesData.forEach(function (e, i) {
		_createLogoTexture(e.slideLogo, e.logoColor, i);
	}); // loop
};

/** Method to animate the logos
 * Moves the entire logos container
 * @private
*/
var _animateLogos = exports._animateLogos = function _animateLogos() {
	TweenLite.to(_logosContainer, 0.25, { y: -(26 * _slideChangeModule._currentSlideIndex + 2) });
};

},{"../ajax-module":1,"../slide-change-module":24}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._interruptTypeEffect = exports._interruptPrompt = exports._interruptTimer = exports._interruptText = exports._promptInterrupted = undefined;

var _promptText2 = require("./prompt-text");

/* Boolean to check if the interrupt method has been called.
 * This will be used by the add character method in order to
 * see if it uses the interrupt text or the interrupt text.
*/
var _promptInterrupted = exports._promptInterrupted = false;
/* The interrupt text. This will be used by the add character method
 * to type the interrupt text after removing the current text in the prompt.
*/
/*
*******************************************************************************************
		METHODS AND VARIABLES FOR THE PROMPT INTERRUPT METHOD
*******************************************************************************************
*/
// get the methods
var _interruptText = exports._interruptText = null;

// the visible text
var _interruptString = "";

// specific timer for the interrupt text
var _interruptTimer = exports._interruptTimer = null;

// the current letter index
var _currentLetter = 0;

/** The interrupt method
 * Split the interrupt text in characters and store it in the interrupt
 * text variable. This will be used in the add character method to type
 * the interrupt message.
 * @param {string} text the text that should be typed in the prompt
 * @private
*/
var _interruptPrompt = exports._interruptPrompt = function _interruptPrompt(text) {
	// pause the prompt
	(0, _promptText2._pausePrompt)();
	// set the direction to false in order to remove the current text
	(0, _promptText2._setPromptDirection)(false);
	// set the interrupt bool to true
	exports._promptInterrupted = _promptInterrupted = true;
	// set the text
	exports._interruptText = _interruptText = text.split("");
	// reset the interrupt string
	_interruptString = "";
	// reset the value of the current letter
	_currentLetter = 0;
	// reset the timer
	exports._interruptTimer = _interruptTimer = null;
	// call the interrupt type method
	(0, _promptText2._addNewCharacter)();
};

/** Method for the interrupt type effect
 * @private
*/
var _interruptTypeEffect = exports._interruptTypeEffect = function _interruptTypeEffect() {
	if (_interruptText[_currentLetter] !== undefined) {
		// the next/previous letter exists, we add it to the text
		// background color #FF3737
		if (_promptText2._promptDirection) {
			_interruptString = _interruptString.concat(_interruptText[_currentLetter]);
			_currentLetter++;
		} else {
			_interruptString = _interruptString.slice(0, -1);
			_currentLetter--;
		}
		// apply the text to the PIXI element
		_promptText2._promptText.text = _interruptString;
		// draw the background
		_promptText2._promptBackgorund.clear().beginFill(0xFF3737).drawRect(0, -2, _promptText2._promptText.width + 10, 26).endFill();
		//
		// restart create the timer
		exports._interruptTimer = _interruptTimer = TweenLite.delayedCall(_promptText2._promptSpeed, _interruptTypeEffect).pause();
		_interruptTimer.restart(true);
	} else {
		/* Check the direction. If the text goes forward, then we call the add new character
   * method and go back to the normal prompt behaviour.
   * If the text goes back, then we remove the interrupt text.
  */
		if (_promptText2._promptDirection) {
			(0, _promptText2._setPromptDirection)(false);
			_currentLetter--;
			// the direction is back, the entire prompt text has been typed
			// wait two seconds and call this method again
			exports._interruptTimer = _interruptTimer = TweenLite.delayedCall(_promptText2._promptGap, _interruptTypeEffect).pause();

			_interruptTimer.restart(true);
		} else {
			(0, _promptText2._setPromptDirection)(true);
			// toggle the interrupted boolean
			exports._promptInterrupted = _promptInterrupted = false;
			// the direction is forward, all the interrupt text has been removed
			// call the add new character and leave this code
			(0, _promptText2._addNewCharacter)();
		}
	} // letter undefined conditional
};

},{"./prompt-text":23}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._initPrompt = exports._addNewCharacter = exports._createCurrentPromptString = exports._restartPrompt = exports._hidePrompt = exports._pausePrompt = exports._resetPromptText = exports._positionPrompt = exports._setPromptDirection = exports._promptGap = exports._promptSpeed = exports._visiblePromptText = exports._promptDirection = exports._promptBackgorund = exports._promptText = undefined;

var _ajaxModule = require("../ajax-module");

var _slideChangeModule = require("../slide-change-module");

var _pixiModule = require("../pixi-module");

var _promptImage = require("./prompt-image");

var _promptInterrupt = require("./prompt-interrupt");

var _window = require("../window");

// the feed text styles

// get the prompt interrupt

// get the feed container
/*
*******************************************************************************************
		FEED TEXT MODULE
*******************************************************************************************
*/
// get the slides data
var _promptTextStyles = {
	fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",
	fontSize: 14,
	lineHeight: 32,
	fill: "#FFFFFF"
};

// create the text element	

// get the screen dimensions

// get the prompt logo sprites

// get the current slide index
var _promptText = exports._promptText = new PIXI.Text();
// set the styles for the prompt
_promptText.style = _promptTextStyles;
// create the text background
var _promptBackgorund = exports._promptBackgorund = new PIXI.Graphics();

/* The feed info is splitted into an array of strings, from 1 string
 * to as many as the feed info could have.
 * If this array has just one string for the current slide, after that is
 * typed the effect is stopped.
 * If the array has 2 or more strings the app loops between the strings in
 * the array until the user or the app changes to a new slide.
*/
var _promptStrings = void 0;
/* Amount of strings in the array
 * In the type effect method, check for this value.
*/
var _stringsAmount = 0;
// the direction of the typing effect
var _promptDirection = exports._promptDirection = true;
// the current srting index, valid only if the array has more than one
// string. By default is 0.
var _currentStringIndex = 0;
// the text that's dislpayed in the feed text
// letters are added to this and then applied to the feed text element
var _visiblePromptText = exports._visiblePromptText = "";
// this is the current character index
var _currentCharIndex = 0;
// time between each character in seconds
var _promptSpeed = exports._promptSpeed = 0.018;//was 0.02
// time between prompt strings in seconds
var _promptGap = exports._promptGap = 2;
// character timer
var _promptTimer = void 0;

/** Method to set the direction
 * @param {boolean} v the value to be set
 * @private
*/
var _setPromptDirection = exports._setPromptDirection = function _setPromptDirection(v) {
	exports._promptDirection = _promptDirection = v;
};

/** Method to position the feed container
 * The container position is relative to the screen size (20% left)
 * so on the screen resize event the container has to be positioned again.
 * The y position is the height of the element (26) plus the set distance (17)
 * @private
*/
var _positionPrompt = exports._positionPrompt = function _positionPrompt() {
	// set the position
	_pixiModule._promptStage.position.set(_window.winSize.w * 0.18, _window.winSize.h - 44);
};

/** Method to reset the feed text values
 * @private
*/
var _resetPromptText = exports._resetPromptText = function _resetPromptText() {
	exports._visiblePromptText = _visiblePromptText = "";
	_currentCharIndex = 0;
	// reset the strings array
	_promptStrings = null;
	// reset the current string index
	_currentStringIndex = 0;
	// set the direction to forward
	exports._promptDirection = _promptDirection = true;
};

/** Method to pause the feed component
 * Pauses the timer
 * @private
*/
var _pausePrompt = exports._pausePrompt = function _pausePrompt() {
	_promptTimer.pause().kill();
};

/** Method to hide the feed
 * Can be used for showing the settings screen and when a new group
 * is requested.
 * @private
*/
var _hidePrompt = exports._hidePrompt = function _hidePrompt() {
	// pause and hide the feed component
	_pausePrompt();
	_pixiModule._promptStage.alpha = 0;
};

/** Method to restart the prompt component
 * @param {boolean} show if the prompt stage is hidden or not
 * @private
*/
var _restartPrompt = exports._restartPrompt = function _restartPrompt(show) {
	if (_promptTimer) _promptTimer.pause().kill();
	// just in case the prompt interrupt could be running
	if (_promptInterrupt._interruptTimer) _promptInterrupt._interruptTimer.pause().kill();
	// first reset the component
	_resetPromptText();
	// create the string for the current slide
	_createCurrentPromptString(_ajaxModule._slidesData[_slideChangeModule._currentSlideIndex].feed, _ajaxModule._slidesData[_slideChangeModule._currentSlideIndex].time);
	// if the prompt stage was hidden, show it now
	// in case of a group change
	if (show) _pixiModule._promptStage.alpha = 1;
	// start the type effect
	_addNewCharacter();
	// animate the logos
	(0, _promptImage._animateLogos)();
};

/** Method to create the current slide string
 * Takes the feed name and creates an array with each character.
 * @param {string} name the feed name
 * @private
*/
var _createCurrentPromptString = exports._createCurrentPromptString = function _createCurrentPromptString(name, time) {
	// create the strings array
	// each string is also broke into it's own array of letters and spaces
	// so we end with an array of arrays
	_promptStrings = name.split("|");
	// now create the characters arrays
	_promptStrings.forEach(function (s, i) {
		// replace each string in the array for an array of the characters
		_promptStrings.splice(i, 1, s.trim().split(""));
	});
	// add the time string to the array
	_promptStrings.push(time.split(""));
	// console.log( _promptStrings );
	// set the amount of strings of the current slide
	_stringsAmount = _promptStrings.length;
};

/** Method to animate the feed text
 * @private
*/
var _addNewCharacter = exports._addNewCharacter = function _addNewCharacter() {
	/* Check if the interrupt method is going to start typing a message.
  * When the interrupt method is called, the regular type effect goes
  * back and removes the current text. When the interrupt boolean is
  * set to true and the direction is forward we stop this method and
  * the timer. When the interrupt type effect is complete and the text
  * is removed, it will call the add new character method again and
  * the normal type effect will start.
 */
	if (_promptInterrupt._promptInterrupted && _promptDirection) {
		(0, _promptInterrupt._interruptTypeEffect)();
		return;
	}
	/* if the string has a character for the current char index
  * then add that char to the text
 */
	if (_promptStrings[_currentStringIndex][_currentCharIndex] !== undefined) {
		// depending on the typing direction, add or remove a character from the string
		if (_promptDirection) {
			// going forward
			// add a character
			exports._visiblePromptText = _visiblePromptText = _visiblePromptText.concat(_promptStrings[_currentStringIndex][_currentCharIndex]);
			// increase the character index
			_currentCharIndex++;
		} else {
			// going back
			// remove a character
			exports._visiblePromptText = _visiblePromptText = _visiblePromptText.slice(0, -1);
			// decrease the character index
			_currentCharIndex--;
		}
		// apply the new string to the text element
		_promptText.text = _visiblePromptText;
		// draw the background
		_promptBackgorund.clear().beginFill(0x00051b).drawRect(0, -2, _promptText.width + 10, 26).endFill();
		//
		// restart the timer if it exists or create and start it
		_promptTimer = TweenLite.delayedCall(_promptSpeed, _addNewCharacter).pause();
		_promptTimer.restart(true);
	} else if (_promptStrings[_currentStringIndex][_currentCharIndex] === undefined) {
		/* there are no more characters in the current string
   * toggle the type direction boolean in order to, either add new characters
   * for the next string or remove characters from the current string
  */
		exports._promptDirection = _promptDirection = !_promptDirection;
		// depending on the direction increase or decrease the char index
		_promptDirection ? _currentCharIndex++ : _currentCharIndex--;
		/* if the current char is the first of the string we move into another
   * string. if the current string plus one is equal to the amount of strings
   * we set the string index to 0, otherwise we increase it by 1
  */
		if (_currentCharIndex === 0) {
			_currentStringIndex = _currentStringIndex + 1 === _stringsAmount ? 0 : _currentStringIndex + 1;
			// don't restart the timer, just add a new character
			_addNewCharacter();
		} else {
			/* This is the final character of the string and the type effect is
    * forward, the type is starting to go back, so we wait 2 seconds
    * before removing the string
   */
			_promptTimer = TweenLite.delayedCall(_promptGap, _addNewCharacter).pause();
			_promptTimer.restart(true);
		} // character index 0 conditional
	} // character unedfined conditional
}; // add new character method

/** Method to init the feed
 * Resets the feed info and starts the feed when the app
 * is started, a new slide is shown, a new group has been loaded
 * @private
*/
var _initPrompt = exports._initPrompt = function _initPrompt() {
	// add the logo container
	_pixiModule._promptStage.addChild(_promptImage._logosContainer);
	// add the sprites mask
	_pixiModule._promptStage.addChild(_promptImage._logosMask);
	// add the prompt background
	_pixiModule._promptStage.addChild(_promptBackgorund);
	// add the text and logo components to the stage
	_pixiModule._promptStage.addChild(_promptText);
	// position the logo container
	_promptImage._logosContainer.position.set(0, -2);
	_promptText.position.set(34, 3);
	_promptBackgorund.position.set(27, 0);
	// set the position
	_positionPrompt();
	// the feed container could be hidden
	_pixiModule._promptStage.alpha = 1;
	// start the prompt component
	_restartPrompt();
};

},{"../ajax-module":1,"../pixi-module":18,"../slide-change-module":24,"../window":37,"./prompt-image":21,"./prompt-interrupt":22}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._resetSliderGroup = exports._updateIndex = exports._firstSlideGroup = exports._slidesGroup = exports._currentSlideIndex = undefined;

var _ajaxModule = require("./ajax-module");

var _slideModule = require("./slide-module");

var _interactionModule = require("./interaction-module");

var _textures = require("./textures");

var _stripes = require("./stripes");

var _pixiModule = require("./pixi-module");

var _loader = require("./loader");

var _textModule = require("./text-module");

var _promptModule = require("./prompt-module");

var _globalClassModule = require("./global-class-module");

// current slide index

// get the prompt component

// get the loader

// get the graphics stripes bool

// get the drag direction
/*
*******************************************************************************************
*  SLIDES CHANGE MODULE
*******************************************************************************************
*/
/*	This module handles all the methods to update the index of the slides  
 *	The methods are exported and used by the interaction module
 */
// get ajax elements
// PARTIAL DEV NOTES the ajax response is imported just to be used 
// from the public events. it should be removed from this in the react app.
var _currentSlideIndex = exports._currentSlideIndex = 0;
// current slides group

// import the callback set by the public methods, that should be
// called when a new group is needed

// get the method to process the slide text

// get the stripes stage

// get the color index update method

// get slides elements
var _slidesGroup = exports._slidesGroup = 0;
// bool to indicate the first slide of the first group
// at startup is true.
// this is used to prevent the user from going to a previous slide 
// or drag to the right of the screen, when the current slide is 
// the first slide of the fisrt group
// This is updated when the update index method finishes and before 
var _firstSlideGroup = exports._firstSlideGroup = true;

/* var to check if a new group is being loaded.
 * This is necessary 
*/

/** Method for the text component operations
 * after a slide change.
 * @private
*/
var _updateTextComponent = function _updateTextComponent() {
	// pause all the text delayed calls
	if (_textModule._parGap) {
		_textModule._parGap.pause().kill();
	};
	if (_textModule._addWordDelayedCall) {
		_textModule._addWordDelayedCall.pause().kill();
	};
	// reset the text data in order to prevent the scroll touch events from
	// triggering before the new slide's text is set again
	(0, _textModule._resetTextData)(true);
	// hide the text stage only if the user goes to a new slide
	_pixiModule._textStage.alpha = 0;
};

/** Method to make a new ajax request and	
 *  set the app init bool to false in order to prevent
 * 	a user interaction while a new set of slides is loading
*/
var _newRequestInitReset = function _newRequestInitReset() {
	// set the app init bool to false, in order to prevent an user
	// interaction before the slides data is returned from the server.
	(0, _slideModule._resetAppInitBool)(false);
	// make a new ajax request after increasing the slide group value
	// _makeRequest();


	/////////////////////////////////////////////
	// in order to solve this issue
	// https://websnap.slack.com/files/ndamofli/F6ZLE4J4B/img_2997.png
	// we hide the stripes stage in order to avoid this we hide the stripes
	// stage. Then when the slider is created again after the ajax response
	// we show the stage again. The stripes stage is a PIXI container object
	_pixiModule._stripesStage.alpha = 0;
	// hide the logo and menu button
	_pixiModule._logoStage.alpha = 0;
	// hide the main slide
	_slideModule._mainSlide.alpha = 0;
	// hide the text stage in order to hide the text and background
	// solves issue #54. https://gitlab.com/rhernandog/ainw-pixi-component/issues/54
	_pixiModule._textStage.alpha = 0;
	/////////////////////////////////////////////


	/* show the preloader animation
  * The preloader could be stopped so we play it before showing it
 */
	if (_loader._preloader) {
		_loader._preloader.play();
	}
	TweenLite.to(_loader._preloader, 0.1, { alpha: 1 });
	// console.log( "show preloader" );

	// in this part of the development the ajax request is handled outside the
	// slider and, while this method is still called internally, is used only to
	// reset the app's init bool. instead of making a new request, call a public
	// callback, set outside the slider, in order to trigger the new ajax call
	(0, _globalClassModule._eventEmitter)("newgroup");
};

/** Update Index Method	
 * 	This changes the index value of the current and previous slides.
 * 	Is executed after the slide animation is complete.
 * 	After updating the index value and if a new group is not required,
 * 	process the text of the new slide 
*/
var _updateIndex = exports._updateIndex = function _updateIndex() {
	// console.log( `updating index. main slide => ${_mainSlide.alpha}` );
	// check the drag direction
	if (_interactionModule._direction) {
		// going to the next slide
		// check if this is the last slide on the group
		if (_currentSlideIndex < _ajaxModule._slidesAmount) {
			_updateTextComponent();
			// not the last slide, increase the current slide index
			exports._currentSlideIndex = _currentSlideIndex += 1;
			// now create the text for the new slide
			(0, _textModule._processSlideText)();
			(0, _textModule._createNewSlideText)();
			// update the prompt component
			(0, _promptModule._restartPrompt)();
		} else {
			_updateTextComponent();
			// new group, hide and reset the prompt component
			(0, _promptModule._hidePrompt)();
			(0, _promptModule._resetPromptText)();
			// this is the last slide, reset the slide index to 0
			exports._currentSlideIndex = _currentSlideIndex = 0;
			// increase the slides group value by 1
			exports._slidesGroup = _slidesGroup += 1;
			// new request and set the init bool to false
			_newRequestInitReset();
		} // current index conditional end 
	} else {
		// going to the previous slide
		// check if this is the first slide
		if (_currentSlideIndex > 0) {
			_updateTextComponent();
			// this is not the first slide, reduce the slide index
			exports._currentSlideIndex = _currentSlideIndex -= 1;
			// now create the text for the new slide
			(0, _textModule._processSlideText)();
			(0, _textModule._createNewSlideText)();
			// update the prompt component
			(0, _promptModule._restartPrompt)();
		} else if (_currentSlideIndex === 0 && _slidesGroup > 0) {
			// new group, hide and reset the prompt component
			(0, _promptModule._hidePrompt)();
			(0, _promptModule._resetPromptText)();
			_updateTextComponent();
			// this is the first slide and not the first group
			// if this is the first group nothing should happen
			// set the index to the slides amount
			exports._currentSlideIndex = _currentSlideIndex = _ajaxModule._slidesAmount;
			// reduce the slide group
			exports._slidesGroup = _slidesGroup -= 1;
			// new request and set the init bool to false
			_newRequestInitReset();
		} // current index conditional end
	} // direction conditional end

	/*  check if graphic stripes were created and if the current slide image
  *	was loaded in order to update the current color array index.
  *  We check the main slide because if the graphic stripes are created for
  * 	the previous or next slide image, then the same color used to create 
  * 	the stripes should be used for the graphic base texture when the main
  * 	slide texture is updated to a solid color. Otherwise there will be a
  * 	jump in the color on the touch start method.
 */
	if (_stripes._graphicStripesCreated && _slideModule._mainSlide._isLoaded) {
		(0, _textures._rotateColor)();
	}

	// after updating the current index, check if this is the first slide
	// of the first group in order to set the bool to true or false
	exports._firstSlideGroup = _firstSlideGroup = _currentSlideIndex === 0 && _slidesGroup === 0;
}; // update index end


/** Group Reset Method	
 *  When the slider is destroyed, the slides group must be set to 0.	
 * 	Also the first slide group bool should be set to true again
*/
var _resetSliderGroup = exports._resetSliderGroup = function _resetSliderGroup() {
	exports._slidesGroup = _slidesGroup = 0;
	exports._currentSlideIndex = _currentSlideIndex = 0;
	exports._firstSlideGroup = _firstSlideGroup = true;
};

},{"./ajax-module":1,"./global-class-module":7,"./interaction-module":9,"./loader":12,"./pixi-module":18,"./prompt-module":20,"./slide-module":25,"./stripes":29,"./text-module":30,"./textures":35}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._resetAppInitBool = exports._createMainSlide = exports._centerMainSlide = exports._updateMainSlideTexture = exports._positionMainSlide = exports.testSprite = exports._mainSlide = exports._appInitialized = undefined;

var _spritesModule = require("./sprites-module");

var _pixiModule = require("./pixi-module");

var _window = require("./window");

var _animation = require("./animation");

var _loader = require("./loader");

// get the preloader
// import { _preloader } from "./loader";

// use this to prevent interactions until the textures are added to the array

// get main renderer

// get the screen dimensions
/*
*******************************************************************************************
*  SLIDES MODULE
*******************************************************************************************
*/
/*  This module creates the slides with a private method.
 *  Takes the slides data generated in the ajax module or in an ajax call
*/

// get sprites methods
var _appInitialized = exports._appInitialized = false;
// the main slide var

// get the method to add the logo
// import { _addLogo } from "./logo-module";

// get the animation store

// get loading sprite
var _mainSlide = exports._mainSlide = void 0;

var testSprite = exports.testSprite = void 0;

/** Method to Position the Main Slide	
 *  This method takes the animation data from the base texture and depending
 * 	on that, positions the main slide.	
 * 	Vertical effect, the main slide is set at the bottom edge of the screen.	
 * 	Horizontal effect, the main slide is set to the left or right edge of the
 * 	screen.	
 * 	Zoom effect, the main slide is set at the middle of the screen and also the
 * 	anchor point is set to 0.5 in order to make the zoom effect from the middle
 * 	of the slide.	
 * 	In order to decide to use zoom in/out or horizontal left/right, check the last
 * 	specific animation type from the animation store.
 * 	@param {object} b: the base texture for the current slide index.
 * 	@param {number} ls: the last specific animation from the animation store
*/
var _positionMainSlide = exports._positionMainSlide = function _positionMainSlide(b, ls) {
	/*	The main slide must be at (0,0) position in order to then position it correctly
  *  after getting the generic animation type.
  * 	Set the position of the main slide to (0,0) and the anchor point to 0.
 */
	_mainSlide.position.set(0);
	_mainSlide.anchor.set(0);

	// store the texture's generic animation type integer
	var _baseGenericType = b._genericAnimationType;

	// depending on that value position the main slide
	switch (_baseGenericType) {
		case 0:
			// vertical animation. Animate from bottom. position main slide to a 
			// negative y value
			// get main value. the main slide is already scaled to fit the screen
			// so is the screen size minus the main slide height
			// _mainSlide.y = winSize.h - _mainSlide.height;
			_mainSlide.position.set(0, _window.winSize.h - _mainSlide.height);
			break;
		case 1:
			// horizontal animation. if the previos specific animation is 1 (to the left)
			// the slide should be at the right edge of the screen. If is 0 (to the right)
			// the slide should be at the left edge of the screen
			_mainSlide.x = ls === 1 ? _window.winSize.w - _mainSlide.width : 0;
			break;
		case 2:
			// zoom animation. center the main slide and set it's anchor to 0.5
			_mainSlide.x = _window.winSize.w / 2;
			_mainSlide.y = _window.winSize.h / 2;
			_mainSlide.anchor.set(0.5);
	} // switch

	/*	After positioning the slide, we don't need the generic and specific data from
  *  the previous slide index in the store, so run the methods to update the store
  * 	data 
 */
	// set the generic animation type for the current slide
	// pass the generic type of the base texture
	(0, _animation._setGeneric)(_baseGenericType);
	// set the specific type if the generic is not vertical
	(0, _animation._setSpecific)(_baseGenericType);
}; // position main slide


/** Method to Update the Main Slide Texture
 * 	The param should be a pixi base texture. In some cases it could be a
 * 	false or null value.
 *  @param {object} b the new base texture
*/
var _updateMainSlideTexture = exports._updateMainSlideTexture = function _updateMainSlideTexture(b) {
	_mainSlide.alpha = 0;
	// check the value passed
	if (b) {
		// a base texture is passed
		// create a new pixi texture
		// apply the new texture to the main slide
		_mainSlide.texture = new PIXI.Texture(b);
		// set the is loaded property to true
		_mainSlide._isLoaded = true;

		// get the scale ratio from the base texture and pass it to the scale
		// method, in order to size and then position the main slide
		var _scaleRatio = b._scaleRatio,
		    _vRatio = b._vRatio,
		    _genericAnimationType = b._genericAnimationType;
		/*  check if the animation type is zoom and if it's zoom out.
   *	in that case the main slide should be scaled 50% over the scale to
   *	make it fit in the screen. Also this means that the main slide should
   *	be positioned at the center of the screen and the anchor should be set
   *	to 0.5 to make the animation happen with the image centered in the screen.
  */

		var _animationStore$lastS = _animation._animationStore.lastSpecific,
		    zoom = _animationStore$lastS.zoom,
		    horizontal = _animationStore$lastS.horizontal;
		// set a corrected ratio for the scale.
		// check if the generic 
		// if the last zoom animation was zoom-in (0) increase the scale ratio

		var _correctedScaleRatio = zoom === 0 && _genericAnimationType === 2 ? _scaleRatio * 1.5 : _scaleRatio;
		// add properties to the main slide object to access through the code
		_mainSlide._vRatio = _vRatio;
		_mainSlide._scaleRatio = _scaleRatio;
		_mainSlide._correctedScaleRatio = _correctedScaleRatio;
		_mainSlide._animationType = _genericAnimationType;
		// console.log(`update texture * ratio => ${_scaleRatio} * corrected => ${_correctedScaleRatio}`);

		// scale the main slide using the scale ratio from the base texture
		(0, _spritesModule._scaleSprite)(_mainSlide, _correctedScaleRatio);
		// now position the main slide. pass the base texture for the current slide
		_positionMainSlide(b, horizontal);
		// create the new timer and animation instances
		(0, _animation._resumeBurnsInstances)(true);
	} else {

		// either false or null is passed, in that case use the default texture
		_mainSlide.texture = _pixiModule._baseSpriteTexture;
		// set the is loaded property to the value passed
		_mainSlide._isLoaded = false;
		// set the scale ratio to 1
		_mainSlide.ratio = 1;
		_mainSlide.position.set(0);
		_mainSlide.anchor.set(0);
		_mainSlide.width = _window.winSize.w;
		_mainSlide.height = _window.winSize.h;
		// create the new timer and animation instances
		// THIS MIGHT NOT BE NECESSARY IN THE CASE OF A FAILED IMAGE LOAD
		(0, _animation._resumeBurnsInstances)(true);
	}

	// reset the opacity of the main slide
	_mainSlide.alpha = 1;
};

/** Method to center the Main Slide	
 *  If the burns effect is zoom in/out, the main slide should be positioned
 * 	at the center of the screen and it's anchor should be 0.5.	
 * 	To get the center position use the window dimensions divided by two
*/
var _centerMainSlide = exports._centerMainSlide = function _centerMainSlide() {};

/**
 * Method to hide the preloader.
 * There could be a situation when the preloader is not created yet when
 * the main slide is already created and added to the main stage.
 * Remove the preloader and then make the main slide and the stage
 * visible. Check is the preloader is ready and set a loop while is not
 * loaded and then remove it when is loaded.
*/
var _removeLoader = function _removeLoader() {
	if (!_loader._preloader) {
		// the preloader is not defined, wait a while and then chak again
		setTimeout(_removeLoader, 50);
	} else {
		/* hide the preloader animation
   * After hiding the preloader, it should be stopped to 
  */
		TweenLite.to(_loader._preloader, 0.1, {
			alpha: 0,
			onComplete: function onComplete() {
				_loader._preloader.stop();
			}
		});
		/* Regardless if the app is running for the first time or just changing the slides
   * set, we set the is loaded property to null.
   * The is loaded property, could be set in another place in the code, check if
   * the property is undefined or not. If is undefined set it to null (this means that
   * the update slide method has not been called yet).
  */
		if (_mainSlide._isLoaded === undefined) {
			_mainSlide._isLoaded = null;
		};
		// Also just in case we set the alpha to 1. If this is the first run, the alpha value
		// is 1 already, but if we're changing the slides group it should be 0, so we set it to 1
		_mainSlide.alpha = 1;

		/////////////////////////////////////////////
		// in order to solve this issue
		// https://websnap.slack.com/files/ndamofli/F6ZLE4J4B/img_2997.png
		// we hide the stripes stage in order to avoid this we hide the stripes
		// stage. Then when the slider is created again after the ajax response
		// we show the stage again. The stripes stage is a PIXI container object
		// now after the ajax response we show the container again.
		_pixiModule._stripesStage.alpha = 1;
		// show the logo and the menu button
		_pixiModule._logoStage.alpha = 1;
		/////////////////////////////////////////////
	}
};

/** Method to create the Main Slide Sprite
 *  Adds each slide (sprite object) to the array. 
*/
var _createMainSlide = exports._createMainSlide = function _createMainSlide() {

	/*  create the main slide only if is undefined (slider's first run)
  *	after that the main slide will be a pixi sprite and is not necessary
  *	to create it again.
 */
	if (_mainSlide === undefined) {
		exports._mainSlide = _mainSlide = null;
		// create the main slide and add it to the main renderer
		exports._mainSlide = _mainSlide = (0, _spritesModule._createSprite)(_pixiModule._baseSpriteTexture, undefined);
		// add the stripes stage to the renderer
		_pixiModule._mainRender.stage.addChild(_pixiModule._stripesStage);
		// add the logo stage
		_pixiModule._mainRender.stage.addChild(_pixiModule._logoStage);
		// after creating and adding the main slide, add the animated logo
		(0, _loader._addLogo)();
		// add the text component
		_pixiModule._mainRender.stage.addChild(_pixiModule._textStage);
		// add the feed container
		_pixiModule._mainRender.stage.addChild(_pixiModule._promptStage);
	}

	// hide the loader and show the main slide
	_removeLoader();
};

/** Method to set the app init bool to false	
 *  The app init bool can be changed only in this module,
 * 	so we need a method to set it back to false in order to prevent
 * 	user interaction while the ajax request is running (this when the
 * 	user goes to a new set of slides). This method is called before the
 * 	new request is send. When the ajax response is received, and the
 * 	textures are added to the array, this is set to true.
 * 	@param {boolean} v: the target value 
*/
var _resetAppInitBool = exports._resetAppInitBool = function _resetAppInitBool(v) {
	exports._appInitialized = _appInitialized = v;
};

},{"./animation":4,"./loader":12,"./pixi-module":18,"./sprites-module":26,"./window":37}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._createSprite = exports._scaleSprite = exports._positionMainSlide = undefined;

var _pixiModule = require("./pixi-module");

var _window = require("./window");

var _slideModule = require("./slide-module");

/** Method to Position the Main Slide	
 *  This method takes the animation data from the base texture and depending
 * 	on that, positions the main slide.	
 * 	Vertical effect, the main slide is set at the bottom edge of the screen.	
 * 	Horizontal effect, the main slide is set to the left or right edge of the
 * 	screen.	
 * 	Zoom effect, the main slide is set at the middle of the screen and also the
 * 	anchor point is set to 0.5 in order to make the zoom effect from the middle
 * 	of the slide.	
 * 	In order to decide to use zoom in/out or horizontal left/right, check the last
 * 	specific animation type from the animation store.
 * 	@param {object} b: the base texture for the current slide index.
 * 	@param {number} ls: the last specific animation from the animation store
 */
// UNUSED METHOD!!!!!!!!
// REMOVE!!!!!!!!!!!!!!!!

// get dimensions
var _positionMainSlide = exports._positionMainSlide = function _positionMainSlide(b, ls) {
	/*	The main slide must be at (0,0) position in order to then position it correctly
  *  after getting the generic animation type.
  * 	Set the position of the main slide to (0,0) and the anchor point to 0.
  */
	_slideModule._mainSlide.position.set(0);
	_slideModule._mainSlide.anchor.set(0);

	// depending on that value position the main slide
	switch (b._genericAnimationType) {
		case 0:
			// vertical animation. Animate from bottom. position main slide to a 
			// negative y value
			// get main value. the main slide is already scaled to fit the screen
			// so is the screen size minus the main slide height
			// _mainSlide.y = winSize.h - _mainSlide.height;
			_slideModule._mainSlide.position.set(0, _window.winSize.h - _slideModule._mainSlide.height);
			break;
		case 1:
			// horizontal animation. if the previos specific animation is 1 (to the left)
			// the slide should be at the right edge of the screen. If is 0 (to the right)
			// the slide should be at the left edge of the screen
			_slideModule._mainSlide.x = ls.horizontal === 1 ? _window.winSize.w - _slideModule._mainSlide.width : 0;
			break;
		case 2:
			// zoom animation. center the main slide and set it's anchor to 0.5
			_slideModule._mainSlide.x = _window.winSize.w / 2;
			_slideModule._mainSlide.y = _window.winSize.h / 2;
			_slideModule._mainSlide.anchor.set(0.5);
	} // switch
}; // position main slide


/**	Method to scale the sprites
 *	This method sets the scale of the sprite to 1, then uses the value passed
 *	(value obtained from the base texture) to set the new texture.
 *	The scale value is the one taken from the base texture used to update
 *	the main slide element.
 *	This method sets the scale to 1 (natural size of the image), then uses the
 *	the scale stored in the base texture (which depends on the animation type)
 *	to fit the main slide in the screen, ready for the burns effect to start.
 * 	@param {object} s: the pixi sprite object
 * 	@param {number} v: the scale used for the sprite
 */

// get the main slide
/*
*******************************************************************************************
*  SPRITES MODULE
*******************************************************************************************
*/
/** This module creates and returns the sprite element for each slide
 *  Also creates a jQuery defferred object to resolve the image loading
 */
// get the main renderer
// get the loading sprite texture
var _scaleSprite = exports._scaleSprite = function _scaleSprite(s) {
	var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : s.ratio;

	// reset to normal size
	s.scale.set(1);

	// in the case of this method being triggered by a resize
	// check if the texture was loaded or not
	if (s._isLoaded) {

		// add the mandating ratio on the sprite
		s.ratio = v || s.ratio;

		/*  Before scaling the image we need to call the method to check the type of
   * 	animation for the current slide. Depending on that we set the position of
   * 	the slide, the anchor point and the scale
  */

		// size the sprite
		s.scale.set(v);
	} else {
		// the image is either still loading or failed
		// use normal resize
		s._vRatio = null;
		// set a default ratio of 1 in case the image is loading or fails
		s.ratio = 1;
		s.width = _window.winSize.w;
		s.height = _window.winSize.h;
	}

	// console.log( _mainSlide ? _mainSlide.scale : "main slide still null" );
};

/** Method to create the Main Sprite
 *  Creates the pixi main slide sprite and adds it to the main renderer.
 * 	This sprite will be updated when a new texture is required based on
 * 	the current slide index.
 * 	@param {object}, t: a pixi texture object
 * 	@return {object} pixi sprite
*/
var _createSprite = exports._createSprite = function _createSprite(t) {

	// create the sprite for the slide
	var _s = new PIXI.Sprite(t);
	// add the loaded boolean of the sprite. deault is null
	// when the texture is updated this property will be too
	// depending on the loading status of the base tezture
	// to null(loading), true(loaded), false(failed)
	_s._isLoaded = null;
	// set dimensions
	_scaleSprite(_s);
	// add to main renderer
	_pixiModule._mainRender.stage.addChild(_s);
	// return the sprite and the base texture
	return _s;
};

},{"./pixi-module":18,"./slide-module":25,"./window":37}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._resetStripesArrays = exports._createAnimationArray = exports._setTextureScale = exports._createRefArrays = exports._setEmptyArrays = exports._nextHasSprites = exports._nextStripes = exports._nextInitArray = exports._previousHasSprites = exports._previousStripes = exports._previousInitArray = exports._currentHasSprites = exports._currentStripes = exports._currentInitArray = exports._setStartIndex = exports._startStripeIndex = exports._calculateStripes = exports._stripesMiddle = exports._stripesAmount = undefined;

var _ajaxModule = require("./ajax-module");

var _window = require("./window");

var _slideChangeModule = require("./slide-change-module.js");

var _interactionModule = require("./interaction-module.js");

var _prevStripesModule = require("./prev-stripes-module.js");

var _currStripesModule = require("./curr-stripes-module.js");

var _nextStripesModule = require("./next-stripes-module.js");

// stripes amount
// there are some issues with the amount of stripes, using 20 seems to fix it.
// we'll use that amount until a solution is found

// get the interaction start point

// get window module vars. screen size / stripe height
var _stripesAmount = exports._stripesAmount = 20;
/*  the middle stripe
 *	this is useful when creating the drag/animation arrays
 *	in order to select the looping direction (increase or decrease the
 *	current start index number in order to add elements to the array)
*/

// get the stripes arrays and methods

// get the current slide index and the slides group
/*
*******************************************************************************************
*  STRIPES MODULE
*******************************************************************************************
*/
// get the slides amount
var _stripesMiddle = exports._stripesMiddle = Math.floor(_stripesAmount / 2);

/* VERSION 2.2.5
 * create method to set the amount of stripes for screen heights below 320 px
 * this is to solve a frame calculation issue on pixi created by setting
 * the stripes height to an integer by rounding the stripe height. this 
 * rounding also generates a final stripe that should be smaller than the
 * others, this causes the calculation for that sprite to be a negative
 * value when the rounding amount multiplied by the number of stripes is
 * bigger than the screen height.
*/
/**
 * Method to set the amount of stripes.
 * Depending on the screen height the amount of stripes will be
 * 20 or 14.
 * @param {boolean} h if the height is 320 or more
 * @private
*/
var _calculateStripes = exports._calculateStripes = function _calculateStripes(h) {
	exports._stripesAmount = _stripesAmount = h >= 320 ? 20 : 14;
	exports._stripesMiddle = _stripesMiddle = Math.floor(_stripesAmount / 2);
};

/*  the starting index for the drag/animation stripes
 *	this is the index position of the first stripe for each animation
 *	array. By default is 0.
 *	when the stripes animation is complete, reset this to 0 in case the
 *	stripes are animated automatically.
 *	this value is common for both set of stripes.
*/
var _startStripeIndex = exports._startStripeIndex = 0;

/*	Method to set the start stripe index.	
 *  We use the pointer Y position and the current stripe height in order
 * 	to set the index of first element in the drag/animation array.
*/
var _setStartIndex = exports._setStartIndex = function _setStartIndex() {
	return Math.floor(_interactionModule._interactionStartY / _window._stripeHeight);
};

// STRIPES ARRAYS
/*	CURRENT STRIPES	*/
// this is the reference array, the stripes are added in the order they are created
// this is used only as a reference to the stripes.
var _currentInitArray = exports._currentInitArray = null;
// this array will be used to drag/animate the stripes based on the pointer position
var _currentStripes = exports._currentStripes = null;
// bool to check if the ref array has stripes
var _currentHasSprites = exports._currentHasSprites = null;

/*	PREVIOUS STRIPES	*/
// reference array for the next slide stripes
var _previousInitArray = exports._previousInitArray = null;
// array to drag/animate the stripes
var _previousStripes = exports._previousStripes = null;
// bool to check if the ref array has stripes
var _previousHasSprites = exports._previousHasSprites = null;

/*	NEXT STRIPES	*/
// reference array for the next slide stripes
var _nextInitArray = exports._nextInitArray = null;
// array to drag/animate the stripes
var _nextStripes = exports._nextStripes = null;
// bool to check if the ref array has stripes
var _nextHasSprites = exports._nextHasSprites = null;

/** Method to set the empty Arrays	
 *  The next public method, creates the init arrays for the
 * 	current and previous slides, but the variables are null, so we
 * 	can't push the stripes into them. Normally this is handled by the
 * 	create reference arrays method.	
 * 	This method sets the current and next init arrays to empty arrays
 * 	so we can push the stripes.
 */
var _setEmptyArrays = exports._setEmptyArrays = function _setEmptyArrays() {
	exports._currentInitArray = _currentInitArray = [];
	exports._previousInitArray = _previousInitArray = [];
	exports._nextInitArray = _nextInitArray = [];
};

/** Method to create the stripes.	
 *  This method calls all the methods to create and add the stripes to the
 * 	renderer's stage and the reference arrays.
*/
var _createRefArrays = exports._createRefArrays = function _createRefArrays() {

	// first set all the arrays to empty arrays
	_setEmptyArrays();
	// call the methods to create the ref arrays
	(0, _prevStripesModule._previousInitStripes)();
	(0, _nextStripesModule._nextInitStripes)();
	(0, _currStripesModule._currentInitStripes)();
	// set the bools to check if the ref arrays have sprites
	exports._currentHasSprites = _currentHasSprites = _currentInitArray.length > 0;
	exports._previousHasSprites = _previousHasSprites = _previousInitArray.length > 0;
	exports._nextHasSprites = _nextHasSprites = _nextInitArray.length > 0;
	// now call the method to create the animations arrays
	_createAnimationArray();
};

/** Method to scale the previous stripes.	
 *  This is used to set the scale for a specific texture based on it's dimensions.	
 * 	When the previous stripes are created we use only the base texture and it's
 * 	dimensions(that are the original image's dimensions) to create	the stripes,
 * 	because there is no display object on the renderer's stage to use as reference,
 * 	so we need to know the real width of the frame for each stripe to scale them
 * 	properly after.	
 * 	This method will be called only if the texture has been loaded, otherwise
 * 	we use the base loading texture.
 * 	@param {object} b: a pixi base texture
 */
var _setTextureScale = exports._setTextureScale = function _setTextureScale(b) {
	// get the dimensions of the image
	var _textDims = { w: b.realWidth, h: b.realHeight };
	// get the ratio for the width and height
	var _vr = _window.winSize.h / _textDims.h;
	var _hr = _window.winSize.w / _textDims.w;
	var _tr = Math.max(_vr, _hr); // the texture ratio
	// return the scale ratio to store it in a variable
	return _tr;
};

/*	ANIMATION ARRAYS METHODS	*/
/** Method to create the drag/animation arrays.	
 * 	Uses the reference arrays to create the animation arrays.	
 * 	Always create an animation array for the current stripes (_currentStripes),
 * 	because this stripes will always be animated.	
 * 	Depending on the slide index if we create the animation arrays for the previous
 * 	and next stripes.
 * 	@param {number} v: the current index value, calculated with the current Y position
 * 	of the pointer event. This number is calculated in the interaction module on 
 * 	the interacion move event handler.
*/
var _createAnimationArray = exports._createAnimationArray = function _createAnimationArray(v) {
	// set all the animation arrays to empty
	exports._currentStripes = _currentStripes = [];
	exports._previousStripes = _previousStripes = [];
	exports._nextStripes = _nextStripes = [];
	// set the target stripe according to the pointer event
	// this is the first stripe in the array
	// if a value is passed in the function, use that to set the start index,
	// other wise use the method and the Y value of the pointer when the interaction started.
	exports._startStripeIndex = _startStripeIndex = v !== undefined ? v : _setStartIndex();
	// the stripes for every array, are created only if the corresponding image
	// has loaded and the current slide is not the first/last of the group.

	/*	CURRENT STRIPES	*/
	if (_currentHasSprites) {
		// the image of the current slide has loaded and there are stripes
		// in the current ref array. Create the current animation array.// create an internal variable to modify in order to get the element
		var _start = _startStripeIndex;
		// add the pointer target element
		_currentStripes.push(_currentInitArray[_startStripeIndex]);
		// check if the pointer event is before or after the middle stripe
		if (_startStripeIndex > _stripesMiddle || _startStripeIndex === _stripesMiddle) {
			// after or exactly the middle stripe, loop down
			while (_start--) {
				// a variable for the next stripe
				var _nextStripe = _currentInitArray[_startStripeIndex + (_startStripeIndex - _start)];
				// if the next stripe exists, add an array with the previous and next
				// stripe to the corresponding array (previous or current)
				if (_nextStripe) {
					_currentStripes.push([_currentInitArray[_start], _nextStripe]);
				} else {
					// the next stripe doesn't exist in the init arrays, so we add just the 
					// previous one since we're looping to 0
					_currentStripes.push(_currentInitArray[_start]);
				} // next stripe conditional end
			} // array start loop end
		} else {
			// the pointer event is before the middle stripe
			// loop to the final element of the arrays
			while (_start < _stripesAmount - 1) {
				_start++;
				// in this case the number is incrementing, we're adding a negative numbe to
				// the start index value to create the previous index
				// check if the previous element exists in the array
				var _prevStripe = _currentInitArray[_startStripeIndex + (_startStripeIndex - _start)];
				// if the previous stripe exists, add an array with the previous and next
				// stripe to the corresponding array
				if (_prevStripe) {
					_currentStripes.push([_prevStripe, _currentInitArray[_start]]);
				} else {
					_currentStripes.push(_currentInitArray[_start]);
				} // previous stripe conditional end
			} // array end loop end
		} // pointer location conditional end
	}

	/*	PREVIOUS STRIPES	*/
	// check if the current is the first slide and if the image was loaded
	if (_slideChangeModule._currentSlideIndex > 0 && _previousInitArray.length > 0) {
		// not the first slide and the previous ref array has stripes
		// create the animation array
		// the image of the current slide has loaded and there are stripes
		// in the current ref array. Create the current animation array.// create an internal variable to modify in order to get the element
		var _start2 = _startStripeIndex;
		// add the pointer target element
		_previousStripes.push(_previousInitArray[_startStripeIndex]);
		// check if the pointer event is before or after the middle stripe
		if (_startStripeIndex > _stripesMiddle || _startStripeIndex === _stripesMiddle) {
			// after or exactly the middle stripe, loop down
			while (_start2--) {
				// a variable for the next stripe
				var _nextStripe2 = _previousInitArray[_startStripeIndex + (_startStripeIndex - _start2)];
				// if the next stripe exists, add an array with the previous and next
				// stripe to the corresponding array (previous or current)
				if (_nextStripe2) {
					_previousStripes.push([_previousInitArray[_start2], _nextStripe2]);
				} else {
					// the next stripe doesn't exist in the init arrays, so we add just the 
					// previous one since we're looping to 0
					_previousStripes.push(_previousInitArray[_start2]);
				} // next stripe conditional end
			} // array start loop end
		} else {
			// the pointer event is before the middle stripe
			// loop to the final element of the arrays
			while (_start2 < _stripesAmount - 1) {
				_start2++;
				// in this case the number is incrementing, we're adding a negative numbe to
				// the start index value to create the previous index
				// check if the previous element exists in the array
				var _prevStripe2 = _previousInitArray[_startStripeIndex + (_startStripeIndex - _start2)];
				// if the previous stripe exists, add an array with the previous and next
				// stripe to the corresponding array
				if (_prevStripe2) {
					_previousStripes.push([_prevStripe2, _previousInitArray[_start2]]);
				} else {
					_previousStripes.push(_previousInitArray[_start2]);
				} // previous stripe conditional end
			} // array end loop end
		} // pointer location conditional end
	} // previous stripes end

	/*	NEXT STRIPES	*/
	if (_slideChangeModule._currentSlideIndex < _ajaxModule._slidesAmount && _nextInitArray.length > 0) {
		// not the last slide and the next ref array has stripes
		// create the animation array

		// not the first slide and the previous ref array has stripes
		// create the animation array
		// the image of the current slide has loaded and there are stripes
		// in the current ref array. Create the current animation array.// create an internal variable to modify in order to get the element
		var _start3 = _startStripeIndex;
		// add the pointer target element
		_nextStripes.push(_nextInitArray[_startStripeIndex]);
		// check if the pointer event is before or after the middle stripe
		if (_startStripeIndex > _stripesMiddle || _startStripeIndex === _stripesMiddle) {
			// after or exactly the middle stripe, loop down
			while (_start3--) {
				// a variable for the next stripe
				var _nextStripe3 = _nextInitArray[_startStripeIndex + (_startStripeIndex - _start3)];
				// if the next stripe exists, add an array with the previous and next
				// stripe to the corresponding array (previous or current)
				if (_nextStripe3) {
					_nextStripes.push([_nextInitArray[_start3], _nextStripe3]);
				} else {
					// the next stripe doesn't exist in the init arrays, so we add just the 
					// previous one since we're looping to 0
					_nextStripes.push(_nextInitArray[_start3]);
				} // next stripe conditional end
			} // array start loop end
		} else {
			// the pointer event is before the middle stripe
			// loop to the final element of the arrays
			while (_start3 < _stripesAmount - 1) {
				_start3++;
				// in this case the number is incrementing, we're adding a negative numbe to
				// the start index value to create the previous index
				// check if the previous element exists in the array
				var _prevStripe3 = _nextInitArray[_startStripeIndex + (_startStripeIndex - _start3)];
				// if the previous stripe exists, add an array with the previous and next
				// stripe to the corresponding array
				if (_prevStripe3) {
					_nextStripes.push([_prevStripe3, _nextInitArray[_start3]]);
				} else {
					_nextStripes.push(_nextInitArray[_start3]);
				} // previous stripe conditional end
			} // array end loop end
		} // pointer location conditional end
	} // next stripes end
}; // create animation arrays end


/** Method to reset the drag/animation arrays
 *  This set the arrays to null in order to allow the GC to remove all
 * 	unused references to the stripes after they are animated out and 
 * 	removed from the stage.
*/
var _resetStripesArrays = exports._resetStripesArrays = function _resetStripesArrays() {
	exports._currentStripes = _currentStripes = null;
	exports._currentInitArray = _currentInitArray = null;
	exports._previousStripes = _previousStripes = null;
	exports._previousInitArray = _previousInitArray = null;
	exports._nextStripes = _nextStripes = null;
	exports._nextInitArray = _nextInitArray = null;
	exports._currentHasSprites = _currentHasSprites = null;
	exports._previousHasSprites = _previousHasSprites = null;
	exports._nextHasSprites = _nextHasSprites = null;
};

},{"./ajax-module":1,"./curr-stripes-module.js":6,"./interaction-module.js":9,"./next-stripes-module.js":17,"./prev-stripes-module.js":19,"./slide-change-module.js":24,"./window":37}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._createGraphicStripes = exports._resetGraphicStripesBool = exports._graphicStripesCreated = undefined;

var _stripesModule = require("../stripes-module");

var _window = require("../window");

var _pixiModule = require("../pixi-module");

/*  In this module creates the graphics stripes.
 *  They will be added to a specific init array and then to the animation
 * 	array depending on the param passed to the method.
*/

/*  Bool to check if a slide's image was not loaded.
 *  When the method to create the graphic stripes is called
 * 	set this to true. This will be checked in the index change
 * 	method and will update the color index.
*/

// get the stripe height
var _graphicStripesCreated = exports._graphicStripesCreated = false;

/** Method to Reset the Graphics Stripes Bool.	
 *  Sets the graphics stripes boolean back to false.
*/

// get the renderer
/*
*******************************************************************************************
*  GRAPHIC STRIPES MODULE
*******************************************************************************************
*/
// get the stripes amount
var _resetGraphicStripesBool = exports._resetGraphicStripesBool = function _resetGraphicStripesBool() {
	exports._graphicStripesCreated = _graphicStripesCreated = false;
};

/** Create Graphics Stripes Method.	
 * 	Use the target array to push the stripes, the color the will
 * 	be used to create the stripes and a number to indicate the position.
 * 	This number can be 0, 1 or 2 depending on the target array. This will
 * 	be used to set the X position of the stripes. 0 is current which means
 * 	the X position is 0. 1 is previous which means the X position is to
 * 	the left of the screen. 2 is the next which means the X position is to
 * 	the right of the screen.
 *  @param {array} ta: the target array for the stripes
 * 	@param {number} p: the X position for the stripes
 * 	@param {string} c: the color used to create the graphics
*/
var _createGraphicStripes = exports._createGraphicStripes = function _createGraphicStripes(ta, p, c) {
	var _startX = 0;

	switch (p) {
		case 1:
			_startX = -_window.winSize.w - 1;
			break;
		case 2:
			_startX = _window.winSize.w;
			break;
	} // switch
	var _newHeight = parseInt(_window._stripeHeight) + 1;
	// loop to create the stripes and add them to the target array
	for (var i = 0; i < _stripesModule._stripesAmount; i++) {

		// create a new graphic element
		var _nG = new PIXI.Graphics();
		_nG.beginFill(c, 1).drawRect(0, 0, _window.winSize.w, _newHeight).endFill();
		_nG.x = _startX;
		_nG.y = _window._stripeHeight * i;
		// add the graphic to the array
		ta.push(_nG);
		// add the graphic to the stage
		// _mainRender.stage.addChild( _nG );
		_pixiModule._stripesStage.addChild(_nG);
	}
	// set the graphics stripes bool to true
	exports._graphicStripesCreated = _graphicStripesCreated = true;
};

},{"../pixi-module":18,"../stripes-module":27,"../window":37}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphicStripes = require("./graphic-stripes");

Object.keys(_graphicStripes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _graphicStripes[key];
    }
  });
});

},{"./graphic-stripes":28}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textModule = require("./text-module");

Object.keys(_textModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _textModule[key];
    }
  });
});

},{"./text-module":32}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._textTapEndOut = exports._textTapEnd = exports._textTapStart = exports._isTextTouching = exports._elapsedTouchTime = exports._maxTouchTime = exports._currentTouchDistance = exports._maxTouchDistance = exports._textTouchMove = exports._textTouchEnd = exports._textTouchStart = undefined;

var _globalClassModule = require("../global-class-module");

;

/** Touch Start Method
 * @param {object} e PIXI event object
 * @private
*/
/*
*******************************************************************************************
		TOUCH EVENTS
*******************************************************************************************
*/

// get the event emitter
var _textTouchStart = exports._textTouchStart = function _textTouchStart(e) {
	// prevent bubbling
	e.stopPropagation();
	// set the touching bool to true
	_isUserTouching = true;
	// update the start paragraph index for the next touch event
	_startParIndex = _currrentParagraphIndex;
	// console.log("start par index => ", _startParIndex);
	// set the start drag point
	_textStartY = e.data.global.y;
	// if the paragraph gap timer is running, pause it
	if (_parGap) {
		_parGap.pause();
	};
};

/** Touch End Method
 * When the touch is done, after reseting the boolean we need to restart the 
 * @private
*/
var _textTouchEnd = exports._textTouchEnd = function _textTouchEnd(e) {
	// stop event bubbilng
	e.stopPropagation();
	// finally set the touching bool to false
	_isUserTouching = false;
	/* After the interaction is complete check if the current paragraph is the
  * final one. The user could drag after all the paragraphs are animated in
  * in that case the text complete bool is true and the user could go to a
  * previous paragraph and the delayed call won't be started.
 */
	_isTextComplete = _currrentParagraphIndex === _textData.paragraphsAmount - 1;
	// if the timer is not created and this is not the final paragraph
	// create the timer
	if (!_isTextComplete && !_parGap) {
		_parGap = TweenLite.delayedCall((_textData.pArrays[_currrentParagraphIndex].length * 0.2).toFixed(2), _addWord, [true]).pause(); // delayed call
	}
	// restart the word animation if the text is not complete
	if (!_isTextComplete && _currrentParagraphIndex < _textData.paragraphsAmount - 1) {
		_parGap.restart(true);
	};
};

/** Touch Move Method
 * @param {object} e PIXI event object
 * @private
*/
var _textTouchMove = exports._textTouchMove = function _textTouchMove(e) {
	// stop event bubbilng
	e.stopPropagation();
	if (_isUserTouching) {
		_textDragAmount = _textStartY - e.data.global.y;
		// _textDirection = _textDragAmount > 0;
		var _targetParagraph = _startParIndex + Math.round(_textDragAmount / _textMinDrag);
		// show the target paragraph if is different from the current
		if (_currrentParagraphIndex !== _targetParagraph && _textData.pStrings[_targetParagraph] !== undefined) {
			// store the target paragraph array
			var _targetParArray = _textData.pArrays[_targetParagraph];
			var _targetArrayWords = _targetParArray.length;
			// we should show a different paragraph
			// show the new paragraph
			_title.text = _textData.pStrings[_targetParagraph];
			// update the paragraph index
			_currrentParagraphIndex = _targetParagraph;
			// clear the background graphics
			_textBackgroundGraph.clear();
			// Go through the words of the target paragraph and check the line widths
			// once we reach the final word of the line draw a graphic 
			var _targetLine = 1;
			_targetParArray.forEach(function (w, i) {
				// if the line of he current word is less than the current line
				// update the current line index and set the graphic width
				// to the width of the previous word
				if (_targetLine < w.line) {
					// create the new graphic
					_textBackgroundGraph.beginFill(0x00051b).drawRect(0, _textLineHeight * _targetLine, _targetParArray[i - 1].width, _textLineHeight).endFill();
					// update the target line value
					_targetLine = w.line;
				} // line conditional
			}); // words loop
			// draw the final line graphic
			_textBackgroundGraph.beginFill(0x00051b).drawRect(0, _textLineHeight * _targetLine, _targetParArray[_targetArrayWords - 1].width, _textLineHeight).endFill();
			//
		}
	} // user touch conditional
}; // touch move


/*
*******************************************************************************************
		TAP EVENT METHODS
*******************************************************************************************
*/
// max distance for the touch events in the text container
var _maxTouchDistance = exports._maxTouchDistance = 20;
/* Variable to set the distance of the touch event in the text container.
 * The value is compared with the max touch distance constant
*/
var _currentTouchDistance = exports._currentTouchDistance = void 0;

// the point where the touch event started
var _textTouchStartPoint = { x: 0, y: 0 };

/* Max time between the start and end of the touch event.
 * If the time between the events is more than this value, then
 * the text tap emitter is not called.
*/
var _maxTouchTime = exports._maxTouchTime = 120;
// the time elapsed between touch events.
var _elapsedTouchTime = exports._elapsedTouchTime = void 0;
// the time when the touch event started
var _textTouchStartTime = void 0;

// text stage touch boolean
var _isTextTouching = exports._isTextTouching = false;

/** Touch Start Method.
 * This is attached to the text stage and basically sets the value of the
 * current touch distance and elapsed touch time to 0.
 * @param {object} e the event object
 * @private
*/
var _textTapStart = exports._textTapStart = function _textTapStart(e) {
	var _e$data$global = e.data.global,
	    x = _e$data$global.x,
	    y = _e$data$global.y;
	// set the bool

	exports._isTextTouching = _isTextTouching = true;
	// reset the touch distance
	exports._currentTouchDistance = _currentTouchDistance = 0;
	// set the current time
	_textTouchStartTime = new Date().getTime();
	// set the start point
	_textTouchStartPoint = { x: x, y: y };
};

/** Touch End Method
 * Sets the value of the touch distance and the elapsed time.
 * Compares those values with the limits and depending on that if
 * the text tap event is emitted or not.
 * @param {object} e the event object
 * @private
*/
var _textTapEnd = exports._textTapEnd = function _textTapEnd(e) {
	if (_isTextTouching) {
		// set the elapsed time between events
		exports._elapsedTouchTime = _elapsedTouchTime = new Date().getTime() - _textTouchStartTime;
		// set the touch distance
		exports._currentTouchDistance = _currentTouchDistance = {
			x: Math.abs(e.data.global.x - _textTouchStartPoint.x),
			y: Math.abs(e.data.global.y - _textTouchStartPoint.y)
		};
		// if the time and distance are less than the limits emit the tap event
		if (_elapsedTouchTime < _maxTouchTime && _currentTouchDistance.x < _maxTouchDistance && _currentTouchDistance.y < _maxTouchDistance) {
			(0, _globalClassModule._eventEmitter)("texttap");
		}
		// reset the boolean
		exports._isTextTouching = _isTextTouching = false;
	} // text touch conditional	
};

/** Touch end outside method.
 * This is called when the touch event ends out of the text
 * container. In that case all the variables are reset and event is
 * not emitted.
 * @private
*/
var _textTapEndOut = exports._textTapEndOut = function _textTapEndOut() {
	if (_isTextTouching) {
		// reset the touch distance
		exports._currentTouchDistance = _currentTouchDistance = 0;
		// set the current time
		_textTouchStartTime = 0;
		// set the start point
		_textTouchStartPoint = {};
		// set the bool
		exports._isTextTouching = _isTextTouching = false;
	}
};

},{"../global-class-module":7}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._resizeTextEvent = exports._initTextModule = exports._setUserInteraction = exports._textTouchMove = exports._textTouchEnd = exports._textTouchStart = exports._createSlideText = exports._setTextDimensions = exports._title = exports._textBackgroundGraph = exports._createNewSlideText = exports._processSlideText = exports._resetTextData = exports._setFastForward = exports._ttsSubtitleStarted = exports._ttsTitleStarted = exports._addWordDelayedCall = exports._textCompleteTimer = exports._textData = exports._parGap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                  *******************************************************************************************
                                                                                                                                                                                                                                                                  		TEXT COMPONENT MODULE
                                                                                                                                                                                                                                                                  *******************************************************************************************
                                                                                                                                                                                                                                                                  */
// get window vars

// get the text stage container to add the text elements and the
// background graphic

// get the current slide index

// get the app initialized boolean

// get the interaction boolean

// get the specific interaction methods

// get the slides data and amount

// get the text dimensions and positions from the window module

// get the event emitter


var _window = require("../window");

var _pixiModule = require("../pixi-module");

var _slideChangeModule = require("../slide-change-module");

var _slideModule = require("../slide-module");

var _interactionModule = require("../interaction-module");

var _interactionTextModule = require("./interaction-text-module");

var _ajaxModule = require("../ajax-module");

var _globalClassModule = require("../global-class-module");

/*
*******************************************************************************************
		TEXT COMPONENT
*******************************************************************************************
*/
// the font sizes for each screen height
var _fontSizes = [20, 31, 40, 50];
// the line heights fo each screen height
// const _lineHeights = [25, 38, 47, 60];
var _lineHeights = [23, 36, 45, 58];
var _textStyle = {
	// wordWrapWidth: winSize.w * .82,
	fontSize: _fontSizes[_window._currentHeight],
	lineHeight: _lineHeights[_window._currentHeight],
	breakWords: true,
	wordWrap: true,
	fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",
	fill: 0xffffff
};

// variables to create the paragraphs and animate the text
// let _currentWord = 0;
var _referenceText = "";
var _displayText = "";

// the height of a text line
// let _textLineHeight = 25;
// text element vertical position 135 - 175 - 203
// let _textVerticalPos = 135;
// store the paragraph height
// let _parHeight = _textLineHeight * 3;
// the word speed
var _wordSpeed = 0.035;
// time between each paragraph, gives the user enough time to read the text
// is set depending on the amount of words of the paragraph.
var _parGap = exports._parGap = undefined;
// the drag threshold for the drag scroll motion
var _textMinDrag = 30;
// text drag direction. True is scrollng up and false is scrolling down
// up is going to the next paragraph and down is going to the previous
// let _textDirection = true;
// the initial position of the drag motion, pointer position
var _textStartY = null;
// the text drag amount of the current pointer event
var _textDragAmount = 0;
// the paragraph index when the user interaction starts
var _startParIndex = 0;

/* Text Data Object.	
 * pArrays: contains the words array for each text block (title/subtitle).
 * this arrays will be used for the text animation.
 * pStrings: contains the complete string of each paragraph of each text
 * block. This is used for the scroll functionality, since we can access
 * and render the entire paragraph at once and replace the entire rendered
 * text without looping through each words array.
*/
var _textData = exports._textData = {
	pArrays: [],
	pStrings: [],
	/* Array index positions.	
  * this array has the start and end index for each paragraph.
  * this is used for the scroll funcionality, in order to avoid
  * calling the code to to add words while scrolling.
 */
	paragraphsIndex: [],
	/* Amount of paragraphs for the current slide.
  * this is updated after a new paragraph is added to the array.
 */
	paragraphsAmount: 0,
	// bool set to check if the text of the slide has been processed or not
	// just a precaution before animating, scrolling, etc to prevent errors.
	/* Boolean to check if the text is processed or not.
  * When the slider starts, a new slide comes in or a new group is requested
  * we can't trigger the touch events if the text hasn't been processed yet.
  * An error will be thrown because the text data pargraphs array is empty and
  * the delayed call for starting a new paragraph can't be created.
  * By default is false, set to true after storing the data in the paragraphs array
  * and set to false on a new group or new slide.
  * This will be set to true in the 
  * https://gitlab.com/rhernandog/ainw-pixi-component/issues/51
 */
	isDataSet: false,
	slideLang: undefined
};

/* Current paragraph.	
 * String for the current paragraph. this is then added to the paragraphs
 * array.
*/
var _currrentParagraph = "";
// index of the current paragraph. default to 0 on a new slide.
var _currrentParagraphIndex = 0;
/* The amount of paragraphs in the title data.
 * This is used to check if the title text is complete, on the add word
 * method. When we reached the last paragraph of the title, we add some
 * extra time to the delayed call before showing the subtitle.
*/
var _titleParagraphsAmount = 0;
/* Current word index.	
 * indicates the index position for the current word in the processed text
 * array. This is updated after updating the rendered text. If the text is
 * not updated this number stays 
*/
var _currentWordIndex = 0;
/* Current line index.	
 * the amount of lines of the current paragraph.
 * Starts at 1 and can't be more than 3. When this is 3 and the reference
 * text is double line, the current paragraph is stored in the array and 
 * then is reseted to an empty string. Then this is set to 1 again.
*/
var _currentLineNumber = 1;
// boolean to indicate if the slide's text is completed in order to avoid adding the
// final word of the text over again
// this is reset if the scroll goes to a previous paragraph and when a new slide
// is visible.
var _isTextComplete = false;
// timer to set the text complete bool back to false and call the event emitter
// for the complete text. This will be called after the user scrolls to the 
// final paragraph.
var _textCompleteTimer = exports._textCompleteTimer = void 0;
/* Bool to check if the user is touching the text element.
 * This helps to prevent the delayed call for a new paragraph to start if the
 * user is touching the text element. In that case the user could scroll manually
 * between paragraphs, so to prevent a new paragraph to be added by the add word
 * method, this is set to true. When the user releases the touch event this is
 * set to false.
*/
var _isUserTouching = false;
// in order to prevent weird background issues when scrolling
// after a slide change
var _allowUserEvents = true;
// the object for the title text
var _titleTextObject = void 0;
// the object for the subtitle text
var _subtitleTextObject = void 0;
// has subtitle boolean. defaults to undefined at startup
var _hasSubtitle = undefined;
// fast forward option. This allows the user to show only the title and
// not the message of the slide text
var _fastForward = false;
// the delayed call instance timer for the add word method
var _addWordDelayedCall = exports._addWordDelayedCall = void 0;

/* Text To Speech Booleans.
 * These variables are used to indicate if the text to speech method
 * was called for either the title or the subtitle.
 * After the TTS is called for the title, the tts boolean for the title
 * is set to true.
 * Also after the TTS is called for the subtitle the boolean is set to true
 * in order to prevent the TTS method to be called more than one, when
 * used in the type effect (add word method) and the scroll method.
*/
var _ttsTitleStarted = exports._ttsTitleStarted = false;
var _ttsSubtitleStarted = exports._ttsSubtitleStarted = false;

/** Method to set the fast forward value.
 * @param {boolean} v the value of the fast forward option
 * @private
*/
var _setFastForward = exports._setFastForward = function _setFastForward(v) {
	_fastForward = v;
};

/** Method to reset the text data object.	
 * Sets the text data object values to the startup default values.
 * This is called everytime a new slide is loaded.
 * @param {boolean} s this param is passed when the method is called from 
 * 				the interaction module instead of the text module in order to
 * 				reset the user touching boolean as well
 * @private
*/
var _resetTextData = exports._resetTextData = function _resetTextData(s) {
	// if this is called from the interaction module
	if (s) {
		_isUserTouching = false;
		_allowUserEvents = false;
	};
	_textData.pArrays = [];
	_textData.pStrings = [];
	_textData.paragraphsIndex = [];
	_textData.paragraphsAmount = 0;
	_textData.isDataSet = false;
	_textData.slideLang = undefined;

	// _currentWord = 0;
	_referenceText = "";
	_displayText = "";
	_currrentParagraph = "";
	_currrentParagraphIndex = 0;
	_currentWordIndex = 0;
	_currentLineNumber = 1;
	_refText.text = "";
	_title.text = "";
	_isTextComplete = false;
	_textBackgroundGraph.clear();
	_titleParagraphsAmount = 0;

	// make the text stage visible again
	_pixiModule._textStage.alpha = 1;

	// reset the TTS booleans
	exports._ttsTitleStarted = _ttsTitleStarted = false;
	exports._ttsSubtitleStarted = _ttsSubtitleStarted = false;
};

/**	Method to create the words array.	
 * @param {string} txt the string text to be splitted in words
 * @param {boolean} isChinese if the text is chinese or not
 * @returns {object} text object
 * @private
*/
var _processText = function _processText(txt) {
	var _isChinese = txt.match(/[\u3400-\u9FBF]/);
	var _textObj = {};
	if (_isChinese) {
		_textObj.words = txt.split('');
	} else {
		//Remove line breaks from text
		var cleanText = txt.replace(/(?:\r\n|\r|\n)/g, ' ');
		cleanText = cleanText.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ');
		cleanText = cleanText.replace(/&apos;/g, "'");
		//create words array
		_textObj.words = cleanText.split(' ');

		var _newWords = [];

		for (var i = 0; i < _textObj.words.length; i++) {
			if (_textObj.words[i].length !== 0) {
				_newWords.push(" ".concat(_textObj.words[i]));
			}
		} // loop end
		_textObj.words = _newWords;

		_textObj.words.splice(0, 1, _textObj.words[0].trim());
	} // chinese conditional
	_textObj.length = _textObj.words.length;
	// return the text object
	return _textObj;
};

/** Method to create the text objects.
 * For each new slide we use this to create the text objects
 * and check if the text is chinese.
 * @private
*/
var _processSlideText = exports._processSlideText = function _processSlideText() {
	var _slidesData$_currentS = _ajaxModule._slidesData[_slideChangeModule._currentSlideIndex],
	    slideTitle = _slidesData$_currentS.slideTitle,
	    slideMsg = _slidesData$_currentS.slideMsg;

	_titleTextObject = _processText(slideTitle);
	_subtitleTextObject = slideMsg && slideMsg !== "" ? _processText(slideMsg) : undefined;
};

/** Method to create the text for the new slide.
 * This will be used when a new slide is animated in by the user
 * or automatically.
 * @private
*/
var _createNewSlideText = exports._createNewSlideText = function _createNewSlideText() {
	// stop all delayed calls.
	_parGap ? _parGap.pause().kill() : null;
	_addWordDelayedCall ? _addWordDelayedCall.pause().kill() : null;
	_textCompleteTimer ? _textCompleteTimer.pause().kill() : null;
	// prevent the instance from being restarted
	exports._addWordDelayedCall = _addWordDelayedCall = undefined;
	exports._textCompleteTimer = _textCompleteTimer = undefined;
	// create the text data for the new slide
	_createSlideText(_titleTextObject, _subtitleTextObject);
	// finally restart the add word delayed call
	exports._addWordDelayedCall = _addWordDelayedCall = TweenLite.delayedCall(_wordSpeed, _addWord);
	// set the dataset and user interactions booleans
	_textData.isDataSet = true;
	_allowUserEvents = true;
	// console.log( _slidesData[_currentSlideIndex] );
};

// create the text backgruond graphic
// when adding words to the text element 
var _textBackgroundGraph = exports._textBackgroundGraph = new PIXI.Graphics();

// create the text element
var _title = exports._title = new PIXI.Text("", _textStyle);

/* REFERENCE TEXT ELEMENT */
/* This is used to keep track of the height and width of the text.
 * When adding words we check this component for width in order to set the width
 * of the background color of each line. Also check it's height and when a new 
 * line is needed in order to add a new background rect in the background graphic
 * element.
 * This element is never rendered in the screen.
*/
// pixi text instance
var _refText = new PIXI.Text();
// set the style
_refText.style = _textStyle;
// initial text
_refText.text = "";

/** Method to get the width of the reference text element.	
 * @return {number} reference text element width
 * @private
*/
var _getRefWidth = function _getRefWidth() {
	return _refText.width;
};

/** Method to check the height of the reference text element.	
 * After updating the text string on the reference text element, check it's
 * height. If the height matches with the current line get the width and
 * store that number and the word in the paragraph array.
 * If the height indicates that a new line is forced and the current line
 * is less than 3, reset the reference text string (it should always be a
 * single line), add the new word, get the width and store the value and
 * the word in the array.
 * If a new line is created and the current line is 3, create a new array
 * for a new paragraph, reset the reference text string, add the new word,
 * get the width and then store the value and the word in the new paragraph
 * array.
 * @param {string} word the word being added to the reference text
 * @private
*/
var _checkRefHeight = function _checkRefHeight(word, index) {
	// get the data from the textt data object
	var pArrays = _textData.pArrays,
	    pStrings = _textData.pStrings,
	    paragraphsAmount = _textData.paragraphsAmount,
	    paragraphsIndex = _textData.paragraphsIndex;
	// add the word to the reference string

	_referenceText = _referenceText.concat(word);
	// set the text of the reference element
	_refText.text = _referenceText;
	// now get the new height of the reference element and then
	// proceed with the paragraphs.
	var _currHeight = _refText.height;
	// height is less than single line
	if (_currHeight <= _window._textLineHeight) {
		/* add a new word to the current paragraph in the paragraphs array
   * the current paragraph is given by the pargraphs amount index
   * in the text data object
  */
		pArrays[paragraphsAmount].push({ word: word, width: _getRefWidth(), line: _currentLineNumber });
		// add the word to the current paragraph string
		_currrentParagraph = _currrentParagraph.concat(word);
	} else if (_currHeight > _window._textLineHeight && _currentLineNumber < 3) {
		/* the height is more than a single line.
   * the current paragraph has less than 3 lines
   * increase the current line number, reset the reference string
   * add the word and check the width.
  */
		_currentLineNumber++;
		// set the ref string to just the new word
		_referenceText = "" + word.trim();
		// since the ref string is cleared and has just the new word
		// set the ref element's text to the ref string
		_refText.text = _referenceText;
		// add the new word to the current paragraph array
		pArrays[paragraphsAmount].push({
			word: word, width: _getRefWidth(), line: _currentLineNumber
		});
		// add the word to the current paragraph string
		_currrentParagraph = _currrentParagraph.concat(word);
	} else if (_currHeight > _window._textLineHeight && _currentLineNumber === 3) {
		/* The current paragraph has 3 lines, we create a new paragraph.
   * Store the current paragraph string on the strings array.
   * Reset the line number to 1
   * Reset the reference text to the current word.
   * Add a new paragraph array to the paragraphs array.
   * Increase the paragraphs amount.
  */
		pStrings.push(_currrentParagraph);
		// reset the current paragraph string
		_currentLineNumber = 1;
		_currrentParagraph = _referenceText = "" + word.trim();
		/* Store the final word index for the current paragraph and
   * the first word index for the next array. This will be used
   * in the resize event to display the same paragraph after an
   * orientation change.
  */
		// add the final word index to the current paragraph array
		paragraphsIndex[paragraphsAmount].push(index);
		// add a new array with the first word index
		paragraphsIndex.push([index + 1]);
		// since the ref string is cleared and has just the new word
		// set the ref element's text to the ref string
		_refText.text = _referenceText;
		pArrays.push([{ word: word.trim(), width: _getRefWidth(), line: _currentLineNumber }]);
		_textData.paragraphsAmount++;
	}
};

/**	Method to set the dimensions of the text component.	
 * Uses the screen size as reference for setting the size and position of
 * the text component as well as the font size and all dimension related
 * properties (font size, line height, etc.).
 * @private
*/
var _setTextDimensions = exports._setTextDimensions = function _setTextDimensions() {
	// set the position of the text element
	_title.position.set(_window.winSize.w * .18, _window.winSize.h - _window._textVerticalPos);
	// reset the styles
	_textStyle = _extends({}, _textStyle, {
		wordWrapWidth: _window.winSize.w * .64,
		fontSize: _fontSizes[_window._currentHeight],
		lineHeight: _lineHeights[_window._currentHeight]
	});
	// after reseting the text style apply it to the text elemenet
	_title.style = _textStyle;
	// set the styles for the reference
	_refText.style = _textStyle;
};

/** Method to create Paragraphs.	
 * Start with the title words array and then with the subtitle words array.
 * @param {object} pText the processed text object
 * @param {boolean} isSubt if the text being processed is the subtitle
 * @private
*/
var _createParagraphs = function _createParagraphs(pText, isSubt) {
	var pArrays = _textData.pArrays,
	    paragraphsAmount = _textData.paragraphsAmount,
	    paragraphsIndex = _textData.paragraphsIndex,
	    pStrings = _textData.pStrings;
	// if the param is undefined( no subtitle) leave the method

	if (!pText) {
		//console.log("no subtitle!!");return;
	}
	// add a new array to the paragraphs array
	// in this array the code adds the words for the first paragraph of each
	// text element (title / subtitle)
	pArrays.push([]);
	paragraphsIndex.push([0]);
	// before adding the next word, clear the reference text element and strings
	// to prevent the subtitle from starting at the wrong line and with an altered
	// width.
	_refText.text = _referenceText = "";
	// also reset the current line number because the new paragraph should start
	// at the first line
	_currentLineNumber = 1;
	// get the words array from the text object
	// loop through the array and add a word to the reference text
	pText.forEach(function (word, i) {
		// add the word and check the height of the reference text element
		_checkRefHeight(word, i);
	}); // words loop
	/* If this is the title and the slide has no subtitle, then check the
  * height and add the up arrow symbol to the last paragraph and check
  * if a new paragraph has to be created to make it fit.
 */
	if (!isSubt && !_hasSubtitle) {
		// console.log( _textData );
		// console.log( `---------\nLast Index => ${pArrays[paragraphsAmount].length}`);
		_checkRefHeight(" ↑", pArrays[paragraphsAmount].length);
	}
	// If this is the subtitle do the same of the previous conditional block
	if (isSubt) {
		// console.log( _textData );
		// console.log( `---------\nLast Index => ${pArrays[paragraphsAmount].length}`);
		_checkRefHeight(" ↑", pArrays[paragraphsAmount].length);
	}
	/* Add the final word index to the current paragraph index array
  * in order to keep reference to the last word of that paragraph.
  * This is useful for the final title paragraph if there's a subtitle
  * and also to prevent errors while getting an undefined element in 
  * the array.
 */
	paragraphsIndex[paragraphsAmount].push(pText.length);
	/* After creating the paragraphs the current paragraph string for the 
  * final paragraph won't be included in the strings array since the
  * code never reaches the final else if statement that pushes the
  * string to the array and resets to an emtpy one. In some cases the
  * string can be short that never creates more than 3 lines and the 
  * code never gets to the final else if.
  * in this part add the string to the array and reset it to an empty one
 */
	pStrings.push(_currrentParagraph);
	// reset current string
	_currrentParagraph = "";
	/* In the case the slide has a subtitle, we need to add the first word of
  * the subtitle in the new array that will be created when this function
  * runs again. For that increase the paragraphs amount.
 */
	_textData.paragraphsAmount++;
}; // create paragraphs


/** Main Text Process Method.	
 * This method runs the code to process the text and create the paragraphs
 * for a new slide.
 * Also this resets the data from the text data object and other variables.
 * @param {string} t the title of the slide
 * @param {string} s the subtitle of the slide
 * @private
*/
var _createSlideText = exports._createSlideText = function _createSlideText(t, s) {
	var timerA = new Date().getTime();
	// reset everything to the default values
	_resetTextData();
	// set the slide language
	_textData.slideLang = _ajaxModule._slidesData[_slideChangeModule._currentSlideIndex].slideLang;
	// set the has subtitle
	_hasSubtitle = s ? true : false;
	// create the text data
	if (t !== undefined) _createParagraphs(t.words, false);
	// set the amount of paragraphs in the title
	_titleParagraphsAmount = _textData.pArrays.length;
	if (s) {
		_createParagraphs(s.words, true);
	}
	// console.log(_textData);
	var timerB = new Date().getTime();
	// console.log( "total time => ", timerB - timerA );
	// _timeLogger.innerHTML = timerB - timerA;
};

/** Method to Animate the words.	
 * Called by the delayed call instance that controls the text animation.
 * Goes through the paragraphs arrays and adds the word to the text element.
 * Gets the line of the current word and the width of the background behind it.
 * After adding a new word check if the array has a next word and update the
 * current word index and the current paragraph index values.
 * @param {boolean} nP if a new paragraph is being created
 * @private
*/
var _addWord = function _addWord(nP) {
	/* Check if the slide's text is complete.
  * Also check if the user is touching the text element.
  * If the user is touching the element and the animation completes,
  * a delayed call will start and call this method to show the next
  * paragraph, check for the user interaction and leave the method.
 */
	if (_isTextComplete) {
		return;
	};
	/* if a new paragraph is being created, then we need to clear the
  * background graphic element.
  * also set the par gap delayed call to undefined to prevent it from
  * being restarted if the paragraph hasn't being completed.
 */
	if (nP) {
		// creating a new paragraph, increase the paragraph index
		_currrentParagraphIndex++;
		// Check if this is the last paragraph of the title and if
		// the fast forward option is true. in that case stop the method
		// also call the text complete event emitter
		if (_currrentParagraphIndex === _titleParagraphsAmount && _fastForward) {
			// create and start the timer
			// solves #56 https://gitlab.com/rhernandog/ainw-pixi-component/issues/56
			exports._textCompleteTimer = _textCompleteTimer = TweenLite.delayedCall(parseFloat((_textData.pArrays[_currrentParagraphIndex].length * 0.2).toFixed(2)), _globalClassModule._eventEmitter, ["textcomplete"]);
			return;
		}

		exports._parGap = _parGap = undefined;
		_currrentParagraphIndex === _titleParagraphsAmount && _fastForward ? null : _textBackgroundGraph.clear();
		// reset the display text to an empty string
		_displayText = "";
		// this is the final word of this paragraph but not the last paragraph
		// reset the word index to 0 and increase the paragraph index
		_currentWordIndex = 0;
	};
	/* if this is the first word of the first paragraph, start the TTS
  * for the title. Also set the booleans. The subtitle is set to false
  * while the title TTS boolean is set to true
  */
	// REMOVE WINDOW AIVOICE CONDITIONAL
	if (_currrentParagraphIndex === 0 && _currentWordIndex === 0 && window.aiVoice) {
		// set the booleans
		exports._ttsTitleStarted = _ttsTitleStarted = true;
		// Start TTS for the title
		window.aiVoice(_ajaxModule._slidesData[_slideChangeModule._currentSlideIndex].slideTitle, _textData.slideLang);
	}

	/* If this is the first word of the paragraph equal to the amount
  * of paragraphs of the title (the paragraphs have 0 index), then
  * is the first word of the subtitle. Also we have to check that the TTS
  * hasn't started in the scroll events.
 */
	// REMOVE WINDOW AIVOICE CONDITIONAL
	if (_currrentParagraphIndex === _titleParagraphsAmount && _currentWordIndex === 0 && !_ttsSubtitleStarted && window.aiVoice) {
		exports._ttsTitleStarted = _ttsTitleStarted = false;
		exports._ttsSubtitleStarted = _ttsSubtitleStarted = true;
		// Start TTS for the subtitle
		window.aiVoice(_ajaxModule._slidesData[_slideChangeModule._currentSlideIndex].slideMsg, _textData.slideLang);
	}
	// the current paragraph
	var _cuPar = _textData.pArrays[_currrentParagraphIndex];
	if (!_cuPar) return;
	// get the next word
	var _nextWord = _cuPar ? _cuPar[_currentWordIndex] : undefined;
	// add the word of the current paragraph
	if (_nextWord) {
		_displayText = _displayText.concat(_nextWord.word);
		// apply the text to the text element
		_title.text = _displayText;
		// create the background behind the word 0x00051b
		_textBackgroundGraph.beginFill(0x00051b)
		// start X is -5, start Y is line height x the line of the current word
		.drawRect(-5, _window._textLineHeight * _cuPar[_currentWordIndex].line, _cuPar[_currentWordIndex].width + 10, _window._textLineHeight).endFill();
	}
	if (!_cuPar) {
		return;
	}

	/* if there's another word in the array increase the current word index
  * and call this method again (restart the delayed call).
  * If there isn't another word, check if there's another paragraph in the
  * slide's text. If there's another paragraph, increase the current paragraph
  * index value. If there isn't another paragraph, don't call this method for
  * this slide.
  * Also check if the fast forward option is enabled. In that case, regardless
  * if there are more paragraphs, when the title is complete don't show the
  * subtitle, just start a timer and go to the next slide.
 */
	if (_currentWordIndex < _cuPar.length - 1) {
		// there is another word, increase the word index value
		_currentWordIndex++;
		// call the method again if is defined
		if (_addWordDelayedCall) {
			_addWordDelayedCall.restart(true);
		}
	} else if (_currentWordIndex === _cuPar.length - 1 && _currrentParagraphIndex < _textData.pArrays.length - 1) {
		/* A new paragraph will be added to the screen. Then we need the gap
   * between paragraphs in order to start a delayed call to add the new
   * paragraph. Basically is a call to this method.
   * Check if this is the last paragraph of the title in order to add 2
   * seconds to the delayed call.
  */
		var _parTimer = parseFloat((_cuPar.length * 0.2).toFixed(2));
		// add 2 secs between the text of the title and subtitle
		var _duration = _currrentParagraphIndex === _titleParagraphsAmount - 1 ? _parTimer + 2 : _parTimer;
		exports._parGap = _parGap = TweenLite.delayedCall(_duration, _addWord, [true]).pause();
		// If the user is toucing the text element, don't start the delayed call
		!_interactionModule._userInteraction ? _parGap.restart(true) : null;
	} else if (_currentWordIndex === _cuPar.length - 1 && _currrentParagraphIndex === _textData.pArrays.length - 1) {
		// this is the last word of the last paragraph
		// the word and paragraph index will be reset for the next slide
		// or after the scroll method
		_isTextComplete = true;
		// now emit the text complete event
		/* INCLUDE THE TEXT COMPLETE EVENT EMITTER HERE */
		// create and start the timer 
		// solves #56 https://gitlab.com/rhernandog/ainw-pixi-component/issues/56
		exports._textCompleteTimer = _textCompleteTimer = TweenLite.delayedCall(parseFloat((_textData.pArrays[_currrentParagraphIndex].length * 0.2).toFixed(2)), _globalClassModule._eventEmitter, ["textcomplete"]);
	} // word paragraph index conditional
	if (_currentWordIndex === 1 && !_isTextComplete) {
		/*
  	INSERT TTS CALL HERE
  	THE TEXT PASSED TO THE TTS METHOD IS LOCATEDIN THE 
  	TEXTDATA OBJECT
  	_textData.pStrings[_currrentParagraphIndex]
  	SLIDE LANGUAGE IS ALSO STORED IN THE TEXT DATA OBJECT
  	_textData.slideLang
  	YOU CAN SEE IT IN THE CONSOLE LOGS BELOW
  */
		// console.log( "------------\nSTARTING A NEW PARAGRAPH, CALL TTS" );
		// console.log( _textData.pStrings[_currrentParagraphIndex] );
		// console.log( _textData.slideLang );
		// _textData.isDataSet = true;
		// _allowUserEvents = true;
	}
}; // add word method


/*
*******************************************************************************************
		TOUCH EVENTS
*******************************************************************************************
*/
/** Touch Start Method
 * @param {object} e PIXI event object
 * @private
*/
var _textTouchStart = exports._textTouchStart = function _textTouchStart(e) {
	// prevent bubbling
	e.stopPropagation();
	// only if the text data for the slide has been set allow the
	// user interaction events
	if (_textData.isDataSet && _allowUserEvents) {
		// set the touching bool to true
		_isUserTouching = true;
		// update the start paragraph index for the next touch event
		_startParIndex = _currrentParagraphIndex;
		// console.log("start par index => ", _startParIndex);
		// set the start drag point
		_textStartY = e.data.global.y;
		// if the paragraph gap timer is running, pause it
		if (_parGap) {
			_parGap.pause().kill();
		};
	}
};

/** Touch End Method
 * When the touch is done, after reseting the boolean we need to restart the 
 * @private
*/
var _textTouchEnd = exports._textTouchEnd = function _textTouchEnd(e) {
	// stop event bubbilng
	// comment out in order to solve #55
	// https://gitlab.com/rhernandog/ainw-pixi-component/issues/55
	// e.stopPropagation();
	// only if the text data for the slide has been set allow the
	// user interaction events
	if (_allowUserEvents && _isUserTouching) {
		// finally set the touching bool to false
		_isUserTouching = false;
		/* After the interaction is complete check if the current paragraph is the
   * final one. The user could drag after all the paragraphs are animated in
   * in that case the text complete bool is true and the user could go to a
   * previous paragraph and the delayed call won't be started.
  */
		_isTextComplete = _currrentParagraphIndex === _textData.paragraphsAmount - 1;
		// if the timer is not created and this is not the final paragraph
		// create the timer
		// the final conditional is to check that there are actually paragraphs created
		// this could be called if the user touches the screen before processing
		// the text of the new slide, so the paragraphs array will be empty
		// returning an error for an undefined element.
		// related to this
		// https://gitlab.com/rhernandog/ainw-pixi-component/issues/51
		if (!_isTextComplete && !_parGap /*  && _textData.pArrays[_currrentParagraphIndex] */) {
				exports._parGap = _parGap = TweenLite.delayedCall((_textData.pArrays[_currrentParagraphIndex].length * 0.2).toFixed(2), _addWord, [true]).pause(); // delayed call
			}
		// restart the word animation if the text is not complete
		if (!_isTextComplete && _currrentParagraphIndex < _textData.paragraphsAmount - 1) {
			_parGap.restart(true);
		};
	}
};

/** Touch Move Method
 * @param {object} e PIXI event object
 * @private
*/
var _textTouchMove = exports._textTouchMove = function _textTouchMove(e) {
	// stop event bubbilng
	e.stopPropagation();
	if (_isUserTouching && _allowUserEvents) {

		_textDragAmount = _textStartY - e.data.global.y;
		// _textDirection = _textDragAmount > 0;
		var _targetParagraph = _startParIndex + Math.round(_textDragAmount / _textMinDrag);
		// show the target paragraph if is different from the current
		if (_currrentParagraphIndex !== _targetParagraph && _textData.pStrings[_targetParagraph] !== undefined) {
			/* If the first paragraph is the target, then start the TTS
    * for the title text. Also set the TTS boolean to true for the 
    * title and false for the subtitle.
   */
			if (_targetParagraph === 0 && !_ttsTitleStarted && window.aiVoice) {
				exports._ttsTitleStarted = _ttsTitleStarted = true;
				exports._ttsSubtitleStarted = _ttsSubtitleStarted = false;
				// Start TTS for the title
				window.aiVoice(_ajaxModule._slidesData[_slideChangeModule._currentSlideIndex].slideTitle, _textData.slideLang);
			}
			/* If this is the first paragraph of the subtitle, start the TTS
    * for the subtitle text and set the boolean to true. Also set
    * the title TTS boolean to false.
   */
			if (_targetParagraph === _titleParagraphsAmount && !_ttsSubtitleStarted && window.aiVoice) {
				exports._ttsTitleStarted = _ttsTitleStarted = false;
				exports._ttsSubtitleStarted = _ttsSubtitleStarted = true;
				// Start TTS for the subtitle
				window.aiVoice(_ajaxModule._slidesData[_slideChangeModule._currentSlideIndex].slideMsg, _textData.slideLang);
			}
			if (_addWordDelayedCall) _addWordDelayedCall.pause().kill();
			if (_parGap) _parGap.pause().kill();
			// if the text was completed either through scroll or animation, the user
			// is scrolling to a previous paragraph. Reset the text complete boolean
			// to false. Also stop and reset the text complete emitter timer
			_isTextComplete = false;
			if (_textCompleteTimer) {
				_textCompleteTimer.pause();exports._textCompleteTimer = _textCompleteTimer = undefined;
			};

			// console.log( `within limits.  total par => ${_textData.paragraphsAmount - 1} * curr par => ${_targetParagraph}` );
			// store the target paragraph array
			var _targetParArray = _textData.pArrays[_targetParagraph];
			var _targetArrayWords = _targetParArray.length;
			// we should show a different paragraph
			// show the new paragraph
			_title.text = _textData.pStrings[_targetParagraph];
			// update the paragraph index
			_currrentParagraphIndex = _targetParagraph;
			// clear the background graphics
			_textBackgroundGraph.clear();
			// Go through the words of the target paragraph and check the line widths
			// once we reach the final word of the line draw a graphic 
			var _targetLine = 1;
			_targetParArray.forEach(function (w, i) {
				// if the line of he current word is less than the current line
				// update the current line index and set the graphic width
				// to the width of the previous word
				if (_targetLine < w.line) {
					// create the new graphic
					_textBackgroundGraph.beginFill(0x00051b).drawRect(-5, _window._textLineHeight * _targetLine, _targetParArray[i - 1].width + 10, _window._textLineHeight).endFill();
					// update the target line value
					_targetLine = w.line;
				} // line conditional
			}); // words loop
			// draw the final line graphic
			_textBackgroundGraph.beginFill(0x00051b).drawRect(-5, _window._textLineHeight * _targetLine, _targetParArray[_targetArrayWords - 1].width + 10, _window._textLineHeight).endFill();
			//
		}

		/* Emit the text complete event if the user has reached the final paragraph and
   * the event hasn't been emited yet. In this case is a timer considering the 
   * paragraph length. After that timer is complete the event will be triggered.
   * If the user scrolls to a previous paragraph the previous conditional block
   * will be triggered and we'll reset the text complete boolean to false and that
   * will allow for this conditional block to be executed again, starting the 
   * text complete timer again and setting the text complete boolean to true.
   * Check if the text complete bool is false (text hasn't completed yet) and
   * that the last paragraph is already visible.
  */
		if (!_isTextComplete && _targetParagraph >= _textData.paragraphsAmount - 1) {
			// set the text complete bool to true
			_isTextComplete = true;
			// create and start the timer 
			exports._textCompleteTimer = _textCompleteTimer = TweenLite.delayedCall(parseFloat((_textData.pArrays[_currrentParagraphIndex].length * 0.2).toFixed(2)), _globalClassModule._eventEmitter, ["textcomplete"]);
		}
	} // user touch conditional
}; // touch move


/** Method to toggle the user interaction boolean.
 * Sets the interaction boolean (_allowUserEvents) to the value
 * passed in the params.
 * @param {boolean} v the value to set the boolean
 * @private
*/
var _setUserInteraction = exports._setUserInteraction = function _setUserInteraction(v) {
	return _allowUserEvents = v;
};

/** Method to Init the Text Module
 * This adds the PIXI instances to the text stage container
 * and sets the initial position of the text and background
 * once the app is ready
*/
var _initTextModule = exports._initTextModule = function _initTextModule() {
	// add it to the text stage
	_pixiModule._textStage.addChild(_textBackgroundGraph);
	_pixiModule._textStage.addChild(_title);
	_pixiModule._textStage.x = 5;
	// set the dimensions of the text elements
	_setTextDimensions();
	// now position the text and the background graphics elements
	_textBackgroundGraph.position.set(_window.winSize.w * .18, _window.winSize.h - _window._textVerticalPos - _window._textLineHeight);
	// attach tap event to the text container
	_pixiModule._textStage.interactive = true;
	_pixiModule._textStage.on("touchstart", _interactionTextModule._textTapStart).on("mousedown", _interactionTextModule._textTapStart).on("touchend", _interactionTextModule._textTapEnd).on("mouseup", _interactionTextModule._textTapEnd).on("touchendoutside", _interactionTextModule._textTapEndOut).on("mouseupoutside", _interactionTextModule._textTapEndOut);
};

/** Method for the resize event
 * On the resize event, regardless if the height breakpoint is passed
 * or not, we need to restart the text animation and position the text
 * and the background according to the new screen dimensions.
*/
var _resizeTextEvent = exports._resizeTextEvent = function _resizeTextEvent() {

	// stop all delayed calls.
	_parGap ? _parGap.pause().kill() : null;
	if (_addWordDelayedCall) {
		_addWordDelayedCall.pause().kill();
	};
	if (_textCompleteTimer) {
		_textCompleteTimer.pause().kill();
	};
	/* set the add word delayed call to undefined
  * This in case the resize event triggers before is restarted
  * which could throw an error
 */
	exports._addWordDelayedCall = _addWordDelayedCall = undefined;
	exports._textCompleteTimer = _textCompleteTimer = undefined;
	// set the position of the text and background elements
	_title.position.set(_window.winSize.w * .18, _window.winSize.h - _window._textVerticalPos);
	_textBackgroundGraph.position.set(_window.winSize.w * .18, _window.winSize.h - _window._textVerticalPos - _window._textLineHeight);
	// set the text dimensions
	_setTextDimensions();

	// now reset the texts of the slide
	_resetTextData();
	// in the case of a resize while a new group is being loaded or the
	// text is not processed, create a conditional to check if the
	// text data is set
	// solves #65
	// https://gitlab.com/rhernandog/ainw-pixi-component/issues/65
	if (_slideModule._appInitialized) {
		// now create the text data for the new screen size
		_createSlideText(_titleTextObject, _subtitleTextObject);
		// finally restart the add word delayed call
		exports._addWordDelayedCall = _addWordDelayedCall = TweenLite.delayedCall(_wordSpeed, _addWord);
	} // text data set conditional
}; // resize event conditional end

},{"../ajax-module":1,"../global-class-module":7,"../interaction-module":9,"../pixi-module":18,"../slide-change-module":24,"../slide-module":25,"../window":37,"./interaction-text-module":31}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._setTextureScale = exports._setAnimationType = exports._resetTexturesArray = exports._resetScalePosition = exports._texturesArray = undefined;

var _window = require("./window");

var _ajaxModule = require("./ajax-module.js");

var _slideChangeModule = require("./slide-change-module.js");

var _slideModule = require("./slide-module.js");

var _interactionModule = require("./interaction-module");

var _globalClassModule = require("./global-class-module");

// array that holds the base textures

// get the method to reset the interaction bools

// get the current slide index to check which texture should be loaded
/*
*******************************************************************************************
*  TEXTURES MODULE
*******************************************************************************************
*/
// get the screen dimensions
var _texturesArray = exports._texturesArray = [];

/** Method to reset the textures animation type.	
 *  Run when the window resize event happens (orientation change).	
 * 	This method will run a loop through the textures array and call
 * 	the methods to set the texture scale and the animation type for
 * 	each texture with the new screen dimensions.
*/

// get the animation store
// import { _animationStore } from "./animation/animation-store";
// get the color rotation method
// import { _rotateColor } from "./textures";
// get the vent emitter 

// get the method to update the main slide's texture
// get the method to set the app initialization boolean back to true
var _resetScalePosition = exports._resetScalePosition = function _resetScalePosition() {
	_texturesArray.forEach(function (bt, i) {
		// check if the texture is loaded or failed
		// if the texture is not loaded don't do anything
		if (bt) {
			// console.log( `cur text => ${i}` );
			// set the texture scale
			_setTextureScale(bt);
			// set the animation type
			_setAnimationType(bt, i);
			// console.log( `type => ${bt._genericAnimationType}` );
		} // conditional end
		// when the current slide index is the current one of the loop
		// update the texture of the main slide
		if (i === _slideChangeModule._currentSlideIndex) (0, _slideModule._updateMainSlideTexture)(bt);
	}); // loop end
}; // reset scale position


/** Method to Reset The Textures Array
 *  This method sets the textures array to an empty array and then
 * 	calls the method to populate the array using the slides data.
 * 	This should be called after the ajax response
 */
var _resetTexturesArray = exports._resetTexturesArray = function _resetTexturesArray() {
	// console.log(_slidesData);
	// destroy the current textures
	_texturesArray.forEach(function (e) {
		e ? e.destroy() : null;
		e ? e.dispose() : null;
	});
	// empty the textures array
	exports._texturesArray = _texturesArray = [];
	// call the method to populate the array
	_createTexturesArray();
};

/** Set Texture Animation Type	
 *  This method is used to set the animation type for a base texture.	
 * 	Take the texture's mandating scale and vertical ratio bool, then
 * 	check if the scaled dimension excess is 19.5% bigger than the scaled
 * 	dimension (width / height). Based on that set the generic animation
 * 	type for the texture.	
 * 	The generic animation type could change during the code execution just
 * 	if two consecutive vertical animations will happen, in that case the code
 * 	will default to a zoom animation.
 * 	@param {object} b: a PIXI base texture.
*/
var _setAnimationType = exports._setAnimationType = function _setAnimationType(b) {
	var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	// create a single variable for the scaled dimension
	var _scaledDim = void 0;
	// get the vertical boolean to see the dimensions we should compare
	if (b._vRatio) {
		// true, the animation should be vertical, check the scaled height
		_scaledDim = b.realHeight * b._scaleRatio;
		var _scaledHeightExcess = _scaledDim - _window.winSize.h;
		var _imageExcess = _scaledHeightExcess / _scaledDim * 100 > 19.5;

		// depending on the result of this variable (true / false) if the animation
		// should be vertical or zoom, for the current screen dimensions
		b._genericAnimationType = _imageExcess ? 0 : 2;
		// store the difference between the scaled texture and the screen size
		b._scaledHeightExcess = _scaledHeightExcess;
		// set the other to null in order to get just the one with a value when the 
		// stripes are created 
		b._scaledWidthExcess = null;
	} else {
		// true the animation should be horizontal
		_scaledDim = b.realWidth * b._scaleRatio;
		var _imageExcess2 = (_scaledDim - _window.winSize.w) / _scaledDim * 100 > 19.5;
		// depending on the result of this variable (true / false) if the animation
		// should be horizontal or zoom, for the current screen dimensions
		b._genericAnimationType = _imageExcess2 ? 1 : 2;
		// store the difference between the scaled texture and the screen width
		b._scaledWidthExcess = _scaledDim - _window.winSize.w;
		b._scaledHeightExcess = null;
	} // vertical ratio conditional
}; // set animation type


/** Method to set the Base Texture Fit Scale.	
 *  This checks the loaded texture real dimensions against the current screen
 * 	size and stores the mandating ratio and vertical boolean in the texture.	
 * 	In the case of an orientation change, this method should be called for each
 * 	correctly loaded texture.
 * 	@param {object} b: a PIXI base texture
*/
var _setTextureScale = exports._setTextureScale = function _setTextureScale(b) {
	// get the mandating ratio to fit the image in the current screen size
	// is the biggest scale that should be used to fit one of the dimensions in the 
	// corresponding screen direction (height or width).
	// vertical ratio - height
	var _vr = _window.winSize.h / b.realHeight;
	// horizontal ratio - width
	var _hr = _window.winSize.w / b.realWidth;
	var _scaleRatio = Math.max(_hr, _vr);
	// the vertical ratio boolean, indicates if the horizontal ratio is bigger than the
	// vertical ratio. This is used to check if the burns effect should be vertical
	// (true) or horizontal (false)
	var _vRatio = _hr > _vr;
	// store the scale ratio and the vertical ratio bool in the texture
	b._scaleRatio = _scaleRatio;
	b._vRatio = _vRatio;
	b._scaledWidth = b.realWidth * _scaleRatio;
	b._scaledHeight = b.realHeight * _scaleRatio;
};

/** Method to Create a PIXI Base Texture
 *  This method creates a new base texture and the loaded and error
 * 	event callbacks.
 * 	This two events will update the textures array and the main slide's
 * 	texture.
 * 	@param {string} u: the image url
 * 	@param {number} i: the index position of the texture in the array
*/
var _loadTextureImage = function _loadTextureImage(u, i) {
	// create the base texture
	var _b = new PIXI.BaseTexture.fromImage(u, true);

	_b.on("loaded", function (e) {
		// move this to the window module and calculate this on startup and
		// the resize event
		var reducer = Math.round(Math.max(_window.winSize.w, _window.winSize.h) * 0.7);
		// check the image resolution
		var _safeRes = e.imageType === "gif" ? 1000 : reducer;
		/* the new base texture
   * this wiill be added to the textures array.
   * depending on the image's resolution, this will be the texture
   * loaded or a new created texture from a reduced one in order to 
   * optimize the app.
   * By default we set the texture to be the one being loaded. If the
   * resolution is bigger than the threshold, the we create a new texture
   * based on the optimization code.
  */
		var _base = e;
		// check if the dimensions of the image pass the safe resolution
		if (e.realWidth > _safeRes && e.realHeight > _safeRes) {
			var _newResolution = e.realHeight > e.realWidth ? e.realWidth / _safeRes : e.realHeight / _safeRes;

			var newW = Math.floor(e.realWidth / _newResolution);
			var newH = Math.floor(e.realHeight / _newResolution);

			// create a new canvas element
			var extractCanvas = document.createElement('canvas');
			extractCanvas.width = newW;
			extractCanvas.height = newH;
			var image = new Image();
			image.onload = function () {
				extractCanvas.getContext("2d").drawImage(image, 0, 0, newW, newH);
			};
			image.src = u;
			// set the base texture to the one extracted from the canvas element
			_base = new PIXI.BaseTexture(extractCanvas);

			//we need to destroy the old baseTexture > important
			e.destroy();
		} // image resolution conditional

		// update the texture array with the base texture
		_texturesArray.splice(i, 1, _base);
		// set the base texture's scale and vertical ratio bool
		_setTextureScale(_base);
		/*	set the generic animation type for the base texture.
   *	this could change during the code's execution, depending on the
   *	previous generic animation
  */
		_setAnimationType(_base, i);
		// check if the current slide index is the same of this texture
		// also check if there's a user interaction, in that case update the 
		// main slide and the current stripes
		// Check if a new group is being loaded, in that case don't update
		// the slide texture in order to prevent the main slide from being visible
		// while the new group data is being fetched. When a new group is requested
		// the app init boolean is set to false.
		// if is the same update the slide's texture
		if (i === _slideChangeModule._currentSlideIndex && _slideModule._appInitialized) {
			(0, _slideModule._updateMainSlideTexture)(_base);
		}
	}).on("error", function () {
		/*  Image failed. Set the value for the current slide to false.
   *  When creating the stripes and updating the texture, the code
   * 	will check for either false/null and will create graphics instead
   * 	of stripes and update the main slide's texture using a color filled
   * 	texture.
  */
		_texturesArray.splice(i, 1, false);
		//console.log("error", i);
	});
};

/** Method to load the first/last 3 textures of the textures array.
 *  This method acts like an init method for the array.
 * 	Is called when a new set of slides is requested.
 */
var _initTexturesArray = function _initTexturesArray() {
	// TEST CODE USES ALL TEXTURES AT ONCE
	_ajaxModule._slidesData.forEach(function (e, i) {
		// console.log( e.image );
		_loadTextureImage(e.image, i);
	});
	// now that the textures are added to the array, set the initialized app
	// boolean to true in order to allow the user interaction
	(0, _slideModule._resetAppInitBool)(true);
	/*	if the user destroys the slider to update the settings, the interaction booleans
  *	will be set to prevent any user interaction, because the destroy method only
  *	resets the visibility of the main slide, and removes all the display objects,
  *	but the renderer and the stage (element that receives the user interaction events)
  *	remain in the slider, therefore once the slider is created again, reset the
  *	interaction booleans to allow user interaction
  */
	(0, _interactionModule._setInteractionBools)(false);
	// emit the slider init event in order to invoke any callback that might be stored
	// in the events emitter object
	(0, _globalClassModule._eventEmitter)("sliderinit");
}; // init textures array

/** Method to add elements to the textures array
 *  This loops through the slides data and adds a null value for each
 * 	slide. Then calls the method to load the first/last 3 images that 
 * 	will update the 
 */
var _createTexturesArray = function _createTexturesArray() {
	_ajaxModule._slidesData.forEach(function () {
		_texturesArray.push(null);
	}); // loop
	// after adding the elements to the array, load the first 3 textures
	_initTexturesArray();
};

},{"./ajax-module.js":1,"./global-class-module":7,"./interaction-module":9,"./slide-change-module.js":24,"./slide-module.js":25,"./window":37}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._rotateColor = exports._currentColorIndex = exports._colorsArray = undefined;

var _stripes = require("../stripes");

var _pixiModule = require("../pixi-module");

// colors array
/*
*******************************************************************************************
*  COLOR ROTATION MODULE
*******************************************************************************************
*/

// get the reset graphic stripes bool method
var _colorsArray = exports._colorsArray = [0xF2F98B, 0x7F40F1, 0xFF1361, 0x5E1FE4, 0xFF3737];

/* export const _testColorsArray = [
	#F2F98B, #7F40F1, #FF1361, #5E1FE4, #FF3737
]; */

// amount of colors

// get the method to update the base texture color
var _colorsAmount = _colorsArray.length;

// current color index
var _currentColorIndex = exports._currentColorIndex = 0;

/** Color Rotation Method	
 *  Changes the target color index and returns the target color.	
 * 	This color is stored in the textures array when a slide's image is sitll
 * 	loading or has failed.
*/
var _rotateColor = exports._rotateColor = function _rotateColor() {
	// set the new color index value
	exports._currentColorIndex = _currentColorIndex = _currentColorIndex < _colorsAmount - 1 ? _currentColorIndex + 1 : 0;
	// console.log( _currentColorIndex, _colorsArray[_currentColorIndex] );
	// after updating the color index, reset the graphics stripes boolean
	(0, _stripes._resetGraphicStripesBool)();
	// now update the base texture color
	(0, _pixiModule._updateBaseColor)();
};

},{"../pixi-module":18,"../stripes":29}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorRotation = require("./color-rotation");

Object.keys(_colorRotation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _colorRotation[key];
    }
  });
});

},{"./color-rotation":34}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._checkBreakpoints = exports._textVerticalPos = exports._textLineHeight = exports._widthDimensions = exports._widthBreakpoints = exports._currentHeight = exports._currentWidth = undefined;

var _windowModule = require("./window-module");

var _loader = require("../loader");

var _textModule = require("../text-module");

/*  Checks the different screen sizes and when the specific breakpoints are
 *  passed and updates a height and width vars indicating the current screen
 * 	dimension.
*/

// VERSION 2.2.2 BREAKOINTS
// WIDTH <= 767 && > 767


// current dimensions integers

// get the method to position the button
var _currentWidth = exports._currentWidth = void 0;
// get the method to update the text styles
/*
*******************************************************************************************
*  BREAKPOINTS MODULE
*******************************************************************************************
*/

var _currentHeight = exports._currentHeight = void 0;

// screen width breakpoints
var _widthBreakpoints = exports._widthBreakpoints = [767];
var _widthDimensions = exports._widthDimensions = ["small", "large"];

// text component dimensions that depend on the screen height
// the height of a text line
var _textLineHeight = exports._textLineHeight = 23;
// text element vertical position 135 - 175 - 203
var _textVerticalPos = exports._textVerticalPos = 135;

/** Method to Check the Breakpoints.	
 *  As the screen size changes, this method will check if a breakpoint has been
 * 	passed, instead of reactic just to the screen dimensions, the code checks
 * 	for the size and the current dimension string and according to that calls
 * 	an resize event callback.
*/
var _checkBreakpoints = exports._checkBreakpoints = function _checkBreakpoints() {
	// console.log( "breakpoints" );
	// create variables for the current dimension in order to compare
	var _preWidth = _currentWidth;
	var _preHeight = _currentHeight;
	var w = _windowModule.winSize.w,
	    h = _windowModule.winSize.h;

	// check the width
	// the numbers matches the index position of the positions and 
	// sizes in the arrays on the logo module

	switch (true) {
		case w > 767 && _currentWidth !== 1:
			exports._currentWidth = _currentWidth = 1;
			break;
		case w <= 767 && _currentWidth !== 0:
			exports._currentWidth = _currentWidth = 0;
			break;
	} // width switch

	// check the height for the text component
	if (h > 1280 && _currentHeight !== 3) {
		exports._currentHeight = _currentHeight = 3;
		exports._textLineHeight = _textLineHeight = 58;
		exports._textVerticalPos = _textVerticalPos = 203;
	} else if (h > 1024 && _currentHeight !== 2) {
		exports._currentHeight = _currentHeight = 2;
		exports._textLineHeight = _textLineHeight = 45;
		exports._textVerticalPos = _textVerticalPos = 203;
	} else if (h > 736 && _currentHeight !== 1) {
		exports._currentHeight = _currentHeight = 1;
		exports._textLineHeight = _textLineHeight = 36;
		exports._textVerticalPos = _textVerticalPos = 175;
	} else if (h <= 736 && _currentHeight !== 0) {
		exports._currentHeight = _currentHeight = 0;
		exports._textLineHeight = _textLineHeight = 23;
		exports._textVerticalPos = _textVerticalPos = 135;
	}

	// position the menu button only if the button is defined
	_loader._menuButton ? (0, _loader._positionButton)(_currentWidth) : null;
	// check if the current width string changed
	if (_currentWidth !== _preWidth) (0, _windowModule._resizeEmitter)("width", _currentWidth);
	// check if the current height integer changed
	if (_currentHeight !== _preHeight) {
		(0, _textModule._setTextDimensions)();
	};
};

},{"../loader":12,"../text-module":30,"./window-module":38}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _windowModule = require("./window-module");

Object.keys(_windowModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _windowModule[key];
    }
  });
});

var _breakpoints = require("./breakpoints");

Object.keys(_breakpoints).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _breakpoints[key];
    }
  });
});

},{"./breakpoints":36,"./window-module":38}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._resizeEmitter = exports._setStripeHeight = exports._heightReminder = exports._stripeHeight = exports.winSize = undefined;

var _pixiModule = require("../pixi-module");

var _stripesModule = require("../stripes-module");

var _texturesModule = require("../textures-module");

var _loader = require("../loader");

var _breakpoints = require("./breakpoints");

var _globalClassModule = require("../global-class-module");

var _slideModule = require("../slide-module");

var _textModule = require("../text-module");

var _promptModule = require("../prompt-module");

/* WINDOW SIZE OBJECT */

// get the text resize event

// get the preloader event

// get the method to check the breakpoints

// get the method to update the textures scale, position and animation data
/*
*******************************************************************************************
*  WINDOW SETTINGS MODULE
*******************************************************************************************
*/
/*  This module holds the variables and methods related to the window
 *  size and the window resize event.
 * 	Every event that should be triggered by the window resize should be imported
 * 	here and included in the resize event handler.
 * 	This also exports the window size object
 */

// get main renderer for resize event
// get the loading sprite
var winSize = exports.winSize = {
	w: document.documentElement.clientWidth,
	h: document.documentElement.clientHeight
};

// stripe height
// set each stripe height using the stripes amount (9) and set it
// when the window size changes
// export let _stripeHeight = ( winSize.h / _stripesAmount ).toFixed(4);


///////////////////////////////////////////////////////
/* FROM VERSION 2.2.4
 * the stripes height is not fix for all the stripes
 * the final stripe will be less than the rest in order to 
 * set the height of the stripes to an integer.
 * we set the height of the stripes to an integer and the final
 * stripe's height is going to be the difference between the
 * height of the screen and the sum of the rest of the stripes
 * screenHeight - ( ( amount - 1 ) * stripeHeight )
*/

// get the position method for the prompt

// get the initialized boolean

// get the event emitter

// get the logo position and size methods

// get the stripes amount
var _stripeHeight = exports._stripeHeight = void 0,
    _heightReminder = exports._heightReminder = void 0;
/**
 * Method to set the stripes height.
 * @private
*/
var _setStripeHeight = exports._setStripeHeight = function _setStripeHeight() {
	// set the amount of stripes first
	(0, _stripesModule._calculateStripes)(winSize.h);
	// now set the height of the stripes
	exports._stripeHeight = _stripeHeight = Math.ceil(winSize.h / _stripesModule._stripesAmount);
	exports._heightReminder = _heightReminder = winSize.h - (_stripesModule._stripesAmount - 1) * _stripeHeight;

	if (_heightReminder < 2) {
		exports._stripeHeight = _stripeHeight -= 1;
		exports._heightReminder = _heightReminder = winSize.h - (_stripesModule._stripesAmount - 1) * _stripeHeight;
	}
};
// set the initial height of the stripes
_setStripeHeight();
///////////////////////////////////////////////////////


// general method returns the screen dimensions
var _getWinDims = function _getWinDims() {
	exports.winSize = winSize = { w: document.documentElement.clientWidth, h: document.documentElement.clientHeight };
};

/** Resize Events	
 *  Object with all the resize events separated in width and height.
 * 	This is used only for events that should be called when a breakpoint
 * 	is passed. Other events such as renderer and main slide resize, and 
 * 	calculation of the textures and their scales is done on every single
 * 	resize event.
*/
var _resizeEvents = {
	width: [_loader._setLogoPosition]
};

/** Resize Event Emitter.	
 *  This is called in the check breakpoints if a breakpoint has been
 * 	passed on a screen size change.	
 * 	It uses a type string that identifies one of the main objects in 
 * 	the events object (width or height).	
 * 	Uses a dimension string, which is registered 
 * 	@param {string} t: the type, width or height
 * 	@param {string} d: the dimension
*/
var _resizeEmitter = exports._resizeEmitter = function _resizeEmitter(t, d) {
	// check if the resize event is registered
	if (_resizeEvents[t]) {
		_resizeEvents[t].forEach(function (e) {
			return e(d);
		});
	};
};

// window resize method
window.onresize = function () {
	// set new dimensions
	_getWinDims();
	// store new dimensions
	var _newWidth = winSize.w;
	var _newHeight = winSize.h;
	// resize pixi renderer
	_pixiModule._mainRender.renderer.resize(_newWidth, _newHeight);
	// set the new height of the stripes
	// _stripeHeight = ( winSize.h / _stripesAmount ).toFixed(4);
	// VERSION 2.2.4 SET THE STRIPE HEIGHT USING THE METHOD
	_setStripeHeight();
	/* run the loop to update the textures information. This will eventually
  * update the main slide's texture if the image has been loaded.
  * The resize event could be called while a new group is being loaded or
  * while the app is getting ready in the first run. In that case there's
  * no need to run the code to update the textures information and update
  * the main slide texture.
 */
	if (_slideModule._appInitialized) {
		(0, _texturesModule._resetScalePosition)();
	};
	(0, _breakpoints._checkBreakpoints)();
	// postion the preloader
	(0, _loader._positionLoader)();
	// set the new position of the text elements
	(0, _textModule._resizeTextEvent)();
	// position the prompt component
	(0, _promptModule._positionPrompt)();
	// emit the resize event
	(0, _globalClassModule._eventEmitter)("resize");
};

},{"../global-class-module":7,"../loader":12,"../pixi-module":18,"../prompt-module":20,"../slide-module":25,"../stripes-module":27,"../text-module":30,"../textures-module":33,"./breakpoints":36}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFqYXgtbW9kdWxlLmpzIiwic3JjXFxhbmltYXRpb25cXGFuaW1hdGlvbi1zdG9yZS5qcyIsInNyY1xcYW5pbWF0aW9uXFxidXJucy1lZmZlY3QtbW9kdWxlLmpzIiwic3JjXFxhbmltYXRpb25cXGluZGV4LmpzIiwic3JjXFxhcHAuanMiLCJzcmNcXGN1cnItc3RyaXBlcy1tb2R1bGUuanMiLCJzcmNcXGdsb2JhbC1jbGFzcy1tb2R1bGUuanMiLCJzcmNcXGluaXQtbW9kdWxlLmpzIiwic3JjXFxpbnRlcmFjdGlvbi1tb2R1bGUuanMiLCJzcmNcXGludGVyYWN0aW9uXFxpbmRleC5qcyIsInNyY1xcaW50ZXJhY3Rpb25cXHRhcC1ldmVudHMtbW9kdWxlLmpzIiwic3JjXFxsb2FkZXJcXGluZGV4LmpzIiwic3JjXFxsb2FkZXJcXGxvZ28uanMiLCJzcmNcXGxvYWRlclxcbWFpbi5qcyIsInNyY1xcbG9hZGVyXFxtZW51LWJ1dHRvbi5qcyIsInNyY1xcbG9hZGVyXFxwcmVsb2FkZXIuanMiLCJzcmNcXG5leHQtc3RyaXBlcy1tb2R1bGUuanMiLCJzcmNcXHBpeGktbW9kdWxlLmpzIiwic3JjXFxwcmV2LXN0cmlwZXMtbW9kdWxlLmpzIiwic3JjXFxwcm9tcHQtbW9kdWxlXFxpbmRleC5qcyIsInNyY1xccHJvbXB0LW1vZHVsZVxccHJvbXB0LWltYWdlLmpzIiwic3JjXFxwcm9tcHQtbW9kdWxlXFxwcm9tcHQtaW50ZXJydXB0LmpzIiwic3JjXFxwcm9tcHQtbW9kdWxlXFxwcm9tcHQtdGV4dC5qcyIsInNyY1xcc2xpZGUtY2hhbmdlLW1vZHVsZS5qcyIsInNyY1xcc2xpZGUtbW9kdWxlLmpzIiwic3JjXFxzcHJpdGVzLW1vZHVsZS5qcyIsInNyY1xcc3RyaXBlcy1tb2R1bGUuanMiLCJzcmNcXHN0cmlwZXNcXGdyYXBoaWMtc3RyaXBlcy5qcyIsInNyY1xcc3RyaXBlc1xcaW5kZXguanMiLCJzcmNcXHRleHQtbW9kdWxlXFxpbmRleC5qcyIsInNyY1xcdGV4dC1tb2R1bGVcXGludGVyYWN0aW9uLXRleHQtbW9kdWxlLmpzIiwic3JjXFx0ZXh0LW1vZHVsZVxcdGV4dC1tb2R1bGUuanMiLCJzcmNcXHRleHR1cmVzLW1vZHVsZS5qcyIsInNyY1xcdGV4dHVyZXNcXGNvbG9yLXJvdGF0aW9uLmpzIiwic3JjXFx0ZXh0dXJlc1xcaW5kZXguanMiLCJzcmNcXHdpbmRvd1xcYnJlYWtwb2ludHMuanMiLCJzcmNcXHdpbmRvd1xcaW5kZXguanMiLCJzcmNcXHdpbmRvd1xcd2luZG93LW1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNTQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFMQTtBQU1PLElBQUksMENBQUo7QUFDUDtBQUNBOzs7Ozs7QUFOQTs7QUFKQTtBQVhBOzs7OztBQUtBOzs7QUFHQTtBQWtCTyxJQUFJLDhDQUFKOztBQUVQOzs7Ozs7Ozs7QUFTTyxJQUFJLGdDQUFZLElBQWhCOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxJQUFNLHdDQUFnQixTQUFoQixhQUFnQixJQUFLOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBL0JVLFdBK0JWLGlCQUFjLEVBQUUsTUFBaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQTVCVSxhQTRCVixtQkFBZ0IsRUFBRSxNQUFGLENBQVMsTUFBVCxHQUFrQixDQUFsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLENBQUMsU0FBTixFQUFrQjtBQUNqQjtBQUNBO0FBQ0EsVUFBUSxHQUFSLENBQWEsMEJBQWI7QUFDQTtBQUNBO0FBQ0Esb0NBQWUsSUFBZjtBQUNBO0FBQ0Q7QUFDQSxTQXRDVSxTQXNDVixlQUFZLEtBQVo7QUFDQSxDQWhDTTs7QUFrQ1A7QUFDQSxJQUFNLGFBQWEsU0FBYixVQUFhLENBQUMs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQSxtQ0FBdUI7QUFBRTtBQUF3QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQWMsUUFBZDtBQUNBLENBN0JEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgTUFJTiBBSkFYIFJFUVVFU1RcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG4vKipcdFRoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIGFqYXggcmVxdWVzdCBvZiB0aGUgc2xpZGVzIGRhdGEuXHJcbiAqXHRTdG9yZXMgdGhlIHNlcnZlcidzIHJlc3BvbnNlIGFuZCBwYXNzIGl0IHRvIHRoZSByZXN0IG9mIHRoZSBhcHAuXHJcbiAqL1xyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byBjcmVhdGUgdGhlIHNsaWRlc1xyXG5pbXBvcnQgeyBfY3JlYXRlTWFpblNsaWRlIH0gZnJvbSBcIi4vc2xpZGUtbW9kdWxlLmpzXCI7XHJcbmltcG9ydCB7IF9yZXNldFRleHR1cmVzQXJyYXkgfSBmcm9tIFwiLi90ZXh0dXJlcy1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSBjdXJyZW50IHNsaWRlcyBncm91cFxyXG5pbXBvcnQgeyBfc2xpZGVzR3JvdXAgfSBmcm9tIFwiLi9zbGlkZS1jaGFuZ2UtbW9kdWxlLmpzXCI7XHJcbi8vIGdldCB0aGUgdGV4dCBjb21wb25lbnQgbWV0aG9kc1xyXG5pbXBvcnQgeyBfcHJvY2Vzc1NsaWRlVGV4dCwgX2NyZWF0ZU5ld1NsaWRlVGV4dCB9IGZyb20gXCIuL3RleHQtbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgbWV0aG9kIHRvIHN0YXJ0IHRoZSBwcm9tcHQgY29tcG9uZW50XHJcbmltcG9ydCB7IF9yZXN0YXJ0UHJvbXB0LCBfcHJlbG9hZExvZ29zIH0gZnJvbSBcIi4vcHJvbXB0LW1vZHVsZVwiO1xyXG5cclxuLy8gc3RvcmUgdGhlIGFqYXggZGF0YSBpbiB0aGlzIG1vZHVsZSBhbmQgc2VydmUgaXQgdG8gdGhlIHJlc3Qgb2YgdGhlIGFwcFxyXG5leHBvcnQgbGV0IF9zbGlkZXNEYXRhO1xyXG4vLyBWRVJTSU9OIDIuMi40XHJcbi8qIEluIHNvbWUgY2FzZXMgdGhlIEFQSSBzZXJ2ZXIgY291bGQgcmV0dXJuIGEgbnVtYmVyIG9mIHNsaWRlcyBkaWZmZXJlbnQgdGhhbiAyMCxcclxuICogZm9yIHRoYXQgcmVhc29uIHdlIGNyZWF0ZSB0aGUgc2xpZGVzIGFtb3VudCB2YXJpYWJsZSB0byB1c2UgaW4gYWxsIGNhbGN1bGF0aW9uc1xyXG4gKiBhbmQgY29uZGl0aW9uYWwgY2hlY2tzLiBUaGlzIHZhcmlhYmxlIHdpbGwgYmUgZGVmaW5lZCBldmVyeXRpbWUgYSBuZXcgc2V0IG9mXHJcbiAqIHNsaWRlcyBpcyBsb2FkZWQgYW5kIHBhc3NlZCBpbiB0aGUgYWpheCByZXNwb25zZSBtZXRob2QuXHJcbiovXHJcbmV4cG9ydCBsZXQgX3NsaWRlc0Ftb3VudDtcclxuXHJcbi8qIFZFUlNJT04gMi4zLjBcclxuICogRm9yIHRoZSBmaXJzdCBydW4gd2UgY3JlYXRlIGEgYm9vbGVhbiwgc2V0IGFzIHRydWUgYXMgZGVmYXVsdC5cclxuICogSW4gdGhlIGZpcnN0IHJ1biB3ZSBkb24ndCBoYXZlIHRvIGNoZWNrIGFsbCB0aGUgdGV4dCBhdCB0aGlzIHBvaW50LFxyXG4gKiB0aGUgdGV4dCBzaG91bGQgYmUgY3JlYXRlZCBmb3IgdGhlIGZpcnN0IHNsaWRlIG9mIHRoZSBncm91cCBhbmQgYXRcclxuICogdGhlIGZpcnN0IHJ1biwgYWZ0ZXIgdGhlIGxvYWRlciBjb2RlIGlzIGNvbXBsZXRlLCB0aGlzIGNyZWF0ZXMgXHJcbiAqIGluY29uc2lzdGVuY2llcyBiZXR3ZWVuIHRoZSB0ZXh0IHNpemUgLyBwb3NpdGlvbiBhbmQgdGhlIGJhY2tncm91bmQuXHJcbiAqIFdoZW4gYSBuZXcgZ3JvdXAgaXMgbG9hZGVkIHdlIGNhbiBydW4gdGhlIHRleHQgcHJvY2VzcyBjb2RlLCBidXQgaW5cclxuICogdGhlIGZpcnN0IHJ1biB0aGUgdGV4dCBwcm9jZXNzIGNvZGUgaXMgcmFuIGluIHRoZSBsb2FkZXIgbW9kdWxlLlxyXG4qL1xyXG5leHBvcnQgbGV0IF9maXJzdFJ1biA9IHRydWU7XHJcblxyXG4vLyBjYWxsYmFjayBmb3IgYSBzdWNjZXNzZnVsbCByZXF1ZXN0XHJcbi8vIGluIG9yZGVyIHRvIGFjY29tb2RhdGUgdG8gdGhlIHB1YmxpYyBtZXRob2RzLCB0aGlzIHdpbGwgYmUgZXhwb3J0ZWQgaW4gb3JkZXJcclxuLy8gdG8gYmUgY2FsbGVkIGluIHRoZSBpbml0IG1ldGhvZC5cclxuLy8gd2hlbiB0aGUgcmVhY3QgYXBwIGlzIGNyZWF0ZWQsIHRoaXMgd2lsbCBubyBsb25nZXIgYmUgZXhwb3J0ZWQgYW5kIHVzZWQgaW4gdGhlXHJcbi8vIGluaXQgbWV0aG9kLCB0aGVuIHRoZSBtYWtlIHJlcXVlc3QgbWV0aG9kIHdpbGwgYmUgdXNlZC5cclxuZXhwb3J0IGNvbnN0IF9hamF4UmVzcG9uc2UgPSByID0+IHtcclxuXHRcclxuXHQvLyB0aGUgcmVzcG9uc2Ugb2JqZWN0IGlzIHVzZWQgb25seSB3aGVuIG1ha2luZyB0aGUgcmVxdWVzdCxcclxuXHQvLyBzaW5jZSB3ZSdyZSBleHBvcnRpbmcgdGhlIG1ldGhvZCBhbmQgdGhlIHJlcXVlc3QgaXMgYmVpbmcgaGFuZGxlZCBvdXRzaWRlXHJcblx0Ly8gdGhlIGNvbXBvbmVudCwgd2UgdXNlIHRoZSByZXNwb25zZSBwYXJhbWV0ZXIgZGlyZWN0bHkuIFdoZW4gdGhlIHJlYWN0IGFwcFxyXG5cdC8vIGlzIG1hZGUgZ28gYmFjayB0byB0aGlzIGFwcHJvYWNoLlxyXG5cdF9zbGlkZXNEYXRhID0gci5zbGlkZXM7XHJcblx0Ly8gc2V0IHRoZSBhbW91bnQgb2Ygc2xpZGVzXHJcblx0Ly8gdGhlIHNsaWRlcyBhbW91bnQgaXMgdXNlZCBhcyBhbiBpbmRleCBwb3NpdGlvbiwgdGhlcmVmb3JlXHJcblx0Ly8gaXQgc2hvdWxkIGJlIDEgbGVzcyB0aGFuIHRoZSB0b3RhbCBzbGlkZXMuXHJcblx0X3NsaWRlc0Ftb3VudCA9IHIuc2xpZGVzLmxlbmd0aCAtIDE7XHJcblx0Ly8gY3JlYXRlIHRoZSBtYWluIHNsaWRlXHJcblx0X2NyZWF0ZU1haW5TbGlkZSgpO1xyXG5cdC8vIG5vdyByZXNldCB0aGUgdGV4dHVyZXMgYXJyYXkgaW4gb3JkZXIgdG8gc3RhcnQgbG9hZGluZyB0aGUgc2xpZGVzJyBpbWFnZXNcclxuXHRfcmVzZXRUZXh0dXJlc0FycmF5KCk7XHJcblx0Ly8gbG9hZCB0aGUgc2xpZGVzIGxvZ29zXHJcblx0X3ByZWxvYWRMb2dvcygpO1xyXG5cdC8vIGFmdGVyIHJlc2V0aW5nIHRoZSB0ZXh0dXJlcyB3ZSBjYW4gc2V0IHByb2Nlc3MgdGhlIHRleHQgb2YgdGhlIGZpcnN0IHNsaWRlXHJcblx0Ly8gdGhlIHNsaWRlcyBkYXRhIGlzIHNldCwgdGhlIHRleHR1cmVzIGFycmF5IGlzIGNyZWF0ZWQgYW5kIHRoZSBzbGlkZSBpbmRleFxyXG5cdC8vIGhhcyBiZWVuIHNldCB0byAwIGFnYWluLCBzbyBpdCdzIHNhZmUgdG8gcHJvY2VzcyBhbmQgc3RhcnQgdGhlIHRleHQgYW5pbWF0aW9uXHJcblx0LyogUFJPQ0VTUyBUSEUgVEVYVCBPRiBUSEUgRklSU1QgU0xJREUgT0YgVEhFIE5FVyBHUk9VUCAqL1xyXG5cdC8qIFRIRU4gU1RBUlQgVEhFIFdPUkQgQU5JTUFUSU9OIEZPUiBUSEUgRklSU1QgU0xJREUgKi9cclxuXHRpZiAoICFfZmlyc3RSdW4gKSB7XHJcblx0XHRfcHJvY2Vzc1NsaWRlVGV4dCgpO1xyXG5cdFx0X2NyZWF0ZU5ld1NsaWRlVGV4dCgpO1xyXG5cdFx0Y29uc29sZS5sb2coIFwicHJvY2VzcyBmaXJzdCBzbGlkZSB0ZXh0XCIgKTtcclxuXHRcdC8vIHN0YXJ0IHRoZSBwcm9tcHQgY29tcG9uZW50XHJcblx0XHQvLyBwYXNzIHRydWUgdG8gc2V0IHRoZSBhbHBoYSBvZiB0aGUgcHJvbXB0IHN0YWdlIHRvIDFcclxuXHRcdF9yZXN0YXJ0UHJvbXB0KHRydWUpO1xyXG5cdH1cclxuXHQvLyBub3cgdG9nZ2xlIHRoZSBmaXJzdCBydW4gYm9vbGVhbiB0byBmYWxzZVxyXG5cdF9maXJzdFJ1biA9IGZhbHNlO1xyXG59O1xyXG5cclxuLy8gY2FsbGJhY2sgZm9yIGZhaWxlZCByZXF1ZXN0XHJcbmNvbnN0IF9hamF4RXJyb3IgPSAobyx0KSA9PiB7XHJcblx0Y29uc29sZS5sb2coIHQgKTtcclxufTtcclxuXHJcbmxldCBfdXNlckNoYW5uZWxzID0gW1xyXG5cdFwiZmlkXzIwMTgxLWhcIixcImZpZF8yMDE4MS13XCIsXCJmaWRfMjAxODEtblwiLFwiZmlkXzIwMTgxLWJcIixcImZpZF8yMDE4MS1lXCIsXCJmaWRfMjAxODEtc1wiLFwiZmlkXzIwMTgxLXRcIixcImZpZF8yMDE4MS1wXCIsXCJmaWRfMjE5MDVcIixcImZpZF82OTFcIixcImZpZF82NThcIixcImZpZF8xNjA5XCIsXCJmaWRfMTExN1wiLFwiZmlkXzcyNlwiLFwiZmlkXzIxOTA4XCIsXCJmaWRfMjIwMTFcIixcImZpZF83ODg0XCIsXCJmaWRfMzc5MlwiLFwiZmlkXzIyMDY1XCIsXCJmaWRfMjE5MjBcIixcImZpZF8xMzE2XCIsXCJmaWRfODAxXCIsXCJmaWRfMjE5MjdcIixcImZpZF8zMDY4XCIsXCJmaWRfMjE5MDdcIixcImZpZF8yMTkzN1wiLFwiZmlkXzIxOTQwXCIsXCJmaWRfMjE5NDJcIixcImZpZF8yMjA1NVwiLFwiZmlkXzIxOTIzXCIsXCJmaWRfMjE5MzlcIixcImZpZF8yMjA2M1wiLFwiZmlkXzIyMDcwXCIsXCJmaWRfMjIwNzFcIixcImZpZF8yMTk0M1wiLFwiZmlkXzIxOTk1XCIsXCJmaWRfMjE5OTNcIixcImZpZF8yMTk4OFwiLFwiZmlkXzIyMDAxXCIsXCJmaWRfMjIwMzRcIixcImZpZF8yMjAyNVwiLFwiZmlkXzIyMDM2XCIsXCJmaWRfMjIwMjhcIixcImZpZF8yMjAzMFwiLFwiZmlkXzIyMDQyXCJcclxuXTtcclxuXHJcbmxldCBfdXNlclNsaWRlcnMgPSBbXHJcblx0eyBcImlkXCI6IFwid29ybGRcIiwgXCJ2YWx1ZVwiOiAyMCB9LFxyXG5cdHsgXCJpZFwiOiBcImJ1c2luZXNzXCIsIFwidmFsdWVcIjogMjAgfSxcclxuXHR7IFwiaWRcIjogXCJlbnRlcnRhaW5tZW50XCIsIFwidmFsdWVcIjogMjAgfSxcclxuXHR7IFwiaWRcIjogXCJzcG9ydHNcIiwgXCJ2YWx1ZVwiOiAyMCB9LFxyXG5cdHsgXCJpZFwiOiBcInNjaWVuY2VcIiwgXCJ2YWx1ZVwiOiAyMCB9LFxyXG5cdHsgXCJpZFwiOiBcInBvbGl0aWNzXCIsIFwidmFsdWVcIjogMjAgfSxcclxuXHR7IFwiaWRcIjogXCJ0ZWNobm9sb2d5XCIsIFwidmFsdWVcIjogMjAgfSxcclxuXHR7IFwiaWRcIjogXCJnYW1pbmdcIiwgXCJ2YWx1ZVwiOiAxNSB9LFxyXG5cdHsgXCJpZFwiOiBcIm1vdmllc1wiLCBcInZhbHVlXCI6IDIwIH0sXHJcblx0eyBcImlkXCI6IFwiZGVzaWduXCIsIFwidmFsdWVcIjogMjAgfSxcclxuXHR7IFwiaWRcIjogXCJwaG90b2dyYXBoeVwiLCBcInZhbHVlXCI6IDIwIH0sXHJcblx0eyBcImlkXCI6IFwiZ3JhcGhpY3NcIiwgXCJ2YWx1ZVwiOiAyMCB9LFxyXG5cdHsgXCJpZFwiOiBcImFyY2hpdGVjdHVyZVwiLCBcInZhbHVlXCI6IDIwIH0sXHJcblx0eyBcImlkXCI6IFwiZmFzaGlvblwiLCBcInZhbHVlXCI6IDIwIH0sXHJcblx0eyBcImlkXCI6IFwiZm9vZFwiLCBcInZhbHVlXCI6IDIwIH0sXHJcblx0eyBcImlkXCI6IFwiZmluYW5jZVwiLCBcInZhbHVlXCI6IDE1IH0sXHJcblx0eyBcImlkXCI6IFwibWFya2V0aW5nXCIsIFwidmFsdWVcIjogMTUgfVxyXG5dO1xyXG5jb25zdCBfdGFyZ2V0VVJMID0gXCJodHRwOi8vYWl3bi5pby9hcGkvXCI7XHJcblxyXG5leHBvcnQgY29uc3QgX21ha2VSZXF1ZXN0ID0gKCkgPT4ge1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiBfdGFyZ2V0VVJMLFxyXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0dHlwZTogXCJQT1NUXCIsXHJcblx0XHR4aHJGaWVsZHM6IHtcclxuXHRcdFx0d2l0aENyZWRlbnRpYWxzOiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0Y2FjaGU6IGZhbHNlLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRncm91cF9udW1iZXI6IF9zbGlkZXNHcm91cCxcclxuXHRcdFx0aW5pdDogZmFsc2UsXHJcblx0XHRcdHVzZXJfZmVlZHM6IF91c2VyQ2hhbm5lbHMsXHJcblx0XHRcdHVzZXJfc2xpZGVyczogX3VzZXJTbGlkZXJzLFxyXG5cdFx0XHRmaWx0ZXJWYWw6IFwiYWxsXCIsXHJcblx0XHRcdHRva2VuOiBcImJuamhiZmRzazIzNDMyXCIsXHJcblx0XHRcdHZlcnNpb246IFwiMi4wLjVcIlxyXG5cdFx0fVxyXG5cdH0pXHJcblx0XHQuZG9uZShfYWpheFJlc3BvbnNlKVxyXG5cdFx0LmZhaWwoX2FqYXhFcnJvcik7XHJcblxyXG59O1xyXG5cclxuLyoqICBNZXRob2QgdG8gc2V0IHRoZSBzbGlkZXMgZGF0YSBvdXRzaWRlIHRoZSBhamF4IGNhbGxiYWNrc1xyXG4gKiAgVGhpcyBpcyBhIHB1YmxpYyBtZXRob2QgdG8gZXhwb3NlIGluIHRoZSBhcHAncyBBUElcclxuICogXHRAcGFyYW0ge2FycmF5fSBkOiB0aGUgYXJyYXkgd2l0aCBhbGwgdGhlIHNsaWRlcyBkYXRhXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2V0U2xpZGVzRGF0YSA9IGQgPT4ge1xyXG5cdC8vIGxvb3AgdHJvdWdoIHRoZSBzbGlkZXMgYW5kIGNyZWF0ZSBhIHNpbmdsZSBzcHJpdGUgZm9yIGVhY2hcclxuXHRfc2xpZGVzRGF0YSA9IGQ7XHJcbn07XHJcbiIsIi8qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgQU5JTUFUSU9OIFNUT1JFXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuXHJcbi8vIHRlc3RcclxuXHJcbi8vIHRoZSBhbmltYXRpb24gc3RvcmUgaGFzIHRoZSBtYWluIGFuaW1hdGlvbiBpbmZvcm1hdGlvbiBvYmplY3RcclxuLy8gdGhpcyBvYmplY3QgaG9sZHMgdGhlIGFycmF5IHdpdGggYWxsIHRoZSBhbmltYXRpb25zIHR5cGVzIChyZWFkLW9ubHkgb2JqZWN0cylcclxuLy8gaGFzIGEgcHJvcGVydHkgZm9yIHRoZSBsYXN0IGdlbmVyaWMgYW5pbWF0aW9uXHJcbi8vIGhhcyBhIHByb3BlcnR5IGZvciB0aGUgbGFzIHNwZWNpZmljIGFuaW1hdGlvbnNcclxuLy8gaGFzIGEgcHJvcGVydHkgZm9yIHRoZSBhbmltYXRpb24gdHlwZSBvZiB0aGUgbmV4dCBzbGlkZVxyXG4vLyBoYXMgYSBwcm9wZXJ0eSBmb3IgdGhlIGFuaWFtdGlvbiB0eXBlIG9mIHRoZSBwcmV2aW91cyBzbGlkZVxyXG4vLyBXaGVuIGFuIGltYWdlIGlzIGxvYWRlZCBpbiB0aGUgYmFzZSB0ZXh0dXJlLCBjaGVjayBmb3IgdGhlIHJlYWwgZGltZW5zaW9ucyBvZiB0aGUgXHJcbi8vIGltYWdlIGFuZCBzZXQgdGhlIHNjYWxlIGZvciB0aGUgaW1hZ2UgKHNjYWxlIHJhdGlvKS4gVGhlbiBjaGVjayBpZiB0aGUgc2NhbGVkXHJcbi8vIHNpemUgaXMgZW5vdWdoIGZvciBhIHRyYW5zbGF0aW9uIGVmZmVjdC4gSWYgbm90IHVzZSBhIHpvb20gZWZmZWN0LlxyXG4vLyBhZGQgdG8gdGhlIGJhc2UgdGV4dHVyZSBhbiBpbnRlZ2VyIHBvaW50aW5nIHRvIHRoZSBpbmRleCBvZiB0aGUgZ2VuZXJpYyBlZmZlY3QgdHlwZS5cclxuXHJcbmV4cG9ydCBsZXQgX2FuaW1hdGlvblN0b3JlID0ge1xyXG5cdC8vIGdlbmVyaWMgYW5pbWF0aW9ucywgYXJyYXkgd2l0aCBhIHN0cmluZyBmb3IgZWFjaCBnZW5lcmljIGFuaW1hdGlvbiB0eXBlXHJcblx0Ly8gdGhpcyBhbGxvd3MgdG8gYWNjZXNzIGVhY2ggZ2VuZXJpYyB0eXBlIHZpYSBhbiBpbmRleCBpbnRlZ2VyXHJcblx0Z2VuZXJpY0FuaW1hdGlvbnM6IFtcclxuXHRcdFwidmVydGljYWxcIiwgXCJob3Jpem9udGFsXCIsIFwiem9vbVwiIC8vIDAgMSAyXHJcblx0XSxcclxuXHQvKlx0c3BlY2lmaWMgYW5pbWF0aW9ucywgb2JqZWN0IHdpdGggYSBrZXkgZm9yIGVhY2ggZ2VuZXJpYyB0eXBlXHJcblx0ICpcdGZvciBob3Jpem9udGFsIGFuZCB6b29tLCBhbiBhcnJheSB3aXRoIHRoZSBkaWZmZXJlbnQgdHlwZXMuXHJcblx0ICogIEluIHRoZSBjYXNlIG9mIHRoZSBob3Jpem9udGFsIGFuaW1hdGlvbiwgdGhlIHN0cmluZyByZXByZXNlbnRzIHRoZVxyXG5cdCAqIFx0c2lkZSB0aGUgc2xpZGUgaXMgbW92ZWQgVE8uIExlZnQgbWVhbnMgdGhlIHNsaWRlIGlzIHNldCBhdCB0aGUgcmlnaHRcclxuXHQgKiBcdGVkZ2Ugb2YgdGhlIHNjcmVlbiAobmVnYXRpdmUgeCkgYW5kIGlzIG1vdmVkIHRvIHRoZSBsZWZ0ICh4ID0gMCkuXHJcblx0ICovXHJcblx0dHlwZXM6IHtcclxuXHRcdHZlcnRpY2FsOiBcImJvdHRvbVwiLFxyXG5cdFx0aG9yaXpvbnRhbDogW1wicmlnaHRcIiwgXCJsZWZ0XCJdLCAvLyAwIDFcclxuXHRcdHpvb206IFtcImluXCIsIFwib3V0XCJdIC8vIDAgMVxyXG5cdH0sXHJcblx0Ly8gbGFzdCBnZW5lcmljIHR5cGUgdXNlZC4gSW50ZWdlciB3aWh0IHRoZSBpbmRleCBvZiB0aGUgZ2VuZXJpYyBhbmltYXRpb25zXHJcblx0Ly8gYXJyYXkuIHN0YXJ0dXAgPT4gbnVsbFxyXG5cdGxhc3RHZW5lcmljOiBudWxsLCAvLyBpbnRlZ2VyIDAgMSAyXHJcblx0LypcdGxhc3Qgc3BlY2lmaWMuIE9iamVjdCB3aXRoIGEga2V5IGZvciBlYWNoIG9mIHRoZSBnZW5lcmljIHR5cGVzIHRoYXQgaGF2ZVxyXG5cdCAqXHRzcGVjaWZpYyB0eXBlcyAoaG9yaXpvbnRhbCAtIHpvb20pLiBUaGUgdmFsdWUgaXMgdGhlIGludGVnZXIgb2YgdGhlIHNwZWNpZmljXHJcblx0ICpcdGFycmF5IG9uIGVhY2ggdHlwZXMga2V5ICh0eXBlcyBvYmplY3QpLlxyXG5cdCAqXHRpbiBvcmRlciB0byBhdm9pZCBhbiBleHRyYSBjb25kaXRpb25hbCBjaGVjaywgc2V0IHRoZSBsYXN0IHNwZWNpZmljIHRvIGJlIDBcclxuXHQgKlx0aW4gYm90aCBjYXNlcy4gU28gdGhlIGZpcnN0IHpvb20gYW5pbWF0aW9uIHdpbGwgYmUgem9vbSBvdXQgYW5kIHRoZSBmaXJzdCBcclxuXHQgKiAgaG9yaXpvbnRhbCBhbmltYXRpb24gd2lsbCBiZSB0byB0aGUgbGVmdCBvZiB0aGUgc2NyZWVuIHN0YXJ0aW5nIGF0IHggPSAwLlxyXG5cdCAqL1xyXG5cdGxhc3RTcGVjaWZpYzoge1xyXG5cdFx0aG9yaXpvbnRhbDogMCwgLy8gaW50ZWdlciAwIDFcclxuXHRcdHpvb206IDAgLy8gaW50ZWdlciAwIDFcclxuXHR9LFxyXG5cdC8vIG9iamVjdCBmb3IgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIHR5cGVzXHJcblx0Ly8gYWZ0ZXIgdGhlIGFuaW1hdGlvbiB0eXBlcyBhcmUgc2V0LCB0aGV5J3JlIHN0b3JlIGluIHRoaXMgb2JqZWN0IHNvIHdlIGNhblxyXG5cdC8vIGNoZWNrIGZvciB0aGUgbmV4dCBzbGlkZSBpbmRleCB0aGUgYW5pbWF0aW9uIHRoYXQgc2hvdWxkIGJlIHVzZWRcclxuXHRjdXJyZW50QW5pbWF0aW9uczoge1xyXG5cdFx0Z2VuZXJpYzogbnVsbCxcclxuXHRcdHNwZWNpZmljOiBudWxsXHJcblx0fSxcclxuXHQvLyBuZXh0IGFuZCBwcmV2aW91cyBhbmltYXRpb24gdHlwZXNcclxuXHQvLyB0aGlzIGFyZSBzZXQgb24gdG91Y2ggc3RhcnQuXHJcblx0cHJldmlvdXNBbmltYXRpb25UeXBlOm51bGwsXHJcblx0bmV4dEFuaW1hdGlvblR5cGU6IG51bGxcclxufTtcclxuXHJcblxyXG4vKlx0Tk9URVxyXG4gKiAgVGhlIG1ldGhvZHMgdG8gdXBkYXRlIHRoZSBnZW5lcmljIGFuZCBzcGVjaWZpYyBhbmltYXRpb24gdHlwZXNcclxuICogXHRzaG91bGQgcnVuIG9uIHRoZSB1cGRhdGUgdGV4dHVyZSBtZXRob2QuIFRoaXMgYmVjYXVzZSBhdCB0aGF0IHBvaW50IGluIHRoZSBjb2RlXHJcbiAqIFx0d2UnbGwga25vdyB0aGUgYW5pbWF0aW9uIHR5cGUgdGhlIG1haW4gc2xpZGUgd2lsbCBoYXZlIGFmdGVyIHVwZGF0aW5nIHRoZSB0ZXh0dXJlLFxyXG4gKiBcdGFsbG93aW5nIHRvIGNoZWNrIHRoZSBzcGVjaWZpYyB0eXBlIHdoZW4gdGhlIG5leHQgYW5kIHByZXZpb3VzIHN0cmlwZXMgYXJlIGNyZWF0ZWQuXHJcbiAqL1xyXG5cclxuLyoqIFNldCBHZW5lcmljIE1ldGhvZFx0XHJcbiAqICBUaGlzIGlzIHVzZWQgdG8gc2V0IHRoZSBnZW5lcmljIGFuaW1hdGlvbiB0eXBlIGluIHRoZSBzdG9yZS5cdFxyXG4gKiBcdFVzZSB0aGUgaW50ZWdlciBhY2NvcmRpbmcgdG8gdGhlIGdlbmVyaWMgYW5pbWF0aW9ucyBhcnJheVxyXG4gKiBcdEBwYXJhbSB7bnVtYmVyfSBuOiB0aGUgaW5kZXggb2YgdGhlIHNwZWNpZmljIFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IF9zZXRHZW5lcmljID0gbiA9PiB7XHJcblx0X2FuaW1hdGlvblN0b3JlID0ge1xyXG5cdFx0Li4uX2FuaW1hdGlvblN0b3JlLCBcclxuXHRcdGxhc3RHZW5lcmljOiBuXHJcblx0fTtcclxufTtcclxuXHJcblxyXG4vKiogU2V0IFNwZWNpZmljIEFuaW1hdGlvbiBUeXBlIE1ldGhvZFx0XHJcbiAqICBTZXRzIHRoZSBzcGVjaWZpYyBhbmltYXRpb24gdHlwZSBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgZ2VuZXJpYyB0eXBlLlx0XHJcbiAqIFx0QHBhcmFtIHtudW1iZXJ9IGc6IHRoZSBnZW5lcmljIGFuaW1hdGlvbiBpbmRleFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IF9zZXRTcGVjaWZpYyA9IChnKSA9PiB7XHJcblx0aWYoIGcgPT09IDAgKXtyZXR1cm47fVxyXG5cdC8vIGdldCB0aGUgc3RyaW5nICBvZiB0aGUgZ2VuZXJpYyB0eXBlIGJlaW5nIHVwZGF0ZWRcclxuXHRjb25zdCBfdXBkYXRlZEdlbmVyaWMgPSBfYW5pbWF0aW9uU3RvcmUuZ2VuZXJpY0FuaW1hdGlvbnNbZ107XHJcblx0Ly8gc2V0IHRoZSBuZXcgc3BlY2lmaWMgdmFsdWVcclxuXHRjb25zdCBfbmV3U3BlY2lmaWMgPSBfYW5pbWF0aW9uU3RvcmUubGFzdFNwZWNpZmljW191cGRhdGVkR2VuZXJpY10gPT09IDAgPyAxIDogMDtcclxuXHRfYW5pbWF0aW9uU3RvcmUgPSB7XHJcblx0XHQuLi5fYW5pbWF0aW9uU3RvcmUsXHJcblx0XHRsYXN0U3BlY2lmaWM6IHtcclxuXHRcdFx0Li4uX2FuaW1hdGlvblN0b3JlLmxhc3RTcGVjaWZpYyxcclxuXHRcdFx0Ly8gdXNlIHRoZSBnZW5lcmljIHR5cGUgc3RyaW5nIGFuZCB0aGUgbnVtYmVyIHBhc3NlZFxyXG5cdFx0XHRbX3VwZGF0ZWRHZW5lcmljXTogX25ld1NwZWNpZmljXHJcblx0XHR9XHJcblx0fTsgLy8gbmV3IHN0b3JlIGVuZFxyXG5cclxuXHQvLyBjb25zb2xlLmxvZyggXCJ1cGRhdGluZyBzdG9yZVwiLCBfdXBkYXRlZEdlbmVyaWMsIF9uZXdTcGVjaWZpYyApO1xyXG59O1xyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogIEJVUk5TIEVGRkVDVCBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG5cclxuLy8gZ2V0IHRoZSBzbGlkZSBpbmRleCB2YWx1ZSBhbmQgdGhlIGZpcnN0IHNsaWRlL2dyb3VwIGJvb2xcclxuaW1wb3J0IHsgX2N1cnJlbnRTbGlkZUluZGV4LCBfZmlyc3RTbGlkZUdyb3VwIH0gZnJvbSBcIi4uL3NsaWRlLWNoYW5nZS1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBzY3JlZW4gZGltZW5zaW9uc1xyXG5pbXBvcnQgeyB3aW5TaXplIH0gZnJvbSBcIi4uL3dpbmRvd1wiO1xyXG4vLyBnZXQgdGhlIGFuaW1hdGlvbiBzdG9yZVxyXG5pbXBvcnQgeyBfYW5pbWF0aW9uU3RvcmUgfSBmcm9tIFwiLi9hbmltYXRpb24tc3RvcmVcIjtcclxuLy8gZ2V0IHRoZSBtYWluIHNsaWRlXHJcbmltcG9ydCB7IF9tYWluU2xpZGUgfSBmcm9tIFwiLi4vc2xpZGUtbW9kdWxlXCI7XHJcblxyXG4vLyB0aGlzIHZhcmlhYmxlIHdpbGwgaGF2ZSB0aGUgaW5kZXggb2YgdGhlIGFuaW1hdGlvbiB0eXBlIGZvciB0aGUgY3VycmVudCBzbGlkZSBpbWFnZVxyXG5leHBvcnQgbGV0IF9jdXJyZW50VHlwZUluZGV4ID0gbnVsbDtcclxuLy8gdGhpcyB2YXIgd2lsbCBoYXZlIHRoZSBpbmRleCBvZiB0aGUgYW5pbWF0aW9uIGZvciB0aGUgbWFpbiBzbGlkZSBjb3JyZXNwb25kaW5nIHRvXHJcbi8vIHRoZSBuZXh0L3ByZXZpb3VzIHNsaWRlIGltYWdlXHJcbmV4cG9ydCBsZXQgX25leHRUeXBlSW5kZXggPSBudWxsO1xyXG5cclxuLy8gY3JlYXRlIHR3byB2YXJzIHRvIGNoZWNrIGlmIHRoZSB0aW1lciBhbmQgdGhlIGFuaW1hdGlvbiB3ZXJlIHN0YXJ0ZWQgb3Igbm90XHJcbi8vIHRoaXMgYmVjYXVzZSB0aGUgaW50ZXJhY3Rpb24gY291bGQgc3RhcnQgYW5kIG5vdCBjaGFuZ2UgdGhlIHNsaWRlLiBJbiB0aGF0IGNhc2UgdGhlXHJcbi8vIGNvcnJyZWN0IGluc3RhbmNlIHNob3VsZCBiZSByZXN1bWVkIGluc3RlYWQgb2YgcmVzdW1pbiBib3RoLiBJZiB0aGUgdGltZXIgaXMgY29tcGxldGVcclxuLy8gdGhlbiByZXN1bWUgdGhlIGFuaW1hdGlvbiwgaWYgdGhlIHRpbWVyIGlzIG5vdCBjb21wbGV0ZWRcclxuZXhwb3J0IGxldCBfdGltZXJSdW5uaW5nID0gZmFsc2U7XHJcbmV4cG9ydCBsZXQgX2J1cm5zRWZmZWN0UnVubmluZyA9IGZhbHNlO1xyXG5cclxuLy8gdmFyIGZvciB0aGUga2VuIGJ1cm5zIGFuaW1hdGlvblxyXG5leHBvcnQgbGV0IF9idXJuc0VmZmVjdCA9IG51bGw7XHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byB0b2dnbGUgdGhlIHJ1bm5pbmcgY2hlY2tlcnMuXHRcclxuICogIFRoaXMgaXMgdXNlZCB3aGVuIHRoZSBpbnN0YW5jZXMgc3RhcnQvZW5kXHJcbiAqIFx0QHBhcmFtIHtzdHJpbmd9IHQ6IHRoZSB0eXBlIHRvIHRvZ2dsZVxyXG4gKiBcdEBwYXJhbSB7Ym9vbGVhbn0gdjogdGhlIHZhbHVlIHRvIHNldFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IF9zZXRSdW5uaW5nQ2hlY2tlciA9ICggdCwgdiApID0+IHtcclxuXHRzd2l0Y2godCl7XHJcblx0XHRjYXNlIFwidGltZXJcIjpcclxuXHRcdFx0X3RpbWVyUnVubmluZyA9IHY7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSBcImJ1cm5zXCI6XHJcblx0XHRcdF9idXJuc0VmZmVjdFJ1bm5pbmcgPSB2O1xyXG5cdFx0XHRicmVhaztcclxuXHR9IC8vIHN3aXRjaFxyXG59O1xyXG5cclxuXHJcblxyXG4vKiogTWV0aG9kIHRvIGNyZWF0ZSB0aGUgYnVybnMgYW5pbWF0aW9uLlx0XHJcbiAqICBVc2VzIHRoZSBnZW5lcmljIGFuZCBzcGVjaWZpYyBhbmltYXRpb24gdHlwZSwgdGhlIG1haW4gc2xpZGUgZGltZW5zaW9uc1xyXG4gKiBcdGFuZCB0aGUgc2NyZWVuIGRpbWVuc2lvbnMgdG8gY3JlYXRlIHRoZSBrZW4gYnVybnMgZWZmZWN0LlxyXG4gKiBcdFxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2NyZWF0ZUJ1cm5zRWZmZWN0ID0gKCkgPT4ge1xyXG5cdC8vIGZpcnN0IGtpbGwgdGhlIHByZXZpb3VzIGluc3RhbmNlXHJcblx0X2J1cm5zRWZmZWN0ID8gX2J1cm5zRWZmZWN0LmtpbGwoKSA6IG51bGw7XHJcblx0X2J1cm5zRWZmZWN0ID0gbnVsbDtcclxuXHQvLyBzZXQgdGhlIGFuaW1hdGlvbiBhcyBhY3RpdmUgYW5kIHRoZSB0aW1lciBhcyBpbmFjdGl2ZVxyXG5cdF90aW1lclJ1bm5pbmcgPSBmYWxzZTtcclxuXHRfYnVybnNFZmZlY3RSdW5uaW5nID0gdHJ1ZTtcclxuXHQvLyBjcmVhdGUgdGhlIG5ldyB0aW1lbGluZVxyXG5cdC8vIF9idXJuc0VmZmVjdCA9IG5ldyBUaW1lbGluZUxpdGUoe3BhdXNlZDp0cnVlfSk7XHJcblx0Ly8gZ2V0IHRoZSBkYXRhIGZyb20gdGhlIG1haW4gc2xpZGUgb2JqZWN0IGFuZCB0aGUgYW5pbWF0aW9uIHN0b3JlIHRvXHJcblx0Ly8gYmVmb3JlIGNyZWF0aW5nIGFueSB0aW1lciBvciBhbmltYXRpb24gY2hlY2sgaWYgdGhlIGN1cnJlbnQgc2xpZGUgaW1hZ2VcclxuXHQvLyBpcyBsb2FkZWQgb3IgZmFpbGVkLiBJZiB0aGUgaW1hZ2UgZmFpbGVkIGRvIG5vdGhpbmdcclxuXHRpZiAoX21haW5TbGlkZS5faXNMb2FkZWQpIHtcclxuXHRcdC8vIHRoZSBpbWFnZSBpcyBsb2FkZWQgZ2V0IHRoZSBkYXRhIHRvIGNyZWF0ZSB0aGUgYW5pbWF0aW9uIGZyb20gdGhlIG1haW4gc2xpZGVcclxuXHRcdC8vIGFuZCB0aGUgYW5pbWF0aW9uIHN0b3JlXHJcblx0XHRjb25zdCBfZ2VuZXJpYyA9IF9hbmltYXRpb25TdG9yZS5sYXN0R2VuZXJpYztcclxuXHRcdC8vIGNvbnN0IHRlc3RTdHIgPSBfYW5pbWF0aW9uU3RvcmUuZ2VuZXJpY0FuaW1hdGlvbnNbX2dlbmVyaWNdO1xyXG5cdFx0Y29uc3QgX3NwZWNpZmljID0gX2FuaW1hdGlvblN0b3JlLmxhc3RTcGVjaWZpY1tfYW5pbWF0aW9uU3RvcmUuZ2VuZXJpY0FuaW1hdGlvbnNbX2dlbmVyaWNdXTtcclxuXHRcdC8vIHRoZSBkdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uXHJcblx0XHQvLyBzZXQgb25seSBmb3IgdmVydGljYWwgYW5kIGhvcml6b250YWwgYW5pbWF0aW9ucyBkZXBlbmRpbmcgb24gdGhlIGFtb3VudCBvZlxyXG5cdFx0Ly8gcGl4ZWxzIHRoZSBpbWFnZSB3aWxsIGJlIHRyYW5zbGF0ZWQuXHJcblx0XHRsZXQgX2R1cmF0aW9uO1xyXG5cdFx0Ly8gdGhlIGFuaW1hdGlvbiBjb25maWcgb2JqZWN0XHJcblx0XHRsZXQgX3R3ZWVuQ29uZmlnO1xyXG5cdFx0Ly8gY3JlYXRlIHRoZSBhbmltYXRpb24gY29uZmlndXJhdGlvbnNcclxuXHRcdGlmIChfZ2VuZXJpYyA9PT0gMCkge1xyXG5cdFx0XHQvLyBzZXQgdGhlIGR1cmF0aW9uLCB1c2UgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIG9mIHRoZSBtYWluIHNsaWRlXHJcblx0XHRcdF9kdXJhdGlvbiA9IF9zZXREdXJhdGlvbihNYXRoLmFicyhfbWFpblNsaWRlLnkpKTtcclxuXHRcdFx0Ly8gdGhlIGFuaW1hdGlvbiBpcyB2ZXJ0aWNhbCwgdGhlIGVsZW1lbnQgaXMgc2V0IGF0IHRoZSBib3R0b20gZWRnZSBvZiB0aGUgc2NyZWVuXHJcblx0XHRcdC8vIHRoZSBhbmltYXRpb24gaXMgb24gdGhlIHkgYXhpcyB0byAwXHJcblx0XHRcdF90d2VlbkNvbmZpZyA9IHsgeTogMCwgZWFzZTogUG93ZXIxLmVhc2VPdXQgfTtcclxuXHRcdH0gZWxzZSBpZiAoX2dlbmVyaWMgPT09IDEpIHtcclxuXHRcdFx0Ly8gc2V0IGEgY29uc3RhbnQgZm9yIHRoZSB0YXJnZXQgdmFsdWVcclxuXHRcdFx0Y29uc3QgX3RhcmdldFhWYWx1ZSA9IHdpblNpemUudyAtIF9tYWluU2xpZGUud2lkdGg7XHJcblx0XHRcdC8vIHNldCB0aGUgZHVyYXRpb24sIHVzZSB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGUgbWFpbiBzbGlkZVxyXG5cdFx0XHQvLyBvciB0aGUgdGFyZ2V0IHZhbHVlLCBkZXBlbmRpbmcgb24gdGhlIHNwZWNpZmljIHRhcmdldCB2YWx1ZVxyXG5cdFx0XHRfZHVyYXRpb24gPSBfc2V0RHVyYXRpb24oX3NwZWNpZmljID09PSAwID8gTWF0aC5hYnMoX21haW5TbGlkZS54KSA6IE1hdGguYWJzKF90YXJnZXRYVmFsdWUpKTtcclxuXHRcdFx0Ly8gaG9yaXpvbnRhbCBhbmltYXRpb24sIGNoZWNrIHRoZSBzcGVjaWZpYyB2YWx1ZVxyXG5cdFx0XHRfdHdlZW5Db25maWcgPSB7XHJcblx0XHRcdFx0eDogX3NwZWNpZmljID09PSAwID8gMCA6IF90YXJnZXRYVmFsdWUsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIxLmVhc2VPdXRcclxuXHRcdFx0fTtcclxuXHRcdH0gZWxzZSBpZiAoX2dlbmVyaWMgPT09IDIpIHtcclxuXHRcdFx0Ly8gZm9yIHpvb20gYW5pbWF0aW9ucyB0aGUgZHVyYXRpb24gaXMgYWx3YXlzIHRoZSBzYW1lIGJlY2F1c2UgdGhlIGZpbmFsIHZhbHVlXHJcblx0XHRcdC8vIGlzIGEgZml4ZWQgZmFjdG9yIG9mIHRoZSBjdXJyZW50IHNjYWxlXHJcblx0XHRcdF9kdXJhdGlvbiA9IDguNTtcclxuXHRcdFx0Ly8gVGhlIGFuaW1hdGlvbiBpcyB6b29tXHJcblx0XHRcdF90d2VlbkNvbmZpZyA9IHtcclxuXHRcdFx0XHRwaXhpOiB7XHJcblx0XHRcdFx0XHRzY2FsZTogX3NwZWNpZmljID09PSAwID8gKF9tYWluU2xpZGUuX3NjYWxlUmF0aW8gKiAxLjUpIDogX21haW5TbGlkZS5fc2NhbGVSYXRpb1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuXHRcdFx0fTsgLy8gY29uZmlndXJhdGlvbiBcclxuXHRcdH1cclxuXHRcdC8vIGNyZWF0ZSBhbmltYXRpb24gaW5zdGFuY2VcclxuXHRcdF9idXJuc0VmZmVjdCA9IFR3ZWVuTGl0ZS50byhfbWFpblNsaWRlLCBfZHVyYXRpb24sIF90d2VlbkNvbmZpZyk7XHJcblx0fSAvLyBpbWFnZSBsb2FkZWQgY29uZGl0aW9uYWxcclxufTtcclxuXHJcblxyXG5cclxuLyoqIEtlbiBCdXJucyBBbmltYXRpb24gVGltZXJcclxuICogIFR3ZWVuTGl0ZSBpbnN0YW5jZSB0aGF0IHdpbGwgc3RhcnQgdGhlIGtlbiBidXJucyBhbmltYXRpb25cclxuICogXHRpbnN0YW5jZS4gV2hlbiB0aGlzIGluc3RhbmNlIGhhcyB0byByZS1ydW4sIHdpbGwgYmUgd2l0aCByZXN0YXJ0KHRydWUpLlx0XHJcbiAqIFx0VGhlIGNhbGxiYWNrIHdpbGwgYmUgYSBtZXRob2QgdGhhdCB3aWxsIGNyZWF0ZSB0aGUga2VuIGJ1cm5zIHR3ZWVuXHJcbiAqIFx0ZXZlcnl0aW1lIGlzIGludm9rZWQuXHJcbiAqIFx0V2UgYWRkIGFuIGV4dHJhIDEwMCBtcyB0byB0aGUgZHVyYXRpb24sIGJlY2F1c2UgdGhlIHRpbWVyIHdpbGwgYmUgc2V0XHJcbiAqIFx0b24gdGhlIHVwZGF0ZSB0ZXh0dXJlIG1ldGhvZC4gQWZ0ZXIgdGhpcyBtZXRob2QgaXMgaW52b2tlZCBpbiB0aGUgaW50ZXJhY3Rpb25cclxuICogXHRlbmQgcGFydCBvZiB0aGUgY29kZSwgb3RoZXIgY29kZSBuZWVkcyB0byBydW4gKGluY2x1ZGluZyBhIGxvb3AgdGhyb3VnaCBhbGxcclxuICogXHR0aGUgc3RyaXBlcyksIHNvIHRoYXQgZXh0cmEgdGltZSBnaXZlcyBhIGJ1ZmZlciB0byB1c2UgdGhlIGVudGlyZSBzZWNvbmQgaW4gdGhlXHJcbiAqIFx0dGltZXIgd2hpbGUgdGhhdCBjb2RlIHJ1bnMuXHRcclxuICogXHRPbmNlIHRoZSB0aW1lciBpcyBjb21wbGV0ZSwgaXQnbGwgY2FsbCB0aGUgbWV0aG9kIHRvIGNyZWF0ZSB0aGUga2VuIGJ1cm5zXHJcbiAqIFx0YW5pbWF0aW9uXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfYnVybnNFZmZlY3RUaW1lciA9IFR3ZWVuTGl0ZS50byh7fSwgMC41NSwge1xyXG5cdHBhdXNlZDogdHJ1ZSwgb25Db21wbGV0ZTogX2NyZWF0ZUJ1cm5zRWZmZWN0XHJcbn0pO1xyXG5cclxuLyoqIE1ldGhvZCB0byByZXN0YXJ0IHRoZSB0aW1lci5cdFxyXG4gKiAgSW4gY2FzZXMgc3VjaCBhcyB0aGUgZmlyc3QgcnVuIGFuZCBhIHdpbmRvdyByZXNpemUgXHJcbiAqL1xyXG5cclxuXHJcblxyXG4vKiogUGF1c2UgTWV0aG9kLlx0XHJcbiAqICBUaGlzIG1ldGhvZCBwYXVzZXMgdGhlIGtlbiBidXJucyBhbmltYXRpb24gYW5kIHRoZSB0aW1lci5cdFxyXG4gKiBcdEl0IGRvZXNuJ3QgbWF0dGVyIHdoaWNoIGluc3RhbmNlIGlzIGFjdGl2ZSwgcGF1c2UgYm90aC4gT24gcmVzdW1lXHJcbiAqIFx0dGhlIGNvZGUgd2lsbCBjaGVjayB3aGljaCBvbmUgd2FzIGFjdGl2ZSB3aGVuIHRoZSBwYXVzZSBtZXRob2Qgd2FzIGNhbGxlZC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBfcGF1c2VCdXJuc0VmZmVjdCA9ICgpID0+IHtcclxuXHRfYnVybnNFZmZlY3RUaW1lci5wYXVzZSgpO1xyXG5cdC8vIGlmIHRoZSBhbmltYXRpb24gaGFzIGJlZW4gY3JlYXRlZCBwYXVzZSBpdFxyXG5cdF9idXJuc0VmZmVjdCA/IF9idXJuc0VmZmVjdC5wYXVzZSgpIDogbnVsbDtcclxufTtcclxuXHJcblxyXG4vKiogU2V0IER1cmF0aW9uIE1ldGhvZFx0XHJcbiAqICBVc2VkIHRvIHNldCB0aGUgZHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiBmb3IgdmVydGljYWwgYW5kIGhvcml6b250YWxcclxuICogXHRhbmltYXRpb25zLlx0XHJcbiAqIFx0VGFrZXMgdGhlIGFtb3VudCBvZiBwaXhlbHMgdGhlIHNsaWRlIHdpbGwgbW92ZSBhbmQgc2V0cyB0aGUgZHVyYXRpb24gYWNjb3JkaW5nXHJcbiAqIFx0dG8gdGhhdC5cclxuICogXHRSZXR1cm5zIHRoZSBkdXJhdGlvbiBpbiBzZWNvbmRzLlxyXG4gKiBcdEBwYXJhbSB7bnVtYmVyfSBkOiB0aGUgZGlzdGFuY2UgaW4gcGl4ZWxzXHJcbiAqL1xyXG4vLyBjcmVhdGUgYW4gYW5pbWF0aW9uIHJhdGlvIGNvbnN0YW50LCB0aGlzIGlzIHRoZSBhbW91bnQgb2YgcHggcGVyIHNlY29uZFxyXG5jb25zdCBfYW5pbWF0aW9uUGl4ZWxzUmF0aW8gPSA0NTtcclxuY29uc3QgX3NldER1cmF0aW9uID0gZCA9PiB7XHJcblx0cmV0dXJuIGQgLyBfYW5pbWF0aW9uUGl4ZWxzUmF0aW87XHJcbn07XHJcblxyXG5cclxuXHJcbi8qKiBSZXN1bWUgTWV0aG9kXHJcbiAqICBVc2VkIHRvIHJlc3RhcnQgb3IgcmVzdW1lIHRoZSBhbmltYXRpb24gaWYgdGhlIG1pbiBkcmFnIHZhbHVlIHdhcyBwYXNzZWQuXHRcclxuICogXHRAcGFyYW0ge2Jvb2xlYW59IHY6IHRydWUgaWYgdGhlIG1pbiBkcmFnIHdhcyBwYXNzZWQsIGZhbHNlIGlmIG5vdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IF9yZXN1bWVCdXJuc0luc3RhbmNlcyA9IHYgPT4ge1xyXG5cdC8qXHRJZiB0aGUgbWluIGRyYWcgd2FzIHBhc3NlZCAodHJ1ZSksIHRoZW4ga2lsbCBib3RoIGluc3RhbmNlcyAodGltZXIgYW5kXHJcblx0ICogIGFuaW1hdGlvbikgYW5kIGNyZWF0ZSB0aGUgdGltZXIgYW5kIGFuaW1hdGlvbiBhZ2FpbiB1c2luZyB0aGUgZGF0YSBpbiB0aGVcclxuXHQgKiBcdGFuaW1hdGlvbiBzdG9yZSBhbmQgdGhlIG1haW4gc2xpZGUgb2JqZWN0LlxyXG5cdCAqIFx0SWYgdGhlIG1pbiBkcmFnIGlzIG5vdCBwYXNzZWQsIGNoZWNrIHdoaWNoIGluc3RhbmNlIHdhcyBydW5uaW5nIHdoZW4gdGhlIFxyXG5cdCAqIFx0cGF1c2UgbWV0aG9kIHdhcyB1c2VkIGFuZCByZXN1bWUgaXQuXHJcblx0Ki9cclxuXHRpZiAoIHYgKSB7XHJcblx0XHQvLyB0aGUgbWluIGRyYWcgd2FzIHBhc3NlZCwga2lsbCB0aGUgYW5pbWF0aW9uIGluc3RhbmNlIGFuZCBzdG9wIHRoZSB0aW1lclxyXG5cdFx0Ly8gYW5kIHNldCBpdCBiYWNrIHRvIDBcclxuXHRcdF9idXJuc0VmZmVjdCA/IF9idXJuc0VmZmVjdC5pbnZhbGlkYXRlKCkua2lsbCgpIDogbnVsbDtcclxuXHRcdF9idXJuc0VmZmVjdFRpbWVyID8gX2J1cm5zRWZmZWN0VGltZXIua2lsbCgpIDogbnVsbDtcclxuXHRcdC8vIHRoaXMgd2lsbCByZXN0YXJ0IHRoZSB0aW1lciBpbnN0YW5jZSwgc28gd2Ugc2V0IHRoYXQgYXMgdGhlIGFjdGl2ZSBydW5uaW5nXHJcblx0XHRfdGltZXJSdW5uaW5nID0gdHJ1ZTtcclxuXHRcdC8vIHJlc3RhcnQgdGhlIHRpbWVyIGVsZW1lbnRcclxuXHRcdF9idXJuc0VmZmVjdFRpbWVyLnJlc3RhcnQoKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gbWluIGRyYWcgbm90IHBhc3NlZCBjaGVjayB0aGUgcnVubmluZyBpbnN0YW5jZVxyXG5cdFx0aWYgKCBfdGltZXJSdW5uaW5nICkge1xyXG5cdFx0XHQvLyB0aGUgdGltZXIgd2FzIHJ1bm5pbmcgd2hlbiB0aGUgcGF1c2UgbWV0aG9kIHdhcyBjYWxsZWRcclxuXHRcdFx0Ly8gcmVzdW1lIHRoZSB0aW1lciBpbnN0YW5jZVxyXG5cdFx0XHRfYnVybnNFZmZlY3RUaW1lci5yZXN1bWUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCBfYnVybnNFZmZlY3RSdW5uaW5nICkge1xyXG5cdFx0XHQvLyB0aGUgYW5pbWF0aW9uIHdhcyBydW5uaW5nIHdoZW4gcGF1c2VkLCByZXN1bWUgdGhlIGFuaW1hdGlvbiBpbnN0YW5jZVxyXG5cdFx0XHRfYnVybnNFZmZlY3RUaW1lci5yZXN1bWUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH0gLy8gbWluIGRyYWcgY29uZGl0aW9uYWxcclxufTtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vYW5pbWF0aW9uLXN0b3JlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2J1cm5zLWVmZmVjdC1tb2R1bGVcIjtcclxuIiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBNQUlOIEFQUCBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG5pbXBvcnQgeyBfaW5pdFN0cmVhbW1tIH0gZnJvbSBcIi4vaW5pdC1tb2R1bGUuanNcIjtcclxuXHJcbi8vIGltcG9ydCB0aGUgZ2xvYmFsIGNsYXNzXHJcbmltcG9ydCBTdHJlYW1tbVNsaWRlciBmcm9tIFwiLi9nbG9iYWwtY2xhc3MtbW9kdWxlLmpzXCI7XHJcblxyXG4vLyBhdHRhY2ggdGhlIGdsb2JhbCBjbGFzcyB0byB0aGUgZ2xvYmFsIG9iamVjdFxyXG53aW5kb3cuU3RyZWFtbW1TbGlkZXIgPSBTdHJlYW1tbVNsaWRlcjtcclxuXHJcbi8vIHdoZW4gdGhlIHNsaWRlciBpcyBpbnN0YW50aWF0ZWQgb3V0c2lkZSB0aGlzIGNvZGUsIHdlIGRvbid0IGNhbGwgdGhlIGluaXQgbWV0aG9kXHJcbi8vIHRoZSBpbml0IG1ldGhvZCBjcmVhdGVzIHRoZSByZWRlcmVyIGFuZCBtYWtlcyB0aGUgYWpheCByZXF1ZXN0LCBpbiB0aGUgY2FzZSBvZiBcclxuLy8gdGhlIHB1YmxpYyBtZXRob2RzLCB0aGUgc2xpZGVyIGlzIGluc3RhbnRpYXRlZCB1c2luZyB0aGUgZ2xvYmFsIGNsYXNzIHRoYXQgXHJcbi8vIGNyZWF0ZXMgdGhlIHJlbmRlcmVyIGFuZCB3aGVuIHRoZSBhamF4IGNhbGwgaGFzIGEgcmVzcG9uc2Ugd2l0aCB0aGUgc2xpZGVzIGRhdGFcclxuLy8gd2UgZXhwb3NlIGEgY3JlYXRlIHNsaWRlciBtZXRob2QgYW5kIHBhc3MgdGhlIHNsaWRlcyBkYXRhLiB0aGF0IG1laHRvZCB3aWxsIGNhbGwgdGhlXHJcbi8vIGFqYXggcmVzcG9uc2UgbWV0aG9kIG9mIHRoZSBhamF4IG1vZHVsZSBhbmQgdGhhdCB3aWxsIGNyZWF0ZSBhbGwgdGhlIHNsaWRlcidzIGFycmF5c1xyXG4vLyBhbmQgd2lsbCBhbGxvdyB0aGUgdXNlciBpbnRlcmFjdGlvbi5cclxuLy8gX2luaXRBSU5ld3MoKTtcclxuIiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBQUkVWSU9VUyBTVFJJUEVTIE1PRFVMRVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcbi8vIHRoaXMgbW9kdWxlIGhhcyB0aGUgY29kZSB0byBjcmVhdGUgdGhlIHN0cmlwZXMgZm9yIHRoZSBwcmV2aW91cyBpbWFnZVxyXG4vLyBoYXMgdGhlIGFycmF5cyB0byBob2xkIHRoZSBzdHJpcGVzIGFzIHJlZmVyZW5jZXMgYW5kIHRvIGRyYWcvYW5pbWF0ZVxyXG5cclxuLypcdFRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBzbGlkZSBpbWFnZSB2YXJpZXMgZGVwbmVkaW5nIG9uIHRoZSBrZW4gYnVybnNcclxuICpcdGVmZmVjdC4gV2UgbmVlZCB0byBnZXQgdGhhdCBwb3NpdGlvbiBhZnRlciB0aGUgYW5pYW10aW9uIGlzIHBhdXNlZCBhbmQgY29ycmVjdFxyXG4gKlx0aXQsIGluIG9yZGVyIHRvIGdldCByZWFsIHZpc2libGUgcGFydCBvZiB0aGUgaW1hZ2UsIGluIG9yZGVyIHRvIGNyZWF0ZSBhbmQgdGhlblxyXG4gKlx0Y29ycmVjdGx5IHNjYWxlIHRoZSBzdHJpcGVzLlxyXG4gKlx0V2UgZ2V0IHRoZSBtYWluIHNsaWRlJ3MgYmFzZSB0ZXh0dXJlIGFzIHdlbGwgYXMgdGhlIHNjYWxlIHJhdGlvIHRvIHNldCB0aGVcclxuICpcdHN0cmlwZXMgYW5kIGl0J3MgdGV4dHVyZSdzIGRpbWVuc2lvbnMsIHRoZW4gYWRkIHRoZW0gdG8gdGhlIHN0YWdlLCB0aGUgcmVmZXJlbmNlXHJcbiAqXHRhcnJheSBhbmQgZmluYWxseSBzZXQgdGhlIGRyYWcvYW5pbWF0aW9uIG9yZGVyLlxyXG4gKlx0Q2hlY2sgaWYgdGhlIGN1cnJlbnQgc2xpZGUgaW1hZ2Ugd2FzIGxvYWRlZCwgaXMgbG9hZGluZyBvciBmYWlsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZVxyXG4gKlx0c3RyaXBlcyB3aXRoIHRoZSBpbWFnZSBhbmQgZ2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBpbWFnZSwgb3IgdXNlIHRoZSBiYXNlIGxvYWRpbmdcclxuICpcdHRleHR1cmUgYW5kIHVzZSAoMCwwKSBhcyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgc2xpZGUgKG5vIGJ1cm5zIGVmZmVjdCkuXHJcbiovXHJcblxyXG4vLyBnZXQgdGhlIGFtb3VudCBvZiBzbGlkZXNcclxuaW1wb3J0IHsgX3NsaWRlc0Ftb3VudCB9IGZyb20gXCIuL2FqYXgtbW9kdWxlXCI7XHJcbi8vIGdldCB3aW5kb3cgbW9kdWxlIHZhcnMuIHNjcmVlbiBzaXplIC8gc3RyaXBlIGhlaWdodFxyXG5pbXBvcnQgeyB3aW5TaXplLCBfc3RyaXBlSGVpZ2h0LCBfaGVpZ2h0UmVtaW5kZXIgfSBmcm9tIFwiLi93aW5kb3dcIjtcclxuLy8gZ2V0IHRoZSBtYWluIHJlbmRlcmVyXHJcbmltcG9ydCB7IF9zdHJpcGVzU3RhZ2UgfSBmcm9tIFwiLi9waXhpLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIG1haW4gc2xpZGUgb2JqZWN0XHJcbmltcG9ydCB7IF9tYWluU2xpZGUgfSBmcm9tIFwiLi9zbGlkZS1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSB0ZXh0dXJlcyBhcnJheVxyXG4vLyBpbXBvcnQgeyBfdGV4dHVyZXNBcnJheSB9IGZyb20gXCIuL3RleHR1cmVzLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIGN1cnJlbnQgY29sb3IgYXJyYXkgaW5kZXhcclxuaW1wb3J0IHsgX2NvbG9yc0FycmF5LCBfY3VycmVudENvbG9ySW5kZXggfSBmcm9tIFwiLi90ZXh0dXJlc1wiO1xyXG4vLyBnZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXggYW5kIHRoZSBzbGlkZXMgZ3JvdXBcclxuaW1wb3J0IHsgX2N1cnJlbnRTbGlkZUluZGV4IH0gZnJvbSBcIi4vc2xpZGUtY2hhbmdlLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIHN0cmlwZXMgYW1vdW50IFxyXG5pbXBvcnQgeyBfc3RyaXBlc0Ftb3VudCwgX2N1cnJlbnRJbml0QXJyYXkgfSBmcm9tIFwiLi9zdHJpcGVzLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byBjcmVhdGUgZ3JhcGhpYyBzdGlwZXNcclxuaW1wb3J0IHsgX2NyZWF0ZUdyYXBoaWNTdHJpcGVzIH0gZnJvbSBcIi4vc3RyaXBlc1wiO1xyXG5cclxuXHJcbi8vIHVzZSB0aGlzIHZhcmlhYmxlIHRvIHN0b3JlIHRoZSBwb3NpdGlvbiBvZiB0aGUgaW1hZ2Ugd2hlbiB0aGUgdXNlciBpbnRlcmFjdGlvbiBzdGFydHNcclxuLy8gdGhpcyBpbiBjYXNlIHRoZSBrZW4gYnVybnMgZWZmZWN0IHdhcyBwbGF5aW5nIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3Rpb24gc3RhcnRlZFxyXG4vLyBsZXQgX2N1cnJlbnRQb3NpdGlvbiA9IHt9O1xyXG4vLyBnZXQgdGhlIGN1cnJlbnQgc2xpZGUgc2NhbGVcclxuLy8gbGV0IF9jdXJyZW50U2NhbGUgPSBudWxsO1xyXG5cclxuZXhwb3J0IGNvbnN0IF9jdXJyZW50SW5pdFN0cmlwZXMgPSAoKSA9PiB7XHJcblx0Y29uc3QgeyBcclxuXHRcdF9pc0xvYWRlZCwgdGV4dHVyZSxcclxuXHRcdHg6IF9wb3NYLCB5OiBfcG9zWSwgX2FuaW1hdGlvblR5cGUsIHNjYWxlOl9jdXJyZW50U2NhbGUsXHJcblx0XHRoZWlnaHQ6IF9tYWluU2xpZGVIZWlnaHQsIHdpZHRoOl9tYWluU2xpZGVXaWR0aFxyXG5cdH0gPSBfbWFpblNsaWRlO1xyXG5cdFxyXG5cdC8vIGJhc2UgdGV4dHVyZSBoZWlnaHQsIHVzZWQgdG8gY2hlY2sgaWYgdGhlIHN0cmlwZSBmcmFtZSB3aWxsIGZpdCBpbiB0aGUgdGV4dHVyZVxyXG5cdGNvbnN0IF9iYXNlUmVhbEhlaWdodCA9IHRleHR1cmUuYmFzZVRleHR1cmUucmVhbEhlaWdodDtcclxuXHQvLyBiYXNlIHRleHR1cmUgcmVhbCB3aWR0aCwgdXNlZCB0byBjaGVjayBpZiB0aGUgc3RyaXBlIGZyYW1lIGZpdHMgaW4gdGhlIHRleHR1cmVcclxuXHRjb25zdCBfYmFzZVJlYWxXaWR0aCA9IHRleHR1cmUuYmFzZVRleHR1cmUucmVhbFdpZHRoO1xyXG5cclxuXHQvLyBjaGVjayBpZiB0aGUgY3VycmVudCBpbWFnZSBpcyBsb2FkZWRcclxuXHRpZiAoIV9pc0xvYWRlZCApIHtcclxuXHRcdC8qICBDaGVjayBpZiB0aGlzIGlzIHRoZSBsYXN0IG9yIGZpcnN0IHNsaWRlIG9mIHRoZSBncm91cC5cclxuXHRcdCAqICBJbiB0aGF0IGNhc2UgdGhlIGN1cnJlbnQgc3RyaXBlcyB3aWxsIGJlIGNyZWF0ZWQgaW4gb3JkZXIgdG8gbW92ZSB0aGVtXHJcblx0XHQgKiBcdGFjcm9zcyB0aGUgc2NyZWVuLiBJZiB0aGlzIGlzIG5vdCB0aGUgbGFzdCBvciBmaXJzdCBzbGlkZSwgZG8gbm90aGluZ1xyXG5cdFx0Ki9cclxuXHRcdGlmICggX2N1cnJlbnRTbGlkZUluZGV4ID09PSAwIHx8IF9jdXJyZW50U2xpZGVJbmRleCA9PT0gX3NsaWRlc0Ftb3VudCApIHtcclxuXHRcdFx0Ly8gY3JlYXRlIHRoZSBncmFwaGljcyBzdHJpcGVzIGFuZCBhZGQgdGhlbSB0byB0aGUgY3VyZW50IGluaXQgYXJyYXlcclxuXHRcdFx0X2NyZWF0ZUdyYXBoaWNTdHJpcGVzKCBfY3VycmVudEluaXRBcnJheSwgMCwgX2NvbG9yc0FycmF5W19jdXJyZW50Q29sb3JJbmRleF0gKTtcclxuXHRcdFx0Ly8gaGlkZSB0aGUgbWFpbiBzbGlkZVxyXG5cdFx0XHRfbWFpblNsaWRlLmFscGhhID0gMDtcclxuXHRcdH1cclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0Ly8gaGlkZSB0aGUgbWFpbiBzbGlkZVxyXG5cdF9tYWluU2xpZGUuYWxwaGEgPSAwO1xyXG5cclxuXHQvKiBGUk9NIFZFUlNJT04gMi4yLjRcclxuXHQgKiB0aGUgZmluYWwgc3RyaXBlIGhlaWdodCB3aWxsIGJlIGFuIGludGVnZXIsIHRoZXJlJ3Mgbm8gbmVlZCB0byBjb3JyZWN0XHJcblx0ICogdGhlIGRpbWVuc2lvbnMgdXNpbmcgdG9GaXhlZCgpIGFueW1vcmUuXHJcblx0Ki9cclxuXHQvLyBjb3JyZWN0ZWQgaGVpZ2h0XHJcblx0bGV0IF9yZWFsU3RyaXBlSGVpZ2h0ID0gKCBfc3RyaXBlSGVpZ2h0IC8gX2N1cnJlbnRTY2FsZS54ICk7XHJcblx0Ly8gY29ycmVjdGVkIGhlaWdodFxyXG5cdGxldCBfcmVhbFJlbWluZGVySGVpZ2h0ID0gKCBfaGVpZ2h0UmVtaW5kZXIgLyBfY3VycmVudFNjYWxlLnggKTtcclxuXHQvLyBjb3JyZWN0ZWQgd2lkdGhcclxuXHRsZXQgX3JlYWxTdHJpcGVXaWR0aCA9ICggd2luU2l6ZS53IC8gX2N1cnJlbnRTY2FsZS54ICk7XHJcblxyXG5cclxuXHJcblx0LyoqIFNFVCBUSEUgU1RBUlQgUE9JTlRTIEZPUiBUSEUgU1RSSVBFU1x0XHJcblx0ICogIFRoaXMgZGVwZW5kcyBvbiB0aGUgYW5pbWF0aW9uIHR5cGUuIEZvciB2ZXJ0aWNhbCBhbmQgaG9yaXpvbnRhbCBhbmltYXRpb25zXHJcblx0ICogXHR0aGUgc3RhcnQgcG9pbnRzIGFyZSBiYXNlZCBvbiB0aGUgcG9zaXRpb24gb2YgdGhlIHNsaWRlIGNvbnNpZGVyaW5nIHRoYXRcclxuXHQgKiBcdHRoZSBhbmNob3IgcG9pbnQgaXMgMC5cclxuXHQgKiBcdEZvciB0aGUgem9vbSBhbmltYXRpb25zIHRoZSBhbmNob3IgcG9pbnQgaXMgMC41IChjZW50ZXIgb2YgdGhlIHNsaWRlKSBhbmRcclxuXHQgKiBcdHRoZSBzbGlkZSBpcyBwb3NpdGlvbmVkIHRvIGJlIGF0IHRoZSBjZW50ZXIgb2YgdGhlIHJlbmRlcmVyLCBzbyB3ZSBuZWVkIHRvXHJcblx0ICogXHRjb25zaWRlciB0aGUgc2xpZGUncyBkaW1lbnNpb25zIGFuZCBjb3JyZWN0IHRoZW0gd2l0aCB0aGUgY3VycmVudCBzY2FsZSBhZnRlclxyXG5cdCAqIFx0dGhlIGFuaW1hdGlvbiBoYXMgc3RvcHBlZC5cclxuXHQqL1xyXG5cclxuXHQvLyBWRVJTSU9OIDIuMS4wIHNpbmNlIHVzaW5nIGRpZmZlcmVudCBidXJucyBlZmZlY3RzLCB3ZSBnZXQgdGhlIHNhbWUgc3RhcnRpbmcgcG9zaXRpb25cclxuXHQvLyBpbiBhbGwgY2FzZXMgZm9yIHRoZSBjdXJyZW50IHN0cmlwZXMuXHJcblx0Ly8gY2hlY2sgaWYgdGhlIGFuaW1hdGlvbiB0eXBlIGlzIHpvb20gXHJcblx0bGV0IF9zdGFydFkgPSBfYW5pbWF0aW9uVHlwZSA9PT0gMiA/IHBhcnNlRmxvYXQoIFxyXG5cdFx0KCAoIF9tYWluU2xpZGVIZWlnaHQgLyAyICkgLSBfcG9zWSApIC8gX2N1cnJlbnRTY2FsZS54IFxyXG5cdCkgOiBwYXJzZUZsb2F0KCBNYXRoLmFicyggX3Bvc1kgLyBfY3VycmVudFNjYWxlLnggKSApO1xyXG5cdFxyXG5cdFxyXG5cdC8vIFZFUlNJT04gMi4xLjAgVVNFIFRIRSBDT1JSRUNURUQgU0NBTEUgUkFUSU9cclxuXHQvLyBhbHdheXMgY2hlY2sgdGhlIGN1cnJlbnQgcG9zaXRpb24gZHVlIHRvIHRoZSBkaWZmZXJlbnQga2VuIGJ1cm5zIGVmZmVjdHNcclxuXHQvLyBjaGVjayBpZiB0aGUgYW5pbWF0aW9uIGlzIHpvb20gXHJcblx0bGV0IF9zdGFydFggPSBfYW5pbWF0aW9uVHlwZSA9PT0gMiA/IHBhcnNlRmxvYXQoIFxyXG5cdFx0KCAoX21haW5TbGlkZVdpZHRoIC8gMikgLSBfcG9zWCApIC8gX2N1cnJlbnRTY2FsZS54IFxyXG5cdCkgOiBwYXJzZUZsb2F0KCBNYXRoLmFicyggX3Bvc1ggLyBfY3VycmVudFNjYWxlLnggKSApO1xyXG5cdC8vIGlmIHRoZSBmcmFtZSB3aWR0aCBpcyBiaWdnZXIgdGhlbiBjb3JyZWN0IGl0XHJcblx0aWYgKCBfc3RhcnRYICsgX3JlYWxTdHJpcGVXaWR0aCA+IF9iYXNlUmVhbFdpZHRoICkge1xyXG5cdFx0Y29uc29sZS5sb2coIFwiZnJhbWUgd2lkdGggY29ycmVjdGlvblwiICk7XHJcblx0XHRjb25zb2xlLmxvZyggX3N0YXJ0WCArIF9yZWFsU3RyaXBlV2lkdGgsIF9iYXNlUmVhbFdpZHRoICk7XHJcblx0XHRfcmVhbFN0cmlwZVdpZHRoID0gX2Jhc2VSZWFsV2lkdGggLSBfc3RhcnRYO1xyXG5cdH1cclxuXHRcclxuXHRcclxuXHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBfc3RyaXBlc0Ftb3VudDsgaSsrICkge1xyXG5cdFx0Ly8gdGhlIGNhbGN1bGF0ZWQgZnJhbWUgc3RhcnQgWSBwb2ludFxyXG5cdFx0bGV0IF9mcmFtZVN0YXJ0WSA9ICggX3N0YXJ0WSArICggX3JlYWxTdHJpcGVIZWlnaHQgKiBpICkgKTtcclxuXHJcblxyXG5cdFx0Y29uc3QgX25ld0ZyYW1lID0gbmV3IFBJWEkuUmVjdGFuZ2xlKFxyXG5cdFx0XHRfc3RhcnRYLCBfZnJhbWVTdGFydFksXHJcblx0XHRcdC8vIGluIHRoZSBmaW5hbCBzdHJpcGUgdXNlIHRoZSByZW1pbmRlciBoZWlnaHQgYW5kIG5vdCB0aGUgcmVndWxhciBoZWlnaHRcclxuXHRcdFx0X3JlYWxTdHJpcGVXaWR0aCwgaSA8IChfc3RyaXBlc0Ftb3VudCAtIDEpID8gX3JlYWxTdHJpcGVIZWlnaHQgOiBfcmVhbFJlbWluZGVySGVpZ2h0XHJcblx0XHQpOyAvLyBuZXcgZnJhbWVcclxuXHRcdC8vIGNyZWF0ZSBhIG5ldyB0ZXh0dXJlXHJcblx0XHRjb25zdCBfbmV3VGV4dHVyZSA9IG5ldyBQSVhJLlRleHR1cmUoIF9tYWluU2xpZGUudGV4dHVyZS5iYXNlVGV4dHVyZSwgX25ld0ZyYW1lICk7XHJcblx0XHQvLyBjcmVhdGUgdGhlIG5ldyBzcHJpdGVcclxuXHRcdGNvbnN0IF9uZXdTdHJpcGUgPSBuZXcgUElYSS5TcHJpdGUoIF9uZXdUZXh0dXJlICk7XHJcblx0XHQvLyBhZGQgdGhlIHN0cmlwZSB0byB0aGUgY3VycmVudCBpbml0IGFycmF5XHJcblx0XHRfY3VycmVudEluaXRBcnJheS5wdXNoKCBfbmV3U3RyaXBlICk7IC8vIGZvciBub3cgd2UncmUgYWRkaW5nIGl0IHRvIHRoZSBjdXJyZW50IHN0cmlwZXNcclxuXHRcdC8vIHNldCB0aGUgeSBwb3NpdGlvbiBvZiB0aGUgc3RyaXBlXHJcblx0XHRfbmV3U3RyaXBlLnkgPSBfc3RyaXBlSGVpZ2h0ICogaTtcclxuXHJcblx0XHQvLyBWRVJTSU9OIDIuMS4wIFVTRSBDT1JSRUNURUQgU0NBTEVcclxuXHRcdF9uZXdTdHJpcGUuc2NhbGUuc2V0KCBfY3VycmVudFNjYWxlLnggKTtcclxuXHJcblx0XHQvLyBhZGQgdGhlIHN0cmlwZSB0byB0aGUgc3RhZ2VcclxuXHRcdF9zdHJpcGVzU3RhZ2UuYWRkQ2hpbGQoIF9uZXdTdHJpcGUgKTtcclxuXHR9IC8vIGZvciBsb29wIGVuZFxyXG59O1xyXG4iLCIvLyBnZXQgdGhlIHNjcmVlbiBkaW1lbnNpb25zXHJcbmltcG9ydCB7IHdpblNpemUgfSBmcm9tIFwiLi93aW5kb3dcIjtcclxuLy8gaW1wb3J0IHRoZSBjdXJyZW50IHNsaWRlIGluZGV4XHJcbmltcG9ydCB7IF9jdXJyZW50U2xpZGVJbmRleCwgX3NsaWRlc0dyb3VwLCBfcmVzZXRTbGlkZXJHcm91cCB9IGZyb20gXCIuL3NsaWRlLWNoYW5nZS1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSBtZXRob2QgdG8gY3JlYXRlIHRoZSBwaXhpIHJlbmRlcmVyXHJcbmltcG9ydCB7IGNyZWF0ZVJlbmRlcmVyLCBfc3RyaXBlc1N0YWdlLCBfbG9nb1N0YWdlIH0gZnJvbSBcIi4vcGl4aS1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSBtZXRob2QgdG8gcmVzZXQgdGhlIGFwcCdzIGluaXQgYm9vbGVhbiBmb3IgdGhlIGRlc3Ryb3kgbWV0aG9kXHJcbmltcG9ydCB7IF9yZXNldEFwcEluaXRCb29sLCBfbWFpblNsaWRlIH0gZnJvbSBcIi4vc2xpZGUtbW9kdWxlLmpzXCI7XHJcbi8vIGdldCB0aGUgY3VycmVudCBhbmQgbmV4dCByZWZlcmVuY2UgYXJyYXlzIGluIG9yZGVyIHRvIGNyZWF0ZSB0aGUgYW5pbWF0aW9uc1xyXG4vLyBpbiB0aGUgbmV4dCBzbGlkZSBtZXRob2QuXHJcbmltcG9ydCB7IF9jdXJyZW50SW5pdEFycmF5LCBfcHJldmlvdXNJbml0QXJyYXksIF9uZXh0SW5pdEFycmF5LCBfc2V0RW1wdHlBcnJheXMsIF9yZXNldFN0cmlwZXNBcnJheXMsIF9zdHJpcGVzQW1vdW50LCBfY3JlYXRlQW5pbWF0aW9uQXJyYXksIF9jdXJyZW50U3RyaXBlcywgX25leHRTdHJpcGVzLCBfc3RyaXBlc01pZGRsZSB9IGZyb20gXCIuL3N0cmlwZXMtbW9kdWxlLmpzXCI7XHJcbi8vIGdldCB0aGUgbWV0aG9kIHRvIGNyZWF0ZSB0aGUgY3VycmVudCBpbml0IGFycmF5XHJcbmltcG9ydCB7IF9jdXJyZW50SW5pdFN0cmlwZXMgfSBmcm9tIFwiLi9jdXJyLXN0cmlwZXMtbW9kdWxlLmpzXCI7XHJcbi8vIGdldCB0aGUgbWV0aG9kIHRvIGNyZWF0ZSB0aGUgbmV4dCBpbml0IGFycmF5XHJcbmltcG9ydCB7IF9uZXh0SW5pdFN0cmlwZXMgfSBmcm9tIFwiLi9uZXh0LXN0cmlwZXMtbW9kdWxlLmpzXCI7XHJcbi8vIGdldCB0aGUgbWV0aG9kcyB0byBzZXQgdGhlIGludGVyYWN0aW9uIGJvb2xzXHJcbmltcG9ydCB7IF9zZXRJbnRlcmFjdGlvbkJvb2xzLCBfcmVzZXRVc2VySW50ZXJhY3Rpb24sIF91c2VySW50ZXJhY3Rpb24sIF9zdHJpcGVzQW5pbWF0aW5nIH0gZnJvbSBcIi4vaW50ZXJhY3Rpb24tbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgdGV4dHVyZXMgYXJyYXlcclxuaW1wb3J0IHsgX3RleHR1cmVzQXJyYXkgfSBmcm9tIFwiLi90ZXh0dXJlcy1tb2R1bGVcIjtcclxuLy8gaW1wb3J0IHRoZSBhamF4IHJlc3BvbnNlIG1ldGhvZCB0byBzZXQgdGhlIGRhdGEgcGFzc2VkIGJ5IHRoZSBjcmVhdGUgc2xpZGVyIG1ldGhvZFxyXG4vLyBhbmQgc2V0IHRoZSBzbGlkZXMgZGF0YSBpbiB0aGUgYWpheCBtb2R1bGUuXHJcbi8vIG5vcm1hbGx5IHRoaXMgaXMgaGFuZGxlZCBieSB0aGUgYWpheCBtb2R1bGUsIGJ1dCBpbiB0aGlzIGNhc2UgdGhlIHNlcnZlciBjb211bmljYXRpb25cclxuLy8gaXMgaGFuZGxlZCBlbHNld2hlcmUuXHJcbmltcG9ydCB7IF9hamF4UmVzcG9uc2UgfSBmcm9tIFwiLi9hamF4LW1vZHVsZS5qc1wiO1xyXG4vLyBpbXBvcnQgdGhlIHBhdXNlIG1ldGhvZCBmcm9tIHRoZSBhbmltYXRpb24gbW9kdWxlLiB0aGlzIHdpbGwgYmUgdXNlZCBpbiB0aGUgZGVzdHJveVxyXG4vLyBtZXRob2QgdG8gcHJldmVudCBhbnkgdHlwZSBvZiBjYWxsYmFjayBmcm9tIGJlaW5nIHRyaWdlcmVkXHJcbmltcG9ydCB7IF9wYXVzZUJ1cm5zRWZmZWN0LCBfYnVybnNFZmZlY3QgfSBmcm9tIFwiLi9hbmltYXRpb25cIjtcclxuLy8gZ2V0IHRoZSBhbmltYXRlZCBwcmVsb2FkZXJcclxuaW1wb3J0IHsgX3ByZWxvYWRlciB9IGZyb20gXCIuL2xvYWRlclwiO1xyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byByZXNldCB0aGUgdGV4dCBkYXRhXHJcbmltcG9ydCB7IFxyXG5cdF9yZXNldFRleHREYXRhLCBfcGFyR2FwLCBfYWRkV29yZERlbGF5ZWRDYWxsLCBfdGV4dENvbXBsZXRlVGltZXIsXHJcblx0X3NldEZhc3RGb3J3YXJkLCBfcHJvY2Vzc1NsaWRlVGV4dCwgX2NyZWF0ZU5ld1NsaWRlVGV4dFxyXG59IGZyb20gXCIuL3RleHQtbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgaGlkZSBwcm9tcHQgbWV0aG9kXHJcbmltcG9ydCB7IF9oaWRlUHJvbXB0LCBfaW50ZXJydXB0UHJvbXB0IH0gZnJvbSBcIi4vcHJvbXB0LW1vZHVsZVwiO1xyXG5cclxuXHJcbi8qKiBFdmVudHMgT2JqZWN0Llx0XHJcbiAqICBUaGlzIGhvbGRzIGFsbCB0aGUgY2FsbGJhY2tzIHNldCBieSB0aGUgcHVibGljIG9uIG1ldGhvZCBvZiB0aGUgc2xpZGVyIGNsYXNzLlx0XHJcbiAqIFx0RWFjaCBtZXRob2QgaXMgYWRkZWQgdXNpbmcgYSBzdHJpbmcgdG8gaWRlbnRpZnkgaXQgYXMgYSBrZXkgb24gdGhlIG9iamVjdCBhbmRcclxuICogXHR0aGUgY2FsbGJhY2sgaXMgdGhlIHZhbHVlLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2V2ZW50c09iamVjdCA9IHt9O1xyXG5cclxuXHJcbi8qKiBFbWl0dGVyIE1ldGhvZC5cdFxyXG4gKiAgVGhpcyBpcyBjYWxsZWQgaW4gZGlmZmVyZW50IHBhcnRzIG9mIHRoZSBjb2RlIHBhc3NpbmcgYSBzcGVjaWZpYyB0eXBlIG9mIGV2ZW50LFxyXG4gKiBcdHdoaWNoIHdpbGwgdHJpZ2dlciBhIGNhbGxiYWNrIGluIGFuIG9iamVjdCwgaWYgdGhhdCBjYWxsYmFjayBpcyBhY3R1YWxseSBzdG9yZWRcclxuICogXHRpbiB0aGUgZXZlbnRzIG9iamVjdC5cclxuICogXHRAcGFyYW0ge3N0cmluZ30gdDogdHlwZSBvZiBldmVudCBiZWluZyBjYWxsZWRcclxuICogIEBwYXJhbSB7YW55fSBhOiBhbnkgZGF0YSB0aGF0J3MgcGFzc2VkIGZyb20gdGhlIGVtaXR0ZXIgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGVcclxuICogXHRcdFx0XHRcdFx0XHRcdFx0Y29kZS5cclxuKi9cclxuZXhwb3J0IGNvbnN0IF9ldmVudEVtaXR0ZXIgPSAodCwgYSkgPT4ge1xyXG5cdC8vIGNoZWNrIGlmIHRoZSB0eXBlIGlzIGRlZmluZWQgaW4gdGhlIGV2ZW50cyBvYmplY3RcclxuXHRpZiAoX2V2ZW50c09iamVjdFt0XSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRhID8gX2V2ZW50c09iamVjdFt0XShhKSA6IF9ldmVudHNPYmplY3RbdF0oKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKiogUHVibGljIFNsaWRlciBDbGFzc1x0XHJcbiAqICBUaGUgY2xhc3Mgd2lsbCBjcmVhdGUgdGhlIG1haW4gc2xpZGVyIGVsZW1lbnQgaW4gYW4gZXhpc3RpbmdcclxuICogXHRjYW52YXMgZWxlbWVudC5cdFxyXG4gKiBcdFRoZSBjb25zdHJ1Y3RvciBjcmVhdGVzIHRoZSByZW5kZXJlciBhbmQgc3RhZ2UsIGFuZCBhdHRhY2hzIGl0IHRvXHJcbiAqIFx0dGhlIGV4aXN0aW5nIGNhbnZhcyB0YWcuXHRcclxuICogXHRUaGUgY3JlYXRlIG1ldGhvZCBnZXRzIHRoZSBzbGlkZXMgZGF0YSByZXR1cm5lZCBieSB0aGUgc2VydmVyLCBwYXNzZXNcclxuICogXHR0aGUgZGF0YSB0byB0aGUgYWpheCBtb2R1bGUgYW5kIGluaXRzIHRoZSBzbGlkZXIgY3JlYXRpb24gcHJvY2Vzcy5cclxuKi9cclxuXHJcbmNsYXNzIFN0cmVhbW1tU2xpZGVyIHtcclxuXHQvLyB0aGUgc2xpZGVyIGNvbnN0cnVjdG9yIHdpbGwgY2FsbCB0aGUgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSByZW5kZXIsXHJcblx0Ly8gc2V0IHRoZSBzdGFnZSBhcyBpbnRlcmFjdGl2ZS4gQWxzbyB0aGlzIHdpbGwgdGFrZSB0aGUgaWQgb2YgdGhlIHJlbmRlcmVyIHRhcmdldFxyXG5cdC8vIGFzIGEgc3RyaW5nXHJcblx0Y29uc3RydWN0b3IoaWQpe1xyXG5cdFx0Y3JlYXRlUmVuZGVyZXIoaWQpO1xyXG5cdH1cclxuXHJcblx0LyoqIENyZWF0ZSBNZXRob2RcdFxyXG5cdCAqICBQdWJsaWMgbWV0aG9kIHRvIGNyZWF0ZSB0aGUgc2xpZGVyLlx0XHJcblx0ICogXHRUYWtlcyBhbiBhcnJheSB3aXRoIHRoZSBzbGlkZXMgZGF0YSBhbmQgc3RvcmVzIGl0IGluIHRoZSBhcHAuXHRcclxuXHQgKiBcdENyZWF0ZXMgdGhlIG1haW4gc2xpZGUgYW5kIHJlc2V0cyB0aGUgdGV4dHVyZXMgYXJyYXkuXHJcblx0ICogXHRAcGFyYW0ge2FycmF5fSBkOiB0aGUgZGF0YSBzbGlkZXMgYXJyYXkgcmV0dXJuZWQgYnkgdGhlIHNlcnZlci5cclxuXHQqL1xyXG5cdGNyZWF0ZVNsaWRlcihkKXtcclxuXHRcdC8vIGNhbGwgdGhlIGFqYXggcmVzcG9uc2UgbWV0aG9kIGluIG9yZGVyIHRvIHNldCB0aGUgc2xpZGVzIGRhdGEgYW5kIFxyXG5cdFx0Ly8gaW5pdGlhbGl6ZSB0aGUgc2xpZGVyXHJcblx0XHRfYWpheFJlc3BvbnNlKGQpO1xyXG5cdH1cclxuXHJcblx0LyoqIERlc3Ryb3kgTWV0aG9kXHRcclxuXHQgKiAgTWV0aG9kIHVzZWQgdG8gc2V0IHRoZSBzbGlkZXIgdG8gYSBiYXNpYyBzdGF0ZS5cdFxyXG5cdCAqIFx0VGhpcyBzdGF0ZSBpcyBzZXR0aW5nIHRoZSBtYWluIHNsaWRlIHdpdGggbm8gdGV4dHVyZSAob3IgdGhlIGxvYWRpbmcgdGV4dHVyZSlcclxuXHQgKiBcdGFuZCBhbHBoYSB0byAwLCByZW1vdmUgYWxsIHRoZSBkYXRhIGZyb20gdGhlIHRleHR1cmVzIGFycmF5LCBzZXQgdGhlIGFjdGl2ZVxyXG5cdCAqXHRpbmRleCB0byAwLlx0XHJcblx0ICogXHRTZXQgYWxsIHRoZSBzdHJpcGVzIGFycmF5cyB0byBudWxsIChyZWxlYXNlIHRvIEdDKS5cclxuXHQqL1xyXG5cdGRlc3Ryb3lTbGlkZXIoKXtcclxuXHRcdC8vIHBhdXNlIHRoZSB0aW1lciBhbmQgYW5pbWF0aW9uXHJcblx0XHRfcGF1c2VCdXJuc0VmZmVjdCgpO1xyXG5cdFx0Ly8gc2V0IHRoZSBhcHAgaW5pdCBib29sIHRvIGZhbHNlIGluIG9yZGVyIHRvIHByZXZlbnQgdXNlciBpbnRlcmFjdGlvbiBcclxuXHRcdC8vIHVudGlsIHRoZSBzbGlkZSBpcyBjcmVhdGVkIGFnYWluLiBJbiB0aGF0IHByb2Nlc3MsIHdoZW4gdGhlIHRleHR1cmVzIGFycmF5XHJcblx0XHQvLyBpcyBjcmVhdGVkIGFnYWluLCB0aGUgYm9vbCB3aWxsIGJlIHNldCB0byB0cnVlLlxyXG5cdFx0X3Jlc2V0QXBwSW5pdEJvb2woZmFsc2UpO1xyXG5cclxuXHRcdC8vIHJlc2V0IGFuZCBoaWRlIHRoZSB0ZXh0IGVsZW1lbnRcclxuXHRcdC8vIHN0b3AgYWxsIGRlbGF5ZWQgY2FsbHMuXHJcblx0XHRfcGFyR2FwID8gX3BhckdhcC5wYXVzZSgpIDogbnVsbDtcclxuXHRcdF9hZGRXb3JkRGVsYXllZENhbGwgPyBfYWRkV29yZERlbGF5ZWRDYWxsLnBhdXNlKCkgOiBudWxsO1xyXG5cdFx0Ly8gbm93IHJlc2V0IHRoZSB0ZXh0cyBvZiB0aGUgc2xpZGVcclxuXHRcdF9yZXNldFRleHREYXRhKCk7XHJcblx0XHQvLyBzZXQgdGhlIG1haW4gc2xpZGUgYWxwaGEgdG8gMFxyXG5cdFx0Ly8gX21haW5TbGlkZS5hbHBoYSA9IDA7XHJcblxyXG5cclxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdFx0Ly8gaW4gb3JkZXIgdG8gc29sdmUgdGhpcyBpc3N1ZVxyXG5cdFx0Ly8gaHR0cHM6Ly93ZWJzbmFwLnNsYWNrLmNvbS9maWxlcy9uZGFtb2ZsaS9GNlpMRTRKNEIvaW1nXzI5OTcucG5nXHJcblx0XHQvLyB3ZSBoaWRlIHRoZSBzdHJpcGVzIHN0YWdlIGluIG9yZGVyIHRvIGF2b2lkIHRoaXMgd2UgaGlkZSB0aGUgc3RyaXBlc1xyXG5cdFx0Ly8gc3RhZ2UuIFRoZW4gd2hlbiB0aGUgc2xpZGVyIGlzIGNyZWF0ZWQgYWdhaW4gYWZ0ZXIgdGhlIGFqYXggcmVzcG9uc2VcclxuXHRcdC8vIHdlIHNob3cgdGhlIHN0YWdlIGFnYWluLiBUaGUgc3RyaXBlcyBzdGFnZSBpcyBhIFBJWEkgY29udGFpbmVyIG9iamVjdFxyXG5cdFx0X3N0cmlwZXNTdGFnZS5hbHBoYSA9IDA7XHJcblx0XHQvLyBoaWRlIHRoZSBsb2dvIGFuZCBtZW51IGJ1dHRvblxyXG5cdFx0X2xvZ29TdGFnZS5hbHBoYSA9IDA7XHJcblx0XHQvLyBoaWRlIHRoZSBwcm9tcHQgY29tcG9uZW50XHJcblx0XHRfaGlkZVByb21wdCgpO1xyXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdFx0Lyogc2hvdyB0aGUgcHJlbG9hZGVyIGFuaW1hdGlvblxyXG5cdFx0ICogVGhlIHByZWxvYWRlciBjb3VsZCBiZSBzdG9wcGVkIHNvIHdlIHBsYXkgaXQgYmVmb3JlIHNob3dpbmcgaXRcclxuXHRcdCovXHJcblx0XHRfcHJlbG9hZGVyLnBsYXkoKTtcclxuXHRcdFR3ZWVuTGl0ZS50byhfcHJlbG9hZGVyLCAwLjEsIHthbHBoYToxfSk7XHJcblx0XHRjb25zb2xlLmxvZyggXCJzaG93IHByZWxvYWRlciBkZXN0cm95XCIgKTtcclxuXHJcblx0XHQvLyBzZXQgdGhlIGludGVyYWNpb24gYm9vbHMgdG8gcHJldmVudCBhbnkgdXNlciBpbnRlcmFjdGlvbiwgc2luY2UgdGhlIHJlbmRlcmVyXHJcblx0XHQvLyBhbmQgdGhlIHN0YWdlIHdpbGwgcmVtYWluIGluIHRoZSBzbGlkZXIgYW5kIHRoZSBzdGFnZSByZWNlaXZlcyBhbGwgdGhlIHVzZXIgaW50ZXJhY3Rpb25cclxuXHRcdF9zZXRJbnRlcmFjdGlvbkJvb2xzKHRydWUpO1xyXG5cdFx0Ly8gcmVtb3ZlIGFsbCB0aGUgc3RyaXBlcyBmcm9tIHRoZSByZW5kZXJlclxyXG5cdFx0Ly8gcmVzZXQgdGhlIHN0cmlwZXMgcG9zaXRpb24gYW5kIG9wYWNpdHkgYW5kIHRoZW4gcmVtb3ZlIHRoZW0gZnJvbSBtZW1vcnlcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgX3N0cmlwZXNBbW91bnQ7IGkrKykge1xyXG5cdFx0XHRjb25zdCBfaGFzQ3VycmVudCA9IF9jdXJyZW50SW5pdEFycmF5ID8gX2N1cnJlbnRJbml0QXJyYXlbaV0gOiBudWxsO1xyXG5cdFx0XHRjb25zdCBfaGFzUHJldmlvdXMgPSBfcHJldmlvdXNJbml0QXJyYXkgPyBfcHJldmlvdXNJbml0QXJyYXlbaV0gOiBudWxsO1xyXG5cdFx0XHRjb25zdCBfaGFzTmV4dCA9IF9uZXh0SW5pdEFycmF5ID8gX25leHRJbml0QXJyYXlbaV0gOiBudWxsO1xyXG5cclxuXHRcdFx0aWYgKF9oYXNDdXJyZW50KSB7XHJcblx0XHRcdFx0VHdlZW5MaXRlLmtpbGxUd2VlbnNPZihfaGFzQ3VycmVudCk7XHJcblx0XHRcdFx0X2hhc0N1cnJlbnQuZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChfaGFzUHJldmlvdXMpIHtcclxuXHRcdFx0XHRUd2VlbkxpdGUua2lsbFR3ZWVuc09mKF9oYXNQcmV2aW91cyk7XHJcblx0XHRcdFx0X2hhc1ByZXZpb3VzLmRlc3Ryb3koKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoX2hhc05leHQpIHtcclxuXHRcdFx0XHRUd2VlbkxpdGUua2lsbFR3ZWVuc09mKF9oYXNOZXh0KTtcclxuXHRcdFx0XHRfaGFzTmV4dC5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdH0gXHJcblx0XHQvLyBzZXQgdGhlIHN0cmlwZXMgYXJyYXkgdG8gbnVsbFxyXG5cdFx0X3Jlc2V0U3RyaXBlc0FycmF5cygpO1xyXG5cdFx0Ly8gZGVzdHJveSB0aGUgY3VycmVudCB0ZXh0dXJlc1xyXG5cdFx0X3RleHR1cmVzQXJyYXkuZm9yRWFjaChlID0+IHtcclxuXHRcdFx0ZSA/IGUuZGVzdHJveSgpIDogbnVsbDtcclxuXHRcdFx0ZSA/IGUuZGlzcG9zZSgpIDogbnVsbDtcclxuXHRcdH0pO1xyXG5cdFx0Ly8gcmVzZXQgdGhlIHNsaWRlcyBncm91cCB0byAwXHJcblx0XHRfcmVzZXRTbGlkZXJHcm91cCgpO1xyXG5cdH1cclxuXHJcblx0LyoqIEFjdGl2ZSBTbGlkZSBNZXRob2RcdFxyXG5cdCAqICBQdWJsaWMgbWV0aG9kIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCBhY3RpdmUgc2xpZGUgaW5kZXguXHJcblx0Ki9cclxuXHRnZXRBY3RpdmVTbGlkZSgpe1xyXG5cdFx0cmV0dXJuIF9jdXJyZW50U2xpZGVJbmRleDtcclxuXHR9XHJcblxyXG5cdGdldEN1cnJlbnRHcm91cCgpe1xyXG5cdFx0cmV0dXJuIF9zbGlkZXNHcm91cDtcclxuXHR9XHJcblxyXG5cdC8vIFB1YmxpYyBtZXRob2QgdGhhdCByZXR1cm5zIHRoZSBpbWFnZSBzdGF0dXMgb2YgdGhlIGN1cnJlbnQgc2xpZGVcclxuXHRnZXRMb2FkZWRTdGF0dXMoKXtcclxuXHRcdGxldCBjdXJyZW50U3RhdHVzO1xyXG5cdFx0c3dpdGNoKCBfbWFpblNsaWRlLl9pc0xvYWRlZCApIHtcclxuXHRcdFx0Y2FzZSAodHJ1ZSk6XHJcblx0XHRcdFx0Y3VycmVudFN0YXR1cyA9IDA7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgKG51bGwpOlxyXG5cdFx0XHRcdGN1cnJlbnRTdGF0dXMgPSAxO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIChmYWxzZSk6XHJcblx0XHRcdFx0Y3VycmVudFN0YXR1cyA9IDI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9IC8vIHN3aXRjaFxyXG5cdFx0cmV0dXJuIGN1cnJlbnRTdGF0dXM7XHJcblx0fVxyXG5cclxuXHQvLyBwdWJsaWMgbWV0aG9kIHRoYXQgcmV0dXJucyB0aGUgc2NyZWVuIHNpemVcclxuXHRnZXRTY3JlZW5TaXplKCl7XHJcblx0XHRyZXR1cm4gd2luU2l6ZTtcclxuXHR9XHJcblxyXG5cdC8qKiBOZXh0IFNsaWRlIE1ldGhvZFx0XHJcblx0ICogIFB1YmxpYyBNZXRob2QgdG8gYWR2YW5jZSB0byB0aGUgbmV4dCBzbGlkZS5cclxuXHQgKiBcdFRoaXMgbWV0aG9kIHNob3VsZCBhZHZhbmNlIHRoZSBzbGlkZXIgdG8gdGhlIG5leHQgc2xpZGUuXHRcclxuXHQgKiBcdFRoaXMgd2lsbCBiZSBhIG1peCBvZiB0aGUgaW50ZXJhY3Rpb24gc3RhcnQsIG1vdmUgYW5kIGVuZCBtZXRob2RzXHJcblx0ICogXHRvZiB0aGUgaW50ZXJhY3Rpb24gbW9kdWxlLlxyXG5cdCAqIFx0U3RvcCB0aGUgYW5pbWF0aW9uIGFuZCB0aW1lcnMuIFNldCB0aGUgZGlyZWN0aW9uIHRvIHRydWUuIFNldCB0aGVcclxuXHQgKiBcdHN0YXJ0IHN0cmlwZSBpbmRleCB0byAwLiBTZXQgdGhlIGJvb2xlYW5zIHRvIHByZXZlbnQgdXNlciBpbnRlcmFjdGlvblxyXG5cdCAqIFx0d2hpbGUgdGhlIGFuaW1hdGlvbiBpcyBoYXBwZW5pbmcuIENyZWF0ZSB0aGUgc3RyaXBlcywgdGhlIHJlZmVyZW5jZSBhcnJheXNcclxuXHQgKiBcdGJ1dCBub3QgdGhlIGFuaW1hdGlvbiBhcnJheXMsIGJlY2F1c2UgdGhlIGFuaW1hdGlvbiBpcyBzdGFnZ2VyZWQgZnJvbVxyXG5cdCAqIFx0dGhlIGZpcnN0IHN0cmlwZSBvZiB0aGUgY3VycmVudCBhbmQgbmV4dCBzbGlkZS5cclxuXHQqL1xyXG5cdG5leHRTbGlkZSgpe1xyXG5cdFx0Ly8gZXZlbiBpZiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgd2l0aCB0aW1lcnMgYW5kIG5vdCBieSB1c2VyIGludGVyYWN0aW9uXHJcblx0XHQvLyBldmVudHMsIHdlIGNyZWF0ZSBzb21lIGNvbmRpdGlvbmFsIGxvZ2ljIGluIG9yZGVyIHRvIHByZXZlbnQgaXQgZnJvbSBcclxuXHRcdC8vIGJlaW5nIGNhbGxlZCB1bnRpbCB0aGUgYW5pbWF0aW9ucyBhcmUgY29tcGxldGVkXHJcblx0XHRpZiAoICFfdXNlckludGVyYWN0aW9uICYmICFfc3RyaXBlc0FuaW1hdGluZyApIHtcclxuXHRcdFx0Ly8gcGF1c2UgYWxsIHRpbWVycyBhbmQgYW5pbWF0aW9uc1xyXG5cclxuXHRcdFx0Ly8gc2V0IHRoZSBpbnRlcmFjdGlvbiBib29scyB0byBwcmV2ZW50IGFueSB1c2VyIGludGVyYWN0aW9uXHJcblx0XHRcdC8vIHRvIHRyaWdnZXIgYW55IG1ldGhvZCB1bnRpbCB0aGUgc3RyaXBlcyBhbmltYXRpb24gaXMgY29tcGxldGUuXHJcblx0XHRcdF9zZXRJbnRlcmFjdGlvbkJvb2xzKHRydWUpO1xyXG5cclxuXHRcdFx0Ly8gc2V0IHRoZSBpbml0IGFycmF5cyB0byBlbXB0eSBvbmVzXHJcblx0XHRcdF9zZXRFbXB0eUFycmF5cygpO1xyXG5cclxuXHRcdFx0Ly8gY3JlYXRlIHRoZSByZWZlcmVuY2UgYXJyYXlzXHJcblx0XHRcdC8vIHNpbmNlIHdlJ3JlIGdvaWduIHRvIHRoZSBuZXh0IHNsaWRlIGNyZWF0ZSBvbmx5IHRoZSBjdXJyZW50IGFuZCBuZXh0XHJcblx0XHRcdF9jdXJyZW50SW5pdFN0cmlwZXMoKTtcclxuXHRcdFx0X25leHRJbml0U3RyaXBlcygpO1xyXG5cclxuXHJcblx0XHRcdFxyXG5cdFx0XHQvLyBJTiBWRVJTSU9OIDIuMi4zIFRIRSBBVVRPIFNUUklQRVMgQU5JTUFUSU9OXHJcblx0XHRcdC8vIFNUQVJUUyBGUk9NIFRIRSBNSURETEUgTk9UIFRIRSBGSVJTVCBTVFJJUEVcclxuXHRcdFx0Ly8gUlVOIFRIRSBNRVRIT0QgVE8gQ1JFQVRFIFRIRSBBTklNQVRJT04gU1RSSVBFUyBGUk9NIFxyXG5cdFx0XHQvLyBUSEUgTUlERExFIEFORCBVU0UgVEhPU0UgQVJSQVlTIFRPIEFOSU1BVEUgVEhFIFNUUklQRVNcclxuXHRcdFx0X2NyZWF0ZUFuaW1hdGlvbkFycmF5KF9zdHJpcGVzTWlkZGxlKTtcclxuXHJcblx0XHRcdFxyXG5cdFx0XHRcclxuXHRcdFx0Ly8gc2V0IHRoZSBtYWluIHNsaWRlIGFscGhhIHRvIDBcclxuXHRcdFx0X21haW5TbGlkZS5hbHBoYSA9IDA7XHJcblxyXG5cdFx0XHQvLyBjcmVhdGUgdGhlIHRpbWVsaW5lIHRvIHNsaWRlIHJlbW92ZSB0aGUgY3VycmVudCBzdHJpcGVzXHJcblx0XHRcdC8vIGFuZCBhbmltYXRlIGluIHRoZSBuZXh0IHN0cmlwZXNcclxuXHRcdFx0Y29uc3QgX3JlbW92ZVRpbWVsaW5lID0gbmV3IFRpbWVsaW5lTGl0ZSh7XHJcblx0XHRcdFx0cGF1c2VkOiB0cnVlLFxyXG5cdFx0XHRcdG9uQ29tcGxldGU6IF9yZXNldFVzZXJJbnRlcmFjdGlvbixcclxuXHRcdFx0XHRvbkNvbXBsZXRlUGFyYW1zOiBbdHJ1ZV1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBWRVJTSU9OIDIuMi4zIFVTRSBUSEUgQU5JTUFUSU9OIEFSUkFZUywgTk9UIFRIRSBSRUZFUkVOQ0UgQVJSQVlTXHJcblx0XHRcdF9yZW1vdmVUaW1lbGluZVxyXG5cdFx0XHRcdC5zdGFnZ2VyVG8oX2N1cnJlbnRTdHJpcGVzLCAwLjIsIHtcclxuXHRcdFx0XHRcdHg6IC13aW5TaXplLncsXHJcblx0XHRcdFx0XHRlYXNlOiBQb3dlcjIuZWFzZU91dFxyXG5cdFx0XHRcdH0sIDAuMDQpXHJcblx0XHRcdFx0LnN0YWdnZXJUbyhfbmV4dFN0cmlwZXMsIDAuMiwge1xyXG5cdFx0XHRcdFx0eDogMCwgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuXHRcdFx0XHR9LCAwLjA0LCAwKVxyXG5cdFx0XHRcdC5jYWxsKF9yZXNldFRleHREYXRhLCBbdHJ1ZV0sIG51bGwsIFwiLT0wLjFcIilcclxuXHRcdFx0XHQucGxheSgpO1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gc29sdmVzICM1NyBodHRwczovL2dpdGxhYi5jb20vcmhlcm5hbmRvZy9haW53LXBpeGktY29tcG9uZW50L2lzc3Vlcy81N1xyXG5cdFx0XHQvLyBwYXVzZSBhbGwgdGhlIHRleHQgZGVsYXllZCBjYWxsc1xyXG5cdFx0XHRpZiAoIF9wYXJHYXAgKSB7IF9wYXJHYXAucGF1c2UoKS5raWxsKCk7IH07XHJcblx0XHRcdGlmICggX2FkZFdvcmREZWxheWVkQ2FsbCApIHsgX2FkZFdvcmREZWxheWVkQ2FsbC5wYXVzZSgpLmtpbGwoKTsgfTtcclxuXHRcdH1cclxuXHR9IC8vIG5leHQgc2xpZGUgbWV0aG9kXHJcblxyXG5cdC8qKiBGYXN0IEZvcndhcmQgTWV0aG9kXHJcblx0ICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgZmFzdCBmb3J3YXJkIG9wdGlvbiBvZiB0aGUgdGV4dCBjb21wb25lbnQuXHJcblx0ICogQHBhcmFtIHtib29sZWFufSB2IHRoZSB2YWx1ZSBvZiB0aGUgZmFzdCBmb3J3YXJkIG9wdGlvblxyXG5cdCAqIEBwdWJsaWNcclxuXHQqL1xyXG5cdHNldEZhc3RGb3J3YXJkKHYpe1xyXG5cdFx0X3NldEZhc3RGb3J3YXJkKHYpO1xyXG5cdH1cclxuXHJcblx0LyoqIE1ldGhvZCB0byByZXNldCB0aGUgdGV4dCBjb21wb25lbnRcclxuXHQgKiBCYXNpY2FsbHkgc2V0IHRoZSB0ZXh0IGNvbXBvbmVudCB0byBhIHN0YXJ0LXVwIHN0YXRlLiBBbGwgZGF0YVxyXG5cdCAqIGlzIHJlc2V0IGFuZCBldmVyeSB0aW1lciBpcyBwYXVzZWQgYW5kIHRoZW4gc2V0IHRvIHVuZGVmaW5lZC5cclxuXHQgKiBAcHVibGljXHJcblx0Ki9cclxuXHRyZXNldFRleHRNb2R1bGUoKXtcclxuXHRcdF9yZXNldFRleHREYXRhKCk7XHJcblx0XHRpZiAoIF9wYXJHYXApIF9wYXJHYXAucGF1c2UoKTtcclxuXHRcdGlmICggX2FkZFdvcmREZWxheWVkQ2FsbCApIF9hZGRXb3JkRGVsYXllZENhbGwucGF1c2UoKTtcclxuXHRcdGlmICggX3RleHRDb21wbGV0ZVRpbWVyICkgX3RleHRDb21wbGV0ZVRpbWVyLnBhdXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKiogTWV0aG9kIHRvIHJlc3RhcnQgdGhlIHRleHQgY29tcG9uZW50XHJcblx0ICogQ3JlYXRlcyB0aGUgdGV4dCBvZiB0aGUgY3VycmVudCBzbGlkZSBpbmRleCBhbmQgc3RhcnRzIHRoZVxyXG5cdCAqIHRleHQgYW5pbWF0aW9uIGZyb20gdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGZpcnN0IHBhcmFncmFwaFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJvY2Vzc1RleHQgaWYgdGhlIHNsaWRlIHRleHQgaGFzIHRvIGJlIHByb2Nlc3NlZFxyXG5cdCAqIFx0XHRcdFx0YWdhaW4uIFRoaXMgaW4gY2FzZSB0aGF0IHRoZSBzbGlkZSBpbmRleCBpcyByZXNldCB0byAwIG9yIGFueVxyXG5cdCAqIFx0XHRcdFx0bnVtYmVyIGRpZmZlcmVudCB0aGFuIHRoZSBudW1iZXIgaXQgaGFkIHdoZW4gdGhlIHRleHQgY29tcG9uZW50XHJcblx0ICogXHRcdFx0XHR3YXMgcGF1c2VkLlxyXG5cdCAqIEBwdWJsaWNcclxuXHQqL1xyXG5cdHJlc3RhcnRUZXh0TW9kdWxlKHByb2Nlc3NUZXh0KXtcclxuXHRcdC8vIGlmIHRoZSBzbGlkZSBpbmRleCBoYXMgY2hhbmdlZFxyXG5cdFx0aWYgKCBwcm9jZXNzVGV4dCApIF9wcm9jZXNzU2xpZGVUZXh0KCk7XHJcblx0XHRfY3JlYXRlTmV3U2xpZGVUZXh0KCk7XHJcblx0fVxyXG5cclxuXHQvKiogTWV0aG9kIHRvIGludGVycnVwdCB0aGUgcHJvbXB0IGVsZW1lbnQuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgdGhlIGludGVycnVwdCB0ZXh0IHRvIGJlIHR5cGVkXHJcblx0ICogQHB1YmxpY1xyXG5cdCovXHJcblx0aW50ZXJydXB0UHJvbXB0KHRleHQpe1xyXG5cdFx0X2ludGVycnVwdFByb21wdCh0ZXh0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ldGhvZCB0byBjaGVjayBpZiB0aGUgYnVybnMgYW5pbWF0aW9uIGlzIGNvbXBsZXRlXHJcblx0ICogQHB1YmxpY1xyXG5cdCovXHJcblx0aXNCdXJuc0NvbXBsZXRlKCl7XHJcblx0XHRpZiAoIF9idXJuc0VmZmVjdCApIHJldHVybiBfYnVybnNFZmZlY3QucHJvZ3Jlc3MoKSA9PT0gMTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKiBUaGUgT24gTWV0aG9kLlx0XHJcblx0ICogIFVzZWQgdG8gYXR0YWNoIGEgY2FsbGJhY2sgdG8gYSBzcGVjaWZpYyBldmVudCB0eXBlLCB0aGF0J3MgZW1pdHRlZFxyXG5cdCAqIFx0aW4gZGlmZmVyZW50IHBhcnRzIG9mIHRoZSBhcHAuXHJcblx0ICogXHRAcGFyYW0ge3N0cmluZ30gdDogdGhlIGV2ZW50IHR5cGVcclxuXHQgKiBcdEBwYXJhbSB7ZnVuY3Rpb259IGM6IHRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCBieSB0aGUgZW1pdHRlclxyXG5cdCovXHJcblx0b24odCwgYykge1xyXG5cdFx0Ly8gY2hlY2sgaWYgdGhlIGV2ZW50IHR5cGUgaGFzIGJlZW4gcmVnaXN0ZXJlZCBvciBub3RcclxuXHRcdGlmIChfZXZlbnRzT2JqZWN0W3RdID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIGMgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRfZXZlbnRzT2JqZWN0W3RdID0gYztcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RyZWFtbW1TbGlkZXI7IiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBJTklUSUFMSVpBVElPTiBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG4vKiAgVGhpcyBtb2R1bGUgaW5pdGlhbGl6ZXMgdGhlIGFwcGxpY2F0aW9uLlxyXG4gKiAgQ3JlYXRlcyB0aGUgcGl4aSBpbnN0YW5jZSBhbmQgYWRkcyBpdCB0byB0aGUgRE9NXHJcbiAqIFx0QWRkcyB0aGUgcHVibGljIG1ldGhvZHMgdG8gdGhlIGdsb2JhbCB3aW5kb3cgb2JqZWN0XHJcbiAqL1xyXG5cclxuLyogSU1QT1JUUyAqL1xyXG4vLyBjcmVhdGUgcGl4aSBpbnN0YW5jZVxyXG5pbXBvcnQgeyBjcmVhdGVSZW5kZXJlciB9IGZyb20gXCIuL3BpeGktbW9kdWxlLmpzXCI7XHJcbi8vIG1ha2UgYWpheCByZXF1ZXN0XHJcbi8vIGltcG9ydCB0aGUgYWpheCByZXNwb25zZSBtZXRob2QgZm9yIHVzZSB3aXRoIHRoZSBnbG9iYWwgcHVibGljIG1ldGhvZHNcclxuLy8gZm9yIHRoZSByZWFjdCBhcHAgdXNlIHRoZSBtYWtlIHJlcXVlc3QgbWV0aG9kXHJcbmltcG9ydCB7IF9tYWtlUmVxdWVzdCB9IGZyb20gXCIuL2FqYXgtbW9kdWxlLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgX2luaXRTdHJlYW1tbSA9ICgpID0+IHtcclxuXHQvLyBjcmVhdGUgdGhlIG1haW4gcmVuZGVyXHJcblx0Y3JlYXRlUmVuZGVyZXIoKTtcclxuXHQvLyBpbiB0aGUgcmVhY3QgYXBwIG1ha2UgYWpheCByZXF1ZXN0IGFuZCBoYW5kbGUgdGhlIHJlc3BvbnNlIHRoZXJlXHJcblx0X21ha2VSZXF1ZXN0KCk7XHJcbn07XHJcbiIsIi8qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgSU5URVJBQ1RJT05TIE1PRFVMRVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcbi8vIGdldCB0aGUgcmVuZGVyZXIgdG8gYXR0YWNoIHRoZSBoYW5kbGVycyB0byB0aGUgc3RhZ2VcclxuLy8gZ2V0IHRoZSBsb2FkaW5nIGJhc2UgdGV4dHVyZVxyXG4vLyBpbXBvcnQgeyBfYmFzZVNwcml0ZVRleHR1cmUgfSBmcm9tIFwiLi9waXhpLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgc2NyZWVuIGRpbWVuc2lvbnNcclxuaW1wb3J0IHsgd2luU2l6ZSwgX3N0cmlwZUhlaWdodCB9IGZyb20gXCIuL3dpbmRvd1wiO1xyXG4vLyBnZXQgdGhlIHNsaWRlcyBhbW91bnRcclxuaW1wb3J0IHsgX3NsaWRlc0Ftb3VudCB9IGZyb20gXCIuL2FqYXgtbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgaW5pdCBib29sZWFuXHJcbmltcG9ydCB7IF9hcHBJbml0aWFsaXplZCwgX3VwZGF0ZU1haW5TbGlkZVRleHR1cmUsIF9tYWluU2xpZGUgfSBmcm9tIFwiLi9zbGlkZS1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSBjdXJyZW50IHNsaWRlIGluZGV4XHJcbmltcG9ydCB7IF9jdXJyZW50U2xpZGVJbmRleCwgX3VwZGF0ZUluZGV4LCBfZmlyc3RTbGlkZUdyb3VwIH0gZnJvbSBcIi4vc2xpZGUtY2hhbmdlLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIG1ldGhvZHMgdG8gY3JlYXRlIHRoZSBzdHJpcGVzXHJcbmltcG9ydCB7XHJcblx0X2NyZWF0ZVJlZkFycmF5cywgX3N0cmlwZXNBbW91bnQsIF9uZXh0U3RyaXBlcywgX25leHRJbml0QXJyYXksIF9jdXJyZW50U3RyaXBlcywgX2N1cnJlbnRJbml0QXJyYXksXHJcblx0X3ByZXZpb3VzU3RyaXBlcywgX3ByZXZpb3VzSW5pdEFycmF5LCBfcmVzZXRTdHJpcGVzQXJyYXlzLCBfY3VycmVudEhhc1Nwcml0ZXMsXHJcblx0X3ByZXZpb3VzSGFzU3ByaXRlcywgX25leHRIYXNTcHJpdGVzLCBfY3JlYXRlQW5pbWF0aW9uQXJyYXksIF9zdGFydFN0cmlwZUluZGV4XHJcbn0gZnJvbSBcIi4vc3RyaXBlcy1tb2R1bGUuanNcIjtcclxuaW1wb3J0IHsgX3Jlc2V0R3JhcGhpY1N0cmlwZXNCb29sIH0gZnJvbSBcIi4vc3RyaXBlc1wiO1xyXG4vLyBnZXQgdGhlIHB1YmxpYyBldmVudCBsaXN0ZW5lcnNcclxuaW1wb3J0IHsgX2V2ZW50RW1pdHRlciB9IGZyb20gXCIuL2dsb2JhbC1jbGFzcy1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSB0ZXh0dXJlcyBhcnJheVxyXG5pbXBvcnQgeyBfdGV4dHVyZXNBcnJheSB9IGZyb20gXCIuL3RleHR1cmVzLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIHBhdXNlIG1ldGhvZCwgcmVzdW1lIG1ldGhvZFxyXG5pbXBvcnQgeyBfcmVzdW1lQnVybnNJbnN0YW5jZXMsIF9wYXVzZUJ1cm5zRWZmZWN0IH0gZnJvbSBcIi4vYW5pbWF0aW9uXCI7XHJcbi8vIGdldCB0aGUgZG91YmxlIHRhcCBldmVudFxyXG5pbXBvcnQgeyBfZG91YmxlVGFwIH0gZnJvbSBcIi4vaW50ZXJhY3Rpb25cIjtcclxuLy8gZ2V0IHRoZSB0b3VjaCBldmVudHMgZnJvbSB0aGUgdGV4dCBtb2R1bGVcclxuaW1wb3J0IHsgX3RleHRUb3VjaFN0YXJ0LCBfdGV4dFRvdWNoTW92ZSwgX3RleHRUb3VjaEVuZCwgX3BhckdhcCwgX2FkZFdvcmREZWxheWVkQ2FsbCwgX3Jlc2V0VGV4dERhdGEsIF9zZXRVc2VySW50ZXJhY3Rpb24gfSBmcm9tIFwiLi90ZXh0LW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIHRleHQgc3RhZ2VcclxuaW1wb3J0IHsgX3RleHRTdGFnZSB9IGZyb20gXCIuL3BpeGktbW9kdWxlXCI7XHJcblxyXG4vLyB1c2VyIGludGVyYWN0aW9uIGJvb2xcclxuZXhwb3J0IGxldCBfdXNlckludGVyYWN0aW9uID0gZmFsc2U7XHJcbi8vIHN0cmlwZXMgYW5pbWF0aW9uIGJvb2wuIGRlZmF1bHQgZmFsc2VcclxuLy8gdGhpcyBpcyB1c2VkIHRvIHByZXZlbnQgYW55IGludGVyYWN0aW9uIHdoaWxlIHRoZSBzdHJpcGVzIGFyZSBhbmltYXRpbmdcclxuZXhwb3J0IGxldCBfc3RyaXBlc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4vLyBkcmFnIHRocmVzaG9sZFxyXG5jb25zdCBfbWluRHJhZyA9IDgwO1xyXG4vLyBkcmFnIGRpcmVjdGlvbiwgYnkgZGVmYXVsdCB0cnVlIChmb3J3YXJkIC8gbmV4dCBzbGlkZSlcclxuZXhwb3J0IGxldCBfZGlyZWN0aW9uID0gdHJ1ZTtcclxuLy8gdGhlIGluaXRpYWwgcG9pbnRlciBwb3NpdGlvbiBvbiB0aGUgWCBheGlzXHJcbi8vIHRoaXMgaXMgZm9yIHNldHRpbmcgdGhlIGRyYWcgZGlyZWN0aW9uXHJcbmV4cG9ydCBsZXQgX2ludGVyYWN0aW9uU3RhcnRYO1xyXG4vLyB0aGUgWCB2YWx1ZSBvZiB0aGUgcG9pbnRlciBldmVudCBvbiBlYWNoIG1vdmUgZXZlbnQgaGFuZGxlclxyXG5sZXQgX2N1cnJlbnRJbnRlcmFjdGlvblg7XHJcbi8vIHRoZSBpbml0aWFsIHBvaW50ZXIgcG9zaXRpb24gb24gdGhlIFkgYXhpc1xyXG4vLyB0aGlzIGlzIHRvIHNldCB0aGUgbGVhZGluZyBzdHJpcGVcclxuZXhwb3J0IGxldCBfaW50ZXJhY3Rpb25TdGFydFk7XHJcbi8vIHRoZSBjdXJyZW50IHN0YXJ0IGluZGV4IG9mIHRoZSBhbmltYXRpb25zIGFycmF5cyBhY2NvcmRpbmcgdG8gdGhlIFkgdmFsdWUgb2ZcclxuLy8gdGhlIHBvaW50ZXIgZXZlbnRcclxubGV0IF9jdXJyZW50U3RhcnRJbmRleDtcclxuLy8gZHJhZyBhbW91bnQgZm9yIHRoZSBjdXJyZW50L3ByZXZpb3VzIHNsaWRlXHJcbi8vIHRoaXMgc2hvdWxkIGJlIGFuIGFic29sdXRlIHZhbHVlLCBiZWNhdXNlIHdlIG5lZWQgdG8ga25vdyBpZiB0aGUgZHJhZyBpcyBiaWdnZXJcclxuLy8gdGhhbiB0aGUgdGhyZXNob2xkIHJlZ2FyZGxlc3Mgb2YgdGhlIGRpcmVjdGlvblxyXG5leHBvcnQgbGV0IF9kcmFnQW1vdW50ID0gMDtcclxuXHJcblxyXG4vLyB2YXIgdG8ga2VlcCB0cmFjayBvZiB0aGUgYW1vdW50IG9mIHRvdWNoIGV2ZW50c1xyXG4vLyBoZWxwcyB0byBjaGVjayBpZiB0aGVyZSBhcmUgbXVsdGl0b3VjaCBldmVudHMgb24gdGhlIHNjcmVlblxyXG5sZXQgX3RvdWNoQW1vdW50ID0gMDtcclxuXHJcblxyXG4vKiogTWV0aG9kIHRvIHNldCB0aGUgdXNlciBpbnRlcmFjdGlvbiBhbmQgdGhlIHN0cmlwZXMgYW5pbWF0aW9uXHRcclxuICogXHRib29sZWFucyBiYWNrIHRvIGZhbHNlLiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHN0cmlwZXNcclxuICogXHRhbmltYXRpb24gaXMgY29tcGxldGUuXHRcclxuICogXHRXaGVuIHRoZSB1c2VyIGdvZXMgdG8gYSBwcmV2aW91cyBzbGlkZSwgdGhlIG1haW4gc2xpZGUgdGV4dHVyZSBzaG91bGQgYmVcclxuICogXHR1cGRhdGVkIHRvIHRoZSBwcmV2aW91cyB0ZXh0dXJlLiBXaGVuIHRoZSBpbnRlcmFjdGlvbiBzdGFydHMsIHRoZSBtYWluXHJcbiAqIFx0c2xpZGUgdGV4dHVyZSBpcyBzZXQgdG8gdGhlIG5leHQgdGV4dHVyZS4gSW4gdGhpcyBjYXNlIGJlZm9yZSByZW1vdmluZyB0aGVcclxuICogXHRwcmV2aW91cyBzdHJpcGVzIChtb3ZlIHRoZW0gdG8gdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiBubyBuZWVkIHRvIHVwZGF0ZVxyXG4gKiBcdHRoZSBhbHBoYSB2YWx1ZSBzaW5jZSB0aGUgc3RyaXBlcyB3b24ndCBiZSB2aXNpYmxlKSwgdGhlIG1haW4gc2xpZGUgXHJcbiAqIFx0c2hvdWxkIGJlIHVwZGF0ZWQgdG8gdGhlIHByZXZpb3VzIHRleHR1cmUgKGJlZm9yZSB1cGRhdGluZyB0aGUgY3VycmVudFxyXG4gKiBcdHNsaWRlIGluZGV4KS5cdFxyXG4gKiBcdElmIHRoZSBtaW4gZHJhZyBpcyBub3QgcGFzc2VkLCBiZWZvcmUgaGlkaW5nIHRoZSBjdXJyZW50IHN0cmlwZXMgd2UgbmVlZFxyXG4gKiBcdHVwZGF0ZSB0aGUgbWFpbiBzbGlkZSB0ZXh0dXJlIHRvIHRoZSBvbmUgaW4gdGhlIGN1cnJlbnQgaW5kZXggcG9zaXRpb24gb25cclxuICogXHR0aGUgdGV4dHVyZXMgYXJyYXkuXHRcclxuICogXHRAcGFyYW0ge2Jvb2xlYW59IG06IGlzIHRoZSBkaXN0YW5jZSB2YWx1ZSBiaWdnZXIgdGhhbiB0aGUgbWluIGRyYWcgdmFsdWVcclxuICogXHRAcGFyYW0ge29iamVjdH0gdDogdGhlIHRpbWVsaW5lIGluc3RhbmNlIGludm9raW5nIHRoZSBjYWxsYmFja1xyXG4qL1xyXG5leHBvcnQgY29uc3QgX3Jlc2V0VXNlckludGVyYWN0aW9uID0gKG0pID0+IHtcclxuXHQvKlx0Y2hlY2sgaWYgdGhlIG1pbiBkcmFnIGlzIHBhc3NlZFxyXG5cdCAqXHRpZiB0aGUgbWluIGRyYWcgaXMgbm90IHBhc3NlZCwgd2UgZG9uJ3QgdXBkYXRlIHRoZSBtYWluIHNsaWRlJ3MgdGV4dHVyZVxyXG5cdCAqXHRpbiB0aGF0IGNhc2UgdGhlIGN1cnJlbnQgc3RyaXBlcyB3aWxsIGJlIGFuaW1hdGVkIGJhY2sgdG8gMCBhbmQgYWZ0ZXIgdGhlXHJcblx0ICpcdGFuaW1hdGlvbiBpcyBjb21wbGV0ZSB3ZSByZW1vdmUgdGhlbSwgc28gdGhlIG1haW4gc2xpZGUgd2lsbCBiZSB2aXNpYmxlXHJcblx0ICpcdHdpdGggdGhlIHBvc2l0aW9uIGl0IGhhZCBiZWZvcmUgdGhlIGludGVyYWN0aW9uIHN0YXJ0ZWQuXHJcblx0ICovXHJcblx0aWYgKCBtICkge1xyXG5cdFx0Ly8gdGhlIG1pbiBkcmFnIGRpc3RhbmNlIGlzIHBhc3NlZFxyXG5cdFx0LyogY2hlY2sgaWYgdGhlIHVzZXIgZHJhZ2dlZCB0byB0aGUgcHJldmlvdXMgc2xpZGUsIGluIHRoYXQgY2FzZSB3ZSBuZWVkXHJcblx0XHQgKiB0byB1cGRhdGUgdGhlIG1haW4gc2xpZGUncyB0ZXh0dXJlIHdpdGggdGhlIHByZXZpb3VzIHRleHR1cmUsIG9ubHkgaWZcclxuXHRcdCAqIHRoZSBjdXJyZW50IHNsaWRlIGlzIG5vdCB0aGUgZmlyc3QgKHNsaWRlIGluZGV4IGlzIG5vdCAwKVxyXG5cdFx0Ki9cclxuXHRcdGlmICggIV9kaXJlY3Rpb24gJiYgX2N1cnJlbnRTbGlkZUluZGV4ICE9PSAwICkge1xyXG5cdFx0XHQvKiBzZXQgdGhlIGJhc2UgdGV4dHVyZSBmb3IgdGhlIHVwZGF0ZSBtYWluIHNsaWRlIHRleHR1cmUgbWV0aG9kXHJcblx0XHRcdCAqIHRoZSB1c2VyIGlzIGdvaW5nIGJhY2suIElmIHRoaXMgaXMgdGhlIGZpcnN0IHNsaWRlIG9mIHRoZSBncm91cFxyXG5cdFx0XHQgKiB0aGUgbWFpbiBzbGlkZSB0ZXh0dXJlIGlzIG5vdCB1cGRhdGVkICBhbmQgcmVtYWlucyBoaWRkZW4sIHVudGlsXHJcblx0XHRcdCAqIHRoZSBuZXh0IGdyb3VwIGlzIHJlYWR5IGFuZCB0aGUgbWFpbiBzbGlkZSBpcyB1cGRhdGVkIGFnYWluLlxyXG5cdFx0XHQqL1xyXG5cdFx0XHRfdXBkYXRlTWFpblNsaWRlVGV4dHVyZSggX3RleHR1cmVzQXJyYXlbX2N1cnJlbnRTbGlkZUluZGV4IC0gMV0gKTtcclxuXHRcdFx0Ly8gX3RhcmdldFRleHR1cmUgPSBfY3VycmVudFNsaWRlSW5kZXggPT09IDAgPyBfYmFzZVNwcml0ZVRleHR1cmUgOiBfdGV4dHVyZXNBcnJheVtfY3VycmVudFNsaWRlSW5kZXggLSAxXTtcclxuXHRcdH0gZWxzZSBpZiAoIF9kaXJlY3Rpb24gJiYgX2N1cnJlbnRTbGlkZUluZGV4IDwgX3NsaWRlc0Ftb3VudCApIHtcclxuXHRcdFx0LyogdGhlIHVzZXIgaXMgZ29pbmcgZm9yd2FyZCwgY2hlY2sgaWYgdGhpcyBpcyB0aGUgbGFzdCBzbGlkZSBvbiB0aGUgZ3JvdXAuXHJcblx0XHRcdCAqIElmIHRoaXMgaXMgdGhlIGxhc3Qgc2xpZGUsIHdlIGRvbid0IHVwZGF0ZSB0aGUgdGV4dHVyZVxyXG5cdFx0XHQqL1xyXG5cdFx0XHRfdXBkYXRlTWFpblNsaWRlVGV4dHVyZSggX3RleHR1cmVzQXJyYXlbKF9jdXJyZW50U2xpZGVJbmRleCArIDEpXSApO1xyXG5cdFx0fSAvLyBkaXJlY3Rpb24gY29uZGl0aW9uYWxcclxuXHRcdC8vIHVwZGF0ZSB0aGUgc2xpZGUgaW5kZXggdmFsdWVcclxuXHRcdF91cGRhdGVJbmRleCgpO1xyXG5cdFx0Ly8gZW1pdHQgdGhlIHNsaWRlIGNoYW5nZSBjYWxsYmFja1xyXG5cdFx0X2V2ZW50RW1pdHRlcihcInNsaWRlY2hhbmdlXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRfcmVzZXRHcmFwaGljU3RyaXBlc0Jvb2woKTtcclxuXHRcdC8vIGlmIHRoZSBtaW4gZHJhZyBpcyBub3QgcGFzc2VkIHNldCB0aGUgbWFpbiBzbGlkZSBhbHBoYSB0byAxLlxyXG5cdFx0Ly8gSW4gdGhpcyBjYXNlIHRoZSBjdXJyZW50IHN0cmlwZXMgZ28gYmFjayB0byAwIGFuZCB0aGUgbWFpbiBzbGlkZVxyXG5cdFx0Ly8gc3RheXMgaW4gdGhlIHBvc2l0aW9uIGl0IGhhZCB3aGVuIHRoZSBpbnRlcmFjdGlvbiBzdGFydGVkLCBzbyB0aGVyZSdzXHJcblx0XHQvLyBubyBuZWVkIHRvIGNoYW5nZSBhbnl0aGluZy5cclxuXHRcdF9tYWluU2xpZGUuYWxwaGEgPSAxO1xyXG5cdFx0Ly8gY29uc29sZS5sb2coIFwic2hvdyBtYWluIHNsaWRlIHJlc2V0IGludGVyYWN0aW9uIGZhbHNlXCIgKTtcclxuXHJcblx0XHQvLyB0aGUgbWluIGRyYWcgd2Fzbid0IHBhc3NlZCwgc28gd2UgcmVzdW1lIHRoZSBidXJucyBhbmltYXRpb24vdGltZXJcclxuXHRcdC8vIHBhc3MgZmFsc2UsIG1lYW5pbmcgdGhlIG1ldGhvZCB3aWxsIGNoZWNrIHRoZSBhY3RpdmUgaW5zdGFuY2Ugd2hlbiB0aGVcclxuXHRcdC8vIGludGVyYWN0aW9uIHN0YXJ0ZWQuXHJcblx0XHRfcmVzdW1lQnVybnNJbnN0YW5jZXMoZmFsc2UpO1xyXG5cdH0gLy8gbWluIGRyYWcgY29uZGl0aW9uYWxcclxuXHQvLyByZXNldCB0aGUgc3RyaXBlcyBwb3NpdGlvbiBhbmQgb3BhY2l0eSBhbmQgdGhlbiByZW1vdmUgdGhlbSBmcm9tIG1lbW9yeVxyXG5cdGZvciggbGV0IGkgPSAwOyBpIDwgX3N0cmlwZXNBbW91bnQ7IGkrKyApe1xyXG5cdFx0Y29uc3QgX2hhc0N1cnJlbnQgPSBfY3VycmVudEluaXRBcnJheSA/IF9jdXJyZW50SW5pdEFycmF5W2ldIDogbnVsbDtcclxuXHRcdGNvbnN0IF9oYXNQcmV2aW91cyA9IF9wcmV2aW91c0luaXRBcnJheSA/IF9wcmV2aW91c0luaXRBcnJheVtpXSA6IG51bGw7XHJcblx0XHRjb25zdCBfaGFzTmV4dCA9IF9uZXh0SW5pdEFycmF5ID8gX25leHRJbml0QXJyYXlbaV0gOiBudWxsO1xyXG5cclxuXHRcdGlmKCBfaGFzQ3VycmVudCApe1xyXG5cdFx0XHRUd2VlbkxpdGUua2lsbFR3ZWVuc09mKF9oYXNDdXJyZW50KTtcclxuXHRcdFx0X2hhc0N1cnJlbnQueCA9IDA7XHJcblx0XHRcdF9oYXNDdXJyZW50LmFscGhhID0gMDtcclxuXHRcdFx0X2hhc0N1cnJlbnQuZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKF9oYXNQcmV2aW91cykge1xyXG5cdFx0XHRUd2VlbkxpdGUua2lsbFR3ZWVuc09mKF9oYXNQcmV2aW91cyk7XHJcblx0XHRcdF9oYXNQcmV2aW91cy54ID0gMDtcclxuXHRcdFx0X2hhc1ByZXZpb3VzLmFscGhhID0gMDtcclxuXHRcdFx0X2hhc1ByZXZpb3VzLmRlc3Ryb3koKTtcclxuXHRcdH1cclxuXHRcdGlmIChfaGFzTmV4dCkge1xyXG5cdFx0XHRUd2VlbkxpdGUua2lsbFR3ZWVuc09mKF9oYXNOZXh0KTtcclxuXHRcdFx0X2hhc05leHQueCA9IDA7XHJcblx0XHRcdF9oYXNOZXh0LmFscGhhID0gMDtcclxuXHRcdFx0X2hhc05leHQuZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cdH0gXHJcblx0Ly8gcmVzZXQgdGhlIGRyYWcvYW5pbWF0aW9uIGFycmF5c1xyXG5cdF9yZXNldFN0cmlwZXNBcnJheXMoKTtcclxuXHQvLyBpbiBjYXNlIG9mIGdvaW5nIHRvIGEgcHJldmlvdXMgc2xpZGUsIHJlc2V0IHRoZSBkZWFmdWx0XHJcblx0Ly8gZm9yd2FyZCBkaXJlY3Rpb24gaW4gcm9kZXIgdG8gYWxsb3cgdGhlIGF1dG9tYXRpYyBzbGlkZSBjaGFuZ2VcclxuXHRfZGlyZWN0aW9uID0gdHJ1ZTtcclxuXHQvLyByZXNldCB0aGUgZHJhZyBhbW91bnQgdG8gMC4gdGhpcyBiZWNhdXNlIGluIGNhc2UgdGhlIHVzZXIgdG91Y2hlc1xyXG5cdC8vIGFuZCBsZWF2ZXMgd2l0aG91dCBtb3ZpbmcgdGhlIHBvaW50ZXIsIHRoZSBkcmFnIGFtb3VudCB3aWxsIGJlIHRoZVxyXG5cdC8vIHNhbWUgYXMgdGhlIHByZXZpb3VzIGludGVyYWN0aW9uIGFuZCBjb3VsZCB0cmlnZ2VyIGEgc2xpZGUgY2hhbmdlXHJcblx0X2RyYWdBbW91bnQgPSAwO1xyXG5cdC8vIHNldCB0aGUgaW50ZXJhY3Rpb24gc3RhcnQgWSB2YWx1ZSB0byAwLCBpbiBjYXNlIHRoZSBuZXh0IHNsaWRlIFxyXG5cdC8vIGlzIGFuaW1hdGVkIGF1dG9tYXRpY2FsbHkuIExpa2UgdGhhdCB0aGUgc3RhZ2dlciBlZmZlY3Qgc3RhcnRzIHdpdGhcclxuXHQvLyB0aGUgZmlyc3Qgc3RyaXBlIG9uIHRoZSB0b3AuXHJcblx0X2ludGVyYWN0aW9uU3RhcnRZID0gMDtcclxuXHJcblx0Ly8gcmVzZXQgdGhlIHN0cmlwZXMgYW5pbWF0aW9uIGJvb2wgdG8gYWxsb3cgdXNlciBpbnRlcmFjdGlvblxyXG5cdF9zdHJpcGVzQW5pbWF0aW5nID0gZmFsc2U7XHJcblx0X3VzZXJJbnRlcmFjdGlvbiA9IGZhbHNlO1xyXG5cdC8vIGNvbnNvbGUubG9nKCBgc2xpZGVyIHJlYWR5IGZvciBpbnRlcmFjdGlvbi4gbWFpbiBzbGlkZSA9PiAke19tYWluU2xpZGUuYWxwaGF9YCApO1xyXG59OyAvLyByZXNldCB1c2VyIGludGVyYWN0aW9uXHJcblxyXG4vLyBtZXRob2QgdG8gZ2V0IHRoZSBhbW91bnQgb2Ygc3RyaXBlcyBpbiB0aGUgYW5pbWF0aW9uIGFycmF5c1xyXG5jb25zdCBfZ2V0QW5pbWF0aW9uU3RyaXBlcyA9ICgpID0+IHtcclxuXHRpZiggX2N1cnJlbnRIYXNTcHJpdGVzICkge1xyXG5cdFx0cmV0dXJuIF9jdXJyZW50U3RyaXBlcy5sZW5ndGg7XHJcblx0fVxyXG5cdGlmKCBfcHJldmlvdXNIYXNTcHJpdGVzICkge1xyXG5cdFx0cmV0dXJuIF9wcmV2aW91c1N0cmlwZXMubGVuZ3RoO1xyXG5cdH1cclxuXHRpZiggX25leHRIYXNTcHJpdGVzICkge1xyXG5cdFx0cmV0dXJuIF9uZXh0U3RyaXBlcy5sZW5ndGg7XHJcblx0fVxyXG59O1xyXG5cclxuLyoqIE1FVEhPRCBUTyBEUkFHIFNUUklQRVNcdFxyXG4gKiAgVGhpcyBtZXRob2QgY2hlY2tzIHRoZSBkcmFnZ2VkIGRpc3RhbmNlIGFuZCBzZXRzIHRoZSBhcnJheSBlbGVtZW50c1xyXG4gKiBcdGFuZCB0aGUgaW5kZXggb2YgdGhlIGRyYWcgYXJyYXlzIHRoYXQgc2hvdWxkIGJlIG1vdmVkLlx0XHJcbiAqIFx0Q2hlY2sgdGhlIGN1cnJlbnQgZHJhZyBkaXN0YW5jZSwgY29tcGFyZSBpdCB3aXRoIHRoZSBtaW4gZHJhZyBkaXN0YW5jZSBhbmRcclxuICogXHRzZXQgdGhlIGxhc3QgZHJhZyBpbmRleC4gVGhpcyBwb2ludHMgdG8gdGhlIGxhc3QgZWxlbWVudCB0aGF0IHNob3VsZCBiZSBtb3ZlZFxyXG4gKiBcdHdoZW4gdGhlIHVzZXIgZHJhZ3MuXHJcbiovXHJcbmNvbnN0IF9zZXREcmFnSW5kZXggPSAoKSA9PiB7XHJcblx0Ly8gc2V0IHRoZSBpbmRleFxyXG5cdGNvbnN0IF9hbmltYXRpb25TdHJpcGVzQW1vdW50ID0gX2dldEFuaW1hdGlvblN0cmlwZXMoKTtcclxuXHQvLyB0aGUgZWxlbWVudCBleGlzdHMgaW4gdGhlIGFycmF5cywgc28gd2UgbG9vcCBmcm9tIHRoZSBmaXJzdCBlbGVtZW50IHRvIHRoaXMgXHJcblx0Ly8gYW5kIHNldCB0aGUgcG9zaXRpb24gZm9yIGVhY2ggb25lLiBUaGUgcG9zaXRpb24gaXMgdGhlIHRvdGFsIGRyYWcgYW1vdW50XHJcblx0Ly8gbWludXMgdGhlIG1pbiBkcmFnIHZhbHVlIG11bHRpcGxpZWQgYnkgdGhlIGRyYWcgaW5kZXggb2YgdGhlIGN1cnJlbnQgbG9vcFxyXG5cdGNvbnN0IF90YXJnZXRQb3MgPSB3aW5TaXplLnc7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBfYW5pbWF0aW9uU3RyaXBlc0Ftb3VudDsgaSsrICl7XHJcblx0XHRjb25zdCBfcHJlRGlzdGFuY2UgPSAoIF9kcmFnQW1vdW50IC0gKCAoIF9taW5EcmFnIC0gKDEuNzUgKiBpKSApICogaSApICk7XHJcblx0XHQvLyB0aGUgZGlzdGFuY2UgdG8gYW5pbWF0ZSB0aGUgc3RyaXBlc1xyXG5cdFx0Y29uc3QgX2RyYWdEaXN0YW5jZSA9IF9wcmVEaXN0YW5jZSA8IDAgPyAwIDogX3ByZURpc3RhbmNlO1xyXG5cdFx0Ly8gc2V0IHRoZSBkaXN0YW5jZSB0byBlYWNoIHN0cmlwZSBkZXBlbmRpbmcgb24gdGhlIGRpcmVjdGlvblxyXG5cdFx0Y29uc3QgX2N1cnJlbnRNb3ZlID0gX2RpcmVjdGlvbiA/IC1fZHJhZ0Rpc3RhbmNlIDogX2RyYWdEaXN0YW5jZTtcclxuXHRcdGNvbnN0IF9wcmV2aW91c01vdmUgPSBfZGlyZWN0aW9uID8gLV90YXJnZXRQb3MgOiAoIC1fdGFyZ2V0UG9zICsgX2RyYWdEaXN0YW5jZSApO1xyXG5cdFx0Y29uc3QgX25leHRNb3ZlID0gX2RpcmVjdGlvbiA/ICggX3RhcmdldFBvcyAtIF9kcmFnRGlzdGFuY2UgKSA6IF90YXJnZXRQb3M7XHJcblx0XHQvLyBjcmVhdGUgdGhlIGFuaW1hdGlvblxyXG5cdFx0Ly8gY2hlY2sgaWYgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIGFycmF5IGhhcyBzdHJpcGVzXHJcblx0XHRfY3VycmVudFN0cmlwZXNbaV0gPyBUd2VlbkxpdGUudG8oIF9jdXJyZW50U3RyaXBlc1tpXSwgMS4xLCB7XHJcblx0XHRcdHg6IF9jdXJyZW50TW92ZSwgZWFzZTogRWxhc3RpYy5lYXNlT3V0LCBmb3JjZTNEOnRydWVcclxuXHRcdH0gKSA6IG51bGw7XHJcblx0XHRfcHJldmlvdXNTdHJpcGVzW2ldID8gVHdlZW5MaXRlLnRvKF9wcmV2aW91c1N0cmlwZXNbaV0sIDEuMSwge1xyXG5cdFx0XHR4OiBfcHJldmlvdXNNb3ZlLCBlYXNlOiBFbGFzdGljLmVhc2VPdXQsIGZvcmNlM0Q6dHJ1ZVxyXG5cdFx0fSkgOiBudWxsO1xyXG5cdFx0X25leHRTdHJpcGVzW2ldID8gVHdlZW5MaXRlLnRvKF9uZXh0U3RyaXBlc1tpXSwgMS4xLCB7XHJcblx0XHRcdHg6IF9uZXh0TW92ZSwgZWFzZTogRWxhc3RpYy5lYXNlT3V0LCBmb3JjZTNEOnRydWVcclxuXHRcdH0pIDogbnVsbDtcclxuXHR9Ly8gbG9vcFxyXG59OyAvLyBzZXQgZHJhZyBpbmRleFxyXG5cclxuLyoqIEludGVyYWN0aW9uIFN0YXJ0IE1ldGhvZFx0XHJcbiAqICBHZXRzIHRoZSBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXHJcbiAqIFx0UGF1c2VzIGFsbCBhbmltYXRpb25zIGFuZCB0aW1lcnMuXHJcbiAqIFx0QHBhcmFtIHtvYmplY3R9IGU6IHRoZSBwb2ludGVyIGV2ZW50IG9iamVjdFxyXG4qL1xyXG5jb25zdCBfaW50ZXJhY3Rpb25TdGFydCA9IGUgPT4ge1xyXG5cdC8vIGluY3JlYXNlIHRoZSB0b3VjaCBldmVudHMgYW1vdW50XHJcblx0X3RvdWNoQW1vdW50Kys7XHJcblx0LyogdGhlIGFtb3VudCBvZiB0b3VjaCBldmVudHMgaXMgbW9yZSB0aGFuIDEsIGNhbGwgdGhlIGludGVyYWN0aW9uXHJcblx0ICogZW5kIG1ldGhvZCB0byByZXNldCBldmVyeXRoaW5nIGFuZCBjYW5jZWwgYW55IHRvdWNoIGV2ZW50LlxyXG5cdCovXHJcblx0aWYgKCBfdG91Y2hBbW91bnQgPiAxICkge1xyXG5cdFx0Ly8gc2V0IHRoZSBkcmFnIGFtb3VudCB0byAwIGluIG9yZGVyIHRvIHJlc2V0IHRoZSBkcmFnIFxyXG5cdFx0Ly8gYW5kIHRvdWNoIGV2ZW50c1xyXG5cdFx0X2RyYWdBbW91bnQgPSAwO1xyXG5cdFx0X2ludGVyYWN0aW9uRW5kKCk7XHJcblx0fVxyXG5cdC8vIHJ1biB0aGUgY29kZSBvbmx5IGlmIHRoZSBhcHAncyBpbml0IGJvb2xlYW4gaXMgdHJ1ZSBhbmRcclxuXHQvLyB0aGUgc3RyaXBlcyBhbmltYXRpb24gYm9vbCBpcyBmYWxzZVxyXG5cdGlmICggX2FwcEluaXRpYWxpemVkICYmICFfdXNlckludGVyYWN0aW9uICYmICFfc3RyaXBlc0FuaW1hdGluZyApe1xyXG5cdFx0Ly8gY29uc29sZS5sb2coIFwidG91Y2ggc3RhcnQhISFcIiApO1xyXG5cdFx0Ly8gY2FsbCB0aGUgcHVibGljIGV2ZW50IGxpc3RlbmVyXHJcblx0XHRfZXZlbnRFbWl0dGVyKFwidG91Y2hzdGFydFwiLCBlLmRhdGEuZ2xvYmFsKTtcclxuXHRcdC8vIHNldCB0aGUgaW50ZXJhY3Rpb24gYm9vbCB0byB0cnVlXHJcblx0XHRfdXNlckludGVyYWN0aW9uID0gdHJ1ZTtcclxuXHRcdC8vIHBhdXNlIGFsbCB0aW1lcnMgYW5kIGFuaW1hdGlvbnNcclxuXHRcdF9wYXVzZUJ1cm5zRWZmZWN0KCk7XHJcblx0XHQvLyBzZXQgdGhlIGludGVyYWN0aW9uIHBvaW50IHZhbHVlc1xyXG5cdFx0X2ludGVyYWN0aW9uU3RhcnRYID0gZS5kYXRhLmdsb2JhbC54O1xyXG5cdFx0X2ludGVyYWN0aW9uU3RhcnRZID0gZS5kYXRhLmdsb2JhbC55O1xyXG5cdFx0Ly8gY3JlYXRlIHN0cmlwZXMgYXJyYXlzIChyZWZlcmVuY2UgYW5kIGFuaW1hdGlvbilcclxuXHRcdF9jcmVhdGVSZWZBcnJheXMoKTtcclxuXHRcdC8vIHRvIGF2b2lkIGEgdmlzdWFsIGdsaXRjaCwgd2Ugc2V0IHRoZSBtYWluIHNsaWRlIGFscGhhIHRvIDAsXHJcblx0XHQvLyBsaWtlIHRoYXQgaXQgYmVjb21lcyB0cmFuc3BhcmVudC4gQWxzbyB0aGlzIGlzIHVzZWZ1bCBpZiB0aGUgdXNlciBpcyBpblxyXG5cdFx0Ly8gdGhlIGZpbmFsIHNsaWRlIG9mIHRoZSBncm91cCBhbmQgdGhlIHVzZXIgZ29lcyBmb3J3YXJkLiBMaWtlIHRoYXQgd2hlblxyXG5cdFx0Ly8gdGhlIGN1cnJlbnQgc3RyaXBlcyBhcmUgbW92ZWQsIHdlJ2xsIHNlZSB0aGUgYmFja2dyb3VuZCBjb2xvci5cclxuXHRcdC8vIF9tYWluU2xpZGUuYWxwaGEgPSAwO1xyXG5cdH0vLyBhcHAgaW5pdCBjb25kaXRpb25hbCBlbmRcclxuXHJcbn07IC8vIGludGVyYWN0aW9uIHN0YXJ0IGVuZFxyXG5cclxuLyoqIEludGVyYWN0aW9uIE1vdmUgTWV0aG9kXHRcclxuICogIFNldHMgdGhlIGRyYWcgZGlyZWN0aW9uIGFuZCBhbmltYXRlcyB0aGUgc3RyaXBlcy5cdFxyXG4gKiBcdFRoZSBjdXJyZW50IHN0cmlwZXMgYXJlIGFsd2F5cyBhbmltYXRlZCB1bmxlc3MgdGhlIGltYWdlIG9mIHRoZVxyXG4gKiBcdGN1cnJlbnQgc2xpZGUgaXMgbm90IGxvYWRlZCwgaW4gdGhhdCBjYXNlIHRoZSBjdXJyZW50IHN0cmlwZXMgYXJlXHJcbiAqIFx0bm90IGNyZWF0ZWQgYW5kIHdlIGRvbid0IGFuaW1hdGUgdGhlIGN1cnJlbnQgc3RyaXBlcy5cclxuKi9cclxuY29uc3QgX2ludGVyYWN0aW9uTW92ZSA9IGUgPT4ge1xyXG5cdC8vIHJ1biBvbmx5IGlmIHRoZSBpbnRlcmFjdGlvbiBib29sIGlzIHRydWVcclxuXHRpZiAoX3VzZXJJbnRlcmFjdGlvbiAmJiAhX3N0cmlwZXNBbmltYXRpbmcgKSB7XHJcblx0XHQvLyBjYWxsIHRoZSBwdWJsaWMgZXZlbnQgbGlzdGVuZXJcclxuXHRcdF9ldmVudEVtaXR0ZXIoXCJ0b3VjaG1vdmVcIiwgZS5kYXRhLmdsb2JhbCk7XHJcblx0XHQvLyBzdG9yZSB0aGUgY3VycmVudCBYIHZhbHVlXHJcblx0XHRfY3VycmVudEludGVyYWN0aW9uWCA9IGUuZGF0YS5nbG9iYWwueDtcclxuXHRcdC8vIHNldCBkaXJlY3Rpb25cclxuXHRcdF9kaXJlY3Rpb24gPSBfaW50ZXJhY3Rpb25TdGFydFggLSBfY3VycmVudEludGVyYWN0aW9uWCA+IDA7XHJcblx0XHQvLyBzZXQgZHJhZyBhbW91bnRcclxuXHRcdF9kcmFnQW1vdW50ID0gTWF0aC5hYnMoX2ludGVyYWN0aW9uU3RhcnRYIC0gX2N1cnJlbnRJbnRlcmFjdGlvblgpO1xyXG5cdFx0Ly8gbW92ZSB0aGUgc3RyaXBlc1xyXG5cdFx0X3NldERyYWdJbmRleCgpO1xyXG5cdFx0Ly8gY2hlY2sgaWYgdGhlIHN0YXJ0IGluZGV4IG9mIHRoZSBhbmltYXRpb24gYXJyYXkgc2hvdWxkIGJlIGNoYW5nZWQgb3Igc3RheSB0aGVcclxuXHRcdC8vIHNhbWUgdmFsdWUuIFRoaXMgaXMgd2hlbiB0aGUgXHJcblx0XHRfY3VycmVudFN0YXJ0SW5kZXggPSBNYXRoLmZsb29yKCBlLmRhdGEuZ2xvYmFsLnkgLyBfc3RyaXBlSGVpZ2h0ICk7XHJcblx0XHRpZiAoIF9jdXJyZW50U3RhcnRJbmRleCAhPT0gX3N0YXJ0U3RyaXBlSW5kZXggJiYgX2N1cnJlbnRTdGFydEluZGV4ID49IDAgJiYgX2N1cnJlbnRTdGFydEluZGV4IDw9IF9zdHJpcGVzQW1vdW50IC0gMSApIHtcclxuXHRcdFx0Ly8gdGhlIHN0YXJ0aW5nIGluZGV4IGZvciB0aGUgYW5pbWF0aW9ucyBhcnJheXMgaGFzIGNoYW5nZWRcclxuXHRcdFx0Ly8gY2FsbCB0aGUgbWV0aG9kIHRvIGNyZWF0ZSB0aGUgYW5pbWF0aW9ucyBhcnJheVxyXG5cdFx0XHRfY3JlYXRlQW5pbWF0aW9uQXJyYXkoX2N1cnJlbnRTdGFydEluZGV4KTtcclxuXHRcdFx0Ly8gYWZ0ZXIgY3JlYXRpbmcgdGhlIGFuaW1hdGlvbnMgYXJyYXlzIGFnYWluLCBhbmltYXRlIHRoZSBzdHJpcGVzIHRvIHRoZSBcclxuXHRcdFx0Ly8gY29ycmVzcG9uZGluZyBwb3NpdGlvbnMuXHJcblx0XHRcdF9zZXREcmFnSW5kZXgoKTtcclxuXHRcdH1cclxuXHR9IC8vIGludGVyYWN0aW9uIGNvbmRpdGlvbmFsIGVuZFxyXG59OyAvLyBpbnRlcmFjdGlvbiBtb3ZlIGVuZFxyXG5cclxuLyoqIEludGVyYWN0aW9uIEVuZCBNZXRob2RcclxuICogIFNldHMgdGhlIGludGVyYWN0aW9uIGJvb2wgdG8gZmFsc2VcclxuKi9cclxuY29uc3QgX2ludGVyYWN0aW9uRW5kID0gZSA9PiB7XHJcblx0Ly8gcmVzZXQgdGhlIHRvdWNoIGFtb3VudFxyXG5cdF90b3VjaEFtb3VudCA9IDA7XHJcblx0Ly8gY2hlY2sgaWYgdGhlIHN0cmlwZXMgYXJlIG5vdCBhbmltYXRpbmcgYW5kIHRoZSB1c2VyIGludGVyYWN0aW9uIGlzIHRydWVcclxuXHRpZiAoICFfc3RyaXBlc0FuaW1hdGluZyAmJiBfdXNlckludGVyYWN0aW9uKSB7XHJcblx0XHQvLyBjYWxsIHRoZSBwdWJsaWMgZXZlbnQgbGlzdGVuZXJcclxuXHRcdF9ldmVudEVtaXR0ZXIoXCJ0b3VjaGVuZFwiKTtcclxuXHRcdC8vIHNldCB0aGUgc3RyaXBlcyBhbmltYXRpb24gdG8gdHJ1ZVxyXG5cdFx0X3N0cmlwZXNBbmltYXRpbmcgPSB0cnVlO1xyXG5cdFx0Ly8gY2hlY2sgaWYgdGhlIGRyYWcgdGhyZXNob2xkIHdhcyBwYXNzZWQgYW5kIGlmIHRoaXMgaXMgbm90IHRoZSBmaXJzdCBzbGlkZVxyXG5cdFx0Ly8gb2YgdGhlIGZpcnN0IGdyb3VwIGFuZCB0aGUgdXNlciBpcyBub3QgZ29pbmcgdG8gYSBwcmV2aW91cyBzbGlkZS5cclxuXHRcdGlmICggX2RyYWdBbW91bnQgPiBfbWluRHJhZyApIHtcclxuXHRcdFx0Ly8gaWYgdGhpcyBpcyB0aGUgZmlyc3Qgc2xpZGUgb2YgdGhlIGZpcnN0IGdyb3VwIGFuZCB0aGUgdXNlciBpcyBnb2luZyBiYWNrXHJcblx0XHRcdC8vIHJlc2V0IHRoZSBjdXJyZW50IGFuZCBuZXh0IHN0cmlwZXMgdG8gdGhlIG5vcm1hbCBwb3NpdGlvblxyXG5cdFx0XHRpZiAoIF9maXJzdFNsaWRlR3JvdXAgJiYgIV9kaXJlY3Rpb24gKSB7XHJcblx0XHRcdFx0dmFyIHRsID0gbmV3IFRpbWVsaW5lTGl0ZSh7XHJcblx0XHRcdFx0XHRvbkNvbXBsZXRlOiBfcmVzZXRVc2VySW50ZXJhY3Rpb24sIG9uQ29tcGxldGVQYXJhbXM6IFtmYWxzZV1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC50byggX2N1cnJlbnRJbml0QXJyYXksIDAuMiwgeyB4OiAwIH0gKVxyXG5cdFx0XHRcdC50byggX25leHRJbml0QXJyYXksIDAuMiwgeyB4OiB3aW5TaXplLncgfSwgMCApO1xyXG5cdFx0XHRcdC8vIGV4aXQgY29kZVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fSAvLyBmaXJzdCBncm91cCBjb25kaXRpb25hbCBlbmRcclxuXHRcdFx0Ly8gdGhlIGRyYWcgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gdGhlIG1pbi4gQW5pbWF0ZSB0aGUgc3RyaXBlcyBcclxuXHRcdFx0Ly8gZGVwZW5kaW5nIG9uIHRoZSBkaXJlY3Rpb24gKHByZXZpb3VzIC8gbmV4dCkgdGhlXHJcblx0XHRcdC8vIGN1cnJlbnQgc3RyaXBlcyB0YXJnZXQgdmFsdWUgZGVwZW5kcyBvbiB0aGUgZGlyZWN0aW9uIGFuZCBcclxuXHRcdFx0Ly8gdGhlIG90aGVyIHN0cmlwZXMgKG5leHQgb3IgcHJldmlvdXMpIGRlcGVuZCBvbiB0aGUgZGlyZWN0aW9uIGFsc28uXHJcblx0XHRcdGNvbnN0IF9yZW1vdmVUaW1lbGluZSA9IG5ldyBUaW1lbGluZUxpdGUoe1xyXG5cdFx0XHRcdG9uQ29tcGxldGU6IF9yZXNldFVzZXJJbnRlcmFjdGlvbiwgb25Db21wbGV0ZVBhcmFtczogW3RydWVdLCBwYXVzZWQ6IHRydWVcclxuXHRcdFx0fSk7XHJcblx0XHRcdF9yZW1vdmVUaW1lbGluZVxyXG5cdFx0XHRcdC5zdGFnZ2VyVG8oIF9jdXJyZW50U3RyaXBlcywgMC4yNSwge1xyXG5cdFx0XHRcdFx0eDogKF9kaXJlY3Rpb24gPyAtd2luU2l6ZS53IDogd2luU2l6ZS53KSxcclxuXHRcdFx0XHRcdGVhc2U6UG93ZXIyLmVhc2VPdXRcclxuXHRcdFx0XHR9LCAwLjA0IClcclxuXHRcdFx0XHQuc3RhZ2dlclRvKCBfZGlyZWN0aW9uID8gX25leHRTdHJpcGVzIDogX3ByZXZpb3VzU3RyaXBlcywgMC4yNSwge1xyXG5cdFx0XHRcdFx0eDogMCwgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuXHRcdFx0XHR9LCAwLjA0LCAwKVxyXG5cdFx0XHRcdC5jYWxsKCBfcmVzZXRUZXh0RGF0YSwgW3RydWVdLCBudWxsLCBcIi09MC4xXCIgKVxyXG5cdFx0XHRcdC5wbGF5KCk7XHJcblx0XHRcdC8vXHJcblx0XHRcdC8vIHBhdXNlIGFsbCB0aGUgdGV4dCBkZWxheWVkIGNhbGxzXHJcblx0XHRcdGlmICggX3BhckdhcCApIHsgX3BhckdhcC5wYXVzZSgpLmtpbGwoKTsgfTtcclxuXHRcdFx0aWYgKCBfYWRkV29yZERlbGF5ZWRDYWxsICkgeyBfYWRkV29yZERlbGF5ZWRDYWxsLnBhdXNlKCkua2lsbCgpOyB9O1xyXG5cdFx0XHQvLyBzZXQgdGhlIHVzZXIgaW50ZXJhY3Rpb24gdG8gZmFsc2VcclxuXHRcdFx0X3NldFVzZXJJbnRlcmFjdGlvbihmYWxzZSk7XHJcblx0XHRcdC8qIC8vIHJlc2V0IHRoZSB0ZXh0IGRhdGEgaW4gb3JkZXIgdG8gcHJldmVudCB0aGUgc2Nyb2xsIHRvdWNoIGV2ZW50cyBmcm9tXHJcblx0XHRcdC8vIHRyaWdnZXJpbmcgYmVmb3JlIHRoZSBuZXcgc2xpZGUncyB0ZXh0IGlzIHNldCBhZ2FpblxyXG5cdFx0XHRfcmVzZXRUZXh0RGF0YSh0cnVlKTtcclxuXHRcdFx0Ly8gaGlkZSB0aGUgdGV4dCBzdGFnZSBvbmx5IGlmIHRoZSB1c2VyIGdvZXMgdG8gYSBuZXcgc2xpZGVcclxuXHRcdFx0X3RleHRTdGFnZS5hbHBoYSA9IDA7ICovXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyB0aGUgZHJhZyB2YWx1ZSBpcyBsZXNzIHRoYW4gdGhlIG1pbiwgc2V0IHRoZSBjdXJyZW50IHN0cmlwZXMgdG8gMFxyXG5cdFx0XHRjb25zdCBfcmVtb3ZlVGltZWxpbmUgPSBuZXcgVGltZWxpbmVMaXRlKHtcclxuXHRcdFx0XHRwYXVzZWQ6IHRydWUsIG9uQ29tcGxldGU6IF9yZXNldFVzZXJJbnRlcmFjdGlvbiwgb25Db21wbGV0ZVBhcmFtczogW2ZhbHNlXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0Y29uc3QgX3NlY29uZFRhcmdldCA9IF9kaXJlY3Rpb24gPyBfbmV4dEluaXRBcnJheSA6IChfZmlyc3RTbGlkZUdyb3VwID8gW10gOiBfcHJldmlvdXNJbml0QXJyYXkpO1xyXG5cdFx0XHRjb25zdCBfdGFyZ2V0UG9zID0gd2luU2l6ZS53O1xyXG5cdFx0XHRfcmVtb3ZlVGltZWxpbmVcclxuXHRcdFx0XHQudG8oX2N1cnJlbnRJbml0QXJyYXksIDAuMTUsIHsgeDogMCB9IClcclxuXHRcdFx0XHQudG8oIF9zZWNvbmRUYXJnZXQsIDAuMTUsIHsgeDogX2RpcmVjdGlvbiA/IF90YXJnZXRQb3MgOiAtX3RhcmdldFBvcyB9LCAwKVxyXG5cdFx0XHRcdC5wbGF5KCk7XHJcblx0XHR9IC8vIGRyYWcgYW1vdW50IGNvbmRpdGlvbmFsXHJcblx0fSAvLyBzdHJpcGVzIGFuaW1hdGluZyBjb25kaXRpb25hbFxyXG59OyAvLyBpbnRlcmFjdGlvbiBlbmRcclxuXHJcbi8vIGF0dGFjaCB0aGUgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIHJlbmRlciBzdGFnZVxyXG5leHBvcnQgY29uc3QgX2F0dGFjaEludGVyYWN0aW9uSGFuZGxlcnMgPSB0ID0+IHtcclxuXHR0XHJcblx0XHQub24oXCJtb3VzZWRvd25cIiwgX2ludGVyYWN0aW9uU3RhcnQpXHJcblx0XHQub24oXCJtb3VzZWRvd25cIiwgX3RleHRUb3VjaFN0YXJ0KVxyXG5cdFx0Lm9uKFwibW91c2Vtb3ZlXCIsIF9pbnRlcmFjdGlvbk1vdmUpXHJcblx0XHQub24oXCJtb3VzZW1vdmVcIiwgX3RleHRUb3VjaE1vdmUpXHJcblx0XHQub24oXCJtb3VzZXVwXCIsIF9pbnRlcmFjdGlvbkVuZClcclxuXHRcdC5vbihcIm1vdXNldXBvdXRzaWRlXCIsIF9pbnRlcmFjdGlvbkVuZClcclxuXHRcdC5vbihcIm1vdXNldXBcIiwgX3RleHRUb3VjaEVuZClcclxuXHRcdC5vbihcIm1vdXNldXBvdXRzaWRlXCIsIF90ZXh0VG91Y2hFbmQpXHJcblx0XHQub24oXCJ0b3VjaHN0YXJ0XCIsIF9pbnRlcmFjdGlvblN0YXJ0KVxyXG5cdFx0Lm9uKFwidG91Y2hzdGFydFwiLCBfdGV4dFRvdWNoU3RhcnQpXHJcblx0XHQub24oXCJ0b3VjaG1vdmVcIiwgX2ludGVyYWN0aW9uTW92ZSlcclxuXHRcdC5vbihcInRvdWNobW92ZVwiLCBfdGV4dFRvdWNoTW92ZSlcclxuXHRcdC5vbihcInRvdWNoZW5kXCIsIF9pbnRlcmFjdGlvbkVuZClcclxuXHRcdC5vbihcInRvdWNoZW5kXCIsIF90ZXh0VG91Y2hFbmQpXHJcblx0XHQub24oXCJ0b3VjaGVuZG91dHNpZGVcIiwgX2ludGVyYWN0aW9uRW5kKVxyXG5cdFx0Lm9uKFwidG91Y2hlbmRvdXRzaWRlXCIsIF90ZXh0VG91Y2hFbmQpXHJcblx0XHQub24oXCJ0YXBcIiwgX2RvdWJsZVRhcClcclxuXHRcdC5vbihcImNsaWNrXCIsIF9kb3VibGVUYXApO1xyXG5cdC8vXHJcblx0XHJcbn07IC8vIGF0dGFjaCBpbnRlcmFjdGlvbiBoYW5kbGVyc1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLyoqIFxyXG4gKiAgVGhpcyBtZXRob2Qgd2lsbCB0b2dnbGUgYWxsIHRoZSBpbnRlcmFjdGlvbiBhbmQgYW5pbWF0aW9uIGJvb2xzXHJcbiAqIFx0aW4gb3JkZXIgdG8gcHJldmVudCBhbnkgdXNlciBpbnRlcmFjdGlvbi5cdFxyXG4gKiBcdFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGZyb20gdGhlIHB1YmxpYyBuZXh0IG1ldGhvZC4gTm9ybWFsbHlcclxuICogXHRhbGwgdGhlIGJvb2xzIGFyZSB0b2dnbGUgdG8gdGhlaXIgcmVzcGVjdGl2ZSB2YWx1ZXMgaW4gZWFjaFxyXG4gKiBcdGludGVyYWN0aW9uIGhhbmRsZXIsIGJ1dCBzaW5jZSB0aGUgcHVibGljIG5leHQgbWV0aG9kIHdpbGwgY3JlYXRlIHRoZSBcclxuICogXHRzdHJpcGVzIGFuZCB0aGUgcmVmZXJlbmNlIGFycmF5cywgc2V0IHRoZSBkaXJlY3Rpb24gYW5kIHRyaWdnZXIgdGhlIFxyXG4gKiBcdHRoZSBzdGFnZ2VyIGFuaW1hdGlvbiwgd2UgbmVlZCBhbiBpbnN0YW5jZSB0byBzZXQgYWxsIHRoZSBpbnRlcmFjdGlvblxyXG4gKiBcdGJvb2xzIHRvIHRob3NlIHZhbHVlcy5cclxuKi9cclxuZXhwb3J0IGNvbnN0IF9zZXRJbnRlcmFjdGlvbkJvb2xzID0gKHZhbHVlKSA9PiB7XHJcblx0Ly8gc2V0IHRoZSBpbnRlcmFjdGlvbiBib29sIHRvIHRydWVcclxuXHQvLyBpbnRlcmFjdGlvbiBzdGFydFxyXG5cdF91c2VySW50ZXJhY3Rpb24gPSB2YWx1ZTtcclxuXHRcclxuXHQvLyBzZXQgdGhlIHN0cmlwZXMgYW5pbWF0aW9uIHRvIHRydWVcclxuXHQvLyBpbnRlcmFjdGlvbiBlbmRcclxuXHRfc3RyaXBlc0FuaW1hdGluZyA9IHZhbHVlO1xyXG5cclxuXHQvLyB3ZSBhbHdheXMgZ28gZm9yd2FyZCBpbiB0aGUgcHVibGljIG5leHQgbWV0aG9kXHJcblx0X2RpcmVjdGlvbiA9IHRydWU7XHJcbn07XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL3RhcC1ldmVudHMtbW9kdWxlXCI7IiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBUQVAgRVZFTlRTIE1PRFVMRVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcblxyXG4vLyBnZXQgdGhlIGV2ZW50IGVtaXR0ZXJcclxuaW1wb3J0IHsgX2V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi9nbG9iYWwtY2xhc3MtbW9kdWxlXCI7XHJcblxyXG4vKiogT2JqZWN0IEhvbGRpbmcgdGhlIGRvdWJsZSB0YXAgZGF0YS5cdFxyXG4gKiAgVGhpcyBvYmplY3QgaGFzIHJlbGV2YW50IGluZm9ybWF0aW9uIHRvIGNoZWNrIHRoZSB0aW1lIGJldHdlZW5cclxuICogXHR0d28gdGFwIGV2ZW50cy5cclxuKi9cclxubGV0IF9sYXN0RXZlbnQgPSBudWxsO1xyXG5cclxuZXhwb3J0IGNvbnN0IF9kb3VibGVUYXAgPSAoZSkgPT4ge1xyXG5cdGxldCBub3csIGRlbHRhO1xyXG5cdC8vIGdldCB0aGUgY3VycmVudCBpbnN0YW5jZSB0aW1lIG51bWJlclxyXG5cdG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdC8vIHNldCB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBjdXJyZW50IHRpbWUgYW5kIHRoZSBwcmV2aW91cyAoaWYgZGVmaW5lZClcclxuXHRkZWx0YSA9IF9sYXN0RXZlbnQgPyAoIG5vdyAtIF9sYXN0RXZlbnQgKSA6IDA7XHJcblx0Y29uc3QgeyBnbG9iYWwgfSA9IGUuZGF0YTtcclxuXHJcblx0Ly8gY2hlY2sgaWYgdGhlIHRpbWUgYmV0d2VlbiBldmVudHMgaXMgbGVzcyB0aGFuIHRoZSB0aHJlc2hvbGRcclxuXHRpZiAoIGRlbHRhIDwgMzAwICYmIGRlbHRhID4gMzAgKSB7XHJcblx0XHQvLyB0aW1lIGRpZmZlcmVuY2UgaXMgbGVzcyB0aGFuIHRoZSB0aHJlc2hvbGRcclxuXHRcdC8vIHNldCB0aGUgbGFzdCBldmVudCB0byBudWxsIGFnYWluIHNvIHRoZSBuZXh0IHRhcCBldmVudCB3aWxsIHJlZ2lzdGVyXHJcblx0XHQvLyB0aGUgdGltZSBudW1iZXIgb24gdGhlIGxhc3QgZXZlbnQgYW5kIHdhaXQgZm9yIHRoZSBuZXh0IGV2ZW50XHJcblx0XHRfbGFzdEV2ZW50ID0gbnVsbDtcclxuXHRcdC8vIHRyaWdnZXIgdGhlIGRvdWJsZSB0YXAgY29kZVxyXG5cdFx0X2V2ZW50RW1pdHRlcihcImRvdWJsZXRhcFwiLCBnbG9iYWwpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyB0aW1lIGlzIG1vcmUgdGhhbiB0aGUgdGhyZXNob2xkLCBzZXQgdGhlIGxhc3QgZXZlbnQgdG8gdGhlIGxhdGVzdFxyXG5cdFx0X2xhc3RFdmVudCA9IG5vdztcclxuXHR9IC8vIHRpbWUgZWxhcHNlZCBjb25kaXRpb25hbFxyXG59OyAvLyBkb3VibGUgdGFwXHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL2xvZ29cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbWVudS1idXR0b25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcHJlbG9hZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21haW5cIjsiLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0XHRBTklNQVRFRCBMT0dPIE1PRFVMRVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcblxyXG4vLyBnZXQgdGhlIGxvZ28gc3RhZ2VcclxuaW1wb3J0IHsgX2xvZ29TdGFnZSB9IGZyb20gXCIuLi9waXhpLW1vZHVsZVwiO1xyXG5cclxuZXhwb3J0IGxldCBfYW5pbWF0ZWRMb2dvO1xyXG4vLyBsb2dvIHNpemVzIGRlcGVuZGluZyBvbiBzY3JlZW4gaGVpZ2h0XHJcbi8vIGV4cG9ydCBjb25zdCBfbG9nb1NpemVzID0gWzEyMCwgMTUwXTtcclxuZXhwb3J0IGNvbnN0IF9sb2dvU2l6ZXMgPSBbMC40LCAwLjVdO1xyXG4vLyBsb2dvIHBvc2l0aW9uIGRlcGVuZGluZyBvbiBzY3JlZW4gd2lkdGhcclxuZXhwb3J0IGNvbnN0IF9sb2dvUG9zaXRpb25zID0gWy03LCAyMF07XHJcblxyXG4vKipcclxuICogTWV0aG9kIHRvIGFkZCB0aGUgbG9nbyB0byB0aGUgbG9nbyBjb250YWluZXIuXHRcclxuICogUGFzc2VkIHRvIHRoZSBwcmVsb2FkZXIgY2FsbGJhY2sgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSBhbmltYXRlZFxyXG4gKiBzcHJpdGUgYW5kIGFkZCBpdCB0byB0aGUgY29udGFpbmVyLlxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2NyZWF0ZUFuaW1hdGVkTG9nbyA9ICgpID0+IHtcclxuXHQvLyB0ZXh0dXJlcyBhcnJheVxyXG5cdGNvbnN0IF9sb2dvRnJhbWVzID0gW107XHJcblxyXG5cdGZvciAoIGxldCBpID0gMDsgaSA8IDMxOyBpKysgKSB7XHJcblx0XHRjb25zdCBfdmFsdWUgPSBpIDwgMTAgPyBgMCR7aX1gIDogaTtcclxuXHRcdF9sb2dvRnJhbWVzLnB1c2goIFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoYHN0cmVhbW1tMDAke192YWx1ZX0ucG5nYCkgKTtcclxuXHR9OyAvLyBsb29wXHJcblx0XHJcblx0X2FuaW1hdGVkTG9nbyA9IG5ldyBQSVhJLmV4dHJhcy5BbmltYXRlZFNwcml0ZShfbG9nb0ZyYW1lcyk7XHJcblxyXG5cdC8vIGNyZWF0ZSBzaGFkb3cgZmlsdGVyXHJcblx0Ly8gc2hhZG93IGZpbHRlciBvbmx5IHdvcmtzIHdpdGggd2ViZ2wsIG5vIHVzZSBpbiBjYW52YXMgcmVuZGVyZXJcclxuXHQvLyB2YXIgbG9nb1NoYWRvdyA9IG5ldyBQSVhJLmZpbHRlcnMuRHJvcFNoYWRvd0ZpbHRlcig1LCAxLCAxNSwgMHgwMDAwMDAsIDAuNzUpO1xyXG5cclxuXHRfYW5pbWF0ZWRMb2dvLnBvc2l0aW9uLnNldCgtNywgMCk7XHJcblx0X2FuaW1hdGVkTG9nby5hbmltYXRpb25TcGVlZCA9IDAuMzU7XHJcblx0X2FuaW1hdGVkTG9nby5zY2FsZS5zZXQoMC40KTtcclxuXHJcblx0Ly8gX2FuaW1hdGVkTG9nby5maWx0ZXJzID0gW2xvZ29TaGFkb3ddO1xyXG5cdF9hbmltYXRlZExvZ28ucGxheSgpO1xyXG5cdC8vIHNldCB0aGUgbG9nbyBpbml0aWFsIHBvc2l0aW9uIGFuZCBzaXplXHJcblx0X3NldExvZ29Qb3NpdGlvbigwKTtcclxuXHQvLyBmaW5hbGx5IGFkZCB0aGUgbG9nbyB0byB0aGUgc3RhZ2VcclxuXHRfbG9nb1N0YWdlLmFkZENoaWxkKCBfYW5pbWF0ZWRMb2dvICk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIE1ldGhvZCB0byBzZXQgdGhlIGxvZ28gcG9zaXRpb24uXHRcclxuICogVGFrZXMgYSBudW1iZXIgY29ycmVzcG9uZGluZyB0byB0aGUgY3VycmVudCBzY3JlZW4gc2l6ZSAodGhlIGxvZ29cclxuICogcG9zaXRpb24gZGVwZW5kcyBvbiB0aGUgc2NyZWVuIHdpZHRoKSBhbmQgdXNlcyB0aGF0IG51bWJlciB0byBzZWxlY3RcclxuICogdGhlIGNvcnJlc3BvbmRpbmcgcG9zaXRpb24gZnJvbSB0aGUgcG9zaXRpb24gYXJyYXkuXHRcclxuICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGZyb20gdGhlIHJlc2l6ZSBlbWl0dGVyIGluIHRoZSB3aW5kb3cgcmVzaXplIGV2ZW50LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZCB0aGUgbnVtYmVyIG9mIHRoZSBkaW1lbnNpb25cclxuICogQHByaXZhdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9zZXRMb2dvUG9zaXRpb24gPSBkID0+IHtcclxuXHQvLyBjaGVjayBpZiB0aGUgYW5pbWF0ZWQgbG9nbyBleGlzdHMuIFRoZSBsb2dvIG1pZ2h0IHN0aWxsIGJlXHJcblx0Ly8gbG9hZGluZyB3aGVuIGEgcmVzaXplIGV2ZW50IGhhcHBlbnMgYW5kIGEgYnJlYWtwb2ludCBpcyBwYXNzZWRcclxuXHRpZiAoIF9hbmltYXRlZExvZ28gKSB7XHJcblx0XHRfYW5pbWF0ZWRMb2dvLnggPSBfbG9nb1Bvc2l0aW9uc1tkXTtcclxuXHRcdF9hbmltYXRlZExvZ28uc2NhbGUuc2V0KF9sb2dvU2l6ZXNbZF0pO1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG59O1xyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0XHRMT0FERVIgTU9EVUxFIE1BSU4gRklMRVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcblxyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byBhZGQgdGhlIGFuaW1hdGVkIGxvZ29cclxuaW1wb3J0IHsgX2NyZWF0ZUFuaW1hdGVkTG9nbyB9IGZyb20gXCIuL2xvZ29cIjtcclxuLy8gZ2V0IHRoZSBtZXRob2QgdG8gYWRkIHRoZSBtZW51IGJ1dHRvblxyXG5pbXBvcnQgeyBfY3JlYXRlTWVudWJ1dHRvbiB9IGZyb20gXCIuL21lbnUtYnV0dG9uXCI7XHJcbmltcG9ydCB7IF9jaGVja0JyZWFrcG9pbnRzIH0gZnJvbSBcIi4uL3dpbmRvd1wiO1xyXG4vLyBnZXQgdGhlIHRleHQgY29tcG9uZW50IG1ldGhvZHNcclxuaW1wb3J0IHsgX2luaXRUZXh0TW9kdWxlLCBfcHJvY2Vzc1NsaWRlVGV4dCwgX2NyZWF0ZU5ld1NsaWRlVGV4dCB9IGZyb20gXCIuLi90ZXh0LW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIHByb21wdCBjb21wb25lbnRcclxuaW1wb3J0IHsgX2luaXRQcm9tcHQgfSBmcm9tIFwiLi4vcHJvbXB0LW1vZHVsZVwiO1xyXG5cclxuLyogVGhpcyBmaWxlIHdpbGwgY3JlYXRlIHRoZSBQSVhJIGxvYWRlciBmb3IgdGhlIGxvZ28gYW5kIG1lbnUgYnV0dG9uXHJcbiAqIGFuZCBpdCdsbCBhZGQgdGhlIHNwcml0ZXMgdG8gdGhlIHJlc3BlY3RpdmUgY29udGFpbmVyIChsb2dvIHN0YWdlKVxyXG4gKiBhZnRlciB0aGV5IGFyZSBsb2FkZWQuXHJcbiAqIFRoZSBzcGVjZmljaWMgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBvZiBlYWNoIGVsZW1lbnQgd2lsbCByZXNpZGUgaW5cclxuICogdGhlaXIgb3duIHBhcnRpY3VsYXIgZmlsZXMuXHJcbiovXHJcblxyXG4vKipcclxuICogTWV0aG9kIHRvIGNyZWF0ZSB0aGUgUElYSSBsb2FkZXIsIGFkZCB0aGUgYW5pbWF0ZWQgbG9nbyBzcHJpdGVzaGVldFxyXG4gKiBhbmQgdGhlIG1lbnUgYnV0dG9uIGltYWdlLlxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2FkZExvZ28gPSAoKSA9PiB7XHJcblx0Ly8gY3JlYXRlIHRoZSBQSVhJIGxvYWRlclxyXG5cdGNvbnN0IF9sb2dvTG9hZGVyID0gbmV3IFBJWEkubG9hZGVycy5Mb2FkZXIoKTtcclxuXHRfbG9nb0xvYWRlclxyXG5cdFx0LmFkZChcImxvZ28tc3ByaXRlXCIsIFwianMvc3RyZWFtLWxvZ28tc3ByaXRlLmpzb25cIikgLy8gYW5pbWF0ZWQgbG9nb1xyXG5cdFx0LmFkZChcIm1lbnVfYnV0dG9uXCIsIFwiaW1hZ2VzL3N0cmVhbW1tX21haW5fYnRuLnBuZ1wiKSAvLyBtZW51IGJ1dHRvblxyXG5cdFx0LmxvYWQoX2xvZ29Mb2FkZWQpOyAvLyBjYWxsYmFja1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDYWxsYmFjayBmb3IgdGhlIFBJWEkgTG9hZGVyIGluc3RhbmNlLlx0XHJcbiAqIFRoaXMgaXMgY2FsbGVkIGFmdGVyIHRoZSByZXNvdXJjZXMgYXJlIGxvYWRlZCBhbmQgcmVhZHkgdG8gYmVcclxuICogdXNlZC5cclxuICogQHBhcmFtIHtvYmplY3R9IHIgdGhlIHJlc291cmNlcyBwYXNzZWQgYnkgdGhlIFBJWEkgbG9hZGVyXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmNvbnN0IF9sb2dvTG9hZGVkID0gciA9PiB7XHJcblx0Ly8gY3JlYXRlIHRoZSBhbmltYXRlZCBsb2dvXHJcblx0X2NyZWF0ZUFuaW1hdGVkTG9nbyggciApO1xyXG5cdC8vIGNyZWF0ZSB0aGUgbWVudSBidXR0b25cclxuXHRfY3JlYXRlTWVudWJ1dHRvbiggci5yZXNvdXJjZXMubWVudV9idXR0b24udGV4dHVyZSApO1xyXG5cdC8vIG5vdyBzZXQgdGhlIGluaXRpYWwgcG9zaXRpb24gYW5kIHNpemUgb2YgdGhlIGxvZ28gYW5kIGJ1dHRvblxyXG5cdF9jaGVja0JyZWFrcG9pbnRzKCk7XHJcblx0Ly8gcHJvY2VzcyB0aGUgdGV4dCBmb3IgdGhlIGZpcnN0IHNsaWRlXHJcblx0X2luaXRUZXh0TW9kdWxlKCk7XHJcblx0X3Byb2Nlc3NTbGlkZVRleHQoKTtcclxuXHRfY3JlYXRlTmV3U2xpZGVUZXh0KCk7XHJcblx0Ly8gc3RhcnQgdGhlIHByb21wdCBjb21wb25lbnRcclxuXHRfaW5pdFByb21wdCgpO1xyXG59O1xyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0XHRNRU5VIEJVVFRPTiBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG5cclxuLy8gZ2V0IHRoZSBzY3JlZW4gZGltZW5zaW9uc1xyXG5pbXBvcnQgeyB3aW5TaXplIH0gZnJvbSBcIi4uL3dpbmRvd1wiO1xyXG4vLyBnZXQgdGhlIGxvZ28gc3RhZ2VcclxuaW1wb3J0IHsgX2xvZ29TdGFnZSB9IGZyb20gXCIuLi9waXhpLW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIGV2ZW50IGVtaXR0ZXJcclxuaW1wb3J0IHsgX2V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi9nbG9iYWwtY2xhc3MtbW9kdWxlXCI7XHJcblxyXG4vLyBtZW51IGJ1dHRvbiBZIEFYSVMgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHNjcmVlbiB3aWR0aFxyXG5leHBvcnQgY29uc3QgX21lbnVCdG5Qb3NpdGlvbnMgPSBbNDgsIDYyXTtcclxuXHJcbmV4cG9ydCBsZXQgX21lbnVCdXR0b247XHJcblxyXG5cclxuLyoqXHJcbiAqIE1ldGhvZCB0byBjcmVhdGUgdGhlIG1lbnUgYnV0dG9uLlx0XHJcbiAqIFRoaXMgaXMgY2FsbGVkIGluIHRoZSBsb2dvIGxvYWRlciBjYWxsYmFjay5cdFxyXG4gKiBDcmVhdGVzIHRoZSBtZW51IGJ1dHRvbiBzcHJpdGUsIGFkZHMgaXQgdG8gdGhlIGxvZ28gY29udGFpbmVyXHJcbiAqIGFuZCBhdHRhY2ggdGhlIHBvaW50ZXIgZXZlbnRzIHRvIGl0LlxyXG4gKiBAcGFyYW0ge29iamVjdH0gdCB0aGUgYnV0dG9uIHRleHR1cmUgZ2VuZXJhdGVkIGJ5IHRoZSBQSVhJIGxvYWRlclxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2NyZWF0ZU1lbnVidXR0b24gPSB0ID0+IHtcclxuXHQvLyBjcmVhdGUgdGhlIHNwcml0ZVxyXG5cdF9tZW51QnV0dG9uID0gbmV3IFBJWEkuU3ByaXRlKHQpO1xyXG5cdF9tZW51QnV0dG9uLndpZHRoID0gMjU7XHJcblx0X21lbnVCdXR0b24uaGVpZ2h0ID0gMjU7XHJcblx0X21lbnVCdXR0b24ucG9zaXRpb24uc2V0KCAod2luU2l6ZS53IC0gNDUpLCAwKSA7XHJcblxyXG5cdC8vIHNldCB0aGUgYnV0dG9uIHRvIHJlY2VpdmUgZXZlbnRzXHJcblx0X21lbnVCdXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG5cdC8vIGF0dGFjaCB0aGUgY2xpY2sgLyB0YXAgZXZlbnRzXHJcblx0X21lbnVCdXR0b25cclxuXHRcdC5vbihcImNsaWNrXCIsIF9tZW51QnV0dG9uQ2xpY2spXHJcblx0XHQub24oXCJ0YXBcIiwgX21lbnVCdXR0b25DbGljaylcclxuXHRcdC5vbihcInRvdWNoc3RhcnRcIiwgX21lbnVDbGlja1N0b3ApXHJcblx0XHQub24oXCJtb3VzZWRvd25cIiwgX21lbnVDbGlja1N0b3ApO1xyXG5cdC8vXHJcblx0Ly8gcG9zaXRpb24gdGhlIGJ1dHRvblxyXG5cdF9wb3NpdGlvbkJ1dHRvbigwKTtcclxuXHRcclxuXHRfbG9nb1N0YWdlLmFkZENoaWxkKCBfbWVudUJ1dHRvbiApO1xyXG59O1xyXG5cclxuXHJcbi8qKiBNZW51IEJ1dHRvbiBUYXAgLyBDbGljayBldmVudC5cdFxyXG4gKiAgVGhpcyB3aWxsIHRyaWdnZXIgYW4gZXZlbnQgZW1pdHRlci5cclxuKi9cclxuZXhwb3J0IGNvbnN0IF9tZW51QnV0dG9uQ2xpY2sgPSAoZSkgPT4ge1xyXG5cdGNvbnNvbGUubG9nKCBcIm1lbnUgYnV0dG9uIGNsaWNrXCIgKTtcclxuXHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdF9ldmVudEVtaXR0ZXIoXCJtZW51Y2xpY2tcIik7XHJcbn07XHJcbi8vIG1ldGhvZCB0byBwcmV2ZW50IHRpZ2dlcmluZyB0aGUgc3RyaXBlcyBldmVudFxyXG5jb25zdCBfbWVudUNsaWNrU3RvcCA9IChlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNZXRob2QgdG8gc2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgbWVudSBidXR0b24uXHRcclxuICogVXNlZCBvbiB0aGUgd2luZG93IHJlc2l6ZSBldmVudC5cdFxyXG4gKiBUYWtlcyBhIG51bWJlciBmb3IgdGhlIGN1cnJlbnQgc2NyZWVuIHdpZHRoIGFuZCB1c2VzIGl0IHRvIHNlbGVjdFxyXG4gKiB0aGUgcG9zaXRpb24gZnJvbSB0aGUgYXJyYXkgd2l0aCB0aGF0IGluZGV4Llx0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkIHRoZSBudW1iZXIgb2YgdGhlIGN1cnJlbnQgc2NyZWVuIGRpbWVuc2lvblxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3Bvc2l0aW9uQnV0dG9uID0gZCA9PiB7XHJcblx0X21lbnVCdXR0b24ueCA9ICh3aW5TaXplLncgLSA0NSk7XHJcblx0X21lbnVCdXR0b24ueSA9IF9tZW51QnRuUG9zaXRpb25zW2RdO1xyXG59O1xyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogIFBSRUxPQURFUiBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG5cclxuLyogVGhpcyBmaWxlIHdpbGwgY3JlYXRlIHRoZSBQSVhJIExvYWRlciBpbnN0YW5jZSBmb3IgdGhlIHByZWxvYWRlclxyXG4gKiBhbmltYXRlZCBzcHJpdGUgYW5kIGl0J2xsIGFkZCBpdCB0byB0aGUgbWFpbiBzdGFnZVxyXG4qL1xyXG5cclxuLy8gZ2V0IHRoZSBzY3JlZW4gZGltZW5zaW9uc1xyXG5pbXBvcnQgeyB3aW5TaXplIH0gZnJvbSBcIi4uL3dpbmRvd1wiO1xyXG4vLyBnZXQgdGhlIG1haW4gcmVuZGVyZXJcclxuaW1wb3J0IHsgX21haW5SZW5kZXIgfSBmcm9tIFwiLi4vcGl4aS1tb2R1bGVcIjtcclxuXHJcbmV4cG9ydCBsZXQgX3ByZWxvYWRlcjtcclxuLy8gdmFyIHRvIGNoZWNrIGlmIHRoZSBwcmVsb2FkZXIgaXMgZG9uZSwgdGhpcyB0byBwcmV2ZW50IHRoZSBQSVhJXHJcbi8vIGxvYWRlciB0byBhZGQgdGhlIGxvZ28gYW5pbWF0aW9uIHdoaWxlIHRoZSBwcmVsb2FkZXIgaXMgc3RpbGwgXHJcbi8vIGJlaW5nIGxvYWRlZCBhbmQgcHJvY2Vzc2VkXHJcbmV4cG9ydCBsZXQgX3ByZWxvYWRlckNvbXBsZXRlZCA9IGZhbHNlO1xyXG5jb25zdCBfbG9hZGVyRnJhbWVzID0gW107XHJcblxyXG4vKiogTWV0aG9kIHRvIHNldCB0aGUgTG9hZGVyIFBvc2l0aW9uLlx0XHJcbiAqICBDZW50ZXJzIHRoZSBsb2FkZXIgaW50byB0aGUgY2FudmFzIGVsZW1lbnRcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9wb3NpdGlvbkxvYWRlciA9ICgpID0+IHtcclxuXHRfcHJlbG9hZGVyLnBvc2l0aW9uLnNldChcclxuXHRcdCh3aW5TaXplLncgLSAzMjApIC8gMixcclxuXHRcdCh3aW5TaXplLmggLSAzMjApIC8gMlxyXG5cdCk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENhbGxiYWNrIHdoZW4gdGhlIGxvYWRlciBzcHJpdGUgaXMgbG9hZGVkXHJcbiovXHJcbmNvbnN0IF9sb2FkZXJMb2FkZWQgPSAoKSA9PiB7XHJcblxyXG5cdC8vIGFkZCB0aGUgaW1hZ2VzIHRvIHRoZSBmcmFtZXMgYXJyYXlcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcclxuXHRcdGNvbnN0IF92YWx1ZSA9IGkgPCAxMCA/IGAwJHtpfWAgOiBpO1xyXG5cdFx0X2xvYWRlckZyYW1lcy5wdXNoKFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoYHByZWxhb2RlcjAke192YWx1ZX0ucG5nYCkpO1xyXG5cdH0gLy8gbG9vcFxyXG5cclxuXHQvLyBjcmVhdGUgdGhlIGFuaW1hdGVkIHNwcml0ZVxyXG5cdF9wcmVsb2FkZXIgPSBuZXcgUElYSS5leHRyYXMuQW5pbWF0ZWRTcHJpdGUoIF9sb2FkZXJGcmFtZXMgKTtcclxuXHRcclxuXHRfcHJlbG9hZGVyLmFuaW1hdGlvblNwZWVkID0gMC4zNTtcclxuXHRcclxuXHRfcHJlbG9hZGVyLnBsYXkoKTtcclxuXHJcblx0X3Bvc2l0aW9uTG9hZGVyKCk7XHJcblxyXG5cdF9tYWluUmVuZGVyLnN0YWdlLmFkZENoaWxkKCBfcHJlbG9hZGVyICk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIE1ldGhvZCB0byBzdG9wIHRoZSBsb2FkZXIgYW5pbWF0aW9uXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfc3RvcExvYWRlckFuaW1hdGlvbiA9ICgpID0+IHtcclxuXHRfcHJlbG9hZGVyLnN0b3AoKTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgX2NyZWF0ZUxvYWRlciA9ICgpID0+IHtcclxuXHRQSVhJLmxvYWRlclxyXG5cdFx0LmFkZChcImpzL3N0cmVhbS1wcmVsb2FkZXItc3ByaXRlLmpzb25cIilcclxuXHRcdC5sb2FkKF9sb2FkZXJMb2FkZWQpO1xyXG59O1xyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogIE5FWFQgU1RSSVBFUyBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG4vLyB0aGlzIG1vZHVsZSBoYXMgdGhlIGNvZGUgdG8gY3JlYXRlIHRoZSBzdHJpcGVzIGZvciB0aGUgbmV4dCBpbWFnZVxyXG4vLyBoYXMgdGhlIGFycmF5cyB0byBob2xkIHRoZSBzdHJpcGVzIGFzIHJlZmVyZW5jZXMgYW5kIHRvIGRyYWcvYW5pbWF0ZVxyXG5cclxuLy8gVGhlIGluaXRpYWwgcG9zaXRpb24gb2YgdGhlIG5leHQgc2xpZGUgaW1hZ2UgaXMgYWx3YXlzICgwLDApLCBzbyB3ZSBkb24ndFxyXG4vLyBuZWVkIHRvIGNhbGN1bGF0ZSB0aGF0LiBXZSBydW4gdGhlIHNhbWUgY29kZSB1c2VkIGZvciB0aGUgcHJldmlvdXMgc3RyaXBlcyxcclxuLy8gd2UgZ2V0IHRoZSBuZXh0IGJhc2UgdGV4dHVyZSAoZGVwZW5kaW5nIG9uIHRoZSBjdXJyZW50IHNsaWRlIGluZGV4LCBpZiB0aGVcclxuLy8gY3VycmVudCBzbGlkZSBpcyB0aGUgbGFzdCBvZiB0aGUgZ3JvdXAgd2UgZG9uJ3QgY3JlYXRlIHRoZSBuZXh0IHN0cmlwZXMpIGFuZFxyXG4vLyBpdCdzIGRpbWVuc2lvbnMsIHRoZW4gdXNpbmcgdGhlIHNjcmVlbiBzaXplIGdldCB0aGUgc2NhbGUgcmF0aW8sIHNldCB0aGVcclxuLy8gc3RyaXBlcyBhbmQgaXQncyB0ZXh0dXJlJ3MgZGltZW5zaW9ucywgYWRkIHRoZW0gdG8gdGhlIHN0YWdlLCB0aGUgcmVmZXJlbmNlXHJcbi8vIGFycmF5IGFuZCBmaW5hbGx5IHNldCB0aGUgZHJhZy9hbmltYXRpb24gb3JkZXIuXHJcbi8vIGdldCB0aGUgc2xpZGVzIGFtb3VudFxyXG5pbXBvcnQgeyBfc2xpZGVzQW1vdW50IH0gZnJvbSBcIi4vYWpheC1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBzY3JlZW4gZGltZW5zaW9uc1xyXG5pbXBvcnQgeyB3aW5TaXplLCBfc3RyaXBlSGVpZ2h0LCBfaGVpZ2h0UmVtaW5kZXIgfSBmcm9tIFwiLi93aW5kb3dcIjtcclxuLy8gZ2V0IHRoZSBtYWluIHJlbmRlcmVyIGFuZCB0aGUgbG9hZGluZyBiYXNlIHRleHR1cmVcclxuaW1wb3J0IHsgX3N0cmlwZXNTdGFnZSB9IGZyb20gXCIuL3BpeGktbW9kdWxlLmpzXCI7XHJcbi8vIGdldCB0aGUgc3RyaXBlcyBhbW91bnQsIG1pZGRsZSBhbmQgbWV0aG9kIHRvIHNldCB0aGUgaW5kZXggdmFsdWVcclxuaW1wb3J0IHsgX3N0cmlwZXNBbW91bnQsIF9uZXh0SW5pdEFycmF5IH0gZnJvbSBcIi4vc3RyaXBlcy1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSBncmFwaGljcyBzdHJpcGVzIG1ldGhvZFxyXG5pbXBvcnQgeyBfY3JlYXRlR3JhcGhpY1N0cmlwZXMgfSBmcm9tIFwiLi9zdHJpcGVzXCI7XHJcbi8vIGdldCB0aGUgY3VycmVudCBzbGlkZSBpbmRleFxyXG5pbXBvcnQgeyBfY3VycmVudFNsaWRlSW5kZXggfSBmcm9tIFwiLi9zbGlkZS1jaGFuZ2UtbW9kdWxlLmpzXCI7XHJcbi8vIGdldCB0aGUgdGV4dHVyZXMgYXJyYXlcclxuaW1wb3J0IHsgX3RleHR1cmVzQXJyYXkgfSBmcm9tIFwiLi90ZXh0dXJlcy1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSBjb2xvciByb3RhdGlvblxyXG5pbXBvcnQgeyBfY29sb3JzQXJyYXksIF9jdXJyZW50Q29sb3JJbmRleCB9IGZyb20gXCIuL3RleHR1cmVzXCI7XHJcbi8vIGdldCB0aGUgYW5pbWF0aW9uIHN0b3JlXHJcbmltcG9ydCB7IF9hbmltYXRpb25TdG9yZSB9IGZyb20gXCIuL2FuaW1hdGlvbi9hbmltYXRpb24tc3RvcmVcIjtcclxuXHJcbmxldCBfbmV4dFNjYWxlID0gbnVsbDtcclxuXHJcblxyXG4vKiogTWV0aG9kIHRvIGNyZWF0ZSB0aGUgcmVmZXJlbmNlIGFycmF5XHRcclxuICogIENyZWF0ZXMgdGhlIGFycmF5IHdpdGggYWxsIHRoZSBzdHJpcGVzLlx0XHJcbiAqIFx0QWRkIHRoZSBzdHJpcGVzIHRvIHRoZSBkcmFnL2FuaW1hdGlvbiBhcnJheS5cdFxyXG4gKiBcdEFkZHMgdGhlIHN0cmlwZXMgdG8gdGhlIHJlbmRlcmVyJ3Mgc3RhZ2UuXHJcbiAqIFx0VGhlIGJhc2UgdGV4dHVyZXMgZG9uJ3QgaGF2ZSBhIGNvcnJlY3RlZCBzY2FsZSBhcHBsaWVkIGJlY2F1c2UsIGluIGNhc2Ugb2ZcclxuICogXHRhIHpvb20gYW5pbWF0aW9uLCB3ZSBuZWVkIHRvIGNoZWNrIHRoZSBsYXN0IHpvb20gYW5pbWF0aW9uIHRvIHNlZSBpZiB0aGUgXHJcbiAqIFx0c2NhbGUgc2hvdWxkIGJlIHRoZSBzYW1lICh6b29tIGluKSBvciBpdCBzaG91bGQgYmUgaW5jcmVhc2VkICh6b29tIG91dCkuXHJcbiAqIFx0SW4gdGhpcyBtZXRob2QgY2hlY2sgdGhlIHRleHR1cmUncyBhbmltYXRpb24gdHlwZSBhbmQgaWYgaXQncyB6b29tICgyKVxyXG4gKiBcdHRoZW4gY2hlY2sgdGhlIGxhc3Qgem9vbSBhbmltYXRpb24gaW4gdGhlIGFuaW1hdGlvbiBzdG9yZSBhbmQgYWNjb3JkaW5nXHJcbiAqIFx0dG8gdGhhdCwgYXBwbHkgb3Igbm90IGEgY29ycmVjdGVkIHNjYWxlIGJlZm9yZSBjcmVhdGluZyB0aGUgc3RyaXBlcy5cclxuKi9cclxuZXhwb3J0IGNvbnN0IF9uZXh0SW5pdFN0cmlwZXMgPSAoKSA9PiB7XHJcblx0Ly8gY3JlYWUgdGhlIHZhciBmb3IgdGhlIGJhc2UgdGV4dHVyZVxyXG5cdGxldCBfbmV4dEJhc2UsIF9hbmltYXRpb25UeXBlLCBfcmVhbEhlaWdodCwgX3JlYWxXaWR0aDtcclxuXHRjb25zdCB7IGhvcml6b250YWwsIHpvb20gfSA9IF9hbmltYXRpb25TdG9yZS5sYXN0U3BlY2lmaWM7XHJcblx0Ly8gY3JlYXRlIHRoZSB2YXJzIGZvciB0aGUgc3RhcnRpbmcgcG9pbnRzIG9mIHRoZSBzdHJpcGVzXHJcblx0bGV0IF9zdGFydFgsIF9zdGFydFk7XHJcblx0Ly8gZ2V0IHRoZSBzY3JlZW4gZGltZW5zaW9uc1xyXG5cdGNvbnN0IHsgdzpfc3csIGg6X3NoIH0gPSB3aW5TaXplO1xyXG5cdC8vIHZhcnMgZm9yIHRoZSBjb3JyZWN0ZWQgc2l6ZSBvZiB0aGUgc3RyaXBlc1xyXG5cdGxldCBfcmVhbFN0cmlwZUhlaWdodDtcclxuXHRsZXQgX3JlYWxIZWlnaHRSZW1pbmRlcjtcclxuXHRsZXQgX3JlYWxTdHJpcGVXaWR0aDtcclxuXHQvKiAgY2hlY2sgaWYgdGhpcyBpcyB0aGUgbGFzdCBzbGlkZSBvZiB0aGUgZ3JvdXBcclxuXHQgKlx0aWYgd2UncmUgb24gdGhlIGZpbmFsIHNsaWRlIHRoZSBuZXh0IGJhc2UgdmFyIHdpbGwgYmUgdW5kZWZpbmVkXHJcblx0ICpcdGFuZCBpbiB0aGF0IGNhc2Ugd2lsbCBiZSBzZXQgdG8gbnVsbCBsYXRlciBpbiB0aGUgY29kZSBhbmQgdGhlIGluaXQgYXJyYXlcclxuXHQgKlx0d2lsbCBiZSBlbXB0eS5cclxuXHQqL1xyXG5cdGlmKCBfY3VycmVudFNsaWRlSW5kZXggIT09IF9zbGlkZXNBbW91bnQgKSB7XHJcblx0XHQvLyB0aGlzIGlzIG5vdCB0aGUgZmluYWwgc2xpZGUsIHNvIHdlIGNhbiB1c2UgYSB0ZXh0dXJlIHRvIGNyZWF0ZSB0aGUgc3RyaXBlc1xyXG5cdFx0X25leHRCYXNlID0gX3RleHR1cmVzQXJyYXlbX2N1cnJlbnRTbGlkZUluZGV4ICsgMV07XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHRoZSBjdXJyZW50IHNsaWRlIGlzIHRoZSBsYXN0IG9uZSwgZG8gbm90aGluZ1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0LyogIENoZWNrIGlmIHRoZSB0ZXh0dXJlIGZvciB0aGUgY3VycmVudCBpbWFnZSBpcyBsb2FkaW5nIG9yIGZhaWxlZFxyXG5cdCAqICBJbiB0aGF0IGNhc2UgY2FsbCB0aGUgbWV0aG9kIHRvIGNyZWF0ZSB0aGUgc3RyaXBlcyB1c2luZyB0aGUgbmV4dFxyXG5cdCAqIFx0Y29sb3IgaW4gdGhlIGNvbG9ycyBhcnJheSBhbmQgc3RvcCB0aGUgY29kZSBleGVjdXRpb24uXHJcblx0ICogXHRUaGF0IG1ldGhvZCB3aWxsIGNyZWF0ZSB0aGUgZ3JhcGhpY3MgYW5kIGFkZCB0aGVtIHRvIHRoZSBpbml0XHJcblx0ICogXHRzdHJpcGVzIGFycmF5LlxyXG5cdCovXHJcblx0aWYoICFfbmV4dEJhc2UgKXtcclxuXHRcdF9uZXh0QmFzZSA9IG51bGw7XHJcblx0XHQvKiAgZ2V0IHRoZSBuZXh0IGNvbG9yIGluIHRoZSBjb2xvcnMgYXJyYXksIHVzZSB0aGlzIHRvIGNyZWF0ZSB0aGVcclxuXHRcdCAqXHRncmFwaGljcyBzdHJpcGVzLiB0aGUgcGFyYW1zIHBhc3NlZCB0byB0aGUgbWV0aG9kIGFyZSB0aGUgdGFyZ2V0XHJcblx0XHQgKlx0YXJyYXkgYW5kIEhFWCBjb2xvciB1c2VkXHJcblx0XHQqL1xyXG5cdFx0Ly8gY3JlYXRlIHRoZSBncmFwaGljcyBzdHJpcGVzXHJcblx0XHQvLyBjaGVjayBpZiB0aGlzIGlzIG5vdCB0aGUgbGFzdCBzbGlkZVxyXG5cdFx0aWYgKCBfY3VycmVudFNsaWRlSW5kZXggIT09IF9zbGlkZXNBbW91bnQgKSB7XHJcblx0XHRcdC8vIGNoZWNrIGlmIHRoZSBjdXJyZW50IHNsaWRlIGltYWdlIHdhcyBsb2FkZWQgb3Igbm90LCB0aGlzIGlzIHRvIHByZXZlbnRcclxuXHRcdFx0Ly8gdXNpbmcgYSBjb2xvciB0aGF0IHdvbnQgbWF0Y2ggd2l0aCB0aGUgY29sb3IgaW5kZXggYW5kIHRoYXQgY3JlYXRlcyBhIGp1bXBcclxuXHRcdFx0Y29uc3QgX2NvbG9ySW5kZXggPSBfdGV4dHVyZXNBcnJheVtfY3VycmVudFNsaWRlSW5kZXhdID8gX2N1cnJlbnRDb2xvckluZGV4IDogKF9jdXJyZW50Q29sb3JJbmRleCArIDEpO1xyXG5cdFx0XHRfY3JlYXRlR3JhcGhpY1N0cmlwZXMoIF9uZXh0SW5pdEFycmF5LCAyLCBfY29sb3JzQXJyYXlbIF9jb2xvckluZGV4XHRdICk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdC8vIHRoZSBhbmltYXRpb24gdHlwZVxyXG5cdGNvbnN0IHsgX2dlbmVyaWNBbmltYXRpb25UeXBlLCBfc2NhbGVSYXRpbywgcmVhbEhlaWdodCwgcmVhbFdpZHRoIH0gPSBfbmV4dEJhc2U7XHJcblx0Ly8gc2V0IHRoZSB2YXJpYWJsZXMgdXNlZCBpbiB0aGUgY29uZGl0aW9uYWwgc3RhdGVtZW50cyBvZiB0aGUgc3RhcnQgcG9zaXRpb25zXHJcblx0X3JlYWxIZWlnaHQgPSByZWFsSGVpZ2h0O1xyXG5cdF9yZWFsV2lkdGggPSByZWFsV2lkdGg7XHJcblx0X2FuaW1hdGlvblR5cGUgPSBfZ2VuZXJpY0FuaW1hdGlvblR5cGU7XHJcblx0Ly8gdGhlIGltYWdlIGxvYWRlZCwgc2V0IHRoZSBzY2FsZSB1c2luZyB0aGUgdGV4dHVyZVxyXG5cdC8qXHRHZXQgaGUgYW5pbWF0aW9uIHR5cGUgYW5kIHRoZSBzY2FsZSByYXRpbyBmb3IgdGhlIHRleHR1cmUuXHJcblx0XHQqICBVc2luZyB0aGUgYW5pbWF0aW9uIHR5cGUgc2V0IHRoZSBmaW5hbCB2YWx1ZSBvZiB0aGUgc2NhbGUuXHJcblx0XHQqIFx0VGhlIGJhc2UgdGV4dHVyZSBhbHJlYWR5IGhhcyBhIHNjYWxlIHN0b3JlZCBpbiBpdCwgaW4gdGhlIGNhc2Ugb2ZcclxuXHRcdCogXHR2ZXJ0aWNhbCwgaG9yaXpvbnRhbCBvciB6b29tLWluIGFuaW1hdGlvbnMsIHVzZSB0aGF0IHZhbHVlLlxyXG5cdFx0KiBcdENoZWNrIHRoZSBsYXN0IHNwZWNpZmljIGFuaW1hdGlvbiBpbiB0aGUgYW5pbWF0aW9uIHN0b3JlIGFuZCBcclxuXHRcdCogXHRzZXQgdGhlIHN0YXJ0aW5nIHBvaW50cyBhbmQgc2NhbGUgb2YgdGhlIHN0cmlwZXMgYmFzZWQgb24gdGhhdC5cclxuXHQqL1xyXG5cclxuXHQvLyBjb3JyZWN0IHRoZSBhbmltYXRpb24gc2NhbGUgaWYgdGhlIGFuaW1hdGlvbiBpcyB6b29tIG91dCwgY2hlY2sgdGhlXHJcblx0Ly8gYW5pbWF0aW9uIHR5cGUgaW4gdGhlIHRleHR1cmUgYW5kIHRoZSBsYXN0IHpvb20gaW4gdGhlIGFuaW1hdGlvbiBzdG9yZVxyXG5cdF9uZXh0U2NhbGUgPSAoIF9nZW5lcmljQW5pbWF0aW9uVHlwZSA9PT0gMiAmJiB6b29tID09PSAwICkgPyAoIF9zY2FsZVJhdGlvICogMS41ICkgOiBfc2NhbGVSYXRpbztcclxuXHJcblx0LypcdFNFVCBUSEUgU1RBUlRJTkcgUE9TSVRJT05TIE9GIFRIRSBTVFJJUEVTXHJcblx0ICogXHREZXBlbmRpbmcgb24gdGhlIGFuaW1hdGlvbiB0eXBlIGFuZCB0aGUgbGFzdCBhbmltYXRpb24gc2V0IHRoZSBzdGFydFxyXG5cdCAqIFx0dmFsdWVzIGZvciB0aGUgc3RyaXBlcy5cclxuXHQgKiBcdFVzZSB0aGUgc2NhbGVkIGRpbWVuc2lvbnMgb2YgdGhlIHRleHR1cmUgYW5kIHRoZSBzY3JlZW4gc2l6ZSB0byBzZXRcclxuXHQgKiBcdGVhY2ggc3RhcnQgcG9pbnQuXHJcblx0ICogXHREZXBlbmRpbmcgb24gdGhlIGdlbmVyaWMgYW5pbWF0aW9uIHR5cGUgdGhlIGNhbGN1bGF0aW9uIHJlcXVpcmVkIGZvciBlYWNoXHJcblx0ICogXHRzdGFydCBwb2ludC5cclxuXHQqL1xyXG5cdC8qICB1c2UgdGhlIHNjYWxlZCBkaW1lbnNpb25zIG9mIHRoZSBiYXNlIHRleHR1cmUuXHJcblx0XHQqICBUYWtlIHRoZSBuYXR1cmFsIGRpbWVuc2lvbnMgb2YgdGhlIGltYWdlIGFuZCBtdWx0aXBseSB0aGVtIGJ5IHRoZSBzY2FsZVxyXG5cdFx0KiBcdGJlaW5nIHVzZWQgdG8gbWFrZSBpdCBmaXQgdGhlIHNjcmVlbiBpbiBvcmRlciB0byBnZXQgdGhlIHJlYWwgcGFydCBvZlxyXG5cdFx0KiBcdHRoZSBpbWFnZSB2aXNpYmxlIG9uIHRoZSBzY3JlZW4gd2hlbiB0aGUgc3RyaXBlcyBhcmUgbWFkZS5cclxuXHQqL1xyXG5cdC8vIG5vdyBjaGVjayB0aGUgYW5pbWF0aW9uIHR5cGVcclxuXHRpZiAoIF9hbmltYXRpb25UeXBlID09PSAyICkge1xyXG5cdFx0Ly8gdGhlIGFuaW1hdGlvbiB0eXBlIGlzIHpvb21cclxuXHRcdC8vIHVzZSBoYWxmIG9mIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHNjYWxlZCB0ZXh0dXJlIGFuZCB0aGUgc2NyZWVuXHJcblx0XHRfc3RhcnRYID0gKCAoICggcmVhbFdpZHRoICogX25leHRTY2FsZSApIC0gX3N3ICkgLyAyICkgLyBfbmV4dFNjYWxlO1xyXG5cdFx0X3N0YXJ0WSA9ICggKCAoIHJlYWxIZWlnaHQgKiBfbmV4dFNjYWxlICkgLSBfc2ggKSAvIDIgKSAvIF9uZXh0U2NhbGU7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHRoZSBhbmltYXRpb24gdHlwZSBpcyB0cmFuc2xhdGlvbiAoaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbClcclxuXHRcdC8vIHVzZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBzY3JlZW4gYW5kIHRoZSBzY2FsZWQgdGV4dHVyZVxyXG5cdFx0X3N0YXJ0WCA9IGhvcml6b250YWwgPT09IDAgPyAwIDogLSggX3N3IC0gKCByZWFsV2lkdGggKiBfbmV4dFNjYWxlICkgKSAvIF9uZXh0U2NhbGU7XHJcblx0XHRfc3RhcnRZID0gKCAoIHJlYWxIZWlnaHQgKiBfbmV4dFNjYWxlICkgLSBfc2ggKSAvIF9uZXh0U2NhbGU7XHJcblx0XHQvKlx0Tk9URVxyXG5cdFx0ICogIEluIHRoZSBjYXNlIG9mIHRoZSB0cmFuc2xhdGUgYW5pbWF0aW9uLCBvbmUgb2YgdGhlIGRpbWVuc2lvbnMgd2lsbFxyXG5cdFx0ICogXHRhbHdheXMgbWF0Y2ggdGhlIHNjcmVlbiwgc28gdGhhdCBzdGFydGluZyBwb2ludCB3aWxsIGJlIDAuXHJcblx0XHQgKiBcdEluIHRoZSBob3Jpem9udGFsIGFuaW1hdGlvbiB3ZSBuZWVkIHRvIHNlZSB0aGUgbGFzdCBzcGVjaWZpYyBhbmltYXRpb25cclxuXHRcdCAqIFx0V2hlbiB0aGUgYW5pbWF0aW9uIGlzIGZyb20gMCB0byBhIG5lZ2F0aXZlIHZhbHVlIChsYXN0IHNwZWNpZmljID0gMSlcclxuXHRcdCAqIFx0dGhlIHN0YXJ0IFggcG9pbnQgaXMgMCwgcmVnYXJkbGVzcyBvZiB0aGUgY2FsY3VsYXRpb24uIFdoZW4gdGhlIGFuaW1hdGlvblxyXG5cdFx0ICogXHRpcyBmcm9tIGEgbmVnYXRpdmUgdmFsdWUgdG8gMCAobGFzdCBzcGVjaWZpYyA9IDApLCB0aGUgc3RhcnQgcG9pbnQgaXMgdGhlXHJcblx0XHQgKiBcdGNhbGN1bGF0ZWQgdmFsdWUuXHJcblx0XHQgKiBcdFdoZW4gdGhlIGFuaW1hdGlvbiBpcyB2ZXJ0aWNhbCwgc2luY2UgdGhlcmUncyBubyBzcGVjZmljIHR5cGVzIGZvciB0aGlzLCB1c2VcclxuXHRcdCAqIFx0YWx3YXlzIHRoZSBjYWxjdWxhdGVkIHZhbHVlLiBJbiB0aGUgY2FzZSBvZiBhIGhvcml6b250YWwgYW5pbWF0aW9uLCB0aGUgXHJcblx0XHQgKiBcdHNjYWxlZCBoZWlnaHQgaXMgZXF1YWwgdG8gdGhlIHNjcmVlbiBoZWlnaHQgc28gaXQncyBhbHdheXMgMC5cclxuXHRcdCovXHJcblx0fVxyXG5cclxuXHJcblx0Ly8gc2V0IHRoZSByZWFsIGRpbWVuc2lvbnMgb2YgdGhlIHN0cmlwZXMgY29uc2lkZXJpbmcgdGhlIHNjYWxlIGFwcGxpZWQgdG8gdGhlXHJcblx0Ly8gc3RyZWN0aGVkIGltYWdlLlxyXG5cdC8vIF9yZWFsU3RyaXBlSGVpZ2h0ID0gcGFyc2VGbG9hdCgoX3N0cmlwZUhlaWdodCAvIF9uZXh0U2NhbGUpLnRvRml4ZWQoNCkpO1xyXG5cdC8vIGNvcnJlY3RlZCB3aWR0aC4gdGhlIGltYWdlIGFuaW1hdGlvbiBpcyB2ZXJ0aWNhbCBzbyBpdCBmaXRzIHRoZSBzY3JlZW4gd2lkdGhcclxuXHQvLyBfcmVhbFN0cmlwZVdpZHRoID0gcGFyc2VGbG9hdCgod2luU2l6ZS53IC8gX25leHRTY2FsZSkudG9GaXhlZCg0KSk7XHJcblxyXG5cdC8qIEZST00gVkVSU0lPTiAyLjIuNFxyXG5cdCAqIHRoZSBmaW5hbCBzdHJpcGUgaGVpZ2h0IHdpbGwgYmUgYW4gaW50ZWdlciwgdGhlcmUncyBubyBuZWVkIHRvIGNvcnJlY3RcclxuXHQgKiB0aGUgZGltZW5zaW9ucyB1c2luZyB0b0ZpeGVkKCkgYW55bW9yZS5cclxuXHQqL1xyXG5cdC8vIGNvcnJlY3RlZCBoZWlnaHRcclxuXHRfcmVhbFN0cmlwZUhlaWdodCA9ICggX3N0cmlwZUhlaWdodCAvIF9uZXh0U2NhbGUgKTtcclxuXHQvLyBzZXQgdGhlIGNvcnJlY3RlZCBoZWlnaHQgcmVtaW5kZXIgZm9yIHRoZSBsYXN0IHN0cmlwZVxyXG5cdF9yZWFsSGVpZ2h0UmVtaW5kZXIgPSAoIF9oZWlnaHRSZW1pbmRlciAvIF9uZXh0U2NhbGUgKTtcclxuXHQvLyBjb3JyZWN0ZWQgd2lkdGhcclxuXHRfcmVhbFN0cmlwZVdpZHRoID0gKCB3aW5TaXplLncgLyBfbmV4dFNjYWxlICk7XHJcblx0XHJcblx0Ly8gY2hlY2sgaWYgdGhlIGhlaWdodCBvZiB0aGUgZmluYWwgc3RyaXBlIGlzIGJpZ2dlciB0aGFuIHRoZSB0ZXh0dXJlJ3MgaGVpZ2h0XHJcblx0LyogY29uc3QgX2ZpbmFsRnJhbWVIZWlnaHQgPSBfc3RhcnRZICsgKCBfcmVhbFN0cmlwZUhlaWdodCAqIChfc3RyaXBlc0Ftb3VudCAtIDEpICk7XHJcblx0aWYgKCBfZmluYWxGcmFtZUhlaWdodCArIF9yZWFsSGVpZ2h0UmVtaW5kZXIgPiByZWFsSGVpZ2h0ICkge1xyXG5cdFx0Y29uc29sZS5sb2coIFwiZnJhbWUgSEVJR0hUIGNvcnJlY3Rpb25cIiApO1xyXG5cdFx0Y29uc29sZS5sb2coIF9maW5hbEZyYW1lSGVpZ2h0ICsgX3JlYWxIZWlnaHRSZW1pbmRlciwgcmVhbEhlaWdodCApO1xyXG5cdFx0X3JlYWxIZWlnaHRSZW1pbmRlciA9IHJlYWxIZWlnaHQgLSBfZmluYWxGcmFtZUhlaWdodDtcclxuXHR9ICovXHJcblx0XHJcblx0Ly8gY2hlY2sgaWYgdGhlIHJlYWwgc3RyaXBlIHdpZHRoIGhhcyB0byBiZSBjb3JyZWN0ZWRcclxuXHRpZiAoICggX3N0YXJ0WCArIF9yZWFsU3RyaXBlV2lkdGggKSA+IF9yZWFsV2lkdGggKSB7XHJcblx0XHRjb25zb2xlLmxvZyggXCJmcmFtZSB3aWR0aCBjb3JyZWN0aW9uXCIgKTtcclxuXHRcdGNvbnNvbGUubG9nKCBfc3RhcnRYICsgX3JlYWxTdHJpcGVXaWR0aCwgcmVhbFdpZHRoICk7XHJcblx0XHRfcmVhbFN0cmlwZVdpZHRoID0gX3JlYWxXaWR0aCAtIF9zdGFydFg7XHJcblx0fTtcclxuXHJcblxyXG5cclxuXHQvLyBsb29wIHRvIGNyZWF0ZSB0aGUgc3RyaXBlc1xyXG5cdGZvciggbGV0IGkgPSAwOyBpIDwgX3N0cmlwZXNBbW91bnQ7IGkrKyApIHtcclxuXHRcdC8vIHRoZSBjYWxjdWxhdGVkIGZyYW1lIHN0YXJ0IFkgcG9pbnRcclxuXHRcdGxldCBfZnJhbWVTdGFydFkgPSAoX3N0YXJ0WSArIF9yZWFsU3RyaXBlSGVpZ2h0ICogaSk7XHJcblx0XHQvLyBGUk9NIFZFUlNJT04gMi4yLjRcclxuXHRcdC8vIHRoZSBzdGFydCB5IHBvaW50IGRvZXNuJ3QgbmVlZCBjb3JyZWN0aW9uXHJcblx0XHQvLyBjaGVjayBpZiB0aGUgc3RhcnQgWSBwb2ludCBoYXMgdG8gYmUgY29ycmVjdGVkXHJcblx0XHQvLyBfZnJhbWVTdGFydFkgPSAoIF9mcmFtZVN0YXJ0WSArIF9yZWFsU3RyaXBlSGVpZ2h0ICkgPiBfcmVhbEhlaWdodCA/ICggX3JlYWxIZWlnaHQgLSBfcmVhbFN0cmlwZUhlaWdodCApIDogX2ZyYW1lU3RhcnRZO1xyXG5cdFx0XHJcblx0XHQvLyBjcmVhdGUgdGhlIGZyYW1lIG9mIHRoZSBzdHJpcGVzXHJcblx0XHRjb25zdCBfbmV3RnJhbWUgPSBuZXcgUElYSS5SZWN0YW5nbGUoXHJcblx0XHRcdF9zdGFydFgsIF9mcmFtZVN0YXJ0WSxcclxuXHRcdFx0Ly8gaW4gdGhlIGZpbmFsIHN0cmlwZSB1c2UgdGhlIHJlbWluZGVyIGhlaWdodCBhbmQgbm90IHRoZSByZWd1bGFyIGhlaWdodFxyXG5cdFx0XHRfcmVhbFN0cmlwZVdpZHRoLCBpIDwgKF9zdHJpcGVzQW1vdW50IC0gMSkgPyBfcmVhbFN0cmlwZUhlaWdodCA6IF9yZWFsSGVpZ2h0UmVtaW5kZXJcclxuXHRcdCk7XHJcblx0XHQvLyBjcmVhdGUgdGhlIHRleHR1cmVcclxuXHRcdGNvbnN0IF9uZXdUZXh0dXJlID0gbmV3IFBJWEkuVGV4dHVyZSggX25leHRCYXNlLCBfbmV3RnJhbWUgKTtcclxuXHRcdC8vIGNyZWF0ZSB0aGUgbmV3IHNwcml0ZSBvYmplY3RcclxuXHRcdGNvbnN0IF9uZXdTdHJpcGUgPSBuZXcgUElYSS5TcHJpdGUoIF9uZXdUZXh0dXJlICk7XHJcblx0XHQvLyBhZGQgdGhlIHN0cmlwZSB0byB0aGUgaW5pdCBhcnJheVxyXG5cdFx0X25leHRJbml0QXJyYXkucHVzaCggX25ld1N0cmlwZSApO1xyXG5cdFx0Ly8gcG9zaXRpb24gdGhlIHN0cmlwZVxyXG5cdFx0X25ld1N0cmlwZS54ID0gd2luU2l6ZS53O1xyXG5cdFx0X25ld1N0cmlwZS55ID0gX3N0cmlwZUhlaWdodCAqIGk7XHJcblx0XHQvLyBzY2FsZSB0aGUgc3RyaXBlXHJcblx0XHRfbmV3U3RyaXBlLnNjYWxlLnNldCggX25leHRTY2FsZSApO1xyXG5cdFx0Ly8gYWRkIHRoZSBzdHJpcGUgdG8gdGhlIHN0YWdlXHJcblx0XHQvLyBfbWFpblJlbmRlci5zdGFnZS5hZGRDaGlsZCggX25ld1N0cmlwZSApO1xyXG5cdFx0X3N0cmlwZXNTdGFnZS5hZGRDaGlsZCggX25ld1N0cmlwZSApO1xyXG5cdH0gLy8gc3RyaXBlcyBsb29wIGVuZFxyXG5cclxufTsgLy8gbmV4dCBpbml0IHN0cmlwZXNcclxuIiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBQSVhJIFJFTkRFUkVSIE1PRFVMRVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcbi8qICBcclxuICogIFxyXG4gKi9cclxuXHJcbi8qIElNUE9SVFMgKi9cclxuaW1wb3J0IHsgd2luU2l6ZSB9IGZyb20gXCIuL3dpbmRvd1wiO1xyXG4vLyBnZXQgaW50ZXJhY3Rpb24gaGFuZGxlciBtZXRob2RcclxuaW1wb3J0IHsgX2F0dGFjaEludGVyYWN0aW9uSGFuZGxlcnMgfSBmcm9tIFwiLi9pbnRlcmFjdGlvbi1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBjb2xvciByb3RhdGlvbiBtZXRob2RcclxuaW1wb3J0IHsgX2NvbG9yc0FycmF5LCBfY3VycmVudENvbG9ySW5kZXggfSBmcm9tIFwiLi90ZXh0dXJlc1wiO1xyXG4vLyBnZXQgdGhlIGxvYWRlciBtZXRob2RzXHJcbmltcG9ydCB7IF9jcmVhdGVMb2FkZXIgfSBmcm9tIFwiLi9sb2FkZXJcIjtcclxuXHJcbi8vIG1haW4gcmVuZGVyIHZhcmlhYmxlXHJcbmV4cG9ydCBsZXQgX21haW5SZW5kZXI7XHJcbi8vIHRoZSBiYXNlIHRleHR1cmUgZm9yIHRoZSBzbGlkZXMuIHRoaXMgaXMgdGFrZW4gZnJvbSB0aGUgZ3JhcGhpY1xyXG4vLyBlbGVtZW50LlxyXG5leHBvcnQgbGV0IF9iYXNlU3ByaXRlVGV4dHVyZTtcclxuXHJcbi8vIHRoZSBncmFwaGljIHVzZWQgdG8gY3JlYXRlIHRoZSBiYXNlIHRleHR1cmVcclxuZXhwb3J0IGxldCBfYmFzZUdyYXBoO1xyXG5cclxuLy8gYWRkIGEgbmV3IGNvbnRhaW5lciB0byBzdG9yZSB0aGUgbG9nb1xyXG4vLyB0aGlzIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlIGxvZ28gZnJvbSBnZXR0aW5nIGJlaGluZCB0aGUgc3RyaXBlcyB3aGVuIHRoZXlcclxuLy8gYXJlIGFkZGVkIG9uIHRoZSB1c2VyIGludGVyYWN0aW9uXHJcbmV4cG9ydCBjb25zdCBfbG9nb1N0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcblxyXG4vLyB0aGUgc3RyaXBlcyBjb250YWluZXIsIHRoaXMgc2hvdWxkIGJlIGFkZGVkIGJlZm9yZSB0aGUgbG9nbyBjb250YWluZXJcclxuLy8gaW4gb3JkZXIgdG8ga2VlcCB0aGUgbG9nbyBhYm92ZSB0aGUgc3RyaXBlcyBhbGwgdGhlIHRpbWVcclxuZXhwb3J0IGNvbnN0IF9zdHJpcGVzU3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHJcbi8vIHRoZSB0ZXh0IHN0YWdlIGNvbnRhaW5lclxyXG5leHBvcnQgY29uc3QgX3RleHRTdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG5cclxuLy8gdGhlIGZlZWQgY29udGFpbmVyXHJcbmV4cG9ydCBjb25zdCBfcHJvbXB0U3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHJcbi8qICBwcml2YXRlIG1ldGhvZCB0byBjcmVhdGUgdGhlIGluaXRpYWwgc3ByaXRlIGZvcm0gYSBncmFwaGljXHJcbiAqXHRhZnRlciB0aGUgc3ByaXRlIGlzIGNyZWF0ZWQgYW5kIGFkZGVkIHRvIHRoZSByZW5kZXJlciB0aGVcclxuICpcdGdyYXBoaWMgaXMgcmVtb3ZlZFxyXG4qL1xyXG5jb25zdCBfY3JlYXRlQmFzZVNwcml0ZSA9IChjKSA9PiB7XHJcblx0Ly8gY3JlYXRlIHRoZSBncmFwaGljIGVsZW1lbnRcclxuXHRfYmFzZUdyYXBoID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuXHRfYmFzZUdyYXBoXHJcblx0XHQuYmVnaW5GaWxsKCBjIHx8IDB4RkZGRkZGLCAxIClcclxuXHRcdC5kcmF3UmVjdCgwLCAwLCB3aW5TaXplLncsIHdpblNpemUuaClcclxuXHRcdC5lbmRGaWxsKCk7XHJcblxyXG5cdC8vIGNyZWF0ZSB0ZXh0dXJlICh0aGlzIGlzIGEgcGl4aSB0ZXh0dXJlIG5vdCBhIGJhc2UgdGV4dHVyZSlcclxuXHRfYmFzZVNwcml0ZVRleHR1cmUgPSBfbWFpblJlbmRlci5yZW5kZXJlci5nZW5lcmF0ZVRleHR1cmUoX2Jhc2VHcmFwaCk7XHJcbn07XHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byB1cGRhdGUgdGhlIGNvbG9yIG9mIHRoZSBsb2FkaW5nIHRleHR1cmUuXHRcclxuICogIFxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3VwZGF0ZUJhc2VDb2xvciA9ICgpID0+IHtcclxuXHQvLyBzZXQgdGhlIG5ldyB0aW50IG9mIHRoZSBncmFwaGljc1xyXG5cdF9jcmVhdGVCYXNlU3ByaXRlKCBfY29sb3JzQXJyYXlbX2N1cnJlbnRDb2xvckluZGV4XSApO1xyXG5cdC8vIHVwZGF0ZSB0aGUgYmFzZSBzcHJpdGUgdGV4dHVyZVxyXG5cdF9iYXNlU3ByaXRlVGV4dHVyZSA9IF9tYWluUmVuZGVyLnJlbmRlcmVyLmdlbmVyYXRlVGV4dHVyZShfYmFzZUdyYXBoKTtcclxuXHQvLyB1cGRhdGUgdGhlIHRleHR1cmVcclxuXHQvLyBfbWFpblNsaWRlLnRleHR1cmUgPSBfYmFzZVNwcml0ZVRleHR1cmU7XHJcbn07XHJcblxyXG5cclxuLyogR0VORVJBTCBNRVRIT0QgVE8gQ1JFQVRFIFRIRSBQSVhJIFJFTkRFUkVSICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVSZW5kZXJlciA9IChpZCkgPT4ge1xyXG5cclxuXHQvLyB0aGUgcmVuZGVyZXIgbXVzdCBnbyBpbiBhbiBleGlzdGluZyBjYW52YXMgZWxlbWVudFxyXG5cdC8vIGNvbnN0IF9yZW5kZXJUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tcmVuZGVyXCIpO1xyXG5cdFxyXG5cdF9tYWluUmVuZGVyID0gbmV3IFBJWEkuQXBwbGljYXRpb24od2luU2l6ZS53LCB3aW5TaXplLmgsIHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogMHgwMDA1MWIsXHJcblx0XHRmb3JjZUNhbnZhczogdHJ1ZSxcclxuXHRcdC8vIHZpZXc6IF9yZW5kZXJUYXJnZXQsXHJcblx0XHR2aWV3OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCksXHJcblx0XHRhdXRvUmVzaXplOiB0cnVlLFxyXG5cdFx0cmVzb2x1dGlvbjogKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpXHJcblx0fSk7XHJcblxyXG5cdC8vIGFmdGVyIGNyZWF0aW5nIHRoZSBtYWluIHJlbmRlcmVyLCBjcmVhdGUgdGhlIGxvYWRlciBhbmltYXRpb25cclxuXHRfY3JlYXRlTG9hZGVyKCk7XHJcblxyXG5cdC8qICBDcmVhdGUgdGhlIGJhc2UgZ3JhcGhpYyB1c2luZyB0aGUgZmlyc3QgY29sb3Igb2YgdGhlIGNvbG9ycyBhcnJheS5cclxuXHQgKiAgSW4gdGhlIHRvdWNoIHN0YXJ0IGV2ZW50LCBpZiB0aGUgY3VycmVudCBzbGlkZSBpcyBub3QgbG9hZGVkLCBjcmVhdGUgdGhlXHJcblx0ICogXHRzdHJpcGVzIHdpdGggdGhlIGN1cnJlbnQgY29sb3IuIElmIHRoZSBuZXh0IHNsaWRlIGlzIG5vdCBsb2FkZWQgdXNlIHRoZVxyXG5cdCAqIFx0bmV4dCBjb2xvci5cclxuXHQqL1xyXG5cdF9jcmVhdGVCYXNlU3ByaXRlKCBfY29sb3JzQXJyYXlbX2N1cnJlbnRDb2xvckluZGV4XSApO1xyXG5cdC8vIHNldCB0aGUgcmVuZGVyZXIgc3RhZ2UgYXMgaW50ZXJhY3RpdmVcclxuXHRfbWFpblJlbmRlci5zdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcblx0Ly8gYXR0YWNoIHRoZSBldmVudCBoYW5kbGVycyB0byB0aGUgc3RhZ2VcclxuXHRfYXR0YWNoSW50ZXJhY3Rpb25IYW5kbGVycyhfbWFpblJlbmRlci5zdGFnZSk7XHJcbn07XHJcblxyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogIFBSRVZJT1VTIFNUUklQRVMgTU9EVUxFXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuLy8gdGhpcyBtb2R1bGUgaGFzIHRoZSBjb2RlIHRvIGNyZWF0ZSB0aGUgc3RyaXBlcyBmb3IgdGhlIHByZXZpb3VzIGltYWdlXHJcbi8vIGhhcyB0aGUgYXJyYXlzIHRvIGhvbGQgdGhlIHN0cmlwZXMgYXMgcmVmZXJlbmNlcyBhbmQgdG8gZHJhZy9hbmltYXRlXHJcblxyXG4vLyBUaGUgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgcHJldmlvdXMgc2xpZGUgaW1hZ2UgaXMgYWx3YXlzICgwLDApLCBzbyB3ZSBkb24ndFxyXG4vLyBuZWVkIHRvIGNhbGN1bGF0ZSB0aGF0LlxyXG4vLyBXZSBnZXQgdGhlIG5leHQgYmFzZSB0ZXh0dXJlIChkZXBlbmRpbmcgb24gdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXgsIGlmIHRoZVxyXG4vLyBjdXJyZW50IHNsaWRlIGlzIHRoZSBmaXJzdCBvZiB0aGUgZ3JvdXAgd2UgZG9uJ3QgY3JlYXRlIHRoZSBuZXh0IHN0cmlwZXMpIGFuZFxyXG4vLyBpdCdzIGRpbWVuc2lvbnMsIHRoZW4gdXNpbmcgdGhlIHNjcmVlbiBzaXplIGdldCB0aGUgc2NhbGUgcmF0aW8sIHNldCB0aGVcclxuLy8gc3RyaXBlcyBhbmQgaXQncyB0ZXh0dXJlJ3MgZGltZW5zaW9ucywgYWRkIHRoZW0gdG8gdGhlIHN0YWdlLCB0aGUgcmVmZXJlbmNlXHJcbi8vIGFycmF5IGFuZCBmaW5hbGx5IHNldCB0aGUgZHJhZy9hbmltYXRpb24gb3JkZXIuXHJcblxyXG4vLyBnZXQgdGhlIHNjcmVlbiBkaW1lbnNpb25zXHJcbmltcG9ydCB7IHdpblNpemUsIF9zdHJpcGVIZWlnaHQsIF9oZWlnaHRSZW1pbmRlciB9IGZyb20gXCIuL3dpbmRvd1wiO1xyXG4vLyBnZXQgdGhlIG1haW4gcmVuZGVyZXIgYW5kIHRoZSBsb2FkaW5nIGJhc2UgdGV4dHVyZVxyXG5pbXBvcnQgeyBfc3RyaXBlc1N0YWdlIH0gZnJvbSBcIi4vcGl4aS1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSBzdHJpcGVzIGFtb3VudCwgbWlkZGxlIGFuZCBtZXRob2QgdG8gc2V0IHRoZSBpbmRleCB2YWx1ZVxyXG5pbXBvcnQgeyBfc3RyaXBlc0Ftb3VudCwgX3ByZXZpb3VzSW5pdEFycmF5IH0gZnJvbSBcIi4vc3RyaXBlcy1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSBtZXRob2QgdG8gY3JlYXRlIGdyYXBoaWMgc3RpcGVzXHJcbmltcG9ydCB7IF9jcmVhdGVHcmFwaGljU3RyaXBlcyB9IGZyb20gXCIuL3N0cmlwZXNcIjtcclxuLy8gZ2V0IHRoZSBjdXJyZW50IHNsaWRlIGluZGV4XHJcbmltcG9ydCB7IF9jdXJyZW50U2xpZGVJbmRleCB9IGZyb20gXCIuL3NsaWRlLWNoYW5nZS1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSB0ZXh0dXJlcyBhcnJheVxyXG5pbXBvcnQgeyBfdGV4dHVyZXNBcnJheSB9IGZyb20gXCIuL3RleHR1cmVzLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIGN1cnJlbnQgY29sb3IgYXJyYXkgaW5kZXhcclxuaW1wb3J0IHsgX2NvbG9yc0FycmF5LCBfY3VycmVudENvbG9ySW5kZXggfSBmcm9tIFwiLi90ZXh0dXJlc1wiO1xyXG4vLyBnZXQgdGhlIGFuaW1hdGlvbiBzdG9yZVxyXG5pbXBvcnQgeyBfYW5pbWF0aW9uU3RvcmUgfSBmcm9tIFwiLi9hbmltYXRpb24vYW5pbWF0aW9uLXN0b3JlXCI7XHJcblxyXG4vLyB0aGUgc2NhbGUgb2YgdGhlIG5leHQgc2xpZGUncyBpbWFnZVxyXG5sZXQgX3ByZXZpb3VzU2NhbGUgPSBudWxsO1xyXG5cclxuLyoqIE1ldGhvZCB0byBjcmVhdGUgdGhlIHByZXZpb3VzIHN0cmlwZXMuXHRcclxuICogIENyZWF0ZXMgdGhlIHN0cmlwZXMgYW5kIGFkZHMgdGhlbSB0byB0aGUgbWFpbiByZW5kZXJlcidzIHN0YWdlLlx0XHJcbiAqIFx0QWRkcyB0aGUgc3RyaXBlcyB0byB0aGUgcmVmZXJlbmNlIGFycmF5IChpbml0IGFycmF5KS5cclxuKi9cclxuZXhwb3J0IGNvbnN0IF9wcmV2aW91c0luaXRTdHJpcGVzID0gKCkgPT4ge1xyXG5cdC8vIHNldCB0aGUgYmFzZSB0ZXh0dXJlIGZvciB0aGUgc3RyaXBlc1xyXG5cdGxldCBfcHJldkJhc2UsIF9hbmltYXRpb25UeXBlO1xyXG5cdGNvbnN0IHsgaG9yaXpvbnRhbCwgem9vbSB9ID0gX2FuaW1hdGlvblN0b3JlLmxhc3RTcGVjaWZpYztcclxuXHQvKlx0Y2hlY2sgaWYgdGhpcyBpcyB0aGUgZmlyc3Qgc2xpZGUgb24gdGhlIGdyb3VwXHRcclxuXHQgKiAgd2UgZG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBpcyB0aGUgZmlyc3Qgc2xpZGUgaW4gdGhlIGdyb3VwLFxyXG5cdCAqIFx0YmVjYXVzZSB3ZSdsbCBhbmltYXRlLW91dCB0aGUgY3VycmVudCBzdHJpcGVzIGFuZCB0aGF0IGFuaW1hdGlvblxyXG5cdCAqIFx0d2lsbCBjcmVhdGUgdGhlIGZlZWxpbmcgdGhhdCB3ZSdyZSBhbmltYXRpbmcgdGhlIHByZXZpb3VzIHN0cmlwZXMuXHJcblx0Ki9cclxuXHRcclxuXHRpZiAoX2N1cnJlbnRTbGlkZUluZGV4ICE9PSAwKSB7XHJcblx0XHQvLyB0aGlzIGlzIG5vdCB0aGUgZmlyc3Qgc2xpZGUsIGdldCB0aGUgdGV4dHVyZSBmb3IgdGhlIHByZXZpb3VzXHJcblx0XHQvLyBmcm9tIHRoZSBhcnJheVxyXG5cdFx0X3ByZXZCYXNlID0gX3RleHR1cmVzQXJyYXlbX2N1cnJlbnRTbGlkZUluZGV4IC0gMV07XHJcblx0fSAvLyBpbmRleCBjb25kaXRpb25hbCBlbmRcclxuXHQvLyBjaGVjayBpZiB0aGUgdGV4dHVyZSBoYXMgYmVlbiBsb2FkZWQgKG9iamVjdCkgb3Igbm90XHJcblx0Ly8gKGZhbHNlIG9yIG51bGwpIHRvIHNldCB0aGUgc2NhbGUgcmF0aW8gZm9yIHRoZSBzdHJpcGVzXHJcblx0aWYgKF9wcmV2QmFzZSkge1xyXG5cdFx0Ly8gdGhlIGltYWdlIGhhcyBiZWVuIGxvYWRlZCwgd2UgbmVlZCB0byBzZXQgdGhlIHNjYWxlIGZvciB0aGUgc3RyaXBlc1xyXG5cdFx0Ly8gX3ByZXZpb3VzU2NhbGUgPSBfc2V0VGV4dHVyZVNjYWxlKF9wcmV2QmFzZSk7XHJcblxyXG5cclxuXHRcdC8vIHRoZSBhbmltYXRpb24gdHlwZVxyXG5cdFx0Y29uc3QgeyBfZ2VuZXJpY0FuaW1hdGlvblR5cGUsIF9zY2FsZVJhdGlvIH0gPSBfcHJldkJhc2U7XHJcblx0XHRfYW5pbWF0aW9uVHlwZSA9IF9nZW5lcmljQW5pbWF0aW9uVHlwZTtcclxuXHRcdC8qXHRHZXQgaGUgYW5pbWF0aW9uIHR5cGUgYW5kIHRoZSBzY2FsZSByYXRpbyBmb3IgdGhlIHRleHR1cmUuXHJcblx0XHQgKiAgVXNpbmcgdGhlIGFuaW1hdGlvbiB0eXBlIHNldCB0aGUgZmluYWwgdmFsdWUgb2YgdGhlIHNjYWxlLlxyXG5cdFx0ICogXHRUaGUgYmFzZSB0ZXh0dXJlIGFscmVhZHkgaGFzIGEgc2NhbGUgc3RvcmVkIGluIGl0LCBpbiB0aGUgY2FzZSBvZlxyXG5cdFx0ICogXHR2ZXJ0aWNhbCwgaG9yaXpvbnRhbCBvciB6b29tLWluIGFuaW1hdGlvbnMsIHVzZSB0aGF0IHZhbHVlLlxyXG5cdFx0ICogXHRDaGVjayB0aGUgbGFzdCBzcGVjaWZpYyBhbmltYXRpb24gaW4gdGhlIGFuaW1hdGlvbiBzdG9yZSBhbmQgXHJcblx0XHQgKiBcdHNldCB0aGUgc3RhcnRpbmcgcG9pbnRzIGFuZCBzY2FsZSBvZiB0aGUgc3RyaXBlcyBiYXNlZCBvbiB0aGF0LlxyXG5cdFx0Ki9cclxuXHRcdC8vIGNvcnJlY3QgdGhlIGFuaW1hdGlvbiBzY2FsZSBpZiB0aGUgYW5pbWF0aW9uIGlzIHpvb20gb3V0LCBjaGVjayB0aGVcclxuXHRcdC8vIGFuaW1hdGlvbiB0eXBlIGluIHRoZSB0ZXh0dXJlIGFuZCB0aGUgbGFzdCB6b29tIGluIHRoZSBhbmltYXRpb24gc3RvcmVcclxuXHRcdF9wcmV2aW91c1NjYWxlID0gKF9nZW5lcmljQW5pbWF0aW9uVHlwZSA9PT0gMiAmJiB6b29tID09PSAwKSA/IChfc2NhbGVSYXRpbyAqIDEuNSkgOiBfc2NhbGVSYXRpbztcclxuXHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHRoZSBzbGlkZSBpbWFnZSBpcyBub3QgbG9hZGVkIG9yIGZhaWxlZFxyXG5cdFx0Ly8gY3JlYXRlIGdyYXBoaWMgc3RyaXBlc1xyXG5cdFx0X3ByZXZCYXNlID0gbnVsbDtcclxuXHRcdC8vIGNoZWNrIGlmIHRoaXMgaXMgbm90IHRoZSBmaXJzdCBzbGlkZVxyXG5cdFx0aWYgKCBfY3VycmVudFNsaWRlSW5kZXggIT09IDAgKSB7XHJcblx0XHRcdC8vIGNoZWNrIGlmIHRoZSBjdXJyZW50IHNsaWRlIGltYWdlIHdhcyBsb2FkZWQgb3Igbm90LCB0aGlzIGlzIHRvIHByZXZlbnRcclxuXHRcdFx0Ly8gdXNpbmcgYSBjb2xvciB0aGF0IHdvbnQgbWF0Y2ggd2l0aCB0aGUgY29sb3IgaW5kZXggYW5kIHRoYXQgY3JlYXRlcyBhIGp1bXBcclxuXHRcdFx0Y29uc3QgX2NvbG9ySW5kZXggPSBfdGV4dHVyZXNBcnJheVtfY3VycmVudFNsaWRlSW5kZXhdID8gX2N1cnJlbnRDb2xvckluZGV4IDogKF9jdXJyZW50Q29sb3JJbmRleCArIDEpO1xyXG5cdFx0XHRfY3JlYXRlR3JhcGhpY1N0cmlwZXMoIF9wcmV2aW91c0luaXRBcnJheSwgMSwgX2NvbG9yc0FycmF5WyBfY29sb3JJbmRleFx0XSApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuO1xyXG5cdH0gLy8gc2xpZGUgaW5kZXggY29uZGl0aW9uYWxcclxuXHJcblx0Y29uc3QgeyByZWFsSGVpZ2h0LCByZWFsV2lkdGggfSA9IF9wcmV2QmFzZTtcclxuXHQvKlx0aWYgdGhpcyBpcyB0aGUgZmlyc3Qgc2xpZGUgb2YgdGhlIGdyb3VwLCB3ZSBkb24ndCBjcmVhdGUgYW55dGhpbmdcclxuXHQgKlx0aW4gdGhpcyBjYXNlIHdlIGRvbid0IGNyZWF0ZSBhbmltYXRpb25zIGZvciB0aGUgcHJldmlvdXMgc2xpZGUsIGp1c3QgdGhlIGN1cnJlbnQgb25lXHJcblx0ICpcdHRvIGF2b2lkIHVzaW5nIGV4dHJhIG1lbW9yeSwgYmVjYXVzZSB0aGUgY3VycmVudCBzdHJpcGVzIHdpbGwgcmV2ZWFsIHRoZSBiYWNrZ3JvdW5kXHJcblx0ICpcdGNvbG9yIHdoaWNoIHdpbGwgc2ltdWxhdGUgdGhlIHByZXZpb3VzIHN0cmlwZXMgYmVpbmcgYW5pbWF0ZWQtaW4uXHJcblx0ICpcdFRoZSBwb3NpdGlvbiBvZiB0aGUgcHJldmlvdXMgc2xpZGUgaW1hZ2UgIHdpbGwgYWx3YXlzIGJlIHRoZSBzYW1lICgwLDApXHJcblx0ICpcdHdlIGRvbid0IHNldCB0aGUgcG9zaXRpb24gaW4gdmFyaWFibGVzLiBUaGUgc3RhcnQgWCBwb3NpdGlvbiB3aWxsIGJlIDAgZm9yIGFsbFxyXG5cdCAqXHR0aGUgc3RyaXBlcywgd2hpbGUgdGhlIFkgcG9zaXRpb24gd2lsbCBjaGFuZ2UgZGVwZW5kaW5nIG9uIHRoZSBzdHJpcGUgbnVtYmVyKGxvb3AgY291bnQpLlxyXG5cdCAqXHR3aXRoIHRoZSBzY2FsZSByYXRpbywgc2V0IHRoZSByZWFsIGRpbWVuc2lvbnMgb2YgdGhlIHN0cmlwZXNcclxuXHQgKlx0Y29ycmVjdGVkIGhlaWdodCBvZiB0aGUgc3RyaXBlXHJcblx0Ki9cclxuXHJcblx0LyogRlJPTSBWRVJTSU9OIDIuMi40XHJcblx0ICogdGhlIGZpbmFsIHN0cmlwZSBoZWlnaHQgd2lsbCBiZSBhbiBpbnRlZ2VyLCB0aGVyZSdzIG5vIG5lZWQgdG8gY29ycmVjdFxyXG5cdCAqIHRoZSBkaW1lbnNpb25zIHVzaW5nIHRvRml4ZWQoKSBhbnltb3JlLlxyXG5cdCovXHJcblx0Ly8gY29ycmVjdGVkIGhlaWdodFxyXG5cdGxldCBfcmVhbFN0cmlwZUhlaWdodCA9ICggX3N0cmlwZUhlaWdodCAvIF9wcmV2aW91c1NjYWxlICk7XHJcblx0Ly8gc2V0IHRoZSBjb3JyZWN0ZWQgaGVpZ2h0IHJlbWluZGVyIGZvciB0aGUgbGFzdCBzdHJpcGVcclxuXHRsZXQgX3JlYWxIZWlnaFJlbWluZGVyID0gKCBfaGVpZ2h0UmVtaW5kZXIgLyBfcHJldmlvdXNTY2FsZSApO1xyXG5cdC8vIGNvcnJlY3RlZCB3aWR0aFxyXG5cdGxldCBfcmVhbFN0cmlwZVdpZHRoID0gKCB3aW5TaXplLncgLyBfcHJldmlvdXNTY2FsZSApO1xyXG5cclxuXHJcblxyXG5cdC8qKiBTRVQgVEhFIFNUQVJUSU5HIFBPU0lUSU9OUyBPRiBUSEUgU1RSSVBFU1xyXG5cdCAqICBEZXBlbmRpbmcgb24gdGhlIGFuaW1hdGlvbiB0eXBlIGFuZCB0aGUgbGFzdCBhbmltYXRpb24gc2V0IHRoZSBzdGFydFxyXG5cdCAqIFx0dmFsdWVzIGZvciB0aGUgc3RyaXBlcy5cclxuXHQgKiBcdFVzZSB0aGUgc2NhbGVkIGRpbWVuc2lvbnMgb2YgdGhlIHRleHR1cmUgYW5kIHRoZSBzY3JlZW4gc2l6ZSB0byBzZXRcclxuXHQgKiBcdGVhY2ggc3RhcnQgcG9pbnQuXHJcblx0ICogXHREZXBlbmRpbmcgb24gdGhlIGdlbmVyaWMgYW5pbWF0aW9uIHR5cGUgdGhlIGNhbGN1bGF0aW9uIHJlcXVpcmVkIGZvciBlYWNoXHJcblx0ICogXHRzdGFydCBwb2ludC5cclxuXHQqL1xyXG5cdGxldCBfc3RhcnRYLCBfc3RhcnRZO1xyXG5cdC8vIGdldCB0aGUgc2NyZWVuIGRpbWVuc2lvbnNcclxuXHRjb25zdCB7dzpfc3csIGg6X3NoIH0gPSB3aW5TaXplO1xyXG5cdC8vIHVzZSB0aGUgc2NhbGVkIGRpbWVuc2lvbnMgb2YgdGhlIGJhc2UgdGV4dHVyZSAobmF0dXJhbCBzaXplIGluIGxpbmUgOTEsIHRoZSBcclxuXHQvLyBzY2FsZSBpcyBjb3JyZWN0ZWQgaW4gbGluZSA3NSlcclxuXHQvLyBjb3JyZWN0ZWQgd2lkdGggYW5kIGhlaWdodFxyXG5cdGNvbnN0IF9jb3JyVyA9IHJlYWxXaWR0aCAqIF9wcmV2aW91c1NjYWxlO1xyXG5cdGNvbnN0IF9jb3JySCA9IHJlYWxIZWlnaHQgKiBfcHJldmlvdXNTY2FsZTtcclxuXHQvLyBub3cgY2hlY2sgdGhlIGFuaW1hdGlvbiB0eXBlXHJcblx0aWYgKF9hbmltYXRpb25UeXBlID09PSAyICkge1xyXG5cdFx0Ly8gdGhlIGFuaW1hdGlvbiB0eXBlIGlzIHpvb21cclxuXHRcdC8vIHVzZSBoYWxmIG9mIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHNjYWxlZCB0ZXh0dXJlIGFuZCB0aGUgc2NyZWVuXHJcblx0XHRfc3RhcnRYID0gKCAoIF9jb3JyVyAtIF9zdyApIC8gMiApIC8gX3ByZXZpb3VzU2NhbGU7XHJcblx0XHRfc3RhcnRZID0gKCAoIF9jb3JySCAtIF9zaCApIC8gMiApIC8gX3ByZXZpb3VzU2NhbGU7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHRoZSBhbmltYXRpb24gdHlwZSBpcyB0cmFuc2xhdGlvbiAoaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbClcclxuXHRcdC8vIHVzZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBzY3JlZW4gYW5kIHRoZSBzY2FsZWQgdGV4dHVyZVxyXG5cdFx0X3N0YXJ0WCA9IGhvcml6b250YWwgPT09IDAgPyAwIDogLSggX3N3IC0gX2NvcnJXICkgLyBfcHJldmlvdXNTY2FsZTtcclxuXHRcdC8vIF9zdGFydFkgPSAoIF9zaCAtIF9jb3JySCApIC8gX3ByZXZpb3VzU2NhbGU7XHJcblx0XHRfc3RhcnRZID0gKCBfY29yckggLSBfc2ggKSAvIF9wcmV2aW91c1NjYWxlO1xyXG5cdFx0LypcdE5PVEVcclxuXHRcdCAqICBJbiB0aGUgY2FzZSBvZiB0aGUgdHJhbnNsYXRlIGFuaW1hdGlvbiwgb25lIG9mIHRoZSBkaW1lbnNpb25zIHdpbGxcclxuXHRcdCAqIFx0YWx3YXlzIG1hdGNoIHRoZSBzY3JlZW4sIHNvIHRoYXQgc3RhcnRpbmcgcG9pbnQgd2lsbCBiZSAwLlxyXG5cdFx0ICogXHRJbiB0aGUgaG9yaXpvbnRhbCBhbmltYXRpb24gd2UgbmVlZCB0byBzZWUgdGhlIGxhc3Qgc3BlY2lmaWMgYW5pbWF0aW9uXHJcblx0XHQgKiBcdFdoZW4gdGhlIGFuaW1hdGlvbiBpcyBmcm9tIDAgdG8gYSBuZWdhdGl2ZSB2YWx1ZSAobGFzdCBzcGVjaWZpYyA9IDEpXHJcblx0XHQgKiBcdHRoZSBzdGFydCBYIHBvaW50IGlzIDAsIHJlZ2FyZGxlc3Mgb2YgdGhlIGNhbGN1bGF0aW9uLiBXaGVuIHRoZSBhbmltYXRpb25cclxuXHRcdCAqIFx0aXMgZnJvbSBhIG5lZ2F0aXZlIHZhbHVlIHRvIDAgKGxhc3Qgc3BlY2lmaWMgPSAwKSwgdGhlIHN0YXJ0IHBvaW50IGlzIHRoZVxyXG5cdFx0ICogXHRjYWxjdWxhdGVkIHZhbHVlLlxyXG5cdFx0ICogXHRXaGVuIHRoZSBhbmltYXRpb24gaXMgdmVydGljYWwsIHNpbmNlIHRoZXJlJ3Mgbm8gc3BlY2ZpYyB0eXBlcyBmb3IgdGhpcywgdXNlXHJcblx0XHQgKiBcdGFsd2F5cyB0aGUgY2FsY3VsYXRlZCB2YWx1ZS4gSW4gdGhlIGNhc2Ugb2YgYSBob3Jpem9udGFsIGFuaW1hdGlvbiwgdGhlIFxyXG5cdFx0ICogXHRzY2FsZWQgaGVpZ2h0IGlzIGVxdWFsIHRvIHRoZSBzY3JlZW4gaGVpZ2h0IHNvIGl0J3MgYWx3YXlzIDAuXHJcblx0XHQqL1xyXG5cdH1cclxuXHRcclxuXHQvLyBjaGVjayBpZiB0aGUgaGVpZ2h0IG9mIHRoZSBmaW5hbCBzdHJpcGUgaXMgYmlnZ2VyIHRoYW4gdGhlIHRleHR1cmUncyBoZWlnaHRcclxuXHQvKiBjb25zdCBfZmluYWxGcmFtZUhlaWdodCA9IF9zdGFydFkgKyAoIF9yZWFsU3RyaXBlSGVpZ2h0ICogKF9zdHJpcGVzQW1vdW50IC0gMSkgKTtcclxuXHRpZiAoIF9maW5hbEZyYW1lSGVpZ2h0ICsgX3JlYWxIZWlnaFJlbWluZGVyID4gcmVhbEhlaWdodCApIHtcclxuXHRcdGNvbnNvbGUubG9nKCBcImZyYW1lIEhFSUdIVCBjb3JyZWN0aW9uXCIgKTtcclxuXHRcdGNvbnNvbGUubG9nKCBfZmluYWxGcmFtZUhlaWdodCArIF9yZWFsSGVpZ2hSZW1pbmRlciwgcmVhbEhlaWdodCApO1xyXG5cdFx0X3JlYWxIZWlnaFJlbWluZGVyID0gcmVhbEhlaWdodCAtIF9maW5hbEZyYW1lSGVpZ2h0O1xyXG5cdH0gKi9cclxuXHJcblx0Ly8gY2hlY2sgaWYgdGhlIHN0YXJ0IHggaGFzIHRvIGJlIGNvcnJlY3RlZFxyXG5cdGlmICggKCBfc3RhcnRYICsgX3JlYWxTdHJpcGVXaWR0aCApID4gcmVhbFdpZHRoICkge1xyXG5cdFx0Y29uc29sZS5sb2coIFwiZnJhbWUgd2lkdGggY29ycmVjdGlvblwiICk7XHJcblx0XHRjb25zb2xlLmxvZyggX3N0YXJ0WCArIF9yZWFsU3RyaXBlV2lkdGgsIHJlYWxXaWR0aCApO1xyXG5cdFx0X3JlYWxTdHJpcGVXaWR0aCA9IHJlYWxXaWR0aCAtIF9zdGFydFg7XHJcblx0fVxyXG5cclxuXHJcblx0XHJcblx0Ly8gbG9vcCB0byBjcmVhdGUgdGhlIHN0cmlwZXNcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IF9zdHJpcGVzQW1vdW50OyBpKyspIHtcclxuXHRcdC8vIHRoZSBjYWxjdWxhdGVkIGZyYW1lIHN0YXJ0IFkgcG9pbnRcclxuXHRcdGxldCBfZnJhbWVTdGFydFkgPSAoIF9zdGFydFkgKyBfcmVhbFN0cmlwZUhlaWdodCAqIGkgKTtcclxuXHRcdC8vIEZST00gVkVSU0lPTiAyLjIuNFxyXG5cdFx0Ly8gdGhlIHN0YXJ0IHkgcG9pbnQgZG9lc24ndCBuZWVkIGNvcnJlY3Rpb25cclxuXHRcdC8vIGNoZWNrIGlmIHRoZSBzdGFydCBZIHBvaW50IGhhcyB0byBiZSBjb3JyZWN0ZWRcclxuXHRcdC8vIF9mcmFtZVN0YXJ0WSA9IChfZnJhbWVTdGFydFkgKyBfcmVhbFN0cmlwZUhlaWdodCkgPiByZWFsSGVpZ2h0ID8gKHJlYWxIZWlnaHQgLSBfcmVhbFN0cmlwZUhlaWdodCkgOiBfZnJhbWVTdGFydFk7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIHRoZSBmcmFtZSBvZiB0aGUgc3RyaXBlc1xyXG5cdFx0Y29uc3QgX25ld0ZyYW1lID0gbmV3IFBJWEkuUmVjdGFuZ2xlKFxyXG5cdFx0XHRfc3RhcnRYLCBfZnJhbWVTdGFydFksXHJcblx0XHRcdF9yZWFsU3RyaXBlV2lkdGgsIGkgPCAoX3N0cmlwZXNBbW91bnQgLSAxKSA/IF9yZWFsU3RyaXBlSGVpZ2h0IDogX3JlYWxIZWlnaFJlbWluZGVyXHJcblx0XHQpO1xyXG5cdFx0Ly8gY3JlYXRlIHRoZSB0ZXh0dXJlXHJcblx0XHRjb25zdCBfbmV3VGV4dHVyZSA9IG5ldyBQSVhJLlRleHR1cmUoX3ByZXZCYXNlLCBfbmV3RnJhbWUpO1xyXG5cdFx0Ly8gY3JlYXRlIHRoZSBuZXcgc3ByaXRlIG9iamVjdFxyXG5cdFx0Y29uc3QgX25ld1N0cmlwZSA9IG5ldyBQSVhJLlNwcml0ZShfbmV3VGV4dHVyZSk7XHJcblx0XHQvLyBhZGQgdGhlIHN0cmlwZSB0byB0aGUgaW5pdCBhcnJheVxyXG5cdFx0X3ByZXZpb3VzSW5pdEFycmF5LnB1c2goX25ld1N0cmlwZSk7XHJcblx0XHQvLyBwb3NpdGlvbiB0aGUgc3RyaXBlXHJcblx0XHRfbmV3U3RyaXBlLnggPSAtd2luU2l6ZS53O1xyXG5cdFx0X25ld1N0cmlwZS55ID0gX3N0cmlwZUhlaWdodCAqIGk7XHJcblx0XHQvLyBzY2FsZSB0aGUgc3RyaXBlXHJcblx0XHRfbmV3U3RyaXBlLnNjYWxlLnNldCggX3ByZXZpb3VzU2NhbGUgKTtcclxuXHRcdC8vIGFkZCB0aGUgc3RyaXBlIHRvIHRoZSBzdGFnZVxyXG5cdFx0X3N0cmlwZXNTdGFnZS5hZGRDaGlsZCggX25ld1N0cmlwZSApO1xyXG5cdH0gLy8gbG9vcCBlbmRcclxufTtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vcHJvbXB0LWltYWdlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Byb21wdC10ZXh0XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Byb21wdC1pbnRlcnJ1cHRcIjtcclxuIiwiLy8gZ2V0IHRoZSBzbGlkZXMgZGF0YVxyXG5pbXBvcnQgeyBfc2xpZGVzRGF0YSB9IGZyb20gXCIuLi9hamF4LW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXhcclxuaW1wb3J0IHsgX2N1cnJlbnRTbGlkZUluZGV4IH0gZnJvbSBcIi4uL3NsaWRlLWNoYW5nZS1tb2R1bGVcIjtcclxuXHJcblxyXG4vKiBUaGUgbG9nb3MgY29udGFpbmVyXHJcbiAqIEFkZCBhbGwgdGhlIGxvZ29zIGFuZCBncmFwaGljIGJhY2tyb3VuZHMgZm9yIGVhY2ggbG9nby5cclxuKi9cclxuZXhwb3J0IGNvbnN0IF9sb2dvc0NvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4vKiBUaGUgbG9nb3MgYmFja2dyb3VuZCBncmFwaGljLlxyXG4gKiBUaGlzIHdpbGwgYmUgYmVoaW5kIHRoZSBsb2dvcyBhbmQgaW4gaXQgd2UnbGwgZHJhdyBhIHNxdWFyZSB3aXRoXHJcbiAqIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIGZvciBlYWNoIGxvZ28uXHJcbiovXHJcbmNvbnN0IF9sb2dvc0JhY2tncm91bmQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4vLyBhZGQgdGhlIGxvZ29zIGJhY2tncm91bmRcclxuX2xvZ29zQ29udGFpbmVyLmFkZENoaWxkKF9sb2dvc0JhY2tncm91bmQpO1xyXG5cclxuLyogRm9yIHRoZSBsb2dvIGFuaW1hdGlvbiB3ZSBzZXQgYSBncmFwaGljcyBhcyB0aGUgbWFza1xyXG4gKiBmb3IgdGhlIGxvZ28gc3ByaXRlcy5cclxuKi9cclxuZXhwb3J0IGNvbnN0IF9sb2dvc01hc2sgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG5fbG9nb3NNYXNrLmRyYXdSZWN0KDAsIDAsIDI2LCAyNik7XHJcbl9sb2dvc01hc2sucG9zaXRpb24uc2V0KDAsIC0yKTtcclxuXHJcbi8vIGFwcGx5IHRoZSBtYXNrIHRvIHRoZSBsb2dvcyBjb250YWluZXJcclxuX2xvZ29zQ29udGFpbmVyLm1hc2sgPSBfbG9nb3NNYXNrO1xyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gY3JlYXRlIHRoZSB0ZXh0dXJlIGZvciBlYWNoIGxvZ29cclxuICogQ3JlYXRlcyB0aGUgdGV4dHVyZSBhbmQgY2hlY2tzIGlmIHRoZSBpbWFnZSB3YXMgbG9hZGVkIG9yIG5vdC5cclxuICogQWRkcyB0aGUgdGV4dHVyZSB3aGVuIGxvYWRlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHUgdGhlIHVybCBvZiB0aGUgbG9nb1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gYyB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbG9nb1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaSB0aGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIHVybFxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2NyZWF0ZUxvZ29UZXh0dXJlID0gKCB1LCBjLCBpICkgPT4ge1xyXG5cdC8qIEJlZm9yZSBjcmVhdGluZyB0aGUgdGV4dHVyZSBkcmF3IHRoZSBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxyXG5cdCAqIGZvciB0aGlzIGxvZ28gdXNpbmcgdGhlIGNvbG9yIGFuZCB0aGUgaW5kZXggdmFsdWVcclxuXHQqL1xyXG5cdF9sb2dvc0JhY2tncm91bmRcclxuXHRcdC5iZWdpbkZpbGwoIGMucmVwbGFjZShcIiNcIiwgXCIweFwiKSApXHJcblx0XHQuZHJhd1JlY3QoIDAsIDI2ICogaSwgMjYsIDI2IClcclxuXHRcdC5lbmRGaWxsKCk7XHJcblx0Ly9cclxuXHQvLyBjcmVhdGUgdGhlIHRleHR1cmVcclxuXHRjb25zdCBfbG9nb1RleHR1cmUgPSBuZXcgUElYSS5UZXh0dXJlLmZyb21JbWFnZSggdSwgdHJ1ZSApO1xyXG5cdGNvbnN0IF9iYXNlID0gX2xvZ29UZXh0dXJlLmJhc2VUZXh0dXJlO1xyXG5cdC8vIGNoZWNrIGlmIHRoZSBpbWFnZSB3YXMgbG9hZGVkXHJcblx0X2Jhc2VcclxuXHRcdC5vbihcImxvYWRlZFwiLCB0ID0+IHtcclxuXHRcdFx0Y29uc3QgeyByZWFsV2lkdGgsIHJlYWxIZWlnaHQgfSA9IHQ7XHJcblx0XHRcdC8qIFNvbWUgbG9nb3MgaGF2ZSB0aGUgc2FtZSBkaW1lbnNpb25zIChoZWlnaHQvd2lkdGgpLCBidXQgb3RoZXJzIGRvbid0XHJcblx0XHRcdCAqIENoZWNrIGlmIHRoZSBsb2dvIGlzIHNxdWFyZSBvciBub3QgYW5kIGFkZCB0byB0aGUgdGV4dHVyZSBpbiB0aGUgYXJyYXlcclxuXHRcdFx0ICogYSByYXRpbyBmb3IgdGhlIGxvZ28gaW1hZ2UgdG8gYmUgYXBwbGllZCB3aGVuIHRoZSB0ZXh0dXJlIGlzIHVwZGF0ZWQuXHJcblx0XHRcdCovXHJcblx0XHRcdC8vIGNyZWF0ZSB0aGUgcmF0aW8gZm9yIHRoaXMgbG9nb1xyXG5cdFx0XHRjb25zdCBfbG9nb1JhdGlvID0gcGFyc2VGbG9hdCggTWF0aC5taW4oIDI2IC8gcmVhbFdpZHRoLCAyNiAvIHJlYWxIZWlnaHQgKSApO1xyXG5cdFx0XHQvLyBub3cgY3JlYXRlIHRoZSBuZXcgc3ByaXRlLCBhcHBseSB0aGUgcmF0aW8gYW5kIGFkZCBpdCB0byB0aGUgY29udGFpbmVyXHJcblx0XHRcdGNvbnN0IF9uZXdMb2dvID0gbmV3IFBJWEkuU3ByaXRlLmZyb20odCk7XHJcblx0XHRcdF9uZXdMb2dvLnNjYWxlLnNldChfbG9nb1JhdGlvKTtcclxuXHRcdFx0Ly8gcG9zaXRpb24gdGhlIGxvZ29cclxuXHRcdFx0X25ld0xvZ28ueSA9IDI2ICogaTtcclxuXHRcdFx0Ly8gYWRkIGl0IHRvIHRoZSBjb250YWluZXJcclxuXHRcdFx0X2xvZ29zQ29udGFpbmVyLmFkZENoaWxkKF9uZXdMb2dvKTtcclxuXHRcdH0pXHJcblx0XHQub24oXCJlcnJvclwiLCAoKSA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCBcImVycm9yID0+IFwiLCBpICk7XHJcblx0XHRcdC8vIGp1c3QgcmVwbGFjZSB0aGUgbnVsbCB2YWx1ZSB3aXRoIGZhbHNlXHJcblx0XHR9KTtcclxuXHQvLyBcclxufTtcclxuXHJcblxyXG4vKiogTWV0aG9kIHRvIHByZWxvYWQgdGhlIGxvZ29zIGltYWdlcy5cclxuICogVGhpcyBzdGFydHMgcHJlbG9hZGluZyB0aGUgaW1hZ2VzIGFuZCBkcmF3cyB0aGUgYmFja2dyb3VuZCBncmFwaGljc1xyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3ByZWxvYWRMb2dvcyA9ICgpID0+IHtcclxuXHQvLyBjbGVhciB0aGUgYmFja2dyb3VuZCBncmFwaGljc1xyXG5cdF9sb2dvc0JhY2tncm91bmQuY2xlYXIoKTtcclxuXHQvLyBzZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250YWluZXIgdG8gdGhlIGluaXRpYWwgb25lXHJcblx0X2xvZ29zQ29udGFpbmVyLnBvc2l0aW9uLnNldCggMCwgLTIgKTtcclxuXHQvLyBwcmVsb2FkIGVhY2ggaW1hZ2VcclxuXHRfc2xpZGVzRGF0YS5mb3JFYWNoKCAoIGUsIGkgKSA9PiB7XHJcblx0XHRfY3JlYXRlTG9nb1RleHR1cmUoIGUuc2xpZGVMb2dvLCBlLmxvZ29Db2xvciwgaSApO1xyXG5cdH0pOyAvLyBsb29wXHJcbn07XHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byBhbmltYXRlIHRoZSBsb2dvc1xyXG4gKiBNb3ZlcyB0aGUgZW50aXJlIGxvZ29zIGNvbnRhaW5lclxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2FuaW1hdGVMb2dvcyA9ICgpID0+IHtcclxuXHRUd2VlbkxpdGUudG8oX2xvZ29zQ29udGFpbmVyLCAwLjI1LCB7IHk6IC0oKDI2ICogX2N1cnJlbnRTbGlkZUluZGV4KSArIDIpfSk7XHJcbn07XHJcbiIsIi8qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHRcdE1FVEhPRFMgQU5EIFZBUklBQkxFUyBGT1IgVEhFIFBST01QVCBJTlRFUlJVUFQgTUVUSE9EXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuLy8gZ2V0IHRoZSBtZXRob2RzXHJcbmltcG9ydCB7IFxyXG5cdF9wYXVzZVByb21wdCwgX3NldFByb21wdERpcmVjdGlvbiwgX2FkZE5ld0NoYXJhY3RlciwgX3Byb21wdEJhY2tnb3J1bmQsXHJcblx0X3Byb21wdERpcmVjdGlvbiwgX3Byb21wdFRleHQsXHJcblx0X3Byb21wdFNwZWVkLCBfcHJvbXB0R2FwXHJcbn0gZnJvbSBcIi4vcHJvbXB0LXRleHRcIjtcclxuXHJcbi8qIEJvb2xlYW4gdG8gY2hlY2sgaWYgdGhlIGludGVycnVwdCBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxyXG4gKiBUaGlzIHdpbGwgYmUgdXNlZCBieSB0aGUgYWRkIGNoYXJhY3RlciBtZXRob2QgaW4gb3JkZXIgdG9cclxuICogc2VlIGlmIGl0IHVzZXMgdGhlIGludGVycnVwdCB0ZXh0IG9yIHRoZSBpbnRlcnJ1cHQgdGV4dC5cclxuKi9cclxuZXhwb3J0IGxldCBfcHJvbXB0SW50ZXJydXB0ZWQgPSBmYWxzZTtcclxuLyogVGhlIGludGVycnVwdCB0ZXh0LiBUaGlzIHdpbGwgYmUgdXNlZCBieSB0aGUgYWRkIGNoYXJhY3RlciBtZXRob2RcclxuICogdG8gdHlwZSB0aGUgaW50ZXJydXB0IHRleHQgYWZ0ZXIgcmVtb3ZpbmcgdGhlIGN1cnJlbnQgdGV4dCBpbiB0aGUgcHJvbXB0LlxyXG4qL1xyXG5leHBvcnQgbGV0IF9pbnRlcnJ1cHRUZXh0ID0gbnVsbDtcclxuXHJcbi8vIHRoZSB2aXNpYmxlIHRleHRcclxubGV0IF9pbnRlcnJ1cHRTdHJpbmcgPSBcIlwiO1xyXG5cclxuLy8gc3BlY2lmaWMgdGltZXIgZm9yIHRoZSBpbnRlcnJ1cHQgdGV4dFxyXG5leHBvcnQgbGV0IF9pbnRlcnJ1cHRUaW1lciA9IG51bGw7XHJcblxyXG4vLyB0aGUgY3VycmVudCBsZXR0ZXIgaW5kZXhcclxubGV0IF9jdXJyZW50TGV0dGVyID0gMDtcclxuXHJcbi8qKiBUaGUgaW50ZXJydXB0IG1ldGhvZFxyXG4gKiBTcGxpdCB0aGUgaW50ZXJydXB0IHRleHQgaW4gY2hhcmFjdGVycyBhbmQgc3RvcmUgaXQgaW4gdGhlIGludGVycnVwdFxyXG4gKiB0ZXh0IHZhcmlhYmxlLiBUaGlzIHdpbGwgYmUgdXNlZCBpbiB0aGUgYWRkIGNoYXJhY3RlciBtZXRob2QgdG8gdHlwZVxyXG4gKiB0aGUgaW50ZXJydXB0IG1lc3NhZ2UuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IHRoZSB0ZXh0IHRoYXQgc2hvdWxkIGJlIHR5cGVkIGluIHRoZSBwcm9tcHRcclxuICogQHByaXZhdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9pbnRlcnJ1cHRQcm9tcHQgPSB0ZXh0ID0+IHtcclxuXHQvLyBwYXVzZSB0aGUgcHJvbXB0XHJcblx0X3BhdXNlUHJvbXB0KCk7XHJcblx0Ly8gc2V0IHRoZSBkaXJlY3Rpb24gdG8gZmFsc2UgaW4gb3JkZXIgdG8gcmVtb3ZlIHRoZSBjdXJyZW50IHRleHRcclxuXHRfc2V0UHJvbXB0RGlyZWN0aW9uKGZhbHNlKTtcclxuXHQvLyBzZXQgdGhlIGludGVycnVwdCBib29sIHRvIHRydWVcclxuXHRfcHJvbXB0SW50ZXJydXB0ZWQgPSB0cnVlO1xyXG5cdC8vIHNldCB0aGUgdGV4dFxyXG5cdF9pbnRlcnJ1cHRUZXh0ID0gdGV4dC5zcGxpdChcIlwiKTtcclxuXHQvLyByZXNldCB0aGUgaW50ZXJydXB0IHN0cmluZ1xyXG5cdF9pbnRlcnJ1cHRTdHJpbmcgPSBcIlwiO1xyXG5cdC8vIHJlc2V0IHRoZSB2YWx1ZSBvZiB0aGUgY3VycmVudCBsZXR0ZXJcclxuXHRfY3VycmVudExldHRlciA9IDA7XHJcblx0Ly8gcmVzZXQgdGhlIHRpbWVyXHJcblx0X2ludGVycnVwdFRpbWVyID0gbnVsbDtcclxuXHQvLyBjYWxsIHRoZSBpbnRlcnJ1cHQgdHlwZSBtZXRob2RcclxuXHRfYWRkTmV3Q2hhcmFjdGVyKCk7XHJcbn07XHJcblxyXG4vKiogTWV0aG9kIGZvciB0aGUgaW50ZXJydXB0IHR5cGUgZWZmZWN0XHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfaW50ZXJydXB0VHlwZUVmZmVjdCA9ICgpID0+IHtcclxuXHRpZiAoIF9pbnRlcnJ1cHRUZXh0W19jdXJyZW50TGV0dGVyXSAhPT0gdW5kZWZpbmVkICkge1xyXG5cdFx0Ly8gdGhlIG5leHQvcHJldmlvdXMgbGV0dGVyIGV4aXN0cywgd2UgYWRkIGl0IHRvIHRoZSB0ZXh0XHJcblx0XHQvLyBiYWNrZ3JvdW5kIGNvbG9yICNGRjM3MzdcclxuXHRcdGlmICggX3Byb21wdERpcmVjdGlvbiApIHtcclxuXHRcdFx0X2ludGVycnVwdFN0cmluZyA9IF9pbnRlcnJ1cHRTdHJpbmcuY29uY2F0KCBfaW50ZXJydXB0VGV4dFtfY3VycmVudExldHRlcl0gKTtcclxuXHRcdFx0X2N1cnJlbnRMZXR0ZXIrKztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdF9pbnRlcnJ1cHRTdHJpbmcgPSBfaW50ZXJydXB0U3RyaW5nLnNsaWNlKCAwLCAtMSApO1xyXG5cdFx0XHRfY3VycmVudExldHRlci0tO1xyXG5cdFx0fVxyXG5cdFx0Ly8gYXBwbHkgdGhlIHRleHQgdG8gdGhlIFBJWEkgZWxlbWVudFxyXG5cdFx0X3Byb21wdFRleHQudGV4dCA9IF9pbnRlcnJ1cHRTdHJpbmc7XHJcblx0XHQvLyBkcmF3IHRoZSBiYWNrZ3JvdW5kXHJcblx0XHRfcHJvbXB0QmFja2dvcnVuZFxyXG5cdFx0XHQuY2xlYXIoKVxyXG5cdFx0XHQuYmVnaW5GaWxsKCAweEZGMzczNyApXHJcblx0XHRcdC5kcmF3UmVjdCggMCwgLTIsIF9wcm9tcHRUZXh0LndpZHRoICsgMTAsIDI2IClcclxuXHRcdFx0LmVuZEZpbGwoKTtcclxuXHRcdC8vXHJcblx0XHQvLyByZXN0YXJ0IGNyZWF0ZSB0aGUgdGltZXJcclxuXHRcdF9pbnRlcnJ1cHRUaW1lciA9IFR3ZWVuTGl0ZS5kZWxheWVkQ2FsbCggX3Byb21wdFNwZWVkLCBfaW50ZXJydXB0VHlwZUVmZmVjdCApLnBhdXNlKCk7XHJcblx0XHRfaW50ZXJydXB0VGltZXIucmVzdGFydCh0cnVlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0LyogQ2hlY2sgdGhlIGRpcmVjdGlvbi4gSWYgdGhlIHRleHQgZ29lcyBmb3J3YXJkLCB0aGVuIHdlIGNhbGwgdGhlIGFkZCBuZXcgY2hhcmFjdGVyXHJcblx0XHQgKiBtZXRob2QgYW5kIGdvIGJhY2sgdG8gdGhlIG5vcm1hbCBwcm9tcHQgYmVoYXZpb3VyLlxyXG5cdFx0ICogSWYgdGhlIHRleHQgZ29lcyBiYWNrLCB0aGVuIHdlIHJlbW92ZSB0aGUgaW50ZXJydXB0IHRleHQuXHJcblx0XHQqL1xyXG5cdFx0aWYgKCBfcHJvbXB0RGlyZWN0aW9uICkge1xyXG5cdFx0XHRfc2V0UHJvbXB0RGlyZWN0aW9uKCBmYWxzZSApO1xyXG5cdFx0XHRfY3VycmVudExldHRlci0tO1xyXG5cdFx0XHQvLyB0aGUgZGlyZWN0aW9uIGlzIGJhY2ssIHRoZSBlbnRpcmUgcHJvbXB0IHRleHQgaGFzIGJlZW4gdHlwZWRcclxuXHRcdFx0Ly8gd2FpdCB0d28gc2Vjb25kcyBhbmQgY2FsbCB0aGlzIG1ldGhvZCBhZ2FpblxyXG5cdFx0XHRfaW50ZXJydXB0VGltZXIgPSBUd2VlbkxpdGUuZGVsYXllZENhbGwoIF9wcm9tcHRHYXAsIF9pbnRlcnJ1cHRUeXBlRWZmZWN0ICkucGF1c2UoKTtcclxuXHRcdFx0XHJcblx0XHRcdF9pbnRlcnJ1cHRUaW1lci5yZXN0YXJ0KHRydWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0X3NldFByb21wdERpcmVjdGlvbiggdHJ1ZSApO1xyXG5cdFx0XHQvLyB0b2dnbGUgdGhlIGludGVycnVwdGVkIGJvb2xlYW5cclxuXHRcdFx0X3Byb21wdEludGVycnVwdGVkID0gZmFsc2U7XHJcblx0XHRcdC8vIHRoZSBkaXJlY3Rpb24gaXMgZm9yd2FyZCwgYWxsIHRoZSBpbnRlcnJ1cHQgdGV4dCBoYXMgYmVlbiByZW1vdmVkXHJcblx0XHRcdC8vIGNhbGwgdGhlIGFkZCBuZXcgY2hhcmFjdGVyIGFuZCBsZWF2ZSB0aGlzIGNvZGVcclxuXHRcdFx0X2FkZE5ld0NoYXJhY3RlcigpO1xyXG5cdFx0fVxyXG5cdH0gLy8gbGV0dGVyIHVuZGVmaW5lZCBjb25kaXRpb25hbFxyXG59O1xyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0XHRGRUVEIFRFWFQgTU9EVUxFXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuLy8gZ2V0IHRoZSBzbGlkZXMgZGF0YVxyXG5pbXBvcnQgeyBfc2xpZGVzRGF0YSB9IGZyb20gXCIuLi9hamF4LW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXhcclxuaW1wb3J0IHsgX2N1cnJlbnRTbGlkZUluZGV4IH0gZnJvbSBcIi4uL3NsaWRlLWNoYW5nZS1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBmZWVkIGNvbnRhaW5lclxyXG5pbXBvcnQgeyBfcHJvbXB0U3RhZ2UgfSBmcm9tIFwiLi4vcGl4aS1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBwcm9tcHQgbG9nbyBzcHJpdGVzXHJcbmltcG9ydCB7IF9sb2dvc0NvbnRhaW5lciwgX2xvZ29zTWFzaywgX2FuaW1hdGVMb2dvcyB9IGZyb20gXCIuL3Byb21wdC1pbWFnZVwiO1xyXG4vLyBnZXQgdGhlIHByb21wdCBpbnRlcnJ1cHRcclxuaW1wb3J0IHsgX3Byb21wdEludGVycnVwdGVkLCBfaW50ZXJydXB0VGltZXIsIF9pbnRlcnJ1cHRUeXBlRWZmZWN0IH0gZnJvbSBcIi4vcHJvbXB0LWludGVycnVwdFwiO1xyXG4vLyBnZXQgdGhlIHNjcmVlbiBkaW1lbnNpb25zXHJcbmltcG9ydCB7IHdpblNpemUgfSBmcm9tIFwiLi4vd2luZG93XCI7XHJcblxyXG4vLyB0aGUgZmVlZCB0ZXh0IHN0eWxlc1xyXG5jb25zdCBfcHJvbXB0VGV4dFN0eWxlcyA9IHtcclxuXHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFJvYm90byxPeHlnZW4sVWJ1bnR1LENhbnRhcmVsbCxPcGVuIFNhbnMsSGVsdmV0aWNhIE5ldWUsc2Fucy1zZXJpZlwiLFxyXG5cdGZvbnRTaXplOiAxNCxcclxuXHRsaW5lSGVpZ2h0OiAzMixcclxuXHRmaWxsOiBcIiNGRkZGRkZcIlxyXG59O1xyXG5cclxuLy8gY3JlYXRlIHRoZSB0ZXh0IGVsZW1lbnRcdFxyXG5leHBvcnQgY29uc3QgX3Byb21wdFRleHQgPSBuZXcgUElYSS5UZXh0KCk7XHJcbi8vIHNldCB0aGUgc3R5bGVzIGZvciB0aGUgcHJvbXB0XHJcbl9wcm9tcHRUZXh0LnN0eWxlID0gX3Byb21wdFRleHRTdHlsZXM7XHJcbi8vIGNyZWF0ZSB0aGUgdGV4dCBiYWNrZ3JvdW5kXHJcbmV4cG9ydCBjb25zdCBfcHJvbXB0QmFja2dvcnVuZCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblxyXG4vKiBUaGUgZmVlZCBpbmZvIGlzIHNwbGl0dGVkIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5ncywgZnJvbSAxIHN0cmluZ1xyXG4gKiB0byBhcyBtYW55IGFzIHRoZSBmZWVkIGluZm8gY291bGQgaGF2ZS5cclxuICogSWYgdGhpcyBhcnJheSBoYXMganVzdCBvbmUgc3RyaW5nIGZvciB0aGUgY3VycmVudCBzbGlkZSwgYWZ0ZXIgdGhhdCBpc1xyXG4gKiB0eXBlZCB0aGUgZWZmZWN0IGlzIHN0b3BwZWQuXHJcbiAqIElmIHRoZSBhcnJheSBoYXMgMiBvciBtb3JlIHN0cmluZ3MgdGhlIGFwcCBsb29wcyBiZXR3ZWVuIHRoZSBzdHJpbmdzIGluXHJcbiAqIHRoZSBhcnJheSB1bnRpbCB0aGUgdXNlciBvciB0aGUgYXBwIGNoYW5nZXMgdG8gYSBuZXcgc2xpZGUuXHJcbiovXHJcbmxldCBfcHJvbXB0U3RyaW5ncztcclxuLyogQW1vdW50IG9mIHN0cmluZ3MgaW4gdGhlIGFycmF5XHJcbiAqIEluIHRoZSB0eXBlIGVmZmVjdCBtZXRob2QsIGNoZWNrIGZvciB0aGlzIHZhbHVlLlxyXG4qL1xyXG5sZXQgX3N0cmluZ3NBbW91bnQgPSAwO1xyXG4vLyB0aGUgZGlyZWN0aW9uIG9mIHRoZSB0eXBpbmcgZWZmZWN0XHJcbmV4cG9ydCBsZXQgX3Byb21wdERpcmVjdGlvbiA9IHRydWU7XHJcbi8vIHRoZSBjdXJyZW50IHNydGluZyBpbmRleCwgdmFsaWQgb25seSBpZiB0aGUgYXJyYXkgaGFzIG1vcmUgdGhhbiBvbmVcclxuLy8gc3RyaW5nLiBCeSBkZWZhdWx0IGlzIDAuXHJcbmxldCBfY3VycmVudFN0cmluZ0luZGV4ID0gMDtcclxuLy8gdGhlIHRleHQgdGhhdCdzIGRpc2xwYXllZCBpbiB0aGUgZmVlZCB0ZXh0XHJcbi8vIGxldHRlcnMgYXJlIGFkZGVkIHRvIHRoaXMgYW5kIHRoZW4gYXBwbGllZCB0byB0aGUgZmVlZCB0ZXh0IGVsZW1lbnRcclxuZXhwb3J0IGxldCBfdmlzaWJsZVByb21wdFRleHQgPSBcIlwiO1xyXG4vLyB0aGlzIGlzIHRoZSBjdXJyZW50IGNoYXJhY3RlciBpbmRleFxyXG5sZXQgX2N1cnJlbnRDaGFySW5kZXggPSAwO1xyXG4vLyB0aW1lIGJldHdlZW4gZWFjaCBjaGFyYWN0ZXIgaW4gc2Vjb25kc1xyXG5leHBvcnQgY29uc3QgX3Byb21wdFNwZWVkID0gMC4wMjtcclxuLy8gdGltZSBiZXR3ZWVuIHByb21wdCBzdHJpbmdzIGluIHNlY29uZHNcclxuZXhwb3J0IGNvbnN0IF9wcm9tcHRHYXAgPSAyO1xyXG4vLyBjaGFyYWN0ZXIgdGltZXJcclxubGV0IF9wcm9tcHRUaW1lcjtcclxuXHJcbi8qKiBNZXRob2QgdG8gc2V0IHRoZSBkaXJlY3Rpb25cclxuICogQHBhcmFtIHtib29sZWFufSB2IHRoZSB2YWx1ZSB0byBiZSBzZXRcclxuICogQHByaXZhdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9zZXRQcm9tcHREaXJlY3Rpb24gPSB2ID0+IHtcclxuXHRfcHJvbXB0RGlyZWN0aW9uID0gdjtcclxufTtcclxuXHJcbi8qKiBNZXRob2QgdG8gcG9zaXRpb24gdGhlIGZlZWQgY29udGFpbmVyXHJcbiAqIFRoZSBjb250YWluZXIgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHNjcmVlbiBzaXplICgyMCUgbGVmdClcclxuICogc28gb24gdGhlIHNjcmVlbiByZXNpemUgZXZlbnQgdGhlIGNvbnRhaW5lciBoYXMgdG8gYmUgcG9zaXRpb25lZCBhZ2Fpbi5cclxuICogVGhlIHkgcG9zaXRpb24gaXMgdGhlIGhlaWdodCBvZiB0aGUgZWxlbWVudCAoMjYpIHBsdXMgdGhlIHNldCBkaXN0YW5jZSAoMTcpXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfcG9zaXRpb25Qcm9tcHQgPSAoKSA9PiB7XHJcblx0Ly8gc2V0IHRoZSBwb3NpdGlvblxyXG5cdF9wcm9tcHRTdGFnZS5wb3NpdGlvbi5zZXQoIHdpblNpemUudyAqIDAuMTgsIHdpblNpemUuaCAtIDQ0ICk7XHJcbn07XHJcblxyXG4vKiogTWV0aG9kIHRvIHJlc2V0IHRoZSBmZWVkIHRleHQgdmFsdWVzXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfcmVzZXRQcm9tcHRUZXh0ID0gKCkgPT4ge1xyXG5cdF92aXNpYmxlUHJvbXB0VGV4dCA9IFwiXCI7XHJcblx0X2N1cnJlbnRDaGFySW5kZXggPSAwO1xyXG5cdC8vIHJlc2V0IHRoZSBzdHJpbmdzIGFycmF5XHJcblx0X3Byb21wdFN0cmluZ3MgPSBudWxsO1xyXG5cdC8vIHJlc2V0IHRoZSBjdXJyZW50IHN0cmluZyBpbmRleFxyXG5cdF9jdXJyZW50U3RyaW5nSW5kZXggPSAwO1xyXG5cdC8vIHNldCB0aGUgZGlyZWN0aW9uIHRvIGZvcndhcmRcclxuXHRfcHJvbXB0RGlyZWN0aW9uID0gdHJ1ZTtcclxufTtcclxuXHJcbi8qKiBNZXRob2QgdG8gcGF1c2UgdGhlIGZlZWQgY29tcG9uZW50XHJcbiAqIFBhdXNlcyB0aGUgdGltZXJcclxuICogQHByaXZhdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9wYXVzZVByb21wdCA9ICgpID0+IHtcclxuXHRfcHJvbXB0VGltZXIucGF1c2UoKS5raWxsKCk7XHJcbn07XHJcblxyXG4vKiogTWV0aG9kIHRvIGhpZGUgdGhlIGZlZWRcclxuICogQ2FuIGJlIHVzZWQgZm9yIHNob3dpbmcgdGhlIHNldHRpbmdzIHNjcmVlbiBhbmQgd2hlbiBhIG5ldyBncm91cFxyXG4gKiBpcyByZXF1ZXN0ZWQuXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfaGlkZVByb21wdCA9ICgpID0+IHtcclxuXHQvLyBwYXVzZSBhbmQgaGlkZSB0aGUgZmVlZCBjb21wb25lbnRcclxuXHRfcGF1c2VQcm9tcHQoKTtcclxuXHRfcHJvbXB0U3RhZ2UuYWxwaGEgPSAwO1xyXG59O1xyXG5cclxuLyoqIE1ldGhvZCB0byByZXN0YXJ0IHRoZSBwcm9tcHQgY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdyBpZiB0aGUgcHJvbXB0IHN0YWdlIGlzIGhpZGRlbiBvciBub3RcclxuICogQHByaXZhdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9yZXN0YXJ0UHJvbXB0ID0gc2hvdyA9PiB7XHJcblx0aWYgKCBfcHJvbXB0VGltZXIgKSBfcHJvbXB0VGltZXIucGF1c2UoKS5raWxsKCk7XHJcblx0Ly8ganVzdCBpbiBjYXNlIHRoZSBwcm9tcHQgaW50ZXJydXB0IGNvdWxkIGJlIHJ1bm5pbmdcclxuXHRpZiAoIF9pbnRlcnJ1cHRUaW1lciApIF9pbnRlcnJ1cHRUaW1lci5wYXVzZSgpLmtpbGwoKTtcclxuXHQvLyBmaXJzdCByZXNldCB0aGUgY29tcG9uZW50XHJcblx0X3Jlc2V0UHJvbXB0VGV4dCgpO1xyXG5cdC8vIGNyZWF0ZSB0aGUgc3RyaW5nIGZvciB0aGUgY3VycmVudCBzbGlkZVxyXG5cdF9jcmVhdGVDdXJyZW50UHJvbXB0U3RyaW5nKCBfc2xpZGVzRGF0YVtfY3VycmVudFNsaWRlSW5kZXhdLmZlZWQsIF9zbGlkZXNEYXRhW19jdXJyZW50U2xpZGVJbmRleF0udGltZSApO1xyXG5cdC8vIGlmIHRoZSBwcm9tcHQgc3RhZ2Ugd2FzIGhpZGRlbiwgc2hvdyBpdCBub3dcclxuXHQvLyBpbiBjYXNlIG9mIGEgZ3JvdXAgY2hhbmdlXHJcblx0aWYgKCBzaG93ICkgX3Byb21wdFN0YWdlLmFscGhhID0gMTtcclxuXHQvLyBzdGFydCB0aGUgdHlwZSBlZmZlY3RcclxuXHRfYWRkTmV3Q2hhcmFjdGVyKCk7XHJcblx0Ly8gYW5pbWF0ZSB0aGUgbG9nb3NcclxuXHRfYW5pbWF0ZUxvZ29zKCk7XHJcbn07XHJcblxyXG4vKiogTWV0aG9kIHRvIGNyZWF0ZSB0aGUgY3VycmVudCBzbGlkZSBzdHJpbmdcclxuICogVGFrZXMgdGhlIGZlZWQgbmFtZSBhbmQgY3JlYXRlcyBhbiBhcnJheSB3aXRoIGVhY2ggY2hhcmFjdGVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgZmVlZCBuYW1lXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfY3JlYXRlQ3VycmVudFByb21wdFN0cmluZyA9ICggbmFtZSwgdGltZSApID0+IHtcclxuXHQvLyBjcmVhdGUgdGhlIHN0cmluZ3MgYXJyYXlcclxuXHQvLyBlYWNoIHN0cmluZyBpcyBhbHNvIGJyb2tlIGludG8gaXQncyBvd24gYXJyYXkgb2YgbGV0dGVycyBhbmQgc3BhY2VzXHJcblx0Ly8gc28gd2UgZW5kIHdpdGggYW4gYXJyYXkgb2YgYXJyYXlzXHJcblx0X3Byb21wdFN0cmluZ3MgPSBuYW1lLnNwbGl0KFwifFwiKTtcclxuXHQvLyBub3cgY3JlYXRlIHRoZSBjaGFyYWN0ZXJzIGFycmF5c1xyXG5cdF9wcm9tcHRTdHJpbmdzLmZvckVhY2goIChzLGkpID0+IHtcclxuXHRcdC8vIHJlcGxhY2UgZWFjaCBzdHJpbmcgaW4gdGhlIGFycmF5IGZvciBhbiBhcnJheSBvZiB0aGUgY2hhcmFjdGVyc1xyXG5cdFx0X3Byb21wdFN0cmluZ3Muc3BsaWNlKCBpLCAxLCBzLnRyaW0oKS5zcGxpdChcIlwiKSApO1xyXG5cdH0pO1xyXG5cdC8vIGFkZCB0aGUgdGltZSBzdHJpbmcgdG8gdGhlIGFycmF5XHJcblx0X3Byb21wdFN0cmluZ3MucHVzaCggdGltZS5zcGxpdChcIlwiKSApO1xyXG5cdC8vIGNvbnNvbGUubG9nKCBfcHJvbXB0U3RyaW5ncyApO1xyXG5cdC8vIHNldCB0aGUgYW1vdW50IG9mIHN0cmluZ3Mgb2YgdGhlIGN1cnJlbnQgc2xpZGVcclxuXHRfc3RyaW5nc0Ftb3VudCA9IF9wcm9tcHRTdHJpbmdzLmxlbmd0aDtcclxufTtcclxuXHJcbi8qKiBNZXRob2QgdG8gYW5pbWF0ZSB0aGUgZmVlZCB0ZXh0XHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfYWRkTmV3Q2hhcmFjdGVyID0gKCkgPT4ge1xyXG5cdC8qIENoZWNrIGlmIHRoZSBpbnRlcnJ1cHQgbWV0aG9kIGlzIGdvaW5nIHRvIHN0YXJ0IHR5cGluZyBhIG1lc3NhZ2UuXHJcblx0ICogV2hlbiB0aGUgaW50ZXJydXB0IG1ldGhvZCBpcyBjYWxsZWQsIHRoZSByZWd1bGFyIHR5cGUgZWZmZWN0IGdvZXNcclxuXHQgKiBiYWNrIGFuZCByZW1vdmVzIHRoZSBjdXJyZW50IHRleHQuIFdoZW4gdGhlIGludGVycnVwdCBib29sZWFuIGlzXHJcblx0ICogc2V0IHRvIHRydWUgYW5kIHRoZSBkaXJlY3Rpb24gaXMgZm9yd2FyZCB3ZSBzdG9wIHRoaXMgbWV0aG9kIGFuZFxyXG5cdCAqIHRoZSB0aW1lci4gV2hlbiB0aGUgaW50ZXJydXB0IHR5cGUgZWZmZWN0IGlzIGNvbXBsZXRlIGFuZCB0aGUgdGV4dFxyXG5cdCAqIGlzIHJlbW92ZWQsIGl0IHdpbGwgY2FsbCB0aGUgYWRkIG5ldyBjaGFyYWN0ZXIgbWV0aG9kIGFnYWluIGFuZFxyXG5cdCAqIHRoZSBub3JtYWwgdHlwZSBlZmZlY3Qgd2lsbCBzdGFydC5cclxuXHQqL1xyXG5cdGlmICggX3Byb21wdEludGVycnVwdGVkICYmIF9wcm9tcHREaXJlY3Rpb24gKSB7XHJcblx0XHRfaW50ZXJydXB0VHlwZUVmZmVjdCgpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHQvKiBpZiB0aGUgc3RyaW5nIGhhcyBhIGNoYXJhY3RlciBmb3IgdGhlIGN1cnJlbnQgY2hhciBpbmRleFxyXG5cdCAqIHRoZW4gYWRkIHRoYXQgY2hhciB0byB0aGUgdGV4dFxyXG5cdCovXHJcblx0aWYgKCBfcHJvbXB0U3RyaW5nc1tfY3VycmVudFN0cmluZ0luZGV4XVtfY3VycmVudENoYXJJbmRleF0gIT09IHVuZGVmaW5lZCApIHtcclxuXHRcdC8vIGRlcGVuZGluZyBvbiB0aGUgdHlwaW5nIGRpcmVjdGlvbiwgYWRkIG9yIHJlbW92ZSBhIGNoYXJhY3RlciBmcm9tIHRoZSBzdHJpbmdcclxuXHRcdGlmICggX3Byb21wdERpcmVjdGlvbiApIHtcclxuXHRcdFx0Ly8gZ29pbmcgZm9yd2FyZFxyXG5cdFx0XHQvLyBhZGQgYSBjaGFyYWN0ZXJcclxuXHRcdFx0X3Zpc2libGVQcm9tcHRUZXh0ID0gX3Zpc2libGVQcm9tcHRUZXh0LmNvbmNhdChfcHJvbXB0U3RyaW5nc1tfY3VycmVudFN0cmluZ0luZGV4XVtfY3VycmVudENoYXJJbmRleF0pO1xyXG5cdFx0XHQvLyBpbmNyZWFzZSB0aGUgY2hhcmFjdGVyIGluZGV4XHJcblx0XHRcdF9jdXJyZW50Q2hhckluZGV4Kys7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBnb2luZyBiYWNrXHJcblx0XHRcdC8vIHJlbW92ZSBhIGNoYXJhY3RlclxyXG5cdFx0XHRfdmlzaWJsZVByb21wdFRleHQgPSBfdmlzaWJsZVByb21wdFRleHQuc2xpY2UoIDAsIC0xICk7XHJcblx0XHRcdC8vIGRlY3JlYXNlIHRoZSBjaGFyYWN0ZXIgaW5kZXhcclxuXHRcdFx0X2N1cnJlbnRDaGFySW5kZXgtLTtcclxuXHRcdH1cclxuXHRcdC8vIGFwcGx5IHRoZSBuZXcgc3RyaW5nIHRvIHRoZSB0ZXh0IGVsZW1lbnRcclxuXHRcdF9wcm9tcHRUZXh0LnRleHQgPSBfdmlzaWJsZVByb21wdFRleHQ7XHJcblx0XHQvLyBkcmF3IHRoZSBiYWNrZ3JvdW5kXHJcblx0XHRfcHJvbXB0QmFja2dvcnVuZFxyXG5cdFx0XHQuY2xlYXIoKVxyXG5cdFx0XHQuYmVnaW5GaWxsKDB4MDAwNTFiKVxyXG5cdFx0XHQuZHJhd1JlY3QoMCwgLTIsIF9wcm9tcHRUZXh0LndpZHRoICsgMTAsIDI2KVxyXG5cdFx0XHQuZW5kRmlsbCgpO1xyXG5cdFx0Ly9cclxuXHRcdC8vIHJlc3RhcnQgdGhlIHRpbWVyIGlmIGl0IGV4aXN0cyBvciBjcmVhdGUgYW5kIHN0YXJ0IGl0XHJcblx0XHRfcHJvbXB0VGltZXIgPSBUd2VlbkxpdGUuZGVsYXllZENhbGwoX3Byb21wdFNwZWVkLCBfYWRkTmV3Q2hhcmFjdGVyKS5wYXVzZSgpO1xyXG5cdFx0X3Byb21wdFRpbWVyLnJlc3RhcnQodHJ1ZSk7XHJcblx0fSBlbHNlIGlmICggX3Byb21wdFN0cmluZ3NbX2N1cnJlbnRTdHJpbmdJbmRleF1bX2N1cnJlbnRDaGFySW5kZXhdID09PSB1bmRlZmluZWQgKSB7XHJcblx0XHQvKiB0aGVyZSBhcmUgbm8gbW9yZSBjaGFyYWN0ZXJzIGluIHRoZSBjdXJyZW50IHN0cmluZ1xyXG5cdFx0ICogdG9nZ2xlIHRoZSB0eXBlIGRpcmVjdGlvbiBib29sZWFuIGluIG9yZGVyIHRvLCBlaXRoZXIgYWRkIG5ldyBjaGFyYWN0ZXJzXHJcblx0XHQgKiBmb3IgdGhlIG5leHQgc3RyaW5nIG9yIHJlbW92ZSBjaGFyYWN0ZXJzIGZyb20gdGhlIGN1cnJlbnQgc3RyaW5nXHJcblx0XHQqL1xyXG5cdFx0X3Byb21wdERpcmVjdGlvbiA9ICFfcHJvbXB0RGlyZWN0aW9uO1xyXG5cdFx0Ly8gZGVwZW5kaW5nIG9uIHRoZSBkaXJlY3Rpb24gaW5jcmVhc2Ugb3IgZGVjcmVhc2UgdGhlIGNoYXIgaW5kZXhcclxuXHRcdF9wcm9tcHREaXJlY3Rpb24gPyBfY3VycmVudENoYXJJbmRleCsrIDogX2N1cnJlbnRDaGFySW5kZXgtLTtcclxuXHRcdC8qIGlmIHRoZSBjdXJyZW50IGNoYXIgaXMgdGhlIGZpcnN0IG9mIHRoZSBzdHJpbmcgd2UgbW92ZSBpbnRvIGFub3RoZXJcclxuXHRcdCAqIHN0cmluZy4gaWYgdGhlIGN1cnJlbnQgc3RyaW5nIHBsdXMgb25lIGlzIGVxdWFsIHRvIHRoZSBhbW91bnQgb2Ygc3RyaW5nc1xyXG5cdFx0ICogd2Ugc2V0IHRoZSBzdHJpbmcgaW5kZXggdG8gMCwgb3RoZXJ3aXNlIHdlIGluY3JlYXNlIGl0IGJ5IDFcclxuXHRcdCovXHJcblx0XHRpZiAoIF9jdXJyZW50Q2hhckluZGV4ID09PSAwICkge1xyXG5cdFx0XHRfY3VycmVudFN0cmluZ0luZGV4ID0gKCBfY3VycmVudFN0cmluZ0luZGV4ICsgMSApID09PSBfc3RyaW5nc0Ftb3VudCA/IDAgOiBfY3VycmVudFN0cmluZ0luZGV4ICsgMTtcclxuXHRcdFx0Ly8gZG9uJ3QgcmVzdGFydCB0aGUgdGltZXIsIGp1c3QgYWRkIGEgbmV3IGNoYXJhY3RlclxyXG5cdFx0XHRfYWRkTmV3Q2hhcmFjdGVyKCk7XHJcblx0XHR9IGVsc2UgeyBcclxuXHRcdFx0LyogVGhpcyBpcyB0aGUgZmluYWwgY2hhcmFjdGVyIG9mIHRoZSBzdHJpbmcgYW5kIHRoZSB0eXBlIGVmZmVjdCBpc1xyXG5cdFx0XHQgKiBmb3J3YXJkLCB0aGUgdHlwZSBpcyBzdGFydGluZyB0byBnbyBiYWNrLCBzbyB3ZSB3YWl0IDIgc2Vjb25kc1xyXG5cdFx0XHQgKiBiZWZvcmUgcmVtb3ZpbmcgdGhlIHN0cmluZ1xyXG5cdFx0XHQqL1xyXG5cdFx0XHRfcHJvbXB0VGltZXIgPSBUd2VlbkxpdGUuZGVsYXllZENhbGwoX3Byb21wdEdhcCwgX2FkZE5ld0NoYXJhY3RlcikucGF1c2UoKTtcclxuXHRcdFx0X3Byb21wdFRpbWVyLnJlc3RhcnQodHJ1ZSk7XHJcblx0XHQgfSAvLyBjaGFyYWN0ZXIgaW5kZXggMCBjb25kaXRpb25hbFxyXG5cdFxyXG5cdH0gLy8gY2hhcmFjdGVyIHVuZWRmaW5lZCBjb25kaXRpb25hbFxyXG5cclxufTsgLy8gYWRkIG5ldyBjaGFyYWN0ZXIgbWV0aG9kXHJcblxyXG4vKiogTWV0aG9kIHRvIGluaXQgdGhlIGZlZWRcclxuICogUmVzZXRzIHRoZSBmZWVkIGluZm8gYW5kIHN0YXJ0cyB0aGUgZmVlZCB3aGVuIHRoZSBhcHBcclxuICogaXMgc3RhcnRlZCwgYSBuZXcgc2xpZGUgaXMgc2hvd24sIGEgbmV3IGdyb3VwIGhhcyBiZWVuIGxvYWRlZFxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2luaXRQcm9tcHQgPSAoKSA9PiB7XHJcblx0Ly8gYWRkIHRoZSBsb2dvIGNvbnRhaW5lclxyXG5cdF9wcm9tcHRTdGFnZS5hZGRDaGlsZCggX2xvZ29zQ29udGFpbmVyICk7XHJcblx0Ly8gYWRkIHRoZSBzcHJpdGVzIG1hc2tcclxuXHRfcHJvbXB0U3RhZ2UuYWRkQ2hpbGQoIF9sb2dvc01hc2sgKTtcclxuXHQvLyBhZGQgdGhlIHByb21wdCBiYWNrZ3JvdW5kXHJcblx0X3Byb21wdFN0YWdlLmFkZENoaWxkKCBfcHJvbXB0QmFja2dvcnVuZCApO1xyXG5cdC8vIGFkZCB0aGUgdGV4dCBhbmQgbG9nbyBjb21wb25lbnRzIHRvIHRoZSBzdGFnZVxyXG5cdF9wcm9tcHRTdGFnZS5hZGRDaGlsZCggX3Byb21wdFRleHQgKTtcclxuXHQvLyBwb3NpdGlvbiB0aGUgbG9nbyBjb250YWluZXJcclxuXHRfbG9nb3NDb250YWluZXIucG9zaXRpb24uc2V0KCAwLCAtMiApO1xyXG5cdF9wcm9tcHRUZXh0LnBvc2l0aW9uLnNldCggMzQsIDMgKTtcclxuXHRfcHJvbXB0QmFja2dvcnVuZC5wb3NpdGlvbi5zZXQoIDI3LCAwICk7XHJcblx0Ly8gc2V0IHRoZSBwb3NpdGlvblxyXG5cdF9wb3NpdGlvblByb21wdCgpO1xyXG5cdC8vIHRoZSBmZWVkIGNvbnRhaW5lciBjb3VsZCBiZSBoaWRkZW5cclxuXHRfcHJvbXB0U3RhZ2UuYWxwaGEgPSAxO1xyXG5cdC8vIHN0YXJ0IHRoZSBwcm9tcHQgY29tcG9uZW50XHJcblx0X3Jlc3RhcnRQcm9tcHQoKTtcclxufTtcclxuIiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBTTElERVMgQ0hBTkdFIE1PRFVMRVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcbi8qXHRUaGlzIG1vZHVsZSBoYW5kbGVzIGFsbCB0aGUgbWV0aG9kcyB0byB1cGRhdGUgdGhlIGluZGV4IG9mIHRoZSBzbGlkZXMgIFxyXG4gKlx0VGhlIG1ldGhvZHMgYXJlIGV4cG9ydGVkIGFuZCB1c2VkIGJ5IHRoZSBpbnRlcmFjdGlvbiBtb2R1bGVcclxuICovXHJcbi8vIGdldCBhamF4IGVsZW1lbnRzXHJcbi8vIFBBUlRJQUwgREVWIE5PVEVTIHRoZSBhamF4IHJlc3BvbnNlIGlzIGltcG9ydGVkIGp1c3QgdG8gYmUgdXNlZCBcclxuLy8gZnJvbSB0aGUgcHVibGljIGV2ZW50cy4gaXQgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGluIHRoZSByZWFjdCBhcHAuXHJcbmltcG9ydCB7IC8qIF9tYWtlUmVxdWVzdCwgX2FqYXhSZXNwb25zZSAqLyBfc2xpZGVzQW1vdW50IH0gZnJvbSBcIi4vYWpheC1tb2R1bGVcIjtcclxuLy8gZ2V0IHNsaWRlcyBlbGVtZW50c1xyXG5pbXBvcnQgeyBfcmVzZXRBcHBJbml0Qm9vbCwgX21haW5TbGlkZSB9IGZyb20gXCIuL3NsaWRlLW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIGRyYWcgZGlyZWN0aW9uXHJcbmltcG9ydCB7IF9kaXJlY3Rpb24gfSBmcm9tIFwiLi9pbnRlcmFjdGlvbi1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBjb2xvciBpbmRleCB1cGRhdGUgbWV0aG9kXHJcbmltcG9ydCB7IF9yb3RhdGVDb2xvciB9IGZyb20gXCIuL3RleHR1cmVzXCI7XHJcbi8vIGdldCB0aGUgZ3JhcGhpY3Mgc3RyaXBlcyBib29sXHJcbmltcG9ydCB7IF9ncmFwaGljU3RyaXBlc0NyZWF0ZWQgfSBmcm9tIFwiLi9zdHJpcGVzXCI7XHJcbi8vIGdldCB0aGUgc3RyaXBlcyBzdGFnZVxyXG5pbXBvcnQgeyBfc3RyaXBlc1N0YWdlLCBfbG9nb1N0YWdlLCBfdGV4dFN0YWdlIH0gZnJvbSBcIi4vcGl4aS1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBsb2FkZXJcclxuaW1wb3J0IHsgX3ByZWxvYWRlciB9IGZyb20gXCIuL2xvYWRlclwiO1xyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byBwcm9jZXNzIHRoZSBzbGlkZSB0ZXh0XHJcbmltcG9ydCB7IF9wcm9jZXNzU2xpZGVUZXh0LCBfY3JlYXRlTmV3U2xpZGVUZXh0LCBfcGFyR2FwLCBfYWRkV29yZERlbGF5ZWRDYWxsLCBfcmVzZXRUZXh0RGF0YSB9IGZyb20gXCIuL3RleHQtbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgcHJvbXB0IGNvbXBvbmVudFxyXG5pbXBvcnQgeyBfcmVzdGFydFByb21wdCwgX2hpZGVQcm9tcHQsIF9yZXNldFByb21wdFRleHQgfSBmcm9tIFwiLi9wcm9tcHQtbW9kdWxlXCI7XHJcbi8vIGltcG9ydCB0aGUgY2FsbGJhY2sgc2V0IGJ5IHRoZSBwdWJsaWMgbWV0aG9kcywgdGhhdCBzaG91bGQgYmVcclxuLy8gY2FsbGVkIHdoZW4gYSBuZXcgZ3JvdXAgaXMgbmVlZGVkXHJcbmltcG9ydCB7IF9ldmVudEVtaXR0ZXIgfSBmcm9tIFwiLi9nbG9iYWwtY2xhc3MtbW9kdWxlXCI7XHJcblxyXG4vLyBjdXJyZW50IHNsaWRlIGluZGV4XHJcbmV4cG9ydCBsZXQgX2N1cnJlbnRTbGlkZUluZGV4ID0gMDtcclxuLy8gY3VycmVudCBzbGlkZXMgZ3JvdXBcclxuZXhwb3J0IGxldCBfc2xpZGVzR3JvdXAgPSAwO1xyXG4vLyBib29sIHRvIGluZGljYXRlIHRoZSBmaXJzdCBzbGlkZSBvZiB0aGUgZmlyc3QgZ3JvdXBcclxuLy8gYXQgc3RhcnR1cCBpcyB0cnVlLlxyXG4vLyB0aGlzIGlzIHVzZWQgdG8gcHJldmVudCB0aGUgdXNlciBmcm9tIGdvaW5nIHRvIGEgcHJldmlvdXMgc2xpZGUgXHJcbi8vIG9yIGRyYWcgdG8gdGhlIHJpZ2h0IG9mIHRoZSBzY3JlZW4sIHdoZW4gdGhlIGN1cnJlbnQgc2xpZGUgaXMgXHJcbi8vIHRoZSBmaXJzdCBzbGlkZSBvZiB0aGUgZmlzcnQgZ3JvdXBcclxuLy8gVGhpcyBpcyB1cGRhdGVkIHdoZW4gdGhlIHVwZGF0ZSBpbmRleCBtZXRob2QgZmluaXNoZXMgYW5kIGJlZm9yZSBcclxuZXhwb3J0IGxldCBfZmlyc3RTbGlkZUdyb3VwID0gdHJ1ZTtcclxuXHJcbi8qIHZhciB0byBjaGVjayBpZiBhIG5ldyBncm91cCBpcyBiZWluZyBsb2FkZWQuXHJcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IFxyXG4qL1xyXG5cclxuXHJcblxyXG4vKiogTWV0aG9kIGZvciB0aGUgdGV4dCBjb21wb25lbnQgb3BlcmF0aW9uc1xyXG4gKiBhZnRlciBhIHNsaWRlIGNoYW5nZS5cclxuICogQHByaXZhdGVcclxuKi9cclxuY29uc3QgX3VwZGF0ZVRleHRDb21wb25lbnQgPSAoKSA9PiB7XHJcblx0Ly8gcGF1c2UgYWxsIHRoZSB0ZXh0IGRlbGF5ZWQgY2FsbHNcclxuXHRpZiAoX3BhckdhcCkgeyBfcGFyR2FwLnBhdXNlKCkua2lsbCgpOyB9O1xyXG5cdGlmIChfYWRkV29yZERlbGF5ZWRDYWxsKSB7IF9hZGRXb3JkRGVsYXllZENhbGwucGF1c2UoKS5raWxsKCk7IH07XHJcblx0Ly8gcmVzZXQgdGhlIHRleHQgZGF0YSBpbiBvcmRlciB0byBwcmV2ZW50IHRoZSBzY3JvbGwgdG91Y2ggZXZlbnRzIGZyb21cclxuXHQvLyB0cmlnZ2VyaW5nIGJlZm9yZSB0aGUgbmV3IHNsaWRlJ3MgdGV4dCBpcyBzZXQgYWdhaW5cclxuXHRfcmVzZXRUZXh0RGF0YSh0cnVlKTtcclxuXHQvLyBoaWRlIHRoZSB0ZXh0IHN0YWdlIG9ubHkgaWYgdGhlIHVzZXIgZ29lcyB0byBhIG5ldyBzbGlkZVxyXG5cdF90ZXh0U3RhZ2UuYWxwaGEgPSAwO1xyXG59O1xyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gbWFrZSBhIG5ldyBhamF4IHJlcXVlc3QgYW5kXHRcclxuICogIHNldCB0aGUgYXBwIGluaXQgYm9vbCB0byBmYWxzZSBpbiBvcmRlciB0byBwcmV2ZW50XHJcbiAqIFx0YSB1c2VyIGludGVyYWN0aW9uIHdoaWxlIGEgbmV3IHNldCBvZiBzbGlkZXMgaXMgbG9hZGluZ1xyXG4qL1xyXG5jb25zdCBfbmV3UmVxdWVzdEluaXRSZXNldCA9ICgpID0+IHtcclxuXHQvLyBzZXQgdGhlIGFwcCBpbml0IGJvb2wgdG8gZmFsc2UsIGluIG9yZGVyIHRvIHByZXZlbnQgYW4gdXNlclxyXG5cdC8vIGludGVyYWN0aW9uIGJlZm9yZSB0aGUgc2xpZGVzIGRhdGEgaXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmVyLlxyXG5cdF9yZXNldEFwcEluaXRCb29sKGZhbHNlKTtcclxuXHQvLyBtYWtlIGEgbmV3IGFqYXggcmVxdWVzdCBhZnRlciBpbmNyZWFzaW5nIHRoZSBzbGlkZSBncm91cCB2YWx1ZVxyXG5cdC8vIF9tYWtlUmVxdWVzdCgpO1xyXG5cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblx0Ly8gaW4gb3JkZXIgdG8gc29sdmUgdGhpcyBpc3N1ZVxyXG5cdC8vIGh0dHBzOi8vd2Vic25hcC5zbGFjay5jb20vZmlsZXMvbmRhbW9mbGkvRjZaTEU0SjRCL2ltZ18yOTk3LnBuZ1xyXG5cdC8vIHdlIGhpZGUgdGhlIHN0cmlwZXMgc3RhZ2UgaW4gb3JkZXIgdG8gYXZvaWQgdGhpcyB3ZSBoaWRlIHRoZSBzdHJpcGVzXHJcblx0Ly8gc3RhZ2UuIFRoZW4gd2hlbiB0aGUgc2xpZGVyIGlzIGNyZWF0ZWQgYWdhaW4gYWZ0ZXIgdGhlIGFqYXggcmVzcG9uc2VcclxuXHQvLyB3ZSBzaG93IHRoZSBzdGFnZSBhZ2Fpbi4gVGhlIHN0cmlwZXMgc3RhZ2UgaXMgYSBQSVhJIGNvbnRhaW5lciBvYmplY3RcclxuXHRfc3RyaXBlc1N0YWdlLmFscGhhID0gMDtcclxuXHQvLyBoaWRlIHRoZSBsb2dvIGFuZCBtZW51IGJ1dHRvblxyXG5cdF9sb2dvU3RhZ2UuYWxwaGEgPSAwO1xyXG5cdC8vIGhpZGUgdGhlIG1haW4gc2xpZGVcclxuXHRfbWFpblNsaWRlLmFscGhhID0gMDtcdFxyXG5cdC8vIGhpZGUgdGhlIHRleHQgc3RhZ2UgaW4gb3JkZXIgdG8gaGlkZSB0aGUgdGV4dCBhbmQgYmFja2dyb3VuZFxyXG5cdC8vIHNvbHZlcyBpc3N1ZSAjNTQuIGh0dHBzOi8vZ2l0bGFiLmNvbS9yaGVybmFuZG9nL2FpbnctcGl4aS1jb21wb25lbnQvaXNzdWVzLzU0XHJcblx0X3RleHRTdGFnZS5hbHBoYSA9IDA7XHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdFxyXG5cdC8qIHNob3cgdGhlIHByZWxvYWRlciBhbmltYXRpb25cclxuXHQgKiBUaGUgcHJlbG9hZGVyIGNvdWxkIGJlIHN0b3BwZWQgc28gd2UgcGxheSBpdCBiZWZvcmUgc2hvd2luZyBpdFxyXG5cdCovXHJcblx0aWYgKCBfcHJlbG9hZGVyICkgeyBfcHJlbG9hZGVyLnBsYXkoKTsgfVxyXG5cdFR3ZWVuTGl0ZS50byggX3ByZWxvYWRlciwgMC4xLCB7YWxwaGE6IDF9ICk7XHJcblx0Ly8gY29uc29sZS5sb2coIFwic2hvdyBwcmVsb2FkZXJcIiApO1xyXG5cdFxyXG5cdC8vIGluIHRoaXMgcGFydCBvZiB0aGUgZGV2ZWxvcG1lbnQgdGhlIGFqYXggcmVxdWVzdCBpcyBoYW5kbGVkIG91dHNpZGUgdGhlXHJcblx0Ly8gc2xpZGVyIGFuZCwgd2hpbGUgdGhpcyBtZXRob2QgaXMgc3RpbGwgY2FsbGVkIGludGVybmFsbHksIGlzIHVzZWQgb25seSB0b1xyXG5cdC8vIHJlc2V0IHRoZSBhcHAncyBpbml0IGJvb2wuIGluc3RlYWQgb2YgbWFraW5nIGEgbmV3IHJlcXVlc3QsIGNhbGwgYSBwdWJsaWNcclxuXHQvLyBjYWxsYmFjaywgc2V0IG91dHNpZGUgdGhlIHNsaWRlciwgaW4gb3JkZXIgdG8gdHJpZ2dlciB0aGUgbmV3IGFqYXggY2FsbFxyXG5cdF9ldmVudEVtaXR0ZXIoXCJuZXdncm91cFwiKTtcclxufTtcclxuXHJcblxyXG4vKiogVXBkYXRlIEluZGV4IE1ldGhvZFx0XHJcbiAqIFx0VGhpcyBjaGFuZ2VzIHRoZSBpbmRleCB2YWx1ZSBvZiB0aGUgY3VycmVudCBhbmQgcHJldmlvdXMgc2xpZGVzLlxyXG4gKiBcdElzIGV4ZWN1dGVkIGFmdGVyIHRoZSBzbGlkZSBhbmltYXRpb24gaXMgY29tcGxldGUuXHJcbiAqIFx0QWZ0ZXIgdXBkYXRpbmcgdGhlIGluZGV4IHZhbHVlIGFuZCBpZiBhIG5ldyBncm91cCBpcyBub3QgcmVxdWlyZWQsXHJcbiAqIFx0cHJvY2VzcyB0aGUgdGV4dCBvZiB0aGUgbmV3IHNsaWRlIFxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3VwZGF0ZUluZGV4ID0gKCkgPT4ge1xyXG5cdC8vIGNvbnNvbGUubG9nKCBgdXBkYXRpbmcgaW5kZXguIG1haW4gc2xpZGUgPT4gJHtfbWFpblNsaWRlLmFscGhhfWAgKTtcclxuXHQvLyBjaGVjayB0aGUgZHJhZyBkaXJlY3Rpb25cclxuXHRpZiAoIF9kaXJlY3Rpb24gKSB7XHJcblx0XHQvLyBnb2luZyB0byB0aGUgbmV4dCBzbGlkZVxyXG5cdFx0Ly8gY2hlY2sgaWYgdGhpcyBpcyB0aGUgbGFzdCBzbGlkZSBvbiB0aGUgZ3JvdXBcclxuXHRcdGlmICggX2N1cnJlbnRTbGlkZUluZGV4IDwgX3NsaWRlc0Ftb3VudCApIHtcclxuXHRcdFx0X3VwZGF0ZVRleHRDb21wb25lbnQoKTtcclxuXHRcdFx0Ly8gbm90IHRoZSBsYXN0IHNsaWRlLCBpbmNyZWFzZSB0aGUgY3VycmVudCBzbGlkZSBpbmRleFxyXG5cdFx0XHRfY3VycmVudFNsaWRlSW5kZXgrKztcclxuXHRcdFx0Ly8gbm93IGNyZWF0ZSB0aGUgdGV4dCBmb3IgdGhlIG5ldyBzbGlkZVxyXG5cdFx0XHRfcHJvY2Vzc1NsaWRlVGV4dCgpO1xyXG5cdFx0XHRfY3JlYXRlTmV3U2xpZGVUZXh0KCk7XHJcblx0XHRcdC8vIHVwZGF0ZSB0aGUgcHJvbXB0IGNvbXBvbmVudFxyXG5cdFx0XHRfcmVzdGFydFByb21wdCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0X3VwZGF0ZVRleHRDb21wb25lbnQoKTtcclxuXHRcdFx0Ly8gbmV3IGdyb3VwLCBoaWRlIGFuZCByZXNldCB0aGUgcHJvbXB0IGNvbXBvbmVudFxyXG5cdFx0XHRfaGlkZVByb21wdCgpO1xyXG5cdFx0XHRfcmVzZXRQcm9tcHRUZXh0KCk7XHJcblx0XHRcdC8vIHRoaXMgaXMgdGhlIGxhc3Qgc2xpZGUsIHJlc2V0IHRoZSBzbGlkZSBpbmRleCB0byAwXHJcblx0XHRcdF9jdXJyZW50U2xpZGVJbmRleCA9IDA7XHJcblx0XHRcdC8vIGluY3JlYXNlIHRoZSBzbGlkZXMgZ3JvdXAgdmFsdWUgYnkgMVxyXG5cdFx0XHRfc2xpZGVzR3JvdXArKztcclxuXHRcdFx0Ly8gbmV3IHJlcXVlc3QgYW5kIHNldCB0aGUgaW5pdCBib29sIHRvIGZhbHNlXHJcblx0XHRcdF9uZXdSZXF1ZXN0SW5pdFJlc2V0KCk7XHJcblx0XHR9IC8vIGN1cnJlbnQgaW5kZXggY29uZGl0aW9uYWwgZW5kIFxyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBnb2luZyB0byB0aGUgcHJldmlvdXMgc2xpZGVcclxuXHRcdC8vIGNoZWNrIGlmIHRoaXMgaXMgdGhlIGZpcnN0IHNsaWRlXHJcblx0XHRpZiAoIF9jdXJyZW50U2xpZGVJbmRleCA+IDAgKSB7XHJcblx0XHRcdF91cGRhdGVUZXh0Q29tcG9uZW50KCk7XHJcblx0XHRcdC8vIHRoaXMgaXMgbm90IHRoZSBmaXJzdCBzbGlkZSwgcmVkdWNlIHRoZSBzbGlkZSBpbmRleFxyXG5cdFx0XHRfY3VycmVudFNsaWRlSW5kZXgtLTtcclxuXHRcdFx0Ly8gbm93IGNyZWF0ZSB0aGUgdGV4dCBmb3IgdGhlIG5ldyBzbGlkZVxyXG5cdFx0XHRfcHJvY2Vzc1NsaWRlVGV4dCgpO1xyXG5cdFx0XHRfY3JlYXRlTmV3U2xpZGVUZXh0KCk7XHJcblx0XHRcdC8vIHVwZGF0ZSB0aGUgcHJvbXB0IGNvbXBvbmVudFxyXG5cdFx0XHRfcmVzdGFydFByb21wdCgpO1xyXG5cdFx0fSBlbHNlIGlmICggX2N1cnJlbnRTbGlkZUluZGV4ID09PSAwICYmIF9zbGlkZXNHcm91cCA+IDAgKSB7XHJcblx0XHRcdC8vIG5ldyBncm91cCwgaGlkZSBhbmQgcmVzZXQgdGhlIHByb21wdCBjb21wb25lbnRcclxuXHRcdFx0X2hpZGVQcm9tcHQoKTtcclxuXHRcdFx0X3Jlc2V0UHJvbXB0VGV4dCgpO1xyXG5cdFx0XHRfdXBkYXRlVGV4dENvbXBvbmVudCgpO1xyXG5cdFx0XHQvLyB0aGlzIGlzIHRoZSBmaXJzdCBzbGlkZSBhbmQgbm90IHRoZSBmaXJzdCBncm91cFxyXG5cdFx0XHQvLyBpZiB0aGlzIGlzIHRoZSBmaXJzdCBncm91cCBub3RoaW5nIHNob3VsZCBoYXBwZW5cclxuXHRcdFx0Ly8gc2V0IHRoZSBpbmRleCB0byB0aGUgc2xpZGVzIGFtb3VudFxyXG5cdFx0XHRfY3VycmVudFNsaWRlSW5kZXggPSBfc2xpZGVzQW1vdW50O1xyXG5cdFx0XHQvLyByZWR1Y2UgdGhlIHNsaWRlIGdyb3VwXHJcblx0XHRcdF9zbGlkZXNHcm91cC0tO1xyXG5cdFx0XHQvLyBuZXcgcmVxdWVzdCBhbmQgc2V0IHRoZSBpbml0IGJvb2wgdG8gZmFsc2VcclxuXHRcdFx0X25ld1JlcXVlc3RJbml0UmVzZXQoKTtcclxuXHRcdH0gLy8gY3VycmVudCBpbmRleCBjb25kaXRpb25hbCBlbmRcclxuXHR9IC8vIGRpcmVjdGlvbiBjb25kaXRpb25hbCBlbmRcclxuXHJcblx0LyogIGNoZWNrIGlmIGdyYXBoaWMgc3RyaXBlcyB3ZXJlIGNyZWF0ZWQgYW5kIGlmIHRoZSBjdXJyZW50IHNsaWRlIGltYWdlXHJcblx0ICpcdHdhcyBsb2FkZWQgaW4gb3JkZXIgdG8gdXBkYXRlIHRoZSBjdXJyZW50IGNvbG9yIGFycmF5IGluZGV4LlxyXG5cdCAqICBXZSBjaGVjayB0aGUgbWFpbiBzbGlkZSBiZWNhdXNlIGlmIHRoZSBncmFwaGljIHN0cmlwZXMgYXJlIGNyZWF0ZWQgZm9yXHJcblx0ICogXHR0aGUgcHJldmlvdXMgb3IgbmV4dCBzbGlkZSBpbWFnZSwgdGhlbiB0aGUgc2FtZSBjb2xvciB1c2VkIHRvIGNyZWF0ZSBcclxuXHQgKiBcdHRoZSBzdHJpcGVzIHNob3VsZCBiZSB1c2VkIGZvciB0aGUgZ3JhcGhpYyBiYXNlIHRleHR1cmUgd2hlbiB0aGUgbWFpblxyXG5cdCAqIFx0c2xpZGUgdGV4dHVyZSBpcyB1cGRhdGVkIHRvIGEgc29saWQgY29sb3IuIE90aGVyd2lzZSB0aGVyZSB3aWxsIGJlIGFcclxuXHQgKiBcdGp1bXAgaW4gdGhlIGNvbG9yIG9uIHRoZSB0b3VjaCBzdGFydCBtZXRob2QuXHJcblx0Ki9cclxuXHRpZiAoIF9ncmFwaGljU3RyaXBlc0NyZWF0ZWQgJiYgX21haW5TbGlkZS5faXNMb2FkZWQgKSB7XHJcblx0XHRfcm90YXRlQ29sb3IoKTtcclxuXHR9XHJcblx0XHJcblx0Ly8gYWZ0ZXIgdXBkYXRpbmcgdGhlIGN1cnJlbnQgaW5kZXgsIGNoZWNrIGlmIHRoaXMgaXMgdGhlIGZpcnN0IHNsaWRlXHJcblx0Ly8gb2YgdGhlIGZpcnN0IGdyb3VwIGluIG9yZGVyIHRvIHNldCB0aGUgYm9vbCB0byB0cnVlIG9yIGZhbHNlXHJcblx0X2ZpcnN0U2xpZGVHcm91cCA9ICggX2N1cnJlbnRTbGlkZUluZGV4ID09PSAwICYmIF9zbGlkZXNHcm91cCA9PT0gMCApO1xyXG59OyAvLyB1cGRhdGUgaW5kZXggZW5kXHJcblxyXG5cclxuLyoqIEdyb3VwIFJlc2V0IE1ldGhvZFx0XHJcbiAqICBXaGVuIHRoZSBzbGlkZXIgaXMgZGVzdHJveWVkLCB0aGUgc2xpZGVzIGdyb3VwIG11c3QgYmUgc2V0IHRvIDAuXHRcclxuICogXHRBbHNvIHRoZSBmaXJzdCBzbGlkZSBncm91cCBib29sIHNob3VsZCBiZSBzZXQgdG8gdHJ1ZSBhZ2FpblxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3Jlc2V0U2xpZGVyR3JvdXAgPSAoKSA9PiB7XHJcblx0X3NsaWRlc0dyb3VwID0gMDtcclxuXHRfY3VycmVudFNsaWRlSW5kZXggPSAwO1xyXG5cdF9maXJzdFNsaWRlR3JvdXAgPSB0cnVlO1xyXG59O1xyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogIFNMSURFUyBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG4vKiAgVGhpcyBtb2R1bGUgY3JlYXRlcyB0aGUgc2xpZGVzIHdpdGggYSBwcml2YXRlIG1ldGhvZC5cclxuICogIFRha2VzIHRoZSBzbGlkZXMgZGF0YSBnZW5lcmF0ZWQgaW4gdGhlIGFqYXggbW9kdWxlIG9yIGluIGFuIGFqYXggY2FsbFxyXG4qL1xyXG5cclxuLy8gZ2V0IHNwcml0ZXMgbWV0aG9kc1xyXG5pbXBvcnQgeyBfY3JlYXRlU3ByaXRlLCBfc2NhbGVTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVzLW1vZHVsZVwiO1xyXG4vLyBnZXQgbG9hZGluZyBzcHJpdGVcclxuaW1wb3J0IHsgX2Jhc2VTcHJpdGVUZXh0dXJlIH0gZnJvbSBcIi4vcGl4aS1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBzY3JlZW4gZGltZW5zaW9uc1xyXG5pbXBvcnQgeyB3aW5TaXplIH0gZnJvbSBcIi4vd2luZG93XCI7XHJcbi8vIGdldCB0aGUgYW5pbWF0aW9uIHN0b3JlXHJcbmltcG9ydCB7IF9hbmltYXRpb25TdG9yZSwgX3NldEdlbmVyaWMsIF9zZXRTcGVjaWZpYywgX3Jlc3VtZUJ1cm5zSW5zdGFuY2VzIH0gZnJvbSBcIi4vYW5pbWF0aW9uXCI7XHJcbi8vIGdldCBtYWluIHJlbmRlcmVyXHJcbmltcG9ydCB7IF9tYWluUmVuZGVyLCBfbG9nb1N0YWdlLCBfc3RyaXBlc1N0YWdlLCBfdGV4dFN0YWdlLCBfcHJvbXB0U3RhZ2UgfSBmcm9tIFwiLi9waXhpLW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byBhZGQgdGhlIGxvZ29cclxuLy8gaW1wb3J0IHsgX2FkZExvZ28gfSBmcm9tIFwiLi9sb2dvLW1vZHVsZVwiO1xyXG5pbXBvcnQgeyBfcHJlbG9hZGVyLCBfYWRkTG9nbyB9IGZyb20gXCIuL2xvYWRlclwiO1xyXG4vLyBnZXQgdGhlIHByZWxvYWRlclxyXG4vLyBpbXBvcnQgeyBfcHJlbG9hZGVyIH0gZnJvbSBcIi4vbG9hZGVyXCI7XHJcblxyXG4vLyB1c2UgdGhpcyB0byBwcmV2ZW50IGludGVyYWN0aW9ucyB1bnRpbCB0aGUgdGV4dHVyZXMgYXJlIGFkZGVkIHRvIHRoZSBhcnJheVxyXG5leHBvcnQgbGV0IF9hcHBJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4vLyB0aGUgbWFpbiBzbGlkZSB2YXJcclxuZXhwb3J0IGxldCBfbWFpblNsaWRlO1xyXG5cclxuZXhwb3J0IGxldCB0ZXN0U3ByaXRlO1xyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gUG9zaXRpb24gdGhlIE1haW4gU2xpZGVcdFxyXG4gKiAgVGhpcyBtZXRob2QgdGFrZXMgdGhlIGFuaW1hdGlvbiBkYXRhIGZyb20gdGhlIGJhc2UgdGV4dHVyZSBhbmQgZGVwZW5kaW5nXHJcbiAqIFx0b24gdGhhdCwgcG9zaXRpb25zIHRoZSBtYWluIHNsaWRlLlx0XHJcbiAqIFx0VmVydGljYWwgZWZmZWN0LCB0aGUgbWFpbiBzbGlkZSBpcyBzZXQgYXQgdGhlIGJvdHRvbSBlZGdlIG9mIHRoZSBzY3JlZW4uXHRcclxuICogXHRIb3Jpem9udGFsIGVmZmVjdCwgdGhlIG1haW4gc2xpZGUgaXMgc2V0IHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IGVkZ2Ugb2YgdGhlXHJcbiAqIFx0c2NyZWVuLlx0XHJcbiAqIFx0Wm9vbSBlZmZlY3QsIHRoZSBtYWluIHNsaWRlIGlzIHNldCBhdCB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW4gYW5kIGFsc28gdGhlXHJcbiAqIFx0YW5jaG9yIHBvaW50IGlzIHNldCB0byAwLjUgaW4gb3JkZXIgdG8gbWFrZSB0aGUgem9vbSBlZmZlY3QgZnJvbSB0aGUgbWlkZGxlXHJcbiAqIFx0b2YgdGhlIHNsaWRlLlx0XHJcbiAqIFx0SW4gb3JkZXIgdG8gZGVjaWRlIHRvIHVzZSB6b29tIGluL291dCBvciBob3Jpem9udGFsIGxlZnQvcmlnaHQsIGNoZWNrIHRoZSBsYXN0XHJcbiAqIFx0c3BlY2lmaWMgYW5pbWF0aW9uIHR5cGUgZnJvbSB0aGUgYW5pbWF0aW9uIHN0b3JlLlxyXG4gKiBcdEBwYXJhbSB7b2JqZWN0fSBiOiB0aGUgYmFzZSB0ZXh0dXJlIGZvciB0aGUgY3VycmVudCBzbGlkZSBpbmRleC5cclxuICogXHRAcGFyYW0ge251bWJlcn0gbHM6IHRoZSBsYXN0IHNwZWNpZmljIGFuaW1hdGlvbiBmcm9tIHRoZSBhbmltYXRpb24gc3RvcmVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9wb3NpdGlvbk1haW5TbGlkZSA9IChiLCBscykgPT4ge1xyXG5cdC8qXHRUaGUgbWFpbiBzbGlkZSBtdXN0IGJlIGF0ICgwLDApIHBvc2l0aW9uIGluIG9yZGVyIHRvIHRoZW4gcG9zaXRpb24gaXQgY29ycmVjdGx5XHJcblx0ICogIGFmdGVyIGdldHRpbmcgdGhlIGdlbmVyaWMgYW5pbWF0aW9uIHR5cGUuXHJcblx0ICogXHRTZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBtYWluIHNsaWRlIHRvICgwLDApIGFuZCB0aGUgYW5jaG9yIHBvaW50IHRvIDAuXHJcblx0Ki9cclxuXHRfbWFpblNsaWRlLnBvc2l0aW9uLnNldCgwKTtcclxuXHRfbWFpblNsaWRlLmFuY2hvci5zZXQoMCk7XHJcblxyXG5cdC8vIHN0b3JlIHRoZSB0ZXh0dXJlJ3MgZ2VuZXJpYyBhbmltYXRpb24gdHlwZSBpbnRlZ2VyXHJcblx0Y29uc3QgX2Jhc2VHZW5lcmljVHlwZSA9IGIuX2dlbmVyaWNBbmltYXRpb25UeXBlO1xyXG5cdFxyXG5cdC8vIGRlcGVuZGluZyBvbiB0aGF0IHZhbHVlIHBvc2l0aW9uIHRoZSBtYWluIHNsaWRlXHJcblx0c3dpdGNoICggX2Jhc2VHZW5lcmljVHlwZSApIHtcclxuXHRcdGNhc2UgMDpcclxuXHRcdFx0Ly8gdmVydGljYWwgYW5pbWF0aW9uLiBBbmltYXRlIGZyb20gYm90dG9tLiBwb3NpdGlvbiBtYWluIHNsaWRlIHRvIGEgXHJcblx0XHRcdC8vIG5lZ2F0aXZlIHkgdmFsdWVcclxuXHRcdFx0Ly8gZ2V0IG1haW4gdmFsdWUuIHRoZSBtYWluIHNsaWRlIGlzIGFscmVhZHkgc2NhbGVkIHRvIGZpdCB0aGUgc2NyZWVuXHJcblx0XHRcdC8vIHNvIGlzIHRoZSBzY3JlZW4gc2l6ZSBtaW51cyB0aGUgbWFpbiBzbGlkZSBoZWlnaHRcclxuXHRcdFx0Ly8gX21haW5TbGlkZS55ID0gd2luU2l6ZS5oIC0gX21haW5TbGlkZS5oZWlnaHQ7XHJcblx0XHRcdF9tYWluU2xpZGUucG9zaXRpb24uc2V0KDAsIHdpblNpemUuaCAtIF9tYWluU2xpZGUuaGVpZ2h0KTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdC8vIGhvcml6b250YWwgYW5pbWF0aW9uLiBpZiB0aGUgcHJldmlvcyBzcGVjaWZpYyBhbmltYXRpb24gaXMgMSAodG8gdGhlIGxlZnQpXHJcblx0XHRcdC8vIHRoZSBzbGlkZSBzaG91bGQgYmUgYXQgdGhlIHJpZ2h0IGVkZ2Ugb2YgdGhlIHNjcmVlbi4gSWYgaXMgMCAodG8gdGhlIHJpZ2h0KVxyXG5cdFx0XHQvLyB0aGUgc2xpZGUgc2hvdWxkIGJlIGF0IHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlIHNjcmVlblxyXG5cdFx0XHRfbWFpblNsaWRlLnggPSBscyA9PT0gMSA/IHdpblNpemUudyAtIF9tYWluU2xpZGUud2lkdGggOiAwO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgMjpcclxuXHRcdFx0Ly8gem9vbSBhbmltYXRpb24uIGNlbnRlciB0aGUgbWFpbiBzbGlkZSBhbmQgc2V0IGl0J3MgYW5jaG9yIHRvIDAuNVxyXG5cdFx0XHRfbWFpblNsaWRlLnggPSB3aW5TaXplLncgLyAyO1xyXG5cdFx0XHRfbWFpblNsaWRlLnkgPSB3aW5TaXplLmggLyAyO1xyXG5cdFx0XHRfbWFpblNsaWRlLmFuY2hvci5zZXQoMC41KTtcclxuXHR9IC8vIHN3aXRjaFxyXG5cclxuXHQvKlx0QWZ0ZXIgcG9zaXRpb25pbmcgdGhlIHNsaWRlLCB3ZSBkb24ndCBuZWVkIHRoZSBnZW5lcmljIGFuZCBzcGVjaWZpYyBkYXRhIGZyb21cclxuXHQgKiAgdGhlIHByZXZpb3VzIHNsaWRlIGluZGV4IGluIHRoZSBzdG9yZSwgc28gcnVuIHRoZSBtZXRob2RzIHRvIHVwZGF0ZSB0aGUgc3RvcmVcclxuXHQgKiBcdGRhdGEgXHJcblx0Ki9cclxuXHQvLyBzZXQgdGhlIGdlbmVyaWMgYW5pbWF0aW9uIHR5cGUgZm9yIHRoZSBjdXJyZW50IHNsaWRlXHJcblx0Ly8gcGFzcyB0aGUgZ2VuZXJpYyB0eXBlIG9mIHRoZSBiYXNlIHRleHR1cmVcclxuXHRfc2V0R2VuZXJpYyhfYmFzZUdlbmVyaWNUeXBlKTtcclxuXHQvLyBzZXQgdGhlIHNwZWNpZmljIHR5cGUgaWYgdGhlIGdlbmVyaWMgaXMgbm90IHZlcnRpY2FsXHJcblx0X3NldFNwZWNpZmljKF9iYXNlR2VuZXJpY1R5cGUpO1xyXG5cclxufTsgLy8gcG9zaXRpb24gbWFpbiBzbGlkZVxyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gVXBkYXRlIHRoZSBNYWluIFNsaWRlIFRleHR1cmVcclxuICogXHRUaGUgcGFyYW0gc2hvdWxkIGJlIGEgcGl4aSBiYXNlIHRleHR1cmUuIEluIHNvbWUgY2FzZXMgaXQgY291bGQgYmUgYVxyXG4gKiBcdGZhbHNlIG9yIG51bGwgdmFsdWUuXHJcbiAqICBAcGFyYW0ge29iamVjdH0gYiB0aGUgbmV3IGJhc2UgdGV4dHVyZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3VwZGF0ZU1haW5TbGlkZVRleHR1cmUgPSBiID0+IHtcclxuXHRfbWFpblNsaWRlLmFscGhhID0gMDtcclxuXHQvLyBjaGVjayB0aGUgdmFsdWUgcGFzc2VkXHJcblx0aWYgKCBiICkge1xyXG5cdFx0Ly8gYSBiYXNlIHRleHR1cmUgaXMgcGFzc2VkXHJcblx0XHQvLyBjcmVhdGUgYSBuZXcgcGl4aSB0ZXh0dXJlXHJcblx0XHQvLyBhcHBseSB0aGUgbmV3IHRleHR1cmUgdG8gdGhlIG1haW4gc2xpZGVcclxuXHRcdF9tYWluU2xpZGUudGV4dHVyZSA9IG5ldyBQSVhJLlRleHR1cmUoIGIgKTtcclxuXHRcdC8vIHNldCB0aGUgaXMgbG9hZGVkIHByb3BlcnR5IHRvIHRydWVcclxuXHRcdF9tYWluU2xpZGUuX2lzTG9hZGVkID0gdHJ1ZTtcclxuXHJcblx0XHQvLyBnZXQgdGhlIHNjYWxlIHJhdGlvIGZyb20gdGhlIGJhc2UgdGV4dHVyZSBhbmQgcGFzcyBpdCB0byB0aGUgc2NhbGVcclxuXHRcdC8vIG1ldGhvZCwgaW4gb3JkZXIgdG8gc2l6ZSBhbmQgdGhlbiBwb3NpdGlvbiB0aGUgbWFpbiBzbGlkZVxyXG5cdFx0Y29uc3QgeyBfc2NhbGVSYXRpbywgX3ZSYXRpbywgX2dlbmVyaWNBbmltYXRpb25UeXBlIH0gPSBiO1xyXG5cdFx0LyogIGNoZWNrIGlmIHRoZSBhbmltYXRpb24gdHlwZSBpcyB6b29tIGFuZCBpZiBpdCdzIHpvb20gb3V0LlxyXG5cdFx0ICpcdGluIHRoYXQgY2FzZSB0aGUgbWFpbiBzbGlkZSBzaG91bGQgYmUgc2NhbGVkIDUwJSBvdmVyIHRoZSBzY2FsZSB0b1xyXG5cdFx0ICpcdG1ha2UgaXQgZml0IGluIHRoZSBzY3JlZW4uIEFsc28gdGhpcyBtZWFucyB0aGF0IHRoZSBtYWluIHNsaWRlIHNob3VsZFxyXG5cdFx0ICpcdGJlIHBvc2l0aW9uZWQgYXQgdGhlIGNlbnRlciBvZiB0aGUgc2NyZWVuIGFuZCB0aGUgYW5jaG9yIHNob3VsZCBiZSBzZXRcclxuXHRcdCAqXHR0byAwLjUgdG8gbWFrZSB0aGUgYW5pbWF0aW9uIGhhcHBlbiB3aXRoIHRoZSBpbWFnZSBjZW50ZXJlZCBpbiB0aGUgc2NyZWVuLlxyXG5cdFx0Ki9cclxuXHRcdGNvbnN0IHsgem9vbSwgaG9yaXpvbnRhbCB9ID0gX2FuaW1hdGlvblN0b3JlLmxhc3RTcGVjaWZpYztcclxuXHRcdC8vIHNldCBhIGNvcnJlY3RlZCByYXRpbyBmb3IgdGhlIHNjYWxlLlxyXG5cdFx0Ly8gY2hlY2sgaWYgdGhlIGdlbmVyaWMgXHJcblx0XHQvLyBpZiB0aGUgbGFzdCB6b29tIGFuaW1hdGlvbiB3YXMgem9vbS1pbiAoMCkgaW5jcmVhc2UgdGhlIHNjYWxlIHJhdGlvXHJcblx0XHRjb25zdCBfY29ycmVjdGVkU2NhbGVSYXRpbyA9ICggem9vbSA9PT0gMCAmJiBfZ2VuZXJpY0FuaW1hdGlvblR5cGUgPT09IDIgKSA/IF9zY2FsZVJhdGlvICogMS41IDogX3NjYWxlUmF0aW87XHJcblx0XHQvLyBhZGQgcHJvcGVydGllcyB0byB0aGUgbWFpbiBzbGlkZSBvYmplY3QgdG8gYWNjZXNzIHRocm91Z2ggdGhlIGNvZGVcclxuXHRcdF9tYWluU2xpZGUuX3ZSYXRpbyA9IF92UmF0aW87XHJcblx0XHRfbWFpblNsaWRlLl9zY2FsZVJhdGlvID0gX3NjYWxlUmF0aW87XHJcblx0XHRfbWFpblNsaWRlLl9jb3JyZWN0ZWRTY2FsZVJhdGlvID0gX2NvcnJlY3RlZFNjYWxlUmF0aW87XHJcblx0XHRfbWFpblNsaWRlLl9hbmltYXRpb25UeXBlID0gX2dlbmVyaWNBbmltYXRpb25UeXBlO1xyXG5cdFx0Ly8gY29uc29sZS5sb2coYHVwZGF0ZSB0ZXh0dXJlICogcmF0aW8gPT4gJHtfc2NhbGVSYXRpb30gKiBjb3JyZWN0ZWQgPT4gJHtfY29ycmVjdGVkU2NhbGVSYXRpb31gKTtcclxuXHJcblx0XHQvLyBzY2FsZSB0aGUgbWFpbiBzbGlkZSB1c2luZyB0aGUgc2NhbGUgcmF0aW8gZnJvbSB0aGUgYmFzZSB0ZXh0dXJlXHJcblx0XHRfc2NhbGVTcHJpdGUoX21haW5TbGlkZSwgX2NvcnJlY3RlZFNjYWxlUmF0aW8pO1xyXG5cdFx0Ly8gbm93IHBvc2l0aW9uIHRoZSBtYWluIHNsaWRlLiBwYXNzIHRoZSBiYXNlIHRleHR1cmUgZm9yIHRoZSBjdXJyZW50IHNsaWRlXHJcblx0XHRfcG9zaXRpb25NYWluU2xpZGUoYiwgaG9yaXpvbnRhbCk7XHJcblx0XHQvLyBjcmVhdGUgdGhlIG5ldyB0aW1lciBhbmQgYW5pbWF0aW9uIGluc3RhbmNlc1xyXG5cdFx0X3Jlc3VtZUJ1cm5zSW5zdGFuY2VzKHRydWUpO1xyXG5cdH0gZWxzZSB7XHJcblxyXG5cdFx0Ly8gZWl0aGVyIGZhbHNlIG9yIG51bGwgaXMgcGFzc2VkLCBpbiB0aGF0IGNhc2UgdXNlIHRoZSBkZWZhdWx0IHRleHR1cmVcclxuXHRcdF9tYWluU2xpZGUudGV4dHVyZSA9IF9iYXNlU3ByaXRlVGV4dHVyZTtcclxuXHRcdC8vIHNldCB0aGUgaXMgbG9hZGVkIHByb3BlcnR5IHRvIHRoZSB2YWx1ZSBwYXNzZWRcclxuXHRcdF9tYWluU2xpZGUuX2lzTG9hZGVkID0gZmFsc2U7XHJcblx0XHQvLyBzZXQgdGhlIHNjYWxlIHJhdGlvIHRvIDFcclxuXHRcdF9tYWluU2xpZGUucmF0aW8gPSAxO1xyXG5cdFx0X21haW5TbGlkZS5wb3NpdGlvbi5zZXQoMCk7XHJcblx0XHRfbWFpblNsaWRlLmFuY2hvci5zZXQoMCk7XHJcblx0XHRfbWFpblNsaWRlLndpZHRoID0gd2luU2l6ZS53O1xyXG5cdFx0X21haW5TbGlkZS5oZWlnaHQgPSB3aW5TaXplLmg7XHJcblx0XHQvLyBjcmVhdGUgdGhlIG5ldyB0aW1lciBhbmQgYW5pbWF0aW9uIGluc3RhbmNlc1xyXG5cdFx0Ly8gVEhJUyBNSUdIVCBOT1QgQkUgTkVDRVNTQVJZIElOIFRIRSBDQVNFIE9GIEEgRkFJTEVEIElNQUdFIExPQURcclxuXHRcdF9yZXN1bWVCdXJuc0luc3RhbmNlcyh0cnVlKTtcclxuXHR9XHJcblxyXG5cdC8vIHJlc2V0IHRoZSBvcGFjaXR5IG9mIHRoZSBtYWluIHNsaWRlXHJcblx0X21haW5TbGlkZS5hbHBoYSA9IDE7XHJcbn07XHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byBjZW50ZXIgdGhlIE1haW4gU2xpZGVcdFxyXG4gKiAgSWYgdGhlIGJ1cm5zIGVmZmVjdCBpcyB6b29tIGluL291dCwgdGhlIG1haW4gc2xpZGUgc2hvdWxkIGJlIHBvc2l0aW9uZWRcclxuICogXHRhdCB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW4gYW5kIGl0J3MgYW5jaG9yIHNob3VsZCBiZSAwLjUuXHRcclxuICogXHRUbyBnZXQgdGhlIGNlbnRlciBwb3NpdGlvbiB1c2UgdGhlIHdpbmRvdyBkaW1lbnNpb25zIGRpdmlkZWQgYnkgdHdvXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfY2VudGVyTWFpblNsaWRlID0gKCkgPT4ge307XHJcblxyXG4vKipcclxuICogTWV0aG9kIHRvIGhpZGUgdGhlIHByZWxvYWRlci5cclxuICogVGhlcmUgY291bGQgYmUgYSBzaXR1YXRpb24gd2hlbiB0aGUgcHJlbG9hZGVyIGlzIG5vdCBjcmVhdGVkIHlldCB3aGVuXHJcbiAqIHRoZSBtYWluIHNsaWRlIGlzIGFscmVhZHkgY3JlYXRlZCBhbmQgYWRkZWQgdG8gdGhlIG1haW4gc3RhZ2UuXHJcbiAqIFJlbW92ZSB0aGUgcHJlbG9hZGVyIGFuZCB0aGVuIG1ha2UgdGhlIG1haW4gc2xpZGUgYW5kIHRoZSBzdGFnZVxyXG4gKiB2aXNpYmxlLiBDaGVjayBpcyB0aGUgcHJlbG9hZGVyIGlzIHJlYWR5IGFuZCBzZXQgYSBsb29wIHdoaWxlIGlzIG5vdFxyXG4gKiBsb2FkZWQgYW5kIHRoZW4gcmVtb3ZlIGl0IHdoZW4gaXMgbG9hZGVkLlxyXG4qL1xyXG5jb25zdCBfcmVtb3ZlTG9hZGVyID0gKCkgPT4ge1xyXG5cdGlmICggIV9wcmVsb2FkZXIgKSB7XHJcblx0XHQvLyB0aGUgcHJlbG9hZGVyIGlzIG5vdCBkZWZpbmVkLCB3YWl0IGEgd2hpbGUgYW5kIHRoZW4gY2hhayBhZ2FpblxyXG5cdFx0c2V0VGltZW91dCggX3JlbW92ZUxvYWRlciw1MCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8qIGhpZGUgdGhlIHByZWxvYWRlciBhbmltYXRpb25cclxuXHRcdCAqIEFmdGVyIGhpZGluZyB0aGUgcHJlbG9hZGVyLCBpdCBzaG91bGQgYmUgc3RvcHBlZCB0byBcclxuXHRcdCovXHJcblx0XHRUd2VlbkxpdGUudG8oX3ByZWxvYWRlciwgMC4xLCB7XHJcblx0XHRcdGFscGhhOiAwLFxyXG5cdFx0XHRvbkNvbXBsZXRlOiAoKSA9PiB7IF9wcmVsb2FkZXIuc3RvcCgpO31cclxuXHRcdH0pO1xyXG5cdFx0LyogUmVnYXJkbGVzcyBpZiB0aGUgYXBwIGlzIHJ1bm5pbmcgZm9yIHRoZSBmaXJzdCB0aW1lIG9yIGp1c3QgY2hhbmdpbmcgdGhlIHNsaWRlc1xyXG5cdFx0ICogc2V0LCB3ZSBzZXQgdGhlIGlzIGxvYWRlZCBwcm9wZXJ0eSB0byBudWxsLlxyXG5cdFx0ICogVGhlIGlzIGxvYWRlZCBwcm9wZXJ0eSwgY291bGQgYmUgc2V0IGluIGFub3RoZXIgcGxhY2UgaW4gdGhlIGNvZGUsIGNoZWNrIGlmXHJcblx0XHQgKiB0aGUgcHJvcGVydHkgaXMgdW5kZWZpbmVkIG9yIG5vdC4gSWYgaXMgdW5kZWZpbmVkIHNldCBpdCB0byBudWxsICh0aGlzIG1lYW5zIHRoYXRcclxuXHRcdCAqIHRoZSB1cGRhdGUgc2xpZGUgbWV0aG9kIGhhcyBub3QgYmVlbiBjYWxsZWQgeWV0KS5cclxuXHRcdCovXHJcblx0XHRpZiAoIF9tYWluU2xpZGUuX2lzTG9hZGVkID09PSB1bmRlZmluZWQgKSB7IF9tYWluU2xpZGUuX2lzTG9hZGVkID0gbnVsbDsgfTtcclxuXHRcdC8vIEFsc28ganVzdCBpbiBjYXNlIHdlIHNldCB0aGUgYWxwaGEgdG8gMS4gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcnVuLCB0aGUgYWxwaGEgdmFsdWVcclxuXHRcdC8vIGlzIDEgYWxyZWFkeSwgYnV0IGlmIHdlJ3JlIGNoYW5naW5nIHRoZSBzbGlkZXMgZ3JvdXAgaXQgc2hvdWxkIGJlIDAsIHNvIHdlIHNldCBpdCB0byAxXHJcblx0XHRfbWFpblNsaWRlLmFscGhhID0gMTtcclxuXHJcblxyXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblx0XHQvLyBpbiBvcmRlciB0byBzb2x2ZSB0aGlzIGlzc3VlXHJcblx0XHQvLyBodHRwczovL3dlYnNuYXAuc2xhY2suY29tL2ZpbGVzL25kYW1vZmxpL0Y2WkxFNEo0Qi9pbWdfMjk5Ny5wbmdcclxuXHRcdC8vIHdlIGhpZGUgdGhlIHN0cmlwZXMgc3RhZ2UgaW4gb3JkZXIgdG8gYXZvaWQgdGhpcyB3ZSBoaWRlIHRoZSBzdHJpcGVzXHJcblx0XHQvLyBzdGFnZS4gVGhlbiB3aGVuIHRoZSBzbGlkZXIgaXMgY3JlYXRlZCBhZ2FpbiBhZnRlciB0aGUgYWpheCByZXNwb25zZVxyXG5cdFx0Ly8gd2Ugc2hvdyB0aGUgc3RhZ2UgYWdhaW4uIFRoZSBzdHJpcGVzIHN0YWdlIGlzIGEgUElYSSBjb250YWluZXIgb2JqZWN0XHJcblx0XHQvLyBub3cgYWZ0ZXIgdGhlIGFqYXggcmVzcG9uc2Ugd2Ugc2hvdyB0aGUgY29udGFpbmVyIGFnYWluLlxyXG5cdFx0X3N0cmlwZXNTdGFnZS5hbHBoYSA9IDE7XHJcblx0XHQvLyBzaG93IHRoZSBsb2dvIGFuZCB0aGUgbWVudSBidXR0b25cclxuXHRcdF9sb2dvU3RhZ2UuYWxwaGEgPSAxO1xyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdH0gXHJcbn07XHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byBjcmVhdGUgdGhlIE1haW4gU2xpZGUgU3ByaXRlXHJcbiAqICBBZGRzIGVhY2ggc2xpZGUgKHNwcml0ZSBvYmplY3QpIHRvIHRoZSBhcnJheS4gXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfY3JlYXRlTWFpblNsaWRlID0gKCkgPT4ge1xyXG5cdFxyXG5cdC8qICBjcmVhdGUgdGhlIG1haW4gc2xpZGUgb25seSBpZiBpcyB1bmRlZmluZWQgKHNsaWRlcidzIGZpcnN0IHJ1bilcclxuXHQgKlx0YWZ0ZXIgdGhhdCB0aGUgbWFpbiBzbGlkZSB3aWxsIGJlIGEgcGl4aSBzcHJpdGUgYW5kIGlzIG5vdCBuZWNlc3NhcnlcclxuXHQgKlx0dG8gY3JlYXRlIGl0IGFnYWluLlxyXG5cdCovXHJcblx0aWYgKCBfbWFpblNsaWRlID09PSB1bmRlZmluZWQgKSB7XHJcblx0XHRfbWFpblNsaWRlID0gbnVsbDtcclxuXHRcdC8vIGNyZWF0ZSB0aGUgbWFpbiBzbGlkZSBhbmQgYWRkIGl0IHRvIHRoZSBtYWluIHJlbmRlcmVyXHJcblx0XHRfbWFpblNsaWRlID0gX2NyZWF0ZVNwcml0ZShfYmFzZVNwcml0ZVRleHR1cmUsIHVuZGVmaW5lZCk7XHJcblx0XHQvLyBhZGQgdGhlIHN0cmlwZXMgc3RhZ2UgdG8gdGhlIHJlbmRlcmVyXHJcblx0XHRfbWFpblJlbmRlci5zdGFnZS5hZGRDaGlsZCggX3N0cmlwZXNTdGFnZSApO1xyXG5cdFx0Ly8gYWRkIHRoZSBsb2dvIHN0YWdlXHJcblx0XHRfbWFpblJlbmRlci5zdGFnZS5hZGRDaGlsZCggX2xvZ29TdGFnZSApO1xyXG5cdFx0Ly8gYWZ0ZXIgY3JlYXRpbmcgYW5kIGFkZGluZyB0aGUgbWFpbiBzbGlkZSwgYWRkIHRoZSBhbmltYXRlZCBsb2dvXHJcblx0XHRfYWRkTG9nbygpO1xyXG5cdFx0Ly8gYWRkIHRoZSB0ZXh0IGNvbXBvbmVudFxyXG5cdFx0X21haW5SZW5kZXIuc3RhZ2UuYWRkQ2hpbGQoIF90ZXh0U3RhZ2UgKTtcclxuXHRcdC8vIGFkZCB0aGUgZmVlZCBjb250YWluZXJcclxuXHRcdF9tYWluUmVuZGVyLnN0YWdlLmFkZENoaWxkKCBfcHJvbXB0U3RhZ2UgKTtcclxuXHR9XHJcblx0XHJcblx0Ly8gaGlkZSB0aGUgbG9hZGVyIGFuZCBzaG93IHRoZSBtYWluIHNsaWRlXHJcblx0X3JlbW92ZUxvYWRlcigpO1xyXG59O1xyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gc2V0IHRoZSBhcHAgaW5pdCBib29sIHRvIGZhbHNlXHRcclxuICogIFRoZSBhcHAgaW5pdCBib29sIGNhbiBiZSBjaGFuZ2VkIG9ubHkgaW4gdGhpcyBtb2R1bGUsXHJcbiAqIFx0c28gd2UgbmVlZCBhIG1ldGhvZCB0byBzZXQgaXQgYmFjayB0byBmYWxzZSBpbiBvcmRlciB0byBwcmV2ZW50XHJcbiAqIFx0dXNlciBpbnRlcmFjdGlvbiB3aGlsZSB0aGUgYWpheCByZXF1ZXN0IGlzIHJ1bm5pbmcgKHRoaXMgd2hlbiB0aGVcclxuICogXHR1c2VyIGdvZXMgdG8gYSBuZXcgc2V0IG9mIHNsaWRlcykuIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBiZWZvcmUgdGhlXHJcbiAqIFx0bmV3IHJlcXVlc3QgaXMgc2VuZC4gV2hlbiB0aGUgYWpheCByZXNwb25zZSBpcyByZWNlaXZlZCwgYW5kIHRoZVxyXG4gKiBcdHRleHR1cmVzIGFyZSBhZGRlZCB0byB0aGUgYXJyYXksIHRoaXMgaXMgc2V0IHRvIHRydWUuXHJcbiAqIFx0QHBhcmFtIHtib29sZWFufSB2OiB0aGUgdGFyZ2V0IHZhbHVlIFxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3Jlc2V0QXBwSW5pdEJvb2wgPSB2ID0+IHtcclxuXHRfYXBwSW5pdGlhbGl6ZWQgPSB2O1xyXG59O1xyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogIFNQUklURVMgTU9EVUxFXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuLyoqIFRoaXMgbW9kdWxlIGNyZWF0ZXMgYW5kIHJldHVybnMgdGhlIHNwcml0ZSBlbGVtZW50IGZvciBlYWNoIHNsaWRlXHJcbiAqICBBbHNvIGNyZWF0ZXMgYSBqUXVlcnkgZGVmZmVycmVkIG9iamVjdCB0byByZXNvbHZlIHRoZSBpbWFnZSBsb2FkaW5nXHJcbiAqL1xyXG4vLyBnZXQgdGhlIG1haW4gcmVuZGVyZXJcclxuLy8gZ2V0IHRoZSBsb2FkaW5nIHNwcml0ZSB0ZXh0dXJlXHJcbmltcG9ydCB7IF9tYWluUmVuZGVyIH0gZnJvbSBcIi4vcGl4aS1tb2R1bGVcIjtcclxuLy8gZ2V0IGRpbWVuc2lvbnNcclxuaW1wb3J0IHsgd2luU2l6ZSB9IGZyb20gXCIuL3dpbmRvd1wiO1xyXG4vLyBnZXQgdGhlIG1haW4gc2xpZGVcclxuaW1wb3J0IHsgX21haW5TbGlkZSB9IGZyb20gXCIuL3NsaWRlLW1vZHVsZVwiO1xyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gUG9zaXRpb24gdGhlIE1haW4gU2xpZGVcdFxyXG4gKiAgVGhpcyBtZXRob2QgdGFrZXMgdGhlIGFuaW1hdGlvbiBkYXRhIGZyb20gdGhlIGJhc2UgdGV4dHVyZSBhbmQgZGVwZW5kaW5nXHJcbiAqIFx0b24gdGhhdCwgcG9zaXRpb25zIHRoZSBtYWluIHNsaWRlLlx0XHJcbiAqIFx0VmVydGljYWwgZWZmZWN0LCB0aGUgbWFpbiBzbGlkZSBpcyBzZXQgYXQgdGhlIGJvdHRvbSBlZGdlIG9mIHRoZSBzY3JlZW4uXHRcclxuICogXHRIb3Jpem9udGFsIGVmZmVjdCwgdGhlIG1haW4gc2xpZGUgaXMgc2V0IHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IGVkZ2Ugb2YgdGhlXHJcbiAqIFx0c2NyZWVuLlx0XHJcbiAqIFx0Wm9vbSBlZmZlY3QsIHRoZSBtYWluIHNsaWRlIGlzIHNldCBhdCB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW4gYW5kIGFsc28gdGhlXHJcbiAqIFx0YW5jaG9yIHBvaW50IGlzIHNldCB0byAwLjUgaW4gb3JkZXIgdG8gbWFrZSB0aGUgem9vbSBlZmZlY3QgZnJvbSB0aGUgbWlkZGxlXHJcbiAqIFx0b2YgdGhlIHNsaWRlLlx0XHJcbiAqIFx0SW4gb3JkZXIgdG8gZGVjaWRlIHRvIHVzZSB6b29tIGluL291dCBvciBob3Jpem9udGFsIGxlZnQvcmlnaHQsIGNoZWNrIHRoZSBsYXN0XHJcbiAqIFx0c3BlY2lmaWMgYW5pbWF0aW9uIHR5cGUgZnJvbSB0aGUgYW5pbWF0aW9uIHN0b3JlLlxyXG4gKiBcdEBwYXJhbSB7b2JqZWN0fSBiOiB0aGUgYmFzZSB0ZXh0dXJlIGZvciB0aGUgY3VycmVudCBzbGlkZSBpbmRleC5cclxuICogXHRAcGFyYW0ge251bWJlcn0gbHM6IHRoZSBsYXN0IHNwZWNpZmljIGFuaW1hdGlvbiBmcm9tIHRoZSBhbmltYXRpb24gc3RvcmVcclxuICovXHJcbi8vIFVOVVNFRCBNRVRIT0QhISEhISEhIVxyXG4vLyBSRU1PVkUhISEhISEhISEhISEhISEhXHJcbmV4cG9ydCBjb25zdCBfcG9zaXRpb25NYWluU2xpZGUgPSAoYiwgbHMpID0+IHtcclxuXHQvKlx0VGhlIG1haW4gc2xpZGUgbXVzdCBiZSBhdCAoMCwwKSBwb3NpdGlvbiBpbiBvcmRlciB0byB0aGVuIHBvc2l0aW9uIGl0IGNvcnJlY3RseVxyXG5cdCAqICBhZnRlciBnZXR0aW5nIHRoZSBnZW5lcmljIGFuaW1hdGlvbiB0eXBlLlxyXG5cdCAqIFx0U2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgbWFpbiBzbGlkZSB0byAoMCwwKSBhbmQgdGhlIGFuY2hvciBwb2ludCB0byAwLlxyXG5cdCAqL1xyXG5cdF9tYWluU2xpZGUucG9zaXRpb24uc2V0KDApO1xyXG5cdF9tYWluU2xpZGUuYW5jaG9yLnNldCgwKTtcclxuXHJcblx0Ly8gZGVwZW5kaW5nIG9uIHRoYXQgdmFsdWUgcG9zaXRpb24gdGhlIG1haW4gc2xpZGVcclxuXHRzd2l0Y2ggKGIuX2dlbmVyaWNBbmltYXRpb25UeXBlKSB7XHJcblx0XHRjYXNlIDA6XHJcblx0XHRcdC8vIHZlcnRpY2FsIGFuaW1hdGlvbi4gQW5pbWF0ZSBmcm9tIGJvdHRvbS4gcG9zaXRpb24gbWFpbiBzbGlkZSB0byBhIFxyXG5cdFx0XHQvLyBuZWdhdGl2ZSB5IHZhbHVlXHJcblx0XHRcdC8vIGdldCBtYWluIHZhbHVlLiB0aGUgbWFpbiBzbGlkZSBpcyBhbHJlYWR5IHNjYWxlZCB0byBmaXQgdGhlIHNjcmVlblxyXG5cdFx0XHQvLyBzbyBpcyB0aGUgc2NyZWVuIHNpemUgbWludXMgdGhlIG1haW4gc2xpZGUgaGVpZ2h0XHJcblx0XHRcdC8vIF9tYWluU2xpZGUueSA9IHdpblNpemUuaCAtIF9tYWluU2xpZGUuaGVpZ2h0O1xyXG5cdFx0XHRfbWFpblNsaWRlLnBvc2l0aW9uLnNldCgwLCB3aW5TaXplLmggLSBfbWFpblNsaWRlLmhlaWdodCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAxOlxyXG5cdFx0XHQvLyBob3Jpem9udGFsIGFuaW1hdGlvbi4gaWYgdGhlIHByZXZpb3Mgc3BlY2lmaWMgYW5pbWF0aW9uIGlzIDEgKHRvIHRoZSBsZWZ0KVxyXG5cdFx0XHQvLyB0aGUgc2xpZGUgc2hvdWxkIGJlIGF0IHRoZSByaWdodCBlZGdlIG9mIHRoZSBzY3JlZW4uIElmIGlzIDAgKHRvIHRoZSByaWdodClcclxuXHRcdFx0Ly8gdGhlIHNsaWRlIHNob3VsZCBiZSBhdCB0aGUgbGVmdCBlZGdlIG9mIHRoZSBzY3JlZW5cclxuXHRcdFx0X21haW5TbGlkZS54ID0gbHMuaG9yaXpvbnRhbCA9PT0gMSA/IHdpblNpemUudyAtIF9tYWluU2xpZGUud2lkdGggOiAwO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgMjpcclxuXHRcdFx0Ly8gem9vbSBhbmltYXRpb24uIGNlbnRlciB0aGUgbWFpbiBzbGlkZSBhbmQgc2V0IGl0J3MgYW5jaG9yIHRvIDAuNVxyXG5cdFx0XHRfbWFpblNsaWRlLnggPSB3aW5TaXplLncgLyAyO1xyXG5cdFx0XHRfbWFpblNsaWRlLnkgPSB3aW5TaXplLmggLyAyO1xyXG5cdFx0XHRfbWFpblNsaWRlLmFuY2hvci5zZXQoMC41KTtcclxuXHR9IC8vIHN3aXRjaFxyXG5cclxufTsgLy8gcG9zaXRpb24gbWFpbiBzbGlkZVxyXG5cclxuXHJcbi8qKlx0TWV0aG9kIHRvIHNjYWxlIHRoZSBzcHJpdGVzXHJcbiAqXHRUaGlzIG1ldGhvZCBzZXRzIHRoZSBzY2FsZSBvZiB0aGUgc3ByaXRlIHRvIDEsIHRoZW4gdXNlcyB0aGUgdmFsdWUgcGFzc2VkXHJcbiAqXHQodmFsdWUgb2J0YWluZWQgZnJvbSB0aGUgYmFzZSB0ZXh0dXJlKSB0byBzZXQgdGhlIG5ldyB0ZXh0dXJlLlxyXG4gKlx0VGhlIHNjYWxlIHZhbHVlIGlzIHRoZSBvbmUgdGFrZW4gZnJvbSB0aGUgYmFzZSB0ZXh0dXJlIHVzZWQgdG8gdXBkYXRlXHJcbiAqXHR0aGUgbWFpbiBzbGlkZSBlbGVtZW50LlxyXG4gKlx0VGhpcyBtZXRob2Qgc2V0cyB0aGUgc2NhbGUgdG8gMSAobmF0dXJhbCBzaXplIG9mIHRoZSBpbWFnZSksIHRoZW4gdXNlcyB0aGVcclxuICpcdHRoZSBzY2FsZSBzdG9yZWQgaW4gdGhlIGJhc2UgdGV4dHVyZSAod2hpY2ggZGVwZW5kcyBvbiB0aGUgYW5pbWF0aW9uIHR5cGUpXHJcbiAqXHR0byBmaXQgdGhlIG1haW4gc2xpZGUgaW4gdGhlIHNjcmVlbiwgcmVhZHkgZm9yIHRoZSBidXJucyBlZmZlY3QgdG8gc3RhcnQuXHJcbiAqIFx0QHBhcmFtIHtvYmplY3R9IHM6IHRoZSBwaXhpIHNwcml0ZSBvYmplY3RcclxuICogXHRAcGFyYW0ge251bWJlcn0gdjogdGhlIHNjYWxlIHVzZWQgZm9yIHRoZSBzcHJpdGVcclxuICovXHJcbmV4cG9ydCBjb25zdCBfc2NhbGVTcHJpdGUgPSAocywgdiA9IHMucmF0aW8pID0+IHtcclxuXHQvLyByZXNldCB0byBub3JtYWwgc2l6ZVxyXG5cdHMuc2NhbGUuc2V0KCAxICk7XHJcblxyXG5cdC8vIGluIHRoZSBjYXNlIG9mIHRoaXMgbWV0aG9kIGJlaW5nIHRyaWdnZXJlZCBieSBhIHJlc2l6ZVxyXG5cdC8vIGNoZWNrIGlmIHRoZSB0ZXh0dXJlIHdhcyBsb2FkZWQgb3Igbm90XHJcblx0aWYoIHMuX2lzTG9hZGVkICkge1xyXG5cdFx0XHJcblx0XHQvLyBhZGQgdGhlIG1hbmRhdGluZyByYXRpbyBvbiB0aGUgc3ByaXRlXHJcblx0XHRzLnJhdGlvID0gdiB8fCBzLnJhdGlvO1xyXG5cclxuXHRcdC8qICBCZWZvcmUgc2NhbGluZyB0aGUgaW1hZ2Ugd2UgbmVlZCB0byBjYWxsIHRoZSBtZXRob2QgdG8gY2hlY2sgdGhlIHR5cGUgb2ZcclxuXHRcdCAqIFx0YW5pbWF0aW9uIGZvciB0aGUgY3VycmVudCBzbGlkZS4gRGVwZW5kaW5nIG9uIHRoYXQgd2Ugc2V0IHRoZSBwb3NpdGlvbiBvZlxyXG5cdFx0ICogXHR0aGUgc2xpZGUsIHRoZSBhbmNob3IgcG9pbnQgYW5kIHRoZSBzY2FsZVxyXG5cdFx0Ki9cclxuXHJcblx0XHQvLyBzaXplIHRoZSBzcHJpdGVcclxuXHRcdHMuc2NhbGUuc2V0KCB2ICk7XHJcblx0XHRcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gdGhlIGltYWdlIGlzIGVpdGhlciBzdGlsbCBsb2FkaW5nIG9yIGZhaWxlZFxyXG5cdFx0Ly8gdXNlIG5vcm1hbCByZXNpemVcclxuXHRcdHMuX3ZSYXRpbyA9IG51bGw7XHJcblx0XHQvLyBzZXQgYSBkZWZhdWx0IHJhdGlvIG9mIDEgaW4gY2FzZSB0aGUgaW1hZ2UgaXMgbG9hZGluZyBvciBmYWlsc1xyXG5cdFx0cy5yYXRpbyA9IDE7XHJcblx0XHRzLndpZHRoID0gd2luU2l6ZS53O1xyXG5cdFx0cy5oZWlnaHQgPSB3aW5TaXplLmg7XHJcblx0fVxyXG5cclxuXHQvLyBjb25zb2xlLmxvZyggX21haW5TbGlkZSA/IF9tYWluU2xpZGUuc2NhbGUgOiBcIm1haW4gc2xpZGUgc3RpbGwgbnVsbFwiICk7XHJcblx0XHJcbn07XHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byBjcmVhdGUgdGhlIE1haW4gU3ByaXRlXHJcbiAqICBDcmVhdGVzIHRoZSBwaXhpIG1haW4gc2xpZGUgc3ByaXRlIGFuZCBhZGRzIGl0IHRvIHRoZSBtYWluIHJlbmRlcmVyLlxyXG4gKiBcdFRoaXMgc3ByaXRlIHdpbGwgYmUgdXBkYXRlZCB3aGVuIGEgbmV3IHRleHR1cmUgaXMgcmVxdWlyZWQgYmFzZWQgb25cclxuICogXHR0aGUgY3VycmVudCBzbGlkZSBpbmRleC5cclxuICogXHRAcGFyYW0ge29iamVjdH0sIHQ6IGEgcGl4aSB0ZXh0dXJlIG9iamVjdFxyXG4gKiBcdEByZXR1cm4ge29iamVjdH0gcGl4aSBzcHJpdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9jcmVhdGVTcHJpdGUgPSB0ID0+IHtcclxuXHJcblx0Ly8gY3JlYXRlIHRoZSBzcHJpdGUgZm9yIHRoZSBzbGlkZVxyXG5cdGNvbnN0IF9zID0gbmV3IFBJWEkuU3ByaXRlKHQpO1xyXG5cdC8vIGFkZCB0aGUgbG9hZGVkIGJvb2xlYW4gb2YgdGhlIHNwcml0ZS4gZGVhdWx0IGlzIG51bGxcclxuXHQvLyB3aGVuIHRoZSB0ZXh0dXJlIGlzIHVwZGF0ZWQgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHRvb1xyXG5cdC8vIGRlcGVuZGluZyBvbiB0aGUgbG9hZGluZyBzdGF0dXMgb2YgdGhlIGJhc2UgdGV6dHVyZVxyXG5cdC8vIHRvIG51bGwobG9hZGluZyksIHRydWUobG9hZGVkKSwgZmFsc2UoZmFpbGVkKVxyXG5cdF9zLl9pc0xvYWRlZCA9IG51bGw7XHJcblx0Ly8gc2V0IGRpbWVuc2lvbnNcclxuXHRfc2NhbGVTcHJpdGUoX3MpO1xyXG5cdC8vIGFkZCB0byBtYWluIHJlbmRlcmVyXHJcblx0X21haW5SZW5kZXIuc3RhZ2UuYWRkQ2hpbGQoX3MpO1xyXG5cdC8vIHJldHVybiB0aGUgc3ByaXRlIGFuZCB0aGUgYmFzZSB0ZXh0dXJlXHJcblx0cmV0dXJuIF9zO1xyXG5cclxufTtcclxuIiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBTVFJJUEVTIE1PRFVMRVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcbi8vIGdldCB0aGUgc2xpZGVzIGFtb3VudFxyXG5pbXBvcnQgeyBfc2xpZGVzQW1vdW50IH0gZnJvbSBcIi4vYWpheC1tb2R1bGVcIjtcclxuLy8gZ2V0IHdpbmRvdyBtb2R1bGUgdmFycy4gc2NyZWVuIHNpemUgLyBzdHJpcGUgaGVpZ2h0XHJcbmltcG9ydCB7IHdpblNpemUsIF9zdHJpcGVIZWlnaHQgfSBmcm9tIFwiLi93aW5kb3dcIjtcclxuLy8gZ2V0IHRoZSBjdXJyZW50IHNsaWRlIGluZGV4IGFuZCB0aGUgc2xpZGVzIGdyb3VwXHJcbmltcG9ydCB7IF9jdXJyZW50U2xpZGVJbmRleC8qICwgX3NsaWRlc0dyb3VwICovIH0gZnJvbSBcIi4vc2xpZGUtY2hhbmdlLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIGludGVyYWN0aW9uIHN0YXJ0IHBvaW50XHJcbmltcG9ydCB7IF9pbnRlcmFjdGlvblN0YXJ0WSB9IGZyb20gXCIuL2ludGVyYWN0aW9uLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIHN0cmlwZXMgYXJyYXlzIGFuZCBtZXRob2RzXHJcbmltcG9ydCB7IF9wcmV2aW91c0luaXRTdHJpcGVzIH0gZnJvbSBcIi4vcHJldi1zdHJpcGVzLW1vZHVsZS5qc1wiO1xyXG5pbXBvcnQgeyBfY3VycmVudEluaXRTdHJpcGVzIH0gZnJvbSBcIi4vY3Vyci1zdHJpcGVzLW1vZHVsZS5qc1wiO1xyXG5pbXBvcnQgeyBfbmV4dEluaXRTdHJpcGVzIH0gZnJvbSBcIi4vbmV4dC1zdHJpcGVzLW1vZHVsZS5qc1wiO1xyXG5cclxuLy8gc3RyaXBlcyBhbW91bnRcclxuLy8gdGhlcmUgYXJlIHNvbWUgaXNzdWVzIHdpdGggdGhlIGFtb3VudCBvZiBzdHJpcGVzLCB1c2luZyAyMCBzZWVtcyB0byBmaXggaXQuXHJcbi8vIHdlJ2xsIHVzZSB0aGF0IGFtb3VudCB1bnRpbCBhIHNvbHV0aW9uIGlzIGZvdW5kXHJcbmV4cG9ydCBsZXQgX3N0cmlwZXNBbW91bnQgPSAyMDtcclxuLyogIHRoZSBtaWRkbGUgc3RyaXBlXHJcbiAqXHR0aGlzIGlzIHVzZWZ1bCB3aGVuIGNyZWF0aW5nIHRoZSBkcmFnL2FuaW1hdGlvbiBhcnJheXNcclxuICpcdGluIG9yZGVyIHRvIHNlbGVjdCB0aGUgbG9vcGluZyBkaXJlY3Rpb24gKGluY3JlYXNlIG9yIGRlY3JlYXNlIHRoZVxyXG4gKlx0Y3VycmVudCBzdGFydCBpbmRleCBudW1iZXIgaW4gb3JkZXIgdG8gYWRkIGVsZW1lbnRzIHRvIHRoZSBhcnJheSlcclxuKi9cclxuZXhwb3J0IGxldCBfc3RyaXBlc01pZGRsZSA9IE1hdGguZmxvb3IoX3N0cmlwZXNBbW91bnQgLyAyKTtcclxuXHJcbi8qIFZFUlNJT04gMi4yLjVcclxuICogY3JlYXRlIG1ldGhvZCB0byBzZXQgdGhlIGFtb3VudCBvZiBzdHJpcGVzIGZvciBzY3JlZW4gaGVpZ2h0cyBiZWxvdyAzMjAgcHhcclxuICogdGhpcyBpcyB0byBzb2x2ZSBhIGZyYW1lIGNhbGN1bGF0aW9uIGlzc3VlIG9uIHBpeGkgY3JlYXRlZCBieSBzZXR0aW5nXHJcbiAqIHRoZSBzdHJpcGVzIGhlaWdodCB0byBhbiBpbnRlZ2VyIGJ5IHJvdW5kaW5nIHRoZSBzdHJpcGUgaGVpZ2h0LiB0aGlzIFxyXG4gKiByb3VuZGluZyBhbHNvIGdlbmVyYXRlcyBhIGZpbmFsIHN0cmlwZSB0aGF0IHNob3VsZCBiZSBzbWFsbGVyIHRoYW4gdGhlXHJcbiAqIG90aGVycywgdGhpcyBjYXVzZXMgdGhlIGNhbGN1bGF0aW9uIGZvciB0aGF0IHNwcml0ZSB0byBiZSBhIG5lZ2F0aXZlXHJcbiAqIHZhbHVlIHdoZW4gdGhlIHJvdW5kaW5nIGFtb3VudCBtdWx0aXBsaWVkIGJ5IHRoZSBudW1iZXIgb2Ygc3RyaXBlcyBpc1xyXG4gKiBiaWdnZXIgdGhhbiB0aGUgc2NyZWVuIGhlaWdodC5cclxuKi9cclxuLyoqXHJcbiAqIE1ldGhvZCB0byBzZXQgdGhlIGFtb3VudCBvZiBzdHJpcGVzLlxyXG4gKiBEZXBlbmRpbmcgb24gdGhlIHNjcmVlbiBoZWlnaHQgdGhlIGFtb3VudCBvZiBzdHJpcGVzIHdpbGwgYmVcclxuICogMjAgb3IgMTQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaCBpZiB0aGUgaGVpZ2h0IGlzIDMyMCBvciBtb3JlXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfY2FsY3VsYXRlU3RyaXBlcyA9IGggPT4ge1xyXG5cdF9zdHJpcGVzQW1vdW50ID0gaCA+PSAzMjAgPyAyMCA6IDE0O1xyXG5cdF9zdHJpcGVzTWlkZGxlID0gTWF0aC5mbG9vcihfc3RyaXBlc0Ftb3VudCAvIDIpO1xyXG59O1xyXG5cclxuXHJcbi8qICB0aGUgc3RhcnRpbmcgaW5kZXggZm9yIHRoZSBkcmFnL2FuaW1hdGlvbiBzdHJpcGVzXHJcbiAqXHR0aGlzIGlzIHRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgc3RyaXBlIGZvciBlYWNoIGFuaW1hdGlvblxyXG4gKlx0YXJyYXkuIEJ5IGRlZmF1bHQgaXMgMC5cclxuICpcdHdoZW4gdGhlIHN0cmlwZXMgYW5pbWF0aW9uIGlzIGNvbXBsZXRlLCByZXNldCB0aGlzIHRvIDAgaW4gY2FzZSB0aGVcclxuICpcdHN0cmlwZXMgYXJlIGFuaW1hdGVkIGF1dG9tYXRpY2FsbHkuXHJcbiAqXHR0aGlzIHZhbHVlIGlzIGNvbW1vbiBmb3IgYm90aCBzZXQgb2Ygc3RyaXBlcy5cclxuKi9cclxuZXhwb3J0IGxldCBfc3RhcnRTdHJpcGVJbmRleCA9IDA7XHJcblxyXG5cclxuLypcdE1ldGhvZCB0byBzZXQgdGhlIHN0YXJ0IHN0cmlwZSBpbmRleC5cdFxyXG4gKiAgV2UgdXNlIHRoZSBwb2ludGVyIFkgcG9zaXRpb24gYW5kIHRoZSBjdXJyZW50IHN0cmlwZSBoZWlnaHQgaW4gb3JkZXJcclxuICogXHR0byBzZXQgdGhlIGluZGV4IG9mIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGRyYWcvYW5pbWF0aW9uIGFycmF5LlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3NldFN0YXJ0SW5kZXggPSAoKSA9PiAoXHJcblx0TWF0aC5mbG9vciggX2ludGVyYWN0aW9uU3RhcnRZIC8gX3N0cmlwZUhlaWdodCApXHJcbik7XHJcblxyXG4vLyBTVFJJUEVTIEFSUkFZU1xyXG4vKlx0Q1VSUkVOVCBTVFJJUEVTXHQqL1xyXG4vLyB0aGlzIGlzIHRoZSByZWZlcmVuY2UgYXJyYXksIHRoZSBzdHJpcGVzIGFyZSBhZGRlZCBpbiB0aGUgb3JkZXIgdGhleSBhcmUgY3JlYXRlZFxyXG4vLyB0aGlzIGlzIHVzZWQgb25seSBhcyBhIHJlZmVyZW5jZSB0byB0aGUgc3RyaXBlcy5cclxuZXhwb3J0IGxldCBfY3VycmVudEluaXRBcnJheSA9IG51bGw7XHJcbi8vIHRoaXMgYXJyYXkgd2lsbCBiZSB1c2VkIHRvIGRyYWcvYW5pbWF0ZSB0aGUgc3RyaXBlcyBiYXNlZCBvbiB0aGUgcG9pbnRlciBwb3NpdGlvblxyXG5leHBvcnQgbGV0IF9jdXJyZW50U3RyaXBlcyA9IG51bGw7XHJcbi8vIGJvb2wgdG8gY2hlY2sgaWYgdGhlIHJlZiBhcnJheSBoYXMgc3RyaXBlc1xyXG5leHBvcnQgbGV0IF9jdXJyZW50SGFzU3ByaXRlcyA9IG51bGw7XHJcblxyXG4vKlx0UFJFVklPVVMgU1RSSVBFU1x0Ki9cclxuLy8gcmVmZXJlbmNlIGFycmF5IGZvciB0aGUgbmV4dCBzbGlkZSBzdHJpcGVzXHJcbmV4cG9ydCBsZXQgX3ByZXZpb3VzSW5pdEFycmF5ID0gbnVsbDtcclxuLy8gYXJyYXkgdG8gZHJhZy9hbmltYXRlIHRoZSBzdHJpcGVzXHJcbmV4cG9ydCBsZXQgX3ByZXZpb3VzU3RyaXBlcyA9IG51bGw7XHJcbi8vIGJvb2wgdG8gY2hlY2sgaWYgdGhlIHJlZiBhcnJheSBoYXMgc3RyaXBlc1xyXG5leHBvcnQgbGV0IF9wcmV2aW91c0hhc1Nwcml0ZXMgPSBudWxsO1xyXG5cclxuLypcdE5FWFQgU1RSSVBFU1x0Ki9cclxuLy8gcmVmZXJlbmNlIGFycmF5IGZvciB0aGUgbmV4dCBzbGlkZSBzdHJpcGVzXHJcbmV4cG9ydCBsZXQgX25leHRJbml0QXJyYXkgPSBudWxsO1xyXG4vLyBhcnJheSB0byBkcmFnL2FuaW1hdGUgdGhlIHN0cmlwZXNcclxuZXhwb3J0IGxldCBfbmV4dFN0cmlwZXMgPSBudWxsO1xyXG4vLyBib29sIHRvIGNoZWNrIGlmIHRoZSByZWYgYXJyYXkgaGFzIHN0cmlwZXNcclxuZXhwb3J0IGxldCBfbmV4dEhhc1Nwcml0ZXMgPSBudWxsO1xyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gc2V0IHRoZSBlbXB0eSBBcnJheXNcdFxyXG4gKiAgVGhlIG5leHQgcHVibGljIG1ldGhvZCwgY3JlYXRlcyB0aGUgaW5pdCBhcnJheXMgZm9yIHRoZVxyXG4gKiBcdGN1cnJlbnQgYW5kIHByZXZpb3VzIHNsaWRlcywgYnV0IHRoZSB2YXJpYWJsZXMgYXJlIG51bGwsIHNvIHdlXHJcbiAqIFx0Y2FuJ3QgcHVzaCB0aGUgc3RyaXBlcyBpbnRvIHRoZW0uIE5vcm1hbGx5IHRoaXMgaXMgaGFuZGxlZCBieSB0aGVcclxuICogXHRjcmVhdGUgcmVmZXJlbmNlIGFycmF5cyBtZXRob2QuXHRcclxuICogXHRUaGlzIG1ldGhvZCBzZXRzIHRoZSBjdXJyZW50IGFuZCBuZXh0IGluaXQgYXJyYXlzIHRvIGVtcHR5IGFycmF5c1xyXG4gKiBcdHNvIHdlIGNhbiBwdXNoIHRoZSBzdHJpcGVzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IF9zZXRFbXB0eUFycmF5cyA9ICgpID0+IHtcclxuXHRfY3VycmVudEluaXRBcnJheSA9IFtdO1xyXG5cdF9wcmV2aW91c0luaXRBcnJheSA9IFtdO1xyXG5cdF9uZXh0SW5pdEFycmF5ID0gW107XHJcbn07XHJcblxyXG4vKiogTWV0aG9kIHRvIGNyZWF0ZSB0aGUgc3RyaXBlcy5cdFxyXG4gKiAgVGhpcyBtZXRob2QgY2FsbHMgYWxsIHRoZSBtZXRob2RzIHRvIGNyZWF0ZSBhbmQgYWRkIHRoZSBzdHJpcGVzIHRvIHRoZVxyXG4gKiBcdHJlbmRlcmVyJ3Mgc3RhZ2UgYW5kIHRoZSByZWZlcmVuY2UgYXJyYXlzLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2NyZWF0ZVJlZkFycmF5cyA9ICgpID0+IHtcclxuXHRcclxuXHQvLyBmaXJzdCBzZXQgYWxsIHRoZSBhcnJheXMgdG8gZW1wdHkgYXJyYXlzXHJcblx0X3NldEVtcHR5QXJyYXlzKCk7XHJcblx0Ly8gY2FsbCB0aGUgbWV0aG9kcyB0byBjcmVhdGUgdGhlIHJlZiBhcnJheXNcclxuXHRfcHJldmlvdXNJbml0U3RyaXBlcygpO1xyXG5cdF9uZXh0SW5pdFN0cmlwZXMoKTtcclxuXHRfY3VycmVudEluaXRTdHJpcGVzKCk7XHJcblx0Ly8gc2V0IHRoZSBib29scyB0byBjaGVjayBpZiB0aGUgcmVmIGFycmF5cyBoYXZlIHNwcml0ZXNcclxuXHRfY3VycmVudEhhc1Nwcml0ZXMgPSBfY3VycmVudEluaXRBcnJheS5sZW5ndGggPiAwO1xyXG5cdF9wcmV2aW91c0hhc1Nwcml0ZXMgPSBfcHJldmlvdXNJbml0QXJyYXkubGVuZ3RoID4gMDtcclxuXHRfbmV4dEhhc1Nwcml0ZXMgPSBfbmV4dEluaXRBcnJheS5sZW5ndGggPiAwO1xyXG5cdC8vIG5vdyBjYWxsIHRoZSBtZXRob2QgdG8gY3JlYXRlIHRoZSBhbmltYXRpb25zIGFycmF5c1xyXG5cdF9jcmVhdGVBbmltYXRpb25BcnJheSgpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gc2NhbGUgdGhlIHByZXZpb3VzIHN0cmlwZXMuXHRcclxuICogIFRoaXMgaXMgdXNlZCB0byBzZXQgdGhlIHNjYWxlIGZvciBhIHNwZWNpZmljIHRleHR1cmUgYmFzZWQgb24gaXQncyBkaW1lbnNpb25zLlx0XHJcbiAqIFx0V2hlbiB0aGUgcHJldmlvdXMgc3RyaXBlcyBhcmUgY3JlYXRlZCB3ZSB1c2Ugb25seSB0aGUgYmFzZSB0ZXh0dXJlIGFuZCBpdCdzXHJcbiAqIFx0ZGltZW5zaW9ucyh0aGF0IGFyZSB0aGUgb3JpZ2luYWwgaW1hZ2UncyBkaW1lbnNpb25zKSB0byBjcmVhdGVcdHRoZSBzdHJpcGVzLFxyXG4gKiBcdGJlY2F1c2UgdGhlcmUgaXMgbm8gZGlzcGxheSBvYmplY3Qgb24gdGhlIHJlbmRlcmVyJ3Mgc3RhZ2UgdG8gdXNlIGFzIHJlZmVyZW5jZSxcclxuICogXHRzbyB3ZSBuZWVkIHRvIGtub3cgdGhlIHJlYWwgd2lkdGggb2YgdGhlIGZyYW1lIGZvciBlYWNoIHN0cmlwZSB0byBzY2FsZSB0aGVtXHJcbiAqIFx0cHJvcGVybHkgYWZ0ZXIuXHRcclxuICogXHRUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBvbmx5IGlmIHRoZSB0ZXh0dXJlIGhhcyBiZWVuIGxvYWRlZCwgb3RoZXJ3aXNlXHJcbiAqIFx0d2UgdXNlIHRoZSBiYXNlIGxvYWRpbmcgdGV4dHVyZS5cclxuICogXHRAcGFyYW0ge29iamVjdH0gYjogYSBwaXhpIGJhc2UgdGV4dHVyZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IF9zZXRUZXh0dXJlU2NhbGUgPSBiID0+IHtcclxuXHQvLyBnZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGltYWdlXHJcblx0Y29uc3QgX3RleHREaW1zID0geyB3OiBiLnJlYWxXaWR0aCwgaDogYi5yZWFsSGVpZ2h0IH07XHJcblx0Ly8gZ2V0IHRoZSByYXRpbyBmb3IgdGhlIHdpZHRoIGFuZCBoZWlnaHRcclxuXHRjb25zdCBfdnIgPSB3aW5TaXplLmggLyBfdGV4dERpbXMuaDtcclxuXHRjb25zdCBfaHIgPSB3aW5TaXplLncgLyBfdGV4dERpbXMudztcclxuXHRjb25zdCBfdHIgPSBNYXRoLm1heChfdnIsIF9ocik7IC8vIHRoZSB0ZXh0dXJlIHJhdGlvXHJcblx0Ly8gcmV0dXJuIHRoZSBzY2FsZSByYXRpbyB0byBzdG9yZSBpdCBpbiBhIHZhcmlhYmxlXHJcblx0cmV0dXJuIF90cjtcclxufTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qXHRBTklNQVRJT04gQVJSQVlTIE1FVEhPRFNcdCovXHJcbi8qKiBNZXRob2QgdG8gY3JlYXRlIHRoZSBkcmFnL2FuaW1hdGlvbiBhcnJheXMuXHRcclxuICogXHRVc2VzIHRoZSByZWZlcmVuY2UgYXJyYXlzIHRvIGNyZWF0ZSB0aGUgYW5pbWF0aW9uIGFycmF5cy5cdFxyXG4gKiBcdEFsd2F5cyBjcmVhdGUgYW4gYW5pbWF0aW9uIGFycmF5IGZvciB0aGUgY3VycmVudCBzdHJpcGVzIChfY3VycmVudFN0cmlwZXMpLFxyXG4gKiBcdGJlY2F1c2UgdGhpcyBzdHJpcGVzIHdpbGwgYWx3YXlzIGJlIGFuaW1hdGVkLlx0XHJcbiAqIFx0RGVwZW5kaW5nIG9uIHRoZSBzbGlkZSBpbmRleCBpZiB3ZSBjcmVhdGUgdGhlIGFuaW1hdGlvbiBhcnJheXMgZm9yIHRoZSBwcmV2aW91c1xyXG4gKiBcdGFuZCBuZXh0IHN0cmlwZXMuXHJcbiAqIFx0QHBhcmFtIHtudW1iZXJ9IHY6IHRoZSBjdXJyZW50IGluZGV4IHZhbHVlLCBjYWxjdWxhdGVkIHdpdGggdGhlIGN1cnJlbnQgWSBwb3NpdGlvblxyXG4gKiBcdG9mIHRoZSBwb2ludGVyIGV2ZW50LiBUaGlzIG51bWJlciBpcyBjYWxjdWxhdGVkIGluIHRoZSBpbnRlcmFjdGlvbiBtb2R1bGUgb24gXHJcbiAqIFx0dGhlIGludGVyYWNpb24gbW92ZSBldmVudCBoYW5kbGVyLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2NyZWF0ZUFuaW1hdGlvbkFycmF5ID0gKHYpID0+IHtcclxuXHQvLyBzZXQgYWxsIHRoZSBhbmltYXRpb24gYXJyYXlzIHRvIGVtcHR5XHJcblx0X2N1cnJlbnRTdHJpcGVzID0gW107XHJcblx0X3ByZXZpb3VzU3RyaXBlcyA9IFtdO1xyXG5cdF9uZXh0U3RyaXBlcyA9IFtdO1xyXG5cdC8vIHNldCB0aGUgdGFyZ2V0IHN0cmlwZSBhY2NvcmRpbmcgdG8gdGhlIHBvaW50ZXIgZXZlbnRcclxuXHQvLyB0aGlzIGlzIHRoZSBmaXJzdCBzdHJpcGUgaW4gdGhlIGFycmF5XHJcblx0Ly8gaWYgYSB2YWx1ZSBpcyBwYXNzZWQgaW4gdGhlIGZ1bmN0aW9uLCB1c2UgdGhhdCB0byBzZXQgdGhlIHN0YXJ0IGluZGV4LFxyXG5cdC8vIG90aGVyIHdpc2UgdXNlIHRoZSBtZXRob2QgYW5kIHRoZSBZIHZhbHVlIG9mIHRoZSBwb2ludGVyIHdoZW4gdGhlIGludGVyYWN0aW9uIHN0YXJ0ZWQuXHJcblx0X3N0YXJ0U3RyaXBlSW5kZXggPSB2ICE9PSB1bmRlZmluZWQgPyB2IDogX3NldFN0YXJ0SW5kZXgoKTtcclxuXHQvLyB0aGUgc3RyaXBlcyBmb3IgZXZlcnkgYXJyYXksIGFyZSBjcmVhdGVkIG9ubHkgaWYgdGhlIGNvcnJlc3BvbmRpbmcgaW1hZ2VcclxuXHQvLyBoYXMgbG9hZGVkIGFuZCB0aGUgY3VycmVudCBzbGlkZSBpcyBub3QgdGhlIGZpcnN0L2xhc3Qgb2YgdGhlIGdyb3VwLlxyXG5cclxuXHQvKlx0Q1VSUkVOVCBTVFJJUEVTXHQqL1xyXG5cdGlmICggX2N1cnJlbnRIYXNTcHJpdGVzICkge1xyXG5cdFx0Ly8gdGhlIGltYWdlIG9mIHRoZSBjdXJyZW50IHNsaWRlIGhhcyBsb2FkZWQgYW5kIHRoZXJlIGFyZSBzdHJpcGVzXHJcblx0XHQvLyBpbiB0aGUgY3VycmVudCByZWYgYXJyYXkuIENyZWF0ZSB0aGUgY3VycmVudCBhbmltYXRpb24gYXJyYXkuLy8gY3JlYXRlIGFuIGludGVybmFsIHZhcmlhYmxlIHRvIG1vZGlmeSBpbiBvcmRlciB0byBnZXQgdGhlIGVsZW1lbnRcclxuXHRcdGxldCBfc3RhcnQgPSBfc3RhcnRTdHJpcGVJbmRleDtcclxuXHRcdC8vIGFkZCB0aGUgcG9pbnRlciB0YXJnZXQgZWxlbWVudFxyXG5cdFx0X2N1cnJlbnRTdHJpcGVzLnB1c2goX2N1cnJlbnRJbml0QXJyYXlbX3N0YXJ0U3RyaXBlSW5kZXhdKTtcclxuXHRcdC8vIGNoZWNrIGlmIHRoZSBwb2ludGVyIGV2ZW50IGlzIGJlZm9yZSBvciBhZnRlciB0aGUgbWlkZGxlIHN0cmlwZVxyXG5cdFx0aWYgKCBfc3RhcnRTdHJpcGVJbmRleCA+IF9zdHJpcGVzTWlkZGxlIHx8IF9zdGFydFN0cmlwZUluZGV4ID09PSBfc3RyaXBlc01pZGRsZSApIHtcclxuXHRcdFx0Ly8gYWZ0ZXIgb3IgZXhhY3RseSB0aGUgbWlkZGxlIHN0cmlwZSwgbG9vcCBkb3duXHJcblx0XHRcdHdoaWxlIChfc3RhcnQtLSkge1xyXG5cdFx0XHRcdC8vIGEgdmFyaWFibGUgZm9yIHRoZSBuZXh0IHN0cmlwZVxyXG5cdFx0XHRcdGxldCBfbmV4dFN0cmlwZSA9IF9jdXJyZW50SW5pdEFycmF5Wyhfc3RhcnRTdHJpcGVJbmRleCArIChfc3RhcnRTdHJpcGVJbmRleCAtIF9zdGFydCkpXTtcclxuXHRcdFx0XHQvLyBpZiB0aGUgbmV4dCBzdHJpcGUgZXhpc3RzLCBhZGQgYW4gYXJyYXkgd2l0aCB0aGUgcHJldmlvdXMgYW5kIG5leHRcclxuXHRcdFx0XHQvLyBzdHJpcGUgdG8gdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgKHByZXZpb3VzIG9yIGN1cnJlbnQpXHJcblx0XHRcdFx0aWYgKF9uZXh0U3RyaXBlKSB7XHJcblx0XHRcdFx0XHRfY3VycmVudFN0cmlwZXMucHVzaChbX2N1cnJlbnRJbml0QXJyYXlbX3N0YXJ0XSwgX25leHRTdHJpcGVdKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gdGhlIG5leHQgc3RyaXBlIGRvZXNuJ3QgZXhpc3QgaW4gdGhlIGluaXQgYXJyYXlzLCBzbyB3ZSBhZGQganVzdCB0aGUgXHJcblx0XHRcdFx0XHQvLyBwcmV2aW91cyBvbmUgc2luY2Ugd2UncmUgbG9vcGluZyB0byAwXHJcblx0XHRcdFx0XHRfY3VycmVudFN0cmlwZXMucHVzaChfY3VycmVudEluaXRBcnJheVtfc3RhcnRdKTtcclxuXHRcdFx0XHR9IC8vIG5leHQgc3RyaXBlIGNvbmRpdGlvbmFsIGVuZFxyXG5cdFx0XHR9IC8vIGFycmF5IHN0YXJ0IGxvb3AgZW5kXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyB0aGUgcG9pbnRlciBldmVudCBpcyBiZWZvcmUgdGhlIG1pZGRsZSBzdHJpcGVcclxuXHRcdFx0Ly8gbG9vcCB0byB0aGUgZmluYWwgZWxlbWVudCBvZiB0aGUgYXJyYXlzXHJcblx0XHRcdHdoaWxlIChfc3RhcnQgPCBfc3RyaXBlc0Ftb3VudCAtIDEpIHtcclxuXHRcdFx0XHRfc3RhcnQrKztcclxuXHRcdFx0XHQvLyBpbiB0aGlzIGNhc2UgdGhlIG51bWJlciBpcyBpbmNyZW1lbnRpbmcsIHdlJ3JlIGFkZGluZyBhIG5lZ2F0aXZlIG51bWJlIHRvXHJcblx0XHRcdFx0Ly8gdGhlIHN0YXJ0IGluZGV4IHZhbHVlIHRvIGNyZWF0ZSB0aGUgcHJldmlvdXMgaW5kZXhcclxuXHRcdFx0XHQvLyBjaGVjayBpZiB0aGUgcHJldmlvdXMgZWxlbWVudCBleGlzdHMgaW4gdGhlIGFycmF5XHJcblx0XHRcdFx0Y29uc3QgX3ByZXZTdHJpcGUgPSBfY3VycmVudEluaXRBcnJheVsoX3N0YXJ0U3RyaXBlSW5kZXggKyAoX3N0YXJ0U3RyaXBlSW5kZXggLSBfc3RhcnQpKV07XHJcblx0XHRcdFx0Ly8gaWYgdGhlIHByZXZpb3VzIHN0cmlwZSBleGlzdHMsIGFkZCBhbiBhcnJheSB3aXRoIHRoZSBwcmV2aW91cyBhbmQgbmV4dFxyXG5cdFx0XHRcdC8vIHN0cmlwZSB0byB0aGUgY29ycmVzcG9uZGluZyBhcnJheVxyXG5cdFx0XHRcdGlmIChfcHJldlN0cmlwZSkge1xyXG5cdFx0XHRcdFx0X2N1cnJlbnRTdHJpcGVzLnB1c2goW19wcmV2U3RyaXBlLCBfY3VycmVudEluaXRBcnJheVtfc3RhcnRdXSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdF9jdXJyZW50U3RyaXBlcy5wdXNoKF9jdXJyZW50SW5pdEFycmF5W19zdGFydF0pO1xyXG5cdFx0XHRcdH0gLy8gcHJldmlvdXMgc3RyaXBlIGNvbmRpdGlvbmFsIGVuZFxyXG5cdFx0XHR9IC8vIGFycmF5IGVuZCBsb29wIGVuZFxyXG5cdFx0fSAvLyBwb2ludGVyIGxvY2F0aW9uIGNvbmRpdGlvbmFsIGVuZFxyXG5cdH1cclxuXHJcblx0LypcdFBSRVZJT1VTIFNUUklQRVNcdCovXHJcblx0Ly8gY2hlY2sgaWYgdGhlIGN1cnJlbnQgaXMgdGhlIGZpcnN0IHNsaWRlIGFuZCBpZiB0aGUgaW1hZ2Ugd2FzIGxvYWRlZFxyXG5cdGlmICggX2N1cnJlbnRTbGlkZUluZGV4ID4gMCAmJiBfcHJldmlvdXNJbml0QXJyYXkubGVuZ3RoID4gMCApIHtcclxuXHRcdC8vIG5vdCB0aGUgZmlyc3Qgc2xpZGUgYW5kIHRoZSBwcmV2aW91cyByZWYgYXJyYXkgaGFzIHN0cmlwZXNcclxuXHRcdC8vIGNyZWF0ZSB0aGUgYW5pbWF0aW9uIGFycmF5XHJcblx0XHQvLyB0aGUgaW1hZ2Ugb2YgdGhlIGN1cnJlbnQgc2xpZGUgaGFzIGxvYWRlZCBhbmQgdGhlcmUgYXJlIHN0cmlwZXNcclxuXHRcdC8vIGluIHRoZSBjdXJyZW50IHJlZiBhcnJheS4gQ3JlYXRlIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBhcnJheS4vLyBjcmVhdGUgYW4gaW50ZXJuYWwgdmFyaWFibGUgdG8gbW9kaWZ5IGluIG9yZGVyIHRvIGdldCB0aGUgZWxlbWVudFxyXG5cdFx0bGV0IF9zdGFydCA9IF9zdGFydFN0cmlwZUluZGV4O1xyXG5cdFx0Ly8gYWRkIHRoZSBwb2ludGVyIHRhcmdldCBlbGVtZW50XHJcblx0XHRfcHJldmlvdXNTdHJpcGVzLnB1c2goX3ByZXZpb3VzSW5pdEFycmF5W19zdGFydFN0cmlwZUluZGV4XSk7XHJcblx0XHQvLyBjaGVjayBpZiB0aGUgcG9pbnRlciBldmVudCBpcyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIG1pZGRsZSBzdHJpcGVcclxuXHRcdGlmIChfc3RhcnRTdHJpcGVJbmRleCA+IF9zdHJpcGVzTWlkZGxlIHx8IF9zdGFydFN0cmlwZUluZGV4ID09PSBfc3RyaXBlc01pZGRsZSkge1xyXG5cdFx0XHQvLyBhZnRlciBvciBleGFjdGx5IHRoZSBtaWRkbGUgc3RyaXBlLCBsb29wIGRvd25cclxuXHRcdFx0d2hpbGUgKF9zdGFydC0tKSB7XHJcblx0XHRcdFx0Ly8gYSB2YXJpYWJsZSBmb3IgdGhlIG5leHQgc3RyaXBlXHJcblx0XHRcdFx0bGV0IF9uZXh0U3RyaXBlID0gX3ByZXZpb3VzSW5pdEFycmF5Wyhfc3RhcnRTdHJpcGVJbmRleCArIChfc3RhcnRTdHJpcGVJbmRleCAtIF9zdGFydCkpXTtcclxuXHRcdFx0XHQvLyBpZiB0aGUgbmV4dCBzdHJpcGUgZXhpc3RzLCBhZGQgYW4gYXJyYXkgd2l0aCB0aGUgcHJldmlvdXMgYW5kIG5leHRcclxuXHRcdFx0XHQvLyBzdHJpcGUgdG8gdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgKHByZXZpb3VzIG9yIGN1cnJlbnQpXHJcblx0XHRcdFx0aWYgKF9uZXh0U3RyaXBlKSB7XHJcblx0XHRcdFx0XHRfcHJldmlvdXNTdHJpcGVzLnB1c2goW19wcmV2aW91c0luaXRBcnJheVtfc3RhcnRdLCBfbmV4dFN0cmlwZV0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyB0aGUgbmV4dCBzdHJpcGUgZG9lc24ndCBleGlzdCBpbiB0aGUgaW5pdCBhcnJheXMsIHNvIHdlIGFkZCBqdXN0IHRoZSBcclxuXHRcdFx0XHRcdC8vIHByZXZpb3VzIG9uZSBzaW5jZSB3ZSdyZSBsb29waW5nIHRvIDBcclxuXHRcdFx0XHRcdF9wcmV2aW91c1N0cmlwZXMucHVzaChfcHJldmlvdXNJbml0QXJyYXlbX3N0YXJ0XSk7XHJcblx0XHRcdFx0fSAvLyBuZXh0IHN0cmlwZSBjb25kaXRpb25hbCBlbmRcclxuXHRcdFx0fSAvLyBhcnJheSBzdGFydCBsb29wIGVuZFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gdGhlIHBvaW50ZXIgZXZlbnQgaXMgYmVmb3JlIHRoZSBtaWRkbGUgc3RyaXBlXHJcblx0XHRcdC8vIGxvb3AgdG8gdGhlIGZpbmFsIGVsZW1lbnQgb2YgdGhlIGFycmF5c1xyXG5cdFx0XHR3aGlsZSAoX3N0YXJ0IDwgX3N0cmlwZXNBbW91bnQgLSAxKSB7XHJcblx0XHRcdFx0X3N0YXJ0Kys7XHJcblx0XHRcdFx0Ly8gaW4gdGhpcyBjYXNlIHRoZSBudW1iZXIgaXMgaW5jcmVtZW50aW5nLCB3ZSdyZSBhZGRpbmcgYSBuZWdhdGl2ZSBudW1iZSB0b1xyXG5cdFx0XHRcdC8vIHRoZSBzdGFydCBpbmRleCB2YWx1ZSB0byBjcmVhdGUgdGhlIHByZXZpb3VzIGluZGV4XHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgdGhlIHByZXZpb3VzIGVsZW1lbnQgZXhpc3RzIGluIHRoZSBhcnJheVxyXG5cdFx0XHRcdGNvbnN0IF9wcmV2U3RyaXBlID0gX3ByZXZpb3VzSW5pdEFycmF5Wyhfc3RhcnRTdHJpcGVJbmRleCArIChfc3RhcnRTdHJpcGVJbmRleCAtIF9zdGFydCkpXTtcclxuXHRcdFx0XHQvLyBpZiB0aGUgcHJldmlvdXMgc3RyaXBlIGV4aXN0cywgYWRkIGFuIGFycmF5IHdpdGggdGhlIHByZXZpb3VzIGFuZCBuZXh0XHJcblx0XHRcdFx0Ly8gc3RyaXBlIHRvIHRoZSBjb3JyZXNwb25kaW5nIGFycmF5XHJcblx0XHRcdFx0aWYgKF9wcmV2U3RyaXBlKSB7XHJcblx0XHRcdFx0XHRfcHJldmlvdXNTdHJpcGVzLnB1c2goW19wcmV2U3RyaXBlLCBfcHJldmlvdXNJbml0QXJyYXlbX3N0YXJ0XV0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRfcHJldmlvdXNTdHJpcGVzLnB1c2goX3ByZXZpb3VzSW5pdEFycmF5W19zdGFydF0pO1xyXG5cdFx0XHRcdH0gLy8gcHJldmlvdXMgc3RyaXBlIGNvbmRpdGlvbmFsIGVuZFxyXG5cdFx0XHR9IC8vIGFycmF5IGVuZCBsb29wIGVuZFxyXG5cdFx0fSAvLyBwb2ludGVyIGxvY2F0aW9uIGNvbmRpdGlvbmFsIGVuZFxyXG5cdH0gLy8gcHJldmlvdXMgc3RyaXBlcyBlbmRcclxuXHJcblx0LypcdE5FWFQgU1RSSVBFU1x0Ki9cclxuXHRpZiAoIF9jdXJyZW50U2xpZGVJbmRleCA8IF9zbGlkZXNBbW91bnQgJiYgX25leHRJbml0QXJyYXkubGVuZ3RoID4gMCApe1xyXG5cdFx0Ly8gbm90IHRoZSBsYXN0IHNsaWRlIGFuZCB0aGUgbmV4dCByZWYgYXJyYXkgaGFzIHN0cmlwZXNcclxuXHRcdC8vIGNyZWF0ZSB0aGUgYW5pbWF0aW9uIGFycmF5XHJcblxyXG5cdFx0Ly8gbm90IHRoZSBmaXJzdCBzbGlkZSBhbmQgdGhlIHByZXZpb3VzIHJlZiBhcnJheSBoYXMgc3RyaXBlc1xyXG5cdFx0Ly8gY3JlYXRlIHRoZSBhbmltYXRpb24gYXJyYXlcclxuXHRcdC8vIHRoZSBpbWFnZSBvZiB0aGUgY3VycmVudCBzbGlkZSBoYXMgbG9hZGVkIGFuZCB0aGVyZSBhcmUgc3RyaXBlc1xyXG5cdFx0Ly8gaW4gdGhlIGN1cnJlbnQgcmVmIGFycmF5LiBDcmVhdGUgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIGFycmF5Li8vIGNyZWF0ZSBhbiBpbnRlcm5hbCB2YXJpYWJsZSB0byBtb2RpZnkgaW4gb3JkZXIgdG8gZ2V0IHRoZSBlbGVtZW50XHJcblx0XHRsZXQgX3N0YXJ0ID0gX3N0YXJ0U3RyaXBlSW5kZXg7XHJcblx0XHQvLyBhZGQgdGhlIHBvaW50ZXIgdGFyZ2V0IGVsZW1lbnRcclxuXHRcdF9uZXh0U3RyaXBlcy5wdXNoKF9uZXh0SW5pdEFycmF5W19zdGFydFN0cmlwZUluZGV4XSk7XHJcblx0XHQvLyBjaGVjayBpZiB0aGUgcG9pbnRlciBldmVudCBpcyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIG1pZGRsZSBzdHJpcGVcclxuXHRcdGlmIChfc3RhcnRTdHJpcGVJbmRleCA+IF9zdHJpcGVzTWlkZGxlIHx8IF9zdGFydFN0cmlwZUluZGV4ID09PSBfc3RyaXBlc01pZGRsZSkge1xyXG5cdFx0XHQvLyBhZnRlciBvciBleGFjdGx5IHRoZSBtaWRkbGUgc3RyaXBlLCBsb29wIGRvd25cclxuXHRcdFx0d2hpbGUgKF9zdGFydC0tKSB7XHJcblx0XHRcdFx0Ly8gYSB2YXJpYWJsZSBmb3IgdGhlIG5leHQgc3RyaXBlXHJcblx0XHRcdFx0bGV0IF9uZXh0U3RyaXBlID0gX25leHRJbml0QXJyYXlbKF9zdGFydFN0cmlwZUluZGV4ICsgKF9zdGFydFN0cmlwZUluZGV4IC0gX3N0YXJ0KSldO1xyXG5cdFx0XHRcdC8vIGlmIHRoZSBuZXh0IHN0cmlwZSBleGlzdHMsIGFkZCBhbiBhcnJheSB3aXRoIHRoZSBwcmV2aW91cyBhbmQgbmV4dFxyXG5cdFx0XHRcdC8vIHN0cmlwZSB0byB0aGUgY29ycmVzcG9uZGluZyBhcnJheSAocHJldmlvdXMgb3IgY3VycmVudClcclxuXHRcdFx0XHRpZiAoX25leHRTdHJpcGUpIHtcclxuXHRcdFx0XHRcdF9uZXh0U3RyaXBlcy5wdXNoKFtfbmV4dEluaXRBcnJheVtfc3RhcnRdLCBfbmV4dFN0cmlwZV0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyB0aGUgbmV4dCBzdHJpcGUgZG9lc24ndCBleGlzdCBpbiB0aGUgaW5pdCBhcnJheXMsIHNvIHdlIGFkZCBqdXN0IHRoZSBcclxuXHRcdFx0XHRcdC8vIHByZXZpb3VzIG9uZSBzaW5jZSB3ZSdyZSBsb29waW5nIHRvIDBcclxuXHRcdFx0XHRcdF9uZXh0U3RyaXBlcy5wdXNoKF9uZXh0SW5pdEFycmF5W19zdGFydF0pO1xyXG5cdFx0XHRcdH0gLy8gbmV4dCBzdHJpcGUgY29uZGl0aW9uYWwgZW5kXHJcblx0XHRcdH0gLy8gYXJyYXkgc3RhcnQgbG9vcCBlbmRcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIHRoZSBwb2ludGVyIGV2ZW50IGlzIGJlZm9yZSB0aGUgbWlkZGxlIHN0cmlwZVxyXG5cdFx0XHQvLyBsb29wIHRvIHRoZSBmaW5hbCBlbGVtZW50IG9mIHRoZSBhcnJheXNcclxuXHRcdFx0d2hpbGUgKF9zdGFydCA8IF9zdHJpcGVzQW1vdW50IC0gMSkge1xyXG5cdFx0XHRcdF9zdGFydCsrO1xyXG5cdFx0XHRcdC8vIGluIHRoaXMgY2FzZSB0aGUgbnVtYmVyIGlzIGluY3JlbWVudGluZywgd2UncmUgYWRkaW5nIGEgbmVnYXRpdmUgbnVtYmUgdG9cclxuXHRcdFx0XHQvLyB0aGUgc3RhcnQgaW5kZXggdmFsdWUgdG8gY3JlYXRlIHRoZSBwcmV2aW91cyBpbmRleFxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHRoZSBwcmV2aW91cyBlbGVtZW50IGV4aXN0cyBpbiB0aGUgYXJyYXlcclxuXHRcdFx0XHRjb25zdCBfcHJldlN0cmlwZSA9IF9uZXh0SW5pdEFycmF5Wyhfc3RhcnRTdHJpcGVJbmRleCArIChfc3RhcnRTdHJpcGVJbmRleCAtIF9zdGFydCkpXTtcclxuXHRcdFx0XHQvLyBpZiB0aGUgcHJldmlvdXMgc3RyaXBlIGV4aXN0cywgYWRkIGFuIGFycmF5IHdpdGggdGhlIHByZXZpb3VzIGFuZCBuZXh0XHJcblx0XHRcdFx0Ly8gc3RyaXBlIHRvIHRoZSBjb3JyZXNwb25kaW5nIGFycmF5XHJcblx0XHRcdFx0aWYgKF9wcmV2U3RyaXBlKSB7XHJcblx0XHRcdFx0XHRfbmV4dFN0cmlwZXMucHVzaChbX3ByZXZTdHJpcGUsIF9uZXh0SW5pdEFycmF5W19zdGFydF1dKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0X25leHRTdHJpcGVzLnB1c2goX25leHRJbml0QXJyYXlbX3N0YXJ0XSk7XHJcblx0XHRcdFx0fSAvLyBwcmV2aW91cyBzdHJpcGUgY29uZGl0aW9uYWwgZW5kXHJcblx0XHRcdH0gLy8gYXJyYXkgZW5kIGxvb3AgZW5kXHJcblx0XHR9IC8vIHBvaW50ZXIgbG9jYXRpb24gY29uZGl0aW9uYWwgZW5kXHJcblx0fSAvLyBuZXh0IHN0cmlwZXMgZW5kXHJcbn07IC8vIGNyZWF0ZSBhbmltYXRpb24gYXJyYXlzIGVuZFxyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gcmVzZXQgdGhlIGRyYWcvYW5pbWF0aW9uIGFycmF5c1xyXG4gKiAgVGhpcyBzZXQgdGhlIGFycmF5cyB0byBudWxsIGluIG9yZGVyIHRvIGFsbG93IHRoZSBHQyB0byByZW1vdmUgYWxsXHJcbiAqIFx0dW51c2VkIHJlZmVyZW5jZXMgdG8gdGhlIHN0cmlwZXMgYWZ0ZXIgdGhleSBhcmUgYW5pbWF0ZWQgb3V0IGFuZCBcclxuICogXHRyZW1vdmVkIGZyb20gdGhlIHN0YWdlLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3Jlc2V0U3RyaXBlc0FycmF5cyA9ICgpID0+IHtcclxuXHRfY3VycmVudFN0cmlwZXMgPSBudWxsO1xyXG5cdF9jdXJyZW50SW5pdEFycmF5ID0gbnVsbDtcclxuXHRfcHJldmlvdXNTdHJpcGVzID0gbnVsbDtcclxuXHRfcHJldmlvdXNJbml0QXJyYXkgPSBudWxsO1xyXG5cdF9uZXh0U3RyaXBlcyA9IG51bGw7XHJcblx0X25leHRJbml0QXJyYXkgPSBudWxsO1xyXG5cdF9jdXJyZW50SGFzU3ByaXRlcyA9IG51bGw7XHJcblx0X3ByZXZpb3VzSGFzU3ByaXRlcyA9IG51bGw7XHJcblx0X25leHRIYXNTcHJpdGVzID0gbnVsbDtcclxufTtcclxuIiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBHUkFQSElDIFNUUklQRVMgTU9EVUxFXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuLy8gZ2V0IHRoZSBzdHJpcGVzIGFtb3VudFxyXG5pbXBvcnQgeyBfc3RyaXBlc0Ftb3VudCB9IGZyb20gXCIuLi9zdHJpcGVzLW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIHN0cmlwZSBoZWlnaHRcclxuaW1wb3J0IHsgd2luU2l6ZSwgX3N0cmlwZUhlaWdodCB9IGZyb20gXCIuLi93aW5kb3dcIjtcclxuLy8gZ2V0IHRoZSByZW5kZXJlclxyXG5pbXBvcnQgeyBfbWFpblJlbmRlciwgX3N0cmlwZXNTdGFnZSB9IGZyb20gXCIuLi9waXhpLW1vZHVsZVwiO1xyXG5cclxuLyogIEluIHRoaXMgbW9kdWxlIGNyZWF0ZXMgdGhlIGdyYXBoaWNzIHN0cmlwZXMuXHJcbiAqICBUaGV5IHdpbGwgYmUgYWRkZWQgdG8gYSBzcGVjaWZpYyBpbml0IGFycmF5IGFuZCB0aGVuIHRvIHRoZSBhbmltYXRpb25cclxuICogXHRhcnJheSBkZXBlbmRpbmcgb24gdGhlIHBhcmFtIHBhc3NlZCB0byB0aGUgbWV0aG9kLlxyXG4qL1xyXG5cclxuLyogIEJvb2wgdG8gY2hlY2sgaWYgYSBzbGlkZSdzIGltYWdlIHdhcyBub3QgbG9hZGVkLlxyXG4gKiAgV2hlbiB0aGUgbWV0aG9kIHRvIGNyZWF0ZSB0aGUgZ3JhcGhpYyBzdHJpcGVzIGlzIGNhbGxlZFxyXG4gKiBcdHNldCB0aGlzIHRvIHRydWUuIFRoaXMgd2lsbCBiZSBjaGVja2VkIGluIHRoZSBpbmRleCBjaGFuZ2VcclxuICogXHRtZXRob2QgYW5kIHdpbGwgdXBkYXRlIHRoZSBjb2xvciBpbmRleC5cclxuKi9cclxuZXhwb3J0IGxldCBfZ3JhcGhpY1N0cmlwZXNDcmVhdGVkID0gZmFsc2U7XHJcblxyXG4vKiogTWV0aG9kIHRvIFJlc2V0IHRoZSBHcmFwaGljcyBTdHJpcGVzIEJvb2wuXHRcclxuICogIFNldHMgdGhlIGdyYXBoaWNzIHN0cmlwZXMgYm9vbGVhbiBiYWNrIHRvIGZhbHNlLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3Jlc2V0R3JhcGhpY1N0cmlwZXNCb29sID0gKCkgPT4ge1xyXG5cdF9ncmFwaGljU3RyaXBlc0NyZWF0ZWQgPSBmYWxzZTtcclxufTtcclxuXHJcbi8qKiBDcmVhdGUgR3JhcGhpY3MgU3RyaXBlcyBNZXRob2QuXHRcclxuICogXHRVc2UgdGhlIHRhcmdldCBhcnJheSB0byBwdXNoIHRoZSBzdHJpcGVzLCB0aGUgY29sb3IgdGhlIHdpbGxcclxuICogXHRiZSB1c2VkIHRvIGNyZWF0ZSB0aGUgc3RyaXBlcyBhbmQgYSBudW1iZXIgdG8gaW5kaWNhdGUgdGhlIHBvc2l0aW9uLlxyXG4gKiBcdFRoaXMgbnVtYmVyIGNhbiBiZSAwLCAxIG9yIDIgZGVwZW5kaW5nIG9uIHRoZSB0YXJnZXQgYXJyYXkuIFRoaXMgd2lsbFxyXG4gKiBcdGJlIHVzZWQgdG8gc2V0IHRoZSBYIHBvc2l0aW9uIG9mIHRoZSBzdHJpcGVzLiAwIGlzIGN1cnJlbnQgd2hpY2ggbWVhbnNcclxuICogXHR0aGUgWCBwb3NpdGlvbiBpcyAwLiAxIGlzIHByZXZpb3VzIHdoaWNoIG1lYW5zIHRoZSBYIHBvc2l0aW9uIGlzIHRvXHJcbiAqIFx0dGhlIGxlZnQgb2YgdGhlIHNjcmVlbi4gMiBpcyB0aGUgbmV4dCB3aGljaCBtZWFucyB0aGUgWCBwb3NpdGlvbiBpcyB0b1xyXG4gKiBcdHRoZSByaWdodCBvZiB0aGUgc2NyZWVuLlxyXG4gKiAgQHBhcmFtIHthcnJheX0gdGE6IHRoZSB0YXJnZXQgYXJyYXkgZm9yIHRoZSBzdHJpcGVzXHJcbiAqIFx0QHBhcmFtIHtudW1iZXJ9IHA6IHRoZSBYIHBvc2l0aW9uIGZvciB0aGUgc3RyaXBlc1xyXG4gKiBcdEBwYXJhbSB7c3RyaW5nfSBjOiB0aGUgY29sb3IgdXNlZCB0byBjcmVhdGUgdGhlIGdyYXBoaWNzXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfY3JlYXRlR3JhcGhpY1N0cmlwZXMgPSAodGEsIHAsIGMpID0+IHtcclxuXHRsZXQgX3N0YXJ0WCA9IDA7XHJcblxyXG5cdHN3aXRjaCAocCl7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdF9zdGFydFggPSAtd2luU2l6ZS53IC0gMTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdF9zdGFydFggPSB3aW5TaXplLnc7XHJcblx0XHRcdGJyZWFrO1xyXG5cdH0vLyBzd2l0Y2hcclxuXHRjb25zdCBfbmV3SGVpZ2h0ID0gcGFyc2VJbnQoIF9zdHJpcGVIZWlnaHQgKSArIDE7XHJcblx0Ly8gbG9vcCB0byBjcmVhdGUgdGhlIHN0cmlwZXMgYW5kIGFkZCB0aGVtIHRvIHRoZSB0YXJnZXQgYXJyYXlcclxuXHRmb3IoIHZhciBpID0gMDsgaSA8IF9zdHJpcGVzQW1vdW50OyBpKysgKSB7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGdyYXBoaWMgZWxlbWVudFxyXG5cdFx0Y29uc3QgX25HID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuXHRcdF9uR1xyXG5cdFx0XHQuYmVnaW5GaWxsKGMsIDEpXHJcblx0XHRcdC5kcmF3UmVjdCgwLCAwLCB3aW5TaXplLncsIF9uZXdIZWlnaHQgKVxyXG5cdFx0XHQuZW5kRmlsbCgpO1xyXG5cdFx0X25HLnggPSBfc3RhcnRYO1xyXG5cdFx0X25HLnkgPSAoIF9zdHJpcGVIZWlnaHQgKiBpICk7XHJcblx0XHQvLyBhZGQgdGhlIGdyYXBoaWMgdG8gdGhlIGFycmF5XHJcblx0XHR0YS5wdXNoKF9uRyk7XHJcblx0XHQvLyBhZGQgdGhlIGdyYXBoaWMgdG8gdGhlIHN0YWdlXHJcblx0XHQvLyBfbWFpblJlbmRlci5zdGFnZS5hZGRDaGlsZCggX25HICk7XHJcblx0XHRfc3RyaXBlc1N0YWdlLmFkZENoaWxkKCBfbkcgKTtcclxuXHR9XHJcblx0Ly8gc2V0IHRoZSBncmFwaGljcyBzdHJpcGVzIGJvb2wgdG8gdHJ1ZVxyXG5cdF9ncmFwaGljU3RyaXBlc0NyZWF0ZWQgPSB0cnVlO1xyXG59O1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9ncmFwaGljLXN0cmlwZXNcIjsiLCJleHBvcnQgKiBmcm9tIFwiLi90ZXh0LW1vZHVsZVwiO1xyXG4vLyBleHBvcnQgKiBmcm9tIFwiLi9pbnRlcmFjdGlvbi10ZXh0LW1vZHVsZVwiOyIsIi8qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHRcdFRPVUNIIEVWRU5UU1xyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcblxyXG4vLyBnZXQgdGhlIGV2ZW50IGVtaXR0ZXJcclxuaW1wb3J0IHsgX2V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi9nbG9iYWwtY2xhc3MtbW9kdWxlXCI7O1xyXG5cclxuLyoqIFRvdWNoIFN0YXJ0IE1ldGhvZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZSBQSVhJIGV2ZW50IG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3RleHRUb3VjaFN0YXJ0ID0gZSA9PiB7XHJcblx0Ly8gcHJldmVudCBidWJibGluZ1xyXG5cdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0Ly8gc2V0IHRoZSB0b3VjaGluZyBib29sIHRvIHRydWVcclxuXHRfaXNVc2VyVG91Y2hpbmcgPSB0cnVlO1xyXG5cdC8vIHVwZGF0ZSB0aGUgc3RhcnQgcGFyYWdyYXBoIGluZGV4IGZvciB0aGUgbmV4dCB0b3VjaCBldmVudFxyXG5cdF9zdGFydFBhckluZGV4ID0gX2N1cnJyZW50UGFyYWdyYXBoSW5kZXg7XHJcblx0Ly8gY29uc29sZS5sb2coXCJzdGFydCBwYXIgaW5kZXggPT4gXCIsIF9zdGFydFBhckluZGV4KTtcclxuXHQvLyBzZXQgdGhlIHN0YXJ0IGRyYWcgcG9pbnRcclxuXHRfdGV4dFN0YXJ0WSA9IGUuZGF0YS5nbG9iYWwueTtcclxuXHQvLyBpZiB0aGUgcGFyYWdyYXBoIGdhcCB0aW1lciBpcyBydW5uaW5nLCBwYXVzZSBpdFxyXG5cdGlmIChfcGFyR2FwKSB7IF9wYXJHYXAucGF1c2UoKTsgfTtcclxufTtcclxuXHJcbi8qKiBUb3VjaCBFbmQgTWV0aG9kXHJcbiAqIFdoZW4gdGhlIHRvdWNoIGlzIGRvbmUsIGFmdGVyIHJlc2V0aW5nIHRoZSBib29sZWFuIHdlIG5lZWQgdG8gcmVzdGFydCB0aGUgXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfdGV4dFRvdWNoRW5kID0gZSA9PiB7XHJcblx0Ly8gc3RvcCBldmVudCBidWJiaWxuZ1xyXG5cdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0Ly8gZmluYWxseSBzZXQgdGhlIHRvdWNoaW5nIGJvb2wgdG8gZmFsc2VcclxuXHRfaXNVc2VyVG91Y2hpbmcgPSBmYWxzZTtcclxuXHQvKiBBZnRlciB0aGUgaW50ZXJhY3Rpb24gaXMgY29tcGxldGUgY2hlY2sgaWYgdGhlIGN1cnJlbnQgcGFyYWdyYXBoIGlzIHRoZVxyXG5cdCAqIGZpbmFsIG9uZS4gVGhlIHVzZXIgY291bGQgZHJhZyBhZnRlciBhbGwgdGhlIHBhcmFncmFwaHMgYXJlIGFuaW1hdGVkIGluXHJcblx0ICogaW4gdGhhdCBjYXNlIHRoZSB0ZXh0IGNvbXBsZXRlIGJvb2wgaXMgdHJ1ZSBhbmQgdGhlIHVzZXIgY291bGQgZ28gdG8gYVxyXG5cdCAqIHByZXZpb3VzIHBhcmFncmFwaCBhbmQgdGhlIGRlbGF5ZWQgY2FsbCB3b24ndCBiZSBzdGFydGVkLlxyXG5cdCovXHJcblx0X2lzVGV4dENvbXBsZXRlID0gKF9jdXJycmVudFBhcmFncmFwaEluZGV4ID09PSAoX3RleHREYXRhLnBhcmFncmFwaHNBbW91bnQgLSAxKSk7XHJcblx0Ly8gaWYgdGhlIHRpbWVyIGlzIG5vdCBjcmVhdGVkIGFuZCB0aGlzIGlzIG5vdCB0aGUgZmluYWwgcGFyYWdyYXBoXHJcblx0Ly8gY3JlYXRlIHRoZSB0aW1lclxyXG5cdGlmICghX2lzVGV4dENvbXBsZXRlICYmICFfcGFyR2FwKSB7XHJcblx0XHRfcGFyR2FwID0gVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKFxyXG5cdFx0XHQoX3RleHREYXRhLnBBcnJheXNbX2N1cnJyZW50UGFyYWdyYXBoSW5kZXhdLmxlbmd0aCAqIDAuMikudG9GaXhlZCgyKSxcclxuXHRcdFx0X2FkZFdvcmQsIFt0cnVlXVxyXG5cdFx0KS5wYXVzZSgpOyAvLyBkZWxheWVkIGNhbGxcclxuXHR9XHJcblx0Ly8gcmVzdGFydCB0aGUgd29yZCBhbmltYXRpb24gaWYgdGhlIHRleHQgaXMgbm90IGNvbXBsZXRlXHJcblx0aWYgKCFfaXNUZXh0Q29tcGxldGUgJiYgX2N1cnJyZW50UGFyYWdyYXBoSW5kZXggPCAoX3RleHREYXRhLnBhcmFncmFwaHNBbW91bnQgLSAxKSkge1xyXG5cdFx0X3BhckdhcC5yZXN0YXJ0KHRydWUpO1xyXG5cdH07XHJcbn07XHJcblxyXG4vKiogVG91Y2ggTW92ZSBNZXRob2RcclxuICogQHBhcmFtIHtvYmplY3R9IGUgUElYSSBldmVudCBvYmplY3RcclxuICogQHByaXZhdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF90ZXh0VG91Y2hNb3ZlID0gZSA9PiB7XHJcblx0Ly8gc3RvcCBldmVudCBidWJiaWxuZ1xyXG5cdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0aWYgKF9pc1VzZXJUb3VjaGluZykge1xyXG5cdFx0X3RleHREcmFnQW1vdW50ID0gX3RleHRTdGFydFkgLSBlLmRhdGEuZ2xvYmFsLnk7XHJcblx0XHQvLyBfdGV4dERpcmVjdGlvbiA9IF90ZXh0RHJhZ0Ftb3VudCA+IDA7XHJcblx0XHRjb25zdCBfdGFyZ2V0UGFyYWdyYXBoID0gX3N0YXJ0UGFySW5kZXggKyBNYXRoLnJvdW5kKF90ZXh0RHJhZ0Ftb3VudCAvIF90ZXh0TWluRHJhZyk7XHJcblx0XHQvLyBzaG93IHRoZSB0YXJnZXQgcGFyYWdyYXBoIGlmIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50XHJcblx0XHRpZiAoX2N1cnJyZW50UGFyYWdyYXBoSW5kZXggIT09IF90YXJnZXRQYXJhZ3JhcGggJiYgX3RleHREYXRhLnBTdHJpbmdzW190YXJnZXRQYXJhZ3JhcGhdICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Ly8gc3RvcmUgdGhlIHRhcmdldCBwYXJhZ3JhcGggYXJyYXlcclxuXHRcdFx0Y29uc3QgX3RhcmdldFBhckFycmF5ID0gX3RleHREYXRhLnBBcnJheXNbX3RhcmdldFBhcmFncmFwaF07XHJcblx0XHRcdGNvbnN0IF90YXJnZXRBcnJheVdvcmRzID0gX3RhcmdldFBhckFycmF5Lmxlbmd0aDtcclxuXHRcdFx0Ly8gd2Ugc2hvdWxkIHNob3cgYSBkaWZmZXJlbnQgcGFyYWdyYXBoXHJcblx0XHRcdC8vIHNob3cgdGhlIG5ldyBwYXJhZ3JhcGhcclxuXHRcdFx0X3RpdGxlLnRleHQgPSBfdGV4dERhdGEucFN0cmluZ3NbX3RhcmdldFBhcmFncmFwaF07XHJcblx0XHRcdC8vIHVwZGF0ZSB0aGUgcGFyYWdyYXBoIGluZGV4XHJcblx0XHRcdF9jdXJycmVudFBhcmFncmFwaEluZGV4ID0gX3RhcmdldFBhcmFncmFwaDtcclxuXHRcdFx0Ly8gY2xlYXIgdGhlIGJhY2tncm91bmQgZ3JhcGhpY3NcclxuXHRcdFx0X3RleHRCYWNrZ3JvdW5kR3JhcGguY2xlYXIoKTtcclxuXHRcdFx0Ly8gR28gdGhyb3VnaCB0aGUgd29yZHMgb2YgdGhlIHRhcmdldCBwYXJhZ3JhcGggYW5kIGNoZWNrIHRoZSBsaW5lIHdpZHRoc1xyXG5cdFx0XHQvLyBvbmNlIHdlIHJlYWNoIHRoZSBmaW5hbCB3b3JkIG9mIHRoZSBsaW5lIGRyYXcgYSBncmFwaGljIFxyXG5cdFx0XHRsZXQgX3RhcmdldExpbmUgPSAxO1xyXG5cdFx0XHRfdGFyZ2V0UGFyQXJyYXkuZm9yRWFjaCgodywgaSkgPT4ge1xyXG5cdFx0XHRcdC8vIGlmIHRoZSBsaW5lIG9mIGhlIGN1cnJlbnQgd29yZCBpcyBsZXNzIHRoYW4gdGhlIGN1cnJlbnQgbGluZVxyXG5cdFx0XHRcdC8vIHVwZGF0ZSB0aGUgY3VycmVudCBsaW5lIGluZGV4IGFuZCBzZXQgdGhlIGdyYXBoaWMgd2lkdGhcclxuXHRcdFx0XHQvLyB0byB0aGUgd2lkdGggb2YgdGhlIHByZXZpb3VzIHdvcmRcclxuXHRcdFx0XHRpZiAoX3RhcmdldExpbmUgPCB3LmxpbmUpIHtcclxuXHRcdFx0XHRcdC8vIGNyZWF0ZSB0aGUgbmV3IGdyYXBoaWNcclxuXHRcdFx0XHRcdF90ZXh0QmFja2dyb3VuZEdyYXBoXHJcblx0XHRcdFx0XHRcdC5iZWdpbkZpbGwoMHgwMDA1MWIpXHJcblx0XHRcdFx0XHRcdC5kcmF3UmVjdCgwLCBfdGV4dExpbmVIZWlnaHQgKiBfdGFyZ2V0TGluZSxcclxuXHRcdFx0XHRcdFx0X3RhcmdldFBhckFycmF5W2kgLSAxXS53aWR0aCwgX3RleHRMaW5lSGVpZ2h0KVxyXG5cdFx0XHRcdFx0XHQuZW5kRmlsbCgpO1xyXG5cdFx0XHRcdFx0Ly8gdXBkYXRlIHRoZSB0YXJnZXQgbGluZSB2YWx1ZVxyXG5cdFx0XHRcdFx0X3RhcmdldExpbmUgPSB3LmxpbmU7XHJcblx0XHRcdFx0fSAvLyBsaW5lIGNvbmRpdGlvbmFsXHJcblx0XHRcdH0pOyAvLyB3b3JkcyBsb29wXHJcblx0XHRcdC8vIGRyYXcgdGhlIGZpbmFsIGxpbmUgZ3JhcGhpY1xyXG5cdFx0XHRfdGV4dEJhY2tncm91bmRHcmFwaFxyXG5cdFx0XHRcdC5iZWdpbkZpbGwoMHgwMDA1MWIpXHJcblx0XHRcdFx0LmRyYXdSZWN0KDAsIF90ZXh0TGluZUhlaWdodCAqIF90YXJnZXRMaW5lLFxyXG5cdFx0XHRcdF90YXJnZXRQYXJBcnJheVtfdGFyZ2V0QXJyYXlXb3JkcyAtIDFdLndpZHRoLCBfdGV4dExpbmVIZWlnaHQpXHJcblx0XHRcdFx0LmVuZEZpbGwoKTtcclxuXHRcdFx0Ly9cclxuXHRcdH1cclxuXHR9IC8vIHVzZXIgdG91Y2ggY29uZGl0aW9uYWxcclxufTsgLy8gdG91Y2ggbW92ZVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHRcdFRBUCBFVkVOVCBNRVRIT0RTXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuLy8gbWF4IGRpc3RhbmNlIGZvciB0aGUgdG91Y2ggZXZlbnRzIGluIHRoZSB0ZXh0IGNvbnRhaW5lclxyXG5leHBvcnQgY29uc3QgX21heFRvdWNoRGlzdGFuY2UgPSAyMDtcclxuLyogVmFyaWFibGUgdG8gc2V0IHRoZSBkaXN0YW5jZSBvZiB0aGUgdG91Y2ggZXZlbnQgaW4gdGhlIHRleHQgY29udGFpbmVyLlxyXG4gKiBUaGUgdmFsdWUgaXMgY29tcGFyZWQgd2l0aCB0aGUgbWF4IHRvdWNoIGRpc3RhbmNlIGNvbnN0YW50XHJcbiovXHJcbmV4cG9ydCBsZXQgX2N1cnJlbnRUb3VjaERpc3RhbmNlO1xyXG5cclxuLy8gdGhlIHBvaW50IHdoZXJlIHRoZSB0b3VjaCBldmVudCBzdGFydGVkXHJcbmxldCBfdGV4dFRvdWNoU3RhcnRQb2ludCA9IHt4OjAsIHk6MH07XHJcblxyXG4vKiBNYXggdGltZSBiZXR3ZWVuIHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZSB0b3VjaCBldmVudC5cclxuICogSWYgdGhlIHRpbWUgYmV0d2VlbiB0aGUgZXZlbnRzIGlzIG1vcmUgdGhhbiB0aGlzIHZhbHVlLCB0aGVuXHJcbiAqIHRoZSB0ZXh0IHRhcCBlbWl0dGVyIGlzIG5vdCBjYWxsZWQuXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfbWF4VG91Y2hUaW1lID0gMTIwO1xyXG4vLyB0aGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdG91Y2ggZXZlbnRzLlxyXG5leHBvcnQgbGV0IF9lbGFwc2VkVG91Y2hUaW1lO1xyXG4vLyB0aGUgdGltZSB3aGVuIHRoZSB0b3VjaCBldmVudCBzdGFydGVkXHJcbmxldCBfdGV4dFRvdWNoU3RhcnRUaW1lO1xyXG5cclxuLy8gdGV4dCBzdGFnZSB0b3VjaCBib29sZWFuXHJcbmV4cG9ydCBsZXQgX2lzVGV4dFRvdWNoaW5nID0gZmFsc2U7XHJcblxyXG4vKiogVG91Y2ggU3RhcnQgTWV0aG9kLlxyXG4gKiBUaGlzIGlzIGF0dGFjaGVkIHRvIHRoZSB0ZXh0IHN0YWdlIGFuZCBiYXNpY2FsbHkgc2V0cyB0aGUgdmFsdWUgb2YgdGhlXHJcbiAqIGN1cnJlbnQgdG91Y2ggZGlzdGFuY2UgYW5kIGVsYXBzZWQgdG91Y2ggdGltZSB0byAwLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gZSB0aGUgZXZlbnQgb2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfdGV4dFRhcFN0YXJ0ID0gZSA9PiB7XHJcblx0Y29uc3QgeyB4LCB5IH0gPSBlLmRhdGEuZ2xvYmFsO1xyXG5cdC8vIHNldCB0aGUgYm9vbFxyXG5cdF9pc1RleHRUb3VjaGluZyA9IHRydWU7XHJcblx0Ly8gcmVzZXQgdGhlIHRvdWNoIGRpc3RhbmNlXHJcblx0X2N1cnJlbnRUb3VjaERpc3RhbmNlID0gMDtcclxuXHQvLyBzZXQgdGhlIGN1cnJlbnQgdGltZVxyXG5cdF90ZXh0VG91Y2hTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHQvLyBzZXQgdGhlIHN0YXJ0IHBvaW50XHJcblx0X3RleHRUb3VjaFN0YXJ0UG9pbnQgPSB7IHgsIHkgfTtcclxufTtcclxuXHJcbi8qKiBUb3VjaCBFbmQgTWV0aG9kXHJcbiAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSB0b3VjaCBkaXN0YW5jZSBhbmQgdGhlIGVsYXBzZWQgdGltZS5cclxuICogQ29tcGFyZXMgdGhvc2UgdmFsdWVzIHdpdGggdGhlIGxpbWl0cyBhbmQgZGVwZW5kaW5nIG9uIHRoYXQgaWZcclxuICogdGhlIHRleHQgdGFwIGV2ZW50IGlzIGVtaXR0ZWQgb3Igbm90LlxyXG4gKiBAcGFyYW0ge29iamVjdH0gZSB0aGUgZXZlbnQgb2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfdGV4dFRhcEVuZCA9IGUgPT4ge1xyXG5cdGlmICggX2lzVGV4dFRvdWNoaW5nICkge1xyXG5cdFx0Ly8gc2V0IHRoZSBlbGFwc2VkIHRpbWUgYmV0d2VlbiBldmVudHNcclxuXHRcdF9lbGFwc2VkVG91Y2hUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBfdGV4dFRvdWNoU3RhcnRUaW1lO1xyXG5cdFx0Ly8gc2V0IHRoZSB0b3VjaCBkaXN0YW5jZVxyXG5cdFx0X2N1cnJlbnRUb3VjaERpc3RhbmNlID0ge1xyXG5cdFx0XHR4OiBNYXRoLmFicyhlLmRhdGEuZ2xvYmFsLnggLSBfdGV4dFRvdWNoU3RhcnRQb2ludC54KSxcclxuXHRcdFx0eTogTWF0aC5hYnMoZS5kYXRhLmdsb2JhbC55IC0gX3RleHRUb3VjaFN0YXJ0UG9pbnQueSlcclxuXHRcdH07XHJcblx0XHQvLyBpZiB0aGUgdGltZSBhbmQgZGlzdGFuY2UgYXJlIGxlc3MgdGhhbiB0aGUgbGltaXRzIGVtaXQgdGhlIHRhcCBldmVudFxyXG5cdFx0aWYgKCBfZWxhcHNlZFRvdWNoVGltZSA8IF9tYXhUb3VjaFRpbWUgJiYgX2N1cnJlbnRUb3VjaERpc3RhbmNlLnggPCBfbWF4VG91Y2hEaXN0YW5jZSAmJiBfY3VycmVudFRvdWNoRGlzdGFuY2UueSA8IF9tYXhUb3VjaERpc3RhbmNlICkge1xyXG5cdFx0XHRfZXZlbnRFbWl0dGVyKFwidGV4dHRhcFwiKTtcclxuXHRcdH1cclxuXHRcdC8vIHJlc2V0IHRoZSBib29sZWFuXHJcblx0XHRfaXNUZXh0VG91Y2hpbmcgPSBmYWxzZTtcclxuXHR9IC8vIHRleHQgdG91Y2ggY29uZGl0aW9uYWxcdFxyXG59O1xyXG5cclxuLyoqIFRvdWNoIGVuZCBvdXRzaWRlIG1ldGhvZC5cclxuICogVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgdG91Y2ggZXZlbnQgZW5kcyBvdXQgb2YgdGhlIHRleHRcclxuICogY29udGFpbmVyLiBJbiB0aGF0IGNhc2UgYWxsIHRoZSB2YXJpYWJsZXMgYXJlIHJlc2V0IGFuZCBldmVudCBpc1xyXG4gKiBub3QgZW1pdHRlZC5cclxuICogQHByaXZhdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF90ZXh0VGFwRW5kT3V0ID0gKCkgPT4ge1xyXG5cdGlmICggX2lzVGV4dFRvdWNoaW5nICkge1xyXG5cdFx0Ly8gcmVzZXQgdGhlIHRvdWNoIGRpc3RhbmNlXHJcblx0XHRfY3VycmVudFRvdWNoRGlzdGFuY2UgPSAwO1xyXG5cdFx0Ly8gc2V0IHRoZSBjdXJyZW50IHRpbWVcclxuXHRcdF90ZXh0VG91Y2hTdGFydFRpbWUgPSAwO1xyXG5cdFx0Ly8gc2V0IHRoZSBzdGFydCBwb2ludFxyXG5cdFx0X3RleHRUb3VjaFN0YXJ0UG9pbnQgPSB7fTtcclxuXHRcdC8vIHNldCB0aGUgYm9vbFxyXG5cdFx0X2lzVGV4dFRvdWNoaW5nID0gZmFsc2U7XHJcblx0fVxyXG59O1xyXG4iLCIvKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0XHRURVhUIENPTVBPTkVOVCBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG4vLyBnZXQgd2luZG93IHZhcnNcclxuaW1wb3J0IHsgd2luU2l6ZSB9IGZyb20gXCIuLi93aW5kb3dcIjtcclxuLy8gZ2V0IHRoZSB0ZXh0IHN0YWdlIGNvbnRhaW5lciB0byBhZGQgdGhlIHRleHQgZWxlbWVudHMgYW5kIHRoZVxyXG4vLyBiYWNrZ3JvdW5kIGdyYXBoaWNcclxuaW1wb3J0IHsgX3RleHRTdGFnZSB9IGZyb20gXCIuLi9waXhpLW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXhcclxuaW1wb3J0IHsgX2N1cnJlbnRTbGlkZUluZGV4IH0gZnJvbSBcIi4uL3NsaWRlLWNoYW5nZS1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBhcHAgaW5pdGlhbGl6ZWQgYm9vbGVhblxyXG5pbXBvcnQgeyBfYXBwSW5pdGlhbGl6ZWQgfSBmcm9tIFwiLi4vc2xpZGUtbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgaW50ZXJhY3Rpb24gYm9vbGVhblxyXG5pbXBvcnQgeyBfdXNlckludGVyYWN0aW9uIH0gZnJvbSBcIi4uL2ludGVyYWN0aW9uLW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIHNwZWNpZmljIGludGVyYWN0aW9uIG1ldGhvZHNcclxuaW1wb3J0IHsgX3RleHRUYXBTdGFydCwgX3RleHRUYXBFbmQsIF90ZXh0VGFwRW5kT3V0IH0gZnJvbSBcIi4vaW50ZXJhY3Rpb24tdGV4dC1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBzbGlkZXMgZGF0YSBhbmQgYW1vdW50XHJcbmltcG9ydCB7IF9zbGlkZXNEYXRhIH0gZnJvbSBcIi4uL2FqYXgtbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgdGV4dCBkaW1lbnNpb25zIGFuZCBwb3NpdGlvbnMgZnJvbSB0aGUgd2luZG93IG1vZHVsZVxyXG5pbXBvcnQgeyBfdGV4dExpbmVIZWlnaHQsIF90ZXh0VmVydGljYWxQb3MsIF9jdXJyZW50SGVpZ2h0IH0gZnJvbSBcIi4uL3dpbmRvd1wiO1xyXG4vLyBnZXQgdGhlIGV2ZW50IGVtaXR0ZXJcclxuaW1wb3J0IHsgX2V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi9nbG9iYWwtY2xhc3MtbW9kdWxlXCI7XHJcblxyXG5cclxuXHJcbi8qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHRcdFRFWFQgQ09NUE9ORU5UXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuLy8gdGhlIGZvbnQgc2l6ZXMgZm9yIGVhY2ggc2NyZWVuIGhlaWdodFxyXG5jb25zdCBfZm9udFNpemVzID0gWzIwLCAzMSwgNDAsIDUwXTtcclxuLy8gdGhlIGxpbmUgaGVpZ2h0cyBmbyBlYWNoIHNjcmVlbiBoZWlnaHRcclxuLy8gY29uc3QgX2xpbmVIZWlnaHRzID0gWzI1LCAzOCwgNDcsIDYwXTtcclxuY29uc3QgX2xpbmVIZWlnaHRzID0gWzIzLCAzNiwgNDUsIDU4XTtcclxubGV0IF90ZXh0U3R5bGUgPSB7XHJcblx0Ly8gd29yZFdyYXBXaWR0aDogd2luU2l6ZS53ICogLjgyLFxyXG5cdGZvbnRTaXplOiBfZm9udFNpemVzW19jdXJyZW50SGVpZ2h0XSxcclxuXHRsaW5lSGVpZ2h0OiBfbGluZUhlaWdodHNbX2N1cnJlbnRIZWlnaHRdLFxyXG5cdGJyZWFrV29yZHM6IHRydWUsXHJcblx0d29yZFdyYXA6IHRydWUsXHJcblx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxSb2JvdG8sT3h5Z2VuLFVidW50dSxDYW50YXJlbGwsT3BlbiBTYW5zLEhlbHZldGljYSBOZXVlLHNhbnMtc2VyaWZcIixcclxuXHRmaWxsOiAweGZmZmZmZlxyXG59O1xyXG5cclxuLy8gdmFyaWFibGVzIHRvIGNyZWF0ZSB0aGUgcGFyYWdyYXBocyBhbmQgYW5pbWF0ZSB0aGUgdGV4dFxyXG4vLyBsZXQgX2N1cnJlbnRXb3JkID0gMDtcclxubGV0IF9yZWZlcmVuY2VUZXh0ID0gXCJcIjtcclxubGV0IF9kaXNwbGF5VGV4dCA9IFwiXCI7XHJcblxyXG4vLyB0aGUgaGVpZ2h0IG9mIGEgdGV4dCBsaW5lXHJcbi8vIGxldCBfdGV4dExpbmVIZWlnaHQgPSAyNTtcclxuLy8gdGV4dCBlbGVtZW50IHZlcnRpY2FsIHBvc2l0aW9uIDEzNSAtIDE3NSAtIDIwM1xyXG4vLyBsZXQgX3RleHRWZXJ0aWNhbFBvcyA9IDEzNTtcclxuLy8gc3RvcmUgdGhlIHBhcmFncmFwaCBoZWlnaHRcclxuLy8gbGV0IF9wYXJIZWlnaHQgPSBfdGV4dExpbmVIZWlnaHQgKiAzO1xyXG4vLyB0aGUgd29yZCBzcGVlZFxyXG5jb25zdCBfd29yZFNwZWVkID0gMC4wMzU7XHJcbi8vIHRpbWUgYmV0d2VlbiBlYWNoIHBhcmFncmFwaCwgZ2l2ZXMgdGhlIHVzZXIgZW5vdWdoIHRpbWUgdG8gcmVhZCB0aGUgdGV4dFxyXG4vLyBpcyBzZXQgZGVwZW5kaW5nIG9uIHRoZSBhbW91bnQgb2Ygd29yZHMgb2YgdGhlIHBhcmFncmFwaC5cclxuZXhwb3J0IGxldCBfcGFyR2FwID0gdW5kZWZpbmVkO1xyXG4vLyB0aGUgZHJhZyB0aHJlc2hvbGQgZm9yIHRoZSBkcmFnIHNjcm9sbCBtb3Rpb25cclxuY29uc3QgX3RleHRNaW5EcmFnID0gMzA7XHJcbi8vIHRleHQgZHJhZyBkaXJlY3Rpb24uIFRydWUgaXMgc2Nyb2xsbmcgdXAgYW5kIGZhbHNlIGlzIHNjcm9sbGluZyBkb3duXHJcbi8vIHVwIGlzIGdvaW5nIHRvIHRoZSBuZXh0IHBhcmFncmFwaCBhbmQgZG93biBpcyBnb2luZyB0byB0aGUgcHJldmlvdXNcclxuLy8gbGV0IF90ZXh0RGlyZWN0aW9uID0gdHJ1ZTtcclxuLy8gdGhlIGluaXRpYWwgcG9zaXRpb24gb2YgdGhlIGRyYWcgbW90aW9uLCBwb2ludGVyIHBvc2l0aW9uXHJcbmxldCBfdGV4dFN0YXJ0WSA9IG51bGw7XHJcbi8vIHRoZSB0ZXh0IGRyYWcgYW1vdW50IG9mIHRoZSBjdXJyZW50IHBvaW50ZXIgZXZlbnRcclxubGV0IF90ZXh0RHJhZ0Ftb3VudCA9IDA7XHJcbi8vIHRoZSBwYXJhZ3JhcGggaW5kZXggd2hlbiB0aGUgdXNlciBpbnRlcmFjdGlvbiBzdGFydHNcclxubGV0IF9zdGFydFBhckluZGV4ID0gMDtcclxuXHJcblxyXG4vKiBUZXh0IERhdGEgT2JqZWN0Llx0XHJcbiAqIHBBcnJheXM6IGNvbnRhaW5zIHRoZSB3b3JkcyBhcnJheSBmb3IgZWFjaCB0ZXh0IGJsb2NrICh0aXRsZS9zdWJ0aXRsZSkuXHJcbiAqIHRoaXMgYXJyYXlzIHdpbGwgYmUgdXNlZCBmb3IgdGhlIHRleHQgYW5pbWF0aW9uLlxyXG4gKiBwU3RyaW5nczogY29udGFpbnMgdGhlIGNvbXBsZXRlIHN0cmluZyBvZiBlYWNoIHBhcmFncmFwaCBvZiBlYWNoIHRleHRcclxuICogYmxvY2suIFRoaXMgaXMgdXNlZCBmb3IgdGhlIHNjcm9sbCBmdW5jdGlvbmFsaXR5LCBzaW5jZSB3ZSBjYW4gYWNjZXNzXHJcbiAqIGFuZCByZW5kZXIgdGhlIGVudGlyZSBwYXJhZ3JhcGggYXQgb25jZSBhbmQgcmVwbGFjZSB0aGUgZW50aXJlIHJlbmRlcmVkXHJcbiAqIHRleHQgd2l0aG91dCBsb29waW5nIHRocm91Z2ggZWFjaCB3b3JkcyBhcnJheS5cclxuKi9cclxuZXhwb3J0IGxldCBfdGV4dERhdGEgPSB7XHJcblx0cEFycmF5czogW10sXHJcblx0cFN0cmluZ3M6IFtdLFxyXG5cdC8qIEFycmF5IGluZGV4IHBvc2l0aW9ucy5cdFxyXG5cdCAqIHRoaXMgYXJyYXkgaGFzIHRoZSBzdGFydCBhbmQgZW5kIGluZGV4IGZvciBlYWNoIHBhcmFncmFwaC5cclxuXHQgKiB0aGlzIGlzIHVzZWQgZm9yIHRoZSBzY3JvbGwgZnVuY2lvbmFsaXR5LCBpbiBvcmRlciB0byBhdm9pZFxyXG5cdCAqIGNhbGxpbmcgdGhlIGNvZGUgdG8gdG8gYWRkIHdvcmRzIHdoaWxlIHNjcm9sbGluZy5cclxuXHQqL1xyXG5cdHBhcmFncmFwaHNJbmRleDogW10sXHJcblx0LyogQW1vdW50IG9mIHBhcmFncmFwaHMgZm9yIHRoZSBjdXJyZW50IHNsaWRlLlxyXG5cdCAqIHRoaXMgaXMgdXBkYXRlZCBhZnRlciBhIG5ldyBwYXJhZ3JhcGggaXMgYWRkZWQgdG8gdGhlIGFycmF5LlxyXG5cdCovXHJcblx0cGFyYWdyYXBoc0Ftb3VudDogMCxcclxuXHQvLyBib29sIHNldCB0byBjaGVjayBpZiB0aGUgdGV4dCBvZiB0aGUgc2xpZGUgaGFzIGJlZW4gcHJvY2Vzc2VkIG9yIG5vdFxyXG5cdC8vIGp1c3QgYSBwcmVjYXV0aW9uIGJlZm9yZSBhbmltYXRpbmcsIHNjcm9sbGluZywgZXRjIHRvIHByZXZlbnQgZXJyb3JzLlxyXG5cdC8qIEJvb2xlYW4gdG8gY2hlY2sgaWYgdGhlIHRleHQgaXMgcHJvY2Vzc2VkIG9yIG5vdC5cclxuXHQgKiBXaGVuIHRoZSBzbGlkZXIgc3RhcnRzLCBhIG5ldyBzbGlkZSBjb21lcyBpbiBvciBhIG5ldyBncm91cCBpcyByZXF1ZXN0ZWRcclxuXHQgKiB3ZSBjYW4ndCB0cmlnZ2VyIHRoZSB0b3VjaCBldmVudHMgaWYgdGhlIHRleHQgaGFzbid0IGJlZW4gcHJvY2Vzc2VkIHlldC5cclxuXHQgKiBBbiBlcnJvciB3aWxsIGJlIHRocm93biBiZWNhdXNlIHRoZSB0ZXh0IGRhdGEgcGFyZ3JhcGhzIGFycmF5IGlzIGVtcHR5IGFuZFxyXG5cdCAqIHRoZSBkZWxheWVkIGNhbGwgZm9yIHN0YXJ0aW5nIGEgbmV3IHBhcmFncmFwaCBjYW4ndCBiZSBjcmVhdGVkLlxyXG5cdCAqIEJ5IGRlZmF1bHQgaXMgZmFsc2UsIHNldCB0byB0cnVlIGFmdGVyIHN0b3JpbmcgdGhlIGRhdGEgaW4gdGhlIHBhcmFncmFwaHMgYXJyYXlcclxuXHQgKiBhbmQgc2V0IHRvIGZhbHNlIG9uIGEgbmV3IGdyb3VwIG9yIG5ldyBzbGlkZS5cclxuXHQgKiBUaGlzIHdpbGwgYmUgc2V0IHRvIHRydWUgaW4gdGhlIFxyXG5cdCAqIGh0dHBzOi8vZ2l0bGFiLmNvbS9yaGVybmFuZG9nL2FpbnctcGl4aS1jb21wb25lbnQvaXNzdWVzLzUxXHJcblx0Ki9cclxuXHRpc0RhdGFTZXQ6IGZhbHNlLFxyXG5cdHNsaWRlTGFuZzogdW5kZWZpbmVkXHJcbn07XHJcblxyXG5cclxuLyogQ3VycmVudCBwYXJhZ3JhcGguXHRcclxuICogU3RyaW5nIGZvciB0aGUgY3VycmVudCBwYXJhZ3JhcGguIHRoaXMgaXMgdGhlbiBhZGRlZCB0byB0aGUgcGFyYWdyYXBoc1xyXG4gKiBhcnJheS5cclxuKi9cclxubGV0IF9jdXJycmVudFBhcmFncmFwaCA9IFwiXCI7XHJcbi8vIGluZGV4IG9mIHRoZSBjdXJyZW50IHBhcmFncmFwaC4gZGVmYXVsdCB0byAwIG9uIGEgbmV3IHNsaWRlLlxyXG5sZXQgX2N1cnJyZW50UGFyYWdyYXBoSW5kZXggPSAwO1xyXG4vKiBUaGUgYW1vdW50IG9mIHBhcmFncmFwaHMgaW4gdGhlIHRpdGxlIGRhdGEuXHJcbiAqIFRoaXMgaXMgdXNlZCB0byBjaGVjayBpZiB0aGUgdGl0bGUgdGV4dCBpcyBjb21wbGV0ZSwgb24gdGhlIGFkZCB3b3JkXHJcbiAqIG1ldGhvZC4gV2hlbiB3ZSByZWFjaGVkIHRoZSBsYXN0IHBhcmFncmFwaCBvZiB0aGUgdGl0bGUsIHdlIGFkZCBzb21lXHJcbiAqIGV4dHJhIHRpbWUgdG8gdGhlIGRlbGF5ZWQgY2FsbCBiZWZvcmUgc2hvd2luZyB0aGUgc3VidGl0bGUuXHJcbiovXHJcbmxldCBfdGl0bGVQYXJhZ3JhcGhzQW1vdW50ID0gMDtcclxuLyogQ3VycmVudCB3b3JkIGluZGV4Llx0XHJcbiAqIGluZGljYXRlcyB0aGUgaW5kZXggcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IHdvcmQgaW4gdGhlIHByb2Nlc3NlZCB0ZXh0XHJcbiAqIGFycmF5LiBUaGlzIGlzIHVwZGF0ZWQgYWZ0ZXIgdXBkYXRpbmcgdGhlIHJlbmRlcmVkIHRleHQuIElmIHRoZSB0ZXh0IGlzXHJcbiAqIG5vdCB1cGRhdGVkIHRoaXMgbnVtYmVyIHN0YXlzIFxyXG4qL1xyXG5sZXQgX2N1cnJlbnRXb3JkSW5kZXggPSAwO1xyXG4vKiBDdXJyZW50IGxpbmUgaW5kZXguXHRcclxuICogdGhlIGFtb3VudCBvZiBsaW5lcyBvZiB0aGUgY3VycmVudCBwYXJhZ3JhcGguXHJcbiAqIFN0YXJ0cyBhdCAxIGFuZCBjYW4ndCBiZSBtb3JlIHRoYW4gMy4gV2hlbiB0aGlzIGlzIDMgYW5kIHRoZSByZWZlcmVuY2VcclxuICogdGV4dCBpcyBkb3VibGUgbGluZSwgdGhlIGN1cnJlbnQgcGFyYWdyYXBoIGlzIHN0b3JlZCBpbiB0aGUgYXJyYXkgYW5kIFxyXG4gKiB0aGVuIGlzIHJlc2V0ZWQgdG8gYW4gZW1wdHkgc3RyaW5nLiBUaGVuIHRoaXMgaXMgc2V0IHRvIDEgYWdhaW4uXHJcbiovXHJcbmxldCBfY3VycmVudExpbmVOdW1iZXIgPSAxO1xyXG4vLyBib29sZWFuIHRvIGluZGljYXRlIGlmIHRoZSBzbGlkZSdzIHRleHQgaXMgY29tcGxldGVkIGluIG9yZGVyIHRvIGF2b2lkIGFkZGluZyB0aGVcclxuLy8gZmluYWwgd29yZCBvZiB0aGUgdGV4dCBvdmVyIGFnYWluXHJcbi8vIHRoaXMgaXMgcmVzZXQgaWYgdGhlIHNjcm9sbCBnb2VzIHRvIGEgcHJldmlvdXMgcGFyYWdyYXBoIGFuZCB3aGVuIGEgbmV3IHNsaWRlXHJcbi8vIGlzIHZpc2libGUuXHJcbmxldCBfaXNUZXh0Q29tcGxldGUgPSBmYWxzZTtcclxuLy8gdGltZXIgdG8gc2V0IHRoZSB0ZXh0IGNvbXBsZXRlIGJvb2wgYmFjayB0byBmYWxzZSBhbmQgY2FsbCB0aGUgZXZlbnQgZW1pdHRlclxyXG4vLyBmb3IgdGhlIGNvbXBsZXRlIHRleHQuIFRoaXMgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIHVzZXIgc2Nyb2xscyB0byB0aGUgXHJcbi8vIGZpbmFsIHBhcmFncmFwaC5cclxuZXhwb3J0IGxldCBfdGV4dENvbXBsZXRlVGltZXI7XHJcbi8qIEJvb2wgdG8gY2hlY2sgaWYgdGhlIHVzZXIgaXMgdG91Y2hpbmcgdGhlIHRleHQgZWxlbWVudC5cclxuICogVGhpcyBoZWxwcyB0byBwcmV2ZW50IHRoZSBkZWxheWVkIGNhbGwgZm9yIGEgbmV3IHBhcmFncmFwaCB0byBzdGFydCBpZiB0aGVcclxuICogdXNlciBpcyB0b3VjaGluZyB0aGUgdGV4dCBlbGVtZW50LiBJbiB0aGF0IGNhc2UgdGhlIHVzZXIgY291bGQgc2Nyb2xsIG1hbnVhbGx5XHJcbiAqIGJldHdlZW4gcGFyYWdyYXBocywgc28gdG8gcHJldmVudCBhIG5ldyBwYXJhZ3JhcGggdG8gYmUgYWRkZWQgYnkgdGhlIGFkZCB3b3JkXHJcbiAqIG1ldGhvZCwgdGhpcyBpcyBzZXQgdG8gdHJ1ZS4gV2hlbiB0aGUgdXNlciByZWxlYXNlcyB0aGUgdG91Y2ggZXZlbnQgdGhpcyBpc1xyXG4gKiBzZXQgdG8gZmFsc2UuXHJcbiovXHJcbmxldCBfaXNVc2VyVG91Y2hpbmcgPSBmYWxzZTtcclxuLy8gaW4gb3JkZXIgdG8gcHJldmVudCB3ZWlyZCBiYWNrZ3JvdW5kIGlzc3VlcyB3aGVuIHNjcm9sbGluZ1xyXG4vLyBhZnRlciBhIHNsaWRlIGNoYW5nZVxyXG5sZXQgX2FsbG93VXNlckV2ZW50cyA9IHRydWU7XHJcbi8vIHRoZSBvYmplY3QgZm9yIHRoZSB0aXRsZSB0ZXh0XHJcbmxldCBfdGl0bGVUZXh0T2JqZWN0O1xyXG4vLyB0aGUgb2JqZWN0IGZvciB0aGUgc3VidGl0bGUgdGV4dFxyXG5sZXQgX3N1YnRpdGxlVGV4dE9iamVjdDtcclxuLy8gaGFzIHN1YnRpdGxlIGJvb2xlYW4uIGRlZmF1bHRzIHRvIHVuZGVmaW5lZCBhdCBzdGFydHVwXHJcbmxldCBfaGFzU3VidGl0bGUgPSB1bmRlZmluZWQ7XHJcbi8vIGZhc3QgZm9yd2FyZCBvcHRpb24uIFRoaXMgYWxsb3dzIHRoZSB1c2VyIHRvIHNob3cgb25seSB0aGUgdGl0bGUgYW5kXHJcbi8vIG5vdCB0aGUgbWVzc2FnZSBvZiB0aGUgc2xpZGUgdGV4dFxyXG5sZXQgX2Zhc3RGb3J3YXJkID0gZmFsc2U7XHJcbi8vIHRoZSBkZWxheWVkIGNhbGwgaW5zdGFuY2UgdGltZXIgZm9yIHRoZSBhZGQgd29yZCBtZXRob2RcclxuZXhwb3J0IGxldCBfYWRkV29yZERlbGF5ZWRDYWxsO1xyXG5cclxuLyogVGV4dCBUbyBTcGVlY2ggQm9vbGVhbnMuXHJcbiAqIFRoZXNlIHZhcmlhYmxlcyBhcmUgdXNlZCB0byBpbmRpY2F0ZSBpZiB0aGUgdGV4dCB0byBzcGVlY2ggbWV0aG9kXHJcbiAqIHdhcyBjYWxsZWQgZm9yIGVpdGhlciB0aGUgdGl0bGUgb3IgdGhlIHN1YnRpdGxlLlxyXG4gKiBBZnRlciB0aGUgVFRTIGlzIGNhbGxlZCBmb3IgdGhlIHRpdGxlLCB0aGUgdHRzIGJvb2xlYW4gZm9yIHRoZSB0aXRsZVxyXG4gKiBpcyBzZXQgdG8gdHJ1ZS5cclxuICogQWxzbyBhZnRlciB0aGUgVFRTIGlzIGNhbGxlZCBmb3IgdGhlIHN1YnRpdGxlIHRoZSBib29sZWFuIGlzIHNldCB0byB0cnVlXHJcbiAqIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlIFRUUyBtZXRob2QgdG8gYmUgY2FsbGVkIG1vcmUgdGhhbiBvbmUsIHdoZW5cclxuICogdXNlZCBpbiB0aGUgdHlwZSBlZmZlY3QgKGFkZCB3b3JkIG1ldGhvZCkgYW5kIHRoZSBzY3JvbGwgbWV0aG9kLlxyXG4qL1xyXG5leHBvcnQgbGV0IF90dHNUaXRsZVN0YXJ0ZWQgPSBmYWxzZTtcclxuZXhwb3J0IGxldCBfdHRzU3VidGl0bGVTdGFydGVkID0gZmFsc2U7XHJcblxyXG4vKiogTWV0aG9kIHRvIHNldCB0aGUgZmFzdCBmb3J3YXJkIHZhbHVlLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHYgdGhlIHZhbHVlIG9mIHRoZSBmYXN0IGZvcndhcmQgb3B0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfc2V0RmFzdEZvcndhcmQgPSB2ID0+IHtcclxuXHRfZmFzdEZvcndhcmQgPSB2O1xyXG59O1xyXG5cclxuLyoqIE1ldGhvZCB0byByZXNldCB0aGUgdGV4dCBkYXRhIG9iamVjdC5cdFxyXG4gKiBTZXRzIHRoZSB0ZXh0IGRhdGEgb2JqZWN0IHZhbHVlcyB0byB0aGUgc3RhcnR1cCBkZWZhdWx0IHZhbHVlcy5cclxuICogVGhpcyBpcyBjYWxsZWQgZXZlcnl0aW1lIGEgbmV3IHNsaWRlIGlzIGxvYWRlZC5cclxuICogQHBhcmFtIHtib29sZWFufSBzIHRoaXMgcGFyYW0gaXMgcGFzc2VkIHdoZW4gdGhlIG1ldGhvZCBpcyBjYWxsZWQgZnJvbSBcclxuICogXHRcdFx0XHR0aGUgaW50ZXJhY3Rpb24gbW9kdWxlIGluc3RlYWQgb2YgdGhlIHRleHQgbW9kdWxlIGluIG9yZGVyIHRvXHJcbiAqIFx0XHRcdFx0cmVzZXQgdGhlIHVzZXIgdG91Y2hpbmcgYm9vbGVhbiBhcyB3ZWxsXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfcmVzZXRUZXh0RGF0YSA9IHMgPT4ge1xyXG5cdC8vIGlmIHRoaXMgaXMgY2FsbGVkIGZyb20gdGhlIGludGVyYWN0aW9uIG1vZHVsZVxyXG5cdGlmICggcyApIHtcclxuXHRcdF9pc1VzZXJUb3VjaGluZyA9IGZhbHNlO1xyXG5cdFx0X2FsbG93VXNlckV2ZW50cyA9IGZhbHNlO1xyXG5cdH07XHJcblx0X3RleHREYXRhLnBBcnJheXMgPSBbXTtcclxuXHRfdGV4dERhdGEucFN0cmluZ3MgPSBbXTtcclxuXHRfdGV4dERhdGEucGFyYWdyYXBoc0luZGV4ID0gW107XHJcblx0X3RleHREYXRhLnBhcmFncmFwaHNBbW91bnQgPSAwO1xyXG5cdF90ZXh0RGF0YS5pc0RhdGFTZXQgPSBmYWxzZTtcclxuXHRfdGV4dERhdGEuc2xpZGVMYW5nID0gdW5kZWZpbmVkO1xyXG5cclxuXHQvLyBfY3VycmVudFdvcmQgPSAwO1xyXG5cdF9yZWZlcmVuY2VUZXh0ID0gXCJcIjtcclxuXHRfZGlzcGxheVRleHQgPSBcIlwiO1xyXG5cdF9jdXJycmVudFBhcmFncmFwaCA9IFwiXCI7XHJcblx0X2N1cnJyZW50UGFyYWdyYXBoSW5kZXggPSAwO1xyXG5cdF9jdXJyZW50V29yZEluZGV4ID0gMDtcclxuXHRfY3VycmVudExpbmVOdW1iZXIgPSAxO1xyXG5cdF9yZWZUZXh0LnRleHQgPSBcIlwiO1xyXG5cdF90aXRsZS50ZXh0ID0gXCJcIjtcclxuXHRfaXNUZXh0Q29tcGxldGUgPSBmYWxzZTtcclxuXHRfdGV4dEJhY2tncm91bmRHcmFwaC5jbGVhcigpO1xyXG5cdF90aXRsZVBhcmFncmFwaHNBbW91bnQgPSAwO1xyXG5cclxuXHQvLyBtYWtlIHRoZSB0ZXh0IHN0YWdlIHZpc2libGUgYWdhaW5cclxuXHRfdGV4dFN0YWdlLmFscGhhID0gMTtcclxuXHJcblx0Ly8gcmVzZXQgdGhlIFRUUyBib29sZWFuc1xyXG5cdF90dHNUaXRsZVN0YXJ0ZWQgPSBmYWxzZTtcclxuXHRfdHRzU3VidGl0bGVTdGFydGVkID0gZmFsc2U7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKlx0TWV0aG9kIHRvIGNyZWF0ZSB0aGUgd29yZHMgYXJyYXkuXHRcclxuICogQHBhcmFtIHtzdHJpbmd9IHR4dCB0aGUgc3RyaW5nIHRleHQgdG8gYmUgc3BsaXR0ZWQgaW4gd29yZHNcclxuICogQHBhcmFtIHtib29sZWFufSBpc0NoaW5lc2UgaWYgdGhlIHRleHQgaXMgY2hpbmVzZSBvciBub3RcclxuICogQHJldHVybnMge29iamVjdH0gdGV4dCBvYmplY3RcclxuICogQHByaXZhdGVcclxuKi9cclxuY29uc3QgX3Byb2Nlc3NUZXh0ID0gKHR4dCkgPT4ge1xyXG5cdGNvbnN0IF9pc0NoaW5lc2UgPSB0eHQubWF0Y2goL1tcXHUzNDAwLVxcdTlGQkZdLyk7XHJcblx0bGV0IF90ZXh0T2JqID0ge307XHJcblx0aWYgKF9pc0NoaW5lc2UpIHtcclxuXHRcdF90ZXh0T2JqLndvcmRzID0gdHh0LnNwbGl0KCcnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly9SZW1vdmUgbGluZSBicmVha3MgZnJvbSB0ZXh0XHJcblx0XHRsZXQgY2xlYW5UZXh0ID0gdHh0LnJlcGxhY2UoLyg/OlxcclxcbnxcXHJ8XFxuKS9nLCAnICcpO1xyXG5cdFx0X3RleHRPYmouY2xlYW5UZXh0ID0gY2xlYW5UZXh0LnJlcGxhY2UoLyg8fCZsdDspYnJcXHMqXFwvKig+fCZndDspL2csICcgJyk7XHJcblx0XHRfdGV4dE9iai5jbGVhblRleHQgPSBjbGVhblRleHQucmVwbGFjZSgvJmFwb3M7L2csIFwiJ1wiKTtcclxuXHRcdC8vY3JlYXRlIHdvcmRzIGFycmF5XHJcblx0XHRfdGV4dE9iai53b3JkcyA9IF90ZXh0T2JqLmNsZWFuVGV4dC5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGxldCBfbmV3V29yZHMgPSBbXTtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IF90ZXh0T2JqLndvcmRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChfdGV4dE9iai53b3Jkc1tpXS5sZW5ndGggIT09IDApIHtcclxuXHRcdFx0XHRfbmV3V29yZHMucHVzaCgoXCIgXCIpLmNvbmNhdChfdGV4dE9iai53b3Jkc1tpXSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9IC8vIGxvb3AgZW5kXHJcblx0XHRfdGV4dE9iai53b3JkcyA9IF9uZXdXb3JkcztcclxuXHJcblx0XHRfdGV4dE9iai53b3Jkcy5zcGxpY2UoMCwgMSwgX3RleHRPYmoud29yZHNbMF0udHJpbSgpKTtcclxuXHR9IC8vIGNoaW5lc2UgY29uZGl0aW9uYWxcclxuXHRfdGV4dE9iai5sZW5ndGggPSBfdGV4dE9iai53b3Jkcy5sZW5ndGg7XHJcblx0Ly8gcmV0dXJuIHRoZSB0ZXh0IG9iamVjdFxyXG5cdHJldHVybiBfdGV4dE9iajtcclxufTtcclxuXHJcbi8qKiBNZXRob2QgdG8gY3JlYXRlIHRoZSB0ZXh0IG9iamVjdHMuXHJcbiAqIEZvciBlYWNoIG5ldyBzbGlkZSB3ZSB1c2UgdGhpcyB0byBjcmVhdGUgdGhlIHRleHQgb2JqZWN0c1xyXG4gKiBhbmQgY2hlY2sgaWYgdGhlIHRleHQgaXMgY2hpbmVzZS5cclxuICogQHByaXZhdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9wcm9jZXNzU2xpZGVUZXh0ID0gKCkgPT4ge1xyXG5cdGNvbnN0IHsgc2xpZGVUaXRsZSwgc2xpZGVNc2cgfSA9IF9zbGlkZXNEYXRhW19jdXJyZW50U2xpZGVJbmRleF07XHJcblx0X3RpdGxlVGV4dE9iamVjdCA9IF9wcm9jZXNzVGV4dChzbGlkZVRpdGxlKTtcclxuXHRfc3VidGl0bGVUZXh0T2JqZWN0ID0gc2xpZGVNc2cgJiYgc2xpZGVNc2cgIT09IFwiXCIgPyBfcHJvY2Vzc1RleHQoc2xpZGVNc2cpIDogdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gY3JlYXRlIHRoZSB0ZXh0IGZvciB0aGUgbmV3IHNsaWRlLlxyXG4gKiBUaGlzIHdpbGwgYmUgdXNlZCB3aGVuIGEgbmV3IHNsaWRlIGlzIGFuaW1hdGVkIGluIGJ5IHRoZSB1c2VyXHJcbiAqIG9yIGF1dG9tYXRpY2FsbHkuXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfY3JlYXRlTmV3U2xpZGVUZXh0ID0gKCkgPT4ge1xyXG5cdC8vIHN0b3AgYWxsIGRlbGF5ZWQgY2FsbHMuXHJcblx0X3BhckdhcCA/IF9wYXJHYXAucGF1c2UoKS5raWxsKCkgOiBudWxsO1xyXG5cdF9hZGRXb3JkRGVsYXllZENhbGwgPyBfYWRkV29yZERlbGF5ZWRDYWxsLnBhdXNlKCkua2lsbCgpIDogbnVsbDtcclxuXHRfdGV4dENvbXBsZXRlVGltZXIgPyBfdGV4dENvbXBsZXRlVGltZXIucGF1c2UoKS5raWxsKCkgOiBudWxsO1xyXG5cdC8vIHByZXZlbnQgdGhlIGluc3RhbmNlIGZyb20gYmVpbmcgcmVzdGFydGVkXHJcblx0X2FkZFdvcmREZWxheWVkQ2FsbCA9IHVuZGVmaW5lZDtcclxuXHRfdGV4dENvbXBsZXRlVGltZXIgPSB1bmRlZmluZWQ7XHJcblx0Ly8gY3JlYXRlIHRoZSB0ZXh0IGRhdGEgZm9yIHRoZSBuZXcgc2xpZGVcclxuXHRfY3JlYXRlU2xpZGVUZXh0KF90aXRsZVRleHRPYmplY3QsIF9zdWJ0aXRsZVRleHRPYmplY3QpO1xyXG5cdC8vIGZpbmFsbHkgcmVzdGFydCB0aGUgYWRkIHdvcmQgZGVsYXllZCBjYWxsXHJcblx0X2FkZFdvcmREZWxheWVkQ2FsbCA9IFR3ZWVuTGl0ZS5kZWxheWVkQ2FsbChfd29yZFNwZWVkLCBfYWRkV29yZCk7XHJcblx0Ly8gc2V0IHRoZSBkYXRhc2V0IGFuZCB1c2VyIGludGVyYWN0aW9ucyBib29sZWFuc1xyXG5cdF90ZXh0RGF0YS5pc0RhdGFTZXQgPSB0cnVlO1xyXG5cdF9hbGxvd1VzZXJFdmVudHMgPSB0cnVlO1xyXG5cdC8vIGNvbnNvbGUubG9nKCBfc2xpZGVzRGF0YVtfY3VycmVudFNsaWRlSW5kZXhdICk7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gY3JlYXRlIHRoZSB0ZXh0IGJhY2tncnVvbmQgZ3JhcGhpY1xyXG4vLyB3aGVuIGFkZGluZyB3b3JkcyB0byB0aGUgdGV4dCBlbGVtZW50IFxyXG5leHBvcnQgY29uc3QgX3RleHRCYWNrZ3JvdW5kR3JhcGggPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG5cclxuLy8gY3JlYXRlIHRoZSB0ZXh0IGVsZW1lbnRcclxuZXhwb3J0IGNvbnN0IF90aXRsZSA9IG5ldyBQSVhJLlRleHQoXCJcIiwgX3RleHRTdHlsZSk7XHJcblxyXG5cclxuLyogUkVGRVJFTkNFIFRFWFQgRUxFTUVOVCAqL1xyXG4vKiBUaGlzIGlzIHVzZWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgdGV4dC5cclxuICogV2hlbiBhZGRpbmcgd29yZHMgd2UgY2hlY2sgdGhpcyBjb21wb25lbnQgZm9yIHdpZHRoIGluIG9yZGVyIHRvIHNldCB0aGUgd2lkdGhcclxuICogb2YgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgZWFjaCBsaW5lLiBBbHNvIGNoZWNrIGl0J3MgaGVpZ2h0IGFuZCB3aGVuIGEgbmV3IFxyXG4gKiBsaW5lIGlzIG5lZWRlZCBpbiBvcmRlciB0byBhZGQgYSBuZXcgYmFja2dyb3VuZCByZWN0IGluIHRoZSBiYWNrZ3JvdW5kIGdyYXBoaWNcclxuICogZWxlbWVudC5cclxuICogVGhpcyBlbGVtZW50IGlzIG5ldmVyIHJlbmRlcmVkIGluIHRoZSBzY3JlZW4uXHJcbiovXHJcbi8vIHBpeGkgdGV4dCBpbnN0YW5jZVxyXG5jb25zdCBfcmVmVGV4dCA9IG5ldyBQSVhJLlRleHQoKTtcclxuLy8gc2V0IHRoZSBzdHlsZVxyXG5fcmVmVGV4dC5zdHlsZSA9IF90ZXh0U3R5bGU7XHJcbi8vIGluaXRpYWwgdGV4dFxyXG5fcmVmVGV4dC50ZXh0ID0gXCJcIjtcclxuXHJcblxyXG4vKiogTWV0aG9kIHRvIGdldCB0aGUgd2lkdGggb2YgdGhlIHJlZmVyZW5jZSB0ZXh0IGVsZW1lbnQuXHRcclxuICogQHJldHVybiB7bnVtYmVyfSByZWZlcmVuY2UgdGV4dCBlbGVtZW50IHdpZHRoXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmNvbnN0IF9nZXRSZWZXaWR0aCA9ICgpID0+IF9yZWZUZXh0LndpZHRoO1xyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gY2hlY2sgdGhlIGhlaWdodCBvZiB0aGUgcmVmZXJlbmNlIHRleHQgZWxlbWVudC5cdFxyXG4gKiBBZnRlciB1cGRhdGluZyB0aGUgdGV4dCBzdHJpbmcgb24gdGhlIHJlZmVyZW5jZSB0ZXh0IGVsZW1lbnQsIGNoZWNrIGl0J3NcclxuICogaGVpZ2h0LiBJZiB0aGUgaGVpZ2h0IG1hdGNoZXMgd2l0aCB0aGUgY3VycmVudCBsaW5lIGdldCB0aGUgd2lkdGggYW5kXHJcbiAqIHN0b3JlIHRoYXQgbnVtYmVyIGFuZCB0aGUgd29yZCBpbiB0aGUgcGFyYWdyYXBoIGFycmF5LlxyXG4gKiBJZiB0aGUgaGVpZ2h0IGluZGljYXRlcyB0aGF0IGEgbmV3IGxpbmUgaXMgZm9yY2VkIGFuZCB0aGUgY3VycmVudCBsaW5lXHJcbiAqIGlzIGxlc3MgdGhhbiAzLCByZXNldCB0aGUgcmVmZXJlbmNlIHRleHQgc3RyaW5nIChpdCBzaG91bGQgYWx3YXlzIGJlIGFcclxuICogc2luZ2xlIGxpbmUpLCBhZGQgdGhlIG5ldyB3b3JkLCBnZXQgdGhlIHdpZHRoIGFuZCBzdG9yZSB0aGUgdmFsdWUgYW5kXHJcbiAqIHRoZSB3b3JkIGluIHRoZSBhcnJheS5cclxuICogSWYgYSBuZXcgbGluZSBpcyBjcmVhdGVkIGFuZCB0aGUgY3VycmVudCBsaW5lIGlzIDMsIGNyZWF0ZSBhIG5ldyBhcnJheVxyXG4gKiBmb3IgYSBuZXcgcGFyYWdyYXBoLCByZXNldCB0aGUgcmVmZXJlbmNlIHRleHQgc3RyaW5nLCBhZGQgdGhlIG5ldyB3b3JkLFxyXG4gKiBnZXQgdGhlIHdpZHRoIGFuZCB0aGVuIHN0b3JlIHRoZSB2YWx1ZSBhbmQgdGhlIHdvcmQgaW4gdGhlIG5ldyBwYXJhZ3JhcGhcclxuICogYXJyYXkuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB3b3JkIHRoZSB3b3JkIGJlaW5nIGFkZGVkIHRvIHRoZSByZWZlcmVuY2UgdGV4dFxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5jb25zdCBfY2hlY2tSZWZIZWlnaHQgPSAod29yZCwgaW5kZXgpID0+IHtcclxuXHQvLyBnZXQgdGhlIGRhdGEgZnJvbSB0aGUgdGV4dHQgZGF0YSBvYmplY3RcclxuXHRjb25zdCB7IHBBcnJheXMsIHBTdHJpbmdzLCBwYXJhZ3JhcGhzQW1vdW50LCBwYXJhZ3JhcGhzSW5kZXggfSA9IF90ZXh0RGF0YTtcclxuXHQvLyBhZGQgdGhlIHdvcmQgdG8gdGhlIHJlZmVyZW5jZSBzdHJpbmdcclxuXHRfcmVmZXJlbmNlVGV4dCA9IF9yZWZlcmVuY2VUZXh0LmNvbmNhdCh3b3JkKTtcclxuXHQvLyBzZXQgdGhlIHRleHQgb2YgdGhlIHJlZmVyZW5jZSBlbGVtZW50XHJcblx0X3JlZlRleHQudGV4dCA9IF9yZWZlcmVuY2VUZXh0O1xyXG5cdC8vIG5vdyBnZXQgdGhlIG5ldyBoZWlnaHQgb2YgdGhlIHJlZmVyZW5jZSBlbGVtZW50IGFuZCB0aGVuXHJcblx0Ly8gcHJvY2VlZCB3aXRoIHRoZSBwYXJhZ3JhcGhzLlxyXG5cdGNvbnN0IF9jdXJySGVpZ2h0ID0gX3JlZlRleHQuaGVpZ2h0O1xyXG5cdC8vIGhlaWdodCBpcyBsZXNzIHRoYW4gc2luZ2xlIGxpbmVcclxuXHRpZiAoX2N1cnJIZWlnaHQgPD0gX3RleHRMaW5lSGVpZ2h0KSB7XHJcblx0XHQvKiBhZGQgYSBuZXcgd29yZCB0byB0aGUgY3VycmVudCBwYXJhZ3JhcGggaW4gdGhlIHBhcmFncmFwaHMgYXJyYXlcclxuXHRcdCAqIHRoZSBjdXJyZW50IHBhcmFncmFwaCBpcyBnaXZlbiBieSB0aGUgcGFyZ3JhcGhzIGFtb3VudCBpbmRleFxyXG5cdFx0ICogaW4gdGhlIHRleHQgZGF0YSBvYmplY3RcclxuXHRcdCovXHJcblx0XHRwQXJyYXlzW3BhcmFncmFwaHNBbW91bnRdLnB1c2goeyB3b3JkLCB3aWR0aDogX2dldFJlZldpZHRoKCksIGxpbmU6IF9jdXJyZW50TGluZU51bWJlciB9KTtcclxuXHRcdC8vIGFkZCB0aGUgd29yZCB0byB0aGUgY3VycmVudCBwYXJhZ3JhcGggc3RyaW5nXHJcblx0XHRfY3VycnJlbnRQYXJhZ3JhcGggPSBfY3VycnJlbnRQYXJhZ3JhcGguY29uY2F0KHdvcmQpO1xyXG5cclxuXHR9IGVsc2UgaWYgKF9jdXJySGVpZ2h0ID4gX3RleHRMaW5lSGVpZ2h0ICYmIF9jdXJyZW50TGluZU51bWJlciA8IDMpIHtcclxuXHRcdC8qIHRoZSBoZWlnaHQgaXMgbW9yZSB0aGFuIGEgc2luZ2xlIGxpbmUuXHJcblx0XHQgKiB0aGUgY3VycmVudCBwYXJhZ3JhcGggaGFzIGxlc3MgdGhhbiAzIGxpbmVzXHJcblx0XHQgKiBpbmNyZWFzZSB0aGUgY3VycmVudCBsaW5lIG51bWJlciwgcmVzZXQgdGhlIHJlZmVyZW5jZSBzdHJpbmdcclxuXHRcdCAqIGFkZCB0aGUgd29yZCBhbmQgY2hlY2sgdGhlIHdpZHRoLlxyXG5cdFx0Ki9cclxuXHRcdF9jdXJyZW50TGluZU51bWJlcisrO1xyXG5cdFx0Ly8gc2V0IHRoZSByZWYgc3RyaW5nIHRvIGp1c3QgdGhlIG5ldyB3b3JkXHJcblx0XHRfcmVmZXJlbmNlVGV4dCA9IFwiXCIgKyB3b3JkLnRyaW0oKTtcclxuXHRcdC8vIHNpbmNlIHRoZSByZWYgc3RyaW5nIGlzIGNsZWFyZWQgYW5kIGhhcyBqdXN0IHRoZSBuZXcgd29yZFxyXG5cdFx0Ly8gc2V0IHRoZSByZWYgZWxlbWVudCdzIHRleHQgdG8gdGhlIHJlZiBzdHJpbmdcclxuXHRcdF9yZWZUZXh0LnRleHQgPSBfcmVmZXJlbmNlVGV4dDtcclxuXHRcdC8vIGFkZCB0aGUgbmV3IHdvcmQgdG8gdGhlIGN1cnJlbnQgcGFyYWdyYXBoIGFycmF5XHJcblx0XHRwQXJyYXlzW3BhcmFncmFwaHNBbW91bnRdLnB1c2goe1xyXG5cdFx0XHR3b3JkOiB3b3JkLCB3aWR0aDogX2dldFJlZldpZHRoKCksIGxpbmU6IF9jdXJyZW50TGluZU51bWJlclxyXG5cdFx0fSk7XHJcblx0XHQvLyBhZGQgdGhlIHdvcmQgdG8gdGhlIGN1cnJlbnQgcGFyYWdyYXBoIHN0cmluZ1xyXG5cdFx0X2N1cnJyZW50UGFyYWdyYXBoID0gX2N1cnJyZW50UGFyYWdyYXBoLmNvbmNhdCh3b3JkKTtcclxuXHJcblx0fSBlbHNlIGlmIChfY3VyckhlaWdodCA+IF90ZXh0TGluZUhlaWdodCAmJiBfY3VycmVudExpbmVOdW1iZXIgPT09IDMpIHtcclxuXHRcdC8qIFRoZSBjdXJyZW50IHBhcmFncmFwaCBoYXMgMyBsaW5lcywgd2UgY3JlYXRlIGEgbmV3IHBhcmFncmFwaC5cclxuXHRcdCAqIFN0b3JlIHRoZSBjdXJyZW50IHBhcmFncmFwaCBzdHJpbmcgb24gdGhlIHN0cmluZ3MgYXJyYXkuXHJcblx0XHQgKiBSZXNldCB0aGUgbGluZSBudW1iZXIgdG8gMVxyXG5cdFx0ICogUmVzZXQgdGhlIHJlZmVyZW5jZSB0ZXh0IHRvIHRoZSBjdXJyZW50IHdvcmQuXHJcblx0XHQgKiBBZGQgYSBuZXcgcGFyYWdyYXBoIGFycmF5IHRvIHRoZSBwYXJhZ3JhcGhzIGFycmF5LlxyXG5cdFx0ICogSW5jcmVhc2UgdGhlIHBhcmFncmFwaHMgYW1vdW50LlxyXG5cdFx0Ki9cclxuXHRcdHBTdHJpbmdzLnB1c2goX2N1cnJyZW50UGFyYWdyYXBoKTtcclxuXHRcdC8vIHJlc2V0IHRoZSBjdXJyZW50IHBhcmFncmFwaCBzdHJpbmdcclxuXHRcdF9jdXJyZW50TGluZU51bWJlciA9IDE7XHJcblx0XHRfY3VycnJlbnRQYXJhZ3JhcGggPSBfcmVmZXJlbmNlVGV4dCA9IFwiXCIgKyB3b3JkLnRyaW0oKTtcclxuXHRcdC8qIFN0b3JlIHRoZSBmaW5hbCB3b3JkIGluZGV4IGZvciB0aGUgY3VycmVudCBwYXJhZ3JhcGggYW5kXHJcblx0XHQgKiB0aGUgZmlyc3Qgd29yZCBpbmRleCBmb3IgdGhlIG5leHQgYXJyYXkuIFRoaXMgd2lsbCBiZSB1c2VkXHJcblx0XHQgKiBpbiB0aGUgcmVzaXplIGV2ZW50IHRvIGRpc3BsYXkgdGhlIHNhbWUgcGFyYWdyYXBoIGFmdGVyIGFuXHJcblx0XHQgKiBvcmllbnRhdGlvbiBjaGFuZ2UuXHJcblx0XHQqL1xyXG5cdFx0Ly8gYWRkIHRoZSBmaW5hbCB3b3JkIGluZGV4IHRvIHRoZSBjdXJyZW50IHBhcmFncmFwaCBhcnJheVxyXG5cdFx0cGFyYWdyYXBoc0luZGV4W3BhcmFncmFwaHNBbW91bnRdLnB1c2goaW5kZXgpO1xyXG5cdFx0Ly8gYWRkIGEgbmV3IGFycmF5IHdpdGggdGhlIGZpcnN0IHdvcmQgaW5kZXhcclxuXHRcdHBhcmFncmFwaHNJbmRleC5wdXNoKFtpbmRleCArIDFdKTtcclxuXHRcdC8vIHNpbmNlIHRoZSByZWYgc3RyaW5nIGlzIGNsZWFyZWQgYW5kIGhhcyBqdXN0IHRoZSBuZXcgd29yZFxyXG5cdFx0Ly8gc2V0IHRoZSByZWYgZWxlbWVudCdzIHRleHQgdG8gdGhlIHJlZiBzdHJpbmdcclxuXHRcdF9yZWZUZXh0LnRleHQgPSBfcmVmZXJlbmNlVGV4dDtcclxuXHRcdHBBcnJheXMucHVzaChbeyB3b3JkOiB3b3JkLnRyaW0oKSwgd2lkdGg6IF9nZXRSZWZXaWR0aCgpLCBsaW5lOiBfY3VycmVudExpbmVOdW1iZXIgfV0pO1xyXG5cdFx0X3RleHREYXRhLnBhcmFncmFwaHNBbW91bnQrKztcclxuXHR9XHJcblxyXG59O1xyXG5cclxuXHJcbi8qKlx0TWV0aG9kIHRvIHNldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgdGV4dCBjb21wb25lbnQuXHRcclxuICogVXNlcyB0aGUgc2NyZWVuIHNpemUgYXMgcmVmZXJlbmNlIGZvciBzZXR0aW5nIHRoZSBzaXplIGFuZCBwb3NpdGlvbiBvZlxyXG4gKiB0aGUgdGV4dCBjb21wb25lbnQgYXMgd2VsbCBhcyB0aGUgZm9udCBzaXplIGFuZCBhbGwgZGltZW5zaW9uIHJlbGF0ZWRcclxuICogcHJvcGVydGllcyAoZm9udCBzaXplLCBsaW5lIGhlaWdodCwgZXRjLikuXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfc2V0VGV4dERpbWVuc2lvbnMgPSAoKSA9PiB7XHJcblx0Ly8gc2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgdGV4dCBlbGVtZW50XHJcblx0X3RpdGxlLnBvc2l0aW9uLnNldCh3aW5TaXplLncgKiAuMTgsIHdpblNpemUuaCAtIF90ZXh0VmVydGljYWxQb3MpO1xyXG5cdC8vIHJlc2V0IHRoZSBzdHlsZXNcclxuXHRfdGV4dFN0eWxlID0ge1xyXG5cdFx0Li4uX3RleHRTdHlsZSxcclxuXHRcdHdvcmRXcmFwV2lkdGg6IHdpblNpemUudyAqIC42NCxcclxuXHRcdGZvbnRTaXplOiBfZm9udFNpemVzW19jdXJyZW50SGVpZ2h0XSxcclxuXHRcdGxpbmVIZWlnaHQ6IF9saW5lSGVpZ2h0c1tfY3VycmVudEhlaWdodF1cclxuXHR9O1xyXG5cdC8vIGFmdGVyIHJlc2V0aW5nIHRoZSB0ZXh0IHN0eWxlIGFwcGx5IGl0IHRvIHRoZSB0ZXh0IGVsZW1lbmV0XHJcblx0X3RpdGxlLnN0eWxlID0gX3RleHRTdHlsZTtcclxuXHQvLyBzZXQgdGhlIHN0eWxlcyBmb3IgdGhlIHJlZmVyZW5jZVxyXG5cdF9yZWZUZXh0LnN0eWxlID0gX3RleHRTdHlsZTtcclxufTtcclxuXHJcblxyXG4vKiogTWV0aG9kIHRvIGNyZWF0ZSBQYXJhZ3JhcGhzLlx0XHJcbiAqIFN0YXJ0IHdpdGggdGhlIHRpdGxlIHdvcmRzIGFycmF5IGFuZCB0aGVuIHdpdGggdGhlIHN1YnRpdGxlIHdvcmRzIGFycmF5LlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcFRleHQgdGhlIHByb2Nlc3NlZCB0ZXh0IG9iamVjdFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3VidCBpZiB0aGUgdGV4dCBiZWluZyBwcm9jZXNzZWQgaXMgdGhlIHN1YnRpdGxlXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmNvbnN0IF9jcmVhdGVQYXJhZ3JhcGhzID0gKCBwVGV4dCwgaXNTdWJ0ICkgPT4ge1xyXG5cdGNvbnN0IHsgcEFycmF5cywgcGFyYWdyYXBoc0Ftb3VudCwgcGFyYWdyYXBoc0luZGV4LCBwU3RyaW5ncyB9ID0gX3RleHREYXRhO1xyXG5cdC8vIGlmIHRoZSBwYXJhbSBpcyB1bmRlZmluZWQoIG5vIHN1YnRpdGxlKSBsZWF2ZSB0aGUgbWV0aG9kXHJcblx0aWYgKCFwVGV4dCkgeyBjb25zb2xlLmxvZyggXCJubyBzdWJ0aXRsZSEhXCIgKTsgcmV0dXJuOyB9XHJcblx0Ly8gYWRkIGEgbmV3IGFycmF5IHRvIHRoZSBwYXJhZ3JhcGhzIGFycmF5XHJcblx0Ly8gaW4gdGhpcyBhcnJheSB0aGUgY29kZSBhZGRzIHRoZSB3b3JkcyBmb3IgdGhlIGZpcnN0IHBhcmFncmFwaCBvZiBlYWNoXHJcblx0Ly8gdGV4dCBlbGVtZW50ICh0aXRsZSAvIHN1YnRpdGxlKVxyXG5cdHBBcnJheXMucHVzaChbXSk7XHJcblx0cGFyYWdyYXBoc0luZGV4LnB1c2goWzBdKTtcclxuXHQvLyBiZWZvcmUgYWRkaW5nIHRoZSBuZXh0IHdvcmQsIGNsZWFyIHRoZSByZWZlcmVuY2UgdGV4dCBlbGVtZW50IGFuZCBzdHJpbmdzXHJcblx0Ly8gdG8gcHJldmVudCB0aGUgc3VidGl0bGUgZnJvbSBzdGFydGluZyBhdCB0aGUgd3JvbmcgbGluZSBhbmQgd2l0aCBhbiBhbHRlcmVkXHJcblx0Ly8gd2lkdGguXHJcblx0X3JlZlRleHQudGV4dCA9IF9yZWZlcmVuY2VUZXh0ID0gXCJcIjtcclxuXHQvLyBhbHNvIHJlc2V0IHRoZSBjdXJyZW50IGxpbmUgbnVtYmVyIGJlY2F1c2UgdGhlIG5ldyBwYXJhZ3JhcGggc2hvdWxkIHN0YXJ0XHJcblx0Ly8gYXQgdGhlIGZpcnN0IGxpbmVcclxuXHRfY3VycmVudExpbmVOdW1iZXIgPSAxO1xyXG5cdC8vIGdldCB0aGUgd29yZHMgYXJyYXkgZnJvbSB0aGUgdGV4dCBvYmplY3RcclxuXHQvLyBsb29wIHRocm91Z2ggdGhlIGFycmF5IGFuZCBhZGQgYSB3b3JkIHRvIHRoZSByZWZlcmVuY2UgdGV4dFxyXG5cdHBUZXh0LmZvckVhY2goKHdvcmQsIGkpID0+IHtcclxuXHRcdC8vIGFkZCB0aGUgd29yZCBhbmQgY2hlY2sgdGhlIGhlaWdodCBvZiB0aGUgcmVmZXJlbmNlIHRleHQgZWxlbWVudFxyXG5cdFx0X2NoZWNrUmVmSGVpZ2h0KHdvcmQsIGkpO1xyXG5cdH0pOyAvLyB3b3JkcyBsb29wXHJcblx0LyogSWYgdGhpcyBpcyB0aGUgdGl0bGUgYW5kIHRoZSBzbGlkZSBoYXMgbm8gc3VidGl0bGUsIHRoZW4gY2hlY2sgdGhlXHJcblx0ICogaGVpZ2h0IGFuZCBhZGQgdGhlIHVwIGFycm93IHN5bWJvbCB0byB0aGUgbGFzdCBwYXJhZ3JhcGggYW5kIGNoZWNrXHJcblx0ICogaWYgYSBuZXcgcGFyYWdyYXBoIGhhcyB0byBiZSBjcmVhdGVkIHRvIG1ha2UgaXQgZml0LlxyXG5cdCovXHJcblx0aWYgKCAhaXNTdWJ0ICYmICFfaGFzU3VidGl0bGUgKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZyggX3RleHREYXRhICk7XHJcblx0XHQvLyBjb25zb2xlLmxvZyggYC0tLS0tLS0tLVxcbkxhc3QgSW5kZXggPT4gJHtwQXJyYXlzW3BhcmFncmFwaHNBbW91bnRdLmxlbmd0aH1gKTtcclxuXHRcdF9jaGVja1JlZkhlaWdodCggXCIg4oaRXCIsIHBBcnJheXNbcGFyYWdyYXBoc0Ftb3VudF0ubGVuZ3RoICk7XHJcblx0fVxyXG5cdC8vIElmIHRoaXMgaXMgdGhlIHN1YnRpdGxlIGRvIHRoZSBzYW1lIG9mIHRoZSBwcmV2aW91cyBjb25kaXRpb25hbCBibG9ja1xyXG5cdGlmICggaXNTdWJ0ICkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coIF90ZXh0RGF0YSApO1xyXG5cdFx0Ly8gY29uc29sZS5sb2coIGAtLS0tLS0tLS1cXG5MYXN0IEluZGV4ID0+ICR7cEFycmF5c1twYXJhZ3JhcGhzQW1vdW50XS5sZW5ndGh9YCk7XHJcblx0XHRfY2hlY2tSZWZIZWlnaHQoIFwiIOKGkVwiLCBwQXJyYXlzW3BhcmFncmFwaHNBbW91bnRdLmxlbmd0aCApO1xyXG5cdH1cclxuXHQvKiBBZGQgdGhlIGZpbmFsIHdvcmQgaW5kZXggdG8gdGhlIGN1cnJlbnQgcGFyYWdyYXBoIGluZGV4IGFycmF5XHJcblx0ICogaW4gb3JkZXIgdG8ga2VlcCByZWZlcmVuY2UgdG8gdGhlIGxhc3Qgd29yZCBvZiB0aGF0IHBhcmFncmFwaC5cclxuXHQgKiBUaGlzIGlzIHVzZWZ1bCBmb3IgdGhlIGZpbmFsIHRpdGxlIHBhcmFncmFwaCBpZiB0aGVyZSdzIGEgc3VidGl0bGVcclxuXHQgKiBhbmQgYWxzbyB0byBwcmV2ZW50IGVycm9ycyB3aGlsZSBnZXR0aW5nIGFuIHVuZGVmaW5lZCBlbGVtZW50IGluIFxyXG5cdCAqIHRoZSBhcnJheS5cclxuXHQqL1xyXG5cdHBhcmFncmFwaHNJbmRleFtwYXJhZ3JhcGhzQW1vdW50XS5wdXNoKHBUZXh0Lmxlbmd0aCk7XHJcblx0LyogQWZ0ZXIgY3JlYXRpbmcgdGhlIHBhcmFncmFwaHMgdGhlIGN1cnJlbnQgcGFyYWdyYXBoIHN0cmluZyBmb3IgdGhlIFxyXG5cdCAqIGZpbmFsIHBhcmFncmFwaCB3b24ndCBiZSBpbmNsdWRlZCBpbiB0aGUgc3RyaW5ncyBhcnJheSBzaW5jZSB0aGVcclxuXHQgKiBjb2RlIG5ldmVyIHJlYWNoZXMgdGhlIGZpbmFsIGVsc2UgaWYgc3RhdGVtZW50IHRoYXQgcHVzaGVzIHRoZVxyXG5cdCAqIHN0cmluZyB0byB0aGUgYXJyYXkgYW5kIHJlc2V0cyB0byBhbiBlbXRweSBvbmUuIEluIHNvbWUgY2FzZXMgdGhlXHJcblx0ICogc3RyaW5nIGNhbiBiZSBzaG9ydCB0aGF0IG5ldmVyIGNyZWF0ZXMgbW9yZSB0aGFuIDMgbGluZXMgYW5kIHRoZSBcclxuXHQgKiBjb2RlIG5ldmVyIGdldHMgdG8gdGhlIGZpbmFsIGVsc2UgaWYuXHJcblx0ICogaW4gdGhpcyBwYXJ0IGFkZCB0aGUgc3RyaW5nIHRvIHRoZSBhcnJheSBhbmQgcmVzZXQgaXQgdG8gYW4gZW1wdHkgb25lXHJcblx0Ki9cclxuXHRwU3RyaW5ncy5wdXNoKF9jdXJycmVudFBhcmFncmFwaCk7XHJcblx0Ly8gcmVzZXQgY3VycmVudCBzdHJpbmdcclxuXHRfY3VycnJlbnRQYXJhZ3JhcGggPSBcIlwiO1xyXG5cdC8qIEluIHRoZSBjYXNlIHRoZSBzbGlkZSBoYXMgYSBzdWJ0aXRsZSwgd2UgbmVlZCB0byBhZGQgdGhlIGZpcnN0IHdvcmQgb2ZcclxuXHQgKiB0aGUgc3VidGl0bGUgaW4gdGhlIG5ldyBhcnJheSB0aGF0IHdpbGwgYmUgY3JlYXRlZCB3aGVuIHRoaXMgZnVuY3Rpb25cclxuXHQgKiBydW5zIGFnYWluLiBGb3IgdGhhdCBpbmNyZWFzZSB0aGUgcGFyYWdyYXBocyBhbW91bnQuXHJcblx0Ki9cclxuXHRfdGV4dERhdGEucGFyYWdyYXBoc0Ftb3VudCsrO1xyXG59OyAvLyBjcmVhdGUgcGFyYWdyYXBoc1xyXG5cclxuXHJcbi8qKiBNYWluIFRleHQgUHJvY2VzcyBNZXRob2QuXHRcclxuICogVGhpcyBtZXRob2QgcnVucyB0aGUgY29kZSB0byBwcm9jZXNzIHRoZSB0ZXh0IGFuZCBjcmVhdGUgdGhlIHBhcmFncmFwaHNcclxuICogZm9yIGEgbmV3IHNsaWRlLlxyXG4gKiBBbHNvIHRoaXMgcmVzZXRzIHRoZSBkYXRhIGZyb20gdGhlIHRleHQgZGF0YSBvYmplY3QgYW5kIG90aGVyIHZhcmlhYmxlcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHQgdGhlIHRpdGxlIG9mIHRoZSBzbGlkZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcyB0aGUgc3VidGl0bGUgb2YgdGhlIHNsaWRlXHJcbiAqIEBwcml2YXRlXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfY3JlYXRlU2xpZGVUZXh0ID0gKHQsIHMpID0+IHtcclxuXHRjb25zdCB0aW1lckEgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHQvLyByZXNldCBldmVyeXRoaW5nIHRvIHRoZSBkZWZhdWx0IHZhbHVlc1xyXG5cdF9yZXNldFRleHREYXRhKCk7XHJcblx0Ly8gc2V0IHRoZSBzbGlkZSBsYW5ndWFnZVxyXG5cdF90ZXh0RGF0YS5zbGlkZUxhbmcgPSBfc2xpZGVzRGF0YVtfY3VycmVudFNsaWRlSW5kZXhdLnNsaWRlTGFuZztcclxuXHQvLyBzZXQgdGhlIGhhcyBzdWJ0aXRsZVxyXG5cdF9oYXNTdWJ0aXRsZSA9IHMgPyB0cnVlIDogZmFsc2U7XHJcblx0Ly8gY3JlYXRlIHRoZSB0ZXh0IGRhdGFcclxuXHRpZiAoIHQgIT09IHVuZGVmaW5lZCApIF9jcmVhdGVQYXJhZ3JhcGhzKHQud29yZHMsIGZhbHNlKTtcclxuXHQvLyBzZXQgdGhlIGFtb3VudCBvZiBwYXJhZ3JhcGhzIGluIHRoZSB0aXRsZVxyXG5cdF90aXRsZVBhcmFncmFwaHNBbW91bnQgPSBfdGV4dERhdGEucEFycmF5cy5sZW5ndGg7XHJcblx0aWYgKHMpIHsgX2NyZWF0ZVBhcmFncmFwaHMoIHMud29yZHMsIHRydWUgKTsgfVxyXG5cdC8vIGNvbnNvbGUubG9nKF90ZXh0RGF0YSk7XHJcblx0Y29uc3QgdGltZXJCID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0Ly8gY29uc29sZS5sb2coIFwidG90YWwgdGltZSA9PiBcIiwgdGltZXJCIC0gdGltZXJBICk7XHJcblx0Ly8gX3RpbWVMb2dnZXIuaW5uZXJIVE1MID0gdGltZXJCIC0gdGltZXJBO1xyXG59O1xyXG5cclxuXHJcblxyXG4vKiogTWV0aG9kIHRvIEFuaW1hdGUgdGhlIHdvcmRzLlx0XHJcbiAqIENhbGxlZCBieSB0aGUgZGVsYXllZCBjYWxsIGluc3RhbmNlIHRoYXQgY29udHJvbHMgdGhlIHRleHQgYW5pbWF0aW9uLlxyXG4gKiBHb2VzIHRocm91Z2ggdGhlIHBhcmFncmFwaHMgYXJyYXlzIGFuZCBhZGRzIHRoZSB3b3JkIHRvIHRoZSB0ZXh0IGVsZW1lbnQuXHJcbiAqIEdldHMgdGhlIGxpbmUgb2YgdGhlIGN1cnJlbnQgd29yZCBhbmQgdGhlIHdpZHRoIG9mIHRoZSBiYWNrZ3JvdW5kIGJlaGluZCBpdC5cclxuICogQWZ0ZXIgYWRkaW5nIGEgbmV3IHdvcmQgY2hlY2sgaWYgdGhlIGFycmF5IGhhcyBhIG5leHQgd29yZCBhbmQgdXBkYXRlIHRoZVxyXG4gKiBjdXJyZW50IHdvcmQgaW5kZXggYW5kIHRoZSBjdXJyZW50IHBhcmFncmFwaCBpbmRleCB2YWx1ZXMuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gblAgaWYgYSBuZXcgcGFyYWdyYXBoIGlzIGJlaW5nIGNyZWF0ZWRcclxuICogQHByaXZhdGVcclxuKi9cclxuY29uc3QgX2FkZFdvcmQgPSBuUCA9PiB7XHJcblx0LyogQ2hlY2sgaWYgdGhlIHNsaWRlJ3MgdGV4dCBpcyBjb21wbGV0ZS5cclxuXHQgKiBBbHNvIGNoZWNrIGlmIHRoZSB1c2VyIGlzIHRvdWNoaW5nIHRoZSB0ZXh0IGVsZW1lbnQuXHJcblx0ICogSWYgdGhlIHVzZXIgaXMgdG91Y2hpbmcgdGhlIGVsZW1lbnQgYW5kIHRoZSBhbmltYXRpb24gY29tcGxldGVzLFxyXG5cdCAqIGEgZGVsYXllZCBjYWxsIHdpbGwgc3RhcnQgYW5kIGNhbGwgdGhpcyBtZXRob2QgdG8gc2hvdyB0aGUgbmV4dFxyXG5cdCAqIHBhcmFncmFwaCwgY2hlY2sgZm9yIHRoZSB1c2VyIGludGVyYWN0aW9uIGFuZCBsZWF2ZSB0aGUgbWV0aG9kLlxyXG5cdCovXHJcblx0aWYgKF9pc1RleHRDb21wbGV0ZSkgeyByZXR1cm47IH07XHJcblx0LyogaWYgYSBuZXcgcGFyYWdyYXBoIGlzIGJlaW5nIGNyZWF0ZWQsIHRoZW4gd2UgbmVlZCB0byBjbGVhciB0aGVcclxuXHQgKiBiYWNrZ3JvdW5kIGdyYXBoaWMgZWxlbWVudC5cclxuXHQgKiBhbHNvIHNldCB0aGUgcGFyIGdhcCBkZWxheWVkIGNhbGwgdG8gdW5kZWZpbmVkIHRvIHByZXZlbnQgaXQgZnJvbVxyXG5cdCAqIGJlaW5nIHJlc3RhcnRlZCBpZiB0aGUgcGFyYWdyYXBoIGhhc24ndCBiZWluZyBjb21wbGV0ZWQuXHJcblx0Ki9cclxuXHRpZiAoblApIHtcclxuXHRcdC8vIGNyZWF0aW5nIGEgbmV3IHBhcmFncmFwaCwgaW5jcmVhc2UgdGhlIHBhcmFncmFwaCBpbmRleFxyXG5cdFx0X2N1cnJyZW50UGFyYWdyYXBoSW5kZXgrKztcclxuXHRcdC8vIENoZWNrIGlmIHRoaXMgaXMgdGhlIGxhc3QgcGFyYWdyYXBoIG9mIHRoZSB0aXRsZSBhbmQgaWZcclxuXHRcdC8vIHRoZSBmYXN0IGZvcndhcmQgb3B0aW9uIGlzIHRydWUuIGluIHRoYXQgY2FzZSBzdG9wIHRoZSBtZXRob2RcclxuXHRcdC8vIGFsc28gY2FsbCB0aGUgdGV4dCBjb21wbGV0ZSBldmVudCBlbWl0dGVyXHJcblx0XHRpZiAoKF9jdXJycmVudFBhcmFncmFwaEluZGV4ID09PSBfdGl0bGVQYXJhZ3JhcGhzQW1vdW50ICYmIF9mYXN0Rm9yd2FyZCkpIHtcclxuXHRcdFx0Ly8gY3JlYXRlIGFuZCBzdGFydCB0aGUgdGltZXJcclxuXHRcdFx0Ly8gc29sdmVzICM1NiBodHRwczovL2dpdGxhYi5jb20vcmhlcm5hbmRvZy9haW53LXBpeGktY29tcG9uZW50L2lzc3Vlcy81NlxyXG5cdFx0XHRfdGV4dENvbXBsZXRlVGltZXIgPSBUd2VlbkxpdGUuZGVsYXllZENhbGwoXHJcblx0XHRcdFx0cGFyc2VGbG9hdCgoX3RleHREYXRhLnBBcnJheXNbX2N1cnJyZW50UGFyYWdyYXBoSW5kZXhdLmxlbmd0aCAqIDAuMikudG9GaXhlZCgyKSksXHJcblx0XHRcdFx0X2V2ZW50RW1pdHRlciwgW1widGV4dGNvbXBsZXRlXCJdXHJcblx0XHRcdCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRfcGFyR2FwID0gdW5kZWZpbmVkO1xyXG5cdFx0KF9jdXJycmVudFBhcmFncmFwaEluZGV4ID09PSBfdGl0bGVQYXJhZ3JhcGhzQW1vdW50ICYmIF9mYXN0Rm9yd2FyZCkgPyBudWxsIDogX3RleHRCYWNrZ3JvdW5kR3JhcGguY2xlYXIoKTtcclxuXHRcdC8vIHJlc2V0IHRoZSBkaXNwbGF5IHRleHQgdG8gYW4gZW1wdHkgc3RyaW5nXHJcblx0XHRfZGlzcGxheVRleHQgPSBcIlwiO1xyXG5cdFx0Ly8gdGhpcyBpcyB0aGUgZmluYWwgd29yZCBvZiB0aGlzIHBhcmFncmFwaCBidXQgbm90IHRoZSBsYXN0IHBhcmFncmFwaFxyXG5cdFx0Ly8gcmVzZXQgdGhlIHdvcmQgaW5kZXggdG8gMCBhbmQgaW5jcmVhc2UgdGhlIHBhcmFncmFwaCBpbmRleFxyXG5cdFx0X2N1cnJlbnRXb3JkSW5kZXggPSAwO1xyXG5cdH07XHJcblx0LyogaWYgdGhpcyBpcyB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZmlyc3QgcGFyYWdyYXBoLCBzdGFydCB0aGUgVFRTXHJcblx0ICogZm9yIHRoZSB0aXRsZS4gQWxzbyBzZXQgdGhlIGJvb2xlYW5zLiBUaGUgc3VidGl0bGUgaXMgc2V0IHRvIGZhbHNlXHJcblx0ICogd2hpbGUgdGhlIHRpdGxlIFRUUyBib29sZWFuIGlzIHNldCB0byB0cnVlXHJcblx0ICovXHJcblx0Ly8gUkVNT1ZFIFdJTkRPVyBBSVZPSUNFIENPTkRJVElPTkFMXHJcblx0aWYgKCBfY3VycnJlbnRQYXJhZ3JhcGhJbmRleCA9PT0gMCAmJiBfY3VycmVudFdvcmRJbmRleCA9PT0gMCAmJiB3aW5kb3cuYWlWb2ljZSkge1xyXG5cdFx0Ly8gc2V0IHRoZSBib29sZWFuc1xyXG5cdFx0X3R0c1RpdGxlU3RhcnRlZCA9IHRydWU7XHJcblx0XHQvLyBTdGFydCBUVFMgZm9yIHRoZSB0aXRsZVxyXG5cdFx0d2luZG93LmFpVm9pY2UoX3NsaWRlc0RhdGFbX2N1cnJlbnRTbGlkZUluZGV4XS5zbGlkZVRpdGxlLCBfdGV4dERhdGEuc2xpZGVMYW5nKTtcclxuXHR9XHJcblxyXG5cdC8qIElmIHRoaXMgaXMgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIHBhcmFncmFwaCBlcXVhbCB0byB0aGUgYW1vdW50XHJcblx0ICogb2YgcGFyYWdyYXBocyBvZiB0aGUgdGl0bGUgKHRoZSBwYXJhZ3JhcGhzIGhhdmUgMCBpbmRleCksIHRoZW5cclxuXHQgKiBpcyB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgc3VidGl0bGUuIEFsc28gd2UgaGF2ZSB0byBjaGVjayB0aGF0IHRoZSBUVFNcclxuXHQgKiBoYXNuJ3Qgc3RhcnRlZCBpbiB0aGUgc2Nyb2xsIGV2ZW50cy5cclxuXHQqL1xyXG5cdC8vIFJFTU9WRSBXSU5ET1cgQUlWT0lDRSBDT05ESVRJT05BTFxyXG5cdGlmICggX2N1cnJyZW50UGFyYWdyYXBoSW5kZXggPT09IF90aXRsZVBhcmFncmFwaHNBbW91bnQgJiYgX2N1cnJlbnRXb3JkSW5kZXggPT09IDAgJiYgIV90dHNTdWJ0aXRsZVN0YXJ0ZWQgJiYgd2luZG93LmFpVm9pY2UgKSB7XHJcblx0XHRfdHRzVGl0bGVTdGFydGVkID0gZmFsc2U7XHJcblx0XHRfdHRzU3VidGl0bGVTdGFydGVkID0gdHJ1ZTtcclxuXHRcdC8vIFN0YXJ0IFRUUyBmb3IgdGhlIHN1YnRpdGxlXHJcblx0XHR3aW5kb3cuYWlWb2ljZShfc2xpZGVzRGF0YVtfY3VycmVudFNsaWRlSW5kZXhdLnNsaWRlTXNnLCBfdGV4dERhdGEuc2xpZGVMYW5nKTtcclxuXHR9XHJcblx0Ly8gdGhlIGN1cnJlbnQgcGFyYWdyYXBoXHJcblx0Y29uc3QgX2N1UGFyID0gX3RleHREYXRhLnBBcnJheXNbX2N1cnJyZW50UGFyYWdyYXBoSW5kZXhdO1xyXG5cdGlmICggIV9jdVBhciApIHJldHVybjtcclxuXHQvLyBnZXQgdGhlIG5leHQgd29yZFxyXG5cdGNvbnN0IF9uZXh0V29yZCA9IF9jdVBhciA/IF9jdVBhcltfY3VycmVudFdvcmRJbmRleF0gOiB1bmRlZmluZWQ7XHJcblx0Ly8gYWRkIHRoZSB3b3JkIG9mIHRoZSBjdXJyZW50IHBhcmFncmFwaFxyXG5cdGlmICggX25leHRXb3JkICkge1xyXG5cdFx0X2Rpc3BsYXlUZXh0ID0gX2Rpc3BsYXlUZXh0LmNvbmNhdCggX25leHRXb3JkLndvcmQgKTtcclxuXHRcdC8vIGFwcGx5IHRoZSB0ZXh0IHRvIHRoZSB0ZXh0IGVsZW1lbnRcclxuXHRcdF90aXRsZS50ZXh0ID0gX2Rpc3BsYXlUZXh0O1xyXG5cdFx0Ly8gY3JlYXRlIHRoZSBiYWNrZ3JvdW5kIGJlaGluZCB0aGUgd29yZCAweDAwMDUxYlxyXG5cdFx0X3RleHRCYWNrZ3JvdW5kR3JhcGhcclxuXHRcdFx0LmJlZ2luRmlsbCgweDAwMDUxYilcclxuXHRcdFx0Ly8gc3RhcnQgWCBpcyAtNSwgc3RhcnQgWSBpcyBsaW5lIGhlaWdodCB4IHRoZSBsaW5lIG9mIHRoZSBjdXJyZW50IHdvcmRcclxuXHRcdFx0LmRyYXdSZWN0KC01LCBfdGV4dExpbmVIZWlnaHQgKiBfY3VQYXJbX2N1cnJlbnRXb3JkSW5kZXhdLmxpbmUsIF9jdVBhcltfY3VycmVudFdvcmRJbmRleF0ud2lkdGggKyAxMCwgX3RleHRMaW5lSGVpZ2h0KVxyXG5cdFx0XHQuZW5kRmlsbCgpO1xyXG5cdH1cclxuXHRpZiAoICFfY3VQYXIgKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvKiBpZiB0aGVyZSdzIGFub3RoZXIgd29yZCBpbiB0aGUgYXJyYXkgaW5jcmVhc2UgdGhlIGN1cnJlbnQgd29yZCBpbmRleFxyXG5cdCAqIGFuZCBjYWxsIHRoaXMgbWV0aG9kIGFnYWluIChyZXN0YXJ0IHRoZSBkZWxheWVkIGNhbGwpLlxyXG5cdCAqIElmIHRoZXJlIGlzbid0IGFub3RoZXIgd29yZCwgY2hlY2sgaWYgdGhlcmUncyBhbm90aGVyIHBhcmFncmFwaCBpbiB0aGVcclxuXHQgKiBzbGlkZSdzIHRleHQuIElmIHRoZXJlJ3MgYW5vdGhlciBwYXJhZ3JhcGgsIGluY3JlYXNlIHRoZSBjdXJyZW50IHBhcmFncmFwaFxyXG5cdCAqIGluZGV4IHZhbHVlLiBJZiB0aGVyZSBpc24ndCBhbm90aGVyIHBhcmFncmFwaCwgZG9uJ3QgY2FsbCB0aGlzIG1ldGhvZCBmb3JcclxuXHQgKiB0aGlzIHNsaWRlLlxyXG5cdCAqIEFsc28gY2hlY2sgaWYgdGhlIGZhc3QgZm9yd2FyZCBvcHRpb24gaXMgZW5hYmxlZC4gSW4gdGhhdCBjYXNlLCByZWdhcmRsZXNzXHJcblx0ICogaWYgdGhlcmUgYXJlIG1vcmUgcGFyYWdyYXBocywgd2hlbiB0aGUgdGl0bGUgaXMgY29tcGxldGUgZG9uJ3Qgc2hvdyB0aGVcclxuXHQgKiBzdWJ0aXRsZSwganVzdCBzdGFydCBhIHRpbWVyIGFuZCBnbyB0byB0aGUgbmV4dCBzbGlkZS5cclxuXHQqL1xyXG5cdGlmIChfY3VycmVudFdvcmRJbmRleCA8IF9jdVBhci5sZW5ndGggLSAxKSB7XHJcblx0XHQvLyB0aGVyZSBpcyBhbm90aGVyIHdvcmQsIGluY3JlYXNlIHRoZSB3b3JkIGluZGV4IHZhbHVlXHJcblx0XHRfY3VycmVudFdvcmRJbmRleCsrO1xyXG5cdFx0Ly8gY2FsbCB0aGUgbWV0aG9kIGFnYWluIGlmIGlzIGRlZmluZWRcclxuXHRcdGlmICggX2FkZFdvcmREZWxheWVkQ2FsbCApIHsgX2FkZFdvcmREZWxheWVkQ2FsbC5yZXN0YXJ0KHRydWUpOyB9XHJcblx0fSBlbHNlIGlmIChfY3VycmVudFdvcmRJbmRleCA9PT0gX2N1UGFyLmxlbmd0aCAtIDEgJiYgX2N1cnJyZW50UGFyYWdyYXBoSW5kZXggPCBfdGV4dERhdGEucEFycmF5cy5sZW5ndGggLSAxKSB7XHJcblx0XHQvKiBBIG5ldyBwYXJhZ3JhcGggd2lsbCBiZSBhZGRlZCB0byB0aGUgc2NyZWVuLiBUaGVuIHdlIG5lZWQgdGhlIGdhcFxyXG5cdFx0ICogYmV0d2VlbiBwYXJhZ3JhcGhzIGluIG9yZGVyIHRvIHN0YXJ0IGEgZGVsYXllZCBjYWxsIHRvIGFkZCB0aGUgbmV3XHJcblx0XHQgKiBwYXJhZ3JhcGguIEJhc2ljYWxseSBpcyBhIGNhbGwgdG8gdGhpcyBtZXRob2QuXHJcblx0XHQgKiBDaGVjayBpZiB0aGlzIGlzIHRoZSBsYXN0IHBhcmFncmFwaCBvZiB0aGUgdGl0bGUgaW4gb3JkZXIgdG8gYWRkIDJcclxuXHRcdCAqIHNlY29uZHMgdG8gdGhlIGRlbGF5ZWQgY2FsbC5cclxuXHRcdCovXHJcblx0XHRjb25zdCBfcGFyVGltZXIgPSBwYXJzZUZsb2F0KChfY3VQYXIubGVuZ3RoICogMC4yKS50b0ZpeGVkKDIpKTtcclxuXHRcdC8vIGFkZCAyIHNlY3MgYmV0d2VlbiB0aGUgdGV4dCBvZiB0aGUgdGl0bGUgYW5kIHN1YnRpdGxlXHJcblx0XHRjb25zdCBfZHVyYXRpb24gPSBfY3VycnJlbnRQYXJhZ3JhcGhJbmRleCA9PT0gKF90aXRsZVBhcmFncmFwaHNBbW91bnQgLSAxKSA/IF9wYXJUaW1lciArIDIgOiBfcGFyVGltZXI7XHJcblx0XHRfcGFyR2FwID0gVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKF9kdXJhdGlvbiwgX2FkZFdvcmQsIFt0cnVlXSkucGF1c2UoKTtcclxuXHRcdC8vIElmIHRoZSB1c2VyIGlzIHRvdWNpbmcgdGhlIHRleHQgZWxlbWVudCwgZG9uJ3Qgc3RhcnQgdGhlIGRlbGF5ZWQgY2FsbFxyXG5cdFx0IV91c2VySW50ZXJhY3Rpb24gPyBfcGFyR2FwLnJlc3RhcnQodHJ1ZSkgOiBudWxsO1xyXG5cdH0gZWxzZSBpZiAoX2N1cnJlbnRXb3JkSW5kZXggPT09IF9jdVBhci5sZW5ndGggLSAxICYmIF9jdXJycmVudFBhcmFncmFwaEluZGV4ID09PSBfdGV4dERhdGEucEFycmF5cy5sZW5ndGggLSAxKSB7XHJcblx0XHQvLyB0aGlzIGlzIHRoZSBsYXN0IHdvcmQgb2YgdGhlIGxhc3QgcGFyYWdyYXBoXHJcblx0XHQvLyB0aGUgd29yZCBhbmQgcGFyYWdyYXBoIGluZGV4IHdpbGwgYmUgcmVzZXQgZm9yIHRoZSBuZXh0IHNsaWRlXHJcblx0XHQvLyBvciBhZnRlciB0aGUgc2Nyb2xsIG1ldGhvZFxyXG5cdFx0X2lzVGV4dENvbXBsZXRlID0gdHJ1ZTtcclxuXHRcdC8vIG5vdyBlbWl0IHRoZSB0ZXh0IGNvbXBsZXRlIGV2ZW50XHJcblx0XHQvKiBJTkNMVURFIFRIRSBURVhUIENPTVBMRVRFIEVWRU5UIEVNSVRURVIgSEVSRSAqL1xyXG5cdFx0Ly8gY3JlYXRlIGFuZCBzdGFydCB0aGUgdGltZXIgXHJcblx0XHQvLyBzb2x2ZXMgIzU2IGh0dHBzOi8vZ2l0bGFiLmNvbS9yaGVybmFuZG9nL2FpbnctcGl4aS1jb21wb25lbnQvaXNzdWVzLzU2XHJcblx0XHRfdGV4dENvbXBsZXRlVGltZXIgPSBUd2VlbkxpdGUuZGVsYXllZENhbGwoXHJcblx0XHRcdHBhcnNlRmxvYXQoKF90ZXh0RGF0YS5wQXJyYXlzW19jdXJycmVudFBhcmFncmFwaEluZGV4XS5sZW5ndGggKiAwLjIpLnRvRml4ZWQoMikpLFxyXG5cdFx0XHRfZXZlbnRFbWl0dGVyLCBbXCJ0ZXh0Y29tcGxldGVcIl1cclxuXHRcdCk7XHJcblx0fSAvLyB3b3JkIHBhcmFncmFwaCBpbmRleCBjb25kaXRpb25hbFxyXG5cdGlmICggX2N1cnJlbnRXb3JkSW5kZXggPT09IDEgJiYgIV9pc1RleHRDb21wbGV0ZSApIHtcclxuXHRcdC8qXHJcblx0XHRcdElOU0VSVCBUVFMgQ0FMTCBIRVJFXHJcblx0XHRcdFRIRSBURVhUIFBBU1NFRCBUTyBUSEUgVFRTIE1FVEhPRCBJUyBMT0NBVEVESU4gVEhFIFxyXG5cdFx0XHRURVhUREFUQSBPQkpFQ1RcclxuXHRcdFx0X3RleHREYXRhLnBTdHJpbmdzW19jdXJycmVudFBhcmFncmFwaEluZGV4XVxyXG5cdFx0XHRTTElERSBMQU5HVUFHRSBJUyBBTFNPIFNUT1JFRCBJTiBUSEUgVEVYVCBEQVRBIE9CSkVDVFxyXG5cdFx0XHRfdGV4dERhdGEuc2xpZGVMYW5nXHJcblx0XHRcdFlPVSBDQU4gU0VFIElUIElOIFRIRSBDT05TT0xFIExPR1MgQkVMT1dcclxuXHRcdCovXHJcblx0XHQvLyBjb25zb2xlLmxvZyggXCItLS0tLS0tLS0tLS1cXG5TVEFSVElORyBBIE5FVyBQQVJBR1JBUEgsIENBTEwgVFRTXCIgKTtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCBfdGV4dERhdGEucFN0cmluZ3NbX2N1cnJyZW50UGFyYWdyYXBoSW5kZXhdICk7XHJcblx0XHQvLyBjb25zb2xlLmxvZyggX3RleHREYXRhLnNsaWRlTGFuZyApO1xyXG5cdFx0Ly8gX3RleHREYXRhLmlzRGF0YVNldCA9IHRydWU7XHJcblx0XHQvLyBfYWxsb3dVc2VyRXZlbnRzID0gdHJ1ZTtcclxuXHR9XHJcbn07IC8vIGFkZCB3b3JkIG1ldGhvZFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cdFx0VE9VQ0ggRVZFTlRTXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuLyoqIFRvdWNoIFN0YXJ0IE1ldGhvZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZSBQSVhJIGV2ZW50IG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3RleHRUb3VjaFN0YXJ0ID0gZSA9PiB7XHJcblx0Ly8gcHJldmVudCBidWJibGluZ1xyXG5cdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0Ly8gb25seSBpZiB0aGUgdGV4dCBkYXRhIGZvciB0aGUgc2xpZGUgaGFzIGJlZW4gc2V0IGFsbG93IHRoZVxyXG5cdC8vIHVzZXIgaW50ZXJhY3Rpb24gZXZlbnRzXHJcblx0aWYgKCBfdGV4dERhdGEuaXNEYXRhU2V0ICYmIF9hbGxvd1VzZXJFdmVudHMgKSB7XHJcblx0XHQvLyBzZXQgdGhlIHRvdWNoaW5nIGJvb2wgdG8gdHJ1ZVxyXG5cdFx0X2lzVXNlclRvdWNoaW5nID0gdHJ1ZTtcclxuXHRcdC8vIHVwZGF0ZSB0aGUgc3RhcnQgcGFyYWdyYXBoIGluZGV4IGZvciB0aGUgbmV4dCB0b3VjaCBldmVudFxyXG5cdFx0X3N0YXJ0UGFySW5kZXggPSBfY3VycnJlbnRQYXJhZ3JhcGhJbmRleDtcclxuXHRcdC8vIGNvbnNvbGUubG9nKFwic3RhcnQgcGFyIGluZGV4ID0+IFwiLCBfc3RhcnRQYXJJbmRleCk7XHJcblx0XHQvLyBzZXQgdGhlIHN0YXJ0IGRyYWcgcG9pbnRcclxuXHRcdF90ZXh0U3RhcnRZID0gZS5kYXRhLmdsb2JhbC55O1xyXG5cdFx0Ly8gaWYgdGhlIHBhcmFncmFwaCBnYXAgdGltZXIgaXMgcnVubmluZywgcGF1c2UgaXRcclxuXHRcdGlmIChfcGFyR2FwKSB7IF9wYXJHYXAucGF1c2UoKS5raWxsKCk7IH07XHJcblx0fVxyXG59O1xyXG5cclxuLyoqIFRvdWNoIEVuZCBNZXRob2RcclxuICogV2hlbiB0aGUgdG91Y2ggaXMgZG9uZSwgYWZ0ZXIgcmVzZXRpbmcgdGhlIGJvb2xlYW4gd2UgbmVlZCB0byByZXN0YXJ0IHRoZSBcclxuICogQHByaXZhdGVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF90ZXh0VG91Y2hFbmQgPSBlID0+IHtcclxuXHQvLyBzdG9wIGV2ZW50IGJ1YmJpbG5nXHJcblx0Ly8gY29tbWVudCBvdXQgaW4gb3JkZXIgdG8gc29sdmUgIzU1XHJcblx0Ly8gaHR0cHM6Ly9naXRsYWIuY29tL3JoZXJuYW5kb2cvYWludy1waXhpLWNvbXBvbmVudC9pc3N1ZXMvNTVcclxuXHQvLyBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdC8vIG9ubHkgaWYgdGhlIHRleHQgZGF0YSBmb3IgdGhlIHNsaWRlIGhhcyBiZWVuIHNldCBhbGxvdyB0aGVcclxuXHQvLyB1c2VyIGludGVyYWN0aW9uIGV2ZW50c1xyXG5cdGlmICggX2FsbG93VXNlckV2ZW50cyAmJiBfaXNVc2VyVG91Y2hpbmcgKSB7XHJcblx0XHQvLyBmaW5hbGx5IHNldCB0aGUgdG91Y2hpbmcgYm9vbCB0byBmYWxzZVxyXG5cdFx0X2lzVXNlclRvdWNoaW5nID0gZmFsc2U7XHJcblx0XHQvKiBBZnRlciB0aGUgaW50ZXJhY3Rpb24gaXMgY29tcGxldGUgY2hlY2sgaWYgdGhlIGN1cnJlbnQgcGFyYWdyYXBoIGlzIHRoZVxyXG5cdFx0ICogZmluYWwgb25lLiBUaGUgdXNlciBjb3VsZCBkcmFnIGFmdGVyIGFsbCB0aGUgcGFyYWdyYXBocyBhcmUgYW5pbWF0ZWQgaW5cclxuXHRcdCAqIGluIHRoYXQgY2FzZSB0aGUgdGV4dCBjb21wbGV0ZSBib29sIGlzIHRydWUgYW5kIHRoZSB1c2VyIGNvdWxkIGdvIHRvIGFcclxuXHRcdCAqIHByZXZpb3VzIHBhcmFncmFwaCBhbmQgdGhlIGRlbGF5ZWQgY2FsbCB3b24ndCBiZSBzdGFydGVkLlxyXG5cdFx0Ki9cclxuXHRcdF9pc1RleHRDb21wbGV0ZSA9IChfY3VycnJlbnRQYXJhZ3JhcGhJbmRleCA9PT0gKF90ZXh0RGF0YS5wYXJhZ3JhcGhzQW1vdW50IC0gMSkpO1xyXG5cdFx0Ly8gaWYgdGhlIHRpbWVyIGlzIG5vdCBjcmVhdGVkIGFuZCB0aGlzIGlzIG5vdCB0aGUgZmluYWwgcGFyYWdyYXBoXHJcblx0XHQvLyBjcmVhdGUgdGhlIHRpbWVyXHJcblx0XHQvLyB0aGUgZmluYWwgY29uZGl0aW9uYWwgaXMgdG8gY2hlY2sgdGhhdCB0aGVyZSBhcmUgYWN0dWFsbHkgcGFyYWdyYXBocyBjcmVhdGVkXHJcblx0XHQvLyB0aGlzIGNvdWxkIGJlIGNhbGxlZCBpZiB0aGUgdXNlciB0b3VjaGVzIHRoZSBzY3JlZW4gYmVmb3JlIHByb2Nlc3NpbmdcclxuXHRcdC8vIHRoZSB0ZXh0IG9mIHRoZSBuZXcgc2xpZGUsIHNvIHRoZSBwYXJhZ3JhcGhzIGFycmF5IHdpbGwgYmUgZW1wdHlcclxuXHRcdC8vIHJldHVybmluZyBhbiBlcnJvciBmb3IgYW4gdW5kZWZpbmVkIGVsZW1lbnQuXHJcblx0XHQvLyByZWxhdGVkIHRvIHRoaXNcclxuXHRcdC8vIGh0dHBzOi8vZ2l0bGFiLmNvbS9yaGVybmFuZG9nL2FpbnctcGl4aS1jb21wb25lbnQvaXNzdWVzLzUxXHJcblx0XHRpZiAoICFfaXNUZXh0Q29tcGxldGUgJiYgIV9wYXJHYXAvKiAgJiYgX3RleHREYXRhLnBBcnJheXNbX2N1cnJyZW50UGFyYWdyYXBoSW5kZXhdICovICkge1xyXG5cdFx0XHRfcGFyR2FwID0gVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKFxyXG5cdFx0XHRcdChfdGV4dERhdGEucEFycmF5c1tfY3VycnJlbnRQYXJhZ3JhcGhJbmRleF0ubGVuZ3RoICogMC4yKS50b0ZpeGVkKDIpLFxyXG5cdFx0XHRcdF9hZGRXb3JkLCBbdHJ1ZV1cclxuXHRcdFx0KS5wYXVzZSgpOyAvLyBkZWxheWVkIGNhbGxcclxuXHRcdH1cclxuXHRcdC8vIHJlc3RhcnQgdGhlIHdvcmQgYW5pbWF0aW9uIGlmIHRoZSB0ZXh0IGlzIG5vdCBjb21wbGV0ZVxyXG5cdFx0aWYgKCFfaXNUZXh0Q29tcGxldGUgJiYgX2N1cnJyZW50UGFyYWdyYXBoSW5kZXggPCAoX3RleHREYXRhLnBhcmFncmFwaHNBbW91bnQgLSAxKSkge1xyXG5cdFx0XHRfcGFyR2FwLnJlc3RhcnQodHJ1ZSk7XHJcblx0XHR9O1xyXG5cdH1cclxufTtcclxuXHJcbi8qKiBUb3VjaCBNb3ZlIE1ldGhvZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZSBQSVhJIGV2ZW50IG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3RleHRUb3VjaE1vdmUgPSBlID0+IHtcclxuXHQvLyBzdG9wIGV2ZW50IGJ1YmJpbG5nXHJcblx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRpZiAoX2lzVXNlclRvdWNoaW5nICYmIF9hbGxvd1VzZXJFdmVudHMgKSB7XHJcblxyXG5cdFx0X3RleHREcmFnQW1vdW50ID0gX3RleHRTdGFydFkgLSBlLmRhdGEuZ2xvYmFsLnk7XHJcblx0XHQvLyBfdGV4dERpcmVjdGlvbiA9IF90ZXh0RHJhZ0Ftb3VudCA+IDA7XHJcblx0XHRjb25zdCBfdGFyZ2V0UGFyYWdyYXBoID0gX3N0YXJ0UGFySW5kZXggKyBNYXRoLnJvdW5kKF90ZXh0RHJhZ0Ftb3VudCAvIF90ZXh0TWluRHJhZyk7XHJcblx0XHQvLyBzaG93IHRoZSB0YXJnZXQgcGFyYWdyYXBoIGlmIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50XHJcblx0XHRpZiAoX2N1cnJyZW50UGFyYWdyYXBoSW5kZXggIT09IF90YXJnZXRQYXJhZ3JhcGggJiYgX3RleHREYXRhLnBTdHJpbmdzW190YXJnZXRQYXJhZ3JhcGhdICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0LyogSWYgdGhlIGZpcnN0IHBhcmFncmFwaCBpcyB0aGUgdGFyZ2V0LCB0aGVuIHN0YXJ0IHRoZSBUVFNcclxuXHRcdFx0ICogZm9yIHRoZSB0aXRsZSB0ZXh0LiBBbHNvIHNldCB0aGUgVFRTIGJvb2xlYW4gdG8gdHJ1ZSBmb3IgdGhlIFxyXG5cdFx0XHQgKiB0aXRsZSBhbmQgZmFsc2UgZm9yIHRoZSBzdWJ0aXRsZS5cclxuXHRcdFx0Ki9cclxuXHRcdFx0aWYgKCBfdGFyZ2V0UGFyYWdyYXBoID09PSAwICYmICFfdHRzVGl0bGVTdGFydGVkICYmIHdpbmRvdy5haVZvaWNlICkge1xyXG5cdFx0XHRcdF90dHNUaXRsZVN0YXJ0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdF90dHNTdWJ0aXRsZVN0YXJ0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHQvLyBTdGFydCBUVFMgZm9yIHRoZSB0aXRsZVxyXG5cdFx0XHRcdHdpbmRvdy5haVZvaWNlKF9zbGlkZXNEYXRhW19jdXJyZW50U2xpZGVJbmRleF0uc2xpZGVUaXRsZSwgX3RleHREYXRhLnNsaWRlTGFuZyk7XHJcblx0XHRcdH1cclxuXHRcdFx0LyogSWYgdGhpcyBpcyB0aGUgZmlyc3QgcGFyYWdyYXBoIG9mIHRoZSBzdWJ0aXRsZSwgc3RhcnQgdGhlIFRUU1xyXG5cdFx0XHQgKiBmb3IgdGhlIHN1YnRpdGxlIHRleHQgYW5kIHNldCB0aGUgYm9vbGVhbiB0byB0cnVlLiBBbHNvIHNldFxyXG5cdFx0XHQgKiB0aGUgdGl0bGUgVFRTIGJvb2xlYW4gdG8gZmFsc2UuXHJcblx0XHRcdCovXHJcblx0XHRcdGlmICggX3RhcmdldFBhcmFncmFwaCA9PT0gX3RpdGxlUGFyYWdyYXBoc0Ftb3VudCAmJiAhX3R0c1N1YnRpdGxlU3RhcnRlZCAmJiB3aW5kb3cuYWlWb2ljZSApIHtcclxuXHRcdFx0XHRfdHRzVGl0bGVTdGFydGVkID0gZmFsc2U7XHJcblx0XHRcdFx0X3R0c1N1YnRpdGxlU3RhcnRlZCA9IHRydWU7XHJcblx0XHRcdFx0Ly8gU3RhcnQgVFRTIGZvciB0aGUgc3VidGl0bGVcclxuXHRcdFx0XHR3aW5kb3cuYWlWb2ljZShfc2xpZGVzRGF0YVtfY3VycmVudFNsaWRlSW5kZXhdLnNsaWRlTXNnLCBfdGV4dERhdGEuc2xpZGVMYW5nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIF9hZGRXb3JkRGVsYXllZENhbGwgKSBfYWRkV29yZERlbGF5ZWRDYWxsLnBhdXNlKCkua2lsbCgpO1xyXG5cdFx0XHRpZiAoIF9wYXJHYXAgKSBfcGFyR2FwLnBhdXNlKCkua2lsbCgpO1xyXG5cdFx0XHQvLyBpZiB0aGUgdGV4dCB3YXMgY29tcGxldGVkIGVpdGhlciB0aHJvdWdoIHNjcm9sbCBvciBhbmltYXRpb24sIHRoZSB1c2VyXHJcblx0XHRcdC8vIGlzIHNjcm9sbGluZyB0byBhIHByZXZpb3VzIHBhcmFncmFwaC4gUmVzZXQgdGhlIHRleHQgY29tcGxldGUgYm9vbGVhblxyXG5cdFx0XHQvLyB0byBmYWxzZS4gQWxzbyBzdG9wIGFuZCByZXNldCB0aGUgdGV4dCBjb21wbGV0ZSBlbWl0dGVyIHRpbWVyXHJcblx0XHRcdF9pc1RleHRDb21wbGV0ZSA9IGZhbHNlO1xyXG5cdFx0XHRpZiggX3RleHRDb21wbGV0ZVRpbWVyICkgeyBfdGV4dENvbXBsZXRlVGltZXIucGF1c2UoKTsgX3RleHRDb21wbGV0ZVRpbWVyID0gdW5kZWZpbmVkOyB9O1xyXG5cclxuXHRcdFx0Ly8gY29uc29sZS5sb2coIGB3aXRoaW4gbGltaXRzLiAgdG90YWwgcGFyID0+ICR7X3RleHREYXRhLnBhcmFncmFwaHNBbW91bnQgLSAxfSAqIGN1cnIgcGFyID0+ICR7X3RhcmdldFBhcmFncmFwaH1gICk7XHJcblx0XHRcdC8vIHN0b3JlIHRoZSB0YXJnZXQgcGFyYWdyYXBoIGFycmF5XHJcblx0XHRcdGNvbnN0IF90YXJnZXRQYXJBcnJheSA9IF90ZXh0RGF0YS5wQXJyYXlzW190YXJnZXRQYXJhZ3JhcGhdO1xyXG5cdFx0XHRjb25zdCBfdGFyZ2V0QXJyYXlXb3JkcyA9IF90YXJnZXRQYXJBcnJheS5sZW5ndGg7XHJcblx0XHRcdC8vIHdlIHNob3VsZCBzaG93IGEgZGlmZmVyZW50IHBhcmFncmFwaFxyXG5cdFx0XHQvLyBzaG93IHRoZSBuZXcgcGFyYWdyYXBoXHJcblx0XHRcdF90aXRsZS50ZXh0ID0gX3RleHREYXRhLnBTdHJpbmdzW190YXJnZXRQYXJhZ3JhcGhdO1xyXG5cdFx0XHQvLyB1cGRhdGUgdGhlIHBhcmFncmFwaCBpbmRleFxyXG5cdFx0XHRfY3VycnJlbnRQYXJhZ3JhcGhJbmRleCA9IF90YXJnZXRQYXJhZ3JhcGg7XHJcblx0XHRcdC8vIGNsZWFyIHRoZSBiYWNrZ3JvdW5kIGdyYXBoaWNzXHJcblx0XHRcdF90ZXh0QmFja2dyb3VuZEdyYXBoLmNsZWFyKCk7XHJcblx0XHRcdC8vIEdvIHRocm91Z2ggdGhlIHdvcmRzIG9mIHRoZSB0YXJnZXQgcGFyYWdyYXBoIGFuZCBjaGVjayB0aGUgbGluZSB3aWR0aHNcclxuXHRcdFx0Ly8gb25jZSB3ZSByZWFjaCB0aGUgZmluYWwgd29yZCBvZiB0aGUgbGluZSBkcmF3IGEgZ3JhcGhpYyBcclxuXHRcdFx0bGV0IF90YXJnZXRMaW5lID0gMTtcclxuXHRcdFx0X3RhcmdldFBhckFycmF5LmZvckVhY2goKHcsIGkpID0+IHtcclxuXHRcdFx0XHQvLyBpZiB0aGUgbGluZSBvZiBoZSBjdXJyZW50IHdvcmQgaXMgbGVzcyB0aGFuIHRoZSBjdXJyZW50IGxpbmVcclxuXHRcdFx0XHQvLyB1cGRhdGUgdGhlIGN1cnJlbnQgbGluZSBpbmRleCBhbmQgc2V0IHRoZSBncmFwaGljIHdpZHRoXHJcblx0XHRcdFx0Ly8gdG8gdGhlIHdpZHRoIG9mIHRoZSBwcmV2aW91cyB3b3JkXHJcblx0XHRcdFx0aWYgKF90YXJnZXRMaW5lIDwgdy5saW5lKSB7XHJcblx0XHRcdFx0XHQvLyBjcmVhdGUgdGhlIG5ldyBncmFwaGljXHJcblx0XHRcdFx0XHRfdGV4dEJhY2tncm91bmRHcmFwaFxyXG5cdFx0XHRcdFx0XHQuYmVnaW5GaWxsKDB4MDAwNTFiKVxyXG5cdFx0XHRcdFx0XHQuZHJhd1JlY3QoLTUsIF90ZXh0TGluZUhlaWdodCAqIF90YXJnZXRMaW5lLFxyXG5cdFx0XHRcdFx0XHRfdGFyZ2V0UGFyQXJyYXlbaSAtIDFdLndpZHRoICsgMTAsIF90ZXh0TGluZUhlaWdodClcclxuXHRcdFx0XHRcdFx0LmVuZEZpbGwoKTtcclxuXHRcdFx0XHRcdC8vIHVwZGF0ZSB0aGUgdGFyZ2V0IGxpbmUgdmFsdWVcclxuXHRcdFx0XHRcdF90YXJnZXRMaW5lID0gdy5saW5lO1xyXG5cdFx0XHRcdH0gLy8gbGluZSBjb25kaXRpb25hbFxyXG5cdFx0XHR9KTsgLy8gd29yZHMgbG9vcFxyXG5cdFx0XHQvLyBkcmF3IHRoZSBmaW5hbCBsaW5lIGdyYXBoaWNcclxuXHRcdFx0X3RleHRCYWNrZ3JvdW5kR3JhcGhcclxuXHRcdFx0XHQuYmVnaW5GaWxsKDB4MDAwNTFiKVxyXG5cdFx0XHRcdC5kcmF3UmVjdCgtNSwgX3RleHRMaW5lSGVpZ2h0ICogX3RhcmdldExpbmUsXHJcblx0XHRcdFx0X3RhcmdldFBhckFycmF5W190YXJnZXRBcnJheVdvcmRzIC0gMV0ud2lkdGggKyAxMCwgX3RleHRMaW5lSGVpZ2h0KVxyXG5cdFx0XHRcdC5lbmRGaWxsKCk7XHJcblx0XHRcdC8vXHJcblx0XHR9XHJcblxyXG5cdFx0LyogRW1pdCB0aGUgdGV4dCBjb21wbGV0ZSBldmVudCBpZiB0aGUgdXNlciBoYXMgcmVhY2hlZCB0aGUgZmluYWwgcGFyYWdyYXBoIGFuZFxyXG5cdFx0ICogdGhlIGV2ZW50IGhhc24ndCBiZWVuIGVtaXRlZCB5ZXQuIEluIHRoaXMgY2FzZSBpcyBhIHRpbWVyIGNvbnNpZGVyaW5nIHRoZSBcclxuXHRcdCAqIHBhcmFncmFwaCBsZW5ndGguIEFmdGVyIHRoYXQgdGltZXIgaXMgY29tcGxldGUgdGhlIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkLlxyXG5cdFx0ICogSWYgdGhlIHVzZXIgc2Nyb2xscyB0byBhIHByZXZpb3VzIHBhcmFncmFwaCB0aGUgcHJldmlvdXMgY29uZGl0aW9uYWwgYmxvY2tcclxuXHRcdCAqIHdpbGwgYmUgdHJpZ2dlcmVkIGFuZCB3ZSdsbCByZXNldCB0aGUgdGV4dCBjb21wbGV0ZSBib29sZWFuIHRvIGZhbHNlIGFuZCB0aGF0XHJcblx0XHQgKiB3aWxsIGFsbG93IGZvciB0aGlzIGNvbmRpdGlvbmFsIGJsb2NrIHRvIGJlIGV4ZWN1dGVkIGFnYWluLCBzdGFydGluZyB0aGUgXHJcblx0XHQgKiB0ZXh0IGNvbXBsZXRlIHRpbWVyIGFnYWluIGFuZCBzZXR0aW5nIHRoZSB0ZXh0IGNvbXBsZXRlIGJvb2xlYW4gdG8gdHJ1ZS5cclxuXHRcdCAqIENoZWNrIGlmIHRoZSB0ZXh0IGNvbXBsZXRlIGJvb2wgaXMgZmFsc2UgKHRleHQgaGFzbid0IGNvbXBsZXRlZCB5ZXQpIGFuZFxyXG5cdFx0ICogdGhhdCB0aGUgbGFzdCBwYXJhZ3JhcGggaXMgYWxyZWFkeSB2aXNpYmxlLlxyXG5cdFx0Ki9cclxuXHRcdGlmICggIV9pc1RleHRDb21wbGV0ZSAmJiBfdGFyZ2V0UGFyYWdyYXBoID49IF90ZXh0RGF0YS5wYXJhZ3JhcGhzQW1vdW50IC0gMSApIHtcclxuXHRcdFx0Ly8gc2V0IHRoZSB0ZXh0IGNvbXBsZXRlIGJvb2wgdG8gdHJ1ZVxyXG5cdFx0XHRfaXNUZXh0Q29tcGxldGUgPSB0cnVlO1xyXG5cdFx0XHQvLyBjcmVhdGUgYW5kIHN0YXJ0IHRoZSB0aW1lciBcclxuXHRcdFx0X3RleHRDb21wbGV0ZVRpbWVyID0gVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKFxyXG5cdFx0XHRcdHBhcnNlRmxvYXQoKF90ZXh0RGF0YS5wQXJyYXlzW19jdXJycmVudFBhcmFncmFwaEluZGV4XS5sZW5ndGggKiAwLjIpLnRvRml4ZWQoMikpLFxyXG5cdFx0XHRcdF9ldmVudEVtaXR0ZXIsIFtcInRleHRjb21wbGV0ZVwiXVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH0gLy8gdXNlciB0b3VjaCBjb25kaXRpb25hbFxyXG59OyAvLyB0b3VjaCBtb3ZlXHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byB0b2dnbGUgdGhlIHVzZXIgaW50ZXJhY3Rpb24gYm9vbGVhbi5cclxuICogU2V0cyB0aGUgaW50ZXJhY3Rpb24gYm9vbGVhbiAoX2FsbG93VXNlckV2ZW50cykgdG8gdGhlIHZhbHVlXHJcbiAqIHBhc3NlZCBpbiB0aGUgcGFyYW1zLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHYgdGhlIHZhbHVlIHRvIHNldCB0aGUgYm9vbGVhblxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3NldFVzZXJJbnRlcmFjdGlvbiA9IHYgPT4gX2FsbG93VXNlckV2ZW50cyA9IHY7XHJcblxyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gSW5pdCB0aGUgVGV4dCBNb2R1bGVcclxuICogVGhpcyBhZGRzIHRoZSBQSVhJIGluc3RhbmNlcyB0byB0aGUgdGV4dCBzdGFnZSBjb250YWluZXJcclxuICogYW5kIHNldHMgdGhlIGluaXRpYWwgcG9zaXRpb24gb2YgdGhlIHRleHQgYW5kIGJhY2tncm91bmRcclxuICogb25jZSB0aGUgYXBwIGlzIHJlYWR5XHJcbiovXHJcbmV4cG9ydCBjb25zdCBfaW5pdFRleHRNb2R1bGUgPSAoKSA9PiB7XHJcblx0Ly8gYWRkIGl0IHRvIHRoZSB0ZXh0IHN0YWdlXHJcblx0X3RleHRTdGFnZS5hZGRDaGlsZCggX3RleHRCYWNrZ3JvdW5kR3JhcGggKTtcclxuXHRfdGV4dFN0YWdlLmFkZENoaWxkKCBfdGl0bGUgKTtcclxuXHRfdGV4dFN0YWdlLnggPSA1O1xyXG5cdC8vIHNldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgdGV4dCBlbGVtZW50c1xyXG5cdF9zZXRUZXh0RGltZW5zaW9ucygpO1xyXG5cdC8vIG5vdyBwb3NpdGlvbiB0aGUgdGV4dCBhbmQgdGhlIGJhY2tncm91bmQgZ3JhcGhpY3MgZWxlbWVudHNcclxuXHRfdGV4dEJhY2tncm91bmRHcmFwaC5wb3NpdGlvbi5zZXQod2luU2l6ZS53ICogLjE4LCB3aW5TaXplLmggLSBfdGV4dFZlcnRpY2FsUG9zIC0gX3RleHRMaW5lSGVpZ2h0KTtcclxuXHQvLyBhdHRhY2ggdGFwIGV2ZW50IHRvIHRoZSB0ZXh0IGNvbnRhaW5lclxyXG5cdF90ZXh0U3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG5cdF90ZXh0U3RhZ2VcclxuXHRcdC5vbihcInRvdWNoc3RhcnRcIiwgX3RleHRUYXBTdGFydClcclxuXHRcdC5vbihcIm1vdXNlZG93blwiLCBfdGV4dFRhcFN0YXJ0KVxyXG5cdFx0Lm9uKFwidG91Y2hlbmRcIiwgX3RleHRUYXBFbmQpXHJcblx0XHQub24oXCJtb3VzZXVwXCIsIF90ZXh0VGFwRW5kKVxyXG5cdFx0Lm9uKFwidG91Y2hlbmRvdXRzaWRlXCIsIF90ZXh0VGFwRW5kT3V0KVxyXG5cdFx0Lm9uKFwibW91c2V1cG91dHNpZGVcIiwgX3RleHRUYXBFbmRPdXQpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKiBNZXRob2QgZm9yIHRoZSByZXNpemUgZXZlbnRcclxuICogT24gdGhlIHJlc2l6ZSBldmVudCwgcmVnYXJkbGVzcyBpZiB0aGUgaGVpZ2h0IGJyZWFrcG9pbnQgaXMgcGFzc2VkXHJcbiAqIG9yIG5vdCwgd2UgbmVlZCB0byByZXN0YXJ0IHRoZSB0ZXh0IGFuaW1hdGlvbiBhbmQgcG9zaXRpb24gdGhlIHRleHRcclxuICogYW5kIHRoZSBiYWNrZ3JvdW5kIGFjY29yZGluZyB0byB0aGUgbmV3IHNjcmVlbiBkaW1lbnNpb25zLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3Jlc2l6ZVRleHRFdmVudCA9ICgpID0+IHtcclxuXHJcblx0Ly8gc3RvcCBhbGwgZGVsYXllZCBjYWxscy5cclxuXHRfcGFyR2FwID8gX3BhckdhcC5wYXVzZSgpLmtpbGwoKSA6IG51bGw7XHJcblx0aWYgKCBfYWRkV29yZERlbGF5ZWRDYWxsICkgeyAgX2FkZFdvcmREZWxheWVkQ2FsbC5wYXVzZSgpLmtpbGwoKTsgfTtcclxuXHRpZiAoIF90ZXh0Q29tcGxldGVUaW1lciApIHsgX3RleHRDb21wbGV0ZVRpbWVyLnBhdXNlKCkua2lsbCgpOyB9O1xyXG5cdC8qIHNldCB0aGUgYWRkIHdvcmQgZGVsYXllZCBjYWxsIHRvIHVuZGVmaW5lZFxyXG5cdCAqIFRoaXMgaW4gY2FzZSB0aGUgcmVzaXplIGV2ZW50IHRyaWdnZXJzIGJlZm9yZSBpcyByZXN0YXJ0ZWRcclxuXHQgKiB3aGljaCBjb3VsZCB0aHJvdyBhbiBlcnJvclxyXG5cdCovXHJcblx0X2FkZFdvcmREZWxheWVkQ2FsbCA9IHVuZGVmaW5lZDtcclxuXHRfdGV4dENvbXBsZXRlVGltZXIgPSB1bmRlZmluZWQ7XHJcblx0Ly8gc2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgdGV4dCBhbmQgYmFja2dyb3VuZCBlbGVtZW50c1xyXG5cdF90aXRsZS5wb3NpdGlvbi5zZXQoIHdpblNpemUudyAqIC4xOCwgd2luU2l6ZS5oIC0gX3RleHRWZXJ0aWNhbFBvcyApO1xyXG5cdF90ZXh0QmFja2dyb3VuZEdyYXBoLnBvc2l0aW9uLnNldCggd2luU2l6ZS53ICogLjE4LCB3aW5TaXplLmggLSBfdGV4dFZlcnRpY2FsUG9zIC0gX3RleHRMaW5lSGVpZ2h0ICk7XHJcblx0Ly8gc2V0IHRoZSB0ZXh0IGRpbWVuc2lvbnNcclxuXHRfc2V0VGV4dERpbWVuc2lvbnMoKTtcclxuXHJcblx0Ly8gbm93IHJlc2V0IHRoZSB0ZXh0cyBvZiB0aGUgc2xpZGVcclxuXHRfcmVzZXRUZXh0RGF0YSgpO1xyXG5cdC8vIGluIHRoZSBjYXNlIG9mIGEgcmVzaXplIHdoaWxlIGEgbmV3IGdyb3VwIGlzIGJlaW5nIGxvYWRlZCBvciB0aGVcclxuXHQvLyB0ZXh0IGlzIG5vdCBwcm9jZXNzZWQsIGNyZWF0ZSBhIGNvbmRpdGlvbmFsIHRvIGNoZWNrIGlmIHRoZVxyXG5cdC8vIHRleHQgZGF0YSBpcyBzZXRcclxuXHQvLyBzb2x2ZXMgIzY1XHJcblx0Ly8gaHR0cHM6Ly9naXRsYWIuY29tL3JoZXJuYW5kb2cvYWludy1waXhpLWNvbXBvbmVudC9pc3N1ZXMvNjVcclxuXHRpZiAoIF9hcHBJbml0aWFsaXplZCApIHtcclxuXHRcdC8vIG5vdyBjcmVhdGUgdGhlIHRleHQgZGF0YSBmb3IgdGhlIG5ldyBzY3JlZW4gc2l6ZVxyXG5cdFx0X2NyZWF0ZVNsaWRlVGV4dChfdGl0bGVUZXh0T2JqZWN0LCBfc3VidGl0bGVUZXh0T2JqZWN0KTtcclxuXHRcdC8vIGZpbmFsbHkgcmVzdGFydCB0aGUgYWRkIHdvcmQgZGVsYXllZCBjYWxsXHJcblx0XHRfYWRkV29yZERlbGF5ZWRDYWxsID0gVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKF93b3JkU3BlZWQsIF9hZGRXb3JkKTtcclxuXHR9IC8vIHRleHQgZGF0YSBzZXQgY29uZGl0aW9uYWxcclxuXHJcbn07IC8vIHJlc2l6ZSBldmVudCBjb25kaXRpb25hbCBlbmRcclxuIiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBURVhUVVJFUyBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG4vLyBnZXQgdGhlIHNjcmVlbiBkaW1lbnNpb25zXHJcbmltcG9ydCB7IHdpblNpemUgfSBmcm9tIFwiLi93aW5kb3dcIjtcclxuaW1wb3J0IHsgX3NsaWRlc0RhdGEgfSBmcm9tIFwiLi9hamF4LW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXggdG8gY2hlY2sgd2hpY2ggdGV4dHVyZSBzaG91bGQgYmUgbG9hZGVkXHJcbmltcG9ydCB7IF9jdXJyZW50U2xpZGVJbmRleCB9IGZyb20gXCIuL3NsaWRlLWNoYW5nZS1tb2R1bGUuanNcIjtcclxuLy8gZ2V0IHRoZSBtZXRob2QgdG8gdXBkYXRlIHRoZSBtYWluIHNsaWRlJ3MgdGV4dHVyZVxyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byBzZXQgdGhlIGFwcCBpbml0aWFsaXphdGlvbiBib29sZWFuIGJhY2sgdG8gdHJ1ZVxyXG5pbXBvcnQgeyBfdXBkYXRlTWFpblNsaWRlVGV4dHVyZSwgX3Jlc2V0QXBwSW5pdEJvb2wsIF9hcHBJbml0aWFsaXplZCB9IGZyb20gXCIuL3NsaWRlLW1vZHVsZS5qc1wiO1xyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byByZXNldCB0aGUgaW50ZXJhY3Rpb24gYm9vbHNcclxuaW1wb3J0IHsgX3NldEludGVyYWN0aW9uQm9vbHMgfSBmcm9tIFwiLi9pbnRlcmFjdGlvbi1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBhbmltYXRpb24gc3RvcmVcclxuLy8gaW1wb3J0IHsgX2FuaW1hdGlvblN0b3JlIH0gZnJvbSBcIi4vYW5pbWF0aW9uL2FuaW1hdGlvbi1zdG9yZVwiO1xyXG4vLyBnZXQgdGhlIGNvbG9yIHJvdGF0aW9uIG1ldGhvZFxyXG4vLyBpbXBvcnQgeyBfcm90YXRlQ29sb3IgfSBmcm9tIFwiLi90ZXh0dXJlc1wiO1xyXG4vLyBnZXQgdGhlIHZlbnQgZW1pdHRlciBcclxuaW1wb3J0IHsgX2V2ZW50RW1pdHRlciB9IGZyb20gXCIuL2dsb2JhbC1jbGFzcy1tb2R1bGVcIjtcclxuXHJcblxyXG5cclxuLy8gYXJyYXkgdGhhdCBob2xkcyB0aGUgYmFzZSB0ZXh0dXJlc1xyXG5leHBvcnQgbGV0IF90ZXh0dXJlc0FycmF5ID0gW107XHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byByZXNldCB0aGUgdGV4dHVyZXMgYW5pbWF0aW9uIHR5cGUuXHRcclxuICogIFJ1biB3aGVuIHRoZSB3aW5kb3cgcmVzaXplIGV2ZW50IGhhcHBlbnMgKG9yaWVudGF0aW9uIGNoYW5nZSkuXHRcclxuICogXHRUaGlzIG1ldGhvZCB3aWxsIHJ1biBhIGxvb3AgdGhyb3VnaCB0aGUgdGV4dHVyZXMgYXJyYXkgYW5kIGNhbGxcclxuICogXHR0aGUgbWV0aG9kcyB0byBzZXQgdGhlIHRleHR1cmUgc2NhbGUgYW5kIHRoZSBhbmltYXRpb24gdHlwZSBmb3JcclxuICogXHRlYWNoIHRleHR1cmUgd2l0aCB0aGUgbmV3IHNjcmVlbiBkaW1lbnNpb25zLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3Jlc2V0U2NhbGVQb3NpdGlvbiA9ICgpID0+IHtcclxuXHRfdGV4dHVyZXNBcnJheS5mb3JFYWNoKCAoYnQsIGkpID0+IHtcclxuXHRcdC8vIGNoZWNrIGlmIHRoZSB0ZXh0dXJlIGlzIGxvYWRlZCBvciBmYWlsZWRcclxuXHRcdC8vIGlmIHRoZSB0ZXh0dXJlIGlzIG5vdCBsb2FkZWQgZG9uJ3QgZG8gYW55dGhpbmdcclxuXHRcdGlmKCBidCApe1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyggYGN1ciB0ZXh0ID0+ICR7aX1gICk7XHJcblx0XHRcdC8vIHNldCB0aGUgdGV4dHVyZSBzY2FsZVxyXG5cdFx0XHRfc2V0VGV4dHVyZVNjYWxlKGJ0KTtcclxuXHRcdFx0Ly8gc2V0IHRoZSBhbmltYXRpb24gdHlwZVxyXG5cdFx0XHRfc2V0QW5pbWF0aW9uVHlwZShidCwgaSk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCBgdHlwZSA9PiAke2J0Ll9nZW5lcmljQW5pbWF0aW9uVHlwZX1gICk7XHJcblx0XHR9IC8vIGNvbmRpdGlvbmFsIGVuZFxyXG5cdFx0Ly8gd2hlbiB0aGUgY3VycmVudCBzbGlkZSBpbmRleCBpcyB0aGUgY3VycmVudCBvbmUgb2YgdGhlIGxvb3BcclxuXHRcdC8vIHVwZGF0ZSB0aGUgdGV4dHVyZSBvZiB0aGUgbWFpbiBzbGlkZVxyXG5cdFx0aWYgKGkgPT09IF9jdXJyZW50U2xpZGVJbmRleCkgX3VwZGF0ZU1haW5TbGlkZVRleHR1cmUoIGJ0ICk7XHJcblx0fSk7IC8vIGxvb3AgZW5kXHJcbn07IC8vIHJlc2V0IHNjYWxlIHBvc2l0aW9uXHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byBSZXNldCBUaGUgVGV4dHVyZXMgQXJyYXlcclxuICogIFRoaXMgbWV0aG9kIHNldHMgdGhlIHRleHR1cmVzIGFycmF5IHRvIGFuIGVtcHR5IGFycmF5IGFuZCB0aGVuXHJcbiAqIFx0Y2FsbHMgdGhlIG1ldGhvZCB0byBwb3B1bGF0ZSB0aGUgYXJyYXkgdXNpbmcgdGhlIHNsaWRlcyBkYXRhLlxyXG4gKiBcdFRoaXMgc2hvdWxkIGJlIGNhbGxlZCBhZnRlciB0aGUgYWpheCByZXNwb25zZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IF9yZXNldFRleHR1cmVzQXJyYXkgPSAoKSA9PiB7XHJcblx0Ly8gY29uc29sZS5sb2coX3NsaWRlc0RhdGEpO1xyXG5cdC8vIGRlc3Ryb3kgdGhlIGN1cnJlbnQgdGV4dHVyZXNcclxuXHRfdGV4dHVyZXNBcnJheS5mb3JFYWNoKCBlID0+IHtcclxuXHRcdGUgPyBlLmRlc3Ryb3koKSA6IG51bGw7XHJcblx0XHRlID8gZS5kaXNwb3NlKCkgOiBudWxsO1xyXG5cdH0pO1xyXG5cdC8vIGVtcHR5IHRoZSB0ZXh0dXJlcyBhcnJheVxyXG5cdF90ZXh0dXJlc0FycmF5ID0gW107XHJcblx0Ly8gY2FsbCB0aGUgbWV0aG9kIHRvIHBvcHVsYXRlIHRoZSBhcnJheVxyXG5cdF9jcmVhdGVUZXh0dXJlc0FycmF5KCk7XHJcbn07XHJcblxyXG5cclxuLyoqIFNldCBUZXh0dXJlIEFuaW1hdGlvbiBUeXBlXHRcclxuICogIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gc2V0IHRoZSBhbmltYXRpb24gdHlwZSBmb3IgYSBiYXNlIHRleHR1cmUuXHRcclxuICogXHRUYWtlIHRoZSB0ZXh0dXJlJ3MgbWFuZGF0aW5nIHNjYWxlIGFuZCB2ZXJ0aWNhbCByYXRpbyBib29sLCB0aGVuXHJcbiAqIFx0Y2hlY2sgaWYgdGhlIHNjYWxlZCBkaW1lbnNpb24gZXhjZXNzIGlzIDE5LjUlIGJpZ2dlciB0aGFuIHRoZSBzY2FsZWRcclxuICogXHRkaW1lbnNpb24gKHdpZHRoIC8gaGVpZ2h0KS4gQmFzZWQgb24gdGhhdCBzZXQgdGhlIGdlbmVyaWMgYW5pbWF0aW9uXHJcbiAqIFx0dHlwZSBmb3IgdGhlIHRleHR1cmUuXHRcclxuICogXHRUaGUgZ2VuZXJpYyBhbmltYXRpb24gdHlwZSBjb3VsZCBjaGFuZ2UgZHVyaW5nIHRoZSBjb2RlIGV4ZWN1dGlvbiBqdXN0XHJcbiAqIFx0aWYgdHdvIGNvbnNlY3V0aXZlIHZlcnRpY2FsIGFuaW1hdGlvbnMgd2lsbCBoYXBwZW4sIGluIHRoYXQgY2FzZSB0aGUgY29kZVxyXG4gKiBcdHdpbGwgZGVmYXVsdCB0byBhIHpvb20gYW5pbWF0aW9uLlxyXG4gKiBcdEBwYXJhbSB7b2JqZWN0fSBiOiBhIFBJWEkgYmFzZSB0ZXh0dXJlLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3NldEFuaW1hdGlvblR5cGUgPSAoYiwgaT1udWxsKSA9PiB7XHJcblx0Ly8gY3JlYXRlIGEgc2luZ2xlIHZhcmlhYmxlIGZvciB0aGUgc2NhbGVkIGRpbWVuc2lvblxyXG5cdGxldCBfc2NhbGVkRGltO1xyXG5cdC8vIGdldCB0aGUgdmVydGljYWwgYm9vbGVhbiB0byBzZWUgdGhlIGRpbWVuc2lvbnMgd2Ugc2hvdWxkIGNvbXBhcmVcclxuXHRpZiggYi5fdlJhdGlvICkge1xyXG5cdFx0Ly8gdHJ1ZSwgdGhlIGFuaW1hdGlvbiBzaG91bGQgYmUgdmVydGljYWwsIGNoZWNrIHRoZSBzY2FsZWQgaGVpZ2h0XHJcblx0XHRfc2NhbGVkRGltID0gYi5yZWFsSGVpZ2h0ICogYi5fc2NhbGVSYXRpbztcclxuXHRcdGNvbnN0IF9zY2FsZWRIZWlnaHRFeGNlc3MgPSBfc2NhbGVkRGltIC0gd2luU2l6ZS5oO1xyXG5cdFx0Y29uc3QgX2ltYWdlRXhjZXNzID0gKCBfc2NhbGVkSGVpZ2h0RXhjZXNzIC8gX3NjYWxlZERpbSApICogMTAwID4gMTkuNTtcclxuXHRcdFxyXG5cdFx0Ly8gZGVwZW5kaW5nIG9uIHRoZSByZXN1bHQgb2YgdGhpcyB2YXJpYWJsZSAodHJ1ZSAvIGZhbHNlKSBpZiB0aGUgYW5pbWF0aW9uXHJcblx0XHQvLyBzaG91bGQgYmUgdmVydGljYWwgb3Igem9vbSwgZm9yIHRoZSBjdXJyZW50IHNjcmVlbiBkaW1lbnNpb25zXHJcblx0XHRiLl9nZW5lcmljQW5pbWF0aW9uVHlwZSA9IF9pbWFnZUV4Y2VzcyA/IDAgOiAyO1xyXG5cdFx0Ly8gc3RvcmUgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgc2NhbGVkIHRleHR1cmUgYW5kIHRoZSBzY3JlZW4gc2l6ZVxyXG5cdFx0Yi5fc2NhbGVkSGVpZ2h0RXhjZXNzID0gX3NjYWxlZEhlaWdodEV4Y2VzcztcclxuXHRcdC8vIHNldCB0aGUgb3RoZXIgdG8gbnVsbCBpbiBvcmRlciB0byBnZXQganVzdCB0aGUgb25lIHdpdGggYSB2YWx1ZSB3aGVuIHRoZSBcclxuXHRcdC8vIHN0cmlwZXMgYXJlIGNyZWF0ZWQgXHJcblx0XHRiLl9zY2FsZWRXaWR0aEV4Y2VzcyA9IG51bGw7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHRydWUgdGhlIGFuaW1hdGlvbiBzaG91bGQgYmUgaG9yaXpvbnRhbFxyXG5cdFx0X3NjYWxlZERpbSA9IGIucmVhbFdpZHRoICogYi5fc2NhbGVSYXRpbztcclxuXHRcdGNvbnN0IF9pbWFnZUV4Y2VzcyA9ICggKCBfc2NhbGVkRGltIC0gd2luU2l6ZS53ICkgLyBfc2NhbGVkRGltICkgKiAxMDAgPiAxOS41O1xyXG5cdFx0Ly8gZGVwZW5kaW5nIG9uIHRoZSByZXN1bHQgb2YgdGhpcyB2YXJpYWJsZSAodHJ1ZSAvIGZhbHNlKSBpZiB0aGUgYW5pbWF0aW9uXHJcblx0XHQvLyBzaG91bGQgYmUgaG9yaXpvbnRhbCBvciB6b29tLCBmb3IgdGhlIGN1cnJlbnQgc2NyZWVuIGRpbWVuc2lvbnNcclxuXHRcdGIuX2dlbmVyaWNBbmltYXRpb25UeXBlID0gX2ltYWdlRXhjZXNzID8gMSA6IDI7XHJcblx0XHQvLyBzdG9yZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBzY2FsZWQgdGV4dHVyZSBhbmQgdGhlIHNjcmVlbiB3aWR0aFxyXG5cdFx0Yi5fc2NhbGVkV2lkdGhFeGNlc3MgPSBfc2NhbGVkRGltIC0gd2luU2l6ZS53O1xyXG5cdFx0Yi5fc2NhbGVkSGVpZ2h0RXhjZXNzID0gbnVsbDtcclxuXHR9IC8vIHZlcnRpY2FsIHJhdGlvIGNvbmRpdGlvbmFsXHJcbn07IC8vIHNldCBhbmltYXRpb24gdHlwZVxyXG5cclxuXHJcbi8qKiBNZXRob2QgdG8gc2V0IHRoZSBCYXNlIFRleHR1cmUgRml0IFNjYWxlLlx0XHJcbiAqICBUaGlzIGNoZWNrcyB0aGUgbG9hZGVkIHRleHR1cmUgcmVhbCBkaW1lbnNpb25zIGFnYWluc3QgdGhlIGN1cnJlbnQgc2NyZWVuXHJcbiAqIFx0c2l6ZSBhbmQgc3RvcmVzIHRoZSBtYW5kYXRpbmcgcmF0aW8gYW5kIHZlcnRpY2FsIGJvb2xlYW4gaW4gdGhlIHRleHR1cmUuXHRcclxuICogXHRJbiB0aGUgY2FzZSBvZiBhbiBvcmllbnRhdGlvbiBjaGFuZ2UsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgZm9yIGVhY2hcclxuICogXHRjb3JyZWN0bHkgbG9hZGVkIHRleHR1cmUuXHJcbiAqIFx0QHBhcmFtIHtvYmplY3R9IGI6IGEgUElYSSBiYXNlIHRleHR1cmVcclxuKi9cclxuZXhwb3J0IGNvbnN0IF9zZXRUZXh0dXJlU2NhbGUgPSBiID0+IHtcclxuXHQvLyBnZXQgdGhlIG1hbmRhdGluZyByYXRpbyB0byBmaXQgdGhlIGltYWdlIGluIHRoZSBjdXJyZW50IHNjcmVlbiBzaXplXHJcblx0Ly8gaXMgdGhlIGJpZ2dlc3Qgc2NhbGUgdGhhdCBzaG91bGQgYmUgdXNlZCB0byBmaXQgb25lIG9mIHRoZSBkaW1lbnNpb25zIGluIHRoZSBcclxuXHQvLyBjb3JyZXNwb25kaW5nIHNjcmVlbiBkaXJlY3Rpb24gKGhlaWdodCBvciB3aWR0aCkuXHJcblx0Ly8gdmVydGljYWwgcmF0aW8gLSBoZWlnaHRcclxuXHRjb25zdCBfdnIgPSAod2luU2l6ZS5oIC8gYi5yZWFsSGVpZ2h0KTtcclxuXHQvLyBob3Jpem9udGFsIHJhdGlvIC0gd2lkdGhcclxuXHRjb25zdCBfaHIgPSAod2luU2l6ZS53IC8gYi5yZWFsV2lkdGgpO1xyXG5cdGNvbnN0IF9zY2FsZVJhdGlvID0gTWF0aC5tYXgoIF9ociwgX3ZyICk7XHJcblx0Ly8gdGhlIHZlcnRpY2FsIHJhdGlvIGJvb2xlYW4sIGluZGljYXRlcyBpZiB0aGUgaG9yaXpvbnRhbCByYXRpbyBpcyBiaWdnZXIgdGhhbiB0aGVcclxuXHQvLyB2ZXJ0aWNhbCByYXRpby4gVGhpcyBpcyB1c2VkIHRvIGNoZWNrIGlmIHRoZSBidXJucyBlZmZlY3Qgc2hvdWxkIGJlIHZlcnRpY2FsXHJcblx0Ly8gKHRydWUpIG9yIGhvcml6b250YWwgKGZhbHNlKVxyXG5cdGNvbnN0IF92UmF0aW8gPSBfaHIgPiBfdnI7XHJcblx0Ly8gc3RvcmUgdGhlIHNjYWxlIHJhdGlvIGFuZCB0aGUgdmVydGljYWwgcmF0aW8gYm9vbCBpbiB0aGUgdGV4dHVyZVxyXG5cdGIuX3NjYWxlUmF0aW8gPSBfc2NhbGVSYXRpbztcclxuXHRiLl92UmF0aW8gPSBfdlJhdGlvO1xyXG5cdGIuX3NjYWxlZFdpZHRoID0gYi5yZWFsV2lkdGggKiBfc2NhbGVSYXRpbztcclxuXHRiLl9zY2FsZWRIZWlnaHQgPSBiLnJlYWxIZWlnaHQgKiBfc2NhbGVSYXRpbztcclxufTtcclxuXHJcblxyXG4vKiogTWV0aG9kIHRvIENyZWF0ZSBhIFBJWEkgQmFzZSBUZXh0dXJlXHJcbiAqICBUaGlzIG1ldGhvZCBjcmVhdGVzIGEgbmV3IGJhc2UgdGV4dHVyZSBhbmQgdGhlIGxvYWRlZCBhbmQgZXJyb3JcclxuICogXHRldmVudCBjYWxsYmFja3MuXHJcbiAqIFx0VGhpcyB0d28gZXZlbnRzIHdpbGwgdXBkYXRlIHRoZSB0ZXh0dXJlcyBhcnJheSBhbmQgdGhlIG1haW4gc2xpZGUnc1xyXG4gKiBcdHRleHR1cmUuXHJcbiAqIFx0QHBhcmFtIHtzdHJpbmd9IHU6IHRoZSBpbWFnZSB1cmxcclxuICogXHRAcGFyYW0ge251bWJlcn0gaTogdGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSB0ZXh0dXJlIGluIHRoZSBhcnJheVxyXG4qL1xyXG5jb25zdCBfbG9hZFRleHR1cmVJbWFnZSA9ICh1LGkpID0+IHtcclxuXHQvLyBjcmVhdGUgdGhlIGJhc2UgdGV4dHVyZVxyXG5cdGNvbnN0IF9iID0gbmV3IFBJWEkuQmFzZVRleHR1cmUuZnJvbUltYWdlKHUsdHJ1ZSk7XHJcblx0XHJcblx0X2JcclxuXHRcdC5vbihcImxvYWRlZFwiLCBlID0+IHtcclxuXHRcdFx0Ly8gbW92ZSB0aGlzIHRvIHRoZSB3aW5kb3cgbW9kdWxlIGFuZCBjYWxjdWxhdGUgdGhpcyBvbiBzdGFydHVwIGFuZFxyXG5cdFx0XHQvLyB0aGUgcmVzaXplIGV2ZW50XHJcblx0XHRcdHZhciByZWR1Y2VyID0gTWF0aC5yb3VuZCggTWF0aC5tYXgoIHdpblNpemUudywgd2luU2l6ZS5oICkgKiAwLjcgKTtcclxuXHRcdFx0Ly8gY2hlY2sgdGhlIGltYWdlIHJlc29sdXRpb25cclxuXHRcdFx0bGV0IF9zYWZlUmVzID0gZS5pbWFnZVR5cGUgPT09IFwiZ2lmXCIgPyAxMDAwIDogcmVkdWNlcjtcclxuXHRcdFx0LyogdGhlIG5ldyBiYXNlIHRleHR1cmVcclxuXHRcdFx0ICogdGhpcyB3aWlsbCBiZSBhZGRlZCB0byB0aGUgdGV4dHVyZXMgYXJyYXkuXHJcblx0XHRcdCAqIGRlcGVuZGluZyBvbiB0aGUgaW1hZ2UncyByZXNvbHV0aW9uLCB0aGlzIHdpbGwgYmUgdGhlIHRleHR1cmVcclxuXHRcdFx0ICogbG9hZGVkIG9yIGEgbmV3IGNyZWF0ZWQgdGV4dHVyZSBmcm9tIGEgcmVkdWNlZCBvbmUgaW4gb3JkZXIgdG8gXHJcblx0XHRcdCAqIG9wdGltaXplIHRoZSBhcHAuXHJcblx0XHRcdCAqIEJ5IGRlZmF1bHQgd2Ugc2V0IHRoZSB0ZXh0dXJlIHRvIGJlIHRoZSBvbmUgYmVpbmcgbG9hZGVkLiBJZiB0aGVcclxuXHRcdFx0ICogcmVzb2x1dGlvbiBpcyBiaWdnZXIgdGhhbiB0aGUgdGhyZXNob2xkLCB0aGUgd2UgY3JlYXRlIGEgbmV3IHRleHR1cmVcclxuXHRcdFx0ICogYmFzZWQgb24gdGhlIG9wdGltaXphdGlvbiBjb2RlLlxyXG5cdFx0XHQqL1xyXG5cdFx0XHRsZXQgX2Jhc2UgPSBlO1xyXG5cdFx0XHQvLyBjaGVjayBpZiB0aGUgZGltZW5zaW9ucyBvZiB0aGUgaW1hZ2UgcGFzcyB0aGUgc2FmZSByZXNvbHV0aW9uXHJcblx0XHRcdGlmIChlLnJlYWxXaWR0aCA+IF9zYWZlUmVzICYmIGUucmVhbEhlaWdodCA+IF9zYWZlUmVzKSB7XHJcblx0XHRcdFx0bGV0IF9uZXdSZXNvbHV0aW9uID0gZS5yZWFsSGVpZ2h0ID4gZS5yZWFsV2lkdGggPyAoZS5yZWFsV2lkdGggLyBfc2FmZVJlcykgOiAoZS5yZWFsSGVpZ2h0IC8gX3NhZmVSZXMpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnN0IG5ld1cgPSBNYXRoLmZsb29yKGUucmVhbFdpZHRoIC8gX25ld1Jlc29sdXRpb24pO1xyXG5cdFx0XHRcdGNvbnN0IG5ld0ggPSBNYXRoLmZsb29yKGUucmVhbEhlaWdodCAvIF9uZXdSZXNvbHV0aW9uKTtcclxuXHJcblx0XHRcdFx0Ly8gY3JlYXRlIGEgbmV3IGNhbnZhcyBlbGVtZW50XHJcblx0XHRcdFx0Y29uc3QgZXh0cmFjdENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5cdFx0XHRcdGV4dHJhY3RDYW52YXMud2lkdGggPSBuZXdXO1xyXG5cdFx0XHRcdGV4dHJhY3RDYW52YXMuaGVpZ2h0ID0gbmV3SDtcclxuXHRcdFx0XHRjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0XHRcdGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuXHRcdFx0XHRcdGV4dHJhY3RDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgbmV3VywgbmV3SCk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRpbWFnZS5zcmMgPSB1O1xyXG5cdFx0XHRcdC8vIHNldCB0aGUgYmFzZSB0ZXh0dXJlIHRvIHRoZSBvbmUgZXh0cmFjdGVkIGZyb20gdGhlIGNhbnZhcyBlbGVtZW50XHJcblx0XHRcdFx0X2Jhc2UgPSBuZXcgUElYSS5CYXNlVGV4dHVyZShleHRyYWN0Q2FudmFzKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvL3dlIG5lZWQgdG8gZGVzdHJveSB0aGUgb2xkIGJhc2VUZXh0dXJlID4gaW1wb3J0YW50XHJcblx0XHRcdFx0ZS5kZXN0cm95KCk7XHJcblx0XHRcdH0gLy8gaW1hZ2UgcmVzb2x1dGlvbiBjb25kaXRpb25hbFxyXG5cclxuXHRcdFx0Ly8gdXBkYXRlIHRoZSB0ZXh0dXJlIGFycmF5IHdpdGggdGhlIGJhc2UgdGV4dHVyZVxyXG5cdFx0XHRfdGV4dHVyZXNBcnJheS5zcGxpY2UoaSwgMSwgX2Jhc2UpO1xyXG5cdFx0XHQvLyBzZXQgdGhlIGJhc2UgdGV4dHVyZSdzIHNjYWxlIGFuZCB2ZXJ0aWNhbCByYXRpbyBib29sXHJcblx0XHRcdF9zZXRUZXh0dXJlU2NhbGUoX2Jhc2UpO1xyXG5cdFx0XHQvKlx0c2V0IHRoZSBnZW5lcmljIGFuaW1hdGlvbiB0eXBlIGZvciB0aGUgYmFzZSB0ZXh0dXJlLlxyXG5cdFx0XHQgKlx0dGhpcyBjb3VsZCBjaGFuZ2UgZHVyaW5nIHRoZSBjb2RlJ3MgZXhlY3V0aW9uLCBkZXBlbmRpbmcgb24gdGhlXHJcblx0XHRcdCAqXHRwcmV2aW91cyBnZW5lcmljIGFuaW1hdGlvblxyXG5cdFx0XHQqL1xyXG5cdFx0XHRfc2V0QW5pbWF0aW9uVHlwZShfYmFzZSwgaSk7XHJcblx0XHRcdC8vIGNoZWNrIGlmIHRoZSBjdXJyZW50IHNsaWRlIGluZGV4IGlzIHRoZSBzYW1lIG9mIHRoaXMgdGV4dHVyZVxyXG5cdFx0XHQvLyBhbHNvIGNoZWNrIGlmIHRoZXJlJ3MgYSB1c2VyIGludGVyYWN0aW9uLCBpbiB0aGF0IGNhc2UgdXBkYXRlIHRoZSBcclxuXHRcdFx0Ly8gbWFpbiBzbGlkZSBhbmQgdGhlIGN1cnJlbnQgc3RyaXBlc1xyXG5cdFx0XHQvLyBDaGVjayBpZiBhIG5ldyBncm91cCBpcyBiZWluZyBsb2FkZWQsIGluIHRoYXQgY2FzZSBkb24ndCB1cGRhdGVcclxuXHRcdFx0Ly8gdGhlIHNsaWRlIHRleHR1cmUgaW4gb3JkZXIgdG8gcHJldmVudCB0aGUgbWFpbiBzbGlkZSBmcm9tIGJlaW5nIHZpc2libGVcclxuXHRcdFx0Ly8gd2hpbGUgdGhlIG5ldyBncm91cCBkYXRhIGlzIGJlaW5nIGZldGNoZWQuIFdoZW4gYSBuZXcgZ3JvdXAgaXMgcmVxdWVzdGVkXHJcblx0XHRcdC8vIHRoZSBhcHAgaW5pdCBib29sZWFuIGlzIHNldCB0byBmYWxzZS5cclxuXHRcdFx0Ly8gaWYgaXMgdGhlIHNhbWUgdXBkYXRlIHRoZSBzbGlkZSdzIHRleHR1cmVcclxuXHRcdFx0aWYoIGkgPT09IF9jdXJyZW50U2xpZGVJbmRleCAmJiBfYXBwSW5pdGlhbGl6ZWQgKSB7XHJcblx0XHRcdFx0X3VwZGF0ZU1haW5TbGlkZVRleHR1cmUoX2Jhc2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0Lm9uKFwiZXJyb3JcIiwgKCk9PntcclxuXHRcdFx0LyogIEltYWdlIGZhaWxlZC4gU2V0IHRoZSB2YWx1ZSBmb3IgdGhlIGN1cnJlbnQgc2xpZGUgdG8gZmFsc2UuXHJcblx0XHRcdCAqICBXaGVuIGNyZWF0aW5nIHRoZSBzdHJpcGVzIGFuZCB1cGRhdGluZyB0aGUgdGV4dHVyZSwgdGhlIGNvZGVcclxuXHRcdFx0ICogXHR3aWxsIGNoZWNrIGZvciBlaXRoZXIgZmFsc2UvbnVsbCBhbmQgd2lsbCBjcmVhdGUgZ3JhcGhpY3MgaW5zdGVhZFxyXG5cdFx0XHQgKiBcdG9mIHN0cmlwZXMgYW5kIHVwZGF0ZSB0aGUgbWFpbiBzbGlkZSdzIHRleHR1cmUgdXNpbmcgYSBjb2xvciBmaWxsZWRcclxuXHRcdFx0ICogXHR0ZXh0dXJlLlxyXG5cdFx0XHQqL1xyXG5cdFx0XHRfdGV4dHVyZXNBcnJheS5zcGxpY2UoaSwgMSwgZmFsc2UgKTtcclxuXHRcdFx0Y29uc29sZS5sb2coIFwiZXJyb3JcIiwgaSApO1xyXG5cdFx0fSk7XHJcbn07XHJcblxyXG4vKiogTWV0aG9kIHRvIGxvYWQgdGhlIGZpcnN0L2xhc3QgMyB0ZXh0dXJlcyBvZiB0aGUgdGV4dHVyZXMgYXJyYXkuXHJcbiAqICBUaGlzIG1ldGhvZCBhY3RzIGxpa2UgYW4gaW5pdCBtZXRob2QgZm9yIHRoZSBhcnJheS5cclxuICogXHRJcyBjYWxsZWQgd2hlbiBhIG5ldyBzZXQgb2Ygc2xpZGVzIGlzIHJlcXVlc3RlZC5cclxuICovXHJcbmNvbnN0IF9pbml0VGV4dHVyZXNBcnJheSA9ICgpID0+IHtcclxuXHQvLyBURVNUIENPREUgVVNFUyBBTEwgVEVYVFVSRVMgQVQgT05DRVxyXG5cdF9zbGlkZXNEYXRhLmZvckVhY2goKGUsaSk9PntcclxuXHRcdC8vIGNvbnNvbGUubG9nKCBlLmltYWdlICk7XHJcblx0XHRfbG9hZFRleHR1cmVJbWFnZShlLmltYWdlLCBpKTtcclxuXHR9KTtcclxuXHQvLyBub3cgdGhhdCB0aGUgdGV4dHVyZXMgYXJlIGFkZGVkIHRvIHRoZSBhcnJheSwgc2V0IHRoZSBpbml0aWFsaXplZCBhcHBcclxuXHQvLyBib29sZWFuIHRvIHRydWUgaW4gb3JkZXIgdG8gYWxsb3cgdGhlIHVzZXIgaW50ZXJhY3Rpb25cclxuXHRfcmVzZXRBcHBJbml0Qm9vbCh0cnVlKTtcclxuXHQvKlx0aWYgdGhlIHVzZXIgZGVzdHJveXMgdGhlIHNsaWRlciB0byB1cGRhdGUgdGhlIHNldHRpbmdzLCB0aGUgaW50ZXJhY3Rpb24gYm9vbGVhbnNcclxuXHQgKlx0d2lsbCBiZSBzZXQgdG8gcHJldmVudCBhbnkgdXNlciBpbnRlcmFjdGlvbiwgYmVjYXVzZSB0aGUgZGVzdHJveSBtZXRob2Qgb25seVxyXG5cdCAqXHRyZXNldHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1haW4gc2xpZGUsIGFuZCByZW1vdmVzIGFsbCB0aGUgZGlzcGxheSBvYmplY3RzLFxyXG5cdCAqXHRidXQgdGhlIHJlbmRlcmVyIGFuZCB0aGUgc3RhZ2UgKGVsZW1lbnQgdGhhdCByZWNlaXZlcyB0aGUgdXNlciBpbnRlcmFjdGlvbiBldmVudHMpXHJcblx0ICpcdHJlbWFpbiBpbiB0aGUgc2xpZGVyLCB0aGVyZWZvcmUgb25jZSB0aGUgc2xpZGVyIGlzIGNyZWF0ZWQgYWdhaW4sIHJlc2V0IHRoZVxyXG5cdCAqXHRpbnRlcmFjdGlvbiBib29sZWFucyB0byBhbGxvdyB1c2VyIGludGVyYWN0aW9uXHJcblx0ICovXHJcblx0X3NldEludGVyYWN0aW9uQm9vbHMoZmFsc2UpO1xyXG5cdC8vIGVtaXQgdGhlIHNsaWRlciBpbml0IGV2ZW50IGluIG9yZGVyIHRvIGludm9rZSBhbnkgY2FsbGJhY2sgdGhhdCBtaWdodCBiZSBzdG9yZWRcclxuXHQvLyBpbiB0aGUgZXZlbnRzIGVtaXR0ZXIgb2JqZWN0XHJcblx0X2V2ZW50RW1pdHRlcihcInNsaWRlcmluaXRcIik7XHJcbn07IC8vIGluaXQgdGV4dHVyZXMgYXJyYXlcclxuXHJcbi8qKiBNZXRob2QgdG8gYWRkIGVsZW1lbnRzIHRvIHRoZSB0ZXh0dXJlcyBhcnJheVxyXG4gKiAgVGhpcyBsb29wcyB0aHJvdWdoIHRoZSBzbGlkZXMgZGF0YSBhbmQgYWRkcyBhIG51bGwgdmFsdWUgZm9yIGVhY2hcclxuICogXHRzbGlkZS4gVGhlbiBjYWxscyB0aGUgbWV0aG9kIHRvIGxvYWQgdGhlIGZpcnN0L2xhc3QgMyBpbWFnZXMgdGhhdCBcclxuICogXHR3aWxsIHVwZGF0ZSB0aGUgXHJcbiAqL1xyXG5jb25zdCBfY3JlYXRlVGV4dHVyZXNBcnJheSA9ICgpID0+IHtcclxuXHRfc2xpZGVzRGF0YS5mb3JFYWNoKCAoKSA9PiB7XHJcblx0XHRfdGV4dHVyZXNBcnJheS5wdXNoKG51bGwpO1xyXG5cdH0pOyAvLyBsb29wXHJcblx0Ly8gYWZ0ZXIgYWRkaW5nIHRoZSBlbGVtZW50cyB0byB0aGUgYXJyYXksIGxvYWQgdGhlIGZpcnN0IDMgdGV4dHVyZXNcclxuXHRfaW5pdFRleHR1cmVzQXJyYXkoKTtcclxufTtcclxuIiwiLypcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICBDT0xPUiBST1RBVElPTiBNT0RVTEVcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qL1xyXG5cclxuLy8gZ2V0IHRoZSByZXNldCBncmFwaGljIHN0cmlwZXMgYm9vbCBtZXRob2RcclxuaW1wb3J0IHsgX3Jlc2V0R3JhcGhpY1N0cmlwZXNCb29sIH0gZnJvbSBcIi4uL3N0cmlwZXNcIjtcclxuLy8gZ2V0IHRoZSBtZXRob2QgdG8gdXBkYXRlIHRoZSBiYXNlIHRleHR1cmUgY29sb3JcclxuaW1wb3J0IHsgX3VwZGF0ZUJhc2VDb2xvciB9IGZyb20gXCIuLi9waXhpLW1vZHVsZVwiO1xyXG5cclxuLy8gY29sb3JzIGFycmF5XHJcbmV4cG9ydCBjb25zdCBfY29sb3JzQXJyYXkgPSBbXHJcblx0MHhGMkY5OEIsIDB4N0Y0MEYxLCAweEZGMTM2MSwgMHg1RTFGRTQsIDB4RkYzNzM3XHJcbl07XHJcblxyXG4vKiBleHBvcnQgY29uc3QgX3Rlc3RDb2xvcnNBcnJheSA9IFtcclxuXHQjRjJGOThCLCAjN0Y0MEYxLCAjRkYxMzYxLCAjNUUxRkU0LCAjRkYzNzM3XHJcbl07ICovXHJcblxyXG4vLyBhbW91bnQgb2YgY29sb3JzXHJcbmNvbnN0IF9jb2xvcnNBbW91bnQgPSBfY29sb3JzQXJyYXkubGVuZ3RoO1xyXG5cclxuLy8gY3VycmVudCBjb2xvciBpbmRleFxyXG5leHBvcnQgbGV0IF9jdXJyZW50Q29sb3JJbmRleCA9IDA7XHJcblxyXG4vKiogQ29sb3IgUm90YXRpb24gTWV0aG9kXHRcclxuICogIENoYW5nZXMgdGhlIHRhcmdldCBjb2xvciBpbmRleCBhbmQgcmV0dXJucyB0aGUgdGFyZ2V0IGNvbG9yLlx0XHJcbiAqIFx0VGhpcyBjb2xvciBpcyBzdG9yZWQgaW4gdGhlIHRleHR1cmVzIGFycmF5IHdoZW4gYSBzbGlkZSdzIGltYWdlIGlzIHNpdGxsXHJcbiAqIFx0bG9hZGluZyBvciBoYXMgZmFpbGVkLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3JvdGF0ZUNvbG9yID0gKCkgPT4ge1xyXG5cdC8vIHNldCB0aGUgbmV3IGNvbG9yIGluZGV4IHZhbHVlXHJcblx0X2N1cnJlbnRDb2xvckluZGV4ID0gX2N1cnJlbnRDb2xvckluZGV4IDwgKF9jb2xvcnNBbW91bnQgLSAxKSA/IF9jdXJyZW50Q29sb3JJbmRleCArIDEgOiAwO1xyXG5cdC8vIGNvbnNvbGUubG9nKCBfY3VycmVudENvbG9ySW5kZXgsIF9jb2xvcnNBcnJheVtfY3VycmVudENvbG9ySW5kZXhdICk7XHJcblx0Ly8gYWZ0ZXIgdXBkYXRpbmcgdGhlIGNvbG9yIGluZGV4LCByZXNldCB0aGUgZ3JhcGhpY3Mgc3RyaXBlcyBib29sZWFuXHJcblx0X3Jlc2V0R3JhcGhpY1N0cmlwZXNCb29sKCk7XHJcblx0Ly8gbm93IHVwZGF0ZSB0aGUgYmFzZSB0ZXh0dXJlIGNvbG9yXHJcblx0X3VwZGF0ZUJhc2VDb2xvcigpO1xyXG59O1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9jb2xvci1yb3RhdGlvblwiOyIsIi8qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgQlJFQUtQT0lOVFMgTU9EVUxFXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKi9cclxuXHJcbmltcG9ydCB7IHdpblNpemUsIF9yZXNpemVFbWl0dGVyIH0gZnJvbSBcIi4vd2luZG93LW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byBwb3NpdGlvbiB0aGUgYnV0dG9uXHJcbmltcG9ydCB7IF9wb3NpdGlvbkJ1dHRvbiwgX21lbnVCdXR0b24gfSBmcm9tIFwiLi4vbG9hZGVyXCI7XHJcbi8vIGdldCB0aGUgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgdGV4dCBzdHlsZXNcclxuaW1wb3J0IHsgX3NldFRleHREaW1lbnNpb25zIH0gZnJvbSBcIi4uL3RleHQtbW9kdWxlXCI7XHJcblxyXG4vKiAgQ2hlY2tzIHRoZSBkaWZmZXJlbnQgc2NyZWVuIHNpemVzIGFuZCB3aGVuIHRoZSBzcGVjaWZpYyBicmVha3BvaW50cyBhcmVcclxuICogIHBhc3NlZCBhbmQgdXBkYXRlcyBhIGhlaWdodCBhbmQgd2lkdGggdmFycyBpbmRpY2F0aW5nIHRoZSBjdXJyZW50IHNjcmVlblxyXG4gKiBcdGRpbWVuc2lvbi5cclxuKi9cclxuXHJcbi8vIFZFUlNJT04gMi4yLjIgQlJFQUtPSU5UU1xyXG4vLyBXSURUSCA8PSA3NjcgJiYgPiA3NjdcclxuXHJcblxyXG4vLyBjdXJyZW50IGRpbWVuc2lvbnMgaW50ZWdlcnNcclxuZXhwb3J0IGxldCBfY3VycmVudFdpZHRoO1xyXG5leHBvcnQgbGV0IF9jdXJyZW50SGVpZ2h0O1xyXG5cclxuLy8gc2NyZWVuIHdpZHRoIGJyZWFrcG9pbnRzXHJcbmV4cG9ydCBjb25zdCBfd2lkdGhCcmVha3BvaW50cyA9IFs3NjddO1xyXG5leHBvcnQgY29uc3QgX3dpZHRoRGltZW5zaW9ucyA9IFtcInNtYWxsXCIsIFwibGFyZ2VcIl07XHJcblxyXG4vLyB0ZXh0IGNvbXBvbmVudCBkaW1lbnNpb25zIHRoYXQgZGVwZW5kIG9uIHRoZSBzY3JlZW4gaGVpZ2h0XHJcbi8vIHRoZSBoZWlnaHQgb2YgYSB0ZXh0IGxpbmVcclxuZXhwb3J0IGxldCBfdGV4dExpbmVIZWlnaHQgPSAyMztcclxuLy8gdGV4dCBlbGVtZW50IHZlcnRpY2FsIHBvc2l0aW9uIDEzNSAtIDE3NSAtIDIwM1xyXG5leHBvcnQgbGV0IF90ZXh0VmVydGljYWxQb3MgPSAxMzU7XHJcblxyXG5cclxuLyoqIE1ldGhvZCB0byBDaGVjayB0aGUgQnJlYWtwb2ludHMuXHRcclxuICogIEFzIHRoZSBzY3JlZW4gc2l6ZSBjaGFuZ2VzLCB0aGlzIG1ldGhvZCB3aWxsIGNoZWNrIGlmIGEgYnJlYWtwb2ludCBoYXMgYmVlblxyXG4gKiBcdHBhc3NlZCwgaW5zdGVhZCBvZiByZWFjdGljIGp1c3QgdG8gdGhlIHNjcmVlbiBkaW1lbnNpb25zLCB0aGUgY29kZSBjaGVja3NcclxuICogXHRmb3IgdGhlIHNpemUgYW5kIHRoZSBjdXJyZW50IGRpbWVuc2lvbiBzdHJpbmcgYW5kIGFjY29yZGluZyB0byB0aGF0IGNhbGxzXHJcbiAqIFx0YW4gcmVzaXplIGV2ZW50IGNhbGxiYWNrLlxyXG4qL1xyXG5leHBvcnQgY29uc3QgX2NoZWNrQnJlYWtwb2ludHMgPSAoKSA9PiB7XHJcblx0Ly8gY29uc29sZS5sb2coIFwiYnJlYWtwb2ludHNcIiApO1xyXG5cdC8vIGNyZWF0ZSB2YXJpYWJsZXMgZm9yIHRoZSBjdXJyZW50IGRpbWVuc2lvbiBpbiBvcmRlciB0byBjb21wYXJlXHJcblx0Y29uc3QgX3ByZVdpZHRoID0gX2N1cnJlbnRXaWR0aDtcclxuXHRjb25zdCBfcHJlSGVpZ2h0ID0gX2N1cnJlbnRIZWlnaHQ7XHJcblx0Y29uc3QgeyB3LCBoIH0gPSB3aW5TaXplO1xyXG5cclxuXHQvLyBjaGVjayB0aGUgd2lkdGhcclxuXHQvLyB0aGUgbnVtYmVycyBtYXRjaGVzIHRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgcG9zaXRpb25zIGFuZCBcclxuXHQvLyBzaXplcyBpbiB0aGUgYXJyYXlzIG9uIHRoZSBsb2dvIG1vZHVsZVxyXG5cdHN3aXRjaCAodHJ1ZSkge1xyXG5cdFx0Y2FzZSAodyA+IDc2NyAmJiBfY3VycmVudFdpZHRoICE9PSAxKTpcclxuXHRcdFx0X2N1cnJlbnRXaWR0aCA9IDE7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAodyA8PSA3NjcgJiYgX2N1cnJlbnRXaWR0aCAhPT0gMCk6XHJcblx0XHRcdF9jdXJyZW50V2lkdGggPSAwO1xyXG5cdFx0XHRicmVhaztcclxuXHR9IC8vIHdpZHRoIHN3aXRjaFxyXG5cclxuXHQvLyBjaGVjayB0aGUgaGVpZ2h0IGZvciB0aGUgdGV4dCBjb21wb25lbnRcclxuXHRpZiAoIGggPiAxMjgwICYmIF9jdXJyZW50SGVpZ2h0ICE9PSAzICkge1xyXG5cdFx0X2N1cnJlbnRIZWlnaHQgPSAzO1xyXG5cdFx0X3RleHRMaW5lSGVpZ2h0ID0gNTg7XHJcblx0XHRfdGV4dFZlcnRpY2FsUG9zID0gMjAzO1xyXG5cdH0gZWxzZSBpZiAoIGggPiAxMDI0ICYmIF9jdXJyZW50SGVpZ2h0ICE9PSAyICkge1xyXG5cdFx0X2N1cnJlbnRIZWlnaHQgPSAyO1xyXG5cdFx0X3RleHRMaW5lSGVpZ2h0ID0gNDU7XHJcblx0XHRfdGV4dFZlcnRpY2FsUG9zID0gMjAzO1xyXG5cdH0gZWxzZSBpZiAoIGggPiA3MzYgJiYgX2N1cnJlbnRIZWlnaHQgIT09IDEgKSB7XHJcblx0XHRfY3VycmVudEhlaWdodCA9IDE7XHJcblx0XHRfdGV4dExpbmVIZWlnaHQgPSAzNjtcclxuXHRcdF90ZXh0VmVydGljYWxQb3MgPSAxNzU7XHJcblx0fSBlbHNlIGlmICggaCA8PSA3MzYgJiYgX2N1cnJlbnRIZWlnaHQgIT09IDAgKSB7XHJcblx0XHRfY3VycmVudEhlaWdodCA9IDA7XHJcblx0XHRfdGV4dExpbmVIZWlnaHQgPSAyMztcclxuXHRcdF90ZXh0VmVydGljYWxQb3MgPSAxMzU7XHJcblx0fVxyXG5cclxuXHQvLyBwb3NpdGlvbiB0aGUgbWVudSBidXR0b24gb25seSBpZiB0aGUgYnV0dG9uIGlzIGRlZmluZWRcclxuXHRfbWVudUJ1dHRvbiA/IF9wb3NpdGlvbkJ1dHRvbiggX2N1cnJlbnRXaWR0aCApIDogbnVsbDtcclxuXHQvLyBjaGVjayBpZiB0aGUgY3VycmVudCB3aWR0aCBzdHJpbmcgY2hhbmdlZFxyXG5cdGlmIChfY3VycmVudFdpZHRoICE9PSBfcHJlV2lkdGgpIF9yZXNpemVFbWl0dGVyKFwid2lkdGhcIiwgX2N1cnJlbnRXaWR0aCk7XHJcblx0Ly8gY2hlY2sgaWYgdGhlIGN1cnJlbnQgaGVpZ2h0IGludGVnZXIgY2hhbmdlZFxyXG5cdGlmICggX2N1cnJlbnRIZWlnaHQgIT09IF9wcmVIZWlnaHQgKSB7IF9zZXRUZXh0RGltZW5zaW9ucygpOyB9O1xyXG59O1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi93aW5kb3ctbW9kdWxlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2JyZWFrcG9pbnRzXCI7XHJcbiIsIi8qXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgV0lORE9XIFNFVFRJTkdTIE1PRFVMRVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiovXHJcbi8qICBUaGlzIG1vZHVsZSBob2xkcyB0aGUgdmFyaWFibGVzIGFuZCBtZXRob2RzIHJlbGF0ZWQgdG8gdGhlIHdpbmRvd1xyXG4gKiAgc2l6ZSBhbmQgdGhlIHdpbmRvdyByZXNpemUgZXZlbnQuXHJcbiAqIFx0RXZlcnkgZXZlbnQgdGhhdCBzaG91bGQgYmUgdHJpZ2dlcmVkIGJ5IHRoZSB3aW5kb3cgcmVzaXplIHNob3VsZCBiZSBpbXBvcnRlZFxyXG4gKiBcdGhlcmUgYW5kIGluY2x1ZGVkIGluIHRoZSByZXNpemUgZXZlbnQgaGFuZGxlci5cclxuICogXHRUaGlzIGFsc28gZXhwb3J0cyB0aGUgd2luZG93IHNpemUgb2JqZWN0XHJcbiAqL1xyXG5cclxuLy8gZ2V0IG1haW4gcmVuZGVyZXIgZm9yIHJlc2l6ZSBldmVudFxyXG4vLyBnZXQgdGhlIGxvYWRpbmcgc3ByaXRlXHJcbmltcG9ydCB7IF9tYWluUmVuZGVyIH0gZnJvbSBcIi4uL3BpeGktbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgc3RyaXBlcyBhbW91bnRcclxuaW1wb3J0IHsgX3N0cmlwZXNBbW91bnQsIF9jYWxjdWxhdGVTdHJpcGVzIH0gZnJvbSBcIi4uL3N0cmlwZXMtbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgdGV4dHVyZXMgc2NhbGUsIHBvc2l0aW9uIGFuZCBhbmltYXRpb24gZGF0YVxyXG5pbXBvcnQgeyBfcmVzZXRTY2FsZVBvc2l0aW9uIH0gZnJvbSBcIi4uL3RleHR1cmVzLW1vZHVsZVwiO1xyXG4vLyBnZXQgdGhlIGxvZ28gcG9zaXRpb24gYW5kIHNpemUgbWV0aG9kc1xyXG5pbXBvcnQgeyBfc2V0TG9nb1Bvc2l0aW9uIH0gZnJvbSBcIi4uL2xvYWRlclwiO1xyXG4vLyBnZXQgdGhlIG1ldGhvZCB0byBjaGVjayB0aGUgYnJlYWtwb2ludHNcclxuaW1wb3J0IHsgX2NoZWNrQnJlYWtwb2ludHMgfSBmcm9tIFwiLi9icmVha3BvaW50c1wiO1xyXG4vLyBnZXQgdGhlIGV2ZW50IGVtaXR0ZXJcclxuaW1wb3J0IHsgX2V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi9nbG9iYWwtY2xhc3MtbW9kdWxlXCI7XHJcbi8vIGdldCB0aGUgcHJlbG9hZGVyIGV2ZW50XHJcbmltcG9ydCB7IF9wb3NpdGlvbkxvYWRlciB9IGZyb20gXCIuLi9sb2FkZXJcIjtcclxuLy8gZ2V0IHRoZSBpbml0aWFsaXplZCBib29sZWFuXHJcbmltcG9ydCB7IF9hcHBJbml0aWFsaXplZCB9IGZyb20gXCIuLi9zbGlkZS1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSB0ZXh0IHJlc2l6ZSBldmVudFxyXG5pbXBvcnQgeyBfcmVzaXplVGV4dEV2ZW50LCBfc2V0VGV4dERpbWVuc2lvbnMgfSBmcm9tIFwiLi4vdGV4dC1tb2R1bGVcIjtcclxuLy8gZ2V0IHRoZSBwb3NpdGlvbiBtZXRob2QgZm9yIHRoZSBwcm9tcHRcclxuaW1wb3J0IHsgX3Bvc2l0aW9uUHJvbXB0IH0gZnJvbSBcIi4uL3Byb21wdC1tb2R1bGVcIjtcclxuXHJcbi8qIFdJTkRPVyBTSVpFIE9CSkVDVCAqL1xyXG5leHBvcnQgbGV0IHdpblNpemUgPSB7XHJcblx0dzogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxyXG5cdGg6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcclxufTtcclxuXHJcbi8vIHN0cmlwZSBoZWlnaHRcclxuLy8gc2V0IGVhY2ggc3RyaXBlIGhlaWdodCB1c2luZyB0aGUgc3RyaXBlcyBhbW91bnQgKDkpIGFuZCBzZXQgaXRcclxuLy8gd2hlbiB0aGUgd2luZG93IHNpemUgY2hhbmdlc1xyXG4vLyBleHBvcnQgbGV0IF9zdHJpcGVIZWlnaHQgPSAoIHdpblNpemUuaCAvIF9zdHJpcGVzQW1vdW50ICkudG9GaXhlZCg0KTtcclxuXHJcblxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vKiBGUk9NIFZFUlNJT04gMi4yLjRcclxuICogdGhlIHN0cmlwZXMgaGVpZ2h0IGlzIG5vdCBmaXggZm9yIGFsbCB0aGUgc3RyaXBlc1xyXG4gKiB0aGUgZmluYWwgc3RyaXBlIHdpbGwgYmUgbGVzcyB0aGFuIHRoZSByZXN0IGluIG9yZGVyIHRvIFxyXG4gKiBzZXQgdGhlIGhlaWdodCBvZiB0aGUgc3RyaXBlcyB0byBhbiBpbnRlZ2VyLlxyXG4gKiB3ZSBzZXQgdGhlIGhlaWdodCBvZiB0aGUgc3RyaXBlcyB0byBhbiBpbnRlZ2VyIGFuZCB0aGUgZmluYWxcclxuICogc3RyaXBlJ3MgaGVpZ2h0IGlzIGdvaW5nIHRvIGJlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlXHJcbiAqIGhlaWdodCBvZiB0aGUgc2NyZWVuIGFuZCB0aGUgc3VtIG9mIHRoZSByZXN0IG9mIHRoZSBzdHJpcGVzXHJcbiAqIHNjcmVlbkhlaWdodCAtICggKCBhbW91bnQgLSAxICkgKiBzdHJpcGVIZWlnaHQgKVxyXG4qL1xyXG5leHBvcnQgbGV0IF9zdHJpcGVIZWlnaHQsIF9oZWlnaHRSZW1pbmRlcjtcclxuLyoqXHJcbiAqIE1ldGhvZCB0byBzZXQgdGhlIHN0cmlwZXMgaGVpZ2h0LlxyXG4gKiBAcHJpdmF0ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgX3NldFN0cmlwZUhlaWdodCA9ICgpID0+IHtcclxuXHQvLyBzZXQgdGhlIGFtb3VudCBvZiBzdHJpcGVzIGZpcnN0XHJcblx0X2NhbGN1bGF0ZVN0cmlwZXMoIHdpblNpemUuaCApO1xyXG5cdC8vIG5vdyBzZXQgdGhlIGhlaWdodCBvZiB0aGUgc3RyaXBlc1xyXG5cdF9zdHJpcGVIZWlnaHQgPSBNYXRoLmNlaWwoIHdpblNpemUuaCAvIF9zdHJpcGVzQW1vdW50ICk7XHJcblx0X2hlaWdodFJlbWluZGVyID0gd2luU2l6ZS5oIC0gKCAoIF9zdHJpcGVzQW1vdW50IC0gMSApICogX3N0cmlwZUhlaWdodCApO1xyXG5cclxuXHRpZiAoIF9oZWlnaHRSZW1pbmRlciA8IDIgKSB7XHJcblx0XHRfc3RyaXBlSGVpZ2h0LS07XHJcblx0XHRfaGVpZ2h0UmVtaW5kZXIgPSB3aW5TaXplLmggLSAoICggX3N0cmlwZXNBbW91bnQgLSAxICkgKiBfc3RyaXBlSGVpZ2h0ICk7XHJcblx0fVxyXG59O1xyXG4vLyBzZXQgdGhlIGluaXRpYWwgaGVpZ2h0IG9mIHRoZSBzdHJpcGVzXHJcbl9zZXRTdHJpcGVIZWlnaHQoKTtcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcblxyXG4vLyBnZW5lcmFsIG1ldGhvZCByZXR1cm5zIHRoZSBzY3JlZW4gZGltZW5zaW9uc1xyXG5jb25zdCBfZ2V0V2luRGltcyA9ICgpID0+e1xyXG5cdHdpblNpemUgPSB7IHc6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgaDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB9O1xyXG59O1xyXG5cclxuLyoqIFJlc2l6ZSBFdmVudHNcdFxyXG4gKiAgT2JqZWN0IHdpdGggYWxsIHRoZSByZXNpemUgZXZlbnRzIHNlcGFyYXRlZCBpbiB3aWR0aCBhbmQgaGVpZ2h0LlxyXG4gKiBcdFRoaXMgaXMgdXNlZCBvbmx5IGZvciBldmVudHMgdGhhdCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gYSBicmVha3BvaW50XHJcbiAqIFx0aXMgcGFzc2VkLiBPdGhlciBldmVudHMgc3VjaCBhcyByZW5kZXJlciBhbmQgbWFpbiBzbGlkZSByZXNpemUsIGFuZCBcclxuICogXHRjYWxjdWxhdGlvbiBvZiB0aGUgdGV4dHVyZXMgYW5kIHRoZWlyIHNjYWxlcyBpcyBkb25lIG9uIGV2ZXJ5IHNpbmdsZVxyXG4gKiBcdHJlc2l6ZSBldmVudC5cclxuKi9cclxuY29uc3QgX3Jlc2l6ZUV2ZW50cyA9IHtcclxuXHR3aWR0aDogWyBfc2V0TG9nb1Bvc2l0aW9uIF1cclxufTtcclxuXHJcbi8qKiBSZXNpemUgRXZlbnQgRW1pdHRlci5cdFxyXG4gKiAgVGhpcyBpcyBjYWxsZWQgaW4gdGhlIGNoZWNrIGJyZWFrcG9pbnRzIGlmIGEgYnJlYWtwb2ludCBoYXMgYmVlblxyXG4gKiBcdHBhc3NlZCBvbiBhIHNjcmVlbiBzaXplIGNoYW5nZS5cdFxyXG4gKiBcdEl0IHVzZXMgYSB0eXBlIHN0cmluZyB0aGF0IGlkZW50aWZpZXMgb25lIG9mIHRoZSBtYWluIG9iamVjdHMgaW4gXHJcbiAqIFx0dGhlIGV2ZW50cyBvYmplY3QgKHdpZHRoIG9yIGhlaWdodCkuXHRcclxuICogXHRVc2VzIGEgZGltZW5zaW9uIHN0cmluZywgd2hpY2ggaXMgcmVnaXN0ZXJlZCBcclxuICogXHRAcGFyYW0ge3N0cmluZ30gdDogdGhlIHR5cGUsIHdpZHRoIG9yIGhlaWdodFxyXG4gKiBcdEBwYXJhbSB7c3RyaW5nfSBkOiB0aGUgZGltZW5zaW9uXHJcbiovXHJcbmV4cG9ydCBjb25zdCBfcmVzaXplRW1pdHRlciA9ICh0LCBkKSA9PiB7XHJcblx0Ly8gY2hlY2sgaWYgdGhlIHJlc2l6ZSBldmVudCBpcyByZWdpc3RlcmVkXHJcblx0aWYgKCBfcmVzaXplRXZlbnRzW3RdICkge1xyXG5cdFx0X3Jlc2l6ZUV2ZW50c1t0XS5mb3JFYWNoKCBlID0+IGUoZCkgKTtcclxuXHR9O1xyXG59O1xyXG5cclxuLy8gd2luZG93IHJlc2l6ZSBtZXRob2Rcclxud2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xyXG5cdC8vIHNldCBuZXcgZGltZW5zaW9uc1xyXG5cdF9nZXRXaW5EaW1zKCk7XHJcblx0Ly8gc3RvcmUgbmV3IGRpbWVuc2lvbnNcclxuXHRjb25zdCBfbmV3V2lkdGggPSB3aW5TaXplLnc7XHJcblx0Y29uc3QgX25ld0hlaWdodCA9IHdpblNpemUuaDtcclxuXHQvLyByZXNpemUgcGl4aSByZW5kZXJlclxyXG5cdF9tYWluUmVuZGVyLnJlbmRlcmVyLnJlc2l6ZShfbmV3V2lkdGgsIF9uZXdIZWlnaHQpO1xyXG5cdC8vIHNldCB0aGUgbmV3IGhlaWdodCBvZiB0aGUgc3RyaXBlc1xyXG5cdC8vIF9zdHJpcGVIZWlnaHQgPSAoIHdpblNpemUuaCAvIF9zdHJpcGVzQW1vdW50ICkudG9GaXhlZCg0KTtcclxuXHQvLyBWRVJTSU9OIDIuMi40IFNFVCBUSEUgU1RSSVBFIEhFSUdIVCBVU0lORyBUSEUgTUVUSE9EXHJcblx0X3NldFN0cmlwZUhlaWdodCgpO1xyXG5cdC8qIHJ1biB0aGUgbG9vcCB0byB1cGRhdGUgdGhlIHRleHR1cmVzIGluZm9ybWF0aW9uLiBUaGlzIHdpbGwgZXZlbnR1YWxseVxyXG5cdCAqIHVwZGF0ZSB0aGUgbWFpbiBzbGlkZSdzIHRleHR1cmUgaWYgdGhlIGltYWdlIGhhcyBiZWVuIGxvYWRlZC5cclxuXHQgKiBUaGUgcmVzaXplIGV2ZW50IGNvdWxkIGJlIGNhbGxlZCB3aGlsZSBhIG5ldyBncm91cCBpcyBiZWluZyBsb2FkZWQgb3JcclxuXHQgKiB3aGlsZSB0aGUgYXBwIGlzIGdldHRpbmcgcmVhZHkgaW4gdGhlIGZpcnN0IHJ1bi4gSW4gdGhhdCBjYXNlIHRoZXJlJ3NcclxuXHQgKiBubyBuZWVkIHRvIHJ1biB0aGUgY29kZSB0byB1cGRhdGUgdGhlIHRleHR1cmVzIGluZm9ybWF0aW9uIGFuZCB1cGRhdGVcclxuXHQgKiB0aGUgbWFpbiBzbGlkZSB0ZXh0dXJlLlxyXG5cdCovXHJcblx0aWYgKCBfYXBwSW5pdGlhbGl6ZWQgKSB7IF9yZXNldFNjYWxlUG9zaXRpb24oKTsgfTtcclxuXHRfY2hlY2tCcmVha3BvaW50cygpO1xyXG5cdC8vIHBvc3Rpb24gdGhlIHByZWxvYWRlclxyXG5cdF9wb3NpdGlvbkxvYWRlcigpO1xyXG5cdC8vIHNldCB0aGUgbmV3IHBvc2l0aW9uIG9mIHRoZSB0ZXh0IGVsZW1lbnRzXHJcblx0X3Jlc2l6ZVRleHRFdmVudCgpO1xyXG5cdC8vIHBvc2l0aW9uIHRoZSBwcm9tcHQgY29tcG9uZW50XHJcblx0X3Bvc2l0aW9uUHJvbXB0KCk7XHJcblx0Ly8gZW1pdCB0aGUgcmVzaXplIGV2ZW50XHJcblx0X2V2ZW50RW1pdHRlcihcInJlc2l6ZVwiKTtcclxufTtcclxuIl19

function isDigit(n) {
    return Boolean([true, true, true, true, true, true, true, true, true, true][n]);
}
function getVal(array, id, key) {
  var obj = array.filter(function (val) {
    return val.id === id;
  });
  return obj[0][key];
}

function changeVal(id,key,newval,array) {
   for (var i in array) {
     if (array[i].id == id) {
        array[i][key] = newval;
        break;
     }
   }
}

function findVal(source, id) {
  var found = false;
  for (var i = 0; i < source.length; i++) {
    if (source[i].id === id) {
	  found = true;
      break;
    }
  }
  return found;
}

function delVal(source, id) {
  for (var i = 0; i < source.length; i++){
    if (source[i].id && source[i].id === id) { 
      source.splice(i, 1);
      break;
    }
  }
}

function hexToRgb(hex) {
  var h=hex.replace('#', '');
  h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));
  for(var i=0; i<h.length; i++)
    h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);
    var obj = {
      r:  h[0],
      g: h[1],
      b: h[2]
    };
  return obj;
}

function getFirstWord(str) {
 if (str.indexOf(' ') === -1){
  return str;
 }else{
  return str.substr(0, str.indexOf(' '));
 }
}

function convertSpecials(str){
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/&apos;/g, "/'");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/&quot;/g, '"/');
  str = str.replace(/'/g, "&#039;");
  return str;
}

Array.prototype.containsArray = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

function arrayRemove(arr, item) {
  for(var i = arr.length; i--;) {
    if(arr[i] === item) {
      arr.splice(i, 1);
    }
  }
}

function xtnd(destination, source) {   
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
}
var languageObj = {};
languageObj.globalLng = "en",
languageObj.rateTitle = "Rate Streammm",
languageObj.rateMessage = "If you enjoy Streammm, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!",
languageObj.rateBtn = "Rate It Now",
languageObj.rateLater = "Remind Me Later",
languageObj.menuTxt = ["Customize Streammm^2000","Select your favorite^1000","tags and topics^1000"],
languageObj.filterTxt = ["Filter Streammm^2000","Select a topic^1000"],
languageObj.aiStart = ["Hi there!<br>How can I help you?^1500 ","Ask me about a topic^1000","Enter a website^1000","Enter a search query^1000","Type 'help' for tutorial.^1000", "Talk to me often so I can learn more about you!^1200", "Tap anywhere to resume^1200"],
languageObj.voiceaiStart = "Hi there! Ask me about a topic, enter a website or search for something. Tap anywhere to resume.",
languageObj.paused = ["Paused^1000", "Tap anywhere to resume^1200"],
languageObj.aiRec = ["Listening... ^1000"],
languageObj.aiErr = ["Didn't quite get that... ^1000"],
languageObj.aiPermission = ["Please allow Streammm to access your microphone and Speech Recognition services^1000"],
languageObj.aiVoiceErr = ["It seems there is a problem with your microphone and Speech Recognition services^1000"],
languageObj.countrySelect = ["Streammm^1000","Select your country^1000"],
languageObj.aiTut1 = ["Tutorial:<br>Swipe left or right to navigate<br>Swipe up or down to scroll the article<br>Tap the article's text to visit the webpage<br>Choose between headlines and full story mode<br>Choose a filter to isolate a category<br>Double tap anywhere to access the menu<br>Press the search button to interact with Streammm chatbot.^1000"],
languageObj.voiceTut1 = "Tutorial: Swipe left or right to navigate. Swipe up or down to scroll the article. Tap the article's text to visit the webpage. Choose between headlines and full story mode. Choose a filter to isolate a category. Double tap anywhere to access the menu. Press the search button to interact with Streammm chatbot.";
var streammmTyperObj = {};
streammmTyperObj.isFinished = true;

;( function( window ) {
	'use strict';
	
    var typerElem = document.getElementById('aiPrompt'),
    typerSpan = document.getElementById('aiSpan'),
	oldType = false;
	window.streammmType = null;
	/**
	 * streammmTyper function
	 */
	function streammmTyper( options ) {
		this.options = xtnd( {}, this.options );
		xtnd( this.options, options );
		this._init();
	}

	/**
	 * streammmTyper options
	 */
	streammmTyper.prototype.options = {
		strings : false,
		type : false,
		loop : false,
		wait : false,
		returnToInfo : false,
        left : 0,
        top : 0,
		speed : 20
	};
	/**
	 * init function
	 * initialize and cache some vars
	 */
	streammmTyper.prototype._init = function() {
		if(!streammmTyperObj.isFinished){
          return;
		}
        clearTimeout( window.typeTimer );
		if(this.options.wait){
          streammmTyperObj.isFinished = false;
		}else{
          streammmTyperObj.isFinished = true;
		}
        if(oldType !== this.options.type){
          if(this.options.type == 'slideInfo'){
            typerElem.className = 'bottom';
		  }
          if(this.options.type == 'notification'){
            typerElem.className = 'bottom red';
		  }
          if(this.options.type == 'botInfo'){
            typerElem.className = '';
		  }
          if(this.options.type == 'loader'){
            typerElem.className = 'loader';
		  }
          oldType = this.options.type;
		}
		this.strings = this.options.strings;
        this.txt = '';
		this.isDeleting = false;
		this.loopNum = 0;
        this.tick();
	};

	streammmTyper.prototype.tick = function() {
      var i = this.loopNum % this.strings.length;
      var fullTxt = this.strings[i];

      if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      }else{
        var char = fullTxt.substring(this.txt.length, this.txt.length + 1);
        if (char == "<"){
          this.txt = fullTxt.substring(0, this.txt.length)+"<br>";
        }
		if (char == "^"){
          // get the milliseconds from the string
		  var ms = fullTxt.substring(this.txt.length+1, this.txt.length + 5);
          return this.pause(ms);
		}
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

	  typerSpan.innerHTML = this.txt;
	  
      var delta = this.options.speed;
      
      if(!this.isDeleting && this.txt === fullTxt){
        this.isDeleting = true;
      }else if( this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.loopNum++;
      }

      //if not looping return
	  if(this.isDeleting && this.loopNum+1 == this.strings.length && this.options.loop === false ){
        return this.finished();
	  }

      clearTimeout( window.typeTimer );
      window.typeTimer = setTimeout( function() {
		  this.tick();
      }.bind(this), delta);
	};

	streammmTyper.prototype.pause = function(ms) {
      clearTimeout( window.typeTimer );
      window.typeTimer = setTimeout( function() {
        if(this.loopNum+1 == this.strings.length && this.options.loop === false){
          return this.finished();
        }else{
          this.isDeleting = true;
          this.loopNum = this.loopNum++;
          return this.tick();
        }
      }.bind(this), ms);
	};

	streammmTyper.prototype.destroy = function() {
      clearTimeout( window.typeTimer );
      typerSpan.innerHTML = "";
	};

	streammmTyper.prototype.finished = function() {
      streammmTyperObj.isFinished = true;
      clearTimeout( window.typeTimer );
      if(this.options.returnToInfo && !sliderObj.pause){
        return window.typeTimer = setTimeout( function() {
          if (dataObj.status.length !== 0){
            dataObj.status = [];
            var status = window.streammmApp.getLoadedStatus();
            if(status == 1){
              dataObj.status.push("Loading Image...^1000");
            }else if(status == 2){
              dataObj.status.push("Image failed to load...^1000");
            }
            if (dataObj.status.length === 0){
              window.streammmType = new streammmTyper({strings : dataObj.aiInfo, type : 'slideInfo', returnToInfo : true});
            }else{
              var arrayMerge = dataObj.status.concat(dataObj.aiInfo);
             window.streammmType = new streammmTyper({strings : arrayMerge, type : 'slideInfo', returnToInfo : true});	  
            }
          }else{
            window.streammmType = new streammmTyper({strings : dataObj.aiInfo, type : 'slideInfo', returnToInfo : true});
          }
        }, 1200);
      }
	  return;
	};
	/**
	 * add to global namespace
	 */
	window.streammmTyper = streammmTyper;
	
} )( window );
;( function( window ) {
	'use strict';
	window.streammmMenu = null;
	/**
	 * discMenu function
	 */
	function streammmDisc( options ) {
		this.options = xtnd( {}, this.options );
		xtnd( this.options, options );
		this._init();

	}

	/**
	 * discMenu options
	 */
	streammmDisc.prototype.options = {
		// element to which the notification will be appended
		// defaults to the document.body
        left : 0,
        top : 0,
		notification : false,
		// if the user doesn´t interact with the menu then we remove it 
		// after the following time
		ttl : 7000
	};

	/**
	 * init function
	 * initialize and cache some vars
	 */
	streammmDisc.prototype._init = function() {
        //check if active
        if(window.streammmMenu !== null){
            return;
        }
		// create HTML structure
        var discFragment = document.createDocumentFragment();

        this.dM = discFragment.appendChild(document.createElement('div'));
        this.dM.id = "discMenu";

        if(this.options.notification){
          var discNotification = this.dM.appendChild(document.createElement('div'));
          discNotification.id = "discNotification";
          discNotification.innerHTML = '<span class="discNotification">Tip: Double tap anywhere<br>to open the menu</span>';
		}
  
        var discControls = this.dM.appendChild(document.createElement('div'));
        discControls.id = "discControls";
        discControls.innerHTML = '<svg id="closeLines"><line x1="24" y1="36" x2="36" y2="24" stroke="white"/><line x1="24" y1="24" x2="36" y2="36" stroke="white"/></svg><svg id="helpLines"><line x1="39" x2="79" y1="19"  y2="71" stroke="#00051b"/><line x1="153" x2="113" y1="19"  y2="71" stroke="#00051b"/><line x1="125" x2="186" y1="105"  y2="127" stroke="#00051b"/><line x1="6" x2="67" y1="127"  y2="105" stroke="#00051b"/><line x1="96" x2="96" y1="126"  y2="191" stroke="#00051b"/></svg>';

        this.playControl = discControls.appendChild(document.createElement('div'));
        this.playControl.className = "divControl";
        this.playControl.id = "playControl";
        if(settingsObj.userHeadlines){
          this.playControl.innerHTML = '<svg style="width:30px;height:30px;" viewBox="0 0 512 512"><use xlink:href="#playFF" x="0" y="0"></use></svg>';
        }else{
          this.playControl.innerHTML = '<svg style="width:30px;height:30px;" viewBox="0 0 512 512"><use xlink:href="#play" x="0" y="0"></use></svg>';
        }

        this.voiceControl = discControls.appendChild(document.createElement('div'));
        this.voiceControl.className = "divControl";
        this.voiceControl.id = "voiceControl";
        if(voiceObj.speech){
          this.voiceControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#soundOn" x="0" y="0"></use></svg>';
        }else{
          this.voiceControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#soundOff" x="0" y="0"></use></svg>';
        }

        this.shareControl = discControls.appendChild(document.createElement('div'));
        this.shareControl.className = "divControl";
        this.shareControl.id = "shareControl";
        this.shareControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#share" x="0" y="0"></use></svg>';
  
        this.settingsControl = discControls.appendChild(document.createElement('div'));
        this.settingsControl.className = "divControl";
        this.settingsControl.id = "settingsControl";
        this.settingsControl.innerHTML = '<svg style="width:25px;height:25px;" viewBox="0 0 24 24"><use xlink:href="#settings" x="0" y="0"></use></svg>';
        
        this.searchControl = discControls.appendChild(document.createElement('div'));
        this.searchControl.className = "divControl";
        this.searchControl.id = "searchControl";
        this.searchControl.innerHTML = '<svg style="width:28px;height:28px;" viewBox="0 0 24 24"><use xlink:href="#search" x="0" y="0"></use></svg>';
        
        var disc = this.dM.appendChild(document.createElement('div'));
        disc.id = "disc";
        
        this.centerDot = disc.appendChild(document.createElement('div'));
        this.centerDot.id = "centerDot";
        this.centerDot.innerHTML = '<svg><circle cx="40" cy="40" r="0.01" stroke="#00051b" fill="none"/></svg>';
        
        var centerRing = disc.appendChild(document.createElement('div'));
        centerRing.id = "centerRing";
        centerRing.innerHTML = '<svg><circle cx="50" cy="50" r="0.01" stroke="#fff" fill="none"/></svg>';
        
        var discFill = disc.appendChild(document.createElement('div'));
        discFill.id = "discFill";
        discFill.innerHTML = '<svg><circle cx="96" cy="96" r="46" stroke="url(#streammmgrad)" fill="none"/></svg>';

        // append to body or the element specified in options.wrapper
		document.body.insertBefore( discFragment,  document.body.firstChild);
        //Show the menu
        this.show();
		
        //Button handler
		this.handler = this.actions.bind(this);
		
        // Add button listeners
        this.centerDot.addEventListener('tap', this.handler, false);
        this.playControl.addEventListener('tap', this.handler, false);
        this.voiceControl.addEventListener('tap', this.handler, false);
        this.shareControl.addEventListener('tap', this.handler, false);
        this.settingsControl.addEventListener('tap', this.handler, false);
        this.searchControl.addEventListener('tap', this.handler, false);
		
		// dismiss after [options.ttl]ms 
		clearTimeout( this.dismissttl );
		this.dismissttl = setTimeout( function() {
		  this.dismiss();
		}.bind(this), this.options.ttl );
	};

    // action Handler
	streammmDisc.prototype.actions = function(e) {
      e.stopPropagation();
      e.preventDefault();
	  //GET ACTION
      var action = e.target.id;

      if(action === "playControl"){
         if(settingsObj.userHeadlines){
           this.playControl.innerHTML = '<svg style="width:30px;height:30px;" viewBox="0 0 512 512"><use xlink:href="#play" x="0" y="0"></use></svg>';
         }else{
           this.playControl.innerHTML = '<svg style="width:30px;height:30px;" viewBox="0 0 512 512"><use xlink:href="#playFF" x="0" y="0"></use></svg>';
         }
         toggleHeadlines();
      }
      if(action === "voiceControl"){
        if(voiceObj.speech){
          this.voiceControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#soundOff" x="0" y="0"></use></svg>';
        }else{
          this.voiceControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#soundOn" x="0" y="0"></use></svg>';
        }
        toggleSound();
      }
      if(action === "shareControl"){
        window.streammmType = new streammmTyper({strings : ["Share article^1000","Please wait^1000"], type : 'notification', wait : true, returnToInfo : true});
        if (globalObj.hasPlugins){
          window.plugins.socialsharing.share(dataObj.subtitle + "\n\n" + dataObj.links + "\n\n Discover the Now & the Next \n http://www.streammm.io", dataObj.title + " via Streammm", dataObj.image, dataObj.links);
        }
        StreammmAnalytics('event','Share',dataObj.links);
      }
      if(action === "settingsControl"){
	    aiVoice("","en-US");
        tagMenuCreate();
      }
      if(action === "searchControl"){
        toggleBot();
      }
	  // PROCEED WITH DISMISS
      this.dismiss();
	};

	/**
	 * show the notification
	 */
	streammmDisc.prototype.show = function() {
		//check if dM is in DOM
        if (typeof this.dM.offsetWidth !== 'undefined') {
          this.dM.style.left = this.options.left;
          this.dM.style.top = this.options.top;
          this.dM.className = "active rotate";
        } else {
          //check if dM is in DOM with RAF
          window.requestAnimationFrame(this.show);
        }
	};

	/**
	 * dismiss the notification
	 */
	streammmDisc.prototype.dismiss = function() {
        clearTimeout( this.dismissttl );
		// remove button listeners
        this.centerDot.removeEventListener('tap', this.handler);
        this.playControl.removeEventListener('tap', this.handler);
        this.voiceControl.removeEventListener('tap', this.handler);
        this.shareControl.removeEventListener('tap', this.handler);
        this.settingsControl.removeEventListener('tap', this.handler);
        this.searchControl.removeEventListener('tap', this.handler);
		//remove active class
        this.dM.classList.remove('active');
		//remove the rest
        this.dismissttl = setTimeout( function() {
		  window.streammmMenu = null;
          return document.body.removeChild( this.dM );
		}.bind(this), 400 );
	};

	/**
	 * add to global namespace
	 */
	window.streammmDisc = streammmDisc;
	
} )( window );
var txtObj = {};
txtObj.titleWrap = document.getElementById('title-wrap'),
txtObj.titleText = document.getElementById('title-text-container'),
txtObj.lastYLines = false;
	
function setTextSize() {
  txtObj.titleMaxHeight = 69;
  txtObj.fontSize = 20;
  txtObj.lineHeight = 23;  
  if(window.displayHeight > 736){
    txtObj.titleMaxHeight = 114;
    txtObj.fontSize = 35;
    txtObj.lineHeight = 38;
  }
  if(window.displayHeight > 1024){
    txtObj.titleMaxHeight = 132;
    txtObj.fontSize = 40;
    txtObj.lineHeight = 44;
  }
  if(window.displayHeight > 1280){
    txtObj.titleMaxHeight = 165;
    txtObj.fontSize = 50;
    txtObj.lineHeight = 55;
  }
  txtObj.titleWrap.style.height = txtObj.titleMaxHeight+"px";
  txtObj.titleText.style.fontSize = txtObj.fontSize+"px";
  txtObj.titleText.style.lineHeight = txtObj.lineHeight+"px";
}
	
;( function( window ) {
	'use strict';

	window.streammmTxt = null;

	/**
	 * streammmText function
	 */
	function streammmText( options ) {
		this.options = xtnd( {}, this.options );
		xtnd( this.options, options );
		this._init();
	}

	/**
	 * streammmText options
	 */
	streammmText.prototype.options = {
        titleWrap : txtObj.titleWrap,
        titleText : txtObj.titleText,
		title : false,
		subtitle : false,
		slideLang : false,
		subtitleDelay : 1500,
		charsRatio : 0.48,
		groupSpeed : 2500,
		wordsSpeed : 55
	};
	/**
	 * init function
	 * initialize and cache some vars
	 */
	 
	streammmText.prototype._init = function() {
        clearTimeout( window.textTimer );

        //Kills delayed calls to next slide
        TweenLite.killDelayedCallsTo(nXt);

        //Available Width for each line = 64% of window width
		this.availableWidth = parseInt(window.displayWidth*0.64); // 18% margin left & right
		
		//Get css value for the Font size. Variable is used to calculate each line's width
		this.wordsFontSize = txtObj.fontSize;

        // Alt regex /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/		
        //Check if language is Chinese
        if (this.options.title.match(/[\u3400-\u9FBF]/)) {
          this.isChinese = true;
        }else{
          this.isChinese = false;
        }
	  
        if(this.options.subtitle !== "" && this.options.subtitle !== false){
          this.hasSubtitle = true;
		  this.options.subtitle = this.options.subtitle + " ↑";
		}else{
          this.hasSubtitle = false;
		  this.options.title = this.options.title + " ↑";
		}		
        //Create Title Object
        this.titleObj = this.processTxt(this.options.title,this.isChinese);
        //Create subTitle Object
        this.subtitleObj = this.processTxt(this.options.subtitle,this.isChinese);

		this.currentObj = this.titleObj;
        this.subStarted = false;
		//wordLoop counts the word index
 		this.wordLoop = 0;

		//textGroup 
 		this.textGroup = 1;
		
 		this.subGroup = 1000;
 		this.allGroup = 1000;
		
        //We are not scrolling the text manually (touch) on init
        this.isManual = false;

        this.wordsSpeed = this.options.wordsSpeed;

		this.groupFinished = false;
		this.groupArray = new Array();
		//Create a new group
        this.newGroup(this.textGroup);
	};
	  	
    //Creates a new group
	streammmText.prototype.newGroup = function(group) {
	  //console.log("group"+group+"this.subGroup"+this.subGroup);
      if(group >= this.subGroup){
        this.subStarted = true;
        this.currentObj = this.subtitleObj;
      }else{
        this.subStarted = false;
        this.currentObj = this.titleObj;
      }
      //Group hasn't finished typing
      this.groupFinished = false;

        //Stores the words for each group
        this.groupArray[group] = new Array();
        this.groupArray[group].words = new Array();
        this.groupArray[group].lines = new Array();
        this.groupArray[group].wordLoop = false;

      //Invoke text to speech for the title
      if(group == 1){
        aiVoice(this.options.title,this.options.slideLang);
	  }
      if(group == this.subGroup){
        aiVoice(this.options.subtitle,this.options.slideLang);
	  }
      //Reset all text
      this.options.titleText.innerHTML = "";
	  //currentLine resets to 1
	  this.currentLine = 0;
      //Start a new line
      this.newLine();
	};

    //Creates a new line
	streammmText.prototype.newLine = function() {
      //Check if we're still on a group (3 lines/group)
	  if(this.currentLine < 3){
        //increment the line index
        this.currentLine++;
	  }else{
        //group finished
		this.finishedGroup();
		return;
	  }
	  //Create a new paragraph element
      var paraGraph = document.createElement("p");
	  //Set the id for the paragraph.
	  paraGraph.id = this.currentLine;
	  //Append the empty paragraph element to the dom element > titleText : document.getElementById('title-text-container'),
      this.options.titleText.appendChild(paraGraph);
	  //Current paragraph element 
      this.currentParaGraph = paraGraph;
      this.groupArray[this.textGroup].lines.push(this.currentParaGraph);
	  //Reset the line's width
	  this.lineWidth = 0;
	  //Start the typing method
      this.typeWord();
	};

	streammmText.prototype.typeWord = function() {
      //Check if wordloop is smaller than all text
      if(this.wordLoop < this.currentObj.length){
        //This is the next word to get typed
        var newWord = String(this.currentObj.words[this.wordLoop]);
		//Remove hex/ascii strings and estimate how many characters is the word
        var realWord =  newWord.replace(/&(\d+);/g, function(x, y) {return String.fromCharCode(y);})
        //Estimate the new word (+1 for the space that will be added) 
        var newWordWidth = (realWord.length+1)*(this.wordsFontSize*this.options.charsRatio);
		// First argument: If there is enough space to type the word in the current line
        // Second argument: If this is the first word and the new word will exceed the available width, go ahead and type it
        if(this.availableWidth > this.lineWidth + newWordWidth || (this.lineWidth == 0 && newWordWidth >= this.lineWidth)){
          //Increment the line width adding the new word width estimation
          this.lineWidth += newWordWidth;
		  
		  if(this.isChinese){
		    this.currentWord = newWord;
		  }else{
		    //Add a space before the word
		    this.currentWord = " "+newWord;
		  }
		  
          this.currentParaGraph.innerHTML += this.currentWord;

          this.groupArray[this.textGroup].words.push(this.currentWord);
          if (window.textTimer) {
            clearTimeout( window.textTimer );
          }
		  //Increment the word loop
          this.wordLoop++;
		  //Type a new word...
          window.textTimer = setTimeout(function () {
            this.typeWord();
          }.bind(this), this.wordsSpeed);
		  
	    }else{
          // Line is full, create a new line
          this.newLine();
		}
	  }else{
        if(this.subStarted === false){
          // Title has finished
          this.finishedTitle();
		}else{
          // Everything has finished
          this.finishedEverything();
		}
      }
	};
	
    //Group finished
	streammmText.prototype.finishedGroup = function() {
      //console.log("finishedGroup");
      //Group has finished typing
      this.groupFinished = true;
      this.groupArray[this.textGroup].wordLoop = this.wordLoop; 
	  
	  //If manual return
      if(this.isManual){
          return;
	  }
      //Clear timer
      if (window.textTimer) {
        clearTimeout( window.textTimer );
      }
      //Wait time calculations....
      var charSpeed = 40;
      var pauseSpeed = 200;
      //If voice narration is off speeds are different
      if(!voiceObj.speech){
        charSpeed = 40;
        pauseSpeed = 50;
      }
	  var allChars = this.groupArray[this.textGroup].words.join("");
      var commas = find_occurences(allChars, ",");
      var stops = find_occurences(allChars, ".");
      var others = find_occurences(allChars, ":");
      var pauses = commas+stops+others;
      var charsLength = allChars.length;
      var numbers = allChars.replace(/[^0-9]/g,"").length;
      this.options.groupSpeed = (charsLength*charSpeed)+(pauses*pauseSpeed)+(numbers*25);
	  if(this.textGroup+1 == this.subGroup){
		this.options.groupSpeed = this.options.groupSpeed + this.options.subtitleDelay;
	  }
      window.textTimer = setTimeout(function () {
        //increment the group index
        this.textGroup++
        //Invoke a next Group
        this.newGroup(this.textGroup);
      }.bind(this), this.options.groupSpeed);
	};
	

	// Finished method
	streammmText.prototype.finishedTitle = function() {
      //console.log("finishedTitle");
      if(this.hasSubtitle){
          this.subGroup = this.textGroup+1;
          this.subStarted = true;
          this.currentObj = this.subtitleObj;
	  }else{
		  this.allGroup = this.textGroup;
	  }
      // Finished title... check if there is a subtitle and proceed. We are on manual mode...
      if(this.isManual && this.hasSubtitle){
        this.wordLoop = 0;
        this.finishedGroup();
        return;
	  }
      // Finished title... check if we need to move to subtitles 
      if(this.hasSubtitle && !settingsObj.userHeadlines){
        this.wordLoop = 0;
        this.finishedGroup();
      }else{
        this.wordLoop = 0;
	    this.groupFinished = true;
        this.groupArray[this.textGroup].wordLoop = this.wordLoop;
		return TweenLite.delayedCall(5, nXt);
	  }
      return;
    };

	streammmText.prototype.finishedEverything = function() {
      //console.log("finishedEverything");
      this.groupFinished = true;
      this.groupArray[this.textGroup].wordLoop = this.wordLoop;
      this.allGroup = this.textGroup;
      if(this.isManual){
        return;
	  }
      return TweenLite.delayedCall(5, nXt);
    };

	// Drag Up / Forward manual scrolling method
	streammmText.prototype.manualUp = function() {
      TweenLite.killDelayedCallsTo(nXt);
      // Manual scrolling
      this.isManual = true;
	  this.wordsSpeed = 0;
      if(this.groupFinished === false){
		return;
	  }
      if(this.textGroup == this.allGroup){
        //console.log("exits here");
		return;
	  }
      this.textGroup++
  	  //console.log(this.textGroup + " up");
      //Invoke a next Group
      this.newGroup(this.textGroup);
	  return;
    };

	// Drag Down / Backward manual scrolling method
	streammmText.prototype.manualDown = function() {
      TweenLite.killDelayedCallsTo(nXt);
      // Manual scrolling
      this.isManual = true;
	  this.wordsSpeed = 0;
	  
      if(this.textGroup == 1){
		if(this.subStarted){
          this.subStarted = false;
          aiVoice(this.options.title,this.options.slideLang);
		}
		return;
	  }
	  
	  this.textGroup--;

   	  //console.log(this.textGroup + " down");

      this.options.titleText.innerHTML = "";
	  
	  var newPars = this.groupArray[this.textGroup].lines;
      for(var o=0; o<newPars.length; o++) {
        this.options.titleText.appendChild(newPars[o]);
      }
	  
 	  this.wordLoop = this.groupArray[this.textGroup].wordLoop;

//	  this.finishedGroup();
	  return;
	};

    //Resume the auto typing method
	streammmText.prototype.resume = function() {
      //Check that we indeed we were manual scrolling before
      if(this.isManual){
        if(this.textGroup == this.allGroup){
          return TweenLite.delayedCall(2, nXt);
        }
        this.wordsSpeed = this.options.wordsSpeed;
		//Clear the textTimer
        if (window.textTimer) {
          clearTimeout( window.textTimer );
        }
        // Create a new textTimer for the auto mode... Will resume in 0.5sec
        window.textTimer = setTimeout(function () {
          // Not manual any more...
          this.isManual = false;
		  this.textGroup++
		  // Type the next group
          this.newGroup(this.textGroup);
        }.bind(this), 1400);
	  }
	};

    // Pause method - Haven't implemented yet. Usefull if user enters a menu or visits a webpage
	streammmText.prototype.pause = function(ms) {
      //clearTimeout( window.textTimer );
	  TweenLite.killDelayedCallsTo(nXt);
      if (window.textTimer) {
        clearTimeout( window.textTimer );
      }
	  return;
	};
	
    // Finished - Haven't implemented yet. Should create a delayed call to the next slide (nXt function)
	streammmText.prototype.finished = function() {
      if (window.textTimer) {
        clearTimeout( window.textTimer );
      }
	  return;
	};

	function find_occurences(str, char_to_count){
      return str.split(char_to_count).length - 1;
    }
    // Process title and subtitle & Create objects...
	streammmText.prototype.processTxt = function(tXt, isChinese) {
      if (isChinese) {
        var words = tXt.split('');
      }else{
        //Remove line breaks from text
        var cleanText = tXt.replace(/(?:\r\n|\r|\n)/g, ' ');
        cleanText = cleanText.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ');
        //create words array
        var words = cleanText.split(' ');
      }
	  //words array length
      var length = words.length;
	  //Text object
      var tXtOBj = {
          text: cleanText,
          words: words,
          length: length,
      };
	  //Return text object
      return tXtOBj;
	};
	
/**
* Create array with maximum chunk length = maxPartSize
* It work safe also for shorter strings than part size
**/
function convertStringToArray(str, maxPartSize){

  var chunkArr = [];
  var leftStr = str;
  do {
    chunkArr.push(leftStr.substring(0, maxPartSize));
    leftStr = leftStr.substring(maxPartSize, leftStr.length);

  } while (leftStr.length > 0);

  return chunkArr;
};

	/**
	 * add to global namespace
	 */
	window.streammmText = streammmText;

} )( window );
var settingsObj = {};
settingsObj.userTags = [];
settingsObj.userHeadlines = false;

function loadSettings(){
  if(window.localStorage.getItem('isRated')){
    window.isRated = JSON.parse(window.localStorage.getItem('isRated'));
  }else{
    window.isRated = false;
  }
  if(window.localStorage.getItem('userTags')){
    settingsObj.userTags = JSON.parse(window.localStorage.getItem('userTags'));
  }else{
    settingsObj.userTags = [];
  }
  if(window.localStorage.getItem('userHeadlines')){
    settingsObj.userHeadlines = JSON.parse(window.localStorage.getItem('userHeadlines'));
  }else{
    settingsObj.userHeadlines = false;
  }
  if(window.localStorage.getItem('userVoice')){
    voiceObj.speech = JSON.parse(window.localStorage.getItem('userVoice'));
  }else{
    voiceObj.speech = true;
  }
}

function toggleHeadlines(){
  if(settingsObj.userHeadlines){
    settingsObj.userHeadlines = false;
	window.streammmType = new streammmTyper({strings : ["Full story mode^1000"], type : 'notification', wait : true, returnToInfo : true}); 
  }else{
    settingsObj.userHeadlines = true;
	window.streammmType = new streammmTyper({strings : ["Headlines mode^1000"], type : 'notification', wait : true, returnToInfo : true}); 
  }
  window.streammmApp.setFastForward(settingsObj.userHeadlines);
  window.streammmApp.resetTextModule();
  window.streammmApp.restartTextModule();  
  
  _superStreammm();
  window.localStorage.setItem('userHeadlines', settingsObj.userHeadlines);
  StreammmAnalytics('event','HeadLines',settingsObj.userHeadlines);
}
var filterObj = {};
filterObj.filterVal = "all";

filterObj.filters = [{name:"All Categories", id:"all"},{name:"Technology & Gadgets", id:"technology"}, {name:"Entertainment & Lifestyle", id:"entertainment"}, {name:"World & Breaking news", id:"world"}, {name:"Design & Arts", id:"design"}, {name:"Fashion & Style", id:"fashion"}, {name:"Food & Recipes", id:"food"}, {name:"Sports", id:"sports"}, {name:"Science & Environment", id:"science"}, {name:"Gaming", id:"gaming"}, {name:"Business & Entrepreneurship", id:"business"}, {name:"Architecture & Decoration", id:"architecture"}, {name:"Movies", id:"movies"}, {name:"Photography", id:"photography"}, {name:"Graphic Design", id:"graphics"}, {name:"Politics", id:"politics"}, {name:"Economics  & Finance", id:"finance"}, {name:"Marketing & Branding", id:"marketing"}];

function filterMenuCreate(){
  streammmPause();
  if(window.streammmMenu !== null){
    window.streammmMenu.dismiss();
  }
  var filterWrapper = document.createElement( 'div' );
  filterWrapper.className = 'menu-wrapper';
  filterWrapper.id = 'filterWrapper';

  var filterFragment = filterFraction();
  filterWrapper.appendChild(filterFragment);
  
  document.body.insertBefore( filterWrapper, document.body.firstChild );
  
  window.streammmType = new streammmTyper({strings : languageObj.filterTxt, type : 'botInfo', loop : true});

  var filterHeader = document.createElement( 'div' );
  filterHeader.className = 'menu-header';
  filterHeader.id = 'filterHeader';
  filterHeader.innerHTML = '<div class="time-header"></div><a class="menuBtn" id="cancelFilter">Back</a>';
  document.body.insertBefore( filterHeader, document.body.firstChild );
  var cancelFilter = document.getElementById('cancelFilter');
  cancelFilter.addEventListener('tap', cancelHandler, false);
}

function filterFraction(arr,name){
  var fragment = document.createDocumentFragment();
  for (var f = 0; f < filterObj.filters.length; f++) {
    var filterName = filterObj.filters[f].name;
    var filterId = filterObj.filters[f].id;
    var flt = document.createElement('div');
    flt.className = 'filterDiv';
	flt.setAttribute('data-id', filterId);
    flt.style.background = "url('images/filters/"+ filterId +".jpg') no-repeat center center";
    flt.style.backgroundSize = "cover";
	
    var fltTxt = document.createElement('span');
    fltTxt.className = 'filterSpan';
    fltTxt.innerHTML = filterName;
	flt.appendChild(fltTxt);
	
    fragment.appendChild(flt);
	
	flt.addEventListener('tap', fltHandler, false);
  }
  return fragment;
}

function fltHandler(e){
  e.preventDefault();
  e.stopPropagation();
  filterObj.filterVal = this.getAttribute('data-id');
  window.aisearch = "";
  filterMenuDestroy();
  StreammmAnalytics('event','Server','Filter');
  if(filterObj.filterVal == "all"){
    globalObj.streammmPlaylist.innerHTML = 'PLAYING ALL';
  }else{
    globalObj.streammmPlaylist.innerHTML = filterObj.filterVal;
  }
  botObj.textReply = ["Moving on to " + filterObj.filterVal +" ^1500"];
  botObj.voiceReply = 'Moving on to ' + filterObj.filterVal + '.';
  constructRequest("update");
  return;
}

function filterMenuDestroy(){
  var flts = document.getElementsByClassName('filterDiv');
  for (var i = 0; i < flts.length; i++) {
    flts[i].removeEventListener('tap', fltHandler);
  }
  var cancelFilter = document.getElementById('cancelFilter');
  cancelFilter.removeEventListener('tap', cancelHandler);
  var filterHeader = document.getElementById('filterHeader');
  document.body.removeChild( filterHeader );
  var filterWrapper = document.getElementById('filterWrapper');
  document.body.removeChild( filterWrapper );  
}

function cancelHandler(e){
  e.preventDefault();
  e.stopPropagation(); 
  filterMenuDestroy();
  streammmResume(false);
  return;
}

function newGradient() {
  var c1 = {
        r: Math.floor(35+Math.random()*220),
        g: Math.floor(35+Math.random()*220),
        b: Math.floor(Math.random()*255)
      };
      var c2 = {
        r: Math.floor(35+Math.random()*220),
        g: Math.floor(35+Math.random()*220),
        b: Math.floor(Math.random()*255)
      };
  c1.rgb = 'rgb('+c1.r+','+c1.g+','+c1.b+')';
  c2.rgb = 'rgb('+c2.r+','+c2.g+','+c2.b+')';
  return 'radial-gradient(at top left, '+c1.rgb+', '+c2.rgb+')';
}
var tagMenuObj = {};
tagMenuObj.needsRefresh = false;
tagMenuObj.feedBackEnabled = true;

tagMenuObj.popularTags = [{name:"Technology", id:"technology"}, {name:"Design", id:"design"}, {name:"Entertainment", id:"entertainment"}, {name:"World news", id:"world"}, {name:"United States",id:"usa-en"}, {name:"Fashion", id:"fashion"}, {name:"Business", id:"business"}, {name:"Food", id:"food"}, {name:"Sports", id:"sports"}, {name:"Architecture", id:"architecture"}, {name:"Science", id:"science"}, {name:"Movies", id:"movies"}, {name:"Graphic Design", id:"graphics"}];

tagMenuObj.countriesTags = [{name:"United States",id:"usa-en"}, {name:"Austria",id:"austria"}, {name:"Belgique (French)",id:"belgium-fr"}, {name:"Germany",id:"germany"}, {name:"France",id:"france"}, {name:"Greece",id:"greece"}, {name:"Italy",id:"italia"}, {name:"Sweden",id:"sweden"}, {name:"Switzerland",id:"switzerland-fr"}, {name:"United Kingdom",id:"united kingdom"}, {name:"China - 中国",id:"china"},{name:"National Only", id:"nationalonly"}];

tagMenuObj.tags = [{name:"World news", id:"world"}, {name:"Breaking news", id:"breaking"}, {name:"Business", id:"business"}, {name:"Entrepreneurship", id:"entrepreneurship"}, {name:"Startups", id:"startups"}, {name:"Lifestyle", id:"lifestyle"}, {name:"Entertainment", id:"entertainment"}, {name:"Gossip", id:"gossip"}, {name:"Sports", id:"sports"}, {name:"Science", id:"science"}, {name:"Environment", id:"environment"}, {name:"Politics", id:"politics"}, {name:"Technology", id:"technology"}, {name:"Gadgets", id:"gadgets"}, {name:"Gaming", id:"gaming"}, {name:"Movies", id:"movies"}, {name:"Cinema", id:"cinema"}, {name:"Films", id:"films"}, {name:"Design", id:"design"}, {name:"Inspiration", id:"inspiration"}, {name:"Arts", id:"arts"}, {name:"Photography", id:"photography"}, {name:"Graphic Design", id:"graphics"}, {name:"Architecture", id:"architecture"}, {name:"Decoration", id:"decoration"}, {name:"Interior", id:"interior"}, {name:"Fashion", id:"fashion"}, {name:"Style", id:"style"}, {name:"Food", id:"food"}, {name:"Cooking", id:"cooking"}, {name:"Recipes", id:"recipes"}, {name:"Finance", id:"finance"}, {name:"Economics", id:"economics"}, {name:"Money", id:"money"}, {name:"Marketing", id:"marketing"}, {name:"Branding", id:"branding"}];

function tagMenuCreate(welcome){
  if(welcome){
    tagMenuObj.needsRefresh = true;
  }else{
    tagMenuObj.needsRefresh = false;
    streammmPause();
  }
  var tagWrapper = document.createElement( 'div' );
  tagWrapper.className = 'menu-wrapper';

  var popularFragment = tagFraction(tagMenuObj.popularTags, "Popular Tags");
  tagWrapper.appendChild(popularFragment);

  var allFragment = tagFraction(tagMenuObj.tags, "All Tags"); 
  
  tagWrapper.appendChild(allFragment);

  var countriesFragment = tagFraction(tagMenuObj.countriesTags, "Countries");
  tagWrapper.appendChild(countriesFragment);
  
  if(tagMenuObj.feedBackEnabled === true){
    var feedbackFragment = feedbackFraction();
    tagWrapper.appendChild(feedbackFragment);
  }

  document.body.insertBefore( tagWrapper, document.body.firstChild );
  
  window.streammmType = new streammmTyper({strings : languageObj.menuTxt, type : 'botInfo', loop : true});

  var tagHeader = document.createElement( 'div' );
  tagHeader.className = 'menu-header';
  tagHeader.innerHTML = '<div class="time-header"></div><a class="menuBtn" id="saveTags">Save</a>';
  document.body.insertBefore( tagHeader, document.body.firstChild );
  var saveTags = document.getElementById('saveTags');
  saveTags.addEventListener('tap', saveHandler, false);
}

function tagMenuDestroy(){
  var tags = document.getElementsByClassName('tag');
  for (var i = 0; i < tags.length; i++) {
    tags[i].removeEventListener('tap', tagHandler);
  }
  var saveTags = document.getElementById('saveTags');
  saveTags.removeEventListener('tap', saveHandler);
  
  if(tagMenuObj.feedBackEnabled === true){
    var feedBackButton = document.getElementById('feedBackButton');
    feedBackButton.removeEventListener('tap', feedBackHandler);
  }
	
  var tagHeader = document.getElementsByClassName('menu-header');
  document.body.removeChild( tagHeader[0] );
  var tagWrapper = document.getElementsByClassName('menu-wrapper');
  document.body.removeChild( tagWrapper[0] );  
}

function tagFraction(arr,name){
  var fragment = document.createDocumentFragment();
  var tagSeparator = document.createElement( 'div' );
  tagSeparator.className = 'tag-separator';
  tagSeparator.innerHTML = '<p>'+name+'</p>';
  fragment.appendChild(tagSeparator);
  for (var t = 0; t < arr.length; t++) {
    var tagName = arr[t].name;
    var tagId = arr[t].id;
    var tag = document.createElement('div');
    if (settingsObj.userTags.containsArray(tagId)) {
      tag.className = 'tag checked '+ tagId;
	}else{
      tag.className = 'tag '+ tagId;
	}
	tag.setAttribute('data-id', tagId);
    tag.innerHTML = tagName+'<svg class="fa fa-plus" viewBox="0 0 1792 1792"><use class="fasvg" xlink:href="#fa-plus" x="0" y="0"></use></svg><svg class="fa fa-check" viewBox="0 0 1792 1792"><use class="fasvg" xlink:href="#fa-check" x="0" y="0"></use></svg>';
    fragment.appendChild(tag);
	tag.addEventListener('tap', tagHandler, false);
  }
  return fragment;
}

function tagHandler(e){
  e.preventDefault();
  e.stopPropagation();
  tagMenuObj.needsRefresh = true;
  var dataId = this.getAttribute('data-id');
  var tags = document.getElementsByClassName(dataId);
  if(this.classList.contains('checked')){
    for (var i = 0; i < tags.length; i++) {
      tags[i].classList.remove('checked');
      tags[i].classList.remove('flicked');
    }
  }else{
    for (var i = 0; i < tags.length; i++) {
      tags[i].classList.add('checked');
      tags[i].classList.add('flicked');
    }
  }
}
 
function saveHandler(e){
  e.preventDefault();
  e.stopPropagation();
  this.removeEventListener('tap', saveHandler);
  settingsObj.userTags = [];
  var userTags = document.getElementsByClassName('checked');
  for (var i = 0; i < userTags.length; i++) {
    var tagId = userTags[i].getAttribute('data-id');
    if (!settingsObj.userTags.containsArray(tagId)) {
      settingsObj.userTags.push(tagId);   
    }
  }
  window.localStorage.setItem('userTags', JSON.stringify(settingsObj.userTags));
  tagMenuDestroy();
  if(tagMenuObj.needsRefresh){
    filterObj.filterVal = "all";
    window.aisearch = "";
    streammmResume(true);
    StreammmAnalytics('event','Server','Tag Menu');
    if(window.firstRun === true){
      window.firstRun = false;
      constructRequest(true);
    }else{
      globalObj.streammmPlaylist.innerHTML = 'PLAYING ALL';
      constructRequest("update");
    }
  }else{
    streammmResume(false);
  }
  return;
}

function feedbackFraction(){
  var fragment = document.createDocumentFragment();
  var tagSeparator = document.createElement( 'div' );
  tagSeparator.className = 'tag-separator';
  tagSeparator.innerHTML = '<p>Have any Questions ?</p>';
  fragment.appendChild(tagSeparator);
  var feedBackButton = document.createElement( 'div' );
  feedBackButton.id = 'feedBackButton';
  feedBackButton.innerHTML = "Questions / Feature requests";
  fragment.appendChild(feedBackButton);
  feedBackButton.addEventListener('tap', feedBackHandler, false);
  return fragment;
}

function feedBackHandler(e){
  e.preventDefault();
  e.stopPropagation();
  var crispUrl = "https://go.crisp.chat/chat/embed/?website_id=78db0278-a3ef-4602-b4e0-d21c16dfbaba";
  if (typeof window.plugins !== 'undefined'){
    var ref = window.open(crispUrl, '_blank', 'location=no');
//      ref.addEventListener('exit', function(){streammmResume(false);});
  }else{
    var ref = window.open(crispUrl, '_blank', 'location=no');
  }
  return;
}
var dataObj = {};
var globalObj = {};
globalObj.hasPlugins = false,
globalObj.logoHolder = document.getElementById('logoHolder'),
globalObj.logoMover = document.getElementById('logoMover'),
globalObj.streammmPlaylist = document.getElementById('streammmPlaylist');

var sliderObj = {};
sliderObj.started = false,
sliderObj.pause = false;

//window.localStorage.clear();

window.onerror = function(a, b, c) {
  alert(a + ", " + b + ", " + c);
};

globalObj.streammmPlaylist.addEventListener('tap', function(e){
  e.preventDefault();
  e.stopPropagation();
  filterMenuCreate();
}, false);
  
function streammmHide(){
  globalObj.logoHolder.style.display = 'none';
  txtObj.titleWrap.style.display = 'none';
  globalObj.streammmPlaylist.style.display = 'none';
}

function streammmShow(){
  globalObj.logoHolder.style.display = 'block';
  txtObj.titleWrap.style.display = 'block';
  globalObj.streammmPlaylist.style.display = 'block';
}

function aiLoader(show){
  if(show){
    stopVoice();
    if(botObj.textReply){
      window.streammmType = new streammmTyper({strings : botObj.textReply, type : 'loader', wait : true});
      aiVoice(botObj.voiceReply,"en-US");
      return;
    }
    if(window.currentGroup === 0 && !sliderObj.started){
      window.streammmType = new streammmTyper({strings : ["Streammm^1000", "Please wait^1000"], type : 'loader', wait : true});
//      aiVoice("Stream. Please wait","en-US");
    }else{
	  var tXt = window.aiMsgs[0];
	  arrayRotate(window.aiMsgs,1);
	  var tXtString = tXt.toString();
	  aiVoice(tXtString,"en-US");
	  tXtString = tXtString+" ^2000"
      window.streammmType = new streammmTyper({strings : [tXtString], type : 'loader', wait : true});
    }
  }
}

/*
sliderObj.swiper.on('onTouchEnd', function (s,ev) {
  //resetManual();
  window.streammmTxt.resume();
  if(sliderObj.pause){
	return;
  }
});*/


function nXt(){
  if(sliderObj.pause){
    return;
  }
//  if(voiceObj.voiceFinished === true && window.streammmApp.isBurnsComplete()){
  if(voiceObj.voiceFinished === true){
    window.streammmApp.nextSlide();
  }else{
    TweenLite.killDelayedCallsTo(nXt);
    TweenLite.delayedCall(1, nXt);
  }
}

function streammmPause(){
  TweenLite.killDelayedCallsTo(nXt);
  sliderObj.pause = true;
  streammmHide();
  stopVoice();
  //heeree here window.streammmTxt.pause();
  TweenLite.killDelayedCallsTo(nXt);
}

function streammmResume(reloads){
  if(reloads == undefined) {
    reloads = false;
  }
  sliderObj.pause = false;
  streammmShow();
  if(!reloads){
    _superStreammm();
  }
}

window.streammmResume = streammmResume;
//VARIOUS CORDOVA CONTROLS
function updateApp(){
  if(window.android){
    window.open("market://details?id=app.streammm.io","_system");//change url
  }else{
    window.open('itms-apps://itunes.apple.com/app/id1078634352');
  }
}
window.updateApp = updateApp;

function onConfirm(buttonIndex) {
  if(buttonIndex == 1){ 
    StreammmAnalytics('event','Rate',languageObj.globalLng);
    if (globalObj.hasPlugins){
	  window.localStorage.setItem('isRated', true);
	  window.isRated = true;
      if(window.android){
        window.open("market://details?id=app.streammm.io","_system");//change url
      }else{
        window.open('itms-apps://itunes.apple.com/app/id1078634352');
      }
    }
  }
}

function rateAiwn() {
  if(navigator.notification && navigator.notification.confirm) {
    navigator.notification.confirm(
      languageObj.rateMessage,
      onConfirm,
      languageObj.rateTitle,
      [languageObj.rateBtn,languageObj.rateLater]
    );
  }
}

function showMessage(title, message, callback) {
  title = title || "You are offline";
  message = message || "Trying to connect again";	
  callback = callback || null;	
  var buttonName = 'Ok';
  if(navigator.notification && navigator.notification.alert) {
    navigator.notification.alert(
      message,
      callback,
      title,
      buttonName
    );
  } else {
    alert(title);
  }
}

window["speechRecognition"] = {
    hasPermission: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.hasPermission(function (isGranted){
                resolve(isGranted);
            }, function(err){
                reject(err);
            });
        });
    },
    requestPermission: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.requestPermission(function (){
                resolve();
            }, function (err){
                reject();
            });
        });
    },
    startRecognition: function(settings){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.startListening(function(result){
                resolve(result);
            }, function(err){
                reject(err);
            }, settings);
        });
    },
    getSupportedLanguages: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.getSupportedLanguages(function(result){
                resolve(result);
            }, function(err){
                reject(err);
            });
        });
    },
    isRecognitionAvailable: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.isRecognitionAvailable(function(available){
                resolve(available);
            }, function(err){
                reject(err);
            });
        });
    },
    stopListening: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.stopListening(function(){
                resolve();
            }, function(err){
                reject(err);
            });
        });
    }
};

function terminateRec(){
  if (window.voiceTimer) {
    clearTimeout( window.voiceTimer);
  }
  window.plugins.NativeAudio.play( 'closeAi' );
  botObj.aiMic.classList.remove('recording');
  window.speechRecognition.stopListening();
}
function voiceRec(){
  if(!globalObj.hasPlugins){
    return;
  }
  if(botObj.voiceRecording){
    terminateRec();
    return;
  }
  botObj.aiMic.classList.add('recording');
  window.plugins.NativeAudio.play( 'openAi' );
  aiVoice("","en-US");
  window.streammmType = new streammmTyper({strings : languageObj.aiRec, type : 'botInfo'});
  botObj.voiceRecording = true;
  botObj.voiceResponse = false;

  if (window.voiceTimer) {
    clearTimeout( window.voiceTimer);
  }
  window.voiceTimer = setTimeout(function () {
    terminateRec();
  }, 6000);

  window.speechRecognition.isRecognitionAvailable().then(function(available){
    if(available){
      return window.speechRecognition.hasPermission();
    }
  }).then(function(hasPermission){
    function startRecognition(){
        return window.speechRecognition.startRecognition({
            language:"en-US",
            showPopup: false,
			showPartial :false,
            matches: 1 
  
        }).then(function(data){
          if(botObj.voiceRecording){
            botObj.voiceResponse = String(data);
            if(!botObj.voiceResponse || botObj.voiceResponse == ""){
              botObj.voiceRecording = false;
              return;
            }
            submitAi(botObj.voiceResponse);
//            window.streammmType = new streammmTyper({strings : [String(data)], type : 'botInfo'});
		  }
		  botObj.voiceRecording = false;
        }).catch(function(err){
          window.streammmType = new streammmTyper({strings : languageObj.aiErr, type : 'botInfo'});			
          botObj.voiceRecording = false;
            //alert("error"+err);
            //console.error(err);
        });
    }

    if(!hasPermission){
        window.speechRecognition.requestPermission().then(function(){
            startRecognition();
        }).catch(function(err){
          window.streammmType = new streammmTyper({strings : languageObj.aiPermission, type : 'botInfo'});
          //console.error("Cannot get permission", err);
        });
    }else{
        startRecognition();
    }
}).catch(function(err){
  aiRespond("Didn't quite get that...");
  window.streammmType = new streammmTyper({strings : languageObj.aiVoiceErr, type : 'botInfo'});
    //console.error(err);
});
}
var botObj = {};
botObj.voiceRecording = false,
botObj.busy = false,
botObj.textReply = false,
botObj.voiceReply = false,
botObj.voiceResponse = false;

function toggleBot() {
  if(!sliderObj.pause){
	streammmPause();
    botCreate();
    window.streammmType = new streammmTyper({strings : languageObj.aiStart, type : 'botInfo', loop : true});
    aiVoice(languageObj.voiceaiStart,"en-US");
    botObj.busy = false;
  }else{
	botObj.voiceRecording = false;
    botDestroy();
    streammmResume();
  }
}

function botCreate(){
  var aiBot = document.createElement( 'div' );
  aiBot.id = "aiBot";
  
  var aiMic = document.createElement( 'div' );
  aiMic.id = "aiMic";
  aiMic.className = "vis";
  aiMic.innerHTML = '<svg class="iconMic" viewBox="0 0 512 512"><use class="svgmic" xlink:href="#mic" x="0" y="0"></use></svg>';
  aiBot.appendChild(aiMic);

  var messageBox = document.createElement( 'div' );
  messageBox.id = "msgBox";
  messageBox.className = "message-box";
  
  var aiInput = document.createElement("input");
  aiInput.id = "aiInput";
  aiInput.className = "message-input";
  aiInput.setAttribute('type', 'text');
  aiInput.setAttribute('placeholder', 'Type your query...');
  messageBox.appendChild(aiInput);


  var aiSubmit = document.createElement( 'div' );
  aiSubmit.id = "aiSubmit";
  aiSubmit.innerHTML = '<span class="sbm">Send</span>';
  messageBox.appendChild(aiSubmit);

  var botBg = document.createElement( 'div' );
  botBg.id = "botBg";
  aiBot.appendChild(botBg);
 
  aiBot.appendChild(messageBox);

  document.body.insertBefore( aiBot, document.body.firstChild );

  botObj.aiBot = aiBot;  
  botObj.aiMic = aiMic;
  botObj.aiInput = aiInput;
  botObj.aiSubmit = aiSubmit;
  botObj.aiBot = aiBot;
  botObj.botBg = botBg;
  botObj.messageBox = messageBox;

  botObj.aiMic.addEventListener('tap', voiceRec, {passive: true, capture: false});
  botObj.aiInput.addEventListener('focus', aiInputfocus, true);
  botObj.aiSubmit.addEventListener('tap', submitHandler, false);
  botObj.botBg.addEventListener('tap', botBgHandler, false);

}


function botDestroy(){
  botObj.aiMic.removeEventListener('tap', voiceRec);
  botObj.aiInput.removeEventListener('focus', aiInputfocus);
  botObj.aiSubmit.removeEventListener('tap', submitHandler);
  botObj.botBg.removeEventListener('tap', botBgHandler);
  document.body.removeChild( botObj.aiBot );
}
  
function aiInputfocus(e){
  e.preventDefault();
  e.stopPropagation();
  botObj.aiMic.classList.remove('vis');
  e.target.removeEventListener("focus", aiInputfocus);
  return;
}
function submitHandler(e){
  e.preventDefault();
  e.stopPropagation();
  submitAi(botObj.aiInput.value);
  botObj.voiceRecording = false;  
  return;
}
function botBgHandler(e){
  e.preventDefault();
  e.stopPropagation();
  if(botObj.busy){
	  return;
  }
  toggleBot();
  streammmResume();
  return;
}

window.addEventListener('native.keyboardshow', keyboardShowHandler);
function keyboardShowHandler(e){	
  var mbox = document.getElementById('msgBox');
  if (document.getElementById('msgBox')) {
    TweenLite.to(mbox, 1.3, {
      bottom:e.keyboardHeight+62+'px',
      force3D:true,
      ease: Power4.easeOut
    });
  }
}
/*
window.addEventListener('native.keyboardhide', keyboardHideHandler);
function keyboardHideHandler(e){
  var mbox = document.getElementById('msgBox');
  if (typeof mbox !== "undefined") {
    TweenLite.to(mbox, 1.3, {
      bottom:'0px',
      force3D:true,
      ease: Power4.easeOut
    });
  }
}*/

window.addEventListener('keydown', function(e) {
  if (e.which == 13) {
    submitAi(botObj.aiInput.value);
    botObj.voiceRecording = false;
    return false;
  }
}, false);

function blinkSubmit() {
  TweenLite.to(botObj.aiSubmit, 0.2, {
    opacity: 0.3,
    onComplete: function() {
      TweenLite.to(botObj.aiSubmit, 0.2, {
        opacity: 1
      });
    }
  });
}

function searchPartial (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return true;
    }
    return false;
}

function searchFull (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j] == str) return true;
    }
    return false;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

function searchArrays(arrays, str, method) {
  for (var n=0; n < arrays.length; n++) {
    if(method(str, arrays[n])){
      return arrays[n][0];
    }
  }
  return false;
}

function cleanString(array, str) {
  for (var j=0; j<array.length; j++) {
    str = str.replace(array[j], ''); 
  }
  return str;
}

function searchChnl (str, strArray) {
  for (var j=0; j<strArray.length; j++) {
    if (strArray[j].match(str)) return strArray[j];
  }
  return false;
}

function aiLearn(category) {
  return;
}

var world = ['world','latest','recent','current','main','international','breaking','news','now','just','happening'];
var business = ['business'];
var entertainment = ['entertainment','lifestyle','gossip','celebrity','celebs','celebrity','celeb','stars'];
var sports = ['sports','sport'];
var science = ['science','galaxy','universe','environment'];
var politics = ['politics','political'];
var technology = ['technology','tech','gadget','gadgets'];
var gaming = ['gaming','game','games','video games'];
var movies = ['movies','cinema','blockbuster','hollywood','big screen','film','films'];
var design = ['design','inspiration','art','arts','creative'];
var photography = ['photography'];
var graphics = ['graphics','graphic','branding','print','illustration','graphic design'];
var architecture = ['architecture','decoration','interior','home','renovation','apartment','deco'];
var fashion = ['fashion','style'];
var food = ['food','hungry','cooking','recipes','sweets','dessert'];
var finance = ['finance','economics','money','financial'];
var marketing = ['marketing','advertising'];
var allNews = ['all','reset','restart','start','al'];

var helpArray = ['help','info','?','guide','manual','tutorial'];

var searchKeys = ['search', 'look', 'lookup', 'find', 'query', 'looking','for','searching'];

var aiRepliesOk = shuffle(['Ok got it', 'I am on it', 'Working on it', 'Good choice of wording', 'Interesting topic', 'I have a lot of info on this one', 'This is one of my favorite keywords']);

var aiRepliesError = shuffle(["I didn't understand", "I didn't quite get that", "Can you please be more specific", "Can you please rephrase your query", "Could you try using different wording please", "Please try again", "You got me there", "I'm not sure I follow."]);

var cursing = ['cursing','fuck','fucker','asshole','cunt','bumhole','suck','bitch','motherfucker','twat','dick','porn'];
var aiRepliesCursing = shuffle(["Please be polite", "Please don't swear", "No need for swearing"]);

var cancelCommand = ['cancel','undo'];

var greetings = ['greetings', 'hi', 'meet', 'hello', 'hey', 'morning', 'afternoon', 'evening', 'pleased', 'salute', 'yo'];
var aiRepliesGreeting = shuffle(["Hi!", "Hello!","Hello there", "Let's do this", "Good day!", "Greetings", "Ask me something, anything..."]);

var commentKeys = ['comment', 'note', 'mention', 'discuss'];
var commentReplies = shuffle(["Point noted", "Your feedback is welcome", "Comment added to article"]);
var stopWords = ["i","am","a","go","about","above","after","again","against","all","and","an","any","are","is","as","at","be","because","been","before","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];

function submitAi(command) {
  if(botObj.busy){
    return;
  }
  command = command.trim();
  if (command === '') {
    return false;
  }
  if (command.length < 2) {
    aiRespond("Too short...");
    return false;
  }
  if( command == "noads" ){
    adsObj.adsEnabled = false;
    aiRespond("Ok boss");
    return false;
  }
  botObj.busy = true;
  command = command.toLowerCase();
  botObj.aiInput.value = '';
  blinkSubmit();
  var keywords = command.split(' ');
  var searchmethod;

  if(keywords.length == 1){

    var currentKey = command;

	if(currentKey.length < 5){
      searchmethod = searchFull;
	}else{
      currentKey = currentKey.substring(0, currentKey.length - 1);
      searchmethod = searchPartial;
	}
    var help = searchArrays([helpArray], command, searchFull);
    if( help ){
      aiHelp();
      return;
    }
    var greet = searchArrays([greetings], currentKey, searchmethod );
    if( greet ){
      aiRespond(aiRepliesGreeting[0]);
      arrayRotate(aiRepliesGreeting,1);
	  return;
    }
    var category = searchArrays([world,business,entertainment,sports,science,politics,technology,gaming,movies,design,photography,graphics,architecture,fashion,food,finance,marketing,allNews], currentKey, searchmethod );
    if( category ){
      aiFilter(category,aiRepliesOk[0]);
	  arrayRotate(aiRepliesOk,1);
      return;
    }
  }
  var newCommand = "";
  var isSearch = false;
  for (var a = 0; a < keywords.length; a++) {
    var currentKey = keywords[a];
    if(searchFull(currentKey, stopWords)){
	  continue;
	}
	if(currentKey.length < 5){
      searchmethod = searchFull;
	}else{
      searchmethod = searchPartial;
	}
	if(isSearch === false){
      isSearch = searchArrays([searchKeys], currentKey, searchmethod );
	}
    if(searchFull(currentKey, searchKeys)){
	  continue;
	}	
    var retry = searchArrays([cancelCommand], keywords[a], searchFull );
    if( retry ){
      aiRespond('Please try again');
	  return;
    }
    var curse = searchArrays([cursing], keywords[a], searchmethod );
    if( curse ){
      aiRespond(aiRepliesCursing[0]);
      arrayRotate(aiRepliesCursing,1);
	  return;
    }
	newCommand = newCommand+" "+currentKey;
  }
  if(isSearch){
    aiSearch(newCommand);
    return;
  }
  return apiAi(newCommand);
}

function apiAi(command){
//console.log("apiAi");
//  command = cleanString(searchKeys, command);
  var rand = Math.floor((Math.random() * 1000000) + 1);

/*  crossOrigin: true,
    withCredentials: true,
	headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },*/
  return reqwest({
    url: "https://api.api.ai/v1/query?v=20150910",
    method: 'post',
    contentType: "application/json; charset=utf-8",
    type: 'json',
	cache: false,
    headers: {
      "Authorization": "Bearer " + "7bdccc0c0f004f1981b1ee547642b8af"
    },
    data: JSON.stringify({ query: command, lang: "en", sessionId: rand }),
    success: function(data) {
      var action = data['result']['action'];
      var params = data['result']['parameters'];
      var keyword = false;
      var category = false;
      var comment = false;

      if(action == "input.unknown"){
        aiRespond(data['result']['fulfillment']['speech']);
        return;
      }
      if(action == "input.welcome"){
        aiRespond(data['result']['fulfillment']['speech']);
        return;
      }
      if(action == "navigation.help"){
		aiHelp();
        return;
      }
      if(action == "news.comment"){
        aiComment(params['comment'],data['result']['fulfillment']['speech']);
        return;
      }
      if(action == "news.search"){
		//console.log(JSON.stringify(data, undefined, 2));
        if(typeof params['topic'] !== 'undefined' && params['topic'] !== ""){
		  aiFilter(params['topic'],data['result']['fulfillment']['speech']);
	      return;
        }

        if(typeof params['keyword'] !== 'undefined' && params['keyword'] !== ""){
          aiSearch(command);
	      return;
        }
      }
	  //error 
	  //console.log(aiReply);
	  //console.log(JSON.stringify(data, undefined, 2));
      aiRespond(aiRepliesError[0]);
      arrayRotate(aiRepliesError,1);
      return;
    },
    error: function() {
	  //error 
      aiRespond(aiRepliesError[0]);
      arrayRotate(aiRepliesError,1);
      return;
    }	
  });
}

function aiRespond(aiReply) {
  //console.log("aiRespond: "+aiReply);
  window.streammmType = new streammmTyper({strings : [aiReply], type : 'botInfo'});
  aiVoice(aiReply, "en-US");
  botObj.busy = false;
}

function aiHelp() {
  window.streammmType = new streammmTyper({strings : languageObj.aiTut1, type : 'botInfo'});
  aiVoice(languageObj.voiceTut1, "en-US");
  botObj.busy = false;
}
	
function aiFilter(filter, aiReply) { 
  botObj.textReply = [aiReply + "^1000","Moving on to " + filter +".^1500"];
  botObj.voiceReply = aiReply +'. Moving on to ' + filter + '.';
  botObj.busy = false;
  toggleBot();
  window.aisearch = "";
  filterObj.filterVal = filter;

  if(filterObj.filterVal == "all"){
    globalObj.streammmPlaylist.innerHTML = 'PLAYING ALL';
  }else{
    aiLearn(filter);
    globalObj.streammmPlaylist.innerHTML = filter;
  }
  constructRequest("update");
}

function aiSearch(keyword) {
  //console.log("aiSearch: "+keyword);
  botObj.textReply = ['Searching for ' + keyword +'^1500'];
  botObj.voiceReply = "Searching for " + keyword;
  botObj.busy = false;
  toggleBot();
  filterObj.filterVal = "custom";
  window.aisearch = keyword;
  var playlist = cleanString(searchKeys, keyword);
  globalObj.streammmPlaylist.innerHTML = playlist;
  constructRequest("update");
}

function aiComment(comment, aiReply) {
  //console.log("aiComment: "+comment);
  window.streammmType = new streammmTyper({strings : [aiReply], type : 'botInfo'});
  aiVoice(aiReply, "en-US");
  setTimeout(function(){
    botObj.busy = false;
    toggleBot();
    streammmResume();
  }, 3500);
}
function welcomeStreammm() {
  var str = '';
  str += '<div id="countrySelect">';
  str += '<div id="countrySelector">';
  
  str += '<select id="welcomeSel" name="Select your country">';
  str += '<option value="" selected disabled>Select your country</option>';

  for (var i = 0; i <  tagMenuObj.countriesTags.length-1; i++) {
    var countryId = tagMenuObj.countriesTags[i].id;
    var countryName = tagMenuObj.countriesTags[i].name;
    str += '<option data-id="'+countryId+'">'+countryName+'</option>';
  }

  str += '</select>';
  str += '</div>';
  str += '</div>';
  str += '<div id="welcomenxtBtn" class="nxtBtn" style="display:none;">Ok</div>';

  document.body.insertAdjacentHTML('afterbegin', str);

  window.streammmType = new streammmTyper({strings : languageObj.countrySelect, type : 'botInfo'});
  var action = 0;
  if(globalObj.hasPlugins){
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
  }
  var welcomeSel = document.getElementById('welcomeSel');
  welcomeSel.addEventListener('change', function(e){
    e.preventDefault();
    e.stopPropagation();
	var data_id = welcomeSel.options[this.selectedIndex].getAttribute('data-id');
	var name = welcomeSel.options[this.selectedIndex].getAttribute('data-name');	
    languageObj.globalLng = data_id;
    window.localStorage.setItem('globalLng', data_id);
	settingsObj.userTags.push(data_id); 
    window.localStorage.setItem('userTags', JSON.stringify(settingsObj.userTags));
	document.getElementById('welcomenxtBtn').style.display = 'block';
  }, false);	
  document.getElementById('welcomenxtBtn').addEventListener('tap', function(e){
    e.preventDefault();
    e.stopPropagation();
    if(action === 0){
      document.getElementById('main-render').style.display = 'none';
      window.streammmType = new streammmTyper({strings : languageObj.aiTut1, type : 'botInfo'});
      this.innerHTML = "Next";
	  var countrySelect = document.getElementById('countrySelect');
	  countrySelect.parentNode.removeChild(countrySelect);
	  action = 1;
	}else if(action == 1){
      window.firstRun = true;
      window.localStorage.setItem('firstRun', false);
      window.localStorage.setItem('isRated', false);
      loadSettings();
	  tagMenuCreate(true);
      this.parentNode.removeChild(this);
	  document.getElementById('main-render').style.display = 'inline-block';
	  if(globalObj.hasPlugins){
        cordova.plugins.Keyboard.disableScroll(true);
      }
	}
  }, false); 
}
//Appodeal
/*function adsInit(){
var appKey = "69a5508ce8fe4aacbf9cc90398cc02cf51cf4dce9868b743";
  Appodeal.disableLocationPermissionCheck();
  Appodeal.initialize(appKey, Appodeal.REWARDED_VIDEO);
  Appodeal.enableRewardedVideoCallbacks(true);
  Appodeal.setTesting(false);
  document.addEventListener('onRewardedVideoLoaded', function(){});
  document.addEventListener('onRewardedVideoFailedToLoad', function(){});
  document.addEventListener('onRewardedVideoShown', function(){});
  document.addEventListener('onRewardedVideoFinished', function(){});
  document.addEventListener('onRewardedVideoClosed', function(){});
}
function showAds(){
  Appodeal.isLoaded(Appodeal.REWARDED_VIDEO, function(result){
    Appodeal.show(Appodeal.REWARDED_VIDEO);
  });
}*/



//Appnext
/*var adsObj = {};
adsObj.adLoaded = false,
adsObj.adVideo;

function adsInit(){
  var placement_id = "cdd955b6-4ffc-47ef-9d52-de3ea052ce4e"
  adsObj.adVideo = new Appnext.Fullscreen(placement_id,false);
  adsLoader();
}
function adsLoader(){
  adsObj.adVideo.loadAd();
  adsObj.adVideo.setOnAdLoadedCallback( function(){
    adsObj.adLoaded = true;
  });
  adsObj.adVideo.setOnAdClosedCallback(function(){
    continueAds();
  });
  adsObj.adVideo.setOnVideoEndedCallback(function(){
    continueAds();
  });
}

function showAds(){
  if(adsObj.adLoaded === true){
    adsObj.adVideo.showAd(false,onError);
  }else{
    continueAds();
  }
}
function onError(response){
  continueAds();
}

function continueAds(){
  alert("ok");
  adsLoader();
}

//Get callback for ad clicked
adsObj.adVideo.setOnAdClickedCallback( function(){console.log("clicked");});
//Get callback for ad closed

//Get callback for ad error
fullscreen.setOnAdErrorCallback( function(error){console.log("error: " + error);});
//Get callback for video ended
*/

//appcel
var adsObj = {};
adsObj.adsEnabled = true,
adsObj.adLoaded = false,
adsObj.AdCelContentType = {
  VIDEO: 'Video',
  INTERSTITIAL : 'Interstitial',
  IMAGE : 'Image'
};
adsObj.adsArray = ["Image","Video","Interstitial"];
  
function adsInit(){
  var AdCelLogLevel = {
    Off : 0,
    Verbose : 16
  };
  var debugScreen = false;  
  window.plugins.adcelPlugin.setLogLevel(AdCelLogLevel.Verbose);
  window.plugins.adcelPlugin.setTestMode(false);
  window.plugins.adcelPlugin.start(adsObj.AdCelContentType.VIDEO + adsObj.AdCelContentType.INTERSTITIAL + adsObj.AdCelContentType.IMAGE, "03e93a2b-5710-4e1c-a719-76c5d2d0300e:f30880da-6f9a-48c3-8adf-17cd5163fd87");
  if(debugScreen){
    var adcelCallbackText = document.createElement( 'div' );
    adcelCallbackText.id = 'adcelCallbackText';
    adcelCallbackText.innerHTML = 'Adcel callbacks';
    document.body.insertBefore( adcelCallbackText, document.body.firstChild );
  }
  window.plugins.adcelPlugin.setCallbacks(function callback(data) {
    var adcelCallbackText = document.getElementById('adcelCallbackText');
//    adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<BR>NewEvent: ' + data + "<br>";
    var callbackComponents = data.split(':')
    var callback = callbackComponents[0];
    var arg = callbackComponents[1];
    if (callback.localeCompare("onInterstitialFirstLoaded") == 0) {
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
    } else if (callback.localeCompare("onInterstitialWillAppear") == 0) {
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
    } else if (callback.localeCompare("onInterstitialDidDisappear") == 0) {
		StreammmAnalytics('event','AdsShown',adsObj.adsArray[0]);		
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
	  constructRequest();
    } else if (callback.localeCompare("onInterstitialFailedToAppear") == 0) {
		StreammmAnalytics('event','AdsFailed',adsObj.adsArray[0]);
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
	  constructRequest();
    } else if (callback.localeCompare("onInterstitialClicked") == 0) {
		StreammmAnalytics('event','AdsClicked',adsObj.adsArray[0]);
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
    } else {
      adsObj.adsEnabled = false;
      //alert("SuperError"+callback);
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + ']';
      }
    }
  },  function errorHandler(err) {
        adsObj.adsEnabled = false;
      //Failed to display small banner ad
      //document.getElementById('adcelCallbackText').innerHTML = 'Error: ' + err;
// 	  constructRequest();
  });
//  alert(window.plugins.adcelPlugin.isInterstitialDisplayed());
}





function showAds(){
  arrayRotate(adsObj.adsArray,1);
  window.plugins.adcelPlugin.showInterstitial(adsObj.adsArray[0]);
}
//;( function( window ) {
//	'use strict';

var currentSlide, streammmApp, ajaxCounter;
window.version = "3.0.3",
window.streamArray = [];
// instantiate the slider
window.streammmApp = new StreammmSlider("main-render");
var size = window.streammmApp.getScreenSize();
window.displayWidth = size.w;
window.displayHeight = size.h;
setTextSize();

window.currentGroup = 0;
// local method to construct the request data
// and update the group number
function constructRequest(init){
  if(typeof init == "undefined"){
    init = false;
  }
  if(init === true || init === "update"){
    window.currentGroup = 0;
  }
  if(init === "update"){
    window.currentGroup = 0;
    window.streammmApp.destroySlider();
  }
  if(init === false){
    window.currentGroup = window.streammmApp.getCurrentGroup();
  }

  aiLoader(true);

  resetUi();

  StreammmAnalytics('event','Server','API call');
  if(window.currentGroup == 6 && window.isRated === false){
    rateAiwn();
  }
  ajaxCounter = 0;
  streammmAjax(init);
}

window.constructRequest = constructRequest;

function resetUi(){
  if(window.streamArray.length > 0){
    window.streamArray = null;
    window.streamArray = [];
  }
  streammmHide();
  if(window.streammmMenu !== null){
    window.streammmMenu.dismiss();
  }
  if(window.streammmTxt !== null){
    window.streammmTxt.pause();
  }
  txtObj.titleText.innerHTML = '';
  sliderObj.pause = false;  
  TweenLite.killDelayedCallsTo(nXt);
  botObj.textReply = false;
  botObj.voiceReply = false;
  sliderObj.started = false;
}

function streammmAjax(init){
  var aiData = {
    group_number: window.currentGroup || 0,
    init: init,
    userTags: settingsObj.userTags,
    filterVal: filterObj.filterVal,
    token: "!22330)streammm",
    version: window.version,
    aisearch:window.aisearch
  };
  return reqwest({
    url: 'http://aiwn.io/streammm_301/',
//    url:"http://192.168.0.10/streammm_api_tags/new/",
    type: 'json',
    method: 'post',
	contentType: 'application/json',
    data: aiData,
    crossOrigin: true,
    withCredentials: true,
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    error: retryAjax,
    success: streammmStart
  });
}

function retryAjax(){
  TweenLite.delayedCall(1, streammmAjax);
  ajaxCounter++;
//  if(ajaxCounter == 5){
    window.streammmType = new streammmTyper({strings : ["You are offline.^1000"], type : 'loader', loop : true});
    StreammmAnalytics('event','Server','API connection error');
//  }
}

function streammmStart(alldata) {
  function checkFinished(){
    if (!streammmTyperObj.isFinished || voiceObj.voiceFinished !== true){
      TweenLite.delayedCall(1, checkFinished);
	  return;
    }else{
      goAhead();
	}
  }
  checkFinished();

  function goAhead(){
    //Firebase
    if(firebaseObj.enabled){
      if(window.currentGroup !== 0){
        alldata.slides = firebaseObj.data.concat(alldata.slides);
	  }
	  firebaseObj.data = [];
	}
    var data = [];
    data = alldata.slides;
    var sets = [];
    sets = alldata.settings;

	if(typeof sets !== "undefined"){
      if(sets['init'] == "true"){
        window.aisearch = "";
        filterObj.filterVal = "all";
        globalObj.streammmPlaylist.innerHTML = "PLAYING ALL";
      }
      if(sets['ads'] == "false"){
        adsObj.adsEnabled = false;
      }
      if(sets['update'] == "true"){
        showMessage("Update Streammm", "Please update to enjoy Streammmm", updateApp);
        return;
      }
      if(sets['maintenance'] == "true"){
        showMessage("Maintenance Break", "Please try again in a while", constructRequest);
        return;
      }
      if(typeof sets['tags'] !== 'undefined'){
		for(var i = 0; i < sets['tags'].length; i++) {
          tagMenuObj.tags.push({name:sets['tags'][i]['name'], id:sets['tags'][i]['id']})
        }
      }
	}
	if(alldata.aiMsgs){
      window.aiMsgs = alldata.aiMsgs;
	}
    if(data.length < 1){
      window.aisearch = "";
      filterObj.filterVal = "all";
      globalObj.streammmPlaylist.innerHTML = "PLAYING ALL";
      botObj.textReply = ['Feed ended. Now playing all topics.^1500'];
	  botObj.voiceReply = 'Feed ended. Now playing all topics.';
	  constructRequest("update");
      return;
    }

	streammmShow();
	
	globalObj.logoMover.innerHTML = '';
    globalObj.logoMover.style.transform = 'translateY(0px)';
	var logos = "";
    for(var i = 0; i < data.length; i++) {
      streamArray.push(data[i]);
	  var slideId = i+1;
	  logos += '<div class="logoBg" style="background-color:'+data[i].logoColor+'; background-image:url('+data[i].slideLogo+');"></div>';
    }
	globalObj.logoMover.innerHTML = logos;
	
    sliderObj.started = true;
	
    data = null;
    sets = null;
    aiLoader(false);
    window.streammmApp.createSlider(alldata);
  }
}


function textTap(){
  //console.log("textTap");
  if(window.streammmMenu !== null){
    window.streammmMenu.dismiss();
  }
  if(!sliderObj.started){
    return;
  }
  if (typeof window.plugins !== 'undefined'){
    window.streammmType = new streammmTyper({strings : languageObj.paused, type : 'botInfo', loop: true});
    streammmPause();
    var ref = window.open(dataObj.links, '_blank', 'location=no');
    ref.addEventListener('exit', function (){
      streammmResume(false);
    }, false);
  }else{
    var ref = window.open(dataObj.links, '_blank', 'location=no');
  }
  StreammmAnalytics('event','Readmore',dataObj.links);
}

function doubletap( c ){
  //console.log("doubletap");
  if(window.streammmMenu === null && sliderObj.started){	  
    var top = c.y;
    var left = c.x;
    if(left < 96){
      left = 0;
    }else if(left > window.displayWidth - 96){
      left = window.displayWidth - 192;
    }else{
      left = left-96;
    }
    if(top < 96){
      top = 0;
    }else if(top > window.displayHeight - 96){
      top = window.displayHeight - 192;
    }else{
      top = top-96;
    }
    window.streammmMenu = new streammmDisc({left : left+"px", top : top+"px"});  
  }
}

function menuClick(){
  if(window.streammmMenu === null && sliderObj.started){
    var left = (window.displayWidth/2)-96;
    var top = (window.displayHeight/2)-69;
    window.streammmMenu = new streammmDisc({left : left+"px", top : top+"px", notification : true});
  }
}		

function _superStreammm() {
  if(streamArray.length == 0){
    return;
  }
  var id = window.streammmApp.getActiveSlide();
  TweenLite.killDelayedCallsTo(nXt);
  dataObj.curId = id;
  dataObj.logo = streamArray[id].slideLogo;
  dataObj.logoColor = streamArray[id].logoColor;
  dataObj.title = streamArray[id].slideTitle;  
  dataObj.subtitle = streamArray[id].slideMsg;
  dataObj.slideLang = streamArray[id].slideLang;
  dataObj.url = streamArray[id].url;
  dataObj.image = streamArray[id].image;
  dataObj.feed = streamArray[id].feed;
  dataObj.links = streamArray[id].links;
  dataObj.time = streamArray[id].time;
  
  dataObj.aiInfo = [];
  var chnl;
  if (dataObj.feed.indexOf('|') > -1){
    var res = dataObj.feed.split(" |");
    dataObj.aiInfo.push(res[0]+"^2500");
    dataObj.aiInfo.push(res[1]+"^1500");
	chnl = res[0];
  }else{
    dataObj.aiInfo.push(dataObj.feed+"^2500");
	chnl = dataObj.feed;
  }
  dataObj.aiInfo.push(dataObj.time+"^1800");
  
  dataObj.status = [];
	
  var status = window.streammmApp.getLoadedStatus();

  if(status === 1){
    dataObj.status.push("Loading Image...^1000");
  }else if(status === 2){
    dataObj.status.push("Image failed to load...^1000");
  }
  if(!sliderObj.pause){  
    if (dataObj.status.length === 0){
      window.streammmType = new streammmTyper({strings : dataObj.aiInfo, type : 'slideInfo', returnToInfo : true});
    }else{
      var arrayMerge = dataObj.status.concat(dataObj.aiInfo);
      window.streammmType = new streammmTyper({strings : arrayMerge, type : 'slideInfo', returnToInfo : true});	  
    }
  }
  var curLogo = ((dataObj.curId)*26)*-1;
  globalObj.logoMover.style.transform = 'translateY('+curLogo+'px)';


//  window.streammmApp.resetTextModule();
  //window.streammmTxt = new streammmText({title: dataObj.title, subtitle : dataObj.subtitle, slideLang : dataObj.slideLang});

  StreammmAnalytics('screenview',false,dataObj.title);
  return;
}
window._superStreammm = _superStreammm;

function streammmResize(){
  if(window.streammmMenu !== null){
    window.streammmMenu.dismiss();
  }
  streammmHide();
  var size = window.streammmApp.getScreenSize();
  window.displayWidth = size.w;
  window.displayHeight = size.h;
  setTextSize();
//  if(!sliderObj.pause){
//	window.streammmType = new streammmTyper({strings : ["Please wait..."], type : 'botInfo'}); 
//  }
  clearTimeout(window.newSize);  
  window.newSize = setTimeout(function(){

    if(sliderObj.pause){
	  return;
	}
	if(sliderObj.started){
	  streammmShow();
    }
    if(streamArray.length > 1){
      _superStreammm();
    }
  }, 100);
}

function nGroup(){
  if (typeof window.plugins !== 'undefined' && adsObj.adsEnabled === true && window.streammmApp.getCurrentGroup() % 2 && window.streammmApp.getCurrentGroup() > window.currentGroup){
    window.streammmType.destroy();
    aiVoice("","en-US");
    resetUi();
    showAds();
  } else {
    resetUi();
    constructRequest();
  }
}

// public event listeners
window.streammmApp
//  .on("tap", singletap)
//  .on("singletap", singletap)
//  .on("touchstart", touchStart)
//heeere  .on("touchmove", scrollTxt)
//  .on("touchend", resumeTxt)
  .on("menuclick", menuClick)
  .on("texttap", textTap)
  .on("doubletap", doubletap)
  .on("newgroup", nGroup)
  .on("sliderinit", _superStreammm)
  .on("slidechange", _superStreammm)
  .on("resize", streammmResize)
  .on("textcomplete", nXt);
  

//} )( window );
"use strict";
(function (window, document, undefined) {

window.aisearch = "";
window.aiMsgs = [];
window.android = true;

function deviceReady() {
  if(typeof window.plugins !== 'undefined'){
    globalObj.hasPlugins = true;
    //android
    document.addEventListener("pause", streammmPause, false);
    document.addEventListener("resume", streammmResume, false);
	if(window.android){
      document.addEventListener("backbutton", streammmExit, false);
      document.addEventListener("menubutton", streammmExit, false);
      document.addEventListener("searchbutton", toggleBot, false);
	}else{
      window.plugins.NativeAudio.preloadSimple( 'openAi', 'audio/startRec.mp3', null, null);
      window.plugins.NativeAudio.preloadSimple( 'closeAi', 'audio/endRec.mp3', null, null);
	}
    window.plugins.insomnia.keepAwake();
    window.StatusBar.show();
	adsInit();
  }else{
    globalObj.hasPlugins = false;
  }
  voiceInit();
  var fR = window.localStorage.getItem('firstRun');
  if(fR !== null){
    loadSettings();
	if(globalObj.hasPlugins){
      if(window.android){
        window.cache.cleartemp();
	  }else{
        window.cache.clear();
	  }
      cordova.plugins.Keyboard.disableScroll(true);
    }
	constructRequest(true);
  }else{
    welcomeStreammm();
  }
}
window.deviceReady = deviceReady;

//android
function streammmExit(){
  voiceObj.voiceFinished = true;
  window.navigator.tts.stop();
  window.close();
  window.navigator.app.exitApp();
}

})(window, document);

