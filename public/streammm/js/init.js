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